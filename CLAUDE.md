# CLAUDE.md — Portfolio Gaspard4i

Guide Claude Code pour ce projet : contexte, conventions, règles de développement et workflow.

## Présentation du projet

Portfolio personnel de **Gaspard Catry** (étudiant BUT Informatique, alternant chez Mandarine Academy). Vitrine des projets, compétences, expériences pro, formulaire de contact, et back-office d'administration des contenus.

Site multilingue (FR/EN/DE/ES/IT/NL/PT) avec traductions Loco + overrides admin via Supabase. Déployé sur **GitHub Pages** via GitHub Actions sur push `main`.

---

## Stack technique

| Couche | Techno |
|---|---|
| Front | **React 18** + **TypeScript** + **Vite** |
| Styling | **Tailwind CSS** + **DaisyUI 4** (3 thèmes : `original`, `vscode`, `spotify`) |
| Routing | **react-router-dom** v7 |
| i18n | **react-i18next** + Loco (sync hebdo) + overrides admin Supabase |
| Backend | **Supabase** (Postgres + Auth + RLS) |
| Tests | **Vitest** + **@testing-library/react** |
| CI/CD | GitHub Actions (`ci.yml`, `deploy.yml`, `loco-sync.yml`) |
| Icônes | **lucide-react** + **@icons-pack/react-simple-icons** |

---

## Structure du projet

```
src/
  components/
    atoms/        # Primitives sans dépendances (Button, Icon, Badge, Avatar, SkeletonBox, SocialLink, ScreenshotPlaceholder)
    molecules/    # Compositions d'atoms (ProjectCard, NavItem, ThemeSwitcher, SkillTag, ExperienceItem, FormField, ModCard, ProseBlock, etc.)
    organisms/    # Sections complètes avec logique métier (Header, Footer, HeroSection, ProjectGrid, SkillsGrid, ExperienceTimeline, ContactForm, ProExperienceSection, ReflexiveSection, SoftSkillsSection)
    templates/    # Mise en page (PageLayout avec Outlet, SectionLayout, AdminLayout, ProtectedRoute)
    wiki/         # Composants spécifiques au wiki (par mod : ghastrider/*, numismatic/*)
  pages/          # Composants de route (Home, Projects, About, Contact, NotFound, ProjectDetail, SkillDetail, Wiki, WikiCategory, WikiModDetail)
    admin/        # Back-office (AdminDashboard, AdminProjects, AdminSkills, AdminExperiences, AdminMessages, AdminTranslations, AdminProfile, AdminSoftSkills, AdminHeroRoles, AdminLogin)
  hooks/          # useTheme, useSupabase, useAuth, useI18nField, usePageView
  lib/            # supabase.ts (client), i18n.ts (init), locales.ts (langues supportées)
  types/          # project.ts, skill.ts, experience.ts, theme.ts
  data/           # Données statiques (wikiMods.ts)
  test/           # setup.ts + tests unitaires *.test.tsx
public/
  locales/        # fr/en/de/es/it/nl/pt.json — gérés par Loco, ne pas modifier à la main en prod
  project-images/ # Images des projets référencées par image_url en BDD
  favicon.ico/.gif
.github/workflows/
  ci.yml          # Lint + type-check + test + build (PR/push develop)
  deploy.yml      # Build + deploy GitHub Pages (push main)
  loco-sync.yml   # Sync traductions Loco (lundi 8h UTC + manuel)
supabase/
  translations_table.sql  # Schéma table d'overrides de traductions
```

---

## Règles de développement (OBLIGATOIRES)

### 1. UX par défaut — toujours

- **Responsive d'abord** : tester d'abord en mobile (≤640px), layout `flex-col → sm:flex-row`, breakpoints Tailwind explicites (`sm:` `md:` `lg:`). Vérifier sur 375px, 768px, 1280px.
- **Pas de pixels durs** dans le styling. Utiliser les classes Tailwind sémantiques (qui sont en `rem`). Les `[Npx]` arbitraires ne sont tolérés que pour : touch targets WCAG (`min-h-[44px]`), micro-tailles UI (`text-[10px]`), valeurs imposées par standard.
- **Skeletons structurés** plutôt que `loading...` ou `…` : matcher la layout cible (cf. `SkeletonBox` + composition dans `ProjectGrid`).
- **Feedback immédiat** sur toute action utilisateur (saved, copied, error). Jamais d'écran blanc silencieux.
- **État vide explicite** : texte qui dit pourquoi et propose une action.

