'use client'

const stripAnsi = (str: string) => str.replace(/\x1B\[[0-9;]*[mGKHF]/g, '')

import type { FileSystemTree } from '@webcontainer/api'
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react'

interface WebContainerProps {
  files?: FileSystemTree
  startCommand?: string[]
  className?: string
  style?: React.CSSProperties
}

type Status = 'idle' | 'booting' | 'installing' | 'starting' | 'ready' | 'error'

const STATUS_MESSAGES: Record<Status, string> = {
  idle: 'Ready to boot',
  booting: '⚡ Booting WebContainer...',
  installing: '📦 Installing dependencies...',
  starting: '🚀 Starting dev server...',
  ready: '✅ Ready',
  error: '❌ Error',
}

export interface WebContainerHandle {
  restartDev: (code: string) => Promise<void>
  mountFiles: (files: Record<string, string>) => Promise<void>
}

const WebContainerComponent = forwardRef<WebContainerHandle, WebContainerProps>(
  function WebContainer({
    files,
    startCommand = ['npx', 'serve', '.'],
    className = '',
    style,
  }, ref) {

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<unknown>(null)
  const devProcessRef = useRef<any>(null)

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const logsEndRef = useRef<HTMLDivElement>(null)

  const addLog = (msg: string) => setLogs(prev => [...prev, msg])

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  useEffect(() => {
    if (!files) return
    bootContainer(files)
  }, []) // only on mount

  useImperativeHandle(ref, () => ({
    async restartDev(newCode: string) {
      const wc = containerRef.current as any
      if (!wc) return
      
      //await wc.fs.writeFile('/src/main.jsx', content)
      await wc.fs.writeFile('/src/App.jsx', newCode)

      devProcessRef.current?.kill()
      const devProcess = await wc.spawn('npm', ['run', 'dev'])
      devProcessRef.current = devProcess
      devProcess.output.pipeTo(
        new WritableStream({ write(data) { addLog(stripAnsi(data)) } })
      )
      // Reload iframe after vite restarts
      //setTimeout(() => {
        //if (iframeRef.current && url) {
          //iframeRef.current.src = url
        //}
      //}, 5000)
    },
    
  async mountFiles(files: Record<string, any>) {
  const wc = containerRef.current as any
  if (!wc) return

  const firstValue = Object.values(files)[0]

  if (typeof firstValue === 'string') {
    for (const [path, content] of Object.entries(files)) {
      const dir = path.split('/').slice(0, -1).join('/')
      if (dir) {
        try { await wc.fs.mkdir(dir, { recursive: true }) } catch {}
      }
      await wc.fs.writeFile(path, content as string)
      addLog(`Written: ${path}`)
    }
  } else {
  await wc.mount(files)
  addLog('Mounted FileSystemTree ✓')
}

// npm install nếu có package.json mới
const hasPackageJson = typeof firstValue === 'string'
  ? false
  : 'package.json' in files

if (hasPackageJson) {
  addLog('Installing dependencies...')
  const install = await wc.spawn('npm', ['install'])
  install.output.pipeTo(
    new WritableStream({ write(data) { addLog(stripAnsi(data)) } })
  )
  await install.exit
  addLog('Dependencies installed ✓')
}

//devProcessRef.current?.kill()

  //const devProcess = await wc.spawn('npm', ['run', 'dev'])
  //devProcessRef.current = devProcess
  //devProcess.output.pipeTo(
    //new WritableStream({
      //write(data) {
        //addLog(stripAnsi(data))
        //if (data.includes('ready in') && iframeRef.current && url) {
          //iframeRef.current.src = url
        //}
      //}
    //})
  //
  //setTimeout(() => {
    //if (iframeRef.current && url) iframeRef.current.src = url
  //}, 4000)
}


  }))

  async function bootContainer(fileTree: FileSystemTree) {
    try {
      setStatus('booting')
      setError(null)
      setUrl(null)
      setLogs([])

      const { WebContainer } = await import('@webcontainer/api')

      if (!containerRef.current) {
        addLog('Booting WebContainer...')
        containerRef.current = await WebContainer.boot()
      }

      const wc = containerRef.current as Awaited<ReturnType<typeof WebContainer.boot>>

      addLog('Mounting files...')
      await wc.mount(fileTree)

      setStatus('installing')
      addLog('Installing dependencies...')
      const installProcess = await wc.spawn('npm', ['install'])

      installProcess.output.pipeTo(
        new WritableStream({
          write(data) { addLog(stripAnsi(data)) },
        })
      )

      const installExit = await installProcess.exit
      if (installExit !== 0) throw new Error('npm install failed')

      setStatus('starting')
      addLog('Starting dev server...')

      if (devProcessRef.current) {
        devProcessRef.current.kill()
      }

      const devProcess = await wc.spawn('npm', ['run', 'dev'])
      devProcessRef.current = devProcess

      devProcess.output.pipeTo(
  new WritableStream({
    write(data) {
      addLog(stripAnsi(data))
      if (data.includes('ready in') && iframeRef.current && url) {
        iframeRef.current.src = url
      }
    }
  })
)


      let serverReadyFired = false
      wc.on('server-ready', (_port: number, serverUrl: string) => {
        if (serverReadyFired) return
        serverReadyFired = true
        addLog(`Server ready at ${serverUrl}`)
        setUrl(serverUrl)
        setStatus('ready')
        // Set iframe src here — iframe is already mounted in DOM
        if (iframeRef.current) {
          iframeRef.current.src = serverUrl
        }
      })

    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error'
      setError(msg)
      setStatus('error')
      addLog(`Error: ${msg}`)
    }
  }

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* Status bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 14px',
        background: '#0a0f1a',
        borderBottom: '1px solid #1a2535',
        flexShrink: 0,
        fontSize: 11,
        fontFamily: 'monospace',
      }}>
        <span style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background:
            status === 'ready' ? '#10b981' :
            status === 'error' ? '#f87171' :
            status === 'idle' ? '#4a6080' :
            '#fbbf24',
          flexShrink: 0,
          boxShadow: status === 'ready' ? '0 0 6px #10b981' : status === 'error' ? '0 0 6px #f87171' : 'none',
        }} />
        <span style={{ color: '#8aa0b8' }}>{STATUS_MESSAGES[status]}</span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ marginLeft: 'auto', color: '#10b981', fontSize: 10, textDecoration: 'none' }}
          >
            {url} ↗
          </a>
        )}
      </div>

      {/* Preview + Logs */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, overflow: 'hidden' }}>

        {/* iframe container — always in DOM so it can load */}
        <div style={{ flex: 1, position: 'relative', background: '#080c10', minHeight: 0 }}>

          {/* Overlay shown while not ready */}
          {status !== 'ready' && (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#080c10',
              zIndex: 10,
              gap: 16,
            }}>
              {status !== 'idle' && status !== 'error' && (
                <div style={{
                  width: 32,
                  height: 32,
                  border: '2px solid #1a2535',
                  borderTop: '2px solid #10b981',
                  borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite',
                }} />
              )}
              <span style={{ color: '#4a6080', fontSize: 12, fontFamily: 'monospace' }}>
                {status === 'idle' ? 'Preview will appear here' : STATUS_MESSAGES[status]}
              </span>
              {error && (
                <span style={{ color: '#f87171', fontSize: 11, maxWidth: 300, textAlign: 'center' }}>
                  {error}
                </span>
              )}
            </div>
          )}

          {/* iframe — always rendered, opacity controls visibility */}
          <iframe
            ref={iframeRef}
            title="WebContainer Preview"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              display: 'block',
              opacity: status === 'ready' ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>

        {/* Logs panel */}
        <div style={{
         // width: 280,
          height: 120,
          background: '#040810',
          //borderLeft: '1px solid #1a2535',
          borderTop: '1px solid #1a2535',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <div style={{
  padding: '8px 12px',
  fontSize: 10,
  color: '#2a4060',
  letterSpacing: '0.1em',
  borderBottom: '1px solid #1a2535',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}}>
  <span>— LOGS —</span>
  <button
    onClick={() => navigator.clipboard?.writeText(logs.join('\n'))}
    style={{ background: 'transparent', border: '1px solid #1a2535', borderRadius: 4, color: '#4a6080', fontSize: 10, padding: '2px 8px', cursor: 'pointer' }}
  >
    Copy
  </button>
</div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
            {logs.map((log, i) => (
              <div key={i} style={{
                fontSize: 10,
                lineHeight: 1.7,
                color: log.includes('Error') || log.includes('error') ? '#f87171'
                  : log.includes('ready') || log.includes('✅') ? '#10b981'
                  : '#3a5570',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
              }}>
                {log}
              </div>
            ))}
            {error && (
              <div style={{ color: '#f87171', fontSize: 10, marginTop: 8 }}>{error}</div>
            )}
            <div ref={logsEndRef} />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  )
})

export default WebContainerComponent