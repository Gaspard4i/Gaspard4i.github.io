# CLAUDE.md — Guide développeur

Ce fichier est destiné à Claude Code pour comprendre le projet, ses conventions et comment collaborer efficacement dessus.

## Stack & contexte

Portfolio de Gaspard Catry. React 18 + TypeScript + Vite + Tailwind CSS + DaisyUI 4 + react-i18next (Loco) + Supabase. Déployé sur GitHub Pages via GitHub Actions.

---

## Structure du projet

```
src/
  components/
    atoms/        # Primitives UI sans dépendances (Button, Icon, Badge, Avatar, SkeletonBox, SocialLink)
    molecules/    # Compositions d'atoms (ProjectCard, NavItem, ThemeSwitcher, SkillTag, ExperienceItem, FormField)
    organisms/    # Sections complètes avec logique métier (Header, Footer, HeroSection, ProjectGrid, SkillsGrid, ExperienceTimeline, ContactForm)
    templates/    # Mise en page (PageLayout avec Outlet, SectionLayout)
  pages/          # Composants de route (Home, Projects, About, Contact, NotFound)
  hooks/          # useTheme.ts, useSupabase.ts
  lib/            # supabase.ts (client Supabase), i18n.ts (init i18next)
  types/          # project.ts, skill.ts, experience.ts, theme.ts
  test/           # setup.ts + tests unitaires *.test.tsx
public/
  locales/        # fr.json, en.json — gérés par Loco, ne pas modifier à la main
  favicon.ico
.github/workflows/
  ci.yml          # Lint + type-check + test + build (PR/push develop)
  deploy.yml      # Build + deploy GitHub Pages (push main)
  loco-sync.yml   # Sync traductions Loco (lundi 8h UTC + manuel)
supabase/
  schema.sql      # Schéma PostgreSQL avec RLS
```

---

## Conventions de nommage

- **Composants** : `PascalCase.tsx` → `Button.tsx`, `ProjectCard.tsx`
- **Hooks** : `camelCase.ts` commençant par `use` → `useTheme.ts`
- **Types** : `camelCase.ts` → `project.ts`
- **Styles** : uniquement des classes utilitaires Tailwind + DaisyUI, pas de fichiers CSS custom sauf `index.css` pour les directives Tailwind
- **Imports** : utiliser l'alias `@/` pour tout import depuis `src/`

---

## Règles Atomic Design

| Niveau | Peut utiliser | Exemple |
|---|---|---|
| atom | Rien d'autre | `Button`, `Icon`, `Badge` |
| molecule | atoms uniquement | `ProjectCard`, `NavItem` |
| organism | atoms + molecules + hooks | `Header`, `ProjectGrid` |
| template | Slot/Outlet uniquement | `PageLayout`, `SectionLayout` |
| page | organisms + templates | `Home`, `About` |

**Ne jamais importer un organism dans un atom ou une molecule.**

---

## Ajouter un nouveau composant

1. Déterminer le bon niveau atomique
2. Créer le fichier dans le bon dossier `src/components/<niveau>/`
3. Exporter par défaut (`export default function MyComponent`)
4. Utiliser les types TypeScript stricts (pas de `any`)
5. Utiliser `useTranslation()` pour tout texte visible par l'utilisateur

---

## Ajouter une nouvelle page

1. Créer `src/pages/MyPage.tsx`
2. Ajouter la route dans `src/App.tsx` dans le `<Route element={<PageLayout />}>`
3. Ajouter le lien de navigation dans `src/components/organisms/Header.tsx` (tableau `NAV_LINKS`)
4. Ajouter les clés de traduction dans `public/locales/fr.json` et `public/locales/en.json`
5. Pousser les nouvelles clés sur Loco

---

## Traductions (Loco + react-i18next)

Les fichiers `public/locales/fr.json` et `public/locales/en.json` sont la source de vérité.

**Dans les composants :**
```tsx
import { useTranslation } from 'react-i18next'

const { t } = useTranslation()
// ...
<p>{t('ma.cle')}</p>
```

**Changer de langue :**
```tsx
const { i18n } = useTranslation()
i18n.changeLanguage('en')
```

**Workflow Loco :**
- Modifier dans `public/locales/*.json` localement pour dev
- Pousser sur Loco pour la sync automatique hebdomadaire
- Le workflow `loco-sync.yml` écrase les fichiers locaux avec ceux de Loco (sens Loco → repo)

---

## Supabase

Le client est dans `src/lib/supabase.ts`. Il utilise les variables d'env `VITE_SUPABASE_URL` et `VITE_SUPABASE_ANON_KEY`.

**Pattern pour fetch de données :**
```tsx
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'

const { data, loading, error } = useSupabase<Project[]>(() =>
  supabase.from('projects').select('*').order('year', { ascending: false })
)
```

**RLS :** toutes les tables ont `SELECT` public. `contact_messages` a `INSERT` public mais pas de `SELECT` côté client.

---

## Système de thèmes

Le hook `useTheme` dans `src/hooks/useTheme.ts` gère tout.
- Persiste dans `localStorage` sous la clé `portfolio-theme`
- Applique `data-theme` sur `document.documentElement`
- DaisyUI injecte les variables CSS automatiquement

**Thèmes disponibles :** `original`, `vscode`, `spotify`

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
style: formatage, pas de changement de logique
```

Exemples :
- `feat(atoms): add ThemeToggle component`
- `fix(organisms): correct mobile menu z-index`
- `chore: update daisyui to 4.13`
- `ci: add loco-sync workflow`

---

## Branches

```
main        → production (protégée, deploy automatique sur push)
develop     → branche d'intégration
feature/xxx → nouvelles fonctionnalités → PR vers develop
fix/xxx     → corrections → PR vers develop (ou main si critique)
```

**Ne jamais pusher directement sur `main` sans passer par une PR.**

---

## Secrets GitHub requis

À configurer dans **Settings → Secrets → Actions** :

| Secret | Usage |
|---|---|
| `VITE_SUPABASE_URL` | URL du projet Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clé anon Supabase (publique) |
| `LOCO_API_KEY` | Clé API Loco pour la sync des traductions |

---

## Points d'attention

- **Ne jamais commiter `.env.local`** — il est dans `.gitignore`
- **Ne jamais modifier `public/locales/` à la main en prod** — ils sont écrasés par Loco
- **La clé `LOCO_API_KEY` ne doit pas être préfixée `VITE_`** — elle ne doit pas apparaître dans le bundle
- Les images de projets sont dans `public/project-images/` et référencées par leur nom de fichier dans Supabase
- Le déploiement utilise `actions/deploy-pages` (natif GitHub), pas le package npm `gh-pages`
