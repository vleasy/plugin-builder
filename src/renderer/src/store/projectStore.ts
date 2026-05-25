import { create } from 'zustand'
import type { Project, SaveData } from '../types/project'
import type { Node, Edge } from '@xyflow/react'

interface ProjectState {
  project: Project
  updateProject: (data: Partial<Project>) => void

  saveProject: (nodes: Node[], edges: Edge[]) => Promise<string | null>
  loadProject: () => Promise<SaveData | null>
  exportPlugin: (code: string, ext: string) => Promise<string | null>
}

const defaultProject: Project = {
  name: 'MyPlugin',
  version: '1.0.0',
  mainClass: 'me.you.MyPlugin',
  apiVersion: '1.20',
  author: 'Player',
  description: 'A generated plugin'
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: { ...defaultProject },

  updateProject: (data) => {
    set((state) => ({ project: { ...state.project, ...data } }))
  },

  saveProject: async (nodes, edges) => {
    const { project } = get()
    const data: SaveData = { project, nodes, edges }
    const json = JSON.stringify(data, null, 2)
    if (window.electronAPI) {
      return await window.electronAPI.saveProject(json)
    }
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project.name}.json`
    a.click()
    URL.revokeObjectURL(url)
    return null
  },

  loadProject: async () => {
    if (window.electronAPI) {
      const content = await window.electronAPI.openProject()
      if (content) {
        try {
          return JSON.parse(content) as SaveData
        } catch { return null }
      }
      return null
    }
    return null
  },

  exportPlugin: async (code, ext) => {
    if (window.electronAPI) {
      return await window.electronAPI.savePlugin(code, ext)
    }
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `plugin.${ext}`
    a.click()
    URL.revokeObjectURL(url)
    return null
  }
}))
