'use client'

const stripAnsi = (str: string) => str.replace(/\x1B\[[0-9;]*[mGKHF]/g, '')

import { useEffect, useRef, useState } from 'react'
import type { FileSystemTree } from '@webcontainer/api'

//import { useEffect, useRef, useState } from 'react'

// type FileSystemTree = Record<string, { file: { contents: string } } | { directory: Record<string, unknown> }>

interface WebContainerProps {
  files?: FileSystemTree
  startCommand?: string[]
  className?: string
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

export default function WebContainer({
  files,
  startCommand = ['npx', 'serve', '.'],
  className = '',
}: WebContainerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<unknown>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [url, setUrl] = useState<string | null>(null)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (msg: string) => setLogs(prev => [...prev.slice(-50), msg])

  useEffect(() => {
    if (!files) return
    bootContainer(files)
  }, [files])

  async function bootContainer(fileTree: FileSystemTree) {
    try {
      setStatus('booting')
      setError(null)
      setUrl(null)
      setLogs([])

      // Dynamically import to avoid SSR issues
      const { WebContainer } = await import('@webcontainer/api')

      if (!containerRef.current) {
        addLog('Booting WebContainer...')
        containerRef.current = await WebContainer.boot()
      }

      const wc = containerRef.current as Awaited<ReturnType<typeof WebContainer.boot>>

      addLog('Mounting files...')
      await wc.mount(fileTree)

      //setStatus('installing')
      //addLog('Installing dependencies...')
      //const installProcess = await wc.spawn('npm', ['install'])

      //installProcess.output.pipeTo(
        //new WritableStream({
          //write(data) { addLog(stripAnsi(data)) },
       // })
      //)

      //const installExit = await installProcess.exit
      //if (installExit !== 0) throw new Error('npm install failed')

      setStatus('starting')
      addLog('Starting dev server...')
      const devProcess = await wc.spawn(startCommand[0], startCommand.slice(1))

      devProcess.output.pipeTo(
        new WritableStream({
          write(data) { addLog(stripAnsi(data)) },
        })
      )

      wc.on('server-ready', (_port: number, serverUrl: string) => {
        addLog(`Server ready at ${serverUrl}`)
        setUrl(serverUrl)
        setStatus('ready')
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
    <div className={`flex flex-col h-full ${className}`}>
      {/* Status bar */}
      <div className="flex items-center gap-3 px-4 py-2 bg-gray-900 border-b border-gray-700 text-sm">
        <span className={`w-2 h-2 rounded-full ${
          status === 'ready' ? 'bg-green-400' :
          status === 'error' ? 'bg-red-400' :
          status === 'idle' ? 'bg-gray-400' :
          'bg-yellow-400 animate-pulse'
        }`} />
        <span className="text-gray-300">{STATUS_MESSAGES[status]}</span>
        {url && (
          <a href={url} target="_blank" rel="noreferrer"
            className="ml-auto text-green-400 hover:text-green-300 font-mono text-xs">
            {url} ↗
          </a>
        )}
      </div>

      {/* Preview + Logs */}
      <div className="flex flex-1 overflow-hidden">
        {/* iframe preview */}
        <div className="flex-1 bg-white">
          {status === 'ready' ? (
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              title="WebContainer Preview"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-950 text-gray-500 text-sm">
              {status === 'idle' ? 'Preview will appear here' : STATUS_MESSAGES[status]}
            </div>
          )}
        </div>

        {/* Logs panel */}
        <div className="w-80 bg-gray-950 border-l border-gray-800 overflow-y-auto p-3 font-mono text-xs text-gray-400 flex flex-col gap-1">
          <div className="text-gray-600 mb-2">— LOGS —</div>
          {logs.map((log, i) => (
            <div key={i} className="leading-relaxed whitespace-pre-wrap break-all">
              {log}
            </div>
          ))}
          {error && (
            <div className="text-red-400 mt-2">{error}</div>
          )}
        </div>
      </div>
    </div>
  )
}
