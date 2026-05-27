'use client'
import { useEffect, useRef } from 'react'

export default function BuilderPreview({ code }: { code: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>*{box-sizing:border-box}body{margin:0}</style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect, useRef, useCallback, useMemo } = React;
    const render = (el) => ReactDOM.createRoot(document.getElementById('root')).render(el);
    ${code}
  </script>
</body>
</html>`

    if (iframeRef.current) {
      iframeRef.current.srcdoc = html
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
