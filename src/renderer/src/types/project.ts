import type { Node, Edge } from '@xyflow/react'

export interface Template {
  id: string
  name: string
  description: string
  icon: string
  blockCount: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface Project {
  name: string
  version: string
  mainClass: string
  apiVersion: string
  author: string
  description: string
}

export interface SaveData {
  project: Project
  nodes: Node[]
  edges: Edge[]
  viewport?: { x: number; y: number; zoom: number }
}
