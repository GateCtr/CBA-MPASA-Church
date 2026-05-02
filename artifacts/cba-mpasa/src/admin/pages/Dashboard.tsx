import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Bell,
  CalendarDays,
  HandCoins,
  Image as ImageIcon,
  Megaphone,
  Mic2,
  Users,
  Mail,
  Heart,
  Clock,
  TrendingUp,
} from "lucide-react";
import type {
  EventItem,
  Sermon,
  Photo,
  Message,
  Member,
  PrayerRequest,
  Donation,
  AdminTab,
} from "../types";
import { fmtDate, fmtDateTime } from "../utils";

interface DashboardProps {
  events: EventItem[];
  sermons: Sermon[];
  photos: Photo[];
  messages: Message[];
  members: Member[];
  prayers: PrayerRequest[];
  donations: Donation[];
  onJump: (t: AdminTab) => void;
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
  onClick,
}: {
  label: string;
  value: number | string;
  sub?: string;
  icon: typeof CalendarDays;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-stone-200 rounded-2xl p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition-all group w-full"
    >
      <div
        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon size={18} />
      </div>
      <div className="text-3xl font-bold text-stone-900 leading-none mb-1">
        {value}
      </div>
      <div className="text-xs text-stone-500 uppercase tracking-wide font-medium">
        {label}
      </div>
      {sub && <div className="text-xs text-stone-400 mt-1">{sub}</div>}
    </button>
  );
}

