import type { Node, Edge } from '@xyflow/react'
import type { Project, SaveData } from '../types/project'

export function generateJson(project: Project, nodes: Node[], edges: Edge[], viewport?: { x: number; y: number; zoom: number }): string {
  const data: SaveData = { project, nodes, edges, viewport }
  return JSON.stringify(data, null, 2)
}

export function parseJson(json: string): SaveData | null {
  try {
    return JSON.parse(json) as SaveData
  } catch {
    return null
  }
}
