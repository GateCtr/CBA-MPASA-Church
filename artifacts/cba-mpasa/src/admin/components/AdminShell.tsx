import { useState } from "react";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Clock,
  HandCoins,
  Heart,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Mail,
  Megaphone,
  Mic2,
  Radio,
  Settings as SettingsIcon,
  Shield,
  UserCog,
  Users,
  Menu,
  X,
} from "lucide-react";
import { useStored } from "../hooks/useStored";
import { SEED_EVENTS } from "../mock-data/events";
import { SEED_SERMONS } from "../mock-data/sermons";
import { SEED_PHOTOS } from "../mock-data/photos";
import { SEED_MESSAGES } from "../mock-data/messages";
import { SEED_MEMBERS } from "../mock-data/members";
import { SEED_PRAYERS } from "../mock-data/prayers";
import { SEED_DONATIONS } from "../mock-data/donations";
import { SEED_SCHEDULES } from "../mock-data/schedules";
import { SEED_ANNOUNCEMENTS } from "../mock-data/announcements";
import { SEED_USERS } from "../mock-data/users";
import { SEED_SETTINGS } from "../mock-data/settings";
import { Dashboard } from "../pages/Dashboard";
import { EventsAdmin } from "../pages/EventsAdmin";
import { SermonsAdmin } from "../pages/SermonsAdmin";
import { GalleryAdmin } from "../pages/GalleryAdmin";
import { LiveAdmin } from "../pages/LiveAdmin";
import { MessagesAdmin } from "../pages/MessagesAdmin";
import { MembersAdmin } from "../pages/MembersAdmin";
import { PrayerAdmin } from "../pages/PrayerAdmin";
import { DonationsAdmin } from "../pages/DonationsAdmin";
import { SchedulesAdmin } from "../pages/SchedulesAdmin";
import { AnnouncementsAdmin } from "../pages/AnnouncementsAdmin";
import { UsersAdmin } from "../pages/UsersAdmin";
import { SettingsAdmin } from "../pages/SettingsAdmin";
import type { AdminTab } from "../types";

type TabConfig = {
  id: AdminTab;
  label: string;
  icon: typeof LayoutDashboard;
  group?: string;
};

