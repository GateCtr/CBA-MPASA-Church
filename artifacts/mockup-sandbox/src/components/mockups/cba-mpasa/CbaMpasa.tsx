import { useState } from "react";
import { Menu, X, Phone, Mail, MapPin, Clock, ChevronDown, Play, Heart, Book, Users, Music, Cross, ArrowRight, Facebook, Youtube, Instagram } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "À Propos", href: "#apropos" },
  { label: "Ministères", href: "#ministeres" },
  { label: "Horaires", href: "#horaires" },
  { label: "Sermons", href: "#sermons" },
  { label: "Contact", href: "#contact" },
];

const MINISTRIES = [
  { icon: Users, title: "Famille & Couples", desc: "Accompagner les familles dans leur croissance spirituelle et le renforcement du foyer chrétien." },
  { icon: Book, title: "École du Dimanche", desc: "Enseignements bibliques adaptés pour les enfants et les jeunes, fondés sur la Parole de Dieu." },
  { icon: Music, title: "Louange & Adoration", desc: "Un ministère musical dédié à glorifier Dieu à travers le chant, les instruments et la danse." },
  { icon: Heart, title: "Action Sociale", desc: "Servir la communauté de Mpasa par des actions concrètes d'amour et de solidarité." },
  { icon: Users, title: "Jeunesse CBA", desc: "Équiper la jeune génération pour vivre pleinement leur foi au quotidien dans la société." },
  { icon: Book, title: "Cellules de Maison", desc: "Des groupes de prière et d'étude biblique dans les quartiers pour approfondir la communauté." },
];

const SERMONS = [
  {
    title: "Marche dans la Lumière de Dieu",
    speaker: "Pasteur Principal",
    date: "20 Avril 2025",
    duration: "52 min",
    ref: "Jean 8:12",
  },
  {
    title: "La Foi qui Déplace les Montagnes",
    speaker: "Ancien Jean-Pierre Mbala",
    date: "13 Avril 2025",
    duration: "45 min",
    ref: "Matthieu 17:20",
  },
  {
    title: "L'Amour de Dieu Sans Condition",
    speaker: "Pasteur Principal",
    date: "6 Avril 2025",
    duration: "48 min",
    ref: "Jean 3:16",
  },
];

const SCHEDULE = [
  { day: "Dimanche", services: ["Culte du matin — 9h00", "École du Dimanche — 11h00", "Culte du soir — 17h00"] },
  { day: "Mercredi", services: ["Réunion de prière — 18h30"] },
  { day: "Vendredi", services: ["Nuit de Prière — 21h00 (1er vendredi du mois)"] },
  { day: "Samedi", services: ["Jeunesse CBA — 15h00", "Cellules de maison — Voir programme"] },
];

