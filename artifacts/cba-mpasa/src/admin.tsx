import { useEffect, useMemo, useState } from "react";
import {
  LogOut, LayoutDashboard, CalendarDays, Mic2, Image as ImageIcon, Radio,
  Mail, Users, Settings as SettingsIcon, Plus, Pencil, Trash2, Eye, EyeOff,
  Lock, ArrowLeft, Save, X, Search, Shield, CheckCircle2, AlertCircle, Bell,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════
   AUTH (mock)
   ════════════════════════════════════════════════════════════════ */

const ADMIN_CREDS = { username: "admin", password: "cba2026" };
const SESSION_KEY = "cba_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const SESSION_SIGNATURE = "cba-mpasa::admin::v1";

type AdminSession = { user: string; loggedAt: number; sig: string };

function isValidSession(raw: unknown): raw is AdminSession {
  if (!raw || typeof raw !== "object") return false;
  const s = raw as Record<string, unknown>;
  if (s.user !== ADMIN_CREDS.username) return false;
  if (s.sig !== SESSION_SIGNATURE) return false;
  if (typeof s.loggedAt !== "number" || !Number.isFinite(s.loggedAt)) return false;
  if (Date.now() - s.loggedAt > SESSION_TTL_MS) return false;
  if (s.loggedAt > Date.now() + 60_000) return false;
  return true;
}

function readSession(): AdminSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!isValidSession(parsed)) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function useAdminSession() {
  const [session, setSession] = useState<AdminSession | null>(() => readSession());

  useEffect(() => {
    if (!session) return;
    const remaining = SESSION_TTL_MS - (Date.now() - session.loggedAt);
    if (remaining <= 0) { setSession(null); localStorage.removeItem(SESSION_KEY); return; }
    const timer = window.setTimeout(() => {
      localStorage.removeItem(SESSION_KEY);
      setSession(null);
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [session]);

  const login = (u: string, p: string): { ok: boolean; error?: string } => {
    if (u.trim().toLowerCase() !== ADMIN_CREDS.username) return { ok: false, error: "Identifiant inconnu." };
    if (p !== ADMIN_CREDS.password) return { ok: false, error: "Mot de passe incorrect." };
    const s: AdminSession = { user: ADMIN_CREDS.username, loggedAt: Date.now(), sig: SESSION_SIGNATURE };
    localStorage.setItem(SESSION_KEY, JSON.stringify(s));
    setSession(s);
    return { ok: true };
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setSession(null);
  };

  return { session, login, logout };
}

/* ════════════════════════════════════════════════════════════════
   MOCK DATA (localStorage)
   ════════════════════════════════════════════════════════════════ */

type EventItem = { id: string; date: string; title: string; desc: string; location: string; image: string; tag: string };
type Sermon    = { id: string; title: string; speaker: string; date: string; series: string; duration: string; link: string };
type Photo     = { id: string; src: string; alt: string; cat: "cultes" | "communaute" | "evenements" | "ministeres"; title: string };
type Message   = { id: string; name: string; email: string; subject: string; message: string; receivedAt: string; read: boolean };
type Member    = { id: string; firstName: string; lastName: string; phone: string; quartier: string; structure: string; createdAt: string };
type SiteSettings = {
  youtubeChannelId: string;
  phone: string;
  email: string;
  addressMpasa: string;
  addressNational: string;
  liveTitle: string;
};

const SEED_EVENTS: EventItem[] = [
  { id: "e1", date: "2026-05-04", title: "Conférence MGRN — Mission, Guérison, Restauration", desc: "Trois soirées de réveil avec la fanfare et les chorales unies.", location: "Temple central Mpasa", image: "/images/cba-worship.png", tag: "À venir" },
  { id: "e2", date: "2026-06-15", title: "Convention nationale 40 ans", desc: "Célébration des 40 ans de l'œuvre nationale.", location: "Limete — De Bonhomme n°2", image: "/images/cba-community.png", tag: "À venir" },
  { id: "e3", date: "2026-03-22", title: "Retraite des Mamans Deborah", desc: "Week-end d'intercession et de jeûne.", location: "Mpasa Mikonga", image: "/images/cba-bible.png", tag: "Passé" },
];

const SEED_SERMONS: Sermon[] = [
  { id: "s1", title: "Le peuple d'Autel", speaker: "Past. Principal", date: "2026-04-12", series: "Les 4 piliers", duration: "52 min", link: "" },
  { id: "s2", title: "L'Alliance qui transforme", speaker: "Past. Adjoint", date: "2026-04-05", series: "Les 4 piliers", duration: "48 min", link: "" },
  { id: "s3", title: "MGRN — la vision en marche", speaker: "Past. Principal", date: "2026-03-29", series: "Vision MGRN", duration: "61 min", link: "" },
];

const SEED_PHOTOS: Photo[] = [
  { id: "p1", src: "/images/cba-worship.png",   alt: "Culte d'adoration",    cat: "cultes",     title: "Dimanche 9h" },
  { id: "p2", src: "/images/cba-community.png", alt: "Vie communautaire",    cat: "communaute", title: "Cellule de maison" },
  { id: "p3", src: "/images/cba-bible.png",     alt: "Étude biblique",       cat: "ministeres", title: "Mamans Deborah" },
];

const SEED_MESSAGES: Message[] = [
  { id: "m1", name: "Grâce Mukendi", email: "grace@example.com", subject: "Première visite", message: "Bonjour, j'aimerais venir au culte ce dimanche, à quelle heure puis-je arriver ?", receivedAt: "2026-04-22T08:14:00Z", read: false },
  { id: "m2", name: "Patrick Kabongo", email: "patrick@example.com", subject: "Demande de prière", message: "Merci de prier pour ma famille et mon emploi.", receivedAt: "2026-04-21T19:02:00Z", read: false },
  { id: "m3", name: "Esther Lutumba", email: "esther@example.com", subject: "Rejoindre une structure", message: "Je voudrais intégrer la chorale des Mamans Deborah.", receivedAt: "2026-04-19T11:40:00Z", read: true },
];

const SEED_MEMBERS: Member[] = [
  { id: "n1", firstName: "Joëlle", lastName: "Mbuyi",  phone: "+243 81 000 0001", quartier: "Mpasa I",     structure: "Mamans Deborah",       createdAt: "2026-04-18T10:00:00Z" },
  { id: "n2", firstName: "David",  lastName: "Ilunga", phone: "+243 82 000 0002", quartier: "Mikonga",     structure: "Jeunesse Timothée",    createdAt: "2026-04-15T16:30:00Z" },
  { id: "n3", firstName: "Sarah",  lastName: "Beya",   phone: "+243 89 000 0003", quartier: "Tala Ngai",   structure: "Les Amis de Jésus",    createdAt: "2026-04-12T09:10:00Z" },
];

const SEED_SETTINGS: SiteSettings = {
  youtubeChannelId: "UCxxxxxxxxxxxxxxxxxxxxxx",
  phone: "+243 81 234 5678",
  email: "contact@cbampasa.cd",
  addressMpasa: "Avenue Montali n° 58, Quartier Tala Ngai (Réf. Arrêt CCT, en face de Winners) — Mpasa Mikonga",
  addressNational: "2ème rue Limete, De Bonhomme n° 2 — Kinshasa",
  liveTitle: "Culte en direct — CBA-MPASA",
};

function useStored<T>(key: string, initial: T): [T, (v: T | ((prev: T) => T)) => void] {
  const [val, setVal] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : initial;
    } catch { return initial; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch { /* ignore */ }
  }, [key, val]);
  return [val, setVal];
}

const newId = () => Math.random().toString(36).slice(2, 9);
const fmtDate = (iso: string) => {
  if (!iso) return "—";
  try { return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" }); }
  catch { return iso; }
};
const fmtDateTime = (iso: string) => {
  try { return new Date(iso).toLocaleString("fr-FR", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }); }
  catch { return iso; }
};

/* ════════════════════════════════════════════════════════════════
   LOGIN PAGE
   ════════════════════════════════════════════════════════════════ */

function AdminLogin({ onLogin, onBack }: { onLogin: (u: string, p: string) => { ok: boolean; error?: string }; onBack: () => void }) {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    setTimeout(() => {
      const r = onLogin(u, p);
      setLoading(false);
      if (!r.ok) setErr(r.error || "Échec de connexion.");
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900 flex items-center justify-center px-6 py-10 font-['Inter']">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="inline-flex items-center gap-2 text-amber-200/80 hover:text-white text-sm mb-6 transition">
          <ArrowLeft size={14} /> Retour au site
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-700 to-amber-800 px-8 py-7 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-11 h-11 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Shield size={20} />
              </div>
              <div>
                <div className="font-['Playfair_Display'] font-bold text-2xl leading-tight">Espace Administration</div>
                <div className="text-amber-100/90 text-xs">CBA-MPASA · Citadelle de la Foi</div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="p-8 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Identifiant</label>
              <input
                type="text"
                autoComplete="username"
                value={u}
                onChange={(e) => setU(e.target.value)}
                placeholder="admin"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  value={p}
                  onChange={(e) => setP(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-11 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
                  required
                />
                <button type="button" onClick={() => setShowPwd((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-700 transition" aria-label="Afficher/masquer le mot de passe">
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {err && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-4 py-3 flex items-start gap-2">
                <AlertCircle size={15} className="mt-0.5 shrink-0" />
                <span>{err}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 disabled:bg-amber-700/60 disabled:cursor-wait text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md"
            >
              <Lock size={15} /> {loading ? "Connexion en cours…" : "Se connecter"}
            </button>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-900">
              <div className="font-semibold mb-1.5 flex items-center gap-1.5"><Shield size={12} /> Démonstration</div>
              <div className="font-mono space-y-0.5">
                <div>Identifiant&nbsp;: <span className="bg-white px-1.5 py-0.5 rounded border border-amber-200">admin</span></div>
                <div>Mot de passe&nbsp;: <span className="bg-white px-1.5 py-0.5 rounded border border-amber-200">cba2026</span></div>
              </div>
              <div className="mt-2 text-amber-800/80 normal-case">
                Authentification simulée — données stockées localement dans le navigateur.
              </div>
            </div>
          </form>
        </div>

        <div className="text-center text-amber-200/60 text-xs mt-6">
          © {new Date().getFullYear()} CBA-MPASA · Espace réservé au personnel
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   ADMIN SHELL
   ════════════════════════════════════════════════════════════════ */

type AdminTab = "dashboard" | "events" | "sermons" | "gallery" | "live" | "messages" | "members" | "settings";

const TABS: { id: AdminTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "events",    label: "Événements",      icon: CalendarDays },
  { id: "sermons",   label: "Sermons",         icon: Mic2 },
  { id: "gallery",   label: "Galerie",         icon: ImageIcon },
  { id: "live",      label: "Direct YouTube",  icon: Radio },
  { id: "messages",  label: "Messages",        icon: Mail },
  { id: "members",   label: "Nouveaux membres", icon: Users },
  { id: "settings",  label: "Paramètres",      icon: SettingsIcon },
];

function AdminShell({ user, onLogout, onExit }: { user: string; onLogout: () => void; onExit: () => void }) {
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [events, setEvents]     = useStored<EventItem[]>("cba_admin_events",   SEED_EVENTS);
  const [sermons, setSermons]   = useStored<Sermon[]>("cba_admin_sermons",     SEED_SERMONS);
  const [photos, setPhotos]     = useStored<Photo[]>("cba_admin_photos",       SEED_PHOTOS);
  const [messages, setMessages] = useStored<Message[]>("cba_admin_messages",   SEED_MESSAGES);
  const [members, setMembers]   = useStored<Member[]>("cba_admin_members",     SEED_MEMBERS);
  const [settings, setSettings] = useStored<SiteSettings>("cba_admin_settings", SEED_SETTINGS);

  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-stone-100 font-['Inter'] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col shrink-0 sticky top-0 h-screen">
        <div className="px-5 py-5 border-b border-stone-800 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center">
            <Shield size={18} className="text-white" />
          </div>
          <div>
            <div className="font-['Playfair_Display'] font-bold text-white text-base leading-tight">Admin CBA</div>
            <div className="text-[10px] text-stone-500 uppercase tracking-wider">Citadelle de la Foi</div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {TABS.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors relative ${
                  active ? "bg-amber-700/15 text-amber-300 border-l-2 border-amber-500" : "hover:bg-stone-800/60 hover:text-white border-l-2 border-transparent"
                }`}
              >
                <Icon size={16} />
                <span className="flex-1 text-left">{t.label}</span>
                {t.id === "messages" && unread > 0 && (
                  <span className="bg-amber-600 text-white text-[10px] font-bold rounded-full px-2 py-0.5">{unread}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-stone-800 p-4 space-y-2">
          <div className="text-[11px] text-stone-500 px-1">Connecté en tant que</div>
          <div className="text-sm text-white font-medium px-1 mb-2">{user}</div>
          <button
            onClick={onExit}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition"
          >
            <ArrowLeft size={13} /> Voir le site public
          </button>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-300 hover:text-white hover:bg-red-900/40 rounded-lg transition"
          >
            <LogOut size={13} /> Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-stone-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="font-['Playfair_Display'] text-2xl font-bold text-stone-900">
              {TABS.find((t) => t.id === tab)?.label}
            </h1>
            <div className="text-xs text-stone-500 mt-0.5">
              {new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setTab("messages")} className="relative w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition" aria-label="Notifications">
              <Bell size={16} />
              {unread > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{unread}</span>}
            </button>
            <div className="w-9 h-9 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-sm">
              {user.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-8">
          {tab === "dashboard" && <Dashboard events={events} sermons={sermons} photos={photos} messages={messages} members={members} onJump={setTab} />}
          {tab === "events"    && <EventsAdmin items={events} setItems={setEvents} />}
          {tab === "sermons"   && <SermonsAdmin items={sermons} setItems={setSermons} />}
          {tab === "gallery"   && <GalleryAdmin items={photos} setItems={setPhotos} />}
          {tab === "live"      && <LiveAdmin settings={settings} setSettings={setSettings} />}
          {tab === "messages"  && <MessagesAdmin items={messages} setItems={setMessages} />}
          {tab === "members"   && <MembersAdmin items={members} setItems={setMembers} />}
          {tab === "settings"  && <SettingsAdmin settings={settings} setSettings={setSettings} />}
        </div>
      </main>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   DASHBOARD
   ════════════════════════════════════════════════════════════════ */

function Dashboard({
  events, sermons, photos, messages, members, onJump,
}: {
  events: EventItem[]; sermons: Sermon[]; photos: Photo[]; messages: Message[]; members: Member[];
  onJump: (t: AdminTab) => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const unread = messages.filter((m) => !m.read).length;

  const cards: { label: string; value: number; icon: typeof CalendarDays; color: string; tab: AdminTab }[] = [
    { label: "Événements à venir", value: upcoming.length, icon: CalendarDays, color: "from-amber-500 to-amber-700",   tab: "events" },
    { label: "Sermons publiés",    value: sermons.length,  icon: Mic2,         color: "from-rose-500 to-rose-700",     tab: "sermons" },
    { label: "Photos en galerie",  value: photos.length,   icon: ImageIcon,    color: "from-emerald-500 to-emerald-700", tab: "gallery" },
    { label: "Messages non lus",   value: unread,          icon: Mail,         color: "from-sky-500 to-sky-700",       tab: "messages" },
    { label: "Nouveaux membres",   value: members.length,  icon: Users,        color: "from-violet-500 to-violet-700", tab: "members" },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => onJump(c.tab)}
            className="bg-white border border-stone-200 rounded-2xl p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition group"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <c.icon size={18} />
            </div>
            <div className="text-3xl font-bold text-stone-900 leading-none mb-1.5">{c.value}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide">{c.label}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">Prochains événements</h2>
            <button onClick={() => onJump("events")} className="text-xs text-amber-700 hover:text-amber-800 font-semibold">Tout gérer →</button>
          </div>
          {upcoming.length === 0 ? (
            <EmptyState text="Aucun événement à venir." />
          ) : (
            <ul className="divide-y divide-stone-100">
              {upcoming.slice(0, 5).map((e) => (
                <li key={e.id} className="py-3 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex flex-col items-center justify-center shrink-0 border border-amber-100">
                    <div className="text-[10px] uppercase font-semibold leading-none">{new Date(e.date).toLocaleDateString("fr-FR", { month: "short" })}</div>
                    <div className="text-base font-bold leading-none mt-0.5">{new Date(e.date).getDate()}</div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-sm text-stone-900 truncate">{e.title}</div>
                    <div className="text-xs text-stone-500 truncate">{e.location}</div>
                  </div>
                  <span className="text-[10px] uppercase tracking-wide text-amber-700 font-semibold bg-amber-50 px-2 py-1 rounded-full">{e.tag}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white border border-stone-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">Derniers messages</h2>
            <button onClick={() => onJump("messages")} className="text-xs text-amber-700 hover:text-amber-800 font-semibold">Voir tout →</button>
          </div>
          {messages.length === 0 ? (
            <EmptyState text="Aucun message reçu." />
          ) : (
            <ul className="space-y-3">
              {[...messages].sort((a, b) => b.receivedAt.localeCompare(a.receivedAt)).slice(0, 4).map((m) => (
                <li key={m.id} className="border border-stone-100 rounded-xl p-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-semibold text-stone-900 truncate">{m.name}</div>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />}
                  </div>
                  <div className="text-xs text-stone-500 truncate">{m.subject}</div>
                  <div className="text-[10px] text-stone-400 mt-1">{fmtDateTime(m.receivedAt)}</div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="text-center py-8 text-sm text-stone-400">{text}</div>;
}

/* ════════════════════════════════════════════════════════════════
   GENERIC TOOLBAR + MODAL
   ════════════════════════════════════════════════════════════════ */

function Toolbar({ search, setSearch, onAdd, addLabel = "Ajouter", placeholder = "Rechercher…" }: { search: string; setSearch: (s: string) => void; onAdd?: () => void; addLabel?: string; placeholder?: string; }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-5">
      <div className="relative flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition"
        />
      </div>
      {onAdd && (
        <button onClick={onAdd} className="inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition shadow-sm">
          <Plus size={15} /> {addLabel}
        </button>
      )}
    </div>
  );
}

function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <div className="bg-red-50 border border-red-100 text-red-700 text-sm rounded-lg px-3 py-2.5 flex items-start gap-2">
      <AlertCircle size={14} className="mt-0.5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 bg-stone-900/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200">
          <h3 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">{title}</h3>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-700 transition" aria-label="Fermer"><X size={18} /></button>
        </div>
        <div className="overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-500 mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-stone-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition";

function ConfirmDelete({ open, onCancel, onConfirm, label }: { open: boolean; onCancel: () => void; onConfirm: () => void; label: string }) {
  return (
    <Modal open={open} onClose={onCancel} title="Confirmer la suppression">
      <p className="text-sm text-stone-600 mb-6">Voulez-vous vraiment supprimer <span className="font-semibold text-stone-900">« {label} »</span> ? Cette action est irréversible.</p>
      <div className="flex justify-end gap-2">
        <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition">Annuler</button>
        <button onClick={onConfirm} className="px-4 py-2 text-sm rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition inline-flex items-center gap-2">
          <Trash2 size={14} /> Supprimer
        </button>
      </div>
    </Modal>
  );
}

/* ════════════════════════════════════════════════════════════════
   EVENTS
   ════════════════════════════════════════════════════════════════ */

function EventsAdmin({ items, setItems }: { items: EventItem[]; setItems: (v: EventItem[] | ((p: EventItem[]) => EventItem[])) => void }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter((e) => !q || e.title.toLowerCase().includes(q) || e.location.toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, search]);

  const openCreate = () => { setError(null); setEditing({ id: "", date: "", title: "", desc: "", location: "", image: "/images/cba-worship.png", tag: "À venir" }); setModal(true); };
  const openEdit = (e: EventItem) => { setError(null); setEditing({ ...e }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); setError(null); };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) { setError("Le titre est obligatoire."); return; }
    if (!editing.date) { setError("La date est obligatoire."); return; }
    if (!editing.location.trim()) { setError("Le lieu est obligatoire."); return; }
    setError(null);
    if (editing.id) setItems((prev) => prev.map((x) => (x.id === editing.id ? editing : x)));
    else setItems((prev) => [{ ...editing, id: newId() }, ...prev]);
    closeModal();
  };

  const remove = (id: string) => { setItems((prev) => prev.filter((x) => x.id !== id)); setConfirmId(null); };

  return (
    <div>
      <Toolbar search={search} setSearch={setSearch} onAdd={openCreate} addLabel="Nouvel événement" placeholder="Rechercher un événement…" />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Titre</th>
              <th className="text-left px-5 py-3 font-semibold">Lieu</th>
              <th className="text-left px-5 py-3 font-semibold">Étiquette</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && (
              <tr><td colSpan={5}><EmptyState text="Aucun événement." /></td></tr>
            )}
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-stone-50/60">
                <td className="px-5 py-4 whitespace-nowrap text-stone-700">{fmtDate(e.date)}</td>
                <td className="px-5 py-4 font-medium text-stone-900">{e.title}</td>
                <td className="px-5 py-4 text-stone-600">{e.location}</td>
                <td className="px-5 py-4">
                  <span className={`text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full ${e.tag === "À venir" ? "bg-emerald-50 text-emerald-700" : "bg-stone-100 text-stone-600"}`}>{e.tag}</span>
                </td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button onClick={() => openEdit(e)} className="text-stone-500 hover:text-amber-700 p-1.5 transition" aria-label="Éditer"><Pencil size={15} /></button>
                  <button onClick={() => setConfirmId(e.id)} className="text-stone-500 hover:text-red-600 p-1.5 transition ml-1" aria-label="Supprimer"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier l'événement" : "Nouvel événement"}>
        {editing && (
          <div className="space-y-4">
            <Field label="Titre *"><input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date *"><input type="date" className={inputCls} value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></Field>
              <Field label="Étiquette">
                <select className={inputCls} value={editing.tag} onChange={(e) => setEditing({ ...editing, tag: e.target.value })}>
                  <option>À venir</option>
                  <option>Passé</option>
                  <option>Annulé</option>
                </select>
              </Field>
            </div>
            <Field label="Lieu *"><input className={inputCls} value={editing.location} onChange={(e) => setEditing({ ...editing, location: e.target.value })} /></Field>
            <Field label="Image (URL)"><input className={inputCls} value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} /></Field>
            <Field label="Description"><textarea rows={3} className={inputCls + " resize-none"} value={editing.desc} onChange={(e) => setEditing({ ...editing, desc: e.target.value })} /></Field>
            <FormError message={error} />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition">Annuler</button>
              <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold inline-flex items-center gap-2 transition"><Save size={14} /> Enregistrer</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDelete open={!!confirmId} onCancel={() => setConfirmId(null)} onConfirm={() => confirmId && remove(confirmId)} label={items.find((x) => x.id === confirmId)?.title || ""} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   SERMONS
   ════════════════════════════════════════════════════════════════ */

function SermonsAdmin({ items, setItems }: { items: Sermon[]; setItems: (v: Sermon[] | ((p: Sermon[]) => Sermon[])) => void }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Sermon | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter((s) => !q || s.title.toLowerCase().includes(q) || s.speaker.toLowerCase().includes(q) || s.series.toLowerCase().includes(q))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [items, search]);

  const openCreate = () => { setError(null); setEditing({ id: "", title: "", speaker: "", date: "", series: "", duration: "", link: "" }); setModal(true); };
  const openEdit = (s: Sermon) => { setError(null); setEditing({ ...s }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); setError(null); };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) { setError("Le titre est obligatoire."); return; }
    if (!editing.speaker.trim()) { setError("Le nom du prédicateur est obligatoire."); return; }
    if (!editing.date) { setError("La date est obligatoire."); return; }
    setError(null);
    if (editing.id) setItems((prev) => prev.map((x) => (x.id === editing.id ? editing : x)));
    else setItems((prev) => [{ ...editing, id: newId() }, ...prev]);
    closeModal();
  };

  const remove = (id: string) => { setItems((prev) => prev.filter((x) => x.id !== id)); setConfirmId(null); };

  return (
    <div>
      <Toolbar search={search} setSearch={setSearch} onAdd={openCreate} addLabel="Nouveau sermon" placeholder="Rechercher un sermon…" />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Date</th>
              <th className="text-left px-5 py-3 font-semibold">Titre</th>
              <th className="text-left px-5 py-3 font-semibold">Prédicateur</th>
              <th className="text-left px-5 py-3 font-semibold">Série</th>
              <th className="text-left px-5 py-3 font-semibold">Durée</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && <tr><td colSpan={6}><EmptyState text="Aucun sermon." /></td></tr>}
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-stone-50/60">
                <td className="px-5 py-4 whitespace-nowrap text-stone-700">{fmtDate(s.date)}</td>
                <td className="px-5 py-4 font-medium text-stone-900">{s.title}</td>
                <td className="px-5 py-4 text-stone-600">{s.speaker}</td>
                <td className="px-5 py-4 text-stone-600">{s.series}</td>
                <td className="px-5 py-4 text-stone-600">{s.duration}</td>
                <td className="px-5 py-4 text-right whitespace-nowrap">
                  <button onClick={() => openEdit(s)} className="text-stone-500 hover:text-amber-700 p-1.5 transition" aria-label="Éditer"><Pencil size={15} /></button>
                  <button onClick={() => setConfirmId(s.id)} className="text-stone-500 hover:text-red-600 p-1.5 transition ml-1" aria-label="Supprimer"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier le sermon" : "Nouveau sermon"}>
        {editing && (
          <div className="space-y-4">
            <Field label="Titre *"><input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Prédicateur *"><input className={inputCls} value={editing.speaker} onChange={(e) => setEditing({ ...editing, speaker: e.target.value })} /></Field>
              <Field label="Date *"><input type="date" className={inputCls} value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Série"><input className={inputCls} value={editing.series} onChange={(e) => setEditing({ ...editing, series: e.target.value })} /></Field>
              <Field label="Durée"><input className={inputCls} placeholder="Ex : 52 min" value={editing.duration} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} /></Field>
            </div>
            <Field label="Lien YouTube ou audio"><input className={inputCls} placeholder="https://..." value={editing.link} onChange={(e) => setEditing({ ...editing, link: e.target.value })} /></Field>
            <FormError message={error} />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition">Annuler</button>
              <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold inline-flex items-center gap-2 transition"><Save size={14} /> Enregistrer</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDelete open={!!confirmId} onCancel={() => setConfirmId(null)} onConfirm={() => confirmId && remove(confirmId)} label={items.find((x) => x.id === confirmId)?.title || ""} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GALLERY
   ════════════════════════════════════════════════════════════════ */

function GalleryAdmin({ items, setItems }: { items: Photo[]; setItems: (v: Photo[] | ((p: Photo[]) => Photo[])) => void }) {
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState<Photo | null>(null);
  const [modal, setModal] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((p) => !q || p.title.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q));
  }, [items, search]);

  const openCreate = () => { setError(null); setEditing({ id: "", src: "", alt: "", cat: "cultes", title: "" }); setModal(true); };
  const openEdit = (p: Photo) => { setError(null); setEditing({ ...p }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); setError(null); };

  const save = () => {
    if (!editing) return;
    if (!editing.title.trim()) { setError("Le titre est obligatoire."); return; }
    if (!editing.src.trim()) { setError("L'URL de l'image est obligatoire."); return; }
    setError(null);
    if (editing.id) setItems((prev) => prev.map((x) => (x.id === editing.id ? editing : x)));
    else setItems((prev) => [{ ...editing, id: newId() }, ...prev]);
    closeModal();
  };
  const remove = (id: string) => { setItems((prev) => prev.filter((x) => x.id !== id)); setConfirmId(null); };

  const catLabel = (c: Photo["cat"]) => ({ cultes: "Cultes & Adoration", communaute: "Vie communautaire", evenements: "Événements", ministeres: "Structures" }[c]);

  return (
    <div>
      <Toolbar search={search} setSearch={setSearch} onAdd={openCreate} addLabel="Ajouter une photo" placeholder="Rechercher une photo…" />

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.length === 0 && <div className="col-span-full"><EmptyState text="Aucune photo." /></div>}
        {filtered.map((p) => (
          <div key={p.id} className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden">
            <div className="aspect-[4/3] bg-stone-100 overflow-hidden">
              {p.src ? <img src={p.src} alt={p.alt} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-stone-300"><ImageIcon size={28} /></div>}
            </div>
            <div className="p-3">
              <div className="text-[10px] text-amber-700 uppercase tracking-wide font-semibold">{catLabel(p.cat)}</div>
              <div className="text-sm font-semibold text-stone-900 truncate mt-0.5">{p.title}</div>
            </div>
            <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition">
              <button onClick={() => openEdit(p)} className="w-8 h-8 bg-white/95 hover:bg-amber-700 hover:text-white rounded-lg flex items-center justify-center text-stone-700 shadow transition" aria-label="Éditer"><Pencil size={13} /></button>
              <button onClick={() => setConfirmId(p.id)} className="w-8 h-8 bg-white/95 hover:bg-red-600 hover:text-white rounded-lg flex items-center justify-center text-stone-700 shadow transition" aria-label="Supprimer"><Trash2 size={13} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modal} onClose={closeModal} title={editing?.id ? "Modifier la photo" : "Ajouter une photo"}>
        {editing && (
          <div className="space-y-4">
            <Field label="Titre *"><input className={inputCls} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} /></Field>
            <Field label="URL de l'image *"><input className={inputCls} placeholder="/images/... ou https://..." value={editing.src} onChange={(e) => setEditing({ ...editing, src: e.target.value })} /></Field>
            <Field label="Texte alternatif (accessibilité)"><input className={inputCls} value={editing.alt} onChange={(e) => setEditing({ ...editing, alt: e.target.value })} /></Field>
            <Field label="Catégorie">
              <select className={inputCls} value={editing.cat} onChange={(e) => setEditing({ ...editing, cat: e.target.value as Photo["cat"] })}>
                <option value="cultes">Cultes & Adoration</option>
                <option value="communaute">Vie communautaire</option>
                <option value="evenements">Événements</option>
                <option value="ministeres">Structures</option>
              </select>
            </Field>
            {editing.src && (
              <div className="rounded-lg overflow-hidden border border-stone-200">
                <img src={editing.src} alt="" className="w-full h-44 object-cover" />
              </div>
            )}
            <FormError message={error} />
            <div className="flex justify-end gap-2 pt-2">
              <button onClick={closeModal} className="px-4 py-2 text-sm rounded-lg border border-stone-200 hover:bg-stone-50 transition">Annuler</button>
              <button onClick={save} className="px-4 py-2 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-semibold inline-flex items-center gap-2 transition"><Save size={14} /> Enregistrer</button>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDelete open={!!confirmId} onCancel={() => setConfirmId(null)} onConfirm={() => confirmId && remove(confirmId)} label={items.find((x) => x.id === confirmId)?.title || ""} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   LIVE / YOUTUBE
   ════════════════════════════════════════════════════════════════ */

function LiveAdmin({ settings, setSettings }: { settings: SiteSettings; setSettings: (v: SiteSettings | ((p: SiteSettings) => SiteSettings)) => void }) {
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(settings), [settings]);

  const save = () => {
    setSettings(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  const dirty = JSON.stringify(draft) !== JSON.stringify(settings);
  const previewSrc = `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(draft.youtubeChannelId)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-['Playfair_Display'] font-bold text-lg text-stone-900 mb-1">Paramètres du Direct</h3>
          <p className="text-xs text-stone-500">Configurez la chaîne YouTube diffusée sur la page « Direct ».</p>
        </div>
        <Field label="ID de la chaîne YouTube">
          <input className={inputCls} value={draft.youtubeChannelId} onChange={(e) => setDraft({ ...draft, youtubeChannelId: e.target.value })} placeholder="UCxxxxxxxxxxxxxxxxxxxxxx" />
        </Field>
        <Field label="Titre affiché à côté du lecteur">
          <input className={inputCls} value={draft.liveTitle} onChange={(e) => setDraft({ ...draft, liveTitle: e.target.value })} />
        </Field>
        <div className="flex items-center justify-between pt-2">
          {saved && <span className="text-xs text-emerald-600 font-medium inline-flex items-center gap-1.5"><CheckCircle2 size={13} /> Modifications enregistrées</span>}
          <button onClick={save} disabled={!dirty} className="ml-auto px-5 py-2.5 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold inline-flex items-center gap-2 transition">
            <Save size={14} /> Enregistrer
          </button>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-900">
          <strong>Astuce :</strong> l'ID de chaîne est visible dans l'URL de votre chaîne YouTube après <code>/channel/</code>.
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">Aperçu</h3>
          <span className="inline-flex items-center gap-1.5 text-xs text-red-600 font-semibold"><span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" /> EN DIRECT</span>
        </div>
        <div className="aspect-video bg-stone-900 rounded-xl overflow-hidden">
          <iframe
            title="Aperçu Direct"
            className="w-full h-full"
            src={previewSrc}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="text-xs text-stone-500 mt-3">{draft.liveTitle}</div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MESSAGES
   ════════════════════════════════════════════════════════════════ */

function MessagesAdmin({ items, setItems }: { items: Message[]; setItems: (v: Message[] | ((p: Message[]) => Message[])) => void }) {
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter((m) => !q || m.name.toLowerCase().includes(q) || m.subject.toLowerCase().includes(q) || m.message.toLowerCase().includes(q))
      .sort((a, b) => b.receivedAt.localeCompare(a.receivedAt));
  }, [items, search]);

  const open = (id: string) => {
    setOpenId(id);
    setItems((prev) => prev.map((m) => (m.id === id ? { ...m, read: true } : m)));
  };

  const remove = (id: string) => { setItems((prev) => prev.filter((m) => m.id !== id)); setConfirmId(null); setOpenId(null); };
  const toggleRead = (id: string) => setItems((prev) => prev.map((m) => (m.id === id ? { ...m, read: !m.read } : m)));

  const current = items.find((m) => m.id === openId) || null;

  return (
    <div>
      <Toolbar search={search} setSearch={setSearch} placeholder="Rechercher dans les messages…" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white border border-stone-200 rounded-2xl overflow-hidden">
          <ul className="divide-y divide-stone-100 max-h-[640px] overflow-y-auto">
            {filtered.length === 0 && <li><EmptyState text="Aucun message." /></li>}
            {filtered.map((m) => (
              <li key={m.id}>
                <button onClick={() => open(m.id)} className={`w-full text-left px-5 py-4 hover:bg-stone-50 transition ${openId === m.id ? "bg-amber-50/60" : ""}`}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm font-semibold text-stone-900 truncate">{m.name}</div>
                    {!m.read && <span className="w-2 h-2 rounded-full bg-amber-600 shrink-0 ml-2" />}
                  </div>
                  <div className="text-xs text-stone-600 truncate">{m.subject}</div>
                  <div className="text-[10px] text-stone-400 mt-1">{fmtDateTime(m.receivedAt)}</div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-6 min-h-[400px]">
          {!current ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400 py-20">
              <Mail size={36} className="mb-3" />
              <p className="text-sm">Sélectionnez un message pour le lire.</p>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-stone-100 mb-5">
                <div>
                  <h3 className="font-['Playfair_Display'] text-xl font-bold text-stone-900 mb-1">{current.subject}</h3>
                  <div className="text-sm text-stone-700">{current.name} · <a href={`mailto:${current.email}`} className="text-amber-700 hover:underline">{current.email}</a></div>
                  <div className="text-xs text-stone-400 mt-1">{fmtDateTime(current.receivedAt)}</div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => toggleRead(current.id)} className="px-3 py-2 text-xs rounded-lg border border-stone-200 hover:bg-stone-50 transition inline-flex items-center gap-1.5">
                    {current.read ? <><EyeOff size={13} /> Marquer non lu</> : <><Eye size={13} /> Marquer lu</>}
                  </button>
                  <button onClick={() => setConfirmId(current.id)} className="px-3 py-2 text-xs rounded-lg border border-red-200 text-red-700 hover:bg-red-50 transition inline-flex items-center gap-1.5">
                    <Trash2 size={13} /> Supprimer
                  </button>
                </div>
              </div>
              <div className="text-sm text-stone-700 leading-relaxed whitespace-pre-line">{current.message}</div>
              <div className="mt-8 pt-6 border-t border-stone-100">
                <a href={`mailto:${current.email}?subject=Re:%20${encodeURIComponent(current.subject)}`} className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition">
                  <Mail size={14} /> Répondre par email
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmDelete open={!!confirmId} onCancel={() => setConfirmId(null)} onConfirm={() => confirmId && remove(confirmId)} label={items.find((m) => m.id === confirmId)?.subject || ""} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   MEMBERS
   ════════════════════════════════════════════════════════════════ */

function MembersAdmin({ items, setItems }: { items: Member[]; setItems: (v: Member[] | ((p: Member[]) => Member[])) => void }) {
  const [search, setSearch] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return [...items]
      .filter((m) => !q || m.firstName.toLowerCase().includes(q) || m.lastName.toLowerCase().includes(q) || m.quartier.toLowerCase().includes(q) || m.structure.toLowerCase().includes(q))
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }, [items, search]);

  const remove = (id: string) => { setItems((prev) => prev.filter((m) => m.id !== id)); setConfirmId(null); };

  return (
    <div>
      <Toolbar search={search} setSearch={setSearch} placeholder="Rechercher un membre…" />

      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-stone-50 text-xs text-stone-500 uppercase tracking-wide">
            <tr>
              <th className="text-left px-5 py-3 font-semibold">Nom</th>
              <th className="text-left px-5 py-3 font-semibold">Téléphone</th>
              <th className="text-left px-5 py-3 font-semibold">Quartier</th>
              <th className="text-left px-5 py-3 font-semibold">Structure</th>
              <th className="text-left px-5 py-3 font-semibold">Inscrit le</th>
              <th className="text-right px-5 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 && <tr><td colSpan={6}><EmptyState text="Aucun nouveau membre." /></td></tr>}
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-stone-50/60">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center">{m.firstName.slice(0,1)}{m.lastName.slice(0,1)}</div>
                    <span className="font-medium text-stone-900">{m.firstName} {m.lastName}</span>
                  </div>
                </td>
                <td className="px-5 py-4 text-stone-600 whitespace-nowrap">{m.phone}</td>
                <td className="px-5 py-4 text-stone-600">{m.quartier}</td>
                <td className="px-5 py-4">
                  <span className="text-[10px] uppercase tracking-wide font-semibold px-2 py-1 rounded-full bg-amber-50 text-amber-700">{m.structure}</span>
                </td>
                <td className="px-5 py-4 text-stone-500 whitespace-nowrap">{fmtDate(m.createdAt)}</td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => setConfirmId(m.id)} className="text-stone-500 hover:text-red-600 p-1.5 transition" aria-label="Supprimer"><Trash2 size={15} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDelete open={!!confirmId} onCancel={() => setConfirmId(null)} onConfirm={() => confirmId && remove(confirmId)} label={(() => { const m = items.find((x) => x.id === confirmId); return m ? `${m.firstName} ${m.lastName}` : ""; })()} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   GENERAL SETTINGS
   ════════════════════════════════════════════════════════════════ */

function SettingsAdmin({ settings, setSettings }: { settings: SiteSettings; setSettings: (v: SiteSettings | ((p: SiteSettings) => SiteSettings)) => void }) {
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);
  useEffect(() => setDraft(settings), [settings]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(settings);
  const save = () => { setSettings(draft); setSaved(true); setTimeout(() => setSaved(false), 2200); };

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 max-w-3xl space-y-5">
      <div>
        <h3 className="font-['Playfair_Display'] font-bold text-lg text-stone-900 mb-1">Coordonnées de l'église</h3>
        <p className="text-xs text-stone-500">Ces informations apparaissent dans la barre de navigation, la page Contact et les données SEO.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Téléphone"><input className={inputCls} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} /></Field>
        <Field label="Email"><input className={inputCls} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} /></Field>
      </div>
      <Field label="Adresse — Mpasa Mikonga"><textarea rows={2} className={inputCls + " resize-none"} value={draft.addressMpasa} onChange={(e) => setDraft({ ...draft, addressMpasa: e.target.value })} /></Field>
      <Field label="Adresse — Siège national"><textarea rows={2} className={inputCls + " resize-none"} value={draft.addressNational} onChange={(e) => setDraft({ ...draft, addressNational: e.target.value })} /></Field>

      <div className="flex items-center justify-between pt-2 border-t border-stone-100">
        {saved && <span className="text-xs text-emerald-600 font-medium inline-flex items-center gap-1.5"><CheckCircle2 size={13} /> Modifications enregistrées</span>}
        <button onClick={save} disabled={!dirty} className="ml-auto px-5 py-2.5 text-sm rounded-lg bg-amber-700 hover:bg-amber-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold inline-flex items-center gap-2 transition">
          <Save size={14} /> Enregistrer
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   PUBLIC ENTRY POINT
   ════════════════════════════════════════════════════════════════ */

export default function AdminApp({ onExit }: { onExit: () => void }) {
  const { session, login, logout } = useAdminSession();

  if (!session) {
    return <AdminLogin onLogin={login} onBack={onExit} />;
  }
  return <AdminShell user={session.user} onLogout={logout} onExit={onExit} />;
}
