import { ImageResponse } from 'next/og'
import { getLiveSession } from '@/lib/api/liveSessions'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
  const session = await getLiveSession(params.slug)

  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        background: '#111',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 48,
        padding: 40
      }}>
        {session.title}
      </div>
    ),
    size
  )
}
