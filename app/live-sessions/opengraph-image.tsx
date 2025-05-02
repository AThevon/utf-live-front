import { ImageResponse } from 'next/og'
import { renderOgImage } from '@/lib/og/renderOgImage'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Chargement du logo depuis le domaine
const logo = fetch('https://www.undertheflow.com/utf-logo.png').then(res =>
  res.arrayBuffer()
)

export default async function Image() {
  const logoData = await logo

  return new ImageResponse(
    renderOgImage('Live Sessions', Buffer.from(logoData).toString('base64')),
    size
  )
}
