'use client'
import { useEffect, useRef } from 'react'

export default function BuilderPreview({ code }: { code: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
  console.log("BuilderPreview rendering, code length:", code.length)
  const html = `...`
  console.log("Setting srcdoc...")
  if (iframeRef.current) {
    iframeRef.current.srcdoc = html
    console.log("srcdoc set ✓")
  } else {
    console.log("iframeRef is null!")
  }
}, [code])


  return (
    <iframe
      ref={iframeRef}
      sandbox="allow-scripts"
      style={{ width: '100%', height: '100%', border: 'none', background: '#080c10' }}
    />
  )
}
