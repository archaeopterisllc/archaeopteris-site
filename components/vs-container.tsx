//## components/vs-container.tsx

'use client'

import { useRef, useState, useImperativeHandle, forwardRef } from 'react'

export interface VsContainerHandle {
  mountFiles: (files: Record<string, any>) => Promise<void>
}

interface VsContainerProps {
  className?: string
  style?: React.CSSProperties
}

type Status = 'idle' | 'creating' | 'installing' | 'starting' | 'ready' | 'error'

const STATUS_MESSAGES: Record<Status, string> = {
  idle: 'Ready',
  creating: '⚡ Creating sandbox...',
  installing: '📦 Installing dependencies...',
  starting: '🚀 Starting dev server...',
  ready: '✅ Ready',
  error: '❌ Error',
}

const post = (path: string, body: object) =>
  fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json())

const VsContainer = forwardRef<VsContainerHandle, VsContainerProps>(
  function VsContainer({ style, className = '' }, ref) {
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const sandboxIdRef = useRef<string | null>(null)

    const [status, setStatus] = useState<Status>('idle')
    const [error, setError] = useState<string | null>(null)
    const [url, setUrl] = useState<string | null>(null)
    const [logs, setLogs] = useState<string[]>([])
    const logsEndRef = useRef<HTMLDivElement>(null)

    const addLog = (msg: string) => setLogs(prev => [...prev, msg])

    useImperativeHandle(ref, () => ({
      async mountFiles(files: Record<string, any>) {
        try {
          setStatus('creating')
          setError(null)
          setUrl(null)
          setLogs([])
          addLog('Creating sandbox...')

          // Step 1: Create or reuse sandbox
          const { sandboxId, isNew, error: createError } = await post('/api/vs/create', {
            sandboxId: sandboxIdRef.current,
          })
          if (createError) throw new Error(createError)
          sandboxIdRef.current = sandboxId
          addLog(isNew ? `Sandbox created ✓` : `Reusing sandbox ✓`)

          // Step 2: Write files
          addLog('Writing files...')
          const { count, error: writeError } = await post('/api/vs/write', { sandboxId, files })
          if (writeError) throw new Error(writeError)
          addLog(`Written ${count} files ✓`)

          // Step 3: Poll until ready (check handles install + start)
          setStatus('installing')
          addLog('Installing dependencies...')

          const previewUrl = await new Promise<string>((resolve, reject) => {
            let attempts = 0
            const check = async () => {
              if (attempts++ > 60) return reject(new Error('Timeout'))
              const data = await post('/api/vs/check', { sandboxId })
              if (data.ready && data.previewUrl) {
                resolve(data.previewUrl)
              } else {
                if (data.stage === 'starting') setStatus('starting')
                setTimeout(check, 5000)
              }
            }
            check()
          })

          addLog(`Server ready at ${previewUrl} ✓`)
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
      <div className={className} style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', minHeight: 0, overflow: 'hidden', ...style }}>
        {/* Status bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 14px', background: '#0a0f1a', borderBottom: '1px solid #1a2535', flexShrink: 0, fontSize: 11, fontFamily: 'monospace' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', flexShrink: 0, background: status === 'ready' ? '#10b981' : status === 'error' ? '#f87171' : status === 'idle' ? '#4a6080' : '#fbbf24', boxShadow: status === 'ready' ? '0 0 6px #10b981' : 'none' }} />
          <span style={{ color: '#8aa0b8' }}>{STATUS_MESSAGES[status]}</span>
          {url && <a href={url} target="_blank" rel="noreferrer" style={{ marginLeft: 'auto', color: '#10b981', fontSize: 10, textDecoration: 'none' }}>{url} ↗</a>}
        </div>

        {/* Preview */}
        <div style={{ flex: 1, position: 'relative', background: '#080c10', minHeight: 0 }}>
          {status !== 'ready' && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#080c10', zIndex: 10, gap: 16 }}>
              {status !== 'idle' && status !== 'error' && (
                <div style={{ width: 32, height: 32, border: '2px solid #1a2535', borderTop: '2px solid #10b981', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              )}
              <span style={{ color: '#4a6080', fontSize: 12, fontFamily: 'monospace' }}>
                {status === 'idle' ? 'Generate a project to preview' : STATUS_MESSAGES[status]}
              </span>
              {error && <span style={{ color: '#f87171', fontSize: 11, maxWidth: 300, textAlign: 'center' }}>{error}</span>}
            </div>
          )}
          <iframe ref={iframeRef} title="VS Preview" sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            style={{ width: '100%', height: '100%', border: 'none', display: 'block', opacity: status === 'ready' ? 1 : 0, transition: 'opacity 0.3s ease' }} />
        </div>

        {/* Logs */}
        <div style={{ height: 120, background: '#040810', borderTop: '1px solid #1a2535', display: 'flex', flexDirection: 'column', overflow: 'hidden', flexShrink: 0 }}>
          <div style={{ padding: '8px 12px', fontSize: 10, color: '#2a4060', letterSpacing: '0.1em', borderBottom: '1px solid #1a2535', flexShrink: 0, display: 'flex', justifyContent: 'space-between' }}>
            <span>— LOGS —</span>
            <button onClick={() => navigator.clipboard?.writeText(logs.join('\n'))} style={{ background: 'transparent', border: '1px solid #1a2535', borderRadius: 4, color: '#4a6080', fontSize: 10, padding: '2px 8px', cursor: 'pointer' }}>Copy</button>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: '8px 12px' }}>
            {logs.map((log, i) => (
              <div key={i} style={{ fontSize: 10, lineHeight: 1.7, color: log.includes('Error') ? '#f87171' : log.includes('✓') || log.includes('ready') ? '#10b981' : '#3a5570', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{log}</div>
            ))}
            <div ref={logsEndRef} />
          </div>
        </div>

        <style>{`@keyframes spin { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }`}</style>
      </div>
    )
  }
)

export default VsContainer
