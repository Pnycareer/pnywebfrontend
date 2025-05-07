// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ searchParams }) {
  const title = searchParams.title || 'Default Title';
  const description = searchParams.description || 'Default Description';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#1a202c',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          padding: '20px',
        }}
      >
        <h1 style={{ fontSize: 64, marginBottom: 20 }}>{title}</h1>
        <p style={{ fontSize: 32, textAlign: 'center', maxWidth: 1000 }}>{description}</p>
      </div>
    ),
    {
      ...size,
    }
  );
}
