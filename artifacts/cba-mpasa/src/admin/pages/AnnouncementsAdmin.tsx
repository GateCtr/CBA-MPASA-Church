import { useMemo, useState } from "react";
import { Eye, EyeOff, Megaphone, Pencil, Trash2 } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, FormError, EmptyState } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";
import type { Announcement } from "../types";
import { fmtDate, inputCls, newId } from "../utils";

const TYPES: { value: Announcement["type"]; label: string; variant: "error" | "warning" | "info" | "amber" }[] = [
  { value: "urgent", label: "Urgent", variant: "error" },
  { value: "event", label: "Événement", variant: "warning" },
  { value: "info", label: "Information", variant: "info" },
  { value: "priere", label: "Prière", variant: "amber" },
];

const typeLabel = (t: Announcement["type"]) => TYPES.find((x) => x.value === t)?.label ?? t;
const typeVariant = (t: Announcement["type"]) => TYPES.find((x) => x.value === t)?.variant ?? "neutral";

export function AnnouncementsAdmin({
  items,
  setItems,
}: {
  items: Announcement[];
  setItems: (v: Announcement[] | ((p: Announcement[]) => Announcement[])) => void;
}) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter((a) => !q || a.title.toLowerCase().includes(q) || a.content.toLowerCase().includes(q))
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  }, [items, search]);

  const blank: Announcement = {
    id: "",
    title: "",
    content: "",
    type: "info",
    publishedAt: new Date().toISOString(),
    expiresAt: "",
    visible: true,
  };

  const openCreate = () => {
    setError(null);
    setEditing({ ...blank });
    setModal(true);
  };
  const openEdit = (a: Announcement) => {
    setError(null);
    setEditing({ ...a });
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
    if (!editing.content.trim()) { setError("Le contenu est obligatoire."); return; }
    setError(null);
    if (editing.id) {
      setItems((prev) => prev.map((x) => (x.id === editing.id ? editing : x)));
    } else {
      setItems((prev) => [{ ...editing, id: newId(), publishedAt: new Date().toISOString() }, ...prev]);
    }
    closeModal();
  };

  const toggleVisible = (id: string) =>
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, visible: !a.visible } : a)));

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setConfirmId(null);
  };

  const now = new Date().toISOString();
  const isExpired = (a: Announcement) => a.expiresAt && a.expiresAt < now;

  return (
    <div>
      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreate}
        addLabel="Nouvelle annonce"
        placeholder="Rechercher une annonce…"
      />

      <div className="grid gap-3">
        {filtered.length === 0 && (
          <div className="bg-white border border-stone-200 rounded-2xl">
            <EmptyState text="Aucune annonce." icon={<Megaphone size={24} />} />
          </div>
        )}
        {filtered.map((a) => (
          <div
            key={a.id}
            className={`bg-white border rounded-2xl p-5 transition ${!a.visible || isExpired(a) ? "opacity-60 border-stone-200" : "border-stone-200 hover:shadow-sm"}`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <StatusBadge label={typeLabel(a.type)} variant={typeVariant(a.type)} />
                  {!a.visible && <StatusBadge label="Masquée" variant="neutral" />}
                  {isExpired(a) && <StatusBadge label="Expirée" variant="neutral" />}
                </div>
                <h3 className="font-semibold text-stone-900 text-sm mb-1">{a.title}</h3>
                <p className="text-sm text-stone-600 line-clamp-2">{a.content}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-stone-400">
                  <span>Publié le {fmtDate(a.publishedAt)}</span>
                  {a.expiresAt && <span>· Expire le {fmtDate(a.expiresAt)}</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => toggleVisible(a.id)}
                  className={`p-1.5 rounded-lg transition ${a.visible ? "text-stone-400 hover:text-amber-700 hover:bg-amber-50" : "text-stone-300 hover:text-stone-600 hover:bg-stone-50"}`}
                  title={a.visible ? "Masquer" : "Afficher"}
                >
                  {a.visible ? <Eye size={15} /> : <EyeOff size={15} />}
                </button>
                <button onClick={() => openEdit(a)} className="text-stone-400 hover:text-amber-700 p-1.5 transition rounded-lg hover:bg-amber-50">
                  <Pencil size={15} />
                </button>
                <button onClick={() => setConfirmId(a.id)} className="text-stone-400 hover:text-red-600 p-1.5 transition rounded-lg hover:bg-red-50">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier l'annonce" : "Nouvelle annonce"} size="lg">
        {editing && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Type">
                <select className={inputCls} value={editing.type} onChange={(e) => setEditing({ ...editing, type: e.target.value as Announcement["type"] })}>
                  {TYPES.map(({ value, label }) => <option key={value} value={value}>{label}</option>)}
                </select>
              </Field>
              <Field label="Expiration (optionnel)">
                <input type="date" className={inputCls} value={editing.expiresAt ? editing.expiresAt.slice(0, 10) : ""} onChange={(e) => setEditing({ ...editing, expiresAt: e.target.value ? e.target.value + "T23:59:00Z" : "" })} />
              </Field>
            </div>
            <Field label="Titre *">
              <input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Titre de l'annonce…" />
            </Field>
            <Field label="Contenu *">
              <textarea rows={4} className={inputCls + " resize-none"} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} placeholder="Contenu de l'annonce…" />
            </Field>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="vis" checked={editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} className="w-4 h-4 accent-amber-700" />
              <label htmlFor="vis" className="text-sm font-medium text-stone-700">Visible sur le site public</label>
            </div>
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
