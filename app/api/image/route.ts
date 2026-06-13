// app/api/image/route.ts
export async function GET(req: Request) {
  const url = new URL(req.url).searchParams.get('url')
  if (!url) return new Response('Missing url', { status: 400 })
  
  const res = await fetch(url)
  const blob = await res.blob()
  
  return new Response(blob, {
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'image/jpeg',
      'Cross-Origin-Resource-Policy': 'cross-origin',
    }
  })
}
