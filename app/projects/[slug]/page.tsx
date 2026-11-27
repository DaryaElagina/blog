import ProjectProfilePage from '@/components/ProjectProfilePage'
import projectProfiles from '@/data/projectProfiles'
import { genPageMetadata } from 'app/seo'
import { notFound } from 'next/navigation'

export const generateStaticParams = () => projectProfiles.map(({ id }) => ({ slug: id }))

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = projectProfiles.find((project) => project.id === slug)
  if (!profile) return genPageMetadata({ title: 'Проект не найден' })
  return genPageMetadata({ title: profile.title, description: profile.summary })
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const profile = projectProfiles.find((project) => project.id === slug)
  if (!profile) notFound()
  return <ProjectProfilePage profile={profile} />
}
