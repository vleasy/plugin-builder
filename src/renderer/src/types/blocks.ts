export type BlockCategory = 'trigger' | 'action' | 'condition' | 'variable'

export type FieldType = 'string' | 'number' | 'boolean' | 'select' | 'player' | 'location' | 'item' | 'sound' | 'gamemode' | 'entity' | 'world' | 'biome'

export interface FieldOption {
  label: string
  value: string | number | boolean
}

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  defaultValue?: string | number | boolean
  options?: FieldOption[]
  placeholder?: string
  description?: string
}

export interface BlockDefinition {
  id: string
  type: BlockCategory
  label: string
  icon: string
  color: string
  description: string
  tags: string[]
  fields: FieldDef[]
  hasInput: boolean
  hasOutput: boolean
  outputType?: string
  canConnectTo?: string[]
  branches?: string[]
}

export interface BlockData {
  definitionId: string
  properties: Record<string, any>
  label?: string
}

export const CATEGORY_COLORS: Record<BlockCategory, string> = {
  trigger: '#FBBF24',
  action: '#22D3EE',
  condition: '#F87171',
  variable: '#A78BFA'
}

export const CATEGORY_LABELS: Record<BlockCategory, string> = {
  trigger: 'Events',
  action: 'Actions',
  condition: 'Conditions',
  variable: 'Variables'
}

export const CATEGORY_ICONS: Record<BlockCategory, string> = {
  trigger: 'zap',
  action: 'play',
  condition: 'git-branch',
  variable: 'variable'
}
