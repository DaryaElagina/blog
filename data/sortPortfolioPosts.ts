import type { Blog } from 'contentlayer/generated'

// Published articles come first, newest to oldest; undated drafts follow by title.
export function sortPortfolioPosts(posts: Blog[]): Blog[] {
  return [...posts].sort(
    (a, b) =>
      Number(a.inProgress) - Number(b.inProgress) ||
      (a.inProgress ? 0 : (b.date || '').localeCompare(a.date || '')) ||
      a.title.localeCompare(b.title, 'ru')
  )
}
