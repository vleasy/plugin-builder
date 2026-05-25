const { spawn, execSync } = require('child_process')
const path = require('path')
const http = require('http')
const fs = require('fs')

const ROOT = __dirname

function cmdFile(name) {
  const p = path.join(ROOT, 'node_modules', '.bin', name + '.cmd')
  return fs.existsSync(p) ? p : path.join(ROOT, 'node_modules', '.bin', name)
}

function killProcsOnPort(port) {
  try {
    const out = execSync(`netstat -ano | findstr :${port}`, { stdio: 'pipe', encoding: 'utf8', timeout: 3000 })
    out.trim().split('\n').forEach(line => {
      const m = line.trim().match(/(\d+)\s*$/)
      if (m) {
        try { execSync(`taskkill /F /PID ${m[1]} 2>nul`, { stdio: 'ignore' }) } catch {}
      }
    })
  } catch {}
}

async function detectPort(vite) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Timed out detecting Vite port')), 20000)
    const onData = (chunk) => {
      const text = chunk.toString().replace(/\u001b\[.*?m/g, '')
      const m = text.match(/Local:\s+http:\/\/localhost:(\d+)/)
      if (m) {
        clearTimeout(timeout)
        resolve(Number(m[1]))
      }
    }
    vite.stderr.on('data', onData)
    vite.stdout.on('data', onData)
  })
}

async function waitForVite(url, timeout = 15000) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    function check() {
      const req = http.get(url, (res) => {
        res.resume()
        resolve()
      })
      req.on('error', () => {
        req.destroy()
        if (Date.now() - start > timeout) {
          reject(new Error('Timed out waiting for Vite'))
        } else {
          setTimeout(check, 300)
        }
      })
    }
    check()
  })
}

async function main() {
  const electronDir = path.join(ROOT, 'node_modules', 'electron', 'dist')
  killProcsOnPort(5173) // cleanup stale Vite

  const vite = spawn(cmdFile('vite'), ['--port', '5173'], {
    cwd: ROOT,
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
  })
  vite.stdout.pipe(process.stdout)
  vite.stderr.pipe(process.stderr)

  console.log('Starting Vite...')

  try {
    const port = await detectPort(vite)
    const viteUrl = `http://localhost:${port}`
    console.log(`\nVite ready on port ${port}! Launching Electron...\n`)
    await waitForVite(viteUrl)

    const electron = spawn(path.join(electronDir, 'electron.exe'), [ROOT, '--enable-logging'], {
      cwd: ROOT,
      stdio: 'inherit',
      env: {
        ...process.env,
        ELECTRON_RENDERER_URL: viteUrl,
        ELECTRON_DEV: 'true'
      }
    })

    electron.on('close', (code) => {
      console.log('Electron closed with code', code)
      vite.kill()
      process.exit(0)
    })
    process.on('SIGINT', () => {
      vite.kill()
      electron.kill()
      process.exit(0)
    })
  } catch (err) {
    console.error('Failed:', err.message)
    vite.kill()
    process.exit(1)
  }
}

main()