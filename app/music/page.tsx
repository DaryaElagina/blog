import Soundcloud from '@/components/embeddings/Soundcloud'
import { genPageMetadata } from 'app/seo'

const tracks = ['1278698554', '1243533106', '1172495164', '1243543321', '1243544074']

export const metadata = genPageMetadata({ title: 'Music' })

export default function Music() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="font-pixel-grid text-3xl leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
          Music
        </h1>
        <p className="font-pixel-square text-lg leading-7 text-gray-500 dark:text-gray-400">
          Writing music is my hobby. In the music world i known as{' '}
          <span className="font-semibold text-red-600">Ramen-Ya</span>. You can listen to my tracks
          on streaming services or on this page.
        </p>
      </div>
      <div className="container py-12">
        <div className="flex flex-wrap gap-8">
          {tracks.map((trackId) => (
            <Soundcloud trackId={trackId} key={trackId} />
          ))}
        </div>
      </div>
    </div>
  )
}
