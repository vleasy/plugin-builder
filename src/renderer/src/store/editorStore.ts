import { create } from 'zustand'
import {
  applyNodeChanges,
  applyEdgeChanges,
  type Node,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type Connection
} from '@xyflow/react'

interface HistoryEntry {
  nodes: Node[]
  edges: Edge[]
}

interface EditorState {
  nodes: Node[]
  edges: Edge[]
  selectedNodeId: string | null
  selectedEdgeId: string | null
  showCodePreview: boolean
  showDebugPanel: boolean
  showExportDialog: boolean
  showPluginConfig: boolean
  showItemBuilder: boolean
  showTemplateGallery: boolean
  isWelcomeScreen: boolean
  projectName: string

  history: HistoryEntry[]
  historyIndex: number

  onNodesChange: OnNodesChange
  onEdgesChange: OnEdgesChange
  onConnect: (connection: Connection) => void
  addNode: (definitionId: string, position: { x: number; y: number }) => void
  removeSelected: () => void

  selectNode: (id: string | null) => void
  selectEdge: (id: string | null) => void

  updateNodeData: (nodeId: string, data: Record<string, any>) => void

  toggleCodePreview: () => void
  toggleDebugPanel: () => void
  toggleExportDialog: () => void
  togglePluginConfig: () => void
  toggleItemBuilder: () => void
  toggleTemplateGallery: () => void

  setWelcomeScreen: (show: boolean) => void
  setProjectName: (name: string) => void

  loadTemplate: (nodes: Node[], edges: Edge[]) => void
  loadProject: (nodes: Node[], edges: Edge[]) => void
  clearProject: () => void

  undo: () => void
  redo: () => void

  pushHistory: () => void
  getCurrentState: () => { nodes: Node[]; edges: Edge[] }
}

let nodeCounter = 0

export const useEditorStore = create<EditorState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  selectedEdgeId: null,
  showCodePreview: false,
  showDebugPanel: false,
  showExportDialog: false,
  showPluginConfig: false,
  showItemBuilder: false,
  showTemplateGallery: false,
  isWelcomeScreen: true,
  projectName: 'My Plugin',

  history: [],
  historyIndex: -1,

  onNodesChange: (changes) => {
    set((state) => {
      const newNodes = applyNodeChanges(changes, state.nodes)
      const hasChange = changes.some(c => c.type === 'add' || c.type === 'remove' || c.type === 'position')
      return {
        nodes: newNodes,
        ...(hasChange ? {} : {})
      }
    })
  },

  onEdgesChange: (changes) => {
    set((state) => {
      const newEdges = applyEdgeChanges(changes, state.edges)
      return { edges: newEdges }
    })
  },

  onConnect: (connection) => {
    set((state) => {
      const newEdge: Edge = {
        id: `edge-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        source: connection.source,
        target: connection.target,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
        type: 'redstoneEdge',
        style: {
          strokeWidth: 2
        }
      }
      return { edges: [...state.edges, newEdge] }
    })
    get().pushHistory()
  },

  addNode: (definitionId, position) => {
    set((state) => {
      nodeCounter++
      const id = `node-${Date.now()}-${nodeCounter}`
      const newNode: Node = {
        id,
        type: 'blockNode',
        position,
        data: {
          definitionId,
          properties: {},
          label: undefined
        }
      }
      return { nodes: [...state.nodes, newNode] }
    })
    get().pushHistory()
  },

  removeSelected: () => {
    set((state) => {
      const selectedId = state.selectedNodeId
      if (!selectedId) return state
      return {
        nodes: state.nodes.filter(n => n.id !== selectedId),
        edges: state.edges.filter(e => e.source !== selectedId && e.target !== selectedId),
        selectedNodeId: null
      }
    })
    get().pushHistory()
  },

  selectNode: (id) => set({ selectedNodeId: id, selectedEdgeId: null }),
  selectEdge: (id) => set({ selectedEdgeId: id, selectedNodeId: null }),

  updateNodeData: (nodeId, data) => {
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === nodeId
          ? { ...n, data: { ...n.data, properties: { ...n.data.properties, ...data } } }
          : n
      )
    }))
  },

  toggleCodePreview: () => set((s) => ({ showCodePreview: !s.showCodePreview })),
  toggleDebugPanel: () => set((s) => ({ showDebugPanel: !s.showDebugPanel })),
  toggleExportDialog: () => set((s) => ({ showExportDialog: !s.showExportDialog })),
  togglePluginConfig: () => set((s) => ({ showPluginConfig: !s.showPluginConfig })),
  toggleItemBuilder: () => set((s) => ({ showItemBuilder: !s.showItemBuilder })),
  toggleTemplateGallery: () => set((s) => ({ showTemplateGallery: !s.showTemplateGallery })),

  setWelcomeScreen: (show) => set({ isWelcomeScreen: show }),
  setProjectName: (name) => set({ projectName: name }),

  loadTemplate: (nodes, edges) => {
    set({ nodes, edges, isWelcomeScreen: false, selectedNodeId: null, selectedEdgeId: null })
    get().pushHistory()
  },

  loadProject: (nodes, edges) => {
    set({ nodes, edges, isWelcomeScreen: false, selectedNodeId: null, selectedEdgeId: null })
    get().pushHistory()
  },

  clearProject: () => {
    set({ nodes: [], edges: [], selectedNodeId: null, selectedEdgeId: null, isWelcomeScreen: false })
    get().pushHistory()
  },

  undo: () => {
    const { historyIndex, history } = get()
    if (historyIndex < 0) return
    const entry = history[historyIndex]
    set({
      nodes: entry.nodes.map(n => ({ ...n })),
      edges: entry.edges.map(e => ({ ...e })),
      historyIndex: historyIndex - 1
    })
  },

  redo: () => {
    const { historyIndex, history } = get()
    if (historyIndex >= history.length - 2) return
    const entry = history[historyIndex + 2]
    if (!entry) return
    set({
      nodes: entry.nodes.map(n => ({ ...n })),
      edges: entry.edges.map(e => ({ ...e })),
      historyIndex: historyIndex + 1
    })
  },

  pushHistory: () => {
    set((state) => {
      const entry: HistoryEntry = {
        nodes: JSON.parse(JSON.stringify(state.nodes)),
        edges: JSON.parse(JSON.stringify(state.edges))
      }
      const newHistory = state.history.slice(0, state.historyIndex + 1)
      newHistory.push(entry)
      if (newHistory.length > 100) newHistory.shift()
      return {
        history: newHistory,
        historyIndex: newHistory.length - 1
      }
    })
  },

  getCurrentState: () => {
    const { nodes, edges } = get()
    return { nodes, edges }
  }
}))
