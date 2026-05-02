import { useMemo, useState } from "react";
import { Image as ImageIcon, Pencil, Trash2 } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, FormError, EmptyState } from "../components/Field";
import type { Photo } from "../types";
import { inputCls, newId } from "../utils";

const CATS: { value: Photo["cat"]; label: string }[] = [
  { value: "cultes", label: "Cultes & Adoration" },
  { value: "communaute", label: "Vie communautaire" },
  { value: "evenements", label: "Événements" },
  { value: "ministeres", label: "Structures & Ministères" },
];

const catLabel = (c: Photo["cat"]) => CATS.find((x) => x.value === c)?.label ?? c;

export function GalleryAdmin({
  items,
  setItems,
}: {
  items: Photo[];
  setItems: (v: Photo[] | ((p: Photo[]) => Photo[])) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<"all" | Photo["cat"]>("all");
  const [editing, setEditing] = useState<Photo | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter(
      (p) =>
        (filterCat === "all" || p.cat === filterCat) &&
        (!q || p.title.toLowerCase().includes(q)),
    );
  }, [items, search, filterCat]);

  const blank: Photo = { id: "", src: "", alt: "", cat: "cultes", title: "" };

  const openCreate = () => {
    setError(null);
    setEditing({ ...blank });
    setModal(true);
  };
  const openEdit = (p: Photo) => {
    setError(null);
    setEditing({ ...p });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEditing(null);
    setError(null);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) { setError("Le titre est obligatoire."); return; }
    if (!editing.src.trim()) { setError("L'URL de l'image est obligatoire."); return; }
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
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilterCat("all")}
          className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${filterCat === "all" ? "bg-amber-700 text-white" : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"}`}
        >
          Toutes ({items.length})
        </button>
        {CATS.map(({ value, label }) => (
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
        addLabel="Ajouter une photo"
        placeholder="Rechercher une photo…"
      />

      {filtered.length === 0 ? (
        <div className="bg-white border border-stone-200 rounded-2xl">
          <EmptyState text="Aucune photo." icon={<ImageIcon size={24} />} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden"
            >
              <div className="aspect-[4/3] bg-stone-100 overflow-hidden">
                {p.src ? (
                  <img
                    src={p.src}
                    alt={p.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-300">
                    <ImageIcon size={28} />
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="text-[10px] text-amber-700 uppercase tracking-wide font-semibold">
                  {catLabel(p.cat)}
                </div>
                <div className="text-sm font-semibold text-stone-900 truncate mt-0.5">
                  {p.title}
                </div>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={() => openEdit(p)}
                  className="w-8 h-8 bg-white/95 hover:bg-amber-700 hover:text-white rounded-lg flex items-center justify-center text-stone-700 shadow transition"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => setConfirmId(p.id)}
                  className="w-8 h-8 bg-white/95 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center text-stone-700 shadow transition"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier la photo" : "Ajouter une photo"}>
        {editing && (
          <div className="space-y-4">
            <Field label="Titre *">
              <input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </Field>
            <Field label="URL de l'image *">
              <input className={inputCls} value={editing.src} onChange={(e) => setEditing({ ...editing, src: e.target.value })} placeholder="/images/... ou https://..." />
            </Field>
            <Field label="Texte alternatif (accessibilité)">
              <input className={inputCls} value={editing.alt} onChange={(e) => setEditing({ ...editing, alt: e.target.value })} />
            </Field>
            <Field label="Catégorie">
              <select className={inputCls} value={editing.cat} onChange={(e) => setEditing({ ...editing, cat: e.target.value as Photo["cat"] })}>
                {CATS.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
              </select>
            </Field>
            {editing.src && (
              <div className="rounded-xl overflow-hidden border border-stone-200 aspect-video bg-stone-100">
                <img src={editing.src} alt="" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
            )}
            <FormError message={error} />
            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button onClick={closeModal} className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition">Annuler</button>
              <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold transition">Enregistrer</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDelete open={!!confirmId} onCancel={() => setConfirmId(null)} onConfirm={() => confirmId && remove(confirmId)} label={items.find((x) => x.id === confirmId)?.title || ""} />
    </div>
  );
}
