import { useTranslation } from 'react-i18next'
import SectionLayout from '@/components/templates/SectionLayout'
import ContactForm from '@/components/organisms/ContactForm'

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Gaspard4i',
    icon: 'https://api.iconify.design/mdi/github.svg',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/gaspard-catry',
    icon: 'https://api.iconify.design/mdi/linkedin.svg',
  },
]

export default function Contact() {
  const { t } = useTranslation()

  return (
    <SectionLayout title={t('contact.title')} subtitle={t('contact.subtitle')}>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <ContactForm />
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-base-content mb-3">{t('contact.findMe')}</h3>
            <div className="flex flex-col gap-2">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <img src={link.icon} alt={link.label} width={20} height={20} />
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
