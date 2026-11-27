import type { ReactNode } from 'react'
import { allBlogs } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostStatus from '@/components/PostStatus'
import type { ProjectProfile } from '@/data/projectProfiles'

function ProjectSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-t border-gray-200 py-9 dark:border-gray-700">
      <h2 className="font-pixel-grid mb-5 text-2xl leading-tight tracking-tight sm:text-3xl">
        {title}
      </h2>
      {children}
    </section>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="space-y-5 text-base leading-8 text-gray-700 sm:text-lg dark:text-gray-300">
      {items.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </div>
  )
}

function Points({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4 text-base leading-8 text-gray-700 sm:text-lg dark:text-gray-300">
      {items.map((item) => (
        <li key={item} className="border-l-2 border-gray-200 pl-5 dark:border-gray-700">
          {item}
        </li>
      ))}
    </ul>
  )
}

export default function ProjectProfilePage({ profile }: { profile: ProjectProfile }) {
  const articles = profile.articleSlugs.flatMap((slug) => {
    const article = allBlogs.find((post) => post.slug === slug && !post.draft)
    return article ? [article] : []
  })

  return (
    <div className="py-10 sm:py-16">
      <nav aria-label="Путь по сайту" className="mb-9 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/projects/" className="hover:text-primary-600 dark:hover:text-primary-400">
          Проекты
        </Link>
        <span aria-hidden="true" className="mx-2">
          /
        </span>
        <span aria-current="page">{profile.title}</span>
      </nav>

      <header className="mb-10 max-w-4xl">
        <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-[0.16em] uppercase">
          {profile.direction}
        </p>
        <h1 className="font-pixel-grid text-4xl leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.65rem]">
          {profile.title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600 sm:text-xl dark:text-gray-300">
          {profile.summary}
        </p>
      </header>

      <div className="grid gap-10 border-t border-gray-200 pt-9 xl:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] xl:gap-12 dark:border-gray-700">
        <aside className="text-sm leading-7 text-gray-600 dark:text-gray-400">
          <div className="border-b border-gray-200 pb-6 dark:border-gray-700">
            <h2 className="mb-2 font-medium tracking-wide text-gray-900 uppercase dark:text-gray-100">
              Моя роль
            </h2>
            <p>Аналитик данных / BI-аналитик</p>
          </div>
          <div className="border-b border-gray-200 py-6 dark:border-gray-700">
            <h2 className="mb-2 font-medium tracking-wide text-gray-900 uppercase dark:text-gray-100">
              Инструменты
            </h2>
            <ul>
              {profile.stack.map((tool) => (
                <li key={tool}>{tool}</li>
              ))}
            </ul>
          </div>
          <Link
            href="/projects/"
            className="text-primary-600 dark:text-primary-400 mt-6 inline-block hover:underline"
          >
            Все проекты
          </Link>
        </aside>

        <div className="max-w-[72ch] min-w-0">
          <ProjectSection title="Бизнес-контекст">
            <Paragraphs items={profile.context} />
          </ProjectSection>
          <ProjectSection title="Моя роль и зона ответственности">
            <Paragraphs items={profile.role} />
          </ProjectSection>
          <ProjectSection title="Источники и аналитический слой">
            <Paragraphs items={profile.architecture} />
          </ProjectSection>
          <ProjectSection title="Основные аналитические задачи">
            <Points items={profile.tasks} />
          </ProjectSection>
          <ProjectSection title="Реализованные решения">
            <Paragraphs items={profile.solutions} />
          </ProjectSection>
          <ProjectSection title="Подтверждённые результаты">
            <Points items={profile.results} />
          </ProjectSection>

          <ProjectSection title="Статьи и кейсы">
            <p className="mb-6 text-base leading-7 text-gray-600 dark:text-gray-400">
              Подробный разбор отдельных задач проекта. Незавершённые материалы отмечены как
              находящиеся в разработке.
            </p>
            <ul className="border-t border-gray-200 dark:border-gray-700">
              {articles.map((article) => (
                <li
                  key={article.slug}
                  className="border-b border-gray-200 py-6 dark:border-gray-700"
                >
                  {article.inProgress ? (
                    <PostStatus inProgress />
                  ) : (
                    <span className="mb-3 block text-sm text-emerald-700 dark:text-emerald-400">
                      Опубликовано
                    </span>
                  )}
                  <h3 className="text-xl leading-snug font-semibold sm:text-2xl">
                    <Link
                      href={`/${article.path}`}
                      className="hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  {article.summary && (
                    <p className="mt-3 text-base leading-7 text-gray-600 dark:text-gray-400">
                      {article.summary}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </ProjectSection>
        </div>
      </div>
    </div>
  )
}
