import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Linkedin } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import Avatar from '@/components/atoms/Avatar'
import SocialLink from '@/components/atoms/SocialLink'
import SkeletonBox from '@/components/atoms/SkeletonBox'
import { useSupabase } from '@/hooks/useSupabase'
import { useI18nField } from '@/hooks/useI18nField'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/profile'
import type { HeroRole } from '@/types/project'

const FALLBACK_ROLES = [
  'diplômé d\'un BUT Informatique',
  'développeur full-stack',
  'développeur web',
]

const SOCIAL = [
  { href: 'https://github.com/Gaspard4i', label: 'GitHub', icon: <SiGithub size={18} /> },
  { href: 'https://www.linkedin.com/in/gaspard-catry-070b70289/', label: 'LinkedIn', icon: <Linkedin size={18} /> },
]

export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const resolve = useI18nField()
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const { data: profile, loading: profileLoading } = useSupabase<Profile>(() =>
    supabase.from('profile').select('*').single()
  )
  const { data: heroRoles, loading: rolesLoading } = useSupabase<HeroRole[]>(() =>
    supabase.from('hero_roles').select('*').order('sort_order')
  )
  // Tant que le profil charge, on n'affiche PAS de texte de repli (i18n) : il peut provenir
  // d'un fr.json encore en cache navigateur et flasher une version périmée. Skeleton à la place.
  // Si la requête a fini sans données (erreur réseau), on retombe sur le fallback i18n.
  const bio = profile
    ? resolve(profile.hero_key, i18n.language.startsWith('fr') ? profile.hero_fr : profile.hero_en)
    : profileLoading
    ? null
    : t('hero.bio')

  const roles = heroRoles && heroRoles.length > 0
    ? heroRoles.map((r) => resolve(r.text_key, r.text_default))
    : FALLBACK_ROLES

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length)
        setVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12 w-full">
        <div className="flex-1 animate-slide-up">
          <p className="text-base-content/60 text-sm font-mono mb-2">{t('hero.greeting')}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-base-content mb-3">
            {t('hero.name')}
          </h1>
          <div className="h-8 mb-6">
            {rolesLoading ? (
              <SkeletonBox className="h-6 w-56" />
            ) : (
              <p
                className={`text-xl text-primary font-medium transition-opacity duration-300 ${
                  visible ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {roles[roleIndex]}
              </p>
            )}
          </div>
          {bio === null ? (
            <div className="max-w-md mb-8 space-y-2">
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-4/5" />
            </div>
          ) : (
            <p className="text-base-content/70 max-w-md mb-8">{bio}</p>
          )}
          <div className="flex items-center gap-4 flex-wrap">
            <Link to="/about" className="btn btn-primary">
              {t('hero.cta')}
            </Link>
            <Link to="/projects" className="btn btn-outline">
              {t('hero.ctaProjects')}
            </Link>
            <div className="flex items-center gap-1 ml-2">
              {SOCIAL.map((s) => (
                <SocialLink key={s.label} href={s.href} label={s.label} icon={s.icon} />
              ))}
            </div>
          </div>
        </div>

        <div className="animate-fade-in">
          <Avatar alt="Gaspard Catry" size="xl" />
        </div>
      </div>
    </section>
  )
}
