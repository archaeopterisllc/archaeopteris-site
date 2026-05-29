'use client'

import type { FileSystemTree, WebContainer } from '@webcontainer/api'
import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from 'react'

const stripAnsi = (str: string) =>
  str.replace(/\x1B\[[0-9;]*[mGKHF]/g, '')

interface WebContainerProps {
  files?: FileSystemTree
  className?: string
  style?: React.CSSProperties
}

type Status =
  | 'idle'
  | 'booting'
  | 'installing'
  | 'starting'
  | 'ready'
  | 'error'

const STATUS_MESSAGES: Record<Status, string> = {
  idle: 'Ready to boot',
  booting: '⚡ Booting WebContainer...',
  installing: '📦 Installing dependencies...',
  starting: '🚀 Starting dev server...',
  ready: '✅ Ready',
  error: '❌ Error',
}

export interface WebContainerHandle {
  updateCode: (code: string) => Promise<void>
}

const WebContainerComponent = forwardRef<
  WebContainerHandle,
  WebContainerProps
>(function WebContainer({ files, className = '', style }, ref) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<WebContainer | null>(null)
  const devProcessRef = useRef<any>(null)
  const bootedRef = useRef(false)

  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  const logsEndRef = useRef<HTMLDivElement>(null)

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev.slice(-50), msg])
  }

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  useEffect(() => {
    if (!files || bootedRef.current) return

    bootedRef.current = true
    bootContainer(files)
  }, [files])

  useEffect(() => {
    return () => {
      devProcessRef.current?.kill()
    }
  }, [])

  useImperativeHandle(ref, () => ({
    async updateCode(newCode: string) {
      const wc = containerRef.current
      if (!wc) return

      const content = [
        "import React from 'react'",
        "import ReactDOM from 'react-dom/client'",
        "import './index.css'",
        "const { useState, useEffect, useRef, useCallback } = React",
        "const __root = ReactDOM.createRoot(document.getElementById('root'))",
        "const render = (el) => __root.render(el)",
        '',
        newCode,
      ].join('\n')

      await wc.fs.writeFile('/src/main.jsx', content)
    },
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

        const wc = await WebContainer.boot()

        wc.on('server-ready', (_port: number, serverUrl: string) => {
          addLog(`Server ready at ${serverUrl}`)
          setUrl(serverUrl)
          setStatus('ready')

          if (iframeRef.current) {
            iframeRef.current.src = serverUrl
          }
        })

        containerRef.current = wc
      }

      const wc = containerRef.current

      addLog('Mounting files...')
      await wc.mount(fileTree)

      setStatus('installing')
      addLog('Installing dependencies...')

      const installProcess = await wc.spawn('npm', ['install'])

      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            addLog(stripAnsi(data))
          },
        })
      )

      const installExit = await installProcess.exit

      if (installExit !== 0) {
        throw new Error('npm install failed')
      }

      setStatus('starting')
      addLog('Starting dev server...')

      const devProcess = await wc.spawn('npm', ['run', 'dev'])

      devProcessRef.current = devProcess

      devProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            addLog(stripAnsi(data))
          },
        })
      )
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '6px 14px',
          background: '#0a0f1a',
          borderBottom: '1px solid #1a2535',
          flexShrink: 0,
          fontSize: 11,
          fontFamily: 'monospace',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background:
              status === 'ready'
                ? '#10b981'
                : status === 'error'
                ? '#f87171'
                : status === 'idle'
                ? '#4a6080'
                : '#fbbf24',
            flexShrink: 0,
          }}
        />

        <span style={{ color: '#8aa0b8' }}>
          {STATUS_MESSAGES[status]}
        </span>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{
              marginLeft: 'auto',
              color: '#10b981',
              fontSize: 10,
              textDecoration: 'none',
            }}
          >
            {url} ↗
          </a>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            flex: 1,
            position: 'relative',
            background: '#080c10',
            minHeight: 0,
          }}
        >
          {status !== 'ready' && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#080c10',
                zIndex: 10,
                color: '#4a6080',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
            >
              {STATUS_MESSAGES[status]}
            </div>
          )}

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

        <div
          style={{
            width: 280,
            background: '#040810',
            borderLeft: '1px solid #1a2535',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              padding: '8px 12px',
              fontSize: 10,
              color: '#2a4060',
              letterSpacing: '0.1em',
              borderBottom: '1px solid #1a2535',
            }}
          >
            — LOGS —
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '8px 12px',
            }}
          >
            {logs.map((log, i) => (
              <div
                key={i}
                style={{
                  fontSize: 10,
                  lineHeight: 1.7,
                  color:
                    log.includes('Error') || log.includes('error')
                      ? '#f87171'
                      : log.includes('ready') || log.includes('✅')
                      ? '#10b981'
                      : '#3a5570',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                }}
              >
                {log}
              </div>
            ))}

            {error && (
              <div
                style={{
                  color: '#f87171',
                  fontSize: 10,
                  marginTop: 8,
                }}
              >
                {error}
              </div>
            )}

            <div ref={logsEndRef} />
          </div>
        </div>
      </div>
    </div>
  )
})

export default WebContainerComponent