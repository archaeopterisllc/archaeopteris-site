'use client'
import { LiveProvider, LivePreview, LiveError } from 'react-live'

export default function LivePageRenderer({ code }: { code: string }) {
  return (
    <LiveProvider code={code} noInline={false}>
      <LiveError className="text-red-500 p-4 text-sm" />
      <div className="w-full min-h-screen overflow-y-auto">
        <LivePreview />
      </div>
    </LiveProvider>
  )
}
