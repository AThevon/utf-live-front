import type { Artist, ArtistList, RandomArtistImage } from '@/types'
import {
  getAllArtists as dbGetAllArtists,
  getArtistBySlug as dbGetArtistBySlug,
  getRandomArtistImages as dbGetRandomArtistImages,
} from '@/lib/db/queries'

export async function getAllArtists(): Promise<ArtistList[]> {
  try {
    return await dbGetAllArtists()
  } catch (error) {
    console.error('Failed to fetch artists:', error)
    throw new Error('Impossible de récupérer les artistes')
  }
}

export async function getArtist(slug: string): Promise<Artist> {
  try {
    return await dbGetArtistBySlug(slug)
  } catch (error) {
    console.error(`Failed to fetch artist ${slug}:`, error)
    throw new Error('Impossible de récupérer cet artiste')
  }
}

export async function getRandomArtistImages(
  count: number = 12
): Promise<RandomArtistImage[]> {
  try {
    return await dbGetRandomArtistImages(count)
  } catch (error) {
    console.error('Failed to fetch random artist images:', error)
    return []
  }
}
