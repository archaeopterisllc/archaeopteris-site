'use client'
import { LiveProvider, LivePreview, LiveError } from 'react-live'

export default function LivePageRenderer({ code }: { code: string }) {
  return (
    <LiveProvider code={code} noInline={false}>
      <LiveError className="text-red-500 p-4" />
      <LivePreview />
    </LiveProvider>
  )
}
