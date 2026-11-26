import Link from 'next/link'
import { competencyTagLabel, tagPath } from '@/data/competencyTags'
interface Props {
  text: string
  count?: number
}

const Tag = ({ text, count }: Props) => {
  return (
    <Link
      href={`/tags/${tagPath(text)}`}
      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 inline-flex max-w-full items-baseline gap-1 text-sm leading-6"
    >
      <span className="min-w-0">#{competencyTagLabel(text)}</span>
      {count !== undefined && (
        <span className="shrink-0 text-gray-600 dark:text-gray-300">({count})</span>
      )}
    </Link>
  )
}

export default Tag
