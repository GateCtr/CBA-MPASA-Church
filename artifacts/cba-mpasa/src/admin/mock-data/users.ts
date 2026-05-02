import type { AdminUser } from "../types";

export const SEED_USERS: AdminUser[] = [
  {
    id: "u1",
    username: "admin",
    displayName: "Administrateur Principal",
    role: "super_admin",
    createdAt: "2025-01-01T00:00:00Z",
    lastLogin: "2026-04-29T08:00:00Z",
    active: true,
  },
  {
    id: "u2",
    username: "pasteur",
    displayName: "Pasteur Principal",
    role: "admin",
    createdAt: "2025-03-15T10:00:00Z",
    lastLogin: "2026-04-28T17:30:00Z",
    active: true,
  },
  {
    id: "u3",
    username: "secretaire",
    displayName: "Secrétaire Générale",
    role: "editor",
    createdAt: "2025-06-01T08:00:00Z",
    lastLogin: "2026-04-27T09:15:00Z",
    active: true,
  },
  {
    id: "u4",
    username: "diacre_mwamba",
    displayName: "Diacre Mwamba",
    role: "viewer",
    createdAt: "2025-09-10T11:00:00Z",
    lastLogin: "2026-04-20T14:00:00Z",
    active: true,
  },
  {
    id: "u5",
    username: "ancien_mbala",
    displayName: "Ancien Jean-Pierre Mbala",
    role: "editor",
    createdAt: "2025-11-01T09:00:00Z",
    lastLogin: "2026-04-15T10:45:00Z",
    active: false,
  },
];
