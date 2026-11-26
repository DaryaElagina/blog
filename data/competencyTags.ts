import { slug } from 'github-slugger'
import tagLabels from 'app/tag-labels.json'
import tagPaths from '../config/tag-paths.json'

// Keep the original tags in article metadata so existing /tags/... links keep working.
// The visible navigation focuses on the competencies added to those same tag lists.
const legacyTagSlugs = new Set([
  'bi',
  'datalens',
  'аналитика-данных',
  'sql',
  'маркетинг',
  'аналитика-продаж',
  'data-quality',
  'clickhouse',
  'amocrm',
  'mybi',
  'хакатоны',
  'sla',
  'портфолио',
])

export const isCompetencyTag = (tag: string) => !legacyTagSlugs.has(slug(tag))

export const competencyTags = (tags: string[] = []) => tags.filter(isCompetencyTag)

export const tagPath = (tag: string) => (tagPaths as Record<string, string>)[slug(tag)] || slug(tag)

export const competencyTagLabel = (tag: string) => {
  if (tag === 'командная-работа') return 'Командная работа'
  const legacyLabels: Record<string, string> = {
    sql: 'SQL',
    bi: 'BI',
    datalens: 'DataLens',
    amocrm: 'amoCRM',
    mybi: 'MyBI',
    clickhouse: 'ClickHouse',
    sla: 'SLA',
    'data-quality': 'Data Quality',
  }
  if (legacyLabels[tag]) return legacyLabels[tag]
  const original = (tagLabels as Record<string, string>)[tagPath(tag)]
  if (original) return original
  const words = tag.replaceAll('-', ' ')
  return words.charAt(0).toUpperCase() + words.slice(1).replace(/\bsql\b/gi, 'SQL')
}