export function CbaMpasa() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-['Inter'] text-gray-900 bg-white overflow-x-hidden">

      {/* ── Top Bar ── */}
      <div className="bg-amber-700 text-amber-50 text-sm py-2 px-6 flex flex-wrap justify-between gap-2">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1"><Phone size={12} /> +243 81 234 5678</span>
          <span className="flex items-center gap-1"><Mail size={12} /> contact@cbampasa.cd</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#" className="hover:text-white transition"><Facebook size={14} /></a>
          <a href="#" className="hover:text-white transition"><Youtube size={14} /></a>
          <a href="#" className="hover:text-white transition"><Instagram size={14} /></a>
        </div>
      </div>

      {/* ── Navigation ── */}
      <nav className="sticky top-0 z-50 bg-white shadow-md border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
              <span className="text-white font-['Playfair_Display'] font-bold text-sm">CBA</span>
            </div>
            <div>
              <div className="font-['Playfair_Display'] font-bold text-xl text-amber-800 leading-none">CBA-MPASA</div>
              <div className="text-xs text-gray-500 tracking-wide">Communauté Baptiste Africaine</div>
            </div>
          </div>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-sm font-medium text-gray-700 hover:text-amber-700 transition-colors duration-200 relative group">
                  {l.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-700 group-hover:w-full transition-all duration-300" />
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="hidden lg:inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-md">
            Nous Rejoindre <ArrowRight size={14} />
          </a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden text-gray-700">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-amber-50 px-6 pb-4">
            {NAV_LINKS.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="block py-2.5 text-sm font-medium text-gray-700 hover:text-amber-700 border-b border-gray-50">
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ── Hero ── */}
      <section id="accueil" className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img src="/__mockup/images/cba-hero.png" alt="Église CBA-MPASA" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-amber-600/20 border border-amber-400/40 text-amber-300 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
              ✝ Bienvenue chez vous
            </div>
            <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              Communauté<br />
              <span className="text-amber-400">Baptiste</span><br />
              Africaine
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed mb-8 max-w-md">
              Une église enracinée dans la foi, unie dans l'amour, et engagée pour la transformation de Mpasa et au-delà.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#horaires" className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5">
                Nos Cultes <ChevronDown size={16} />
              </a>
              <a href="#sermons" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-7 py-3.5 rounded-full transition-all duration-200 backdrop-blur-sm">
                <Play size={16} className="fill-white" /> Écouter un Sermon
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-white/60" size={24} />
        </div>
      </section>

      {/* ── Welcome Banner ── */}
      <section className="bg-amber-700 text-white py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { n: "25+", label: "Années de ministère" },
            { n: "1 500+", label: "Membres & familles" },
            { n: "6", label: "Ministères actifs" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-['Playfair_Display'] text-4xl font-bold text-amber-200 mb-1">{s.n}</div>
              <div className="text-amber-100 text-sm uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── About ── */}
      <section id="apropos" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <img src="/__mockup/images/cba-worship.png" alt="Culte CBA-MPASA" className="rounded-2xl shadow-2xl w-full object-cover h-[450px]" />
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-amber-700 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl">
              <div className="font-['Playfair_Display'] text-3xl font-bold">25</div>
              <div className="text-xs uppercase tracking-wide text-amber-200">Ans de Foi</div>
            </div>
          </div>

          <div>
            <div className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">Notre Histoire</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Une Église bâtie sur la<br />
              <span className="text-amber-700">Roche Éternelle</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Fondée au cœur de Mpasa, la Communauté Baptiste Africaine (CBA-MPASA) est une église vivante, enracinée dans la Parole de Dieu et animée par l'Esprit Saint.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Depuis sa fondation, notre vision est de faire de Mpasa et ses environs un territoire transformé par l'Évangile — une maison pour les brisés, un refuge pour les chercheurs de Dieu, et une école pour les disciples de Jésus-Christ.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {["Adoration authentique", "Enseignement solide", "Prière fervent", "Service communautaire"].map((v) => (
                <div key={v} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 rounded-full bg-amber-600 shrink-0" />
                  {v}
                </div>
              ))}
            </div>
            <a href="#ministeres" className="inline-flex items-center gap-2 bg-amber-700 hover:bg-amber-800 text-white font-semibold px-6 py-3 rounded-full transition-colors duration-200">
              Découvrir nos ministères <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Scripture Banner ── */}
      <section className="relative py-20 px-6 overflow-hidden">
        <img src="/__mockup/images/cba-bible.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-amber-900/85" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="text-amber-300 mb-4">✝ ✝ ✝</div>
          <blockquote className="font-['Playfair_Display'] text-3xl md:text-4xl text-white font-bold leading-snug mb-6">
            « Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse pas, mais qu'il ait la vie éternelle. »
          </blockquote>
          <cite className="text-amber-300 text-lg font-medium">Jean 3:16</cite>
        </div>
      </section>

      {/* ── Ministries ── */}
      <section id="ministeres" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">Nos Ministères</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-4">Servir ensemble<br />pour la gloire de Dieu</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Chaque ministère est un espace où vous pouvez grandir, servir et trouver votre place dans le Corps de Christ.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MINISTRIES.map((m) => (
              <div key={m.title} className="group bg-white border border-gray-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:border-amber-200">
                <div className="w-14 h-14 bg-amber-50 group-hover:bg-amber-700 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <m.icon className="text-amber-700 group-hover:text-white transition-colors duration-300" size={22} />
                </div>
                <h3 className="font-['Playfair_Display'] text-xl font-bold text-gray-900 mb-3">{m.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section id="horaires" className="py-24 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <div className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">Horaires des Cultes</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-6">Rejoignez-nous<br />chaque semaine</h2>
            <p className="text-gray-600 leading-relaxed mb-8">Que vous soyez croyant de longue date ou que vous cherchiez Dieu pour la première fois, il y a toujours une place pour vous ici. Venez tel que vous êtes.</p>
            <div className="space-y-4">
              {SCHEDULE.map((s) => (
                <div key={s.day} className="bg-white rounded-xl p-5 shadow-sm border border-amber-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-amber-700 rounded-lg flex items-center justify-center">
                      <Clock size={14} className="text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">{s.day}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {s.services.map((sv) => (
                      <li key={sv} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        {sv}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img src="/__mockup/images/cba-community.png" alt="Communauté CBA-MPASA" className="rounded-2xl shadow-2xl w-full object-cover h-[500px]" />
            <div className="absolute inset-0 rounded-2xl ring-4 ring-amber-200/40" />
            <div className="absolute -top-5 -left-5 bg-white rounded-xl p-4 shadow-xl border border-amber-100">
              <div className="text-amber-700 font-semibold text-sm mb-1">📍 Adresse</div>
              <div className="text-gray-700 text-sm font-medium">Quartier Mpasa III<br />Kinshasa, R.D. Congo</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sermons ── */}
      <section id="sermons" className="py-24 px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-amber-400 text-sm font-semibold uppercase tracking-widest mb-3">Messages & Prédications</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold mb-4">Nourrir votre âme<br />par la Parole de Dieu</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Retrouvez nos derniers sermons et enseignements bibliques pour approfondir votre relation avec Dieu.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERMONS.map((s) => (
              <div key={s.title} className="group bg-gray-800 hover:bg-gray-750 rounded-2xl p-7 border border-gray-700 hover:border-amber-600/40 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-11 h-11 bg-amber-700/20 group-hover:bg-amber-700 rounded-full flex items-center justify-center transition-colors duration-300">
                    <Play size={16} className="text-amber-400 group-hover:text-white fill-current" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">{s.date}</div>
                    <div className="text-xs text-amber-400 font-semibold">{s.duration}</div>
                  </div>
                </div>
                <div className="text-xs text-amber-500 font-semibold mb-2 uppercase tracking-wide">{s.ref}</div>
                <h3 className="font-['Playfair_Display'] text-lg font-bold text-white mb-2 leading-snug">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.speaker}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <a href="#" className="inline-flex items-center gap-2 border border-amber-600 text-amber-400 hover:bg-amber-600 hover:text-white font-semibold px-7 py-3 rounded-full transition-all duration-200">
              Voir tous les sermons <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section id="contact" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="text-amber-700 text-sm font-semibold uppercase tracking-widest mb-3">Contactez-nous</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-6">Nous sommes là<br />pour vous accueillir</h2>
            <p className="text-gray-600 leading-relaxed mb-10">Vous avez une question ? Vous souhaitez en savoir plus sur nos activités ? Notre équipe est disponible pour vous accompagner.</p>

            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Adresse", value: "Quartier Mpasa III, Commune de N'sele\nKinshasa, République Démocratique du Congo" },
                { icon: Phone, label: "Téléphone", value: "+243 81 234 5678\n+243 99 876 5432" },
                { icon: Mail, label: "Email", value: "contact@cbampasa.cd\ninfo@cbampasa.cd" },
                { icon: Clock, label: "Bureau pastoral", value: "Lundi - Vendredi : 9h00 - 17h00\nSamedi : 10h00 - 14h00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                    <c.icon size={18} className="text-amber-700" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">{c.label}</div>
                    <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-line">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h3>
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Prénom</label>
                  <input type="text" placeholder="Jean" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Nom</label>
                  <input type="text" placeholder="Kabila" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Email</label>
                <input type="email" placeholder="jean@exemple.cd" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Sujet</label>
                <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition">
                  <option>Première visite</option>
                  <option>Rejoindre un ministère</option>
                  <option>Demande de prière</option>
                  <option>Renseignements généraux</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">Message</label>
                <textarea rows={4} placeholder="Votre message..." className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition resize-none" />
              </div>
              <button type="button" className="w-full bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 shadow-md">
                Envoyer le Message ✉
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-gray-950 text-gray-400 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
                <span className="text-white font-['Playfair_Display'] font-bold text-sm">CBA</span>
              </div>
              <div>
                <div className="font-['Playfair_Display'] font-bold text-lg text-white">CBA-MPASA</div>
                <div className="text-xs text-gray-500">Communauté Baptiste Africaine</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 max-w-xs mb-5">
              Enracinés dans la foi, unis dans l'amour, engagés pour la transformation de Mpasa et de la République Démocratique du Congo.
            </p>
            <div className="flex gap-3">
              {[Facebook, Youtube, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-gray-800 hover:bg-amber-700 rounded-lg flex items-center justify-center transition-colors duration-200">
                  <Icon size={15} className="text-gray-300" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">Navigation</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-gray-500 hover:text-amber-400 transition-colors">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wide">Cultes</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center gap-2"><Clock size={12} /> Dimanche 9h00 & 17h00</li>
              <li className="flex items-center gap-2"><Clock size={12} /> Mercredi 18h30</li>
              <li className="flex items-center gap-2"><MapPin size={12} /> Mpasa III, Kinshasa</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} CBA-MPASA — Communauté Baptiste Africaine de Mpasa. Tous droits réservés.
          <br />
          <span className="text-amber-700/60">« La grâce et la paix vous soient données. » — Rom. 1:7</span>
        </div>
      </footer>
    </div>
  );
}
