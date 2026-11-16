import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { sortPortfolioPosts } from '@/data/sortPortfolioPosts'

export default async function Page() {
  const sortedPosts = sortPortfolioPosts(allBlogs.filter((post) => !post.draft))
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
