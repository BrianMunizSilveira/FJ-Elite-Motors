import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'FJ Elite Motors - Veículos Premium'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// Image generation
export default function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#d4af37', fontWeight: '900', marginRight: 20 }}>FJ</span>
            <span style={{ fontWeight: '300' }}>ELITE MOTORS</span>
        </div>
        <div style={{ fontSize: 32, marginTop: 40, color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '0.2em' }}>
            Veículos Premium e Seminovos
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    }
  )
}
