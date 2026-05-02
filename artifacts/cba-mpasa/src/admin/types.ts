export type EventItem = {
  id: string;
  date: string;
  title: string;
  desc: string;
  location: string;
  image: string;
  tag: "À venir" | "Passé" | "Annulé";
};

export type Sermon = {
  id: string;
  title: string;
  speaker: string;
  date: string;
  series: string;
  duration: string;
  link: string;
  published: boolean;
};

export type Photo = {
  id: string;
  src: string;
  alt: string;
  cat: "cultes" | "communaute" | "evenements" | "ministeres";
  title: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
  read: boolean;
  replied: boolean;
};

export type Member = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  quartier: string;
  structure: string;
  baptized: boolean;
  notes: string;
  createdAt: string;
};

export type PrayerRequest = {
  id: string;
  name: string;
  anonymous: boolean;
  request: string;
  category: "sante" | "famille" | "travail" | "spirituel" | "autre";
  receivedAt: string;
  status: "en_attente" | "prie" | "repondu";
  notes: string;
};

export type Donation = {
  id: string;
  name: string;
  anonymous: boolean;
  amount: number;
  currency: "USD" | "CDF";
  method: "mobile_money" | "virement" | "especes" | "autre";
  date: string;
  category: "dime" | "offrande" | "don_special" | "construction" | "mission";
  notes: string;
};

export type Schedule = {
  id: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  title: string;
  location: string;
  description: string;
  recurring: boolean;
};

export type Announcement = {
  id: string;
  title: string;
  content: string;
  type: "info" | "urgent" | "event" | "priere";
  publishedAt: string;
  expiresAt: string;
  visible: boolean;
};

export type AdminUser = {
  id: string;
  username: string;
  displayName: string;
  role: "super_admin" | "admin" | "editor" | "viewer";
  createdAt: string;
  lastLogin: string;
  active: boolean;
};

export type SiteSettings = {
  youtubeChannelId: string;
  phone: string;
  email: string;
  addressMpasa: string;
  addressNational: string;
  liveTitle: string;
  facebookUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
  foundingYear: string;
  pastor: string;
  vision: string;
};

export type AdminTab =
  | "dashboard"
  | "events"
  | "sermons"
  | "gallery"
  | "live"
  | "messages"
  | "members"
  | "prayers"
  | "donations"
  | "schedules"
  | "announcements"
  | "users"
  | "settings";
