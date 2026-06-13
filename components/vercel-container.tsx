'use client'

import { useRef, useState, useImperativeHandle, forwardRef, useEffect } from 'react'

export interface VercelContainerHandle {
  mountFiles: (files: Record<string, string>) => Promise<void>
}

interface VercelContainerProps {
  className?: string
  style?: React.CSSProperties
}

type Status = 'idle' | 'deploying' | 'building' | 'ready' | 'error'

const STATUS_MESSAGES: Record<Status, string> = {
  idle: 'Ready',
  deploying: '🚀 Deploying to Vercel...',
  building: '🔨 Building...',
  ready: '✅ Ready',
  error: '❌ Error',
}

const VercelContainer = forwardRef<VercelContainerHandle, VercelContainerProps>(
  function VercelContainer({ style, className = '' }, ref) {

  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [url, setUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const logsEndRef = useRef<HTMLDivElement>(null)

  const addLog = (msg: string) => setLogs(prev => [...prev, msg])

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  useImperativeHandle(ref, () => ({
    async mountFiles(files: Record<string, string>) {
      try {
        setStatus('deploying')
        setError(null)
        setUrl(null)
        setLogs([])
        addLog('Deploying to Vercel...')

        // Step 1: Create deployment
        const deployRes = await fetch('/api/vercel/deploy', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ files }),
        })

        if (!deployRes.ok) throw new Error(`Deploy failed: ${deployRes.status}`)
        const { deploymentId, previewUrl: initialUrl } = await deployRes.json()
        addLog(`Deployment created: ${deploymentId}`)

        // Step 2: Poll until ready
        setStatus('building')
        addLog('Building...')

        const previewUrl = await new Promise<string>((resolve, reject) => {
          let attempts = 0
          const poll = async () => {
            if (attempts++ > 40) return reject(new Error('Build timeout'))

            const statusRes = await fetch('/api/vercel/status', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ deploymentId }),
            })
            const data = await statusRes.json()
            addLog(`Status: ${data.status}`)

            if (data.ready) resolve(data.previewUrl)
            else if (data.error) reject(new Error('Build failed'))
            else setTimeout(poll, 3000)
          }
          poll()
        })

        addLog(`Ready at ${previewUrl} ✓`)
        setUrl(previewUrl)
        setStatus('ready')
        if (iframeRef.current) iframeRef.current.src = previewUrl

      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown error'
        setError(msg)
        setStatus('error')
        addLog(`Error: ${msg}`)
      }
    }
  }))

  return (
    <div className={className} style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%', minHeight: 0, overflow: 'hidden',
      ...style,
    }}>
      {/* Status bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '6px 14px', background: '#0a0f1a',
        borderBottom: '1px solid #1a2535', flexShrink: 0,
        fontSize: 11, fontFamily: 'monospace',
      }}>
        <span style={{
          width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
          background: status === 'ready' ? '#10b981' : status === 'error' ? '#f87171' : status === 'idle' ? '#4a6080' : '#fbbf24',
          boxShadow: status === 'ready' ? '0 0 6px #10b981' : status === 'error' ? '0 0 6px #f87171' : 'none',
        }} />
        <span style={{ color: '#8aa0b8' }}>{STATUS_MESSAGES[status]}</span>
        {url && (
          <a href={url} target="_blank" rel="noreferrer"
            style={{ marginLeft: 'auto', color: '#10b981', fontSize: 10, textDecoration: 'none' }}>
            {url} ↗
          </a>
        )}
      </div>

      {/* Preview */}
      <div style={{ flex: 1, position: 'relative', background: '#080c10', minHeight: 0 }}>
        {status !== 'ready' && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: '#080c10', zIndex: 10, gap: 16,
          }}>
            {status !== 'idle' && status !== 'error' && (
              <div style={{
                width: 32, height: 32, border: '2px solid #1a2535',
                borderTop: '2px solid #10b981', borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
            )}
            <span style={{ color: '#4a6080', fontSize: 12, fontFamily: 'monospace' }}>
              {status === 'idle' ? 'Generate a project to deploy' : STATUS_MESSAGES[status]}
            </span>
            {error && <span style={{ color: '#f87171', fontSize: 11, maxWidth: 300, textAlign: 'center' }}>{error}</span>}
          </div>
        )}
        <iframe ref={iframeRef} title="Vercel Preview" style={{
          width: '100%', height: '100%', border: 'none', display: 'block',
          opacity: status === 'ready' ? 1 : 0,
          transition: 'opacity 0.3s ease',
        }} />
      </div>

      {/* Logs */}
      <div style={{
        height: 120, background: '#040810', borderTop: '1px solid #1a2535',
        display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0,
      }}>
        <div style={{
          padding: '8px 12px', fontSize: 10, color: '#2a4060',
          letterSpacing: '0.1em', borderBottom: '1px solid #1a2535',
          flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <span>— LOGS —</span>
          <button onClick={() => navigator.clipboard?.writeText(logs.join('\n'))}
            style={{ background: 'transparent', border: '1px solid #1a2535', borderRadius: 4, color: '#4a6080', fontSize: 10, padding: '2px 8px', cursor: 'pointer' }}>
            Copy
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
          {logs.map((log, i) => (
            <div key={i} style={{
              fontSize: 10, lineHeight: 1.7,
              color: log.includes('Error') || log.includes('error') ? '#f87171'
                : log.includes('✓') || log.includes('Ready') ? '#10b981'
                : '#3a5570',
              whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            }}>{log}</div>
          ))}
          <div ref={logsEndRef} />
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
      `}</style>
    </div>
  )
})

export default VercelContainer
