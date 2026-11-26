'use client'

import { useMemo, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { SearchProvider, type SearchConfig } from 'pliny/search'
import { formatDate } from 'pliny/utils/formatDate'
import siteMetadata from '@/data/siteMetadata'

type SearchDocument = {
  path: string
  title: string
  summary?: string
  date?: string
  inProgress?: boolean
}

export default function SiteSearchProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const searchConfig = useMemo(() => {
    const configuredSearch = siteMetadata.search
    if (!configuredSearch || configuredSearch.provider !== 'kbar') {
      return configuredSearch as SearchConfig
    }

    return {
      ...configuredSearch,
      kbarConfig: {
        ...configuredSearch.kbarConfig,
        onSearchDocumentsLoad: (posts: SearchDocument[]) =>
          posts.map((post) => ({
            id: post.path,
            name: post.title,
            keywords: post.summary || '',
            section: 'Статьи',
            subtitle: post.inProgress
              ? 'В разработке'
              : post.date
                ? formatDate(post.date, siteMetadata.locale)
                : undefined,
            perform: () => router.push(`/${post.path}`),
          })),
      },
    } as SearchConfig
  }, [router])

  return <SearchProvider searchConfig={searchConfig}>{children}</SearchProvider>
}
