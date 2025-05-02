import { ImageResponse } from 'next/og'
import { getArtist } from '@/lib/api/artists'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const artist = await getArtist(params.slug)

  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#000',
        color: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 60,
      }}>
        {artist.name}
      </div>
    ),
    size
  )
}