### 2. Tokens de thème — jamais de couleurs en dur

```tsx
// INTERDIT
<div className="text-white bg-blue-500">

// CORRECT
<div className="text-base-content bg-primary rounded-box">
```

Toujours utiliser les tokens DaisyUI : `primary`, `secondary`, `accent`, `info`, `success`, `warning`, `error`, `base-100/200/300`, `base-content`, etc. Pour les radii : `rounded-box`, `rounded-field`, `rounded-selector`, `rounded-btn`.

Doc : https://daisyui.com/components/

### 3. Atomic Design strict

| Niveau | Peut utiliser | Exemple |
|---|---|---|
| atom | Rien d'autre (Tailwind/DaisyUI ok) | `Button`, `Icon`, `Badge` |
| molecule | atoms uniquement | `ProjectCard`, `NavItem` |
| organism | atoms + molecules + hooks + Supabase | `Header`, `ProjectGrid` |
| template | Slot/Outlet uniquement | `PageLayout`, `SectionLayout` |
| page | organisms + templates | `Home`, `About` |

**Ne jamais importer un organism dans un atom ou une molecule.**

### 4. Réutilisation systématique

Avant de créer un composant, hook ou helper, chercher dans le code s'il existe déjà. Si oui : réutiliser. Si la chose est réutilisable : l'extraire au bon niveau atomique.

### 5. Textes traduits — jamais en dur

Tout texte visible doit être une clé i18n (`t('ma.cle')`), jamais en dur dans le JSX. Utiliser `useI18nField()` pour les contenus BDD avec fallback (cf. `ProjectCard`).

### 6. Pas d'emojis dans l'UI

Utiliser exclusivement des icônes (Lucide React, @icons-pack/react-simple-icons). Aucun emoji ne doit apparaître dans le rendu du site, ni dans le code, ni dans les commits.

### 7. TypeScript strict

Pas de `any`. Tous les types BDD dans `src/types/`. Imports avec l'alias `@/` depuis `src/`.

---

## Conventions de nommage

- **Composants** : `PascalCase.tsx` → `Button.tsx`, `ProjectCard.tsx`
- **Hooks** : `camelCase.ts` commençant par `use` → `useTheme.ts`
- **Types** : `camelCase.ts` → `project.ts`
- **Imports** : alias `@/` pour tout import depuis `src/`
- **Export** : `export default function` pour les composants

---

## Ajouter une nouvelle page

1. Créer `src/pages/MyPage.tsx`
2. Ajouter la route dans `src/App.tsx` dans le `<Route element={<PageLayout />}>`
3. Ajouter le lien de navigation dans `src/components/organisms/Header.tsx` (tableau `NAV_LINKS`)
4. Ajouter les clés i18n dans `public/locales/fr.json` + `en.json` (au minimum)
5. Pousser les nouvelles clés sur Loco

---

## Ajouter un nouveau composant

1. Déterminer le bon niveau atomique
2. Créer le fichier dans `src/components/<niveau>/`
3. Export par défaut, types stricts
4. `useTranslation()` pour tout texte visible

---

## Traductions (Loco + react-i18next + overrides Supabase)

**Source de vérité** : `public/locales/<lang>.json`. Surchargés à l'exécution par les overrides admin (table `translations` Supabase) — voir `useI18nField` et l'admin `/admin/translations`.

**Dans les composants :**
```tsx
import { useTranslation } from 'react-i18next'
const { t } = useTranslation()
// ...
<p>{t('ma.cle')}</p>
```

**Pour un contenu BDD avec fallback (BDD → i18n) :**
```tsx
import { useI18nField } from '@/hooks/useI18nField'
const resolve = useI18nField()
const title = resolve(project.title_key, project.title)
```

**Workflow Loco :**
- Modifier `public/locales/*.json` localement pour dev
- Pousser sur Loco pour la sync hebdomadaire
- `loco-sync.yml` écrase les fichiers locaux avec ceux de Loco (sens Loco → repo)

