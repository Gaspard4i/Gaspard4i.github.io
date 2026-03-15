import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Linkedin } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import Avatar from '@/components/atoms/Avatar'
import SocialLink from '@/components/atoms/SocialLink'
import { useSupabase } from '@/hooks/useSupabase'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/profile'

const ROLES = [
  'étudiant en BUT informatique',
  'développeur full-stack',
  'développeur web',
]

const SOCIAL = [
  { href: 'https://github.com/Gaspard4i', label: 'GitHub', icon: <SiGithub size={18} /> },
  { href: 'https://www.linkedin.com/in/gaspard-catry-070b70289/', label: 'LinkedIn', icon: <Linkedin size={18} /> },
]

export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const [roleIndex, setRoleIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const { data: profile } = useSupabase<Profile>(() =>
    supabase.from('profile').select('*').single()
  )
  const bio = profile
    ? (i18n.language.startsWith('fr') ? profile.hero_fr : profile.hero_en)
    : t('hero.bio')

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length)
        setVisible(true)
      }, 300)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-5xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-12 w-full">
        <div className="flex-1 animate-slide-up">
          <p className="text-base-content/60 text-sm font-mono mb-2">{t('hero.greeting')}</p>
          <h1 className="text-5xl md:text-6xl font-bold text-base-content mb-3">
            {t('hero.name')}
          </h1>
          <div className="h-8 mb-6">
            <p
              className={`text-xl text-primary font-medium transition-opacity duration-300 ${
                visible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              {ROLES[roleIndex]}
            </p>
          </div>
          <p className="text-base-content/70 max-w-md mb-8">{bio}</p>
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
