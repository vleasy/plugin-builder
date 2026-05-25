import type { Node, Edge } from '@xyflow/react'
import { getBlockById } from '../data'

export interface ValidationError {
  nodeId: string
  message: string
}

export function validateGraph(nodes: Node[], edges: Edge[]): ValidationError[] {
  const errors: ValidationError[] = []

  if (nodes.length === 0) return []

  const triggerNodes = nodes.filter(n => {
    const def = getBlockById(n.data.definitionId)
    return def?.type === 'trigger'
  })

  if (triggerNodes.length === 0) {
    nodes.forEach(n => {
      errors.push({ nodeId: n.id, message: 'No trigger found - add an Event block to start' })
    })
    return errors
  }

  const nodeIds = new Set(nodes.map(n => n.id))

  for (const edge of edges) {
    if (!nodeIds.has(edge.source)) {
      errors.push({ nodeId: edge.target, message: 'Source node not found' })
    }
    if (!nodeIds.has(edge.target)) {
      errors.push({ nodeId: edge.source, message: 'Target node not found' })
    }
  }

  for (const node of nodes) {
    const def = getBlockById(node.data.definitionId)
    if (!def) {
      errors.push({ nodeId: node.id, message: 'Unknown block type' })
      continue
    }

    if (def.hasInput) {
      const hasIncoming = edges.some(e => e.target === node.id)
      if (node !== triggerNodes[0] && !hasIncoming) {
        errors.push({ nodeId: node.id, message: 'Block is not connected - drag a wire from another block' })
      }
    }

    for (const field of def.fields) {
      const value = node.data.properties?.[field.key]
      if (field.type === 'string' && field.defaultValue !== '' && (value === undefined || value === '')) {
        errors.push({ nodeId: node.id, message: `"${field.label}" is required` })
      }
    }
  }

  return errors
}
