import { getArtist } from '@/lib/api/artists'
import { ImageResponse } from 'next/og'
import { renderOgImage } from '@/lib/og/renderOgImage'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const logo = fetch('https://www.undertheflow.com/utf-logo.png').then(res =>
  res.arrayBuffer()
)

export default async function Image({ params }: { params: { slug: string } }) {
  const artist = await getArtist(params.slug)
  const logoData = await logo

  return new ImageResponse(
    renderOgImage(artist.name, Buffer.from(logoData).toString('base64')),
    size
  )
}
