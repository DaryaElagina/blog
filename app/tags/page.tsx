import Tag from '@/components/Tag'
import { isCompetencyTag } from '@/data/competencyTags'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Компетенции',
  description:
    'Профессиональные навыки и методы работы Дарьи Елагиной, раскрытые в статьях и практических кейсах.',
})

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts)
    .filter(isCompetencyTag)
    .sort((a, b) => tagCounts[b] - tagCounts[a] || a.localeCompare(b, 'ru'))
  return (
    <div className="flex flex-col pt-12 pb-16 xl:mt-16 xl:flex-row xl:items-start xl:justify-center xl:gap-6 xl:pt-6">
      <div className="pb-8 xl:w-80 xl:shrink-0 xl:border-r-2 xl:border-gray-200 xl:py-2 xl:pr-6 dark:xl:border-gray-700">
        <h1 className="font-pixel-grid text-4xl tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Компетенции
        </h1>
        <p className="mt-4 max-w-lg text-sm leading-6 text-gray-600 dark:text-gray-400">
          Профессиональные навыки и методы работы, раскрытые в моих статьях и практических кейсах.
        </p>
      </div>
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-5 gap-y-2 xl:max-w-2xl">
        {sortedTags.length === 0 && 'Компетенций пока нет.'}
        {sortedTags.map((tag) => (
          <Tag key={tag} text={tag} count={tagCounts[tag]} />
        ))}
      </div>
    </div>
  )
}
