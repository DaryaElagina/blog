import Link from '@/components/Link'
import projectProfiles from '@/data/projectProfiles'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Проекты',
  description: 'Пять проектов Дарьи Елагиной: бизнес-задачи, аналитические решения и результаты.',
})

export default function Projects() {
  return (
    <div className="py-10 sm:py-16">
      <header className="mb-12 max-w-3xl">
        <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-[0.18em] uppercase">
          Профессиональный опыт
        </p>
        <h1 className="font-pixel-grid text-5xl leading-tight tracking-tight sm:text-6xl">
          Проекты
        </h1>
        <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
          Пять направлений моей работы: какие задачи решает бизнес, как я подхожу к данным и что
          удалось подтвердить результатом. Подробные методы и проверки раскрыты в связанных статьях.
        </p>
      </header>

      <div className="border-t border-gray-200 dark:border-gray-700">
        {projectProfiles.map((project) => (
          <section
            key={project.id}
            id={project.id}
            className="grid scroll-mt-24 gap-5 border-b border-gray-200 py-9 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-12 md:py-12 dark:border-gray-700"
          >
            <div className="min-w-0 text-sm leading-6 text-gray-600 dark:text-gray-400">
              <p className="mb-1 text-gray-500 dark:text-gray-400">Направление</p>
              <p className="text-primary-600 dark:text-primary-400 font-medium">
                {project.direction}
              </p>
              <p className="mt-5 mb-1 text-gray-500 dark:text-gray-400">Стек</p>
              <p>{project.stack.join(' · ')}</p>
            </div>
            <div className="min-w-0">
              <h2 className="font-pixel-grid text-3xl leading-tight tracking-tight sm:text-4xl">
                <Link
                  href={`/projects/${project.id}/`}
                  className="hover:text-primary-600 dark:hover:text-primary-400"
                >
                  {project.title}
                </Link>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg dark:text-gray-300">
                {project.summary}
              </p>
              <Link
                href={`/projects/${project.id}/`}
                className="text-primary-600 dark:text-primary-400 mt-5 inline-block text-sm font-medium hover:underline"
              >
                О проекте
              </Link>
            </div>
          </section>
        ))}
      </div>

      <nav
        aria-label="Другие материалы"
        className="grid gap-5 py-10 text-sm sm:grid-cols-2 sm:gap-12"
      >
        <div id="hackathons" className="scroll-mt-24">
          <p className="mb-2 text-gray-500 dark:text-gray-400">Отдельный раздел</p>
          <Link href="/hackathons/" className="text-primary-600 dark:text-primary-400">
            Хакатоны
          </Link>
        </div>
        <div id="guides" className="scroll-mt-24">
          <p className="mb-2 text-gray-500 dark:text-gray-400">В каталоге статей</p>
          <Link href="/blog/" className="text-primary-600 dark:text-primary-400">
            Практические руководства
          </Link>
        </div>
      </nav>
    </div>
  )
}
