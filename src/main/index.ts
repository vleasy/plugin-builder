import { app, BrowserWindow, ipcMain, dialog, Menu, shell } from 'electron'
import { join } from 'path'
import { readFileSync, writeFileSync } from 'fs'

let mainWindow: BrowserWindow | null = null

function createWindow(): void {
    mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1024,
    minHeight: 700,
    title: 'Minecraft Plugin Builder',
    backgroundColor: '#121212',
    show: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
      nodeIntegration: false,
      devTools: true
    }
  })

  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'New Project',
          accelerator: 'CmdOrCtrl+N',
          click: () => mainWindow?.webContents.send('menu:new-project')
        },
        {
          label: 'Open Project',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow!, {
              filters: [{ name: 'Plugin Builder Project', extensions: ['json', 'mcplugin'] }],
              properties: ['openFile']
            })
            if (!result.canceled && result.filePaths[0]) {
              const content = readFileSync(result.filePaths[0], 'utf-8')
              mainWindow?.webContents.send('file:open', content)
            }
          }
        },
        {
          label: 'Save',
          accelerator: 'CmdOrCtrl+S',
          click: () => mainWindow?.webContents.send('menu:save')
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          click: () => mainWindow?.webContents.send('menu:undo')
        },
        {
          label: 'Redo',
          accelerator: 'CmdOrCtrl+Shift+Z',
          click: () => mainWindow?.webContents.send('menu:redo')
        },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { role: 'resetZoom' }
      ]
    }
  ])
  Menu.setApplicationMenu(menu)

  if (process.env.ELECTRON_RENDERER_URL) {
    mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL)
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

ipcMain.handle('dialog:save-json', async (_event, data: string) => {
  const result = await dialog.showSaveDialog(mainWindow!, {
    filters: [
      { name: 'Plugin Builder Project', extensions: ['json'] },
      { name: 'Minecraft Plugin', extensions: ['mcplugin'] }
    ]
  })
  if (!result.canceled && result.filePath) {
    writeFileSync(result.filePath, data, 'utf-8')
    return result.filePath
  }
  return null
})

ipcMain.handle('dialog:save-plugin', async (_event, { data, ext }: { data: string; ext: string }) => {
  const result = await dialog.showSaveDialog(mainWindow!, {
    filters: [
      { name: 'Java Plugin', extensions: ['java'] },
      { name: 'Kotlin Plugin', extensions: ['kt'] }
    ],
    defaultPath: `plugin.${ext}`
  })
  if (!result.canceled && result.filePath) {
    writeFileSync(result.filePath, data, 'utf-8')
    return result.filePath
  }
  return null
})

ipcMain.handle('dialog:open-project', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    filters: [{ name: 'Plugin Builder Project', extensions: ['json', 'mcplugin'] }],
    properties: ['openFile']
  })
  if (!result.canceled && result.filePaths[0]) {
    const content = readFileSync(result.filePaths[0], 'utf-8')
    return content
  }
  return null
})

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
