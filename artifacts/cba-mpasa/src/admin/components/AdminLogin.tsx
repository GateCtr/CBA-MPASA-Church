import { useState } from "react";
import { AlertCircle, ArrowLeft, Eye, EyeOff, Lock, Shield } from "lucide-react";

interface AdminLoginProps {
  onLogin: (u: string, p: string) => { ok: boolean; error?: string };
  onBack: () => void;
}

export function AdminLogin({ onLogin, onBack }: AdminLoginProps) {
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
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-amber-200/80 hover:text-white text-sm mb-6 transition"
        >
          <ArrowLeft size={14} /> Retour au site
        </button>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-700 to-amber-800 px-8 py-7 text-white">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                <Shield size={22} />
              </div>
              <div>
                <div className="font-['Playfair_Display'] font-bold text-2xl leading-tight">
                  Espace Administration
                </div>
                <div className="text-amber-100/90 text-xs">
                  CBA-MPASA · Citadelle de la Foi
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={submit} className="p-8 space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Identifiant
              </label>
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
              <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                Mot de passe
              </label>
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
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-700 transition"
                  aria-label="Afficher/masquer"
                >
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
              <Lock size={15} />
              {loading ? "Connexion en cours…" : "Se connecter"}
            </button>

            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-xs text-amber-900">
              <div className="font-semibold mb-1.5 flex items-center gap-1.5">
                <Shield size={12} /> Mode démonstration
              </div>
              <div className="font-mono space-y-0.5">
                <div>
                  Identifiant :{" "}
                  <span className="bg-white px-1.5 py-0.5 rounded border border-amber-200">
                    admin
                  </span>
                </div>
                <div>
                  Mot de passe :{" "}
                  <span className="bg-white px-1.5 py-0.5 rounded border border-amber-200">
                    cba2026
                  </span>
                </div>
              </div>
              <div className="mt-2 text-amber-800/80 normal-case">
                Données stockées localement — authentification simulée.
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
