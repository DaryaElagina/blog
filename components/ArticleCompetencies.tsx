import Tag from '@/components/Tag'
import { competencyTags } from '@/data/competencyTags'

export default function ArticleCompetencies({
  tags,
  className = '',
}: {
  tags?: string[]
  className?: string
}) {
  const skills = competencyTags(tags ?? [])
  if (skills.length === 0) return null

  return (
    <section aria-label="Компетенции" className={className}>
      <h2 className="mb-3 text-sm font-medium text-gray-600 dark:text-gray-400">Компетенции</h2>
      <div className="flex flex-wrap items-start gap-x-3 gap-y-2 break-words">
        {skills.map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
      </div>
    </section>
  )
}
