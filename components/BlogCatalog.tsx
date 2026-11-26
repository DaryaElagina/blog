'use client'

import { useMemo, useState } from 'react'
import { formatDate } from 'pliny/utils/formatDate'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import PostStatus from '@/components/PostStatus'
import Tag from '@/components/Tag'
import { competencyTagLabel, competencyTags, tagPath } from '@/data/competencyTags'
import portfolioProjects from '@/data/portfolioProjects'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 5

export default function BlogCatalog({
  posts,
  currentPage = 1,
}: {
  posts: CoreContent<Blog>[]
  currentPage?: number
}) {
  const [project, setProject] = useState('')
  const [competency, setCompetency] = useState('')
  const [query, setQuery] = useState('')
  const search = query.trim().toLocaleLowerCase('ru')
  const isFiltered = Boolean(project || competency || search)

  const competencyOptions = useMemo(() => {
    const counts = new Map<string, { label: string; count: number }>()
    posts.forEach((post) => {
      competencyTags(post.tags).forEach((tag) => {
        const key = tagPath(tag)
        const current = counts.get(key)
        counts.set(key, { label: competencyTagLabel(tag), count: (current?.count || 0) + 1 })
      })
    })
    return [...counts.entries()].sort(
      ([keyA, a], [keyB, b]) => b.count - a.count || keyA.localeCompare(keyB, 'ru')
    )
  }, [posts])

  const filteredPosts = posts.filter(
    (post) =>
      (!project || post.project === project) &&
      (!competency || competencyTags(post.tags).some((tag) => tagPath(tag) === competency)) &&
      (!search || `${post.title} ${post.summary || ''}`.toLocaleLowerCase('ru').includes(search))
  )
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const displayPosts = isFiltered
    ? filteredPosts
    : posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  return (
    <div className="py-10 sm:py-16">
      <header className="mb-10 max-w-3xl">
        <h1 className="font-pixel-grid text-4xl tracking-tight sm:text-5xl">Статьи</h1>
        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
          Аналитические кейсы и рабочие заметки: задачи, ход исследования и решения, которые
          помогают лучше понимать данные и бизнес-процессы.
        </p>
      </header>

      <div className="grid gap-4 border-y border-gray-200 py-5 sm:grid-cols-3 sm:items-end dark:border-gray-700">
        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Проект
          </span>
          <select
            value={project}
            onChange={(event) => setProject(event.target.value)}
            className="focus:border-primary-500 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="">Все проекты</option>
            {portfolioProjects
              .filter((item) => posts.some((post) => post.project === item.id))
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
          </select>
        </label>
        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Компетенция
          </span>
          <select
            value={competency}
            onChange={(event) => setCompetency(event.target.value)}
            className="focus:border-primary-500 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          >
            <option value="">Все компетенции</option>
            {competencyOptions.map(([key, item]) => (
              <option key={key} value={key}>
                #{item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block min-w-0">
          <span className="mb-1 block text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Поиск по статьям
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Название или тема"
            className="focus:border-primary-500 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
          />
        </label>
      </div>

      <p className="py-5 text-sm text-gray-500 dark:text-gray-400" aria-live="polite">
        {isFiltered
          ? `Найдено материалов: ${filteredPosts.length}`
          : `Всего материалов: ${posts.length}`}
      </p>
      {displayPosts.length === 0 ? (
        <p className="border-t border-gray-200 py-10 text-gray-600 dark:border-gray-700 dark:text-gray-400">
          По выбранным фильтрам материалов пока нет.
        </p>
      ) : (
        <ol>
          {displayPosts.map((post) => (
            <li key={post.path} className="border-t border-gray-200 py-8 dark:border-gray-700">
              <article>
                {!post.inProgress && post.date && (
                  <time
                    dateTime={post.date}
                    suppressHydrationWarning
                    className="mb-2 block text-sm text-gray-500 dark:text-gray-400"
                  >
                    {formatDate(post.date, siteMetadata.locale)}
                  </time>
                )}
                <PostStatus project={post.project} inProgress={post.inProgress} />
                <h2 className="max-w-4xl text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
                  <Link href={`/${post.path}`} className="text-gray-900 dark:text-gray-100">
                    {post.title}
                  </Link>
                </h2>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                  {competencyTags(post.tags).map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
                {post.summary && (
                  <p className="mt-4 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-400">
                    {post.summary}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ol>
      )}

      {!isFiltered && totalPages > 1 && (
        <nav
          aria-label="Страницы каталога"
          className="flex items-center justify-between border-t border-gray-200 py-6 text-sm dark:border-gray-700"
        >
          {currentPage > 1 ? (
            <Link href={currentPage === 2 ? '/blog/' : `/blog/page/${currentPage - 1}/`}>
              Назад
            </Link>
          ) : (
            <span />
          )}
          <span className="text-gray-500 dark:text-gray-400">
            {currentPage} из {totalPages}
          </span>
          {currentPage < totalPages ? (
            <Link href={`/blog/page/${currentPage + 1}/`}>Далее</Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  )
}
