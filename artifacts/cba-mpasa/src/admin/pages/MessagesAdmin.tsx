import { useMemo, useState } from "react";
import { CheckCheck, Mail, MailOpen, Trash2 } from "lucide-react";
import { Toolbar } from "../components/Toolbar";
import { Modal, ConfirmDelete } from "../components/Modal";
import { EmptyState } from "../components/Field";
import { StatusBadge } from "../components/StatusBadge";
import type { Message } from "../types";
import { fmtDateTime } from "../utils";

export function MessagesAdmin({
  items,
  setItems,
}: {
  items: Message[];
  setItems: (v: Message[] | ((p: Message[]) => Message[])) => void;
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "unreplied">("all");
  const [selected, setSelected] = useState<Message | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter((m) => {
        if (filter === "unread" && m.read) return false;
        if (filter === "unreplied" && m.replied) return false;
        return (
          !q ||
          m.name.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  }, [items, search, filter]);

  const markRead = (id: string) =>
    setItems((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: true } : m)),
    );

  const markReplied = (id: string) =>
    setItems((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, replied: true, read: true } : m,
      ),
    );

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setConfirmId(null);
    if (selected?.id === id) setSelected(null);
  };

  const open = (m: Message) => {
    setSelected(m);
    if (!m.read) markRead(m.id);
  };

  const unreadCount = items.filter((m) => !m.read).length;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        {(["all", "unread", "unreplied"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs rounded-lg font-medium transition ${
              filter === f
                ? "bg-amber-700 text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:bg-stone-50"
            }`}
          >
            {f === "all" ? `Tous (${items.length})` : f === "unread" ? `Non lus (${unreadCount})` : "Sans réponse"}
          </button>
        ))}
      </div>

      <Toolbar
        search={search}
        setSearch={setSearch}
        placeholder="Rechercher un message…"
      />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide border-b border-stone-200">
            <tr>
              <th className="text-left px-5 py-3 font-semibold w-6"></th>
              <th className="text-left px-5 py-3 font-semibold">Expéditeur</th>
              <th className="text-left px-5 py-3 font-semibold">Sujet</th>
              <th className="text-left px-5 py-3 font-semibold hidden md:table-cell">Reçu le</th>
              <th className="text-left px-5 py-3 font-semibold hidden lg:table-cell">Statut</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6}>
                  <EmptyState text="Aucun message." icon={<Mail size={24} />} />
                </td>
              </tr>
            )}
            {filtered.map((m) => (
              <tr
                key={m.id}
                onClick={() => open(m)}
                className={`cursor-pointer hover:bg-amber-50/40 ${!m.read ? "bg-amber-50/20" : ""}`}
              >
                <td className="px-3 py-4 text-center">
                  {m.read ? (
                    <MailOpen size={14} className="text-stone-300 mx-auto" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-amber-600 block mx-auto" />
                  )}
                </td>
                <td className="px-5 py-4">
                  <div className={`text-stone-900 ${!m.read ? "font-semibold" : "font-medium"}`}>
                    {m.name}
                  </div>
                  <div className="text-xs text-stone-400">{m.email}</div>
                </td>
                <td className="px-5 py-4 text-stone-700">{m.subject}</td>
                <td className="px-5 py-4 text-stone-500 text-xs whitespace-nowrap hidden md:table-cell">
                  {fmtDateTime(m.receivedAt)}
                </td>
                <td className="px-5 py-4 hidden lg:table-cell">
                  <StatusBadge
                    label={m.replied ? "Répondu" : m.read ? "Lu" : "Non lu"}
                    variant={m.replied ? "success" : m.read ? "neutral" : "warning"}
                  />
                </td>
                <td
                  className="px-5 py-4 text-right whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  {!m.replied && (
                    <button
                      onClick={() => markReplied(m.id)}
                      className="text-stone-400 hover:text-emerald-600 p-1.5 transition rounded-lg hover:bg-emerald-50"
                      title="Marquer comme répondu"
                    >
                      <CheckCheck size={15} />
                    </button>
                  )}
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

      {/* Message detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Détail du message"
        size="lg"
      >
        {selected && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-xs text-stone-400 uppercase font-semibold mb-0.5">De</div>
                <div className="font-semibold text-stone-900">{selected.name}</div>
                <div className="text-stone-500 text-xs">{selected.email}</div>
              </div>
              <div>
                <div className="text-xs text-stone-400 uppercase font-semibold mb-0.5">Reçu le</div>
                <div className="text-stone-700">{fmtDateTime(selected.receivedAt)}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-stone-400 uppercase font-semibold mb-1">Sujet</div>
              <div className="font-semibold text-stone-900">{selected.subject}</div>
            </div>
            <div>
              <div className="text-xs text-stone-400 uppercase font-semibold mb-1">Message</div>
              <div className="bg-stone-50 rounded-xl p-4 text-sm text-stone-700 leading-relaxed whitespace-pre-wrap border border-stone-100">
                {selected.message}
              </div>
            </div>
            {selected.email && (
              <div className="flex justify-end gap-2 pt-2 border-t border-stone-100">
                {!selected.replied && (
                  <button
                    onClick={() => {
                      markReplied(selected.id);
                      setSelected((s) => s ? { ...s, replied: true, read: true } : null);
                    }}
                    className="px-4 py-2 text-sm rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition inline-flex items-center gap-2"
                  >
                    <CheckCheck size={14} /> Marquer comme répondu
                  </button>
                )}
                <a
                  href={`mailto:${selected.email}?subject=Re: ${selected.subject}`}
                  className="px-4 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold transition inline-flex items-center gap-2"
                >
                  <Mail size={14} /> Répondre par email
                </a>
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmDelete
        open={!!confirmId}
        onCancel={() => setConfirmId(null)}
        onConfirm={() => confirmId && remove(confirmId)}
        label={items.find((x) => x.id === confirmId)?.subject || ""}
      />
    </div>
  );
}
