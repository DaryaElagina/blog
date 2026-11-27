import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import projectProfiles from '@/data/projectProfiles'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      ...(post.lastmod || post.date ? { lastModified: post.lastmod || post.date } : {}),
    }))

  const routes = ['', 'blog', 'projects', 'hackathons', 'cases', 'tags', 'about'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  const projectRoutes = projectProfiles.map((project) => ({
    url: `${siteUrl}/projects/${project.id}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...projectRoutes, ...blogRoutes]
}