export function Dashboard({
  events,
  sermons,
  photos,
  messages,
  members,
  prayers,
  donations,
  onJump,
}: DashboardProps) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
  const unread = messages.filter((m) => !m.read).length;
  const pendingPrayers = prayers.filter((p) => p.status === "en_attente").length;

  const totalDonationsUSD = donations
    .filter((d) => d.currency === "USD")
    .reduce((s, d) => s + d.amount, 0);

  const donationChart = useMemo(() => {
    const months: Record<string, number> = {};
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
      months[key] = 0;
    }
    donations.forEach((d) => {
      const date = new Date(d.date);
      const key = date.toLocaleDateString("fr-FR", { month: "short", year: "2-digit" });
      if (key in months) {
        months[key] += d.currency === "USD" ? d.amount : d.amount / 2800;
      }
    });
    return Object.entries(months).map(([month, total]) => ({
      month,
      total: Math.round(total),
    }));
  }, [donations]);

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          label="Événements à venir"
          value={upcoming.length}
          icon={CalendarDays}
          color="from-amber-500 to-amber-700"
          onClick={() => onJump("events")}
        />
        <StatCard
          label="Sermons publiés"
          value={sermons.filter((s) => s.published).length}
          icon={Mic2}
          color="from-rose-500 to-rose-700"
          onClick={() => onJump("sermons")}
        />
        <StatCard
          label="Nouveaux membres"
          value={members.length}
          icon={Users}
          color="from-violet-500 to-violet-700"
          onClick={() => onJump("members")}
        />
        <StatCard
          label="Messages non lus"
          value={unread}
          icon={Mail}
          color="from-sky-500 to-sky-700"
          onClick={() => onJump("messages")}
        />
        <StatCard
          label="Prières en attente"
          value={pendingPrayers}
          icon={Heart}
          color="from-pink-500 to-pink-700"
          onClick={() => onJump("prayers")}
        />
        <StatCard
          label="Dons (USD)"
          value={`$${totalDonationsUSD}`}
          sub="Total enregistré"
          icon={HandCoins}
          color="from-emerald-500 to-emerald-700"
          onClick={() => onJump("donations")}
        />
      </div>

      {/* Charts + recent */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Donations chart */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
                Dons — 6 derniers mois
              </h2>
              <p className="text-xs text-stone-400 mt-0.5">En USD (CDF converti au taux approximatif)</p>
            </div>
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={donationChart} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece8" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#a8a29e" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#a8a29e" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `$${v}`}
              />
              <Tooltip
                formatter={(v: number) => [`$${v}`, "Total"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #e7e5e4",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="total" fill="#b45309" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quick actions */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900 mb-5">
            Accès rapides
          </h2>
          <div className="space-y-2">
            {[
              { icon: CalendarDays, label: "Nouvel événement", tab: "events" as AdminTab, color: "text-amber-700 bg-amber-50" },
              { icon: Mic2, label: "Nouveau sermon", tab: "sermons" as AdminTab, color: "text-rose-700 bg-rose-50" },
              { icon: Bell, label: "Annonce urgente", tab: "announcements" as AdminTab, color: "text-orange-700 bg-orange-50" },
              { icon: Heart, label: "Demandes de prière", tab: "prayers" as AdminTab, color: "text-pink-700 bg-pink-50" },
              { icon: Megaphone, label: "Gérer annonces", tab: "announcements" as AdminTab, color: "text-sky-700 bg-sky-50" },
              { icon: Clock, label: "Horaires", tab: "schedules" as AdminTab, color: "text-violet-700 bg-violet-50" },
              { icon: ImageIcon, label: "Galerie photos", tab: "gallery" as AdminTab, color: "text-emerald-700 bg-emerald-50" },
              { icon: HandCoins, label: "Enregistrer un don", tab: "donations" as AdminTab, color: "text-teal-700 bg-teal-50" },
            ].map(({ icon: Icon, label, tab, color }) => (
              <button
                key={tab + label}
                onClick={() => onJump(tab)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-50 transition text-left"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                  <Icon size={15} />
                </div>
                <span className="text-sm text-stone-700 font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming events + recent messages + prayer requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming events */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
              Prochains événements
            </h2>
            <button
              onClick={() => onJump("events")}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
            >
              Gérer →
            </button>
          </div>
          {upcoming.length === 0 ? (
            <p className="text-center py-8 text-sm text-stone-400">
              Aucun événement à venir.
            </p>
          ) : (
            <ul className="divide-y divide-stone-100">
              {upcoming.slice(0, 4).map((e) => (
                <li key={e.id} className="py-3 flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-800 flex flex-col items-center justify-center shrink-0 border border-amber-100">
                    <div className="text-[9px] uppercase font-semibold leading-none">
                      {new Date(e.date + "T00:00:00").toLocaleDateString("fr-FR", { month: "short" })}
                    </div>
                    <div className="text-sm font-bold leading-none mt-0.5">
                      {new Date(e.date + "T00:00:00").getDate()}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-xs text-stone-900 truncate">
                      {e.title}
                    </div>
                    <div className="text-[11px] text-stone-400 truncate">{e.location}</div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Recent messages */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
              Derniers messages
            </h2>
            <button
              onClick={() => onJump("messages")}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
            >
              Voir tout →
            </button>
          </div>
          {messages.length === 0 ? (
            <p className="text-center py-8 text-sm text-stone-400">Aucun message.</p>
          ) : (
            <ul className="space-y-2.5">
              {[...messages]
                .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
                .slice(0, 4)
                .map((m) => (
                  <li
                    key={m.id}
                    className="border border-stone-100 rounded-xl p-3 hover:bg-stone-50 transition"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="text-xs font-semibold text-stone-900 truncate">
                        {m.name}
                      </div>
                      {!m.read && (
                        <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 ml-2" />
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 truncate">{m.subject}</div>
                    <div className="text-[10px] text-stone-400 mt-1">
                      {fmtDateTime(m.receivedAt)}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>

        {/* Recent prayers */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
              Demandes de prière
            </h2>
            <button
              onClick={() => onJump("prayers")}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
            >
              Voir tout →
            </button>
          </div>
          {prayers.length === 0 ? (
            <p className="text-center py-8 text-sm text-stone-400">Aucune demande.</p>
          ) : (
            <ul className="space-y-2.5">
              {[...prayers]
                .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt))
                .slice(0, 4)
                .map((pr) => (
                  <li key={pr.id} className="border border-stone-100 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-xs font-semibold text-stone-900">
                        {pr.anonymous ? "Anonyme" : pr.name}
                      </span>
                      <span
                        className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full ${
                          pr.status === "en_attente"
                            ? "bg-amber-100 text-amber-700"
                            : pr.status === "prie"
                              ? "bg-sky-100 text-sky-700"
                              : "bg-emerald-100 text-emerald-700"
                        }`}
                      >
                        {pr.status === "en_attente"
                          ? "En attente"
                          : pr.status === "prie"
                            ? "En prière"
                            : "Répondu"}
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500 line-clamp-2">
                      {pr.request}
                    </div>
                    <div className="text-[10px] text-stone-400 mt-1">
                      {fmtDate(pr.receivedAt)}
                    </div>
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>

      {/* Members + Recent sermons */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
              Nouveaux membres
            </h2>
            <button
              onClick={() => onJump("members")}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
            >
              Gérer →
            </button>
          </div>
          <ul className="divide-y divide-stone-100">
            {[...members]
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .slice(0, 5)
              .map((m) => (
                <li key={m.id} className="py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {m.firstName[0]}{m.lastName[0]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-stone-900">
                      {m.firstName} {m.lastName}
                    </div>
                    <div className="text-xs text-stone-400">{m.structure} · {m.quartier}</div>
                  </div>
                  <div className="text-xs text-stone-400 shrink-0">{fmtDate(m.createdAt)}</div>
                </li>
              ))}
          </ul>
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
              Derniers sermons
            </h2>
            <button
              onClick={() => onJump("sermons")}
              className="text-xs text-amber-700 hover:text-amber-800 font-semibold"
            >
              Gérer →
            </button>
          </div>
          <ul className="divide-y divide-stone-100">
            {[...sermons]
              .sort((a, b) => b.date.localeCompare(a.date))
              .slice(0, 5)
              .map((s) => (
                <li key={s.id} className="py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
                    <Mic2 size={14} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-stone-900 truncate">
                      {s.title}
                    </div>
                    <div className="text-xs text-stone-400">{s.speaker} · {s.duration}</div>
                  </div>
                  <span
                    className={`text-[9px] uppercase font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                      s.published
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-stone-100 text-stone-500"
                    }`}
                  >
                    {s.published ? "Publié" : "Brouillon"}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
