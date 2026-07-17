import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

const avatarBlurDataUrl =
  'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOssXpbDwAFAQIk5PtssAAAAABJRU5ErkJggg=='

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-2">
          <h1 className="font-pixel-grid text-2xl leading-relaxed tracking-tight text-gray-900 sm:text-4xl md:text-4xl dark:text-gray-100">
            Hi, I'm Taras Protchenko, I'm a Frontend developer.
          </h1>
          <h2 className="font-pixel-square text-2xl leading-relaxed tracking-tight text-gray-900 sm:text-2xl md:text-2xl dark:text-gray-100">
            I make the world a better place by making{' '}
            <span className="font-semibold text-pink-500">quality</span> software.
          </h2>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:space-y-0 xl:gap-x-8">
          <div className="flex flex-col items-center pt-8 xl:sticky xl:top-0">
            {avatar && (
              <Image
                src={avatar}
                alt={name}
                width={192}
                height={192}
                placeholder="blur"
                blurDataURL={avatarBlurDataUrl}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-semibold tracking-tight">{name}</h3>
            <div className="flex space-x-3 pt-2">
              <SocialIcon kind="mail" href={`mailto:${email}`} />
              <SocialIcon kind="github" href={github} />
              <SocialIcon kind="linkedin" href={linkedin} />
              <SocialIcon kind="twitter" href={twitter} />
              <SocialIcon kind="bluesky" href={bluesky} />
            </div>
          </div>
          <div className="max-w-none pt-8 pb-8 xl:col-span-2">{children}</div>
        </div>
      </div>
    </>
  )
}