const TABS: TabConfig[] = [
  { id: "dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { id: "events", label: "Événements", icon: CalendarDays, group: "Contenu" },
  { id: "sermons", label: "Sermons", icon: Mic2, group: "Contenu" },
  { id: "gallery", label: "Galerie photos", icon: ImageIcon, group: "Contenu" },
  { id: "announcements", label: "Annonces", icon: Megaphone, group: "Contenu" },
  { id: "live", label: "Direct YouTube", icon: Radio, group: "Contenu" },
  { id: "schedules", label: "Horaires", icon: Clock, group: "Contenu" },
  { id: "messages", label: "Messages", icon: Mail, group: "Communauté" },
  { id: "members", label: "Nouveaux membres", icon: Users, group: "Communauté" },
  { id: "prayers", label: "Demandes de prière", icon: Heart, group: "Communauté" },
  { id: "donations", label: "Dons & Finances", icon: HandCoins, group: "Communauté" },
  { id: "users", label: "Utilisateurs", icon: UserCog, group: "Administration" },
  { id: "settings", label: "Paramètres", icon: SettingsIcon, group: "Administration" },
];

const GROUPS = ["Contenu", "Communauté", "Administration"];

interface AdminShellProps {
  user: string;
  onLogout: () => void;
  onExit: () => void;
}

export function AdminShell({ user, onLogout, onExit }: AdminShellProps) {
  const [tab, setTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [events, setEvents] = useStored("cba_admin_events", SEED_EVENTS);
  const [sermons, setSermons] = useStored("cba_admin_sermons", SEED_SERMONS);
  const [photos, setPhotos] = useStored("cba_admin_photos", SEED_PHOTOS);
  const [messages, setMessages] = useStored("cba_admin_messages", SEED_MESSAGES);
  const [members, setMembers] = useStored("cba_admin_members", SEED_MEMBERS);
  const [prayers, setPrayers] = useStored("cba_admin_prayers", SEED_PRAYERS);
  const [donations, setDonations] = useStored("cba_admin_donations", SEED_DONATIONS);
  const [schedules, setSchedules] = useStored("cba_admin_schedules", SEED_SCHEDULES);
  const [announcements, setAnnouncements] = useStored("cba_admin_announcements", SEED_ANNOUNCEMENTS);
  const [users, setUsers] = useStored("cba_admin_users", SEED_USERS);
  const [settings, setSettings] = useStored("cba_admin_settings", SEED_SETTINGS);

  const unreadMessages = messages.filter((m) => !m.read).length;
  const pendingPrayers = prayers.filter((p) => p.status === "en_attente").length;

  const navigate = (t: AdminTab) => {
    setTab(t);
    setSidebarOpen(false);
  };

  const currentTab = TABS.find((t) => t.id === tab);

  const Sidebar = () => (
    <aside className="w-64 bg-stone-900 text-stone-300 flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-stone-800 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-700 rounded-xl flex items-center justify-center shrink-0">
          <Shield size={18} className="text-white" />
        </div>
        <div>
          <div className="font-['Playfair_Display'] font-bold text-white text-base leading-tight">
            Admin CBA
          </div>
          <div className="text-[10px] text-stone-500 uppercase tracking-wider">
            Citadelle de la Foi
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        {/* Dashboard */}
        <NavItem t={TABS[0]} active={tab === "dashboard"} onClick={() => navigate("dashboard")} />

        {/* Grouped items */}
        {GROUPS.map((group) => (
          <div key={group} className="mt-3">
            <div className="px-5 py-1.5 text-[10px] uppercase tracking-widest text-stone-600 font-semibold">
              {group}
            </div>
            {TABS.filter((t) => t.group === group).map((t) => (
              <NavItem
                key={t.id}
                t={t}
                active={tab === t.id}
                onClick={() => navigate(t.id)}
                badge={
                  t.id === "messages" && unreadMessages > 0
                    ? unreadMessages
                    : t.id === "prayers" && pendingPrayers > 0
                      ? pendingPrayers
                      : undefined
                }
              />
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-stone-800 p-4 space-y-1">
        <div className="text-[10px] text-stone-600 px-1 mb-1 uppercase tracking-wide">
          Connecté en tant que
        </div>
        <div className="text-sm text-white font-semibold px-1 mb-2">{user}</div>
        <button
          onClick={onExit}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-stone-400 hover:text-white hover:bg-stone-800 rounded-lg transition"
        >
          <ArrowLeft size={13} /> Voir le site public
        </button>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-300/80 hover:text-white hover:bg-red-900/40 rounded-lg transition"
        >
          <LogOut size={13} /> Se déconnecter
        </button>
      </div>
    </aside>
  );

  return (
    <div className="h-screen overflow-hidden bg-stone-100 font-['Inter'] flex">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-64 z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-stone-500 hover:text-stone-900 p-1.5 rounded-lg hover:bg-stone-100 transition"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-['Playfair_Display'] text-xl lg:text-2xl font-bold text-stone-900">
                {currentTab?.label}
              </h1>
              <div className="text-xs text-stone-400 mt-0.5 hidden sm:block">
                {new Date().toLocaleDateString("fr-FR", {
                  weekday: "long",
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate("messages")}
              className="relative w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition"
              aria-label="Messages"
            >
              <Bell size={16} />
              {(unreadMessages + pendingPrayers) > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-amber-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {unreadMessages + pendingPrayers}
                </span>
              )}
            </button>
            <div className="w-9 h-9 rounded-full bg-amber-700 text-white flex items-center justify-center font-bold text-sm">
              {user.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {tab === "dashboard" && (
            <Dashboard
              events={events}
              sermons={sermons}
              photos={photos}
              messages={messages}
              members={members}
              prayers={prayers}
              donations={donations}
              onJump={navigate}
            />
          )}
          {tab === "events" && <EventsAdmin items={events} setItems={setEvents} />}
          {tab === "sermons" && <SermonsAdmin items={sermons} setItems={setSermons} />}
          {tab === "gallery" && <GalleryAdmin items={photos} setItems={setPhotos} />}
          {tab === "live" && <LiveAdmin settings={settings} setSettings={setSettings} />}
          {tab === "messages" && <MessagesAdmin items={messages} setItems={setMessages} />}
          {tab === "members" && <MembersAdmin items={members} setItems={setMembers} />}
          {tab === "prayers" && <PrayerAdmin items={prayers} setItems={setPrayers} />}
          {tab === "donations" && <DonationsAdmin items={donations} setItems={setDonations} />}
          {tab === "schedules" && <SchedulesAdmin items={schedules} setItems={setSchedules} />}
          {tab === "announcements" && <AnnouncementsAdmin items={announcements} setItems={setAnnouncements} />}
          {tab === "users" && <UsersAdmin items={users} setItems={setUsers} />}
          {tab === "settings" && <SettingsAdmin settings={settings} setSettings={setSettings} />}
        </div>
      </main>
    </div>
  );
}

function NavItem({
  t,
  active,
  onClick,
  badge,
}: {
  t: TabConfig;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  const Icon = t.icon;
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors relative ${
        active
          ? "bg-amber-700/15 text-amber-300 border-l-2 border-amber-500"
          : "hover:bg-stone-800/60 hover:text-white border-l-2 border-transparent"
      }`}
    >
      <Icon size={15} />
      <span className="flex-1 text-left">{t.label}</span>
      {badge !== undefined && badge > 0 && (
        <span className="bg-amber-600 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">
          {badge}
        </span>
      )}
    </button>
  );
}
