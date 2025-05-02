/* eslint-disable */
// lib/og/renderOgImage.tsx

export function renderOgImage(text: string, logoBase64: string) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundColor: '#000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 84,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: '0.05em',
      }}
    >
      {/* Logo UTF centré */}
      <img
        src={`data:image/png;base64,${logoBase64}`}
        alt="UTF Logo"
        style={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          height: 400,
          objectFit: 'contain',
        }}
      />

      {/* Texte principal */}
      <div
        style={{
          marginTop: 400,
          textAlign: 'center',
          textShadow: '0 6px 25px rgba(0,0,0,0.6)',
          textTransform: 'uppercase',
        }}
      >
        {text}
      </div>
    </div>
  )
}
