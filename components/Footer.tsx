import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      <div className="mt-16 flex flex-col items-center">
        <nav aria-label="Контакты" className="mb-3 flex flex-wrap justify-center gap-x-6 gap-y-3">
          <SocialIcon kind="telegram" href={siteMetadata.telegram} label="Telegram" />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} label="Email" />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} label="LinkedIn" />
          <SocialIcon kind="github" href={siteMetadata.github} label="GitHub" />
        </nav>
        <div className="mb-8 flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
      </div>
    </footer>
  )
}
