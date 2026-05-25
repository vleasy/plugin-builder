import { triggers } from './triggers'
import { actions } from './actions'
import { conditions } from './conditions'
import { variables } from './variables'
import type { BlockDefinition } from '../types/blocks'

export const allBlocks: BlockDefinition[] = [...triggers, ...actions, ...conditions, ...variables]

export const blockMap = new Map<string, BlockDefinition>()
allBlocks.forEach(block => blockMap.set(block.id, block))

export function getBlockById(id: string): BlockDefinition | undefined {
  return blockMap.get(id)
}

export { triggers, actions, conditions, variables }
export { templates } from './templates'
export type { TemplateData } from './templates'
