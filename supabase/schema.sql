-- ============================================================
-- Portfolio Gaspard Catry — Supabase Schema
-- Run this in the Supabase SQL editor to initialize the database
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROJECTS
-- ============================================================
create table public.projects (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text not null,
  techs       text[] not null default '{}',
  url         text,
  github_url  text,
  image_url   text,
  featured    boolean not null default false,
  year        integer,
  created_at  timestamptz not null default now()
);

insert into public.projects (title, description, techs, github_url, image_url, year, featured) values
  ('FinnFoundDaChest',                'Jeu Java Swing, projet individuel',                            array['Java','Swing'],                           'https://github.com/Gaspard4i/FFDC',         'FFDC.png',              2023, false),
  ('Projet Agile de Rentrée',         'Rogue-Like Java, travail d''équipe',                           array['Java','Agile'],                           'https://github.com/Gaspard4i/groupe-4',     'Donjon_Hexagone.png',   2024, false),
  ('Projet SAE 3.3',                  'Application JavaFX MVC, travail d''équipe',                    array['Java','JavaFX','MVC'],                    'https://github.com/Gaspard4i/G3_SAE3.3',   'MFC.png',               2024, false),
  ('MineToEarn',                      'Plugin Minecraft + interface web, travail d''équipe',           array['Java','HTML','CSS','JavaScript'],          null,                                        'mte.png',               2024, false),
  ('Projet Nuit de l''Info : CorpsAMer', 'Webapp HTML/CSS/JS, Nuit de l''Info, travail d''équipe',   array['HTML','CSS','JavaScript'],                'https://github.com/YvanSerikoff/CorpsAMer', 'CorpsAMer.png',         2024, true),
  ('Talkul',                          'Webapp Java EE, messagerie en temps réel',                     array['HTML','CSS','Java EE'],                   'https://github.com/Gaspard4i/talkul',      'Talkul_connexion.png',  2025, false),
  ('Woze',                            'Classifieur KNN avec interface JavaFX, travail d''équipe',     array['Java','JavaFX','MVC','KNN'],              'https://github.com/Gaspard4i/E3',          'woze_knn.png',          2025, true),
  ('Ma.io',                           'Webapp JavaScript, travail d''équipe',                         array['HTML','CSS','JavaScript'],                'https://github.com/Gaspard4i/equipe-5',    'Maio.png',              2025, false);

alter table public.projects enable row level security;
create policy "Public projects are viewable by everyone"
  on public.projects for select using (true);

-- ============================================================
-- SKILLS
-- ============================================================
create table public.skills (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null unique,
  category   text not null,
  level      smallint check (level between 1 and 5),
  icon       text,
  featured   boolean not null default false,
  created_at timestamptz not null default now()
);

insert into public.skills (name, category, icon, featured) values
  -- Backend
  ('Java',        'backend',      'https://api.iconify.design/devicon/java.svg',           true),
  ('Spring Boot', 'backend',      'https://api.iconify.design/devicon/spring.svg',         false),
  ('Python',      'backend',      'https://api.iconify.design/devicon/python.svg',         false),
  ('PHP',         'backend',      'https://api.iconify.design/devicon/php.svg',            false),
  ('Node.js',     'backend',      'https://api.iconify.design/devicon/nodejs.svg',         false),
  -- Frontend
  ('HTML',        'frontend',     'https://api.iconify.design/devicon/html5.svg',          true),
  ('CSS',         'frontend',     'https://api.iconify.design/devicon/css3.svg',           true),
  ('JavaScript',  'frontend',     'https://api.iconify.design/devicon/javascript.svg',     true),
  ('TypeScript',  'frontend',     'https://api.iconify.design/devicon/typescript.svg',     false),
  ('React',       'frontend',     'https://api.iconify.design/devicon/react.svg',          true),
  ('Vue.js',      'frontend',     'https://api.iconify.design/devicon/vuejs.svg',          false),
  ('Tailwind CSS','frontend',     'https://api.iconify.design/devicon/tailwindcss.svg',    false),
  -- Database
  ('PostgreSQL',  'database',     'https://api.iconify.design/devicon/postgresql.svg',     true),
  ('MySQL',       'database',     'https://api.iconify.design/devicon/mysql.svg',          false),
  ('MongoDB',     'database',     'https://api.iconify.design/devicon/mongodb.svg',        false),
  -- DevOps / Tools
  ('Git',         'tools',        'https://api.iconify.design/devicon/git.svg',            true),
  ('GitHub',      'tools',        'https://api.iconify.design/devicon/github.svg',         false),
  ('Docker',      'devops',       'https://api.iconify.design/devicon/docker.svg',         false),
  ('Linux',       'system',       'https://api.iconify.design/devicon/linux.svg',          false),
  -- Data Science
  ('Pandas',      'data-science', 'https://api.iconify.design/devicon/pandas.svg',         false),
  ('NumPy',       'data-science', 'https://api.iconify.design/devicon/numpy.svg',          false),
  ('Matplotlib',  'data-science', 'https://api.iconify.design/devicon/matplotlib.svg',     false);

alter table public.skills enable row level security;
create policy "Public skills are viewable by everyone"
  on public.skills for select using (true);

-- ============================================================
-- EXPERIENCES
-- ============================================================
create table public.experiences (
  id          uuid primary key default uuid_generate_v4(),
  company     text not null,
  role        text not null,
  description text,
  start_date  date not null,
  end_date    date,
  current     boolean not null default false,
  created_at  timestamptz not null default now()
);

insert into public.experiences (company, role, description, start_date, end_date, current) values
  ('IUT de Lille',      '2ème année BUT Informatique',  'Approfondissement en programmation, bases de données, réseaux et développement web.', '2024-09-01', null,         true),
  ('Billy-Montigny',    'Animateur centre aéré',         'Encadrement d''enfants à Billy-Montigny et Dourges pendant 2 mois.',                  '2024-07-01', '2024-08-31', false),
  ('IUT de Lille',      '1ère année BUT Informatique',  'Bases en programmation, algorithmique et structures de données.',                     '2023-09-01', '2024-06-30', false),
  ('1000 et 1 Loisirs', 'Animateur séjour',              'Encadrement d''enfants en séjour, organisation d''activités éducatives.',             '2023-07-01', '2023-08-31', false),
  ('Lycée',             'Bac Spécialité Maths et NSI',   'Baccalauréat avec spécialités Mathématiques et Numérique et Sciences Informatiques.', '2020-09-01', '2023-06-30', false);

alter table public.experiences enable row level security;
create policy "Public experiences are viewable by everyone"
  on public.experiences for select using (true);

-- ============================================================
-- CONTACT MESSAGES
-- ============================================================
create table public.contact_messages (
  id         uuid primary key default uuid_generate_v4(),
  name       text not null,
  email      text not null,
  message    text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;
-- Anyone can INSERT, nobody can SELECT from the client (only via service_role / dashboard)
create policy "Anyone can submit contact messages"
  on public.contact_messages for insert with check (true);
