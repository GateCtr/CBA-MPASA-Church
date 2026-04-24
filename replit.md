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

- `src/App.tsx` — site public (Accueil, À Propos, Direct YouTube, Structures, Événements, Galerie, Horaires, Sermons, Contact, Nous Rejoindre)
- `src/admin.tsx` — espace administration mock complet :
  - Auth simulée signée (`localStorage`, TTL 8 h, validation de schéma)
  - Identifiants démo : `admin` / `cba2026`
  - Sections CRUD : Tableau de bord, Événements, Sermons, Galerie, Direct YouTube, Messages, Membres, Paramètres
  - Toutes les données sont seedées et persistées dans `localStorage` (préfixe `cba_admin_*`)
  - Accès via le lien discret « Espace Administration » dans le pied de page

Workflow : `PORT=5000 pnpm --filter @workspace/cba-mpasa run dev`
Déploiement : Vercel, root directory = `artifacts/cba-mpasa` (vercel.json à la racine + dans le dossier).
