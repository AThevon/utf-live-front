import { getAllArtists } from '@/lib/api/artists'
import { getAllLiveSessions } from '@/lib/api/liveSessions'

export async function GET() {
  const baseUrl = 'https://www.undertheflow.com'

  const artists = await getAllArtists()
  const sessions = await getAllLiveSessions()

  // Pages statiques visibles sur le front
  const staticRoutes = [
    '',
    '/artists',
    '/contact',
    '/about',
    '/live-sessions'
  ]

  // Slugs dynamiques
  const artistRoutes = artists.map((artist) => `/artists/${artist.slug}`)
  const sessionRoutes = sessions.map((session) => `/live-sessions/${session.slug}`)

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
