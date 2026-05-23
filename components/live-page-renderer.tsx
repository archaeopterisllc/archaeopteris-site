'use client'
import { LiveProvider, LivePreview, LiveError } from 'react-live'
import * as ReactLib from 'react'

export default function LivePageRenderer({ code }: { code: string }) {
  return (
    <LiveProvider 
      code={code} 
      noInline={true}
      enableTypeScript={false}
      scope={{ React: ReactLib, useState: ReactLib.useState, useEffect: ReactLib.useEffect, useRef: ReactLib.useRef }}
    >
      <LiveError className="text-red-500 p-4 text-sm" />
      <div className="w-full min-h-screen overflow-y-auto">
        <LivePreview />
      </div>
    </LiveProvider>
  )
}
