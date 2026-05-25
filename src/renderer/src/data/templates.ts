import type { Node, Edge } from '@xyflow/react'

export interface TemplateData {
  id: string
  name: string
  description: string
  icon: string
  difficulty: 'easy' | 'medium' | 'hard'
  nodes: Node[]
  edges: Edge[]
}

const defaultPosition = { x: 0, y: 0 }

export const templates: TemplateData[] = [
  {
    id: 'hello_world',
    name: 'Hello World',
    description: 'Make the player say "Hello!" when they join the server',
    icon: 'message-circle',
    difficulty: 'easy',
    nodes: [
      {
        id: 'template-1',
        type: 'blockNode',
        position: { x: 50, y: 100 },
        data: {
          definitionId: 'player_join',
          properties: {},
          label: undefined
        }
      },
      {
        id: 'template-2',
        type: 'blockNode',
        position: { x: 400, y: 100 },
        data: {
          definitionId: 'send_message',
          properties: { message: '&aWelcome to the server!' },
          label: undefined
        }
      }
    ],
    edges: [
      {
        id: 'template-e1',
        source: 'template-1',
        target: 'template-2',
        sourceHandle: 'output',
        targetHandle: 'input'
      }
    ]
  },
  {
    id: 'fly_command',
    name: '/fly Command',
    description: 'Create a /fly command to toggle flight mode',
    icon: 'plane',
    difficulty: 'medium',
    nodes: [
      {
        id: 'template-f1',
        type: 'blockNode',
        position: { x: 50, y: 50 },
        data: {
          definitionId: 'player_command',
          properties: { command: '/fly' },
          label: undefined
        }
      },
      {
        id: 'template-f2',
        type: 'blockNode',
        position: { x: 400, y: 0 },
        data: {
          definitionId: 'if_permission',
          properties: { permission: 'essentials.fly' },
          label: undefined
        }
      },
      {
        id: 'template-f3',
        type: 'blockNode',
        position: { x: 750, y: 0 },
        data: {
          definitionId: 'send_message',
          properties: { message: '&aFlight mode toggled!' },
          label: undefined
        }
      },
      {
        id: 'template-f4',
        type: 'blockNode',
        position: { x: 750, y: 150 },
        data: {
          definitionId: 'send_message',
          properties: { message: '&cYou don\'t have permission!' },
          label: undefined
        }
      }
    ],
    edges: [
      {
        id: 'template-fe1',
        source: 'template-f1',
        target: 'template-f2',
        sourceHandle: 'output',
        targetHandle: 'input'
      },
      {
        id: 'template-fe2',
        source: 'template-f2',
        target: 'template-f3',
        sourceHandle: 'branch-true',
        targetHandle: 'input'
      },
      {
        id: 'template-fe3',
        source: 'template-f2',
        target: 'template-f4',
        sourceHandle: 'branch-false',
        targetHandle: 'input'
      }
    ]
  },
  {
    id: 'lightning_timer',
    name: 'Lightning Timer',
    description: 'Strike lightning on a random player every 10 minutes',
    icon: 'zap',
    difficulty: 'hard',
    nodes: [
      {
        id: 'template-l1',
        type: 'blockNode',
        position: { x: 50, y: 100 },
        data: {
          definitionId: 'server_start',
          properties: {},
          label: undefined
        }
      },
      {
        id: 'template-l2',
        type: 'blockNode',
        position: { x: 400, y: 100 },
        data: {
          definitionId: 'wait',
          properties: { ticks: 12000 },
          label: undefined
        }
      },
      {
        id: 'template-l3',
        type: 'blockNode',
        position: { x: 750, y: 100 },
        data: {
          definitionId: 'lightning',
          properties: {},
          label: undefined
        }
      },
      {
        id: 'template-l4',
        type: 'blockNode',
        position: { x: 1100, y: 100 },
        data: {
          definitionId: 'wait',
          properties: { ticks: 12000 },
          label: undefined
        }
      }
    ],
    edges: [
      {
        id: 'template-le1',
        source: 'template-l1',
        target: 'template-l2',
        sourceHandle: 'output',
        targetHandle: 'input'
      },
      {
        id: 'template-le2',
        source: 'template-l2',
        target: 'template-l3',
        sourceHandle: 'output',
        targetHandle: 'input'
      },
      {
        id: 'template-le3',
        source: 'template-l3',
        target: 'template-l4',
        sourceHandle: 'output',
        targetHandle: 'input'
      },
      {
        id: 'template-le4',
        source: 'template-l4',
        target: 'template-l2',
        sourceHandle: 'output',
        targetHandle: 'input'
      }
    ]
  }
]
