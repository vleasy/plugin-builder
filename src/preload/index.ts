import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  saveProject: (data: string) => ipcRenderer.invoke('dialog:save-json', data),
  savePlugin: (data: string, ext: string) => ipcRenderer.invoke('dialog:save-plugin', { data, ext }),
  openProject: () => ipcRenderer.invoke('dialog:open-project'),
  onMenuNewProject: (cb: () => void) => ipcRenderer.on('menu:new-project', cb),
  onMenuSave: (cb: () => void) => ipcRenderer.on('menu:save', cb),
  onMenuUndo: (cb: () => void) => ipcRenderer.on('menu:undo', cb),
  onMenuRedo: (cb: () => void) => ipcRenderer.on('menu:redo', cb),
  onFileOpen: (cb: (content: string) => void) => ipcRenderer.on('file:open', (_e, content) => cb(content)),
  removeAllListeners: (channel: string) => ipcRenderer.removeAllListeners(channel)
})
