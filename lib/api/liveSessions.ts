import type { LiveSession, LiveSessionList } from '@/types'
import {
  getAllLiveSessions as dbGetAllLiveSessions,
  getLiveSessionBySlug as dbGetLiveSessionBySlug,
  getLatestLiveSessions as dbGetLatestLiveSessions,
} from '@/lib/db/queries'

export async function getAllLiveSessions(): Promise<LiveSessionList[]> {
  try {
    return await dbGetAllLiveSessions()
  } catch (error) {
    console.error('Failed to fetch live sessions:', error)
    throw new Error('Impossible de récupérer les sessions live')
  }
}

export async function getLiveSession(slug: string): Promise<LiveSession> {
  try {
    return await dbGetLiveSessionBySlug(slug)
  } catch (error) {
    console.error(`Failed to fetch live session ${slug}:`, error)
    throw new Error('Impossible de récupérer cette session live')
  }
}

export async function getLatestLiveSession(): Promise<LiveSessionList[]> {
  try {
    return await dbGetLatestLiveSessions()
  } catch (error) {
    console.error('Failed to fetch latest live sessions:', error)
    throw new Error('Impossible de récupérer les dernières sessions')
  }
}
