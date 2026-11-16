import type { Blog } from 'contentlayer/generated'

// Finished articles come first; each group runs from the earliest date to the latest.
export function sortPortfolioPosts(posts: Blog[]): Blog[] {
  return [...posts].sort(
    (a, b) =>
      Number(a.inProgress) - Number(b.inProgress) ||
      a.date.localeCompare(b.date) ||
      a.title.localeCompare(b.title, 'ru')
  )
}
