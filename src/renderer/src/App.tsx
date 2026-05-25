import React, { useEffect } from 'react'
import { useEditorStore } from './store/editorStore'
import { useProjectStore } from './store/projectStore'
import { WelcomeScreen } from './components/WelcomeScreen'
import { EditorLayout } from './components/EditorLayout'

export default function App() {
  const { isWelcomeScreen, loadProject, clearProject, setWelcomeScreen, nodes, edges } = useEditorStore()

  useEffect(() => {
    if (!window.electronAPI) return

    const store = useEditorStore.getState()

    const unsubNew = window.electronAPI.onMenuNewProject(() => {
      store.clearProject()
      store.setWelcomeScreen(true)
    })

    const unsubSave = window.electronAPI.onMenuSave(async () => {
      const { nodes, edges } = store.getCurrentState()
      await useProjectStore.getState().saveProject(nodes, edges)
    })

    const unsubUndo = window.electronAPI.onMenuUndo(() => {
      store.undo()
    })

    const unsubRedo = window.electronAPI.onMenuRedo(() => {
      store.redo()
    })

    const unsubOpen = window.electronAPI.onFileOpen((content: string) => {
      try {
        const data = JSON.parse(content)
        if (data.nodes && data.edges) {
          store.loadProject(data.nodes, data.edges)
        }
      } catch (e) {
        console.error('Failed to load project:', e)
      }
    })

    return () => {
      window.electronAPI?.removeAllListeners('menu:new-project')
      window.electronAPI?.removeAllListeners('menu:save')
      window.electronAPI?.removeAllListeners('menu:undo')
      window.electronAPI?.removeAllListeners('menu:redo')
      window.electronAPI?.removeAllListeners('file:open')
    }
  }, [])

  useEffect(() => {
    const autoSave = setInterval(() => {
      if (!isWelcomeScreen) {
        try {
          const data = { nodes, edges }
          localStorage.setItem('plugin-builder-autosave', JSON.stringify(data))
        } catch {}
      }
    }, 10000)

    return () => clearInterval(autoSave)
  }, [isWelcomeScreen, nodes, edges])

  useEffect(() => {
    try {
      const saved = localStorage.getItem('plugin-builder-autosave')
      if (saved) {
        const data = JSON.parse(saved)
        if (data.nodes?.length > 0) {
          loadProject(data.nodes, data.edges || [])
        }
      }
    } catch {}
  }, [])

  if (isWelcomeScreen) return <WelcomeScreen />

  return <EditorLayout />
}
