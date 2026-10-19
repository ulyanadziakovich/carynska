/**
 * Części projektu z listy „Projekty” w CMS, w kolejności kart na stronie.
 * Pusta część (np. projekt bez etapów) nie dostaje karty.
 */
export type ProjectPart = 'about' | 'info' | 'timeline' | 'schedule'

const filled = (s?: string | null) => !!s?.trim()

export function projectParts(p: Record<string, any>): ProjectPart[] {
  const parts: ProjectPart[] = []
  if (filled(p.contract) || filled(p.body) || p.finance?.length) parts.push('about')
  if (filled(p.infoTitle) || filled(p.infoBody)) parts.push('info')
  if (p.milestones?.length) parts.push('timeline')
  if (p.scheduleItems?.some((i: { title?: string; date?: string }) => filled(i.title) || filled(i.date))) parts.push('schedule')
  return parts
}
