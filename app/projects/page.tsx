import Link from '@/components/Link'
import PostStatus from '@/components/PostStatus'
import portfolioProjects from '@/data/portfolioProjects'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Проекты',
  description:
    'Проекты и рабочие заметки Дарьи Елагиной: BI, SQL, аналитика данных, руководства и хакатоны.',
})

export default function Projects() {
  return (
    <div className="py-10 sm:py-16">
      <header className="mb-10 max-w-3xl space-y-4">
        <h1 className="font-pixel-grid text-4xl tracking-tight sm:text-5xl">Проекты</h1>
        <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
          Моя работа с данными: от бизнес-задачи и расчётов до отчёта, которым пользуется команда.
          Здесь собраны готовые статьи и заметки к будущим публикациям.
        </p>
      </header>
      <nav aria-label="Разделы проектов" className="mb-12 flex flex-wrap gap-3">
        {portfolioProjects.map((project) => (
          <Link
            key={project.id}
            href={`#${project.id}`}
            className="rounded-full border border-gray-300 px-4 py-2 text-sm hover:border-purple-500 dark:border-gray-700"
          >
            {project.title}
          </Link>
        ))}
      </nav>
      <div className="space-y-12">
        {portfolioProjects.map((project) => {
          const posts = allBlogs
            .filter((post) => !post.draft && post.project === project.id)
            .sort(
              (a, b) =>
                Number(a.inProgress) - Number(b.inProgress) || a.title.localeCompare(b.title, 'ru')
            )
          return (
            <section
              key={project.id}
              id={project.id}
              className="scroll-mt-8 border-t border-gray-200 pt-8 dark:border-gray-700"
            >
              <h2 className="text-2xl font-semibold">{project.title}</h2>
              <p className="mt-3 max-w-3xl leading-7 text-gray-600 dark:text-gray-400">
                {project.description}
              </p>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {posts.map((post) => (
                  <article
                    key={post.slug}
                    className="rounded-xl border border-gray-200 p-6 dark:border-gray-700"
                  >
                    <PostStatus inProgress={post.inProgress} />
                    {!post.inProgress && (
                      <p className="mb-3 text-sm text-emerald-700 dark:text-emerald-400">
                        Опубликовано
                      </p>
                    )}
                    <h3 className="text-xl leading-7 font-semibold">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">
                      {post.summary}
                    </p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary-600 dark:text-primary-400 mt-5 inline-block font-medium"
                    >
                      {post.inProgress ? 'Открыть набросок' : 'Читать статью'} →
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
