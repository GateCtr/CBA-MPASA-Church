import { useState } from "react";
import {
  Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, Play,
  Heart, Book, Users, Music, ArrowRight, Facebook, Youtube,
  Instagram, BookOpen, HandHeart, ChevronRight, Send, CalendarDays, Mic2,
} from "lucide-react";

type Page = "accueil" | "apropos" | "ministeres" | "horaires" | "sermons" | "contact" | "rejoindre";

const NAV_LINKS: { label: string; page: Page }[] = [
  { label: "Accueil", page: "accueil" },
  { label: "À Propos", page: "apropos" },
  { label: "Ministères", page: "ministeres" },
  { label: "Horaires", page: "horaires" },
  { label: "Sermons", page: "sermons" },
  { label: "Contact", page: "contact" },
];

/* ─── Shared Layout ─────────────────────────────────────── */
function Layout({ page, setPage, children }: { page: Page; setPage: (p: Page) => void; children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-['Inter'] text-gray-900 bg-white min-h-screen flex flex-col overflow-x-hidden">
      {/* Top Bar */}
      <div className="bg-amber-700 text-amber-50 text-xs py-2 px-6 flex flex-wrap justify-between gap-2 shrink-0">
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1"><Phone size={11} /> +243 81 234 5678</span>
          <span className="flex items-center gap-1"><Mail size={11} /> contact@cbampasa.cd</span>
          <span className="flex items-center gap-1"><MapPin size={11} /> Mpasa Mikonga, Kinshasa</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-white transition"><Facebook size={13} /></a>
          <a href="#" className="hover:text-white transition"><Youtube size={13} /></a>
          <a href="#" className="hover:text-white transition"><Instagram size={13} /></a>
        </div>
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-amber-100 shrink-0">
        <div className="max-w-7xl mx-auto px-6 py-3.5 flex justify-between items-center">
          <button onClick={() => setPage("accueil")} className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-9 h-9 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-['Playfair_Display'] font-bold text-xs">CBA</span>
            </div>
            <div className="text-left">
              <div className="font-['Playfair_Display'] font-bold text-lg text-amber-800 leading-none">CBA-MPASA</div>
              <div className="text-[10px] text-gray-500 tracking-wide">Citadelle de la Foi</div>
            </div>
          </button>

          <ul className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((l) => (
              <li key={l.page}>
                <button
                  onClick={() => setPage(l.page)}
                  className={`text-sm font-medium transition-colors duration-200 relative group pb-0.5 ${page === l.page ? "text-amber-700" : "text-gray-700 hover:text-amber-700"}`}
                >
                  {l.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-700 transition-all duration-300 ${page === l.page ? "w-full" : "w-0 group-hover:w-full"}`} />
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setPage("rejoindre")}
            className="hidden lg:inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-md"
          >
            Nous Rejoindre <ArrowRight size={13} />
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-700">
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-amber-50 px-6 pb-4">
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
              onClick={() => { setPage("rejoindre"); setMenuOpen(false); }}
              className="mt-3 w-full bg-amber-700 text-white text-sm font-semibold py-2.5 rounded-full"
            >
              Nous Rejoindre
            </button>
          </div>
        )}
      </nav>

      {/* Page Content */}
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
              Centre d'Enseignement Biblique Appliqué — engagée pour la transformation de Mpasa Mikonga et de toute la R.D. Congo.
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
            <h4 className="text-white font-semibold text-xs mb-4 uppercase tracking-wide">Cultes</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2"><Clock size={11} /> Dimanche 9h00 & 17h00</li>
              <li className="flex items-center gap-2"><Clock size={11} /> Mercredi 18h30</li>
              <li className="flex items-center gap-2"><MapPin size={11} /> Mpasa Mikonga, Kinshasa</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} CBA-MPASA · Centre d'Enseignement Biblique Appliqué · Citadelle de la Foi · Mpasa Mikonga, Kinshasa
          <br /><span className="text-amber-700/60">« La grâce et la paix vous soient données. » — Rom. 1:7</span>
        </div>
      </footer>
    </div>
  );
}

/* ─── PAGE: Accueil ─────────────────────────────────────── */
function PageAccueil({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[88vh] min-h-[580px] overflow-hidden">
        <img src="/__mockup/images/cba-hero.png" alt="CBA-MPASA" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              ✝ Bienvenue chez vous
            </div>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Centre d'Enseignement<br /><span className="text-amber-400">Biblique Appliqué</span>
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-md">
              Citadelle de la Foi — enracinée dans la Parole, unie dans l'amour, engagée pour la transformation de Mpasa Mikonga.
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

      {/* Stats */}
      <section className="bg-amber-700 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
          {[{ n: "25+", label: "Années de ministère" }, { n: "1 500+", label: "Membres & familles" }, { n: "6", label: "Ministères actifs" }].map((s) => (
            <div key={s.label}>
              <div className="font-['Playfair_Display'] text-4xl font-bold text-amber-200 mb-1">{s.n}</div>
              <div className="text-amber-100 text-xs uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick links */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Découvrez l'église</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900">Tout ce dont vous avez besoin</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, page: "apropos" as Page, title: "Notre Histoire", desc: "Découvrez qui nous sommes, notre vision et nos valeurs fondamentales." },
              { icon: Users, page: "ministeres" as Page, title: "Nos Ministères", desc: "Trouvez votre place et servez Dieu au sein de l'un de nos 6 ministères." },
              { icon: CalendarDays, page: "horaires" as Page, title: "Horaires", desc: "Consultez les horaires de nos cultes, réunions et activités hebdomadaires." },
              { icon: Mic2, page: "sermons" as Page, title: "Sermons", desc: "Écoutez et revisionnez les dernières prédications de nos pasteurs et anciens." },
              { icon: Mail, page: "contact" as Page, title: "Nous Contacter", desc: "Posez vos questions, demandez une prière ou planifiez une visite." },
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

      {/* Scripture */}
      <section className="relative py-20 px-6 overflow-hidden">
        <img src="/__mockup/images/cba-bible.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
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

/* ─── PAGE: À Propos ─────────────────────────────────────── */
function PageAPropos({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      {/* Page Hero */}
      <div className="relative h-64 overflow-hidden">
        <img src="/__mockup/images/cba-worship.png" alt="À Propos" className="absolute inset-0 w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Notre Identité</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">À Propos de CBA-MPASA</h1>
        </div>
      </div>

      {/* Identity */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="/__mockup/images/cba-worship.png" alt="Culte" className="rounded-2xl shadow-2xl w-full object-cover h-[420px]" />
            <div className="absolute -bottom-5 -right-5 w-36 h-36 bg-amber-700 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl">
              <div className="font-['Playfair_Display'] text-3xl font-bold">25</div>
              <div className="text-xs uppercase tracking-wide text-amber-200">Ans de Foi</div>
            </div>
          </div>
          <div>
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-3">Qui sommes-nous ?</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-5 leading-tight">
              Une Église bâtie sur la<br /><span className="text-amber-700">Roche Éternelle</span>
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-4">
              Fondé à <strong>Mpasa Mikonga</strong>, le <strong>Centre d'Enseignement Biblique Appliqué (CBA-MPASA)</strong> — surnommé <strong className="text-amber-700">Citadelle de la Foi</strong> — est une église vivante, enracinée dans la Parole de Dieu et animée par l'Esprit Saint.
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

      {/* Values */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Nos Fondements</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900">Ce en quoi nous croyons</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              { ref: "2 Tim. 3:16-17", title: "La Bible, Parole de Dieu", desc: "Nous croyons que toute l'Écriture est inspirée de Dieu et utile pour enseigner, reprendre, redresser et instruire dans la justice." },
              { ref: "Jean 3:3", title: "La Nouvelle Naissance", desc: "Nous prêchons la nécessité d'une transformation intérieure par le Saint-Esprit pour entrer dans le Royaume de Dieu." },
              { ref: "1 Cor. 12:13", title: "L'Église Corps de Christ", desc: "Nous célébrons l'unité du Corps de Christ, fait de croyants de tout horizon, liés par un même Esprit et une même foi." },
              { ref: "Matt. 28:19-20", title: "La Grande Commission", desc: "Nous sommes mandatés pour faire de toutes les nations des disciples, baptiser et enseigner à observer tout ce que Christ a commandé." },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-7 border border-amber-100 shadow-sm">
                <div className="text-amber-600 text-xs font-semibold mb-2 uppercase tracking-wide">{v.ref}</div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">{v.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 px-6 bg-gray-900 text-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="w-12 h-12 bg-amber-700/30 rounded-xl flex items-center justify-center mb-5">
              <BookOpen className="text-amber-400" size={22} />
            </div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4 text-white">Notre Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              Voir Mpasa Mikonga et toute la République Démocratique du Congo transformés par la puissance de l'Évangile de Jésus-Christ, un foyer à la fois.
            </p>
          </div>
          <div>
            <div className="w-12 h-12 bg-amber-700/30 rounded-xl flex items-center justify-center mb-5">
              <HandHeart className="text-amber-400" size={22} />
            </div>
            <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4 text-white">Notre Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              Enseigner, appliquer et vivre la Parole de Dieu dans toutes les sphères de la vie — famille, société, travail — afin que chaque croyant soit un agent de changement dans son milieu.
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

/* ─── PAGE: Ministères ─────────────────────────────────────── */
const MINISTRIES = [
  { icon: Users, title: "Famille & Couples", ref: "Éph. 5:22-33", desc: "Accompagner les familles dans leur croissance spirituelle et le renforcement du foyer chrétien par l'enseignement et le conseil pastoral." },
  { icon: Book, title: "École du Dimanche", ref: "Prov. 22:6", desc: "Enseignements bibliques adaptés pour les enfants et les jeunes, fondés sur la Parole de Dieu et dispensés par des enseignants formés." },
  { icon: Music, title: "Louange & Adoration", ref: "Ps. 150:6", desc: "Un ministère musical dédié à glorifier Dieu à travers le chant, les instruments et la danse, et à conduire l'assemblée à l'adoration." },
  { icon: Heart, title: "Action Sociale", ref: "Matt. 25:35", desc: "Servir la communauté de Mpasa Mikonga par des actions concrètes d'amour : aide alimentaire, soutien aux familles, visites aux malades." },
  { icon: Users, title: "Jeunesse CBA", ref: "1 Tim. 4:12", desc: "Équiper la jeune génération pour vivre pleinement leur foi au quotidien dans la société congolaise — formation, retraites, évangélisation." },
  { icon: BookOpen, title: "Cellules de Maison", ref: "Actes 2:46", desc: "Des groupes de prière et d'étude biblique dans les quartiers pour approfondir la communauté et faire croître la foi hors des murs de l'église." },
];

function PageMinisteres({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/__mockup/images/cba-community.png" alt="Ministères" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/80" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="text-amber-300 text-xs font-semibold uppercase tracking-widest mb-2">✝ Servir Ensemble</div>
          <h1 className="font-['Playfair_Display'] text-4xl font-bold text-white">Nos Ministères</h1>
        </div>
      </div>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-amber-700 text-xs font-semibold uppercase tracking-widest mb-2">Trouvez votre place</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-3">Servir pour la gloire de Dieu</h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">Chaque ministère est un espace où vous pouvez grandir, servir et trouver votre place dans le Corps de Christ à Mpasa Mikonga.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MINISTRIES.map((m) => (
              <div key={m.title} className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-amber-200">
                <div className="w-14 h-14 bg-amber-50 group-hover:bg-amber-700 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <m.icon className="text-amber-700 group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <div className="text-amber-600 text-xs font-semibold mb-2 uppercase tracking-wide">{m.ref}</div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-14 px-6 bg-amber-700 text-white text-center">
        <h3 className="font-['Playfair_Display'] text-3xl font-bold mb-3">Intégrer un ministère</h3>
        <p className="text-amber-100 mb-6 max-w-lg mx-auto text-sm">Vous souhaitez vous investir dans l'un de nos ministères ? Contactez-nous et nous vous guiderons dans votre engagement.</p>
        <button onClick={() => setPage("contact")} className="inline-flex items-center gap-2 bg-white text-amber-800 hover:bg-amber-50 font-semibold px-7 py-3 rounded-full transition-colors">
          Nous Contacter <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ─── PAGE: Horaires ─────────────────────────────────────── */
const SCHEDULE = [
  { day: "Dimanche", color: "bg-amber-700", services: ["Culte du matin — 9h00", "École du Dimanche — 11h00", "Culte du soir — 17h00"] },
  { day: "Mercredi", color: "bg-blue-700", services: ["Réunion de prière — 18h30"] },
  { day: "Vendredi", color: "bg-purple-700", services: ["Nuit de Prière — 21h00 (1er vendredi du mois)"] },
  { day: "Samedi", color: "bg-green-700", services: ["Jeunesse CBA — 15h00", "Cellules de maison — Voir programme"] },
];

function PageHoraires() {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/__mockup/images/cba-community.png" alt="Horaires" className="absolute inset-0 w-full h-full object-cover" />
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

          {/* Location card */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-3">Comment nous trouver ?</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-3"><MapPin size={16} className="text-amber-700 mt-0.5 shrink-0" /><span><strong>Mpasa Mikonga</strong>, Commune de N'sele<br />Kinshasa, République Démocratique du Congo</span></div>
                <div className="flex items-center gap-3"><Phone size={16} className="text-amber-700 shrink-0" /><span>+243 81 234 5678</span></div>
                <div className="flex items-center gap-3"><Mail size={16} className="text-amber-700 shrink-0" /><span>contact@cbampasa.cd</span></div>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-3">Bureau Pastoral</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-3"><Clock size={16} className="text-amber-700 shrink-0" /><span>Lundi – Vendredi : 9h00 – 17h00</span></div>
                <div className="flex items-center gap-3"><Clock size={16} className="text-amber-700 shrink-0" /><span>Samedi : 10h00 – 14h00</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ─── PAGE: Sermons ─────────────────────────────────────── */
const SERMONS = [
  { title: "Marche dans la Lumière de Dieu", speaker: "Pasteur Principal", date: "20 Avril 2025", duration: "52 min", ref: "Jean 8:12", cat: "Vie Chrétienne" },
  { title: "La Foi qui Déplace les Montagnes", speaker: "Ancien Jean-Pierre Mbala", date: "13 Avril 2025", duration: "45 min", ref: "Matthieu 17:20", cat: "La Foi" },
  { title: "L'Amour de Dieu Sans Condition", speaker: "Pasteur Principal", date: "6 Avril 2025", duration: "48 min", ref: "Jean 3:16", cat: "L'Évangile" },
  { title: "Appliquer la Parole au Quotidien", speaker: "Pasteur Principal", date: "30 Mars 2025", duration: "55 min", ref: "Jacques 1:22", cat: "Enseignement" },
  { title: "La Famille Selon Dieu", speaker: "Ancien Théodore Lumu", date: "23 Mars 2025", duration: "42 min", ref: "Éph. 5:22-33", cat: "Famille" },
  { title: "La Puissance de la Prière", speaker: "Pasteur Principal", date: "16 Mars 2025", duration: "50 min", ref: "Phil. 4:6-7", cat: "Prière" },
];

function PageSermons() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/__mockup/images/cba-bible.png" alt="Sermons" className="absolute inset-0 w-full h-full object-cover" />
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

/* ─── PAGE: Contact ─────────────────────────────────────── */
function PageContact() {
  return (
    <div>
      <div className="relative h-64 overflow-hidden">
        <img src="/__mockup/images/cba-hero.png" alt="Contact" className="absolute inset-0 w-full h-full object-cover" />
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
                { icon: MapPin, label: "Adresse", value: "Mpasa Mikonga, Commune de N'sele\nKinshasa, République Démocratique du Congo" },
                { icon: Phone, label: "Téléphone", value: "+243 81 234 5678\n+243 99 876 5432" },
                { icon: Mail, label: "Email", value: "contact@cbampasa.cd\ninfo@cbampasa.cd" },
                { icon: Clock, label: "Bureau pastoral", value: "Lun – Ven : 9h00 – 17h00 | Sam : 10h00 – 14h00" },
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
                  <option>Rejoindre un ministère</option>
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
        <img src="/__mockup/images/cba-community.png" alt="Nous Rejoindre" className="absolute inset-0 w-full h-full object-cover" />
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

          {/* Steps */}
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
                Une fois membre, vous pourrez rejoindre un ministère, participer aux cellules de maison et vous engager pleinement dans la vie de la Citadelle de la Foi.
              </p>
              <button onClick={() => setPage("ministeres")} className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-7 py-3 rounded-full transition-colors">
                Voir les ministères <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Membership Form */}
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
                <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">Ministère souhaité</label>
                <select className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition">
                  <option value="">— Aucun pour l'instant —</option>
                  <option>Famille & Couples</option>
                  <option>École du Dimanche</option>
                  <option>Louange & Adoration</option>
                  <option>Action Sociale</option>
                  <option>Jeunesse CBA</option>
                  <option>Cellules de Maison</option>
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

/* ─── Root Component ─────────────────────────────────────── */
export function CbaMpasa() {
  const [page, setPage] = useState<Page>("accueil");

  const content = (() => {
    switch (page) {
      case "accueil":    return <PageAccueil setPage={setPage} />;
      case "apropos":    return <PageAPropos setPage={setPage} />;
      case "ministeres": return <PageMinisteres setPage={setPage} />;
      case "horaires":   return <PageHoraires />;
      case "sermons":    return <PageSermons />;
      case "contact":    return <PageContact />;
      case "rejoindre":  return <PageRejoindre setPage={setPage} />;
    }
  })();

  return <Layout page={page} setPage={setPage}>{content}</Layout>;
}
