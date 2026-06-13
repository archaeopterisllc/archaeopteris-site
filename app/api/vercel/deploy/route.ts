// app/api/vercel/deploy/route.ts
import { NextResponse } from 'next/server'
import { createHash } from 'crypto'

function flattenFiles(tree: any, prefix = ''): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}/${key}` : key
    if ((value as any)?.file?.contents) {
      result[path] = (value as any).file.contents
    } else if ((value as any)?.directory) {
      Object.assign(result, flattenFiles((value as any).directory, path))
    } else if (typeof value === 'string') {
      result[path] = value as string
    } else if (Array.isArray(value)) {
      result[path] = (value as string[]).join('\n')
    }
  }
  return result
}

const BASE_FILES: Record<string, string> = {
  'package.json': JSON.stringify({
    name: 'archaeopteris-app',
    private: true,
    version: '0.0.0',
    type: 'module',
    scripts: { dev: 'vite', build: 'vite build', preview: 'vite preview' },
    dependencies: {
      react: '^18.3.1',
      'react-dom': '^18.3.1',
      clsx: 'latest',
      'tailwind-merge': 'latest',
      'lucide-react': 'latest',
    },
    devDependencies: {
      '@types/react': '^18.3.5',
      '@types/react-dom': '^18.3.0',
      '@vitejs/plugin-react': '^4.3.1',
      autoprefixer: '^10.4.20',
      postcss: '^8.4.47',
      tailwindcss: '^3.4.13',
      vite: '^5.4.8',
    },
  }, null, 2),

  'vite.config.js': `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
})`,

  'index.html': `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Archaeopteris App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,

  'postcss.config.js': `export default {
  plugins: { tailwindcss: {}, autoprefixer: {} }
}`,

  'tailwind.config.js': `export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}`,

  'src/main.jsx': `import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><App /></React.StrictMode>
)`,

  'src/index.css': `@tailwind base;
@tailwind components;
@tailwind utilities;
html, body, #root {
  background: #080c10;
  min-height: 100vh;
  margin: 0;
}`,

'vercel.json': JSON.stringify({
  buildCommand: 'vite build',
  outputDirectory: 'dist',
  installCommand: 'npm install',
  framework: null
}, null, 2),

}

export async function POST(req: Request) {
  try {
    const { files: rawFiles, name } = await req.json()
    const token = process.env.VERCEL_TOKEN
    const teamId = process.env.VERCEL_TEAM_ID

    // Flatten files if needed
    let files: Record<string, string> = {}
    if (rawFiles && typeof Object.values(rawFiles)[0] === 'object') {
      files = flattenFiles(rawFiles)
    } else {
      files = rawFiles || {}
    }

    // Merge base files (user files override base)
    const allFiles = { ...BASE_FILES, ...files }

    // Build Vercel files array (inline format)
    const vercelFiles = Object.entries(allFiles).map(([file, data]) => ({
      file,
      data: typeof data === 'string' ? data : JSON.stringify(data),
      encoding: 'utf-8' as const,
    }))

    const deployRes = await fetch(
      `https://api.vercel.com/v13/deployments?teamId=${teamId}&forceNew=1&skipAutoDetectionConfirmation=1`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `arch-${Date.now()}`,
          files: vercelFiles,
          projectSettings: {
            framework: 'vite',
            buildCommand: 'vite build',
            outputDirectory: 'dist',
            installCommand: 'npm install',
            nodeVersion: '20.x',
          },
          target: 'preview',
        }),
      }
    )

    const deployment = await deployRes.json()

    if (!deployRes.ok) {
      console.error('Deploy error:', JSON.stringify(deployment))
      throw new Error(deployment.error?.message || `Deploy failed: ${deployRes.status}`)
    }

    return NextResponse.json({
      ok: true,
      deploymentId: deployment.id,
      previewUrl: `https://${deployment.url}`,
      status: deployment.readyState,
    })

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('Deploy error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
