import { useState, useEffect } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, Play,
  Heart, Book, Users, Music, ArrowRight, Facebook, Youtube,
  Instagram, BookOpen, HandHeart, ChevronRight, Send, CalendarDays, Mic2,
  Radio, Image as ImageIcon, Calendar, MapPinned, Sparkles, Lock,
  Gift, HandHelping, Copy, Check, Smartphone, Quote, Shield, Trash2,
} from "lucide-react";
import AdminApp from "./admin";

type Page = "accueil" | "apropos" | "ministeres" | "horaires" | "sermons" | "direct" | "galerie" | "evenements" | "contact" | "rejoindre" | "don" | "priere" | "admin";

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Accueil", page: "accueil" },
  { label: "À Propos", page: "apropos" },
  { label: "Direct", page: "direct" },
  { label: "Structures", page: "ministeres" },
  { label: "Événements", page: "evenements" },
  { label: "Galerie", page: "galerie" },
  { label: "Horaires", page: "horaires" },
  { label: "Sermons", page: "sermons" },
  { label: "Prière", page: "priere" },
  { label: "Contact", page: "contact" },
];

const HEADER_NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Accueil", page: "accueil" },
  { label: "À Propos", page: "apropos" },
  { label: "Direct", page: "direct" },
  { label: "Événements", page: "evenements" },
  { label: "Sermons", page: "sermons" },
  { label: "Contact", page: "contact" },
];

