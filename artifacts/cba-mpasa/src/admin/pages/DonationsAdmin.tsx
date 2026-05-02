import { useMemo, useState } from "react";
import { HandCoins, Pencil, Trash2 } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, FormError, EmptyState } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";
import type { Donation } from "../types";
import { fmtDate, inputCls, newId } from "../utils";

const CATEGORIES: { value: Donation["category"]; label: string }[] = [
  { value: "dime", label: "Dîme" },
  { value: "offrande", label: "Offrande" },
  { value: "don_special", label: "Don spécial" },
  { value: "construction", label: "Construction" },
  { value: "mission", label: "Mission MGRN" },
];

const METHODS: { value: Donation["method"]; label: string }[] = [
  { value: "especes", label: "Espèces" },
  { value: "mobile_money", label: "Mobile Money" },
  { value: "virement", label: "Virement bancaire" },
  { value: "autre", label: "Autre" },
];

const catLabel = (c: Donation["category"]) =>
  CATEGORIES.find((x) => x.value === c)?.label ?? c;
const methodLabel = (m: Donation["method"]) =>
  METHODS.find((x) => x.value === m)?.label ?? m;

export function DonationsAdmin({
  items,
  setItems,
}: {
  items: Donation[];
  setItems: (v: Donation[] | ((p: Donation[]) => Donation[])) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<"all" | Donation["category"]>("all");
  const [editing, setEditing] = useState<Donation | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter((d) => {
        if (filterCat !== "all" && d.category !== filterCat) return false;
        return (
          !q ||
          (!d.anonymous && d.name.toLowerCase().includes(q)) ||
          catLabel(d.category).toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, search, filterCat]);

  const totalUSD = useMemo(
    () => filtered.filter((d) => d.currency === "USD").reduce((s, d) => s + d.amount, 0),
    [filtered],
  );
  const totalCDF = useMemo(
    () => filtered.filter((d) => d.currency === "CDF").reduce((s, d) => s + d.amount, 0),
    [filtered],
  );

  const blank: Donation = {
    id: "",
    name: "",
    anonymous: false,
    amount: 0,
    currency: "USD",
    method: "especes",
    date: new Date().toISOString().slice(0, 10),
    category: "offrande",
    notes: "",
  };

  const openCreate = () => {
    setError(null);
    setEditing({ ...blank });
    setModal(true);
  };
  const openEdit = (d: Donation) => {
    setError(null);
    setEditing({ ...d });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEditing(null);
    setError(null);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.anonymous && !editing.name.trim()) {
      setError("Le nom est obligatoire (ou cochez Anonyme).");
      return;
    }
    if (!editing.amount || editing.amount <= 0) {
      setError("Le montant doit être supérieur à 0.");
      return;
    }
    if (!editing.date) {
      setError("La date est obligatoire.");
      return;
    }
    setError(null);
    if (editing.id) {
      setItems((prev) => prev.map((x) => (x.id === editing.id ? editing : x)));
    } else {
      setItems((prev) => [{ ...editing, id: newId() }, ...prev]);
    }
    closeModal();
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setConfirmId(null);
  };

  return (
    <div>
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total USD", value: `$${totalUSD.toLocaleString()}`, color: "text-emerald-700 bg-emerald-50" },
          { label: "Total CDF", value: `${(totalCDF / 1000).toFixed(0)}k FC`, color: "text-sky-700 bg-sky-50" },
          { label: "Nombre de dons", value: filtered.length.toString(), color: "text-amber-700 bg-amber-50" },
          { label: "Donateurs uniques", value: new Set(filtered.filter((d) => !d.anonymous).map((d) => d.name)).size.toString(), color: "text-violet-700 bg-violet-50" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white border border-stone-200 rounded-2xl p-4">
            <div className={`text-2xl font-bold mb-1 ${color.split(" ")[0]}`}>{value}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide">{label}</div>
          </div>
        ))}
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterCat("all")}
          className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${filterCat === "all" ? "bg-amber-700 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
        >
          Toutes
        </button>
        {CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setFilterCat(value)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${filterCat === value ? "bg-amber-700 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreate}
        addLabel="Enregistrer un don"
        placeholder="Rechercher un donateur…"
      />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide border-b border-stone-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Donateur</th>
              <th className="text-left px-5 py-3 font-semibold">Montant</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Catégorie</th>
              <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Mode</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <EmptyState text="Aucun don enregistré." icon={<HandCoins size={24} />} />
                </td>
              </tr>
            )}
            {filtered.map((d) => (
              <tr key={d.id} className="hover:bg-stone-50/60">
                <td className="px-5 py-4 text-stone-600 text-xs whitespace-nowrap">
                  {fmtDate(d.date)}
                </td>
                <td className="px-5 py-4">
                  <div className="font-medium text-stone-900">
                    {d.anonymous ? "Anonyme" : d.name}
                  </div>
                  {d.notes && (
                    <div className="text-xs text-stone-400 truncate max-w-xs">{d.notes}</div>
                  )}
                </td>
                <td className="px-5 py-4 font-semibold text-stone-900">
                  {d.currency === "USD"
                    ? `$${d.amount.toLocaleString()}`
                    : `${(d.amount / 1000).toFixed(0)}k FC`}
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <StatusBadge label={catLabel(d.category)} variant="amber" />
                </td>
                <td className="px-5 py-4 text-stone-500 text-xs hidden lg:table-cell">
                  {methodLabel(d.method)}
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => openEdit(d)}
                    className="text-stone-400 hover:text-amber-700 p-1.5 transition rounded-lg hover:bg-amber-50"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setConfirmId(d.id)}
                    className="text-stone-400 hover:text-red-600 p-1.5 transition ml-1 rounded-lg hover:bg-red-50"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier le don" : "Enregistrer un don"}>
        {editing && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="anon"
                checked={editing.anonymous}
                onChange={(e) => setEditing({ ...editing, anonymous: e.target.checked })}
                className="w-4 h-4 accent-amber-700"
              />
              <label htmlFor="anon" className="text-sm font-medium text-stone-700">Anonyme</label>
            </div>
            {!editing.anonymous && (
              <Field label="Nom du donateur *">
                <input
                  className={inputCls}
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </Field>
            )}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <Field label="Montant *">
                  <input
                    type="number"
                    min="0"
                    className={inputCls}
                    value={editing.amount || ""}
                    onChange={(e) => setEditing({ ...editing, amount: Number(e.target.value) })}
                  />
                </Field>
              </div>
              <Field label="Devise">
                <select
                  className={inputCls}
                  value={editing.currency}
                  onChange={(e) => setEditing({ ...editing, currency: e.target.value as Donation["currency"] })}
                >
                  <option value="USD">USD ($)</option>
                  <option value="CDF">CDF (FC)</option>
                </select>
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Catégorie">
                <select
                  className={inputCls}
                  value={editing.category}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value as Donation["category"] })}
                >
                  {CATEGORIES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Mode de paiement">
                <select
                  className={inputCls}
                  value={editing.method}
                  onChange={(e) => setEditing({ ...editing, method: e.target.value as Donation["method"] })}
                >
                  {METHODS.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Date *">
              <input
                type="date"
                className={inputCls}
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
              />
            </Field>
            <Field label="Notes">
              <input
                className={inputCls}
                value={editing.notes}
                onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                placeholder="Informations complémentaires…"
              />
            </Field>
            <FormError message={error} />
            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button onClick={closeModal} className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition">Annuler</button>
              <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold transition">Enregistrer</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDelete
        open={!!confirmId}
        onCancel={() => setConfirmId(null)}
        onConfirm={() => confirmId && remove(confirmId)}
        label="ce don"
      />
    </div>
  );
}
