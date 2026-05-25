/// <reference types="vite/client" />

interface ElectronAPI {
  saveProject: (data: string) => Promise<string | null>
  savePlugin: (data: string, ext: string) => Promise<string | null>
  openProject: () => Promise<string | null>
  onMenuNewProject: (cb: () => void) => void
  onMenuSave: (cb: () => void) => void
  onMenuUndo: (cb: () => void) => void
  onMenuRedo: (cb: () => void) => void
  onFileOpen: (cb: (content: string) => void) => void
  removeAllListeners: (channel: string) => void
}

interface Window {
  electronAPI?: ElectronAPI
}
