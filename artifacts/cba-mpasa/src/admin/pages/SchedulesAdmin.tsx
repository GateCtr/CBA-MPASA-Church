import { useMemo, useState } from "react";
import { Clock, Pencil, Trash2 } from "lucide-react";
import { Modal, ConfirmDelete } from "../components/Modal";
import { Field, FormError, EmptyState } from "../components/Field";
import type { Schedule } from "../types";
import { DAY_NAMES, inputCls, newId } from "../utils";

export function SchedulesAdmin({
  items,
  setItems,
}: {
  items: Schedule[];
  setItems: (v: Schedule[] | ((p: Schedule[]) => Schedule[])) => void;
}) {
  const [editing, setEditing] = useState<Schedule | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const byDay = useMemo(() => {
    const groups: Record<number, Schedule[]> = {};
    for (let i = 0; i < 7; i++) groups[i] = [];
    items.forEach((s) => {
      if (!groups[s.dayOfWeek]) groups[s.dayOfWeek] = [];
      groups[s.dayOfWeek].push(s);
    });
    Object.values(groups).forEach((g) => g.sort((a, b) => a.startTime.localeCompare(b.startTime)));
    return groups;
  }, [items]);

  const blank: Schedule = {
    id: "",
    dayOfWeek: 0,
    startTime: "09:00",
    endTime: "12:00",
    title: "",
    location: "Temple central Mpasa",
    description: "",
    recurring: true,
  };

  const openCreate = (day?: number) => {
    setError(null);
    setEditing({ ...blank, dayOfWeek: day ?? 0 });
    setModal(true);
  };
  const openEdit = (s: Schedule) => {
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
    if (!editing.title.trim()) { setError("Le titre est obligatoire."); return; }
    if (!editing.startTime || !editing.endTime) { setError("Les horaires sont obligatoires."); return; }
    setError(null);
    if (editing.id) {
      setItems((prev) => prev.map((x) => (x.id === editing.id ? editing : x)));
    } else {
      setItems((prev) => [...prev, { ...editing, id: newId() }]);
    }
    closeModal();
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((x) => x.id !== id));
    setConfirmId(null);
  };

  const dayColors = [
    "border-amber-200 bg-amber-50/50",
    "border-sky-200 bg-sky-50/50",
    "border-emerald-200 bg-emerald-50/50",
    "border-violet-200 bg-violet-50/50",
    "border-emerald-200 bg-emerald-50/50",
    "border-rose-200 bg-rose-50/50",
    "border-orange-200 bg-orange-50/50",
  ];

  return (
    <div>
      <div className="flex justify-end mb-5">
        <button
          onClick={() => openCreate()}
          className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-sm"
        >
          <Clock size={15} /> Nouvel horaire
        </button>
      </div>

      {items.length === 0 && (
        <div className="bg-white border border-stone-200 rounded-2xl">
          <EmptyState text="Aucun horaire configuré." icon={<Clock size={24} />} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4, 5, 6].filter((d) => byDay[d]?.length > 0 || true).map((day) => (
          byDay[day]?.length > 0 ? (
            <div key={day} className={`rounded-2xl border p-4 ${dayColors[day]}`}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-['Playfair_Display'] font-bold text-base text-stone-900">
                  {DAY_NAMES[day]}
                </h3>
                <button
                  onClick={() => openCreate(day)}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
                >
                  + Ajouter
                </button>
              </div>
              <div className="space-y-2">
                {byDay[day].map((s) => (
                  <div key={s.id} className="bg-white rounded-xl border border-stone-100 p-3 group">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-stone-900 truncate">{s.title}</div>
                        <div className="text-xs text-amber-700 font-medium mt-0.5">
                          {s.startTime} – {s.endTime}
                        </div>
                        <div className="text-xs text-stone-500 truncate">{s.location}</div>
                        {s.description && (
                          <div className="text-xs text-stone-400 mt-1 line-clamp-1">{s.description}</div>
                        )}
                      </div>
                      <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition shrink-0">
                        <button onClick={() => openEdit(s)} className="text-stone-400 hover:text-amber-700 p-1 rounded">
                          <Pencil size={13} />
                        </button>
                        <button onClick={() => setConfirmId(s.id)} className="text-stone-400 hover:text-red-600 p-1 rounded">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null
        ))}
      </div>

      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier l'horaire" : "Nouvel horaire"}>
        {editing && (
          <div className="space-y-4">
            <Field label="Titre *">
              <input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} placeholder="Ex : Culte d'Adoration" />
            </Field>
            <Field label="Jour de la semaine">
              <select className={inputCls} value={editing.dayOfWeek} onChange={(e) => setEditing({ ...editing, dayOfWeek: Number(e.target.value) })}>
                {DAY_NAMES.map((d, i) => <option key={i} value={i}>{d}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Heure de début">
                <input type="time" className={inputCls} value={editing.startTime} onChange={(e) => setEditing({ ...editing, startTime: e.target.value })} />
              </Field>
              <Field label="Heure de fin">
                <input type="time" className={inputCls} value={editing.endTime} onChange={(e) => setEditing({ ...editing, endTime: e.target.value })} />
              </Field>
            </div>
            <Field label="Lieu">
              <input className={inputCls} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} />
            </Field>
            <Field label="Description">
              <textarea rows={2} className={inputCls + " resize-none"} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} />
            </Field>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="rec" checked={editing.recurring} onChange={(e) => setEditing({ ...editing, recurring: e.target.checked })} className="w-4 h-4 accent-amber-700" />
              <label htmlFor="rec" className="text-sm font-medium text-stone-700">Récurrent chaque semaine</label>
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
