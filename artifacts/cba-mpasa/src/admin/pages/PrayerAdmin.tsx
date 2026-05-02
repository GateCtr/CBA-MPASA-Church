import { useMemo, useState } from "react";
import { Heart, Pencil, Trash2 } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, EmptyState } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";
import type { PrayerRequest } from "../types";
import { fmtDateTime, inputCls, newId } from "../utils";

const CATEGORIES: { value: PrayerRequest["category"]; label: string }[] = [
  { value: "sante", label: "Santé & Guérison" },
  { value: "famille", label: "Famille & Mariage" },
  { value: "travail", label: "Emploi & Finances" },
  { value: "spirituel", label: "Vie spirituelle" },
  { value: "autre", label: "Autre" },
];

const STATUSES: { value: PrayerRequest["status"]; label: string }[] = [
  { value: "en_attente", label: "En attente" },
  { value: "prie", label: "En prière" },
  { value: "repondu", label: "Répondu" },
];

const catLabel = (c: PrayerRequest["category"]) =>
  CATEGORIES.find((x) => x.value === c)?.label ?? c;

const statusVariant = (s: PrayerRequest["status"]) =>
  ({ en_attente: "warning", prie: "info", repondu: "success" })[s] as
    | "warning"
    | "info"
    | "success";

export function PrayerAdmin({
  items,
  setItems,
}: {
  items: PrayerRequest[];
  setItems: (
    v: PrayerRequest[] | ((p: PrayerRequest[]) => PrayerRequest[]),
  ) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | PrayerRequest["status"]
  >("all");
  const [selected, setSelected] = useState<PrayerRequest | null>(null);
  const [editing, setEditing] = useState<PrayerRequest | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter((p) => {
        if (filterStatus !== "all" && p.status !== filterStatus) return false;
        return !q || p.name.toLowerCase().includes(q) || p.request.toLowerCase().includes(q);
      })
      .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  }, [items, search, filterStatus]);

  const blank: PrayerRequest = {
    id: "",
    name: "",
    anonymous: false,
    request: "",
    category: "spirituel",
    receivedAt: new Date().toISOString(),
    status: "en_attente",
    notes: "",
  };

  const openCreate = () => {
    setEditing({ ...blank });
    setModal(true);
  };
  const openEdit = (p: PrayerRequest) => {
    setEditing({ ...p });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEditing(null);
  };

  const save = () => {
    if (!editing) return;
    if (editing.id) {
      setItems((prev) =>
        prev.map((x) => (x.id === editing.id ? editing : x)),
      );
    } else {
      setItems((prev) => [
        { ...editing, id: newId(), receivedAt: new Date().toISOString() },
        ...prev,
      ]);
    }
    closeModal();
    setSelected(null);
  };

  const updateStatus = (id: string, status: PrayerRequest["status"]) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status } : p)),
    );
    setSelected((s) => (s?.id === id ? { ...s, status } : s));
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setConfirmId(null);
    if (selected?.id === id) setSelected(null);
  };

  const counts = {
    all: items.length,
    en_attente: items.filter((p) => p.status === "en_attente").length,
    prie: items.filter((p) => p.status === "prie").length,
    repondu: items.filter((p) => p.status === "repondu").length,
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        {([
          ["all", `Toutes (${counts.all})`],
          ["en_attente", `En attente (${counts.en_attente})`],
          ["prie", `En prière (${counts.prie})`],
          ["repondu", `Répondues (${counts.repondu})`],
        ] as const).map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => setFilterStatus(val)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
              filterStatus === val
                ? "bg-amber-700 text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>

      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreate}
        addLabel="Nouvelle demande"
        placeholder="Rechercher une demande de prière…"
      />

      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl">
            <EmptyState text="Aucune demande de prière." icon={<Heart size={24} />} />
          </div>
        )}
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-stone-200 rounded-2xl p-5 hover:shadow-sm transition cursor-pointer"
            onClick={() => setSelected(p)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-stone-900">
                    {p.anonymous ? "Anonyme" : p.name}
                  </span>
                  <StatusBadge
                    label={catLabel(p.category)}
                    variant="amber"
                  />
                  <StatusBadge
                    label={
                      STATUSES.find((s) => s.value === p.status)?.label ?? p.status
                    }
                    variant={statusVariant(p.status)}
                  />
                </div>
                <p className="text-sm text-stone-600 line-clamp-2">{p.request}</p>
                <div className="text-xs text-stone-400 mt-1">
                  {fmtDateTime(p.receivedAt)}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => openEdit(p)}
                  className="text-stone-400 hover:text-amber-700 p-1.5 transition rounded-lg hover:bg-amber-50"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => setConfirmId(p.id)}
                  className="text-stone-400 hover:text-red-600 p-1.5 transition rounded-lg hover:bg-red-50"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Demande de prière" size="lg">
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <StatusBadge label={catLabel(selected.category)} variant="amber" />
              <StatusBadge
                label={STATUSES.find((s) => s.value === selected.status)?.label ?? selected.status}
                variant={statusVariant(selected.status)}
              />
            </div>
            <div>
              <div className="text-xs text-stone-400 uppercase font-semibold mb-1">Demandeur</div>
              <div className="font-semibold text-stone-900">
                {selected.anonymous ? "Anonyme" : selected.name}
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-400 uppercase font-semibold mb-1">Demande</div>
              <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-700 leading-relaxed border border-stone-100">
                {selected.request}
              </div>
            </div>
            {selected.notes && (
              <div>
                <div className="text-xs text-stone-400 uppercase font-semibold mb-1">Notes pastorales</div>
                <div className="text-sm text-stone-600">{selected.notes}</div>
              </div>
            )}
            <div>
              <div className="text-xs text-stone-400 uppercase font-semibold mb-2">Changer le statut</div>
              <div className="flex gap-2">
                {STATUSES.map(({ value, label }) => (
                  <button
                    key={value}
                    onClick={() => updateStatus(selected.id, value)}
                    className={`px-3 py-1.5 text-xs rounded-lg font-medium transition border ${
                      selected.status === value
                        ? "bg-amber-700 text-white border-amber-700"
                        : "bg-white border-stone-200 text-stone-600 hover:bg-stone-50"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit modal */}
      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier" : "Nouvelle demande"}>
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
              <Field label="Nom">
                <input
                  className={inputCls}
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                />
              </Field>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Catégorie">
                <select
                  className={inputCls}
                  value={editing.category}
                  onChange={(e) =>
                    setEditing({ ...editing, category: e.target.value as PrayerRequest["category"] })
                  }
                >
                  {CATEGORIES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </Field>
              <Field label="Statut">
                <select
                  className={inputCls}
                  value={editing.status}
                  onChange={(e) =>
                    setEditing({ ...editing, status: e.target.value as PrayerRequest["status"] })
                  }
                >
                  {STATUSES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Demande de prière *">
              <textarea
                rows={4}
                className={inputCls + " resize-none"}
                value={editing.request}
                onChange={(e) => setEditing({ ...editing, request: e.target.value })}
                placeholder="Décrivez la demande de prière…"
              />
            </Field>
            <Field label="Notes pastorales (internes)">
              <textarea
                rows={2}
                className={inputCls + " resize-none"}
                value={editing.notes}
                onChange={(e) => setEditing({ ...editing, notes: e.target.value })}
                placeholder="Suivi pastoral, actions entreprises…"
              />
            </Field>
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
        label="cette demande de prière"
      />
    </div>
  );
}
