
// app/api/e2b/create/route.ts
import { Sandbox } from 'e2b'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sandboxId } = await req.json()

    // Try reuse existing sandbox
    if (sandboxId) {
      try {
        const sandbox = await Sandbox.connect(sandboxId, {
          apiKey: process.env.E2B_API_KEY,
        })
        await sandbox.keepAlive(5 * 60 * 1000) // extend 5 min
        return NextResponse.json({ sandboxId, isNew: false })
      } catch {
        // Sandbox expired, create new one
      }
    }

    const sandbox = await Sandbox.create({
      apiKey: process.env.E2B_API_KEY,
      timeoutMs: 5 * 60 * 1000, // 5 min
    })

    // Setup base project files
    await sandbox.files.write('/home/user/app/package.json', JSON.stringify({
      name: 'archaeopteris-app',
      type: 'module',
      scripts: { dev: 'vite --port 3000 --host 0.0.0.0' },
      dependencies: {
        react: '^18',
        'react-dom': '^18',
        'lucide-react': 'latest',
        clsx: 'latest',
        'tailwind-merge': 'latest',
      },
      devDependencies: {
        vite: '6.3.5',
        '@vitejs/plugin-react': '4.5.2',
        tailwindcss: '3.4.1',
        autoprefixer: '10.4.17',
        postcss: '8.4.35',
      },
    }))

    await sandbox.files.write('/home/user/app/index.html', `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/></head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>`)

    await sandbox.files.write('/home/user/app/vite.config.js',
      `import { defineConfig } from 'vite'\nimport react from '@vitejs/plugin-react'\nexport default defineConfig({ plugins: [react()] })`
    )

    await sandbox.files.write('/home/user/app/postcss.config.js',
      `export default { plugins: { tailwindcss: {}, autoprefixer: {} } }`
    )

    await sandbox.files.write('/home/user/app/tailwind.config.js',
      `export default { content: ['./src/**/*.{js,jsx}', './index.html'], theme: { extend: {} }, plugins: [] }`
    )

    await sandbox.files.write('/home/user/app/src/index.css',
      `@tailwind base;\n@tailwind components;\n@tailwind utilities;\nhtml,body,#root{background:#080c10;min-height:100vh;margin:0}`
    )

    await sandbox.files.write('/home/user/app/src/main.jsx',
      `import React from 'react'\nimport ReactDOM from 'react-dom/client'\nimport './index.css'\nimport App from './App'\nReactDOM.createRoot(document.getElementById('root')).render(<App/>)`
    )

    return NextResponse.json({ sandboxId: sandbox.sandboxId, isNew: true })
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}


// âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// app/api/e2b/write/route.ts
// âââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
// import { Sandbox } from 'e2b'
// import { NextResponse } from 'next/server'

// export async function POST(req: Request) {
//   try {
//     const { sandboxId, files } = await req.json()
//     const sandbox = await Sandbox.connect(sandboxId, { apiKey: process.env.E2B_API_KEY })
//
//     for (const [path, content] of Object.entries(files as Record<string, string>)) {
//       const fullPath = `/home/user/app/${path}`
//       // ensure dir exists
//       const dir = fullPath.split('/').slice(0, -1).join('/')
//       await sandbox.commands.run(`mkdir -p ${dir}`)
//       await sandbox.files.write(fullPath, content)
//     }
//
//     return NextResponse.json({ ok: true })
//   } catch (err) {
//     const msg = err instanceof Error ? err.message : 'Unknown error'
//     return NextResponse.json({ error: msg }, { status: 500 })
//   }
// }
