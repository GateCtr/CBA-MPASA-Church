# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## CBA-MPASA app (artifacts/cba-mpasa)

Site web public + espace administration mock pour l'église Citadelle de la Foi (Mpasa Mikonga, Kinshasa).

- `src/App.tsx` — site public (Accueil, À Propos, Direct YouTube, Structures, Événements, Galerie, Horaires, Sermons, Prière, Contact, Nous Rejoindre, Don) avec timeline « Historique des prédications » et widget « Verset du jour » sur l'accueil. Routage interne via état + deep-linking `?p=<page>` (history.pushState + popstate) consommé par les raccourcis PWA.
- `src/admin.tsx` — re-export vers `src/admin/index.tsx` (architecture refactorisée)
- `src/admin/` — espace administration complet, architecture modulaire :
  - `index.tsx` — point d'entrée (AdminLogin + AdminShell)
  - `types.ts` — tous les types TypeScript
  - `utils.ts` — utilitaires partagés (newId, fmtDate, inputCls, DAY_NAMES)
  - `mock-data/` — fichiers de données mock séparés par entité (events, sermons, photos, messages, members, prayers, donations, schedules, announcements, users, settings) — **à remplacer par une vraie BDD**
  - `hooks/useStored.ts` — hook localStorage générique
  - `hooks/useAdminSession.ts` — auth simulée (TTL 8h, signature, localStorage)
  - `components/` — composants partagés (AdminLogin, AdminShell, Modal, Toolbar, Field, StatusBadge)
  - `pages/` — 13 pages CRUD complètes :
    - Dashboard (recharts BarChart donations + KPI cards + accès rapides)
    - EventsAdmin, SermonsAdmin, GalleryAdmin, LiveAdmin
    - MessagesAdmin (filtres, vue détail, marquer répondu)
    - MembersAdmin, PrayerAdmin (statuts en_attente/prie/repondu)
    - DonationsAdmin (totaux USD/CDF, filtres catégorie)
    - SchedulesAdmin (vue hebdomadaire par jour), AnnouncementsAdmin
    - UsersAdmin, SettingsAdmin
  - Identifiants démo : `admin` / `cba2026`
  - Accès : `/?p=admin`
- **PageDon** : dons via Mobile Money RDC (M-Pesa Vodacom, Airtel Money, Orange Money) avec instructions USSD, copie de numéro, catégories (Dîme, Offrande, Mission MGRN, Œuvres sociales).
- **PagePriere** : verset du jour, formulaire de demande de prière (option anonyme), mur de prières avec compteur d'intercesseurs et bouton « Je prie pour vous » idempotent par navigateur (`localStorage` `cbampasa_prieres` + `cbampasa_intercessions`). Les demandes locales (id `local_*`) sont supprimables.
- **PWA** : `public/manifest.webmanifest` (raccourcis Direct/Sermons/Prière/Don), `public/sw.js` (cache app-shell, navigation network-first), enregistrement uniquement en `import.meta.env.PROD` dans `main.tsx`.

Workflow : `PORT=5000 pnpm --filter @workspace/cba-mpasa run dev`
Déploiement : Vercel, root directory = `artifacts/cba-mpasa` (vercel.json à la racine + dans le dossier).
