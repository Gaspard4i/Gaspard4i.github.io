import { useTranslation } from 'react-i18next'
import { Linkedin } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import SocialLink from '@/components/atoms/SocialLink'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Gaspard4i',
    icon: <SiGithub size={18} />,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gaspard-catry',
    icon: <Linkedin size={18} />,
  },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-base-300 bg-base-100">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-base-content/50">
          © {year} Gaspard Catry — {t('footer.madeWith')}
        </p>
        <div className="flex items-center gap-1">
          {SOCIAL_LINKS.map((link) => (
            <SocialLink key={link.label} href={link.href} label={link.label} icon={link.icon} />
          ))}
        </div>
      </div>
    </footer>
  )
}
