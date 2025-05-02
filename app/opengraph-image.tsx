import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const logo = fetch('https://www.undertheflow.com/utf-logo.png').then(res =>
  res.arrayBuffer()
)

const background = fetch('https://www.undertheflow.com/og-home.png').then(res =>
  res.arrayBuffer()
)

export default async function Image() {
  const [logoData, bgData] = await Promise.all([logo, background])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          backgroundColor: '#000',
        }}
      >
        {/* Background */}
        <img
          src={`data:image/png;base64,${Buffer.from(bgData).toString('base64')}`}
          alt="Background"
          style={{
            position: 'absolute',
            inset: 0,
            transform: 'translateX(15%)',
            marginLeft: 'auto',
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
        />

        {/* Logo UTF en bas à gauche */}
        <img
          src={`data:image/png;base64,${Buffer.from(logoData).toString('base64')}`}
          alt="UTF Logo"
          style={{
            width: 320,
            height: 320,
            marginLeft: 92,
            marginBottom: 40,
          }}
        />
      </div>
    ),
    size
  )
}