---

## Supabase

Client dans `src/lib/supabase.ts`. Variables d'env `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.

**Pattern fetch :**
```tsx
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'

const { data, loading, error } = useSupabase<Project[]>(() =>
  supabase.from('projects').select('*').order('year', { ascending: false })
)
```

**Tables principales** : `projects`, `skills`, `project_skills` (join), `experiences`, `soft_skills`, `hero_roles`, `contact_messages`, `translations`, `project_clicks`, `page_views`.

**RLS** : `SELECT` public partout (sauf `contact_messages` : `INSERT` public, pas de `SELECT` client). Mutations admin uniquement (Supabase Auth).

**Ajout de données** : passer par l'admin `/admin/*` (formulaires UI). Pour un seed initial → SQL direct sur Supabase Studio.

---

## Système de thèmes

`useTheme` (`src/hooks/useTheme.ts`) :
- Persiste dans `localStorage` clé `portfolio-theme`
- Applique `data-theme` sur `document.documentElement`
- Par défaut : suit `prefers-color-scheme` du système
- Thèmes : `original`, `vscode`, `spotify`

---

## Commits (Conventional Commits)

```
feat: nouvelle fonctionnalité
fix: correction de bug
chore: dépendances, outillage
docs: documentation
refactor: refactoring sans changement de comportement
test: ajout/modification de tests
ci: configuration GitHub Actions
style: formatage
```

Exemples :
- `feat(atoms): add ThemeToggle component`
- `fix(organisms): correct mobile menu z-index`
- `chore: update daisyui to 4.13`

**Auteur unique** :
- Nom : `Gaspard4i`
- Email : `catry.gaspard@gmail.com`

**Aucune mention de Claude / Claude Code** nulle part :
- Pas dans les commits (pas de `Co-Authored-By: Claude`, pas de `Generated with Claude Code`)
- Pas dans les PR/issues, le code, les commentaires, les docs
- Toute action Git faite uniquement au nom de `Gaspard4i`

---

## Branches & déploiement

```
main        → production (protégée, deploy auto sur push)
develop     → branche d'intégration
feature/xxx → nouvelles fonctionnalités → PR vers develop
fix/xxx     → corrections → PR vers develop (ou main si critique)
```

**Ne jamais pusher directement sur `main` sans PR.**

Build : Vite → `dist/`. Deploy : `actions/deploy-pages` (natif GitHub, pas le package npm `gh-pages`).

---

## Workflow de développement

1. **Demande complexe** → plan d'abord (Explore/Plan agents), valider, exécuter.
2. **Avant tout commit** : `npm run lint && npm run typecheck && npm test && npm run build`. Crashes résolus.
3. **Avant tout push** : vérif locale complète OU OK explicite de Gaspard.
4. **Commits petits et fréquents** dès qu'une étape compile et passe les tests.
5. **Jamais** `git add -A` — add des fichiers précis. **Jamais** commiter `.claude/`, `CLAUDE.md` (sauf si demandé), `node_modules/`, `.env.local`.

---

## Secrets GitHub requis

| Secret | Usage |
|---|---|
| `VITE_SUPABASE_URL` | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé anon Supabase (publique) |
| `LOCO_API_KEY` | Clé API Loco — **NE PAS** préfixer `VITE_` (ne doit pas être dans le bundle) |

---

## Points d'attention

- **Wiki Minecraft** : actuellement **commenté** dans la nav et le router (incomplet). Code conservé pour reprise ultérieure (`src/pages/Wiki*.tsx`, `src/components/wiki/`, `src/data/wikiMods.ts`).
- **Ne jamais commiter `.env.local`** (dans `.gitignore`).
- **Ne jamais modifier `public/locales/` en prod à la main** — écrasés par Loco.
- **Images projets** : dans `public/project-images/`, référencées par nom de fichier dans la colonne `image_url` (pas de chemin complet, juste `nom.png`).
- **Tracking** : `project_clicks` et `page_views` sont insérés en best-effort, ne jamais bloquer l'UI dessus.
- **Pas de `--no-verify`** sur les commits. Si un hook échoue, fix la root cause.
