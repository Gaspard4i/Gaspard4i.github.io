# Suivi d'alternance — espace privé `/suivi-alternance`

Application de suivi de recherche d'alternance intégrée au portfolio : offres,
prospection DRH, composition d'emails, relances J+7 / J+20, et une vue de
partage en lecture seule.

## Sécurité (important)

- **Aucune donnée privée n'est stockée dans le dépôt.** Tout vit dans Supabase.
- Tables `alternance_offers` et `alternance_prospects` protégées par **RLS** :
  accès réservé aux utilisateurs **authentifiés** (JWT Supabase). La clé anon
  seule ne lit rien.
- Les contacts DRH (données personnelles de tiers) ne doivent **jamais** être
  committés dans ce dépôt public : on les importe dans Supabase via l'app.

## Mise en place

1. **Créer les tables** : exécuter `supabase/alternance_tables.sql` dans
   Supabase Studio → SQL Editor (projet du portfolio).
2. **Compte admin** : utiliser le compte Supabase existant (le même que
   `/admin`). Sinon en créer un dans Supabase → Authentication.
3. **Importer les données** : se connecter sur `/suivi-alternance`, onglet
   *Import / Export*, charger les CSV (offres + prospection DRH).

## Routes

| Route | Accès | Rôle |
|---|---|---|
| `/suivi-alternance/login` | public | Connexion |
| `/suivi-alternance` | authentifié | Tableau de bord |
| `/suivi-alternance/offres` | authentifié | Offres (CRUD, filtres, statut) |
| `/suivi-alternance/prospection` | authentifié | Contacts DRH + relances |
| `/suivi-alternance/emails` | authentifié | Composer (copier / Gmail) |
| `/suivi-alternance/import` | authentifié | Import / Export CSV |
| `/suivi-alternance/avancement` | **public** | Vue lecture seule (le père) |

### Vue de partage (`/avancement`)

Lit la vue SQL `alternance_progress_public` qui n'expose que
`domaine, entreprise, poste, localisation, fait` (booléen). Aucune info de
relance, d'email ou de contact n'y apparaît — juste *Fait / Pas encore*.

> Cette page est **publique** (toute personne avec le lien y accède). Elle ne
> contient aucune donnée personnelle de tiers. Pour la verrouiller derrière le
> login, déplacer la route sous `ProtectedRoute` dans `src/App.tsx`.

## Personnalisation

- Coordonnées et modèles d'emails : `src/lib/alternance.ts` (constante
  `CANDIDAT` et `EMAIL_TEMPLATES`).
- Relances : `relanceDates()` (J+7 / J+20).

## Migration SQL

> Le dossier `supabase/` est gitignoré (schéma privé). Le SQL est donc
> reproduit ici pour être versionné. Copier-coller dans Supabase Studio.

```sql
-- Offres
create table if not exists public.alternance_offers (
  id uuid primary key default gen_random_uuid(),
  domaine text not null default 'Autre / à trier',
  entreprise text not null,
  poste text not null,
  localisation text, source text, ref text, lien text,
  priorite text,
  statut text not null default 'À postuler',
  date_candidature date, date_relance date,
  contact text, notes text, zone_carte text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Prospection DRH
create table if not exists public.alternance_prospects (
  id uuid primary key default gen_random_uuid(),
  prio boolean not null default false,
  civilite text, nom text, prenom text, poste text,
  entreprise text, ville text, secteur text,
  email text, tel text, linkedin text,
  date_envoi date,
  statut text not null default 'À envoyer',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- updated_at auto
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;
drop trigger if exists trg_offers_updated on public.alternance_offers;
create trigger trg_offers_updated before update on public.alternance_offers
  for each row execute function public.set_updated_at();
drop trigger if exists trg_prospects_updated on public.alternance_prospects;
create trigger trg_prospects_updated before update on public.alternance_prospects
  for each row execute function public.set_updated_at();

-- RLS : authentifiés uniquement
alter table public.alternance_offers enable row level security;
alter table public.alternance_prospects enable row level security;
drop policy if exists "offers_authenticated_all" on public.alternance_offers;
drop policy if exists "prospects_authenticated_all" on public.alternance_prospects;
create policy "offers_authenticated_all" on public.alternance_offers
  for all to authenticated using (true) with check (true);
create policy "prospects_authenticated_all" on public.alternance_prospects
  for all to authenticated using (true) with check (true);

-- Vue publique "avancement" (lecture seule, sous-ensemble sûr)
create or replace view public.alternance_progress_public as
  select domaine, entreprise, poste, localisation,
         (statut not in ('À postuler')) as fait
  from public.alternance_offers;
grant select on public.alternance_progress_public to anon, authenticated;
```
