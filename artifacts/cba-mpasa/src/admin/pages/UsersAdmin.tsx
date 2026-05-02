import { useMemo, useState } from "react";
import { Pencil, ShieldCheck, ShieldOff, Trash2, UserCog } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, FormError, EmptyState } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";
import type { AdminUser } from "../types";
import { fmtDate, fmtDateTime, inputCls, newId } from "../utils";

const ROLES: { value: AdminUser["role"]; label: string; desc: string }[] = [
  { value: "super_admin", label: "Super Admin", desc: "Accès total à toutes les fonctionnalités" },
  { value: "admin", label: "Administrateur", desc: "Gestion complète sauf les utilisateurs" },
  { value: "editor", label: "Éditeur", desc: "Peut modifier les contenus (sermons, événements…)" },
  { value: "viewer", label: "Observateur", desc: "Lecture seule — aucune modification" },
];

const roleLabel = (r: AdminUser["role"]) => ROLES.find((x) => x.value === r)?.label ?? r;
const roleVariant = (r: AdminUser["role"]) =>
  ({ super_admin: "error", admin: "warning", editor: "info", viewer: "neutral" })[r] as "error" | "warning" | "info" | "neutral";

export function UsersAdmin({
  items,
  setItems,
}: {
  items: AdminUser[];
  setItems: (v: AdminUser[] | ((p: AdminUser[]) => AdminUser[])) => void;
}) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<AdminUser | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter(
        (u) =>
          !q ||
          u.username.toLowerCase().includes(q) ||
          u.displayName.toLowerCase().includes(q),
      )
      .sort((a, b) => a.displayName.localeCompare(b.displayName));
  }, [items, search]);

  const blank: AdminUser = {
    id: "",
    username: "",
    displayName: "",
    role: "editor",
    createdAt: new Date().toISOString(),
    lastLogin: "",
    active: true,
  };

  const openCreate = () => {
    setError(null);
    setEditing({ ...blank });
    setModal(true);
  };
  const openEdit = (u: AdminUser) => {
    setError(null);
    setEditing({ ...u });
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEditing(null);
    setError(null);
  };

  const save = () => {
    if (!editing) return;
    if (!editing.username.trim()) { setError("L'identifiant est obligatoire."); return; }
    if (!editing.displayName.trim()) { setError("Le nom d'affichage est obligatoire."); return; }
    if (
      !editing.id &&
      items.some((u) => u.username.toLowerCase() === editing.username.toLowerCase())
    ) {
      setError("Cet identifiant existe déjà.");
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

  const toggleActive = (id: string) =>
    setItems((prev) =>
      prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)),
    );

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setConfirmId(null);
  };

  return (
    <div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 mb-5">
        <strong>Note :</strong> La gestion des utilisateurs est en mode démonstration. L'authentification complète sera intégrée ultérieurement avec une base de données.
      </div>

      <Toolbar
        search={search}
        setSearch={setSearch}
        onAdd={openCreate}
        addLabel="Nouvel utilisateur"
        placeholder="Rechercher un utilisateur…"
      />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide border-b border-stone-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Utilisateur</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Identifiant</th>
              <th className="text-left px-5 py-3 font-semibold">Rôle</th>
              <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Dernière connexion</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Statut</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <EmptyState text="Aucun utilisateur." icon={<UserCog size={24} />} />
                </td>
              </tr>
            )}
            {filtered.map((u) => (
              <tr key={u.id} className={`hover:bg-stone-50/60 ${!u.active ? "opacity-60" : ""}`}>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-stone-800 text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {u.displayName[0]}
                    </div>
                    <div className="font-medium text-stone-900">{u.displayName}</div>
                  </div>
                </td>
                <td className="px-5 py-4 text-stone-500 font-mono text-xs hidden md:table-cell">
                  {u.username}
                </td>
                <td className="px-5 py-4">
                  <StatusBadge label={roleLabel(u.role)} variant={roleVariant(u.role)} />
                </td>
                <td className="px-5 py-4 text-stone-400 text-xs hidden lg:table-cell">
                  {u.lastLogin ? fmtDateTime(u.lastLogin) : "Jamais"}
                </td>
                <td className="px-5 py-4 hidden md:table-cell">
                  <StatusBadge label={u.active ? "Actif" : "Inactif"} variant={u.active ? "success" : "neutral"} />
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button
                    onClick={() => toggleActive(u.id)}
                    className={`p-1.5 transition rounded-lg ${u.active ? "text-stone-400 hover:text-amber-700 hover:bg-amber-50" : "text-stone-300 hover:text-emerald-600 hover:bg-emerald-50"}`}
                    title={u.active ? "Désactiver" : "Activer"}
                  >
                    {u.active ? <ShieldOff size={15} /> : <ShieldCheck size={15} />}
                  </button>
                  <button onClick={() => openEdit(u)} className="text-stone-400 hover:text-amber-700 p-1.5 transition ml-1 rounded-lg hover:bg-amber-50">
                    <Pencil size={15} />
                  </button>
                  <button onClick={() => setConfirmId(u.id)} className="text-stone-400 hover:text-red-600 p-1.5 transition ml-1 rounded-lg hover:bg-red-50">
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier l'utilisateur" : "Nouvel utilisateur"}>
        {editing && (
          <div className="space-y-4">
            <Field label="Nom d'affichage *">
              <input className={inputCls} value={editing.displayName} onChange={(e) => setEditing({ ...editing, displayName: e.target.value })} placeholder="Ex : Pasteur Principal" />
            </Field>
            <Field label="Identifiant (username) *">
              <input className={inputCls} value={editing.username} onChange={(e) => setEditing({ ...editing, username: e.target.value.toLowerCase().replace(/\s/g, "_") })} placeholder="Ex : pasteur_principal" />
            </Field>
            <Field label="Rôle">
              <select className={inputCls} value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value as AdminUser["role"] })}>
                {ROLES.map(({ value, label, desc }) => (
                  <option key={value} value={value}>{label} — {desc}</option>
                ))}
              </select>
            </Field>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="act" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} className="w-4 h-4 accent-amber-700" />
              <label htmlFor="act" className="text-sm font-medium text-stone-700">Compte actif</label>
            </div>
            <FormError message={error} />
            <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
              <button onClick={closeModal} className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition">Annuler</button>
              <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold transition">Enregistrer</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDelete open={!!confirmId} onCancel={() => setConfirmId(null)} onConfirm={() => confirmId && remove(confirmId)} label={items.find((x) => x.id === confirmId)?.displayName || ""} />
    </div>
  );
}
