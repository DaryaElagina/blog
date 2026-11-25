import Link from '@/components/Link'
import PortfolioPostCard from '@/components/PortfolioPostCard'
import portfolioProjects from '@/data/portfolioProjects'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import { sortPortfolioPosts } from '@/data/sortPortfolioPosts'

export const metadata = genPageMetadata({
  title: 'Проекты',
  description:
    'Проекты и рабочие заметки Дарьи Елагиной: BI, SQL, аналитика данных и практические руководства.',
})

const projectSections = portfolioProjects.filter((project) => project.id !== 'hackathons')

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
        {projectSections.map((project) => (
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
        {projectSections.map((project) => {
          const posts = sortPortfolioPosts(
            allBlogs.filter((post) => !post.draft && post.project === project.id)
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
                  <PortfolioPostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}
