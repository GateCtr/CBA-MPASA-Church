import { useMemo, useState } from "react";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, FormError, EmptyState } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";
import type { Sermon } from "../types";
import { fmtDate, inputCls, newId } from "../utils";

export function SermonsAdmin({
  items,
  setItems,
}: {
  items: Sermon[];
  setItems: (v: Sermon[] | ((p: Sermon[]) => Sermon[])) => void;
}) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter(
        (s) =>
          !q ||
          s.title.toLowerCase().includes(q) ||
          s.speaker.toLowerCase().includes(q) ||
          s.series.toLowerCase().includes(q),
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, search]);

  const blank: Sermon = {
    id: "",
    title: "",
    speaker: "",
    date: "",
    series: "",
    duration: "",
    link: "",
    published: true,
  };

  const openCreate = () => {
    setError(null);
    setEditing({ ...blank });
    setModal(true);
  };
  const openEdit = (s: Sermon) => {
    setError(null);
    setEditing({ ...s });
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
    if (!editing.speaker.trim()) {
      setError("Le prédicateur est obligatoire.");
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

  const togglePublished = (id: string) => {
    setItems((prev) =>
      prev.map((x) => (x.id === id ? { ...x, published: !x.published } : x)),
    );
  };

  return (
    <div>
      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreate}
        addLabel="Nouveau sermon"
        placeholder="Rechercher un sermon…"
      />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide border-b border-stone-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Titre</th>
              <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Prédicateur</th>
              <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Série</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Durée</th>
              <th className="text-left px-5 py-3 font-semibold">Statut</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7}>
                  <EmptyState text="Aucun sermon." />
                </td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-stone-50/60">
                <td className="px-5 py-4 whitespace-nowrap text-stone-600 text-xs">
                  {fmtDate(s.date)}
                </td>
                <td className="px-5 py-4 font-medium text-stone-900 max-w-xs">
                  <div className="truncate">{s.title}</div>
                </td>
                <td className="px-5 py-4 text-stone-600 hidden lg:table-cell">
                  {s.speaker}
                </td>
                <td className="px-5 py-4 text-stone-500 text-xs hidden lg:table-cell">
                  {s.series}
                </td>
                <td className="px-5 py-4 text-stone-500 text-xs hidden md:table-cell">
                  {s.duration}
                </td>
                <td className="px-5 py-4">
                  <button onClick={() => togglePublished(s.id)}>
                    <StatusBadge
                      label={s.published ? "Publié" : "Brouillon"}
                      variant={s.published ? "success" : "neutral"}
                    />
                  </button>
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  {s.link && (
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-stone-400 hover:text-sky-600 p-1.5 transition rounded-lg hover:bg-sky-50 inline-flex"
                    >
                      <ExternalLink size={15} />
                    </a>
                  )}
                  <button
                    onClick={() => openEdit(s)}
                    className="text-stone-400 hover:text-amber-700 p-1.5 transition ml-1 rounded-lg hover:bg-amber-50"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setConfirmId(s.id)}
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
        title={editing?.id ? "Modifier le sermon" : "Nouveau sermon"}
      >
        {editing && (
          <div className="space-y-4">
            <Field label="Titre *">
              <input
                className={inputCls}
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                placeholder="Ex : Le Peuple d'Autel"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Prédicateur *">
                <input
                  className={inputCls}
                  value={editing.speaker}
                  onChange={(e) =>
                    setEditing({ ...editing, speaker: e.target.value })
                  }
                />
              </Field>
              <Field label="Date *">
                <input
                  type="date"
                  className={inputCls}
                  value={editing.date}
                  onChange={(e) => setEditing({ ...editing, date: e.target.value })}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Série / Thème">
                <input
                  className={inputCls}
                  value={editing.series}
                  onChange={(e) =>
                    setEditing({ ...editing, series: e.target.value })
                  }
                  placeholder="Ex : Les 4 Piliers"
                />
              </Field>
              <Field label="Durée">
                <input
                  className={inputCls}
                  value={editing.duration}
                  onChange={(e) =>
                    setEditing({ ...editing, duration: e.target.value })
                  }
                  placeholder="Ex : 52 min"
                />
              </Field>
            </div>
            <Field label="Lien YouTube ou audio">
              <input
                className={inputCls}
                value={editing.link}
                onChange={(e) => setEditing({ ...editing, link: e.target.value })}
                placeholder="https://..."
              />
            </Field>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="pub"
                checked={editing.published}
                onChange={(e) =>
                  setEditing({ ...editing, published: e.target.checked })
                }
                className="w-4 h-4 rounded border-stone-300 text-amber-600 accent-amber-700"
              />
              <label htmlFor="pub" className="text-sm text-stone-700 font-medium">
                Publier sur le site
              </label>
            </div>
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
