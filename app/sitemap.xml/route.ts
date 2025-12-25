import { getAllArtists } from '@/lib/api/artists'
import { getAllLiveSessions } from '@/lib/api/liveSessions'

export const dynamic = 'force-dynamic'

export async function GET() {
  const baseUrl = 'https://www.undertheflow.com'

  // Pages statiques visibles sur le front
  const staticRoutes = [
    '',
    '/artists',
    '/contact',
    '/about',
    '/live-sessions'
  ]

  // Slugs dynamiques - avec gestion d'erreur pour éviter de bloquer le build
  let artistRoutes: string[] = []
  let sessionRoutes: string[] = []

  try {
    const artists = await getAllArtists()
    artistRoutes = artists.map((artist) => `/artists/${artist.slug}`)
  } catch (error) {
    console.error('Sitemap: Failed to fetch artists', error)
  }

  try {
    const sessions = await getAllLiveSessions()
    sessionRoutes = sessions.map((session) => `/live-sessions/${session.slug}`)
  } catch (error) {
    console.error('Sitemap: Failed to fetch sessions', error)
  }

  const allRoutes = [...staticRoutes, ...artistRoutes, ...sessionRoutes]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allRoutes
      .map(
        (url) => `
      <url>
        <loc>${baseUrl}${url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>`
      )
      .join('')}
  </urlset>`

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
