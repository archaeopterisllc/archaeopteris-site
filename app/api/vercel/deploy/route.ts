// app/api/vercel/deploy/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { files, name } = await req.json()

    const token = process.env.VERCEL_TOKEN
    const teamId = process.env.VERCEL_TEAM_ID

    // Build Vercel files format
    const vercelFiles = Object.entries(files as Record<string, string>).map(([file, data]) => ({
      file,
      data,
      encoding: 'utf-8',
    }))

    // Add package.json if not present
    if (!files['package.json']) {
      vercelFiles.push({
        file: 'package.json',
        data: JSON.stringify({
          name: name || 'archaeopteris-app',
          scripts: { build: 'vite build', dev: 'vite' },
          dependencies: {
            react: '^18', 'react-dom': '^18',
            'lucide-react': 'latest', clsx: 'latest', 'tailwind-merge': 'latest',
          },
          devDependencies: {
            vite: 'latest', '@vitejs/plugin-react': 'latest',
            tailwindcss: 'latest', autoprefixer: 'latest', postcss: 'latest',
          },
        }),
        encoding: 'utf-8',
      })
    }

    // Add index.html if not present
    if (!files['index.html']) {
      vercelFiles.push({
        file: 'index.html',
        data: `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${name || 'App'}</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`,
        encoding: 'utf-8',
      })
    }

    // Add vite config if not present
    if (!files['vite.config.js'] && !files['vite.config.ts']) {
      vercelFiles.push({
        file: 'vite.config.js',
        data: `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nexport default defineConfig({ plugins: [react()] })`,
        encoding: 'utf-8',
      })
    }

    // Add tailwind/postcss if not present
    if (!files['postcss.config.js']) {
      vercelFiles.push({
        file: 'postcss.config.js',
        data: `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`,
        encoding: 'utf-8',
      })
    }
    if (!files['tailwind.config.js']) {
      vercelFiles.push({
        file: 'tailwind.config.js',
        data: `export default { content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'], theme: { extend: {} }, plugins: [] }`,
        encoding: 'utf-8',
      })
    }

    // Add main.jsx if not present
    if (!files['src/main.jsx'] && !files['src/main.tsx']) {
      vercelFiles.push({
        file: 'src/main.jsx',
        data: `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport './index.css'\nimport App from './App'\nReactDOM.createRoot(document.getElementById('root')).render(<App/>)`,
        encoding: 'utf-8',
      })
    }

    // Add index.css if not present
    if (!files['src/index.css']) {
      vercelFiles.push({
        file: 'src/index.css',
        data: `@tailwind base;\n@tailwind components;\n@tailwind utilities;\nhtml,body,#root{background:#080c10;min-height:100vh;margin:0}`,
        encoding: 'utf-8',
      })
    }

    const deployRes = await fetch(
      `https://api.vercel.com/v13/deployments?teamId=${teamId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `archaeopteris-${Date.now()}`,
          files: vercelFiles,
          projectSettings: {
            framework: 'vite',
            buildCommand: 'vite build',
            outputDirectory: 'dist',
            installCommand: 'npm install',
          },
          target: 'preview',
        }),
      }
    )

    if (!deployRes.ok) {
      const err = await deployRes.json()
      throw new Error(err.error?.message || `Deploy failed: ${deployRes.status}`)
    }

    const deployment = await deployRes.json()
    const previewUrl = `https://${deployment.url}`

    return NextResponse.json({ 
      ok: true, 
      previewUrl,
      deploymentId: deployment.id,
      status: deployment.readyState,
    })

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    console.error('Deploy error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
