import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

const author = allAuthors.find((p) => p.slug === 'default') as Authors
const mainContent = coreContent(author)

export const metadata = genPageMetadata({
  title: `About - ${author.name}`,
  description: `About me - ${author.name}`,
  image: author.avatar,
})

export default function Page() {
  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.body.code} />
      </AuthorLayout>
    </>
  )
}
