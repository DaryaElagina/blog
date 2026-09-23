import Link from '@/components/Link'
import portfolioProjects from '@/data/portfolioProjects'

export default function PostStatus({
  project,
  inProgress,
}: {
  project?: string
  inProgress?: boolean
}) {
  const item = portfolioProjects.find((entry) => entry.id === project)
  if (!item && !inProgress) return null
  return (
    <div className="mb-3 flex flex-wrap items-center gap-3 text-sm">
      {item && (
        <Link href={`/projects#${item.id}`} className="text-primary-600 dark:text-primary-400">
          {item.title}
        </Link>
      )}
      {inProgress && (
        <span className="rounded-full bg-amber-100 px-3 py-1 font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200">
          В разработке
        </span>
      )}
    </div>
  )
}
