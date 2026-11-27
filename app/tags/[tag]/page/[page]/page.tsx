import { allCoreContent } from 'pliny/utils/contentlayer'
import BlogCatalog from '@/components/BlogCatalog'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { notFound } from 'next/navigation'
import { sortPortfolioPosts } from '@/data/sortPortfolioPosts'
import { tagPath } from '@/data/competencyTags'

const POSTS_PER_PAGE = 5

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      tag,
      page: (i + 1).toString(),
    }))
  })
}

export default async function TagPage(props: { params: Promise<{ tag: string; page: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const pageNumber = parseInt(params.page)
  const filteredPosts = allBlogs.filter(
    (post) => !post.draft && post.tags?.some((postTag) => tagPath(postTag) === tag)
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }
  const posts = allCoreContent(sortPortfolioPosts(allBlogs.filter((post) => !post.draft)))
  return <BlogCatalog key={tag} posts={posts} currentPage={pageNumber} initialCompetency={tag} />
}
