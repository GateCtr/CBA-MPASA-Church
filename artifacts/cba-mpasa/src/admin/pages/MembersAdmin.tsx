import { useMemo, useState } from "react";
import { Pencil, Trash2, Users } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, FormError, EmptyState } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";
import type { Member } from "../types";
import { fmtDate, inputCls, newId } from "../utils";

const STRUCTURES = [
  "Mamans Deborah",
  "Papas Salomon",
  "Jeunesse Timothée",
  "Les Amis de Jésus",
  "Chorale Hosanna",
  "Équipe d'évangélisation",
  "Cellule de prière",
  "Autre",
];

export function MembersAdmin({
  items,
  setItems,
}: {
  items: Member[];
  setItems: (v: Member[] | ((p: Member[]) => Member[])) => void;
}) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Member | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter(
        (m) =>
          !q ||
          m.firstName.toLowerCase().includes(q) ||
          m.lastName.toLowerCase().includes(q) ||
          m.quartier.toLowerCase().includes(q) ||
          m.structure.toLowerCase().includes(q),
      )
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [items, search]);

  const blank: Member = {
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    quartier: "",
    structure: "Jeunesse Timothée",
    baptized: false,
    notes: "",
    createdAt: new Date().toISOString(),
  };

  const openCreate = () => {
    setError(null);
    setEditing({ ...blank });
    setModal(true);
  };
  const openEdit = (m: Member) => {
    setError(null);
    setEditing({ ...m });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEditing(null);
    setError(null);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.firstName.trim()) {
      setError("Le prénom est obligatoire.");
      return;
    }
    if (!editing.lastName.trim()) {
      setError("Le nom est obligatoire.");
      return;
    }
    setError(null);
    if (editing.id) {
      setItems((prev) => prev.map((x) => (x.id === editing.id ? editing : x)));
    } else {
      setItems((prev) => [
        { ...editing, id: newId(), createdAt: new Date().toISOString() },
        ...prev,
      ]);
    }
    closeModal();
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setConfirmId(null);
  };

  return (
    <div>
      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreate}
        addLabel="Nouveau membre"
        placeholder="Rechercher un membre…"
      />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide border-b border-stone-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Nom</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Téléphone</th>
              <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Quartier</th>
              <th className="text-left px-5 py-3 font-semibold">Structure</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Baptisé</th>
              <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Inscrit le</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <EmptyState text="Aucun membre." icon={<Users size={24} />} />
                </td>
              </tr>
            )}
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-stone-50/60">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {m.firstName[0]}
                      {m.lastName[0]}
                    </div>
                    <div>
                      <div className="font-medium text-stone-900">
                        {m.firstName} {m.lastName}
                      </div>
                      {m.email && (
                        <div className="text-xs text-stone-400">{m.email}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-stone-600 whitespace-nowrap hidden md:table-cell">
                  {m.phone}
                </td>
                <td className="px-5 py-4 text-stone-600 hidden lg:table-cell">
                  {m.quartier}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge label={m.structure} variant="amber" />
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <StatusBadge
                    label={m.baptized ? "Oui" : "Non"}
                    variant={m.baptized ? "success" : "neutral"}
                  />
                </td>
                <td className="px-5 py-4 text-stone-400 text-xs whitespace-nowrap hidden lg:table-cell">
                  {fmtDate(m.createdAt)}
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => openEdit(m)}
                    className="text-stone-400 hover:text-amber-700 p-1.5 transition rounded-lg hover:bg-amber-50"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setConfirmId(m.id)}
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

      <Modal
        open={modal}
        onClose={closeModal}
        title={editing?.id ? "Modifier le membre" : "Nouveau membre"}
      >
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Prénom *">
                <input
                  className={inputCls}
                  value={editing.firstName}
                  onChange={(e) =>
                    setEditing({ ...editing, firstName: e.target.value })
                  }
                />
              </Field>
              <Field label="Nom *">
                <input
                  className={inputCls}
                  value={editing.lastName}
                  onChange={(e) =>
                    setEditing({ ...editing, lastName: e.target.value })
                  }
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Téléphone">
                <input
                  className={inputCls}
                  value={editing.phone}
                  onChange={(e) =>
                    setEditing({ ...editing, phone: e.target.value })
                  }
                  placeholder="+243 8X XXX XXXX"
                />
              </Field>
              <Field label="Email">
                <input
                  type="email"
                  className={inputCls}
                  value={editing.email}
                  onChange={(e) =>
                    setEditing({ ...editing, email: e.target.value })
                  }
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Quartier">
                <input
                  className={inputCls}
                  value={editing.quartier}
                  onChange={(e) =>
                    setEditing({ ...editing, quartier: e.target.value })
                  }
                  placeholder="Ex : Mpasa I"
                />
              </Field>
              <Field label="Structure">
                <select
                  className={inputCls}
                  value={editing.structure}
                  onChange={(e) =>
                    setEditing({ ...editing, structure: e.target.value })
                  }
                >
                  {STRUCTURES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="bap"
                checked={editing.baptized}
                onChange={(e) =>
                  setEditing({ ...editing, baptized: e.target.checked })
                }
                className="w-4 h-4 rounded border-stone-300 accent-amber-700"
              />
              <label htmlFor="bap" className="text-sm text-stone-700 font-medium">
                Baptisé(e)
              </label>
            </div>
            <Field label="Notes">
              <textarea
                rows={2}
                className={inputCls + " resize-none"}
                value={editing.notes}
                onChange={(e) =>
                  setEditing({ ...editing, notes: e.target.value })
                }
                placeholder="Informations complémentaires…"
              />
            </Field>
            <FormError message={error} />
            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition"
              >
                Annuler
              </button>
              <button
                onClick={save}
                className="px-4 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold transition"
              >
                Enregistrer
              </button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDelete
        open={!!confirmId}
        onCancel={() => setConfirmId(null)}
        onConfirm={() => confirmId && remove(confirmId)}
        label={
          (() => {
            const m = items.find((x) => x.id === confirmId);
            return m ? `${m.firstName} ${m.lastName}` : "";
          })()
        }
      />
    </div>
  );
}
