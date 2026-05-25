import type { Node, Edge } from '@xyflow/react'

export interface Template {
  id: string
  name: string
  description: string
  icon: string
  blockCount: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface CommandDef {
  name: string
  aliases: string[]
  description: string
  permission: string
  usage: string
}

export interface PermissionDef {
  name: string
  description: string
  default: 'true' | 'false' | 'op' | 'not-op'
  children: { name: string; value: boolean }[]
}

export interface Project {
  name: string
  version: string
  mainClass: string
  apiVersion: string
  author: string
  description: string
  commands: CommandDef[]
  permissions: PermissionDef[]
}

export interface SaveData {
  project: Project
  nodes: Node[]
  edges: Edge[]
  viewport?: { x: number; y: number; zoom: number }
}
