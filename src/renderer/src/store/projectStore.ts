import { create } from 'zustand'
import type { Project, SaveData, CommandDef, PermissionDef } from '../types/project'
import type { Node, Edge } from '@xyflow/react'

interface ProjectState {
  project: Project
  updateProject: (data: Partial<Project>) => void

  addCommand: () => void
  updateCommand: (index: number, data: Partial<CommandDef>) => void
  removeCommand: (index: number) => void

  addPermission: () => void
  updatePermission: (index: number, data: Partial<PermissionDef>) => void
  removePermission: (index: number) => void
  addPermissionChild: (pIndex: number) => void
  updatePermissionChild: (pIndex: number, cIndex: number, data: Partial<{ name: string; value: boolean }>) => void
  removePermissionChild: (pIndex: number, cIndex: number) => void

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
  description: 'A generated plugin',
  commands: [],
  permissions: []
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  project: { ...defaultProject },

  updateProject: (data) => {
    set((state) => ({ project: { ...state.project, ...data } }))
  },

  addCommand: () => {
    set((state) => ({
      project: {
        ...state.project,
        commands: [...state.project.commands, { name: '', aliases: [], description: '', permission: '', usage: '' }]
      }
    }))
  },

  updateCommand: (index, data) => {
    set((state) => {
      const commands = [...state.project.commands]
      commands[index] = { ...commands[index], ...data }
      return { project: { ...state.project, commands } }
    })
  },

  removeCommand: (index) => {
    set((state) => ({
      project: {
        ...state.project,
        commands: state.project.commands.filter((_, i) => i !== index)
      }
    }))
  },

  addPermission: () => {
    set((state) => ({
      project: {
        ...state.project,
        permissions: [...state.project.permissions, { name: '', description: '', default: 'op', children: [] }]
      }
    }))
  },

  updatePermission: (index, data) => {
    set((state) => {
      const permissions = [...state.project.permissions]
      permissions[index] = { ...permissions[index], ...data }
      return { project: { ...state.project, permissions } }
    })
  },

  removePermission: (index) => {
    set((state) => ({
      project: {
        ...state.project,
        permissions: state.project.permissions.filter((_, i) => i !== index)
      }
    }))
  },

  addPermissionChild: (pIndex) => {
    set((state) => {
      const permissions = [...state.project.permissions]
      permissions[pIndex] = {
        ...permissions[pIndex],
        children: [...permissions[pIndex].children, { name: '', value: true }]
      }
      return { project: { ...state.project, permissions } }
    })
  },

  updatePermissionChild: (pIndex, cIndex, data) => {
    set((state) => {
      const permissions = [...state.project.permissions]
      const children = [...permissions[pIndex].children]
      children[cIndex] = { ...children[cIndex], ...data }
      permissions[pIndex] = { ...permissions[pIndex], children }
      return { project: { ...state.project, permissions } }
    })
  },

  removePermissionChild: (pIndex, cIndex) => {
    set((state) => {
      const permissions = [...state.project.permissions]
      permissions[pIndex] = {
        ...permissions[pIndex],
        children: permissions[pIndex].children.filter((_, i) => i !== cIndex)
      }
      return { project: { ...state.project, permissions } }
    })
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
