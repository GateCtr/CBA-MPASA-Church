import { useEffect, useState } from "react";
import { CheckCircle2, Facebook, Globe, Instagram, Youtube } from "lucide-react";
import { Field } from "../components/Field";
import type { SiteSettings } from "../types";
import { inputCls } from "../utils";

export function SettingsAdmin({
  settings,
  setSettings,
}: {
  settings: SiteSettings;
  setSettings: (v: SiteSettings | ((p: SiteSettings) => SiteSettings)) => void;
}) {
  const [draft, setDraft] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(settings), [settings]);

  const dirty = JSON.stringify(draft) !== JSON.stringify(settings);

  const save = () => {
    setSettings(draft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const Section = ({
    title,
    subtitle,
    children,
  }: {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
      <div className="mb-1">
        <h3 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">{title}</h3>
        {subtitle && <p className="text-xs text-stone-400 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-3xl space-y-6">
      <Section title="Informations générales" subtitle="Informations visibles sur la page À propos et les métadonnées SEO.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Pasteur principal">
            <input className={inputCls} value={draft.pastor} onChange={(e) => setDraft({ ...draft, pastor: e.target.value })} />
          </Field>
          <Field label="Année de fondation">
            <input className={inputCls} value={draft.foundingYear} onChange={(e) => setDraft({ ...draft, foundingYear: e.target.value })} />
          </Field>
        </div>
        <Field label="Vision de l'église">
          <textarea rows={2} className={inputCls + " resize-none"} value={draft.vision} onChange={(e) => setDraft({ ...draft, vision: e.target.value })} />
        </Field>
      </Section>

      <Section title="Coordonnées" subtitle="Ces informations apparaissent sur la page Contact.">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Téléphone">
            <input className={inputCls} value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+243 8X XXX XXXX" />
          </Field>
          <Field label="Email">
            <input type="email" className={inputCls} value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} />
          </Field>
        </div>
        <Field label="Adresse — Assemblée de Mpasa Mikonga">
          <textarea rows={2} className={inputCls + " resize-none"} value={draft.addressMpasa} onChange={(e) => setDraft({ ...draft, addressMpasa: e.target.value })} />
        </Field>
        <Field label="Adresse — Siège national (Limete)">
          <textarea rows={2} className={inputCls + " resize-none"} value={draft.addressNational} onChange={(e) => setDraft({ ...draft, addressNational: e.target.value })} />
        </Field>
      </Section>

      <Section title="Réseaux sociaux" subtitle="Liens vers les pages officielles de l'église.">
        <Field label={<span className="flex items-center gap-1.5"><Youtube size={12} /> YouTube</span> as unknown as string}>
          <input className={inputCls} value={draft.youtubeUrl} onChange={(e) => setDraft({ ...draft, youtubeUrl: e.target.value })} placeholder="https://youtube.com/@cbampasa" />
        </Field>
        <Field label={<span className="flex items-center gap-1.5"><Facebook size={12} /> Facebook</span> as unknown as string}>
          <input className={inputCls} value={draft.facebookUrl} onChange={(e) => setDraft({ ...draft, facebookUrl: e.target.value })} placeholder="https://facebook.com/cbampasa" />
        </Field>
        <Field label={<span className="flex items-center gap-1.5"><Instagram size={12} /> Instagram</span> as unknown as string}>
          <input className={inputCls} value={draft.instagramUrl} onChange={(e) => setDraft({ ...draft, instagramUrl: e.target.value })} placeholder="https://instagram.com/cbampasa" />
        </Field>
      </Section>

      <div className="flex items-center justify-between">
        {saved && (
          <span className="text-sm text-emerald-600 font-medium inline-flex items-center gap-1.5">
            <CheckCircle2 size={14} /> Modifications enregistrées
          </span>
        )}
        <button
          onClick={save}
          disabled={!dirty}
          className="ml-auto px-6 py-2.5 text-sm rounded-xl bg-amber-700 hover:bg-amber-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold transition flex items-center gap-2"
        >
          <Globe size={14} /> Enregistrer les paramètres
        </button>
      </div>
    </div>
  );
}
