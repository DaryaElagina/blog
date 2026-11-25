import Link from '@/components/Link'
import PostStatus from '@/components/PostStatus'
import type { Blog } from 'contentlayer/generated'

export default function PortfolioPostCard({ post }: { post: Blog }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-gray-200 p-6 dark:border-gray-700">
      <PostStatus inProgress={post.inProgress} />
      {!post.inProgress && (
        <p className="mb-3 text-sm text-emerald-700 dark:text-emerald-400">Опубликовано</p>
      )}
      <h3 className="text-xl leading-7 font-semibold">
        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
      </h3>
      <p className="mt-3 leading-7 text-gray-600 dark:text-gray-400">{post.summary}</p>
      <Link
        href={`/blog/${post.slug}`}
        className="text-primary-600 dark:text-primary-400 mt-auto self-start pt-5 font-medium"
      >
        {post.inProgress ? 'Смотреть анонс' : 'Читать статью'} →
      </Link>
    </article>
  )
}
