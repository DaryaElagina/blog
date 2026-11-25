import {
  Mail,
  Github,
  Telegram,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  X,
  Mastodon,
  Threads,
  Instagram,
  Medium,
  Bluesky,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  telegram: Telegram,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  medium: Medium,
  bluesky: Bluesky,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  label?: string
}

const SocialIcon = ({ kind, href, label }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="hover:text-primary-500 dark:hover:text-primary-400 inline-flex items-center gap-2 text-base text-gray-500 transition-colors dark:text-gray-400"
      target={kind === 'mail' ? undefined : '_blank'}
      rel={kind === 'mail' ? undefined : 'noopener noreferrer'}
      href={href}
    >
      {label ? null : <span className="sr-only">{kind}</span>}
      <SocialSvg aria-hidden="true" className="h-4 w-4 shrink-0 fill-current" />
      {label && <span>{label}</span>}
    </a>
  )
}

export default SocialIcon