/* ─── Shared Layout ─────────────────────────────────────── */
function Layout({ page, setPage, children }: { page: Page; setPage: (p: Page) => void; children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
    setMenuOpen(false);
  }, [page]);

  const transparent = !scrolled;

  return (
    <div className="font-['Inter'] text-gray-900 bg-white min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Bar */}
      <div
        className={`bg-amber-700 text-amber-50 text-xs flex flex-wrap justify-between gap-2 px-6 overflow-hidden transition-all duration-500 shrink-0 ${transparent ? "max-h-0 py-0 opacity-0" : "max-h-10 py-2 opacity-100"}`}
      >
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1"><Phone size={11} /> +243 81 234 5678</span>
          <span className="flex items-center gap-1"><Mail size={11} /> contact@cbampasa.cd</span>
          <span className="flex items-center gap-1"><MapPin size={11} /> Av. Montali 58, Q. Tala Ngai — Mpasa</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-white transition"><Facebook size={13} /></a>
          <a href="#" className="hover:text-white transition"><Youtube size={13} /></a>
          <a href="#" className="hover:text-white transition"><Instagram size={13} /></a>
        </div>
      </div>

      {/* Nav */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 shrink-0 ${
          transparent
            ? "bg-transparent border-b border-white/10"
            : "bg-white shadow-md border-b border-amber-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center">
          <button onClick={() => setPage("accueil")} className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-9 h-9 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-['Playfair_Display'] font-bold text-xs">CBA</span>
            </div>
            <div className="text-left">
              <div className={`font-['Playfair_Display'] font-bold text-lg leading-none transition-colors duration-300 ${transparent ? "text-white" : "text-amber-800"}`}>
                CBA-MPASA
              </div>
              <div className={`text-[10px] tracking-wide transition-colors duration-300 ${transparent ? "text-white/70" : "text-gray-500"}`}>
                Citadelle de la Foi
              </div>
            </div>
          </button>

          <ul className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {HEADER_NAV_LINKS.map((l) => (
              <li key={l.page}>
                <button
                  onClick={() => setPage(l.page)}
                  className={`text-sm font-medium transition-colors duration-200 relative group pb-0.5 ${
                    page === l.page
                      ? transparent ? "text-amber-300" : "text-amber-700"
                      : transparent ? "text-white/90 hover:text-amber-300" : "text-gray-700 hover:text-amber-700"
                  }`}
                >
                  {l.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${transparent ? "bg-amber-300" : "bg-amber-700"} ${page === l.page ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={() => setPage("don")}
              className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-full transition-all duration-300 ${
                transparent
                  ? "bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-300/40 backdrop-blur-sm"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200"
              }`}
            >
              <Gift size={13} /> Don
            </button>
            <button
              onClick={() => setPage("rejoindre")}
              className={`inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 ${
                transparent
                  ? "bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-sm"
                  : "bg-amber-700 hover:bg-amber-800 text-white shadow-md"
              }`}
            >
              Nous Rejoindre <ArrowRight size={13} />
            </button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className={`lg:hidden ml-auto transition-colors duration-300 ${transparent ? "text-white" : "text-gray-700"}`}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="lg:hidden bg-white border-t border-amber-50 px-6 pb-4">
            {NAV_LINKS.map((l) => (
              <button
                key={l.page}
                onClick={() => { setPage(l.page); setMenuOpen(false); }}
                className="block w-full text-left py-2.5 text-sm font-medium text-gray-700 hover:text-amber-700 border-b border-gray-50"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => { setPage("don"); setMenuOpen(false); }}
              className="mt-3 w-full bg-amber-50 border border-amber-200 text-amber-800 text-sm font-semibold py-2.5 rounded-full inline-flex items-center justify-center gap-2"
            >
              <Gift size={13} /> Faire un don
            </button>
            <button
              onClick={() => { setPage("rejoindre"); setMenuOpen(false); }}
              className="mt-2 w-full bg-amber-700 text-white text-sm font-semibold py-2.5 rounded-full"
            >
              Nous Rejoindre
            </button>
          </div>
        )}
      </nav>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 pt-14 pb-7 px-6 shrink-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-amber-700 rounded-full flex items-center justify-center">
                <span className="text-white font-['Playfair_Display'] font-bold text-xs">CBA</span>
              </div>
              <div>
                <div className="font-['Playfair_Display'] font-bold text-base text-white">CBA-MPASA</div>
                <div className="text-[10px] text-gray-500">Citadelle de la Foi</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs mb-4">
              Centre d'Évangélisation et d'Enseignements Bibliques Appliqués — Assemblée de Mpasa. Engagée pour la transformation de la nation par MGRN.
            </p>
            <div className="flex gap-3">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 hover:bg-amber-700 rounded-lg flex items-center justify-center transition-colors">
                  <Icon size={13} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs mb-4 uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.page}>
                  <button onClick={() => setPage(l.page)} className="text-sm text-gray-500 hover:text-amber-400 transition-colors">{l.label}</button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-xs mb-4 uppercase tracking-wide">Cultes & Réunions</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2"><Clock size={11} /> Dimanche : 9h – 12h</li>
              <li className="flex items-center gap-2"><Clock size={11} /> Mardi & Jeudi : 17h – 19h</li>
              <li className="flex items-center gap-2"><Clock size={11} /> Mercredi : 9h – 12h</li>
              <li className="flex items-center gap-2"><Clock size={11} /> Lundi (Mamans Deborah) : 9h – 16h</li>
              <li className="flex items-center gap-2"><MapPin size={11} /> Av. Montali 58, Q. Tala Ngai — Mpasa</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600 flex flex-col items-center gap-2">
          <div>
            © {new Date().getFullYear()} CBA-MPASA · Centre d'Évangélisation et d'Enseignements Bibliques Appliqués · Assemblée de Mpasa · Citadelle de la Foi
          </div>
          <span className="text-amber-700/60">« La grâce et la paix vous soient données. » — Rom. 1:7</span>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setPage("don")}
              className="inline-flex items-center gap-1.5 text-[11px] bg-amber-700 hover:bg-amber-600 text-white px-3 py-1.5 rounded-full font-semibold transition"
            >
              <Gift size={11} /> Soutenir l'œuvre
            </button>
            <button
              onClick={() => setPage("priere")}
              className="inline-flex items-center gap-1.5 text-[11px] bg-gray-800 hover:bg-gray-700 text-amber-300 px-3 py-1.5 rounded-full font-semibold transition"
            >
              <HandHelping size={11} /> Demander une prière
            </button>
          </div>
          <button
            onClick={() => setPage("admin")}
            className="mt-2 inline-flex items-center gap-1.5 text-[10px] text-gray-600 hover:text-amber-400 transition"
          >
            <Lock size={10} /> Espace Administration
          </button>
        </div>
      </footer>
    </div>
  );
}

/* ─── PAGE: Accueil ─────────────────────────────────────── */
function PageAccueil({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      <section className="relative h-[88vh] min-h-[580px] overflow-hidden">
        <img src="/images/cba-hero.png" alt="CBA-MPASA" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-xl mt-12 md:mt-0">
            <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-400/40 text-amber-300 text-[11px] md:text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5 backdrop-blur-sm">
              ✝ Bienvenue chez vous
            </div>
            <h1 className="font-['Playfair_Display'] font-bold text-white leading-[1.05] mb-4 text-4xl md:text-5xl lg:text-6xl">
              Citadelle de la Foi<br />
              <span className="text-amber-400">Assemblée de Mpasa</span>
            </h1>
            <p className="text-amber-200/90 text-sm md:text-base font-semibold uppercase tracking-wider mb-4">
              Centre d'Évangélisation et d'Enseignements Bibliques Appliqués
            </p>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-7 max-w-lg">
              Une église bâtie sur <strong className="text-amber-300">4 piliers</strong> : Peuple d'Autel, d'Alliance, de Célébration et de Mission. Notre vision : conquérir la nation à travers <strong className="text-amber-300">MGRN</strong> — Mission de Guérison et Restauration des Nations.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage("horaires")} className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all shadow-xl hover:-translate-y-0.5">
                Nos Cultes <CalendarDays size={15} />
              </button>
              <button onClick={() => setPage("sermons")} className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full transition-all backdrop-blur-sm">
                <Play size={15} className="fill-white" /> Écouter un Sermon
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/50" size={22} />
        </div>
      </section>

      <section className="bg-amber-700 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { n: "40", label: "Ans au niveau national" },
            { n: "9", label: "Ans à Mpasa" },
            { n: "4", label: "Piliers fondateurs" },
            { n: "4", label: "Structures de fonctionnement" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-['Playfair_Display'] text-4xl font-bold text-amber-200 mb-1">{s.n}</div>
              <div className="text-amber-100 text-xs uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <VersetDuJour setPage={setPage} />

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Découvrez l'église</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900">Tout ce dont vous avez besoin</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Radio, page: "direct" as Page, title: "Culte en Direct", desc: "Suivez nos cultes en direct depuis chez vous, où que vous soyez dans le monde." },
              { icon: Calendar, page: "evenements" as Page, title: "Événements", desc: "Découvrez nos prochains rendez-vous : conventions, camps, baptêmes et célébrations." },
              { icon: ImageIcon, page: "galerie" as Page, title: "Galerie Photos", desc: "Revivez en images les grands moments de la Citadelle de la Foi." },
              { icon: Mic2, page: "sermons" as Page, title: "Sermons", desc: "Écoutez et revisionnez les dernières prédications de nos pasteurs et anciens." },
              { icon: Users, page: "ministeres" as Page, title: "Nos Structures", desc: "Mamans Deborah, Papas Salomon, Jeunesse Timothée et les Amis de Jésus (ECODIM)." },
              { icon: HandHeart, page: "rejoindre" as Page, title: "Nous Rejoindre", desc: "Faites partie de la famille CBA-MPASA — Citadelle de la Foi." },
            ].map((c) => (
              <button
                key={c.title}
                onClick={() => setPage(c.page)}
                className="group text-left bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-amber-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-50 group-hover:bg-amber-700 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300">
                  <c.icon className="text-amber-700 group-hover:text-white transition-colors duration-300" size={20} />
                </div>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-2">{c.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-3">{c.desc}</p>
                <span className="text-amber-700 text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Découvrir <ChevronRight size={13} />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <SermonsTimeline setPage={setPage} />

      <section className="relative py-20 px-6 overflow-hidden">
        <img src="/images/cba-bible.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/87" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-amber-300 mb-4 text-lg">✝ ✝ ✝</div>
          <blockquote className="font-['Playfair_Display'] text-3xl text-white font-bold leading-snug mb-5">
            « Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse pas, mais qu'il ait la vie éternelle. »
          </blockquote>
          <cite className="text-amber-300 text-base font-medium">Jean 3:16</cite>
        </div>
      </section>
    </>
  );
}

/* ─── Sermons Timeline (home) ─────────────────────────────────────── */
function SermonsTimeline({ setPage }: { setPage: (p: Page) => void }) {
  const items = SERMONS.slice(0, 5);
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Historique des Prédications</div>
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-3">Nos derniers messages</h2>
          <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Revivez les enseignements diffusés depuis l'autel — thème, passage biblique, prédicateur et résumé. Chaque message est disponible en vidéo sur notre chaîne.
          </p>
        </div>

        <ol className="relative border-l-2 border-amber-100 ml-4 md:ml-8 space-y-10">
          {items.map((s, i) => (
            <li key={s.title} className="relative pl-8 md:pl-12">
              {/* dot */}
              <div className="absolute -left-[11px] top-1 w-5 h-5 rounded-full bg-amber-700 ring-4 ring-amber-100 flex items-center justify-center">
                <BookOpen size={10} className="text-white" />
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md hover:border-amber-200 transition-all">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[10px] uppercase tracking-widest text-amber-700 font-bold bg-amber-100/70 px-2.5 py-1 rounded-full">
                    {s.date}
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold bg-gray-100 px-2.5 py-1 rounded-full">
                    {s.cat}
                  </span>
                  {i === 0 && (
                    <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">
                      Dernier en date
                    </span>
                  )}
                </div>

                <div className="text-amber-700 text-xs font-semibold uppercase tracking-wider mb-1">Thème · {s.theme}</div>
                <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug">
                  {s.title}
                </h3>

                <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-gray-600 mb-3">
                  <span className="inline-flex items-center gap-1.5"><Book size={12} className="text-amber-700" /><strong className="text-gray-800">{s.ref}</strong></span>
                  <span className="inline-flex items-center gap-1.5"><Mic2 size={12} className="text-amber-700" />{s.speaker}</span>
                  <span className="inline-flex items-center gap-1.5"><Clock size={12} className="text-amber-700" />{s.duration}</span>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {s.summary}
                </p>

                <div className="flex flex-wrap gap-2.5">
                  {s.youtube ? (
                    <a
                      href={s.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded-full transition shadow-sm"
                    >
                      <Youtube size={13} /> Voir la vidéo
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-500 text-xs font-semibold px-4 py-2 rounded-full">
                      <Youtube size={13} /> Vidéo bientôt disponible
                    </span>
                  )}
                  <button
                    onClick={() => setPage("sermons")}
                    className="inline-flex items-center gap-2 border border-amber-200 text-amber-800 hover:bg-amber-50 text-xs font-semibold px-4 py-2 rounded-full transition"
                  >
                    Plus de détails <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ol>

        <div className="text-center mt-12">
          <button
            onClick={() => setPage("sermons")}
            className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-7 py-3 rounded-full transition shadow-md"
          >
            Voir tout l'historique <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE: À Propos ─────────────────────────────────────── */
function PageAPropos({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-worship.png" alt="À Propos" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Notre Identité</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">À Propos de CBA-MPASA</h1>
        </div>
      </div>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="/images/cba-worship.png" alt="Culte" className="rounded-2xl shadow-2xl w-full object-cover h-[420px]" />
            <div className="absolute -bottom-5 -right-5 w-40 h-40 bg-amber-700 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl text-center px-2">
              <div className="font-['Playfair_Display'] text-4xl font-bold leading-none">40</div>
              <div className="text-[10px] uppercase tracking-wide text-amber-200 mt-1">Ans de ministère</div>
              <div className="w-8 h-px bg-amber-300/50 my-1.5" />
              <div className="font-['Playfair_Display'] text-2xl font-bold leading-none">9</div>
              <div className="text-[10px] uppercase tracking-wide text-amber-200 mt-1">Ans à Mpasa</div>
            </div>
          </div>
          <div>
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3">Qui sommes-nous ?</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Une Église bâtie sur la<br /><span className="text-amber-700">Roche Éternelle</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              <strong>CBA — Centre d'Évangélisation et d'Enseignements Bibliques Appliqués, Assemblée de Mpasa</strong> — surnommée <strong className="text-amber-700">Citadelle de la Foi</strong> — est une église vivante, enracinée dans la Parole de Dieu et animée par l'Esprit Saint depuis 40 ans au niveau national, et 9 ans à Mpasa.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Notre nom dit tout : nous ne nous contentons pas d'enseigner la Bible, nous la <em>appliquons</em>. Chaque enseignement, chaque sermon, chaque réunion est conçu pour transformer concrètement la vie des croyants et de leur communauté.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Nous sommes une maison pour les brisés, un refuge pour les chercheurs de Dieu, et une école pour les disciples de Jésus-Christ.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Piliers */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Nos Fondements</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-3">Une église bâtie sur 4 piliers</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Ces quatre piliers façonnent notre identité, notre adoration et notre mission au quotidien.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { num: "I",   ref: "Gen. 12:7",     title: "Peuple d'Autel",       desc: "Une église qui bâtit l'autel familial et collectif, qui adore Dieu en esprit et en vérité, et qui intercède sans cesse pour son entourage." },
              { num: "II",  ref: "Jér. 31:33",    title: "Peuple d'Alliance",    desc: "Un peuple lié à Dieu par une alliance éternelle scellée dans le sang de Christ, et lié les uns aux autres dans l'amour fraternel." },
              { num: "III", ref: "Ps. 95:1-2",    title: "Peuple de Célébration", desc: "Une assemblée qui célèbre la bonté, la fidélité et la majesté de Dieu à travers la louange, l'adoration et la joie communautaire." },
              { num: "IV",  ref: "Matt. 28:19-20", title: "Peuple de Mission",    desc: "Une église envoyée pour faire des disciples, évangéliser la nation et restaurer les âmes par la puissance de l'Évangile." },
            ].map((p) => (
              <div key={p.title} className="bg-white rounded-2xl p-7 border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-amber-700 text-white rounded-xl flex items-center justify-center mb-4 font-['Playfair_Display'] font-bold">
                  {p.num}
                </div>
                <div className="text-amber-600 text-xs font-semibold mb-2 uppercase tracking-wide">{p.ref}</div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">{p.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="w-12 h-12 bg-amber-700/30 rounded-xl flex items-center justify-center mb-5">
              <BookOpen className="text-amber-400" size={22} />
            </div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4 text-white">Notre Vision</h3>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong className="text-amber-300">Conquête de la Nation à travers MGRN</strong> — Mission de Guérison et Restauration des Nations.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              Voir la République Démocratique du Congo, et au-delà, transformée par la puissance de l'Évangile : des familles guéries, des cœurs restaurés, des communautés debout.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-amber-700/30 rounded-xl flex items-center justify-center mb-5">
              <HandHeart className="text-amber-400" size={22} />
            </div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4 text-white">Notre Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              Enseigner, appliquer et vivre la Parole de Dieu dans toutes les sphères de la vie — famille, société, travail — afin que chaque croyant devienne un agent de guérison et de restauration dans son milieu.
            </p>
          </div>
        </div>
      </section>

      <div className="py-12 px-6 bg-amber-50 text-center">
        <p className="text-gray-600 mb-5">Prêt à faire partie de la famille ?</p>
        <button onClick={() => setPage("rejoindre")} className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-md">
          Nous Rejoindre <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}

/* ─── PAGE: Ministères / Structures ─────────────────────────────────────── */
const STRUCTURES = [
  {
    icon: HandHeart,
    name: "Maman « Deborah »",
    ref: "Juges 4-5",
    color: "from-rose-700 to-amber-700",
    role: "Intercession",
    desc: "Les mères intercédant pour nos familles, notre église et notre nation. Une armée d'épouses, de mères et de filles consacrées à la prière fervente et à la guerre spirituelle.",
    horaire: "Lundi : 9h – 16h",
  },
  {
    icon: BookOpen,
    name: "Papas « Salomon »",
    ref: "1 Rois 3:9",
    color: "from-amber-800 to-amber-600",
    role: "Sagesse & Stabilité",
    desc: "Les pères, gardiens de l'autel dans nos foyers. Garants de la sagesse, de la stabilité et de la direction spirituelle de nos familles et de l'église.",
    horaire: "Réunions trimestrielles",
  },
  {
    icon: Sparkles,
    name: "Jeunesse « Timothée »",
    ref: "1 Tim. 4:12",
    color: "from-orange-700 to-amber-500",
    role: "Pionniers & Bâtisseurs",
    desc: "Les jeunes pionniers et bâtisseurs des autels de demain. Une génération formée pour porter la vision MGRN avec audace, vision et zèle pour Christ.",
    horaire: "Voir programme jeunesse",
  },
  {
    icon: Heart,
    name: "Les Amis de Jésus (ECODIM)",
    ref: "Marc 10:14",
    color: "from-amber-600 to-yellow-500",
    role: "Fondation & Avenir",
    desc: "L'École du Dimanche — fondation et avenir de l'église de demain. Nous formons les enfants à connaître Jésus, à aimer la Parole et à grandir comme disciples dès le plus jeune âge.",
    horaire: "Dimanche pendant le culte",
  },
];

function PageMinisteres({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-community.png" alt="Structures" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Servir Ensemble</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Nos Structures de Fonctionnement</h1>
        </div>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Trouvez votre place</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-3">4 structures, une seule famille</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-sm leading-relaxed">
              L'église est organisée autour de quatre structures complémentaires — chacune avec un appel spécifique pour servir Dieu et bâtir la maison.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {STRUCTURES.map((s, i) => (
              <div
                key={s.name}
                className="group bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`bg-gradient-to-r ${s.color} px-7 py-5 flex items-center gap-4 text-white`}>
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0">
                    <s.icon size={26} />
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/80">Structure {i + 1} · {s.role}</div>
                    <div className="font-['Playfair_Display'] text-xl font-bold leading-tight">{s.name}</div>
                  </div>
                </div>
                <div className="p-7">
                  <div className="text-amber-600 text-xs font-semibold mb-2 uppercase tracking-wide">{s.ref}</div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{s.desc}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <Clock size={13} className="text-amber-600" />
                    <span className="font-semibold">{s.horaire}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-14 px-6 bg-amber-700 text-white text-center">
        <h3 className="font-['Playfair_Display'] text-3xl font-bold mb-3">Intégrer une structure</h3>
        <p className="text-amber-100 mb-6 max-w-lg mx-auto text-sm">
          Vous souhaitez rejoindre l'une de nos quatre structures ? Contactez-nous et nous vous guiderons dans votre engagement.
        </p>
        <button onClick={() => setPage("contact")} className="inline-flex items-center gap-2 bg-white text-amber-800 hover:bg-amber-50 font-semibold px-7 py-3 rounded-full transition-colors">
          Nous Contacter <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── PAGE: Horaires ─────────────────────────────────────── */
const SCHEDULE = [
  { day: "Dimanche", color: "bg-amber-700", services: ["Culte d'adoration et de célébration — 9h à 12h"] },
  { day: "Lundi",    color: "bg-rose-700",  services: ["Réunion des Mamans « Deborah » — 9h à 16h"] },
  { day: "Mardi",    color: "bg-amber-800", services: ["Culte d'enseignements — 17h à 19h"] },
  { day: "Mercredi", color: "bg-blue-700",  services: ["Prière d'autel pour nos familles, l'église et le pays — 9h à 12h"] },
  { day: "Jeudi",    color: "bg-amber-800", services: ["Culte d'enseignements — 17h à 19h"] },
];

function PageHoraires() {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-community.png" alt="Horaires" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Programme</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Horaires des Cultes</h1>
        </div>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Rejoignez-nous</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-3">Chaque semaine avec vous</h2>
            <p className="text-gray-500 max-w-lg mx-auto text-sm leading-relaxed">Venez tel que vous êtes. Il y a toujours une place pour vous à la Citadelle de la Foi, à Mpasa Mikonga.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {SCHEDULE.map((s) => (
              <div key={s.day} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className={`${s.color} px-6 py-4 flex items-center gap-3`}>
                  <Clock size={16} className="text-white" />
                  <span className="font-bold text-white text-lg font-['Playfair_Display']">{s.day}</span>
                </div>
                <ul className="px-6 py-5 space-y-3">
                  {s.services.map((sv) => (
                    <li key={sv} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
                      {sv}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-7">
              <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
                <MapPinned size={14} /> Adresse de Mpasa
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">Citadelle de la Foi — Mpasa</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Avenue Montali n° 58, Quartier Tala Ngai<br />
                Mpasa Mikonga, Commune de N'sele<br />
                Kinshasa, République Démocratique du Congo
              </p>
              <p className="text-xs text-amber-700 font-semibold mt-3 italic">
                Réf. : Arrêt CCT, en face de Winners
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-7">
              <div className="flex items-center gap-2 text-gray-700 text-xs font-bold uppercase tracking-widest mb-3">
                <MapPin size={14} /> Adresse Nationale
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">Siège National CBA</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                2ème rue Limete, De Bonhomme n° 2<br />
                Commune de Limete<br />
                Kinshasa, République Démocratique du Congo
              </p>
              <p className="text-xs text-gray-500 mt-3 italic">
                40 ans de ministère au service de la nation
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-7 flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-3">Contact</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-3"><Phone size={15} className="text-amber-700 shrink-0" /><span>+243 81 234 5678</span></div>
                <div className="flex items-center gap-3"><Mail size={15} className="text-amber-700 shrink-0" /><span>contact@cbampasa.cd</span></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-3">Bureau Pastoral</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-3"><Clock size={15} className="text-amber-700 shrink-0" /><span>Mardi & Jeudi : 17h – 19h (sur place)</span></div>
                <div className="flex items-center gap-3"><Clock size={15} className="text-amber-700 shrink-0" /><span>Sur rendez-vous le reste de la semaine</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: Sermons ─────────────────────────────────────── */
type SermonItem = {
  title: string; speaker: string; date: string; duration: string;
  ref: string; cat: string; theme: string; summary: string; youtube: string;
};

const SERMONS: SermonItem[] = [
  {
    title: "Marche dans la Lumière de Dieu",
    speaker: "Pasteur Principal", date: "20 Avril 2025", duration: "52 min",
    ref: "Jean 8:12", cat: "Vie Chrétienne",
    theme: "Vivre dans la lumière",
    summary: "Christ est la lumière du monde ; marcher dans Sa lumière, c'est sortir des ténèbres et porter du fruit visible dans nos foyers, nos métiers et nos quartiers.",
    youtube: "https://youtu.be/dQw4w9WgXcQ",
  },
  {
    title: "La Foi qui Déplace les Montagnes",
    speaker: "Ancien Jean-Pierre Mbala", date: "13 Avril 2025", duration: "45 min",
    ref: "Matthieu 17:20", cat: "La Foi",
    theme: "La foi en action",
    summary: "Une foi mesurée à un grain de sénevé suffit à Dieu pour renverser les obstacles ; encore faut-il l'exercer concrètement dans la prière et l'obéissance.",
    youtube: "https://youtu.be/dQw4w9WgXcQ",
  },
  {
    title: "L'Amour de Dieu Sans Condition",
    speaker: "Pasteur Principal", date: "6 Avril 2025", duration: "48 min",
    ref: "Jean 3:16", cat: "L'Évangile",
    theme: "Au cœur de l'Évangile",
    summary: "Dieu nous a aimés le premier en livrant Son Fils. Cet amour gratuit transforme notre identité et nous appelle à aimer en retour, sans condition.",
    youtube: "https://youtu.be/dQw4w9WgXcQ",
  },
  {
    title: "Appliquer la Parole au Quotidien",
    speaker: "Pasteur Principal", date: "30 Mars 2025", duration: "55 min",
    ref: "Jacques 1:22", cat: "Enseignement",
    theme: "Mettre la Parole en pratique",
    summary: "Écouter ne suffit pas : la Parole nous transforme quand elle devient action. Quatre clés pratiques pour passer du sermon du dimanche à la vie de la semaine.",
    youtube: "https://youtu.be/dQw4w9WgXcQ",
  },
  {
    title: "La Famille Selon Dieu",
    speaker: "Ancien Théodore Lumu", date: "23 Mars 2025", duration: "42 min",
    ref: "Éph. 5:22-33", cat: "Famille",
    theme: "Le foyer, premier autel",
    summary: "Le mariage et la famille sont l'image de Christ et de l'Église. Restaurer nos foyers, c'est restaurer notre nation — un pilier de la vision MGRN.",
    youtube: "",
  },
  {
    title: "La Puissance de la Prière",
    speaker: "Pasteur Principal", date: "16 Mars 2025", duration: "50 min",
    ref: "Phil. 4:6-7", cat: "Prière",
    theme: "Prier sans se décourager",
    summary: "L'inquiétude est désarmée par la prière reconnaissante. Dieu ne promet pas toujours la solution immédiate, mais Sa paix qui surpasse toute intelligence.",
    youtube: "https://youtu.be/dQw4w9WgXcQ",
  },
];

function PageSermons() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-bible.png" alt="Sermons" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Messages & Prédications</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Sermons</h1>
        </div>
      </div>

      <section className="py-20 px-6 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">La Parole Vivante</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-white mb-3">Nourrir votre âme</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">Retrouvez nos derniers enseignements bibliques pour approfondir votre relation avec Dieu et appliquer Sa Parole.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERMONS.map((s) => (
              <div
                key={s.title}
                onClick={() => setActive(active === s.title ? null : s.title)}
                className="group bg-gray-800 rounded-2xl p-6 border border-gray-700 hover:border-amber-600/50 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-amber-700/20 group-hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors duration-300 shrink-0">
                    <Play size={15} className="text-amber-400 group-hover:text-white fill-current" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{s.date}</div>
                    <div className="text-xs text-amber-400 font-semibold">{s.duration}</div>
                  </div>
                  <span className="ml-auto text-xs bg-amber-900/40 text-amber-400 px-2 py-0.5 rounded-full">{s.cat}</span>
                </div>
                <div className="text-xs text-amber-500 font-semibold mb-2 uppercase tracking-wide">{s.ref}</div>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-2 leading-snug">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.speaker}</p>
                {active === s.title && (
                  <div className="mt-4 pt-4 border-t border-gray-700">
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mb-2">
                      <div className="bg-amber-500 h-1.5 rounded-full w-0 group-hover:w-1/3 transition-all duration-1000" />
                    </div>
                    <p className="text-gray-400 text-xs">Cliquez pour écouter ce sermon complet sur notre chaîne YouTube</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: Direct (Live) ─────────────────────────────────────── */
// Remplacez YOUTUBE_CHANNEL_ID par l'ID réel de votre chaîne YouTube
const YOUTUBE_CHANNEL_ID = "UCxxxxxxxxxxxxxxxxxxxxxx";
const LIVE_EMBED_URL = `https://www.youtube.com/embed/live_stream?channel=${YOUTUBE_CHANNEL_ID}&autoplay=0`;

function PageDirect({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-worship.png" alt="Direct" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/90 via-amber-900/80 to-amber-800/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="flex items-center gap-2 text-red-300 text-xs font-semibold uppercase tracking-widest mb-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <Radio size={13} /> Diffusion en direct
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Culte en Direct</h1>
        </div>
      </div>

      <section className="py-16 px-6 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/40 text-red-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> En ligne
            </div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-white mb-3">Suivez le culte depuis chez vous</h2>
            <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
              Que vous soyez à Kinshasa, à Mpasa, ou ailleurs dans le monde — restez connectés à la Citadelle de la Foi.
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden border-2 border-amber-700/30 shadow-2xl bg-black">
            <div className="aspect-video w-full">
              <iframe
                src={LIVE_EMBED_URL}
                title="CBA-MPASA — Diffusion en direct"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {[
              { icon: CalendarDays, title: "Dimanche 9h – 12h", desc: "Culte d'adoration et de célébration en direct" },
              { icon: Radio,        title: "Mercredi 9h – 12h", desc: "Prière d'autel pour nos familles, l'église et le pays" },
              { icon: BookOpen,     title: "Mardi & Jeudi 17h – 19h", desc: "Cultes d'enseignements bibliques en direct" },
            ].map((s) => (
              <div key={s.title} className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
                <s.icon className="text-amber-400 mx-auto mb-3" size={22} />
                <div className="text-white font-bold mb-1">{s.title}</div>
                <div className="text-gray-400 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 bg-amber-900/30 border border-amber-700/40 rounded-2xl p-7 text-center">
            <Youtube className="text-red-500 mx-auto mb-3" size={32} />
            <h3 className="text-white font-['Playfair_Display'] text-xl font-bold mb-2">Abonnez-vous à notre chaîne</h3>
            <p className="text-gray-300 text-sm mb-5 max-w-md mx-auto">
              Recevez une notification dès qu'un culte démarre et retrouvez les rediffusions à tout moment.
            </p>
            <a
              href={`https://www.youtube.com/channel/${YOUTUBE_CHANNEL_ID}?sub_confirmation=1`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-7 py-3 rounded-full transition-colors"
            >
              <Youtube size={16} /> S'abonner sur YouTube
            </a>
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => setPage("sermons")} className="text-amber-400 hover:text-amber-300 text-sm font-semibold inline-flex items-center gap-1">
              Voir les sermons précédents <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: Galerie ─────────────────────────────────────── */
const GALLERY_CATEGORIES = [
  { id: "cultes", label: "Cultes & Adoration" },
  { id: "communaute", label: "Vie Communautaire" },
  { id: "evenements", label: "Événements" },
  { id: "ministeres", label: "Structures" },
] as const;

type GalleryCat = typeof GALLERY_CATEGORIES[number]["id"];

const GALLERY: { src: string; alt: string; cat: GalleryCat; title: string }[] = [
  { src: "/images/cba-worship.png", alt: "Culte d'adoration", cat: "cultes", title: "Culte du dimanche matin" },
  { src: "/images/cba-hero.png",    alt: "Assemblée",         cat: "cultes", title: "Assemblée en louange" },
  { src: "/images/cba-bible.png",   alt: "Étude biblique",    cat: "cultes", title: "Lecture de la Parole" },
  { src: "/images/cba-community.png", alt: "Communauté",       cat: "communaute", title: "Vie de communauté" },
  { src: "/images/cba-worship.png", alt: "Louange",            cat: "communaute", title: "Moments de louange" },
  { src: "/images/cba-community.png", alt: "Famille CBA",     cat: "evenements", title: "Grand rassemblement annuel" },
  { src: "/images/cba-hero.png",    alt: "Convention",        cat: "evenements", title: "Convention de Pâques" },
  { src: "/images/cba-worship.png", alt: "École du Dimanche", cat: "ministeres", title: "École du Dimanche" },
  { src: "/images/cba-community.png", alt: "Action sociale",  cat: "ministeres", title: "Ministère d'action sociale" },
  { src: "/images/cba-bible.png",   alt: "Cellule",           cat: "ministeres", title: "Cellule de maison" },
  { src: "/images/cba-hero.png",    alt: "Jeunesse CBA",      cat: "ministeres", title: "Jeunesse CBA" },
  { src: "/images/cba-worship.png", alt: "Chorale",           cat: "ministeres", title: "Chorale de l'église" },
];

function PageGalerie() {
  const [filter, setFilter] = useState<GalleryCat | "all">("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filtered = filter === "all" ? GALLERY : GALLERY.filter((g) => g.cat === filter);

  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-community.png" alt="Galerie" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
            <ImageIcon size={13} /> ✝ Souvenirs en Images
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Galerie Photos</h1>
        </div>
      </div>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">L'église en images</div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-3">Moments partagés ensemble</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Cultes, événements, baptêmes, action sociale — découvrez la vie quotidienne de la Citadelle de la Foi.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setFilter("all")}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${filter === "all" ? "bg-amber-700 text-white" : "bg-amber-50 text-amber-800 hover:bg-amber-100"}`}
            >
              Tout voir
            </button>
            {GALLERY_CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors ${filter === c.id ? "bg-amber-700 text-white" : "bg-amber-50 text-amber-800 hover:bg-amber-100"}`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <button
                key={`${img.src}-${i}`}
                onClick={() => setLightbox(i)}
                className="group relative aspect-square overflow-hidden rounded-xl border border-gray-100 hover:border-amber-300 transition-all"
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-white text-sm font-semibold">{img.title}</span>
                </div>
              </button>
            ))}
          </div>

          {lightbox !== null && filtered[lightbox] && (
            <div
              onClick={() => setLightbox(null)}
              className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4 cursor-pointer"
            >
              <button className="absolute top-5 right-5 text-white hover:text-amber-300 z-10" onClick={() => setLightbox(null)}>
                <X size={28} />
              </button>
              <button
                className="absolute left-4 md:left-10 text-white hover:text-amber-300"
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + filtered.length) % filtered.length); }}
              >
                <ChevronRight size={32} className="rotate-180" />
              </button>
              <button
                className="absolute right-4 md:right-10 text-white hover:text-amber-300"
                onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % filtered.length); }}
              >
                <ChevronRight size={32} />
              </button>
              <div className="max-w-5xl max-h-[85vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                <img src={filtered[lightbox].src} alt={filtered[lightbox].alt} className="max-h-[78vh] w-auto rounded-xl shadow-2xl" />
                <div className="mt-4 text-white text-center">
                  <div className="font-['Playfair_Display'] text-xl font-bold">{filtered[lightbox].title}</div>
                  <div className="text-gray-400 text-sm mt-1">{lightbox + 1} / {filtered.length}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: Événements ─────────────────────────────────────── */
const TODAY = new Date();
TODAY.setHours(0, 0, 0, 0);

const EVENTS: { date: string; title: string; desc: string; location: string; image: string; tag: string }[] = [
  { date: "2026-05-10", title: "Convention Annuelle de Pentecôte", desc: "Trois jours d'enseignements, de prière et d'adoration sous le thème : « Renouvelés par l'Esprit ». Invités spéciaux et chorales unies.", location: "Citadelle de la Foi, Mpasa Mikonga", image: "/images/cba-worship.png", tag: "Convention" },
  { date: "2026-06-21", title: "Camp Jeunesse CBA 2026", desc: "Une semaine pour les jeunes de 15 à 30 ans : enseignements, sports, retraite spirituelle et évangélisation à N'sele.", location: "Site de retraite, N'sele", image: "/images/cba-community.png", tag: "Jeunesse" },
  { date: "2026-07-05", title: "Baptêmes par immersion", desc: "Cérémonie publique de baptême pour les nouveaux disciples ayant suivi le parcours d'enseignement.", location: "Fleuve Congo, Maluku", image: "/images/cba-bible.png", tag: "Baptême" },
  { date: "2026-08-15", title: "Journée de l'Action Sociale", desc: "Distribution alimentaire, soins gratuits et accompagnement des familles en difficulté du quartier Mpasa.", location: "Mpasa Mikonga", image: "/images/cba-community.png", tag: "Action Sociale" },
  { date: "2026-12-24", title: "Veillée de Noël", desc: "Veillée musicale, méditation et célébration de la naissance de notre Sauveur Jésus-Christ. Familles bienvenues.", location: "Citadelle de la Foi", image: "/images/cba-hero.png", tag: "Célébration" },

  { date: "2026-04-05", title: "Convention de Pâques 2026", desc: "Célébration de la résurrection avec un message puissant du Pasteur Principal et une chorale spéciale.", location: "Citadelle de la Foi", image: "/images/cba-worship.png", tag: "Convention" },
  { date: "2026-03-08", title: "Journée de la Femme Chrétienne", desc: "Une journée d'enseignements, de prière et de communion pour toutes les femmes de l'église.", location: "Citadelle de la Foi", image: "/images/cba-community.png", tag: "Femmes" },
  { date: "2026-01-01", title: "Culte du Nouvel An", desc: "Veillée de prière et culte de consécration pour entrer dans la nouvelle année avec Dieu.", location: "Citadelle de la Foi", image: "/images/cba-bible.png", tag: "Célébration" },
  { date: "2025-12-31", title: "Veillée de fin d'année 2025", desc: "Action de grâce, prière et louange pour clôturer l'année dans la présence de Dieu.", location: "Citadelle de la Foi", image: "/images/cba-hero.png", tag: "Célébration" },
  { date: "2025-10-12", title: "Semaine d'Évangélisation", desc: "Une semaine d'évangélisation de masse à Mpasa Mikonga avec tentes, chorales et enseignements quotidiens.", location: "Place centrale, Mpasa", image: "/images/cba-community.png", tag: "Évangélisation" },
];

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function PageEvenements({ setPage }: { setPage: (p: Page) => void }) {
  const [tab, setTab] = useState<"futurs" | "passes">("futurs");

  const futurs = EVENTS
    .filter((e) => new Date(e.date) >= TODAY)
    .sort((a, b) => a.date.localeCompare(b.date));
  const passes = EVENTS
    .filter((e) => new Date(e.date) < TODAY)
    .sort((a, b) => b.date.localeCompare(a.date));

  const list = tab === "futurs" ? futurs : passes;

  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-hero.png" alt="Événements" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/82" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
            <Calendar size={13} /> ✝ Vie de l'Église
          </div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Événements</h1>
        </div>
      </div>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Ne manquez rien</div>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-gray-900 mb-3">Conventions, camps et célébrations</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
              Découvrez nos prochains rendez-vous spirituels et revivez les grands moments passés de la Citadelle de la Foi.
            </p>
          </div>

          <div className="flex justify-center gap-2 mb-10">
            <button
              onClick={() => setTab("futurs")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === "futurs" ? "bg-amber-700 text-white shadow-md" : "bg-white text-amber-800 border border-amber-200 hover:bg-amber-50"}`}
            >
              <Sparkles size={14} className="inline mr-1.5" /> À venir ({futurs.length})
            </button>
            <button
              onClick={() => setTab("passes")}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${tab === "passes" ? "bg-amber-700 text-white shadow-md" : "bg-white text-amber-800 border border-amber-200 hover:bg-amber-50"}`}
            >
              <Clock size={14} className="inline mr-1.5" /> Passés ({passes.length})
            </button>
          </div>

          {list.length === 0 ? (
            <div className="text-center text-gray-500 py-14">Aucun événement {tab === "futurs" ? "à venir" : "passé"} pour le moment.</div>
          ) : (
            <div className="space-y-6">
              {list.map((e) => {
                const d = new Date(e.date);
                const day = d.getDate();
                const month = d.toLocaleDateString("fr-FR", { month: "short" }).toUpperCase().replace(".", "");
                const year = d.getFullYear();
                const isPast = tab === "passes";
                return (
                  <div
                    key={`${e.date}-${e.title}`}
                    className={`bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow grid grid-cols-1 md:grid-cols-[140px_1fr] ${isPast ? "opacity-90" : ""}`}
                  >
                    <div className={`${isPast ? "bg-gray-700" : "bg-amber-700"} text-white flex flex-row md:flex-col items-center justify-center gap-2 md:gap-0 py-4 md:py-6`}>
                      <div className="font-['Playfair_Display'] text-3xl md:text-5xl font-bold leading-none">{day}</div>
                      <div className="text-xs uppercase tracking-widest opacity-90">{month}</div>
                      <div className="text-xs opacity-70">{year}</div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">
                      <div className="p-6 md:p-7">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${isPast ? "bg-gray-100 text-gray-600" : "bg-amber-100 text-amber-800"}`}>{e.tag}</span>
                          {!isPast && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-green-100 text-green-700">À venir</span>
                          )}
                        </div>
                        <h3 className="font-['Playfair_Display'] text-xl md:text-2xl font-bold text-gray-900 mb-2">{e.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{e.desc}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1.5"><CalendarDays size={13} /> {formatDate(e.date)}</span>
                          <span className="flex items-center gap-1.5"><MapPinned size={13} /> {e.location}</span>
                        </div>
                        {!isPast && (
                          <button
                            onClick={() => setPage("contact")}
                            className="mt-5 inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-900 text-sm font-semibold"
                          >
                            S'inscrire / Plus d'infos <ChevronRight size={14} />
                          </button>
                        )}
                      </div>
                      <div className="hidden lg:block relative">
                        <img src={e.image} alt={e.title} className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: Contact ─────────────────────────────────────── */
function PageContact() {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-hero.png" alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/82" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Nous Écrire</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Contactez-nous</h1>
        </div>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3">Nous sommes à votre écoute</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Un accueil<br /><span className="text-amber-700">chaleureux</span> vous attend
            </h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-sm">Vous avez une question, une demande de prière ou souhaitez planifier une visite ? Notre équipe pastorale est disponible pour vous répondre.</p>

            <div className="space-y-6">
              {[
                { icon: MapPinned, label: "Adresse — Mpasa", value: "Avenue Montali n° 58, Quartier Tala Ngai\nMpasa Mikonga, Commune de N'sele, Kinshasa\nRéf. : Arrêt CCT, en face de Winners" },
                { icon: MapPin, label: "Siège National", value: "2ème rue Limete, De Bonhomme n° 2\nCommune de Limete, Kinshasa, R.D. Congo" },
                { icon: Phone, label: "Téléphone", value: "+243 81 234 5678\n+243 99 876 5432" },
                { icon: Mail, label: "Email", value: "contact@cbampasa.cd\ninfo@cbampasa.cd" },
                { icon: Clock, label: "Bureau pastoral", value: "Mardi & Jeudi : 17h – 19h\nAutres jours : sur rendez-vous" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                    <c.icon size={17} className="text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{c.label}</div>
                    <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 bg-gray-100 hover:bg-amber-700 rounded-xl flex items-center justify-center transition-colors group">
                  <Icon size={16} className="text-gray-500 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Prénom</label>
                  <input type="text" placeholder="Jean" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Nom</label>
                  <input type="text" placeholder="Kabila" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Email</label>
                <input type="email" placeholder="jean@exemple.cd" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Sujet</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition">
                  <option>Première visite</option>
                  <option>Rejoindre une structure (Mamans Deborah, Papas Salomon, Jeunesse Timothée, ECODIM)</option>
                  <option>Demande de prière</option>
                  <option>Conseil pastoral</option>
                  <option>Renseignements généraux</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Message</label>
                <textarea rows={4} placeholder="Votre message..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition resize-none" />
              </div>
              <button type="button" className="w-full inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md">
                <Send size={15} /> Envoyer le Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: Nous Rejoindre ─────────────────────────────────────── */
function PageRejoindre({ setPage }: { setPage: (p: Page) => void }) {
  const [step, setStep] = useState(1);
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-community.png" alt="Nous Rejoindre" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Bienvenue dans la Famille</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Nous Rejoindre</h1>
        </div>
      </div>

      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Faites le premier pas</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-3">Votre place vous attend</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">Rejoindre CBA-MPASA, c'est intégrer une famille spirituelle qui vous accompagnera à chaque étape de votre vie chrétienne.</p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3].map((n) => (
              <div key={n} className="flex items-center gap-4">
                <button
                  onClick={() => setStep(n)}
                  className={`w-10 h-10 rounded-full font-bold text-sm flex items-center justify-center transition-all ${step >= n ? "bg-amber-700 text-white shadow-lg" : "bg-gray-100 text-gray-400"}`}
                >
                  {n}
                </button>
                {n < 3 && <div className={`h-0.5 w-12 transition-colors ${step > n ? "bg-amber-700" : "bg-gray-200"}`} />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="bg-amber-50 rounded-2xl p-10 border border-amber-100 text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CalendarDays size={28} className="text-white" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-3">Étape 1 — Venez nous rendre visite</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                La première chose à faire est de venir nous rencontrer lors de l'un de nos cultes. Pas d'obligation, pas de pression — venez simplement découvrir qui nous sommes.
              </p>
              <button onClick={() => setPage("horaires")} className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-7 py-3 rounded-full transition-colors mr-3">
                Voir les horaires <CalendarDays size={14} />
              </button>
              <button onClick={() => setStep(2)} className="inline-flex items-center gap-2 border border-amber-700 text-amber-700 hover:bg-amber-50 font-semibold px-7 py-3 rounded-full transition-colors">
                Étape suivante <ChevronRight size={14} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-amber-50 rounded-2xl p-10 border border-amber-100 text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users size={28} className="text-white" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-3">Étape 2 — Rencontrez l'équipe pastorale</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                Après votre première visite, nous vous invitons à un moment d'échange avec nos pasteurs et anciens pour mieux vous connaître et répondre à vos questions.
              </p>
              <button onClick={() => setPage("contact")} className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-7 py-3 rounded-full transition-colors mr-3">
                Prendre contact <Mail size={14} />
              </button>
              <button onClick={() => setStep(3)} className="inline-flex items-center gap-2 border border-amber-700 text-amber-700 hover:bg-amber-50 font-semibold px-7 py-3 rounded-full transition-colors">
                Étape suivante <ChevronRight size={14} />
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="bg-amber-50 rounded-2xl p-10 border border-amber-100 text-center">
              <div className="w-16 h-16 bg-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <HandHeart size={28} className="text-white" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-3">Étape 3 — Intégrez la famille</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
                Une fois membre, vous pourrez rejoindre l'une de nos 4 structures (Mamans Deborah, Papas Salomon, Jeunesse Timothée, Amis de Jésus / ECODIM) et vous engager pleinement dans la vie de la Citadelle de la Foi.
              </p>
              <button onClick={() => setPage("ministeres")} className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-7 py-3 rounded-full transition-colors">
                Voir les structures <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Formulaire d'accueil</div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">Remplissez votre fiche</h2>
          </div>
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Prénom *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Nom *</label>
                  <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Téléphone *</label>
                  <input type="tel" placeholder="+243 ..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Date de naissance</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Quartier de résidence</label>
                <input type="text" placeholder="Ex : Mpasa Mikonga, Ndjili..." className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Structure souhaitée</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition">
                  <option value="">— Aucune pour l'instant —</option>
                  <option>Mamans « Deborah » — Intercession</option>
                  <option>Papas « Salomon » — Sagesse & Stabilité</option>
                  <option>Jeunesse « Timothée » — Pionniers & Bâtisseurs</option>
                  <option>Les Amis de Jésus (ECODIM) — Enfants</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Comment nous avez-vous connus ?</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition">
                  <option>Famille / Ami</option>
                  <option>Réseaux sociaux</option>
                  <option>Évangélisation de rue</option>
                  <option>Autre</option>
                </select>
              </div>
              <button type="button" className="w-full inline-flex items-center justify-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-md">
                <Send size={15} /> Envoyer ma fiche d'accueil
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── Verset du jour (home widget) ─────────────────────────────────────── */
const VERSETS_DU_JOUR = [
  { ref: "Jérémie 29:11", text: "Car je connais les projets que j'ai formés sur vous, dit l'Éternel, projets de paix et non de malheur, afin de vous donner un avenir et de l'espérance." },
  { ref: "Philippiens 4:13", text: "Je puis tout par celui qui me fortifie." },
  { ref: "Psaume 23:1", text: "L'Éternel est mon berger : je ne manquerai de rien." },
  { ref: "Romains 8:28", text: "Nous savons, du reste, que toutes choses concourent au bien de ceux qui aiment Dieu, de ceux qui sont appelés selon son dessein." },
  { ref: "Ésaïe 41:10", text: "Ne crains rien, car je suis avec toi ; ne promène pas des regards inquiets, car je suis ton Dieu ; je te fortifie, je viens à ton secours, je te soutiens de ma droite triomphante." },
  { ref: "Proverbes 3:5-6", text: "Confie-toi en l'Éternel de tout ton cœur, et ne t'appuie pas sur ta sagesse ; reconnais-le dans toutes tes voies, et il aplanira tes sentiers." },
  { ref: "Matthieu 11:28", text: "Venez à moi, vous tous qui êtes fatigués et chargés, et je vous donnerai du repos." },
  { ref: "Psaume 46:2", text: "Dieu est pour nous un refuge et un appui, un secours qui ne manque jamais dans la détresse." },
  { ref: "Jean 14:6", text: "Jésus lui dit : Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi." },
  { ref: "1 Jean 4:8", text: "Celui qui n'aime pas n'a pas connu Dieu, car Dieu est amour." },
  { ref: "Psaume 119:105", text: "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier." },
  { ref: "Matthieu 6:33", text: "Cherchez premièrement le royaume et la justice de Dieu ; et toutes ces choses vous seront données par-dessus." },
  { ref: "Romains 12:2", text: "Ne vous conformez pas au siècle présent, mais soyez transformés par le renouvellement de l'intelligence." },
  { ref: "Psaume 27:1", text: "L'Éternel est ma lumière et mon salut : de qui aurais-je crainte ? L'Éternel est le soutien de ma vie : de qui aurais-je peur ?" },
  { ref: "2 Corinthiens 5:17", text: "Si quelqu'un est en Christ, il est une nouvelle créature. Les choses anciennes sont passées ; voici, toutes choses sont devenues nouvelles." },
  { ref: "Galates 5:22-23", text: "Le fruit de l'Esprit, c'est l'amour, la joie, la paix, la patience, la bonté, la bénignité, la fidélité, la douceur, la tempérance." },
  { ref: "Hébreux 11:1", text: "La foi est une ferme assurance des choses qu'on espère, une démonstration de celles qu'on ne voit pas." },
  { ref: "Jacques 1:5", text: "Si quelqu'un d'entre vous manque de sagesse, qu'il la demande à Dieu, qui donne à tous simplement et sans reproche, et elle lui sera donnée." },
  { ref: "Matthieu 5:14", text: "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée." },
  { ref: "Psaume 91:1-2", text: "Celui qui demeure sous l'abri du Très-Haut repose à l'ombre du Tout-Puissant. Je dis à l'Éternel : Mon refuge et ma forteresse, mon Dieu en qui je me confie !" },
  { ref: "Éphésiens 2:8", text: "C'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c'est le don de Dieu." },
  { ref: "Romains 10:9", text: "Si tu confesses de ta bouche le Seigneur Jésus, et si tu crois dans ton cœur que Dieu l'a ressuscité des morts, tu seras sauvé." },
  { ref: "Actes 1:8", text: "Vous recevrez une puissance, le Saint-Esprit survenant sur vous, et vous serez mes témoins jusqu'aux extrémités de la terre." },
  { ref: "Marc 11:24", text: "Tout ce que vous demanderez en priant, croyez que vous l'avez reçu, et vous le verrez s'accomplir." },
  { ref: "Lamentations 3:22-23", text: "Les bontés de l'Éternel ne sont pas épuisées, ses compassions ne sont pas à leur terme ; elles se renouvellent chaque matin. Oh ! que ta fidélité est grande !" },
  { ref: "Sophonie 3:17", text: "L'Éternel, ton Dieu, est au milieu de toi, comme un héros qui sauve ; il fera de toi sa plus grande joie ; il gardera le silence dans son amour ; il aura pour toi des transports d'allégresse." },
  { ref: "Psaume 34:9", text: "Sentez et voyez combien l'Éternel est bon ! Heureux l'homme qui cherche en lui son refuge !" },
  { ref: "1 Corinthiens 13:13", text: "Maintenant donc ces trois choses demeurent : la foi, l'espérance, la charité ; mais la plus grande de ces choses, c'est la charité." },
  { ref: "Josué 1:9", text: "Fortifie-toi et prends courage. Ne t'effraie point et ne t'épouvante point, car l'Éternel, ton Dieu, est avec toi dans tout ce que tu entreprendras." },
  { ref: "Psaume 121:1-2", text: "Je lève mes yeux vers les montagnes... D'où me viendra le secours ? Le secours me vient de l'Éternel, qui a fait les cieux et la terre." },
  { ref: "Apocalypse 3:20", text: "Voici, je me tiens à la porte, et je frappe. Si quelqu'un entend ma voix et ouvre la porte, j'entrerai chez lui, je souperai avec lui, et lui avec moi." },
];

function getVersetDuJour() {
  const start = new Date(new Date().getFullYear(), 0, 0);
  const diff = Date.now() - start.getTime();
  const dayOfYear = Math.floor(diff / 86400000);
  return VERSETS_DU_JOUR[dayOfYear % VERSETS_DU_JOUR.length];
}

function VersetDuJour({ setPage }: { setPage: (p: Page) => void }) {
  const v = getVersetDuJour();
  const today = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 border border-amber-100 rounded-3xl p-8 md:p-12 shadow-sm overflow-hidden">
          <div className="absolute -top-6 -left-6 text-amber-100">
            <Quote size={120} className="rotate-180" />
          </div>
          <div className="relative">
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
              <div>
                <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-1">Verset du jour</div>
                <div className="text-gray-500 text-xs capitalize">{today}</div>
              </div>
              <button
                onClick={() => setPage("priere")}
                className="inline-flex items-center gap-1.5 text-xs bg-white border border-amber-200 text-amber-800 hover:bg-amber-50 px-3 py-1.5 rounded-full font-semibold transition"
              >
                <HandHelping size={12} /> Soumettre une prière
              </button>
            </div>
            <blockquote className="font-['Playfair_Display'] text-xl md:text-2xl text-gray-900 leading-relaxed font-bold mb-4">
              « {v.text} »
            </blockquote>
            <cite className="text-amber-800 font-semibold text-sm not-italic">— {v.ref}</cite>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PAGE: Don (Mobile Money) ─────────────────────────────────────── */
const DON_METHODES = [
  {
    nom: "M-Pesa (Vodacom)",
    couleur: "from-red-600 to-red-700",
    accent: "text-red-100",
    numero: "+243 81 234 5678",
    nomCompte: "CBA-MPASA / Citadelle de la Foi",
    instructions: [
      "Composez *123# sur votre téléphone Vodacom",
      "Choisissez « Envoi d'argent » → « Vers un autre numéro »",
      "Saisissez le numéro ci-dessus",
      "Indiquez le montant et confirmez avec votre code PIN",
      "Envoyez-nous le SMS de confirmation par WhatsApp pour le reçu",
    ],
  },
  {
    nom: "Airtel Money",
    couleur: "from-rose-600 to-red-600",
    accent: "text-rose-100",
    numero: "+243 99 123 4567",
    nomCompte: "CBA-MPASA / Citadelle de la Foi",
    instructions: [
      "Composez *501# sur votre téléphone Airtel",
      "Choisissez « Transfert d'argent »",
      "Saisissez le numéro ci-dessus",
      "Indiquez le montant et validez avec votre code PIN",
      "Conservez le SMS de confirmation comme preuve",
    ],
  },
  {
    nom: "Orange Money",
    couleur: "from-orange-500 to-amber-600",
    accent: "text-orange-100",
    numero: "+243 89 555 6789",
    nomCompte: "CBA-MPASA / Citadelle de la Foi",
    instructions: [
      "Composez #144# sur votre téléphone Orange",
      "Choisissez « Transfert d'argent » → « Vers un client OM »",
      "Saisissez le numéro ci-dessus",
      "Indiquez le montant et confirmez avec votre code PIN",
      "Notez la référence de transaction reçue par SMS",
    ],
  },
];

const DON_CATEGORIES = [
  { titre: "Dîme", desc: "« Apportez à la maison du trésor toutes les dîmes » — Mal. 3:10", icon: Gift },
  { titre: "Offrande", desc: "Action de grâce libre selon la disposition du cœur", icon: Heart },
  { titre: "Mission MGRN", desc: "Soutenir la Mission de Guérison et Restauration des Nations", icon: HandHelping },
  { titre: "Œuvres sociales", desc: "Aide aux veuves, orphelins et nécessiteux", icon: Users },
];

function PageDon({ setPage }: { setPage: (p: Page) => void }) {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (txt: string) => {
    navigator.clipboard?.writeText(txt).then(() => {
      setCopied(txt);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-worship.png" alt="Faire un don" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Soutenir l'œuvre de Dieu</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Faire un don</h1>
          <p className="text-amber-100 text-sm mt-2 max-w-xl">Votre générosité fait avancer la mission MGRN et soutient la vie de l'église à Mpasa.</p>
        </div>
      </div>

      <section className="py-16 px-6 bg-amber-50/40">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Pour quoi donnez-vous ?</div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900">Choisissez la nature de votre don</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {DON_CATEGORIES.map((c) => (
              <div key={c.titre} className="bg-white border border-amber-100 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className="w-11 h-11 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <c.icon className="text-amber-700" size={20} />
                </div>
                <h3 className="font-['Playfair_Display'] text-base font-bold text-gray-900 mb-2">{c.titre}</h3>
                <p className="text-xs text-gray-600 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Mobile Money</div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900 mb-3">3 façons simples de donner</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm">Choisissez votre opérateur mobile et suivez les instructions. Le numéro de transfert est enregistré au nom de l'église.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {DON_METHODES.map((m) => (
              <div key={m.nom} className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className={`bg-gradient-to-br ${m.couleur} p-6 text-white`}>
                  <div className="flex items-center gap-2 mb-3">
                    <Smartphone size={18} />
                    <h3 className="font-['Playfair_Display'] text-lg font-bold">{m.nom}</h3>
                  </div>
                  <div className={`text-xs uppercase tracking-wider ${m.accent} mb-1`}>Numéro marchand</div>
                  <div className="flex items-center gap-2">
                    <div className="font-mono text-lg font-bold">{m.numero}</div>
                    <button
                      onClick={() => copy(m.numero)}
                      className="ml-auto inline-flex items-center gap-1 bg-white/15 hover:bg-white/25 backdrop-blur px-2.5 py-1 rounded-md text-xs font-semibold transition"
                      aria-label={`Copier ${m.numero}`}
                    >
                      {copied === m.numero ? <Check size={12} /> : <Copy size={12} />}
                      {copied === m.numero ? "Copié" : "Copier"}
                    </button>
                  </div>
                  <div className={`text-[11px] mt-2 ${m.accent}`}>Au nom de : <strong className="text-white">{m.nomCompte}</strong></div>
                </div>
                <div className="bg-white p-6 flex-1">
                  <div className="text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-3">Comment faire</div>
                  <ol className="space-y-2.5">
                    {m.instructions.map((s, i) => (
                      <li key={i} className="flex gap-3 text-xs text-gray-700 leading-relaxed">
                        <span className="shrink-0 w-5 h-5 bg-amber-100 text-amber-800 rounded-full flex items-center justify-center font-bold text-[10px]">{i + 1}</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white border border-gray-100 rounded-2xl p-7 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
              <Shield className="text-emerald-700" size={20} />
            </div>
            <div>
              <h3 className="font-['Playfair_Display'] text-lg font-bold text-gray-900 mb-2">Reçu et confidentialité</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Pour recevoir un reçu officiel, transférez le SMS de confirmation par WhatsApp au <strong>+243 81 234 5678</strong> ou par e-mail à <strong>dons@cbampasa.cd</strong> avec votre nom et la nature du don. Vos coordonnées restent strictement confidentielles.
              </p>
              <button
                onClick={() => setPage("contact")}
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition"
              >
                Contacter le bureau pastoral <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 px-6 overflow-hidden">
        <img src="/images/cba-bible.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/87" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <Quote className="text-amber-300 mx-auto mb-4" size={28} />
          <blockquote className="font-['Playfair_Display'] text-2xl text-white font-bold leading-snug mb-4">
            « Que chacun donne comme il l'a résolu en son cœur, sans tristesse ni contrainte ; car Dieu aime celui qui donne avec joie. »
          </blockquote>
          <cite className="text-amber-300 text-sm font-medium">2 Corinthiens 9:7</cite>
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: Prière (verset + demandes) ─────────────────────────────────────── */
type PriereItem = { id: string; nom: string; texte: string; categorie: string; date: string; intercesseurs: number };

const STORAGE_PRIERES = "cbampasa_prieres";
const STORAGE_INTERCESSIONS = "cbampasa_intercessions";

const SEED_PRIERES: PriereItem[] = [
  { id: "p1", nom: "Maman Claudine", texte: "Pour la guérison de ma fille hospitalisée depuis trois semaines.", categorie: "Santé", date: "Il y a 2 jours", intercesseurs: 47 },
  { id: "p2", nom: "Frère Joseph", texte: "Pour un emploi stable afin de subvenir aux besoins de ma famille.", categorie: "Travail", date: "Il y a 4 jours", intercesseurs: 32 },
  { id: "p3", nom: "Anonyme", texte: "Restauration de mon couple, sagesse et paix dans le foyer.", categorie: "Famille", date: "Il y a 5 jours", intercesseurs: 89 },
  { id: "p4", nom: "Sœur Esther", texte: "Pour mes enfants à l'école, qu'ils craignent l'Éternel et réussissent.", categorie: "Famille", date: "Il y a 1 semaine", intercesseurs: 56 },
];

const PRIERE_CATEGORIES = ["Santé", "Famille", "Travail", "Études", "Mission", "Délivrance", "Action de grâce", "Autre"];

function loadPrieres(): PriereItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_PRIERES);
    if (raw) return JSON.parse(raw);
  } catch {}
  return SEED_PRIERES;
}
function savePrieres(list: PriereItem[]) {
  try { localStorage.setItem(STORAGE_PRIERES, JSON.stringify(list)); } catch {}
}
function loadIntercessions(): Record<string, boolean> {
  try {
    const raw = localStorage.getItem(STORAGE_INTERCESSIONS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}
function saveIntercessions(map: Record<string, boolean>) {
  try { localStorage.setItem(STORAGE_INTERCESSIONS, JSON.stringify(map)); } catch {}
}

function PagePriere() {
  const verset = getVersetDuJour();
  const [prieres, setPrieres] = useState<PriereItem[]>(() => loadPrieres());
  const [interceded, setInterceded] = useState<Record<string, boolean>>(() => loadIntercessions());
  const [form, setForm] = useState({ nom: "", texte: "", categorie: "Santé", anonyme: false });
  const [sent, setSent] = useState(false);

  useEffect(() => savePrieres(prieres), [prieres]);
  useEffect(() => saveIntercessions(interceded), [interceded]);

  const intercede = (id: string) => {
    if (interceded[id]) return;
    setInterceded({ ...interceded, [id]: true });
    setPrieres((list) => list.map((p) => (p.id === id ? { ...p, intercesseurs: p.intercesseurs + 1 } : p)));
  };

  const supprimer = (id: string) => {
    setPrieres((list) => list.filter((p) => p.id !== id));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.texte.trim()) return;
    const nouveau: PriereItem = {
      id: "local_" + Date.now(),
      nom: form.anonyme || !form.nom.trim() ? "Anonyme" : form.nom.trim(),
      texte: form.texte.trim(),
      categorie: form.categorie,
      date: "À l'instant",
      intercesseurs: 0,
    };
    setPrieres([nouveau, ...prieres]);
    setForm({ nom: "", texte: "", categorie: "Santé", anonyme: false });
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/images/cba-bible.png" alt="Demandes de prière" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/85" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Mur de prière</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Prions ensemble</h1>
          <p className="text-amber-100 text-sm mt-2 max-w-xl">Soumettez votre intention et intercédez pour vos frères et sœurs.</p>
        </div>
      </div>

      <section className="py-12 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-amber-50 via-white to-amber-50 border border-amber-100 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -left-4 text-amber-100">
              <Quote size={90} className="rotate-180" />
            </div>
            <div className="relative">
              <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Verset du jour</div>
              <blockquote className="font-['Playfair_Display'] text-xl md:text-2xl text-gray-900 leading-relaxed font-bold mb-3">
                « {verset.text} »
              </blockquote>
              <cite className="text-amber-800 font-semibold text-sm not-italic">— {verset.ref}</cite>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Soumettre une intention</div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900 mb-2">Partagez votre fardeau</h2>
            <p className="text-sm text-gray-500 max-w-lg mx-auto">L'équipe pastorale et les fidèles intercéderont pour vous. Vous pouvez rester anonyme.</p>
          </div>

          <form onSubmit={submit} className="bg-white rounded-2xl p-7 shadow-sm border border-gray-100 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priere-nom" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Votre nom</label>
                <input
                  id="priere-nom"
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  disabled={form.anonyme}
                  placeholder="Prénom (optionnel)"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none text-sm disabled:bg-gray-50 disabled:text-gray-400"
                />
              </div>
              <div>
                <label htmlFor="priere-categorie" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Catégorie</label>
                <select
                  id="priere-categorie"
                  value={form.categorie}
                  onChange={(e) => setForm({ ...form, categorie: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none text-sm bg-white"
                >
                  {PRIERE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="priere-texte" className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wide">Votre demande</label>
              <textarea
                id="priere-texte"
                value={form.texte}
                onChange={(e) => setForm({ ...form, texte: e.target.value })}
                required
                rows={4}
                placeholder="Partagez avec vos frères et sœurs ce pour quoi vous souhaitez prier…"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 outline-none text-sm resize-none"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={form.anonyme}
                onChange={(e) => setForm({ ...form, anonyme: e.target.checked })}
                className="w-4 h-4 accent-amber-700"
              />
              Publier en anonyme
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full transition shadow-md"
              >
                <Send size={14} /> Soumettre ma demande
              </button>
              {sent && (
                <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full text-xs font-semibold">
                  <Check size={12} /> Reçue — l'église prie pour vous
                </span>
              )}
            </div>
          </form>
        </div>
      </section>

      <section className="py-14 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Mur de prière</div>
            <h2 className="font-['Playfair_Display'] text-3xl font-bold text-gray-900 mb-2">Intercédons les uns pour les autres</h2>
            <p className="text-sm text-gray-500">« Confessez donc vos péchés les uns aux autres, et priez les uns pour les autres » — Jacques 5:16</p>
          </div>

          {prieres.length === 0 ? (
            <div className="text-center py-16 text-gray-500 text-sm">Aucune demande pour le moment. Soyez le premier à soumettre une intention.</div>
          ) : (
            <ul className="space-y-4">
              {prieres.map((p) => {
                const aPrie = !!interceded[p.id];
                const estLocal = p.id.startsWith("local_");
                return (
                  <li key={p.id} className="bg-amber-50/40 border border-amber-100 rounded-2xl p-5 hover:shadow-sm transition">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {p.nom.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-900">{p.nom}</div>
                          <div className="text-[11px] text-gray-500">{p.date}</div>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest bg-white border border-amber-200 text-amber-800 font-bold px-2.5 py-1 rounded-full">
                        {p.categorie}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mb-4 pl-1">{p.texte}</p>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="text-xs text-gray-600">
                        <strong className="text-amber-800">{p.intercesseurs}</strong> {p.intercesseurs > 1 ? "intercesseurs prient" : "intercesseur prie"} pour cette demande
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => intercede(p.id)}
                          disabled={aPrie}
                          className={`inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full transition ${
                            aPrie
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                              : "bg-amber-700 hover:bg-amber-800 text-white shadow-sm"
                          }`}
                        >
                          {aPrie ? <><Check size={12} /> J'ai prié</> : <><HandHelping size={12} /> Je prie pour vous</>}
                        </button>
                        {estLocal && (
                          <button
                            onClick={() => supprimer(p.id)}
                            className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-red-600 transition"
                            title="Retirer (uniquement vos demandes locales)"
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}

/* ─── Root ─────────────────────────────────────── */
const VALID_PAGES: Page[] = [
  "accueil", "apropos", "ministeres", "horaires", "sermons", "direct",
  "galerie", "evenements", "contact", "rejoindre", "don", "priere", "admin",
];

export default function App() {
  const [page, setPageState] = useState<Page>(() => {
    if (typeof window === "undefined") return "accueil";
    const p = new URLSearchParams(window.location.search).get("p") as Page | null;
    return p && (VALID_PAGES as string[]).includes(p) ? p : "accueil";
  });

  const setPage = (p: Page) => {
    setPageState(p);
    if (typeof window !== "undefined") {
      const url = p === "accueil" ? window.location.pathname : `${window.location.pathname}?p=${p}`;
      window.history.pushState({ page: p }, "", url);
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onPop = () => {
      const p = new URLSearchParams(window.location.search).get("p") as Page | null;
      setPageState(p && (VALID_PAGES as string[]).includes(p) ? p : "accueil");
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  if (page === "admin") {
    return <AdminApp onExit={() => setPage("accueil")} />;
  }

  const content = (() => {
    switch (page) {
      case "accueil":    return <PageAccueil setPage={setPage} />;
      case "apropos":    return <PageAPropos setPage={setPage} />;
      case "ministeres": return <PageMinisteres setPage={setPage} />;
      case "horaires":   return <PageHoraires />;
      case "sermons":    return <PageSermons />;
      case "direct":     return <PageDirect setPage={setPage} />;
      case "galerie":    return <PageGalerie />;
      case "evenements": return <PageEvenements setPage={setPage} />;
      case "contact":    return <PageContact />;
      case "rejoindre":  return <PageRejoindre setPage={setPage} />;
      case "don":        return <PageDon setPage={setPage} />;
      case "priere":     return <PagePriere />;
      default:           return <PageAccueil setPage={setPage} />;
    }
  })();

  return <Layout page={page} setPage={setPage}>{content}</Layout>;
}
