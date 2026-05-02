import { useEffect, useState } from "react";

const ADMIN_CREDS = { username: "admin", password: "cba2026" };
const SESSION_KEY = "cba_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;
const SESSION_SIGNATURE = "cba-mpasa::admin::v1";

export type AdminSession = { user: string; loggedAt: number; sig: string };

function isValidSession(raw: unknown): raw is AdminSession {
  if (!raw || typeof raw !== "object") return false;
  const s = raw as Record<string, unknown>;
  if (s.user !== ADMIN_CREDS.username) return false;
  if (s.sig !== SESSION_SIGNATURE) return false;
  if (typeof s.loggedAt !== "number" || !Number.isFinite(s.loggedAt))
    return false;
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

export function useAdminSession() {
  const [session, setSession] = useState<AdminSession | null>(() =>
    readSession(),
  );

  useEffect(() => {
    if (!session) return;
    const remaining = SESSION_TTL_MS - (Date.now() - session.loggedAt);
    if (remaining <= 0) {
      setSession(null);
      localStorage.removeItem(SESSION_KEY);
      return;
    }
    const timer = window.setTimeout(() => {
      localStorage.removeItem(SESSION_KEY);
      setSession(null);
    }, remaining);
    return () => window.clearTimeout(timer);
  }, [session]);

  const login = (
    u: string,
    p: string,
  ): { ok: boolean; error?: string } => {
    if (u.trim().toLowerCase() !== ADMIN_CREDS.username)
      return { ok: false, error: "Identifiant inconnu." };
    if (p !== ADMIN_CREDS.password)
      return { ok: false, error: "Mot de passe incorrect." };
    const s: AdminSession = {
      user: ADMIN_CREDS.username,
      loggedAt: Date.now(),
      sig: SESSION_SIGNATURE,
    };
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
