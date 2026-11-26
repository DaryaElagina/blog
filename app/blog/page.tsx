import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'
import BlogCatalog from '@/components/BlogCatalog'
import { sortPortfolioPosts } from '@/data/sortPortfolioPosts'

export const metadata = genPageMetadata({ title: 'Статьи' })

export default async function BlogPage() {
  const posts = allCoreContent(sortPortfolioPosts(allBlogs.filter((post) => !post.draft)))
  return <BlogCatalog posts={posts} />
}
