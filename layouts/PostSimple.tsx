import { ReactNode } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Authors, Blog } from 'contentlayer/generated'
import Comments from '@/components/Comments'
import ArticleCompetencies from '@/components/ArticleCompetencies'
import Image from '@/components/Image'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import portfolioProjects from '@/data/portfolioProjects'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  children: ReactNode
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
}

export default function PostSimple({ content, authorDetails, next, prev, children }: LayoutProps) {
  const { slug, date, title, summary, images, project, inProgress, tags } = content
  const cover = typeof images === 'string' ? images : images?.[0]
  const projectDetails = portfolioProjects.find((item) => item.id === project)
  const articleType =
    slug === 'welcome'
      ? 'Авторская заметка'
      : project === 'guides'
        ? 'Практическое руководство'
        : project === 'hackathons'
          ? 'Хакатоны'
          : 'Аналитический кейс'

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article className="py-10 sm:py-16">
        <header className="border-b border-gray-200 pb-9 dark:border-gray-700">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium tracking-[0.14em] uppercase">
              {inProgress ? 'В разработке' : articleType}
            </span>
            {!inProgress && date && (
              <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
            )}
          </div>
          <h1 className="font-pixel-grid mt-5 max-w-4xl text-4xl leading-[1.12] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.65rem] dark:text-gray-100">
            {title}
          </h1>
          {summary && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl sm:leading-9 dark:text-gray-300">
              {summary}
            </p>
          )}
        </header>

        {inProgress && (
          <aside className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
            <p className="font-semibold">Материал в разработке</p>
            <p className="mt-2 leading-7">
              Сейчас здесь рабочие заметки. Описание, примеры и иллюстрации будут дополнены.
            </p>
          </aside>
        )}

        <div className="pt-9 xl:grid xl:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] xl:gap-12">
          <aside className="hidden xl:block">
            <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
              <h2 className="text-xs font-medium tracking-[0.14em] text-gray-500 uppercase dark:text-gray-400">
                Автор
              </h2>
              {authorDetails.map((author) => (
                <div key={author.name}>
                  <p className="mt-3 font-medium text-gray-900 dark:text-gray-100">{author.name}</p>
                  {author.occupation && (
                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                      {author.occupation}
                    </p>
                  )}
                </div>
              ))}
            </div>
            {projectDetails && (
              <div className="border-b border-gray-200 py-6 dark:border-gray-700">
                <h2 className="text-xs font-medium tracking-[0.14em] text-gray-500 uppercase dark:text-gray-400">
                  Проект
                </h2>
                <Link
                  href={`/projects/#${projectDetails.id}`}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mt-3 block text-sm leading-6"
                >
                  {projectDetails.title}
                </Link>
              </div>
            )}
            <ArticleCompetencies tags={tags} className="pt-6" />
          </aside>

          <div className="min-w-0">
            <div className="border-b border-gray-200 pb-7 xl:hidden dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {authorDetails.map((author) => author.name).join(', ')}
                {projectDetails && <> · {projectDetails.title}</>}
              </p>
              <ArticleCompetencies tags={tags} className="pt-4" />
            </div>
            {cover && (
              <figure className="mb-10">
                <Image
                  src={cover}
                  width={1200}
                  height={720}
                  alt={title}
                  className="h-auto w-full object-cover"
                />
              </figure>
            )}
            <div className="prose dark:prose-invert [&_blockquote]:border-primary-500 max-w-[72ch] pt-8 pb-12 text-base leading-8 sm:text-lg [&_blockquote]:border-l-2 [&_blockquote]:pl-5 [&_h2]:scroll-mt-10 [&_h2]:border-t [&_h2]:border-gray-200 [&_h2]:pt-8 dark:[&_h2]:border-gray-700">
              {children}
            </div>
            {siteMetadata.comments?.provider && (
              <div className="border-t border-gray-200 py-6 dark:border-gray-700" id="comment">
                <Comments slug={slug} />
              </div>
            )}
            <footer className="border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:gap-8 sm:text-base">
                {prev?.path && (
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 pt-6"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                )}
                {next?.path && (
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 pt-6"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                )}
              </div>
            </footer>
          </div>
        </div>
      </article>
    </SectionContainer>
  )
}
