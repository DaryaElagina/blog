import { allCoreContent } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import BlogCatalog from '@/components/BlogCatalog'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { sortPortfolioPosts } from '@/data/sortPortfolioPosts'
import { competencyTagLabel } from '@/data/competencyTags'

export async function generateMetadata(props: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: competencyTagLabel(tag),
    description: `Материалы по компетенции ${competencyTagLabel(tag)} на сайте ${siteMetadata.title}.`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  return tagKeys.map((tag) => ({
    tag,
  }))
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const posts = allCoreContent(sortPortfolioPosts(allBlogs.filter((post) => !post.draft)))
  return <BlogCatalog key={tag} posts={posts} initialCompetency={tag} />
}
