import { useMemo, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, FormError, EmptyState } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";
import type { EventItem } from "../types";
import { fmtDate, inputCls, newId } from "../utils";

export function EventsAdmin({
  items,
  setItems,
}: {
  items: EventItem[];
  setItems: (v: EventItem[] | ((p: EventItem[]) => EventItem[])) => void;
}) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter(
        (e) =>
          !q ||
          e.title.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q),
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, search]);

  const blank: EventItem = {
    id: "",
    date: "",
    title: "",
    desc: "",
    location: "",
    image: "/images/cba-worship.png",
    tag: "À venir",
  };

  const openCreate = () => {
    setError(null);
    setEditing({ ...blank });
    setModal(true);
  };
  const openEdit = (e: EventItem) => {
    setError(null);
    setEditing({ ...e });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEditing(null);
    setError(null);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) {
      setError("Le titre est obligatoire.");
      return;
    }
    if (!editing.date) {
      setError("La date est obligatoire.");
      return;
    }
    if (!editing.location.trim()) {
      setError("Le lieu est obligatoire.");
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

  const tagVariant = (tag: string) => {
    if (tag === "À venir") return "success";
    if (tag === "Annulé") return "error";
    return "neutral";
  };

  return (
    <div>
      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreate}
        addLabel="Nouvel événement"
        placeholder="Rechercher un événement…"
      />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide border-b border-stone-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Titre</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Lieu</th>
              <th className="text-left px-5 py-3 font-semibold">Statut</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5}>
                  <EmptyState text="Aucun événement." />
                </td>
              </tr>
            )}
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-stone-50/60">
                <td className="px-5 py-4 whitespace-nowrap text-stone-600 text-xs">
                  {fmtDate(e.date)}
                </td>
                <td className="px-5 py-4 font-medium text-stone-900 max-w-xs">
                  <div className="truncate">{e.title}</div>
                  {e.desc && (
                    <div className="text-xs text-stone-400 truncate mt-0.5">
                      {e.desc}
                    </div>
                  )}
                </td>
                <td className="px-5 py-4 text-stone-600 hidden md:table-cell">
                  {e.location}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge
                    label={e.tag}
                    variant={tagVariant(e.tag) as "success" | "error" | "neutral"}
                  />
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => openEdit(e)}
                    className="text-stone-400 hover:text-amber-700 p-1.5 transition rounded-lg hover:bg-amber-50"
                    aria-label="Éditer"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setConfirmId(e.id)}
                    className="text-stone-400 hover:text-red-600 p-1.5 transition ml-1 rounded-lg hover:bg-red-50"
                    aria-label="Supprimer"
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
        title={editing?.id ? "Modifier l'événement" : "Nouvel événement"}
      >
        {editing && (
          <div className="space-y-4">
            <Field label="Titre *">
              <input
                className={inputCls}
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Ex : Conférence MGRN"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date *">
                <input
                  type="date"
                  className={inputCls}
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                />
              </Field>
              <Field label="Statut">
                <select
                  className={inputCls}
                  value={editing.tag}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      tag: e.target.value as EventItem["tag"],
                    })
                  }
                >
                  <option value="À venir">À venir</option>
                  <option value="Passé">Passé</option>
                  <option value="Annulé">Annulé</option>
                </select>
              </Field>
            </div>
            <Field label="Lieu *">
              <input
                className={inputCls}
                value={editing.location}
                onChange={(e) =>
                  setEditing({ ...editing, location: e.target.value })
                }
                placeholder="Ex : Temple central Mpasa"
              />
            </Field>
            <Field label="Image (URL)">
              <input
                className={inputCls}
                value={editing.image}
                onChange={(e) =>
                  setEditing({ ...editing, image: e.target.value })
                }
                placeholder="/images/... ou https://..."
              />
            </Field>
            <Field label="Description">
              <textarea
                rows={3}
                className={inputCls + " resize-none"}
                value={editing.desc}
                onChange={(e) =>
                  setEditing({ ...editing, desc: e.target.value })
                }
                placeholder="Description de l'événement…"
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
        label={items.find((x) => x.id === confirmId)?.title || ""}
      />
    </div>
  );
}
