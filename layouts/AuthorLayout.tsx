import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, occupation } = content
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <header className="space-y-4 pt-10 pb-10 sm:pt-16">
        <p className="text-primary-600 dark:text-primary-400 font-mono text-sm font-semibold tracking-widest uppercase">
          {occupation}
        </p>
        <h1 className="font-pixel-grid text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Обо мне
        </h1>
        <p className="max-w-3xl text-xl leading-8 text-gray-600 dark:text-gray-300">
          {name} — аналитик данных с исследовательским бэкграундом и опытом создания аналитических
          решений для сложных бизнес-процессов.
        </p>
        <div className="flex space-x-3 pt-2">
          <SocialIcon kind="github" href={siteMetadata.github} />
          <SocialIcon kind="telegram" href={siteMetadata.telegram} />
        </div>
      </header>
      <article className="prose dark:prose-invert max-w-none py-10 sm:py-12">{children}</article>
    </div>
  )
}
