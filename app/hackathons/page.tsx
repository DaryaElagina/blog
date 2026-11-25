import PortfolioPostCard from '@/components/PortfolioPostCard'
import portfolioProjects from '@/data/portfolioProjects'
import { sortPortfolioPosts } from '@/data/sortPortfolioPosts'
import { allBlogs } from 'contentlayer/generated'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Хакатоны',
  description: 'Заметки об участии Дарьи Елагиной и команды в хакатонах.',
})

const hackathons = portfolioProjects.find((project) => project.id === 'hackathons')

export default function Hackathons() {
  const posts = sortPortfolioPosts(
    allBlogs.filter((post) => !post.draft && post.project === 'hackathons')
  )

  return (
    <div className="py-10 sm:py-16">
      <header className="mb-10 max-w-3xl space-y-4">
        <h1 className="font-pixel-grid text-4xl tracking-tight sm:text-5xl">Хакатоны</h1>
        <p className="text-lg leading-8 text-gray-600 dark:text-gray-400">
          {hackathons?.description}
        </p>
      </header>
      <div className="grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <PortfolioPostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
