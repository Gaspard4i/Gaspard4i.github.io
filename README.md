# Gaspard Catry — Portfolio

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-4-5A0EF8?logo=daisyui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
[![CI](https://github.com/Gaspard4i/Gaspard4i.github.io/actions/workflows/ci.yml/badge.svg)](https://github.com/Gaspard4i/Gaspard4i.github.io/actions/workflows/ci.yml)
[![Deploy](https://github.com/Gaspard4i/Gaspard4i.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Gaspard4i/Gaspard4i.github.io/actions/workflows/deploy.yml)

Portfolio personnel de Gaspard Catry, développé avec React, TypeScript, Tailwind CSS et DaisyUI.

Live : **https://gaspard4i.github.io**

---

## Stack technique

| Technologie | Usage |
|---|---|
| React 18 + TypeScript | Framework UI + typage |
| Vite 5 | Bundler & dev server |
| Tailwind CSS 3 | Styles utilitaires |
| DaisyUI 4 | Composants & système de thèmes |
| react-i18next + i18next | Internationalisation (FR/EN) |
| Loco (localise.biz) | Gestion des traductions |
| Supabase | Base de données PostgreSQL + API REST |
| React Router 6 | Navigation côté client |
| Vitest | Tests unitaires |

---

## Démarrage local

### Prérequis

- Node.js 20+
- npm 10+
- Un projet Supabase (gratuit sur supabase.com)

### Variables d'environnement

Copier `.env.example` en `.env.local` et remplir les valeurs :

```bash
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=votre-clé-anon
LOCO_API_KEY=votre-clé-loco     # uniquement pour le sync des traductions
```

> La clé `VITE_SUPABASE_ANON_KEY` est publique par design (c'est le RLS qui protège les données).
> La clé `LOCO_API_KEY` ne doit **jamais** être préfixée `VITE_` — elle ne doit pas être exposée dans le navigateur.

### Installation & lancement

```bash
npm install
npm run dev
```

L'app est accessible sur http://localhost:5173

---

## Architecture : Atomic Design

```
src/components/
  atoms/        # Primitives UI sans dépendances (Button, Icon, Badge, Avatar…)
  molecules/    # Compositions d'atoms (ProjectCard, NavItem, ThemeSwitcher…)
  organisms/    # Sections complètes avec logique (Header, ProjectGrid, ContactForm…)
  templates/    # Mises en page (PageLayout, SectionLayout)
src/pages/      # Composants de route (Home, Projects, About, Contact)
src/hooks/      # Hooks React réutilisables (useTheme, useSupabase)
src/lib/        # Initialisations tierces (supabase.ts, i18n.ts)
src/locales/    # Fichiers de traduction JSON (gérés par Loco)
src/types/      # Interfaces TypeScript
```

**Règle d'or :** un atom ne connaît pas les molecules, une molecule ne connaît pas les organisms, etc.

---

## Système de thèmes

3 thèmes disponibles, persistés dans `localStorage` :

| Thème | Style |
|---|---|
| Original 🌿 | Clair, tons verts |
| VS Code 💻 | Sombre, tons bleus |
| Spotify 🎵 | Sombre, tons verts |

Le thème est appliqué via l'attribut `data-theme` sur `<html>`. DaisyUI injecte automatiquement toutes les variables CSS.

---

## Internationalisation (Loco)

Les traductions sont gérées sur [localise.biz](https://localise.biz) et synchronisées automatiquement.

### Workflow

1. Modifier/ajouter des chaînes sur le dashboard Loco
2. La sync s'exécute automatiquement **chaque lundi à 8h UTC**
3. Ou déclencher manuellement : **Actions → Sync Translations → Run workflow**
4. Le workflow commit les fichiers `public/locales/fr.json` et `public/locales/en.json`

### Ajouter une clé de traduction localement

1. Ajouter la clé dans `public/locales/fr.json` et `public/locales/en.json`
2. Pousser sur Loco via le dashboard
3. Utiliser dans les composants : `const { t } = useTranslation(); t('ma.cle')`

---

## CI/CD

### Pipelines GitHub Actions

| Workflow | Déclencheur | Actions |
|---|---|---|
| `ci.yml` | PR sur `main`/`develop`, push sur `develop` | Lint → Type-check → Tests → Build |
| `deploy.yml` | Push sur `main`, déclenchement manuel | Build → Deploy sur GitHub Pages |
| `loco-sync.yml` | Tous les lundis 8h UTC, déclenchement manuel | Fetch Loco → Commit traductions |

### Déploiement

Le déploiement est **automatique** à chaque push sur `main` via GitHub Actions.

**Prérequis GitHub :**
1. Aller dans **Settings → Pages → Source** → sélectionner **GitHub Actions**
2. Ajouter les secrets dans **Settings → Secrets → Actions** :
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `LOCO_API_KEY`

### Déploiement manuel

```bash
git push origin main
```

---

## Supabase — Schéma de base de données

Voir le fichier [`supabase/schema.sql`](supabase/schema.sql) pour le schéma complet avec RLS.

Tables :
- `projects` — projets du portfolio
- `skills` — compétences techniques
- `experiences` — parcours académique/professionnel
- `contact_messages` — messages du formulaire de contact (insert only depuis le client)

---

## Branches

```
main        → production (déploiement automatique)
develop     → intégration
feature/xxx → nouvelles fonctionnalités (PR → develop)
fix/xxx     → corrections de bugs (PR → develop ou main)
```

---

## Scripts disponibles

```bash
npm run dev           # Serveur de développement
npm run build         # Build de production
npm run preview       # Prévisualiser le build
npm run lint          # Vérification ESLint
npm run lint:fix      # Correction automatique ESLint
npm run type-check    # Vérification TypeScript
npm run test          # Tests Vitest
npm run test:watch    # Tests en mode watch
npm run test:coverage # Tests avec rapport de couverture
```
