import { useEffect, useState } from "react";
import { CheckCircle2, Radio, Youtube } from "lucide-react";
import { Field } from "../components/Field";
import type { SiteSettings } from "../types";
import { inputCls } from "../utils";

export function LiveAdmin({
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

  const channelUrl = draft.youtubeChannelId
    ? `https://www.youtube.com/channel/${draft.youtubeChannelId}/live`
    : "";

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
            <Youtube size={20} />
          </div>
          <div>
            <h3 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
              Direct YouTube
            </h3>
            <p className="text-xs text-stone-500">
              Configuration du flux en direct sur la page publique.
            </p>
          </div>
        </div>

        <Field label="Identifiant de la chaîne YouTube">
          <input
            className={inputCls}
            value={draft.youtubeChannelId}
            onChange={(e) =>
              setDraft({ ...draft, youtubeChannelId: e.target.value })
            }
            placeholder="UCxxxxxxxxxxxxxxxxxxxxxx"
          />
          <p className="text-xs text-stone-400 mt-1.5">
            Trouvez l'ID dans les paramètres de votre chaîne YouTube.
          </p>
        </Field>

        <Field label="Titre affiché pendant le direct">
          <input
            className={inputCls}
            value={draft.liveTitle}
            onChange={(e) => setDraft({ ...draft, liveTitle: e.target.value })}
            placeholder="Ex : Culte en direct — CBA-MPASA"
          />
        </Field>

        {channelUrl && (
          <div className="bg-stone-50 border border-stone-200 rounded-xl p-4">
            <div className="text-xs text-stone-500 font-semibold uppercase tracking-wide mb-2">
              Prévisualisation du lien
            </div>
            <a
              href={channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-sky-600 hover:text-sky-700 underline break-all"
            >
              {channelUrl}
            </a>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          {saved && (
            <span className="text-xs text-emerald-600 font-medium inline-flex items-center gap-1.5">
              <CheckCircle2 size={13} /> Enregistré
            </span>
          )}
          <button
            onClick={save}
            disabled={!dirty}
            className="ml-auto px-5 py-2.5 text-sm rounded-xl bg-amber-700 hover:bg-amber-800 disabled:bg-stone-200 disabled:text-stone-400 disabled:cursor-not-allowed text-white font-semibold transition"
          >
            Enregistrer
          </button>
        </div>
      </div>

      <div className="bg-white border border-stone-200 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
            <Radio size={20} />
          </div>
          <div>
            <h3 className="font-['Playfair_Display'] font-bold text-lg text-stone-900">
              Instructions
            </h3>
          </div>
        </div>
        <ol className="space-y-3 text-sm text-stone-600">
          {[
            "Connectez-vous à votre compte YouTube Studio",
            "Allez dans « Créer » → « Diffuser en direct »",
            "Copiez l'identifiant de votre chaîne depuis les Paramètres de la chaîne",
            "Collez l'identifiant ci-dessus et enregistrez",
            "Le bouton « Direct » apparaîtra sur le site public quand le stream sera actif",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-stone-100 text-stone-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
