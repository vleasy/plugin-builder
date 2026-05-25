import type { Node, Edge } from '@xyflow/react'

export interface TemplateData {
  id: string
  name: string
  description: string
  icon: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  nodes: Node[]
  edges: Edge[]
}

export const templates: TemplateData[] = [
  {
    id: 'hello_world',
    name: 'Hello World',
    description: 'Make the player say "Hello!" when they join the server',
    icon: 'message-circle',
    difficulty: 'easy',
    tags: ['beginner', 'message'],
    nodes: [
      { id: 't-hw-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'player_join', properties: {}, label: undefined } },
      { id: 't-hw-2', type: 'blockNode', position: { x: 400, y: 100 }, data: { definitionId: 'send_message', properties: { message: '&aWelcome to the server!' }, label: undefined } }
    ],
    edges: [{ id: 't-hw-e1', source: 't-hw-1', target: 't-hw-2', sourceHandle: 'output', targetHandle: 'input' }]
  },
  {
    id: 'fly_command',
    name: '/fly Command',
    description: 'Create a /fly command with permission check',
    icon: 'plane',
    difficulty: 'medium',
    tags: ['command', 'permission'],
    nodes: [
      { id: 't-fc-1', type: 'blockNode', position: { x: 50, y: 50 }, data: { definitionId: 'player_command', properties: { command: '/fly' }, label: undefined } },
      { id: 't-fc-2', type: 'blockNode', position: { x: 400, y: 0 }, data: { definitionId: 'if_permission', properties: { permission: 'essentials.fly' }, label: undefined } },
      { id: 't-fc-3', type: 'blockNode', position: { x: 750, y: 0 }, data: { definitionId: 'send_message', properties: { message: '&aFlight mode toggled!' }, label: undefined } },
      { id: 't-fc-4', type: 'blockNode', position: { x: 750, y: 150 }, data: { definitionId: 'send_message', properties: { message: '&cNo permission!' }, label: undefined } }
    ],
    edges: [
      { id: 't-fc-e1', source: 't-fc-1', target: 't-fc-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-fc-e2', source: 't-fc-2', target: 't-fc-3', sourceHandle: 'branch-true', targetHandle: 'input' },
      { id: 't-fc-e3', source: 't-fc-2', target: 't-fc-4', sourceHandle: 'branch-false', targetHandle: 'input' }
    ]
  },
  {
    id: 'lightning_timer',
    name: 'Lightning Timer',
    description: 'Strike lightning on a random player every 10 minutes',
    icon: 'zap',
    difficulty: 'hard',
    tags: ['loop', 'timer', 'environment'],
    nodes: [
      { id: 't-lt-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'server_start', properties: {}, label: undefined } },
      { id: 't-lt-2', type: 'blockNode', position: { x: 400, y: 100 }, data: { definitionId: 'wait', properties: { ticks: 12000 }, label: undefined } },
      { id: 't-lt-3', type: 'blockNode', position: { x: 750, y: 100 }, data: { definitionId: 'lightning', properties: {}, label: undefined } },
      { id: 't-lt-4', type: 'blockNode', position: { x: 1100, y: 100 }, data: { definitionId: 'wait', properties: { ticks: 12000 }, label: undefined } }
    ],
    edges: [
      { id: 't-lt-e1', source: 't-lt-1', target: 't-lt-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-lt-e2', source: 't-lt-2', target: 't-lt-3', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-lt-e3', source: 't-lt-3', target: 't-lt-4', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-lt-e4', source: 't-lt-4', target: 't-lt-2', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'join_reward',
    name: 'Join Reward',
    description: 'Give a diamond to every player who joins',
    icon: 'gift',
    difficulty: 'easy',
    tags: ['reward', 'item', 'beginner'],
    nodes: [
      { id: 't-jr-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'player_join', properties: {}, label: undefined } },
      { id: 't-jr-2', type: 'blockNode', position: { x: 400, y: 50 }, data: { definitionId: 'give_item', properties: { item: 'DIAMOND', amount: 1 }, label: undefined } },
      { id: 't-jr-3', type: 'blockNode', position: { x: 400, y: 180 }, data: { definitionId: 'send_message', properties: { message: '&b&lWelcome! &r&7You received a diamond!' }, label: undefined } }
    ],
    edges: [
      { id: 't-jr-e1', source: 't-jr-1', target: 't-jr-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-jr-e2', source: 't-jr-2', target: 't-jr-3', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'auto_broadcast',
    name: 'Auto Broadcast',
    description: 'Broadcast messages to the server every 5 minutes',
    icon: 'megaphone',
    difficulty: 'easy',
    tags: ['loop', 'message', 'timer'],
    nodes: [
      { id: 't-ab-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'server_start', properties: {}, label: undefined } },
      { id: 't-ab-2', type: 'blockNode', position: { x: 400, y: 100 }, data: { definitionId: 'repeat', properties: { times: -1 }, label: undefined } },
      { id: 't-ab-3', type: 'blockNode', position: { x: 750, y: 50 }, data: { definitionId: 'wait', properties: { ticks: 6000 }, label: undefined } },
      { id: 't-ab-4', type: 'blockNode', position: { x: 750, y: 180 }, data: { definitionId: 'broadcast', properties: { message: '&e&lServer: &fEnjoy your stay!' }, label: undefined } }
    ],
    edges: [
      { id: 't-ab-e1', source: 't-ab-1', target: 't-ab-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-ab-e2', source: 't-ab-2', target: 't-ab-3', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-ab-e3', source: 't-ab-3', target: 't-ab-4', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'kill_reward',
    name: 'Zombie Drop',
    description: 'Give iron ingots when a player kills a zombie',
    icon: 'sword',
    difficulty: 'medium',
    tags: ['combat', 'entity', 'condition'],
    nodes: [
      { id: 't-kr-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'entity_death', properties: {}, label: undefined } },
      { id: 't-kr-2', type: 'blockNode', position: { x: 400, y: 100 }, data: { definitionId: 'if_entity_type', properties: { entity_type: 'ZOMBIE' }, label: undefined } },
      { id: 't-kr-3', type: 'blockNode', position: { x: 750, y: 0 }, data: { definitionId: 'give_item', properties: { item: 'IRON_INGOT', amount: 3 }, label: undefined } },
      { id: 't-kr-4', type: 'blockNode', position: { x: 750, y: 200 }, data: { definitionId: 'send_message', properties: { message: '&7+3 Iron Ingots' }, label: undefined } }
    ],
    edges: [
      { id: 't-kr-e1', source: 't-kr-1', target: 't-kr-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-kr-e2', source: 't-kr-2', target: 't-kr-3', sourceHandle: 'branch-true', targetHandle: 'input' },
      { id: 't-kr-e3', source: 't-kr-3', target: 't-kr-4', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'staff_alert',
    name: 'Staff Alert',
    description: 'Alert all online staff when someone runs /helpop',
    icon: 'shield',
    difficulty: 'medium',
    tags: ['command', 'permission', 'admin'],
    nodes: [
      { id: 't-sa-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'player_command', properties: { command: '/helpop' }, label: undefined } },
      { id: 't-sa-2', type: 'blockNode', position: { x: 400, y: 100 }, data: { definitionId: 'broadcast', properties: { message: '&c&lHelpOp: &f%player% needs help!' }, label: undefined } },
      { id: 't-sa-3', type: 'blockNode', position: { x: 400, y: 250 }, data: { definitionId: 'send_message', properties: { message: '&aHelp request sent to staff!' }, label: undefined } }
    ],
    edges: [
      { id: 't-sa-e1', source: 't-sa-1', target: 't-sa-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-sa-e2', source: 't-sa-2', target: 't-sa-3', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'pvp_mode',
    name: 'PVP Mode',
    description: 'Toggle PVP mode with a command — survival + heal',
    icon: 'flame',
    difficulty: 'easy',
    tags: ['command', 'pvp', 'gamemode'],
    nodes: [
      { id: 't-pm-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'player_command', properties: { command: '/pvp' }, label: undefined } },
      { id: 't-pm-2', type: 'blockNode', position: { x: 400, y: 0 }, data: { definitionId: 'set_gamemode', properties: { gamemode: 'SURVIVAL' }, label: undefined } },
      { id: 't-pm-3', type: 'blockNode', position: { x: 400, y: 150 }, data: { definitionId: 'heal_player', properties: {}, label: undefined } },
      { id: 't-pm-4', type: 'blockNode', position: { x: 400, y: 300 }, data: { definitionId: 'send_message', properties: { message: '&cPVP mode activated! Fight!' }, label: undefined } }
    ],
    edges: [
      { id: 't-pm-e1', source: 't-pm-1', target: 't-pm-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-pm-e2', source: 't-pm-2', target: 't-pm-3', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-pm-e3', source: 't-pm-3', target: 't-pm-4', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'warp_spawn',
    name: 'Warp Spawn',
    description: 'Teleport player to world spawn with /spawn',
    icon: 'map-pin',
    difficulty: 'easy',
    tags: ['command', 'teleport'],
    nodes: [
      { id: 't-ws-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'player_command', properties: { command: '/spawn' }, label: undefined } },
      { id: 't-ws-2', type: 'blockNode', position: { x: 400, y: 100 }, data: { definitionId: 'teleport', properties: { target_player: '', x: 0, y: 64, z: 0, world: 'world' }, label: undefined } }
    ],
    edges: [
      { id: 't-ws-e1', source: 't-ws-1', target: 't-ws-2', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'explosion_guard',
    name: 'Explosion Guard',
    description: 'Cancel all explosions and alert nearby players',
    icon: 'shield-off',
    difficulty: 'medium',
    tags: ['protection', 'explosion', 'event'],
    nodes: [
      { id: 't-eg-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'block_explode', properties: {}, label: undefined } },
      { id: 't-eg-2', type: 'blockNode', position: { x: 400, y: 50 }, data: { definitionId: 'cancel_event', properties: {}, label: undefined } },
      { id: 't-eg-3', type: 'blockNode', position: { x: 400, y: 200 }, data: { definitionId: 'send_message', properties: { message: '&c&lBoom! &7An explosion was prevented!' }, label: undefined } }
    ],
    edges: [
      { id: 't-eg-e1', source: 't-eg-1', target: 't-eg-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-eg-e2', source: 't-eg-2', target: 't-eg-3', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'welcome_firework',
    name: 'Welcome Firework',
    description: 'Celebrate player joins with particles and a title',
    icon: 'sparkles',
    difficulty: 'medium',
    tags: ['join', 'effects', 'visual'],
    nodes: [
      { id: 't-wf-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'player_join', properties: {}, label: undefined } },
      { id: 't-wf-2', type: 'blockNode', position: { x: 400, y: 0 }, data: { definitionId: 'title', properties: { title: '&b&lWelcome!', subtitle: '&7Enjoy your stay', fade_in: 10, stay: 40, fade_out: 10 }, label: undefined } },
      { id: 't-wf-3', type: 'blockNode', position: { x: 400, y: 150 }, data: { definitionId: 'spawn_particles', properties: { particle: 'FIREWORK', count: 50 }, label: undefined } },
      { id: 't-wf-4', type: 'blockNode', position: { x: 400, y: 300 }, data: { definitionId: 'play_sound', properties: { sound: 'ENTITY_FIREWORK_ROCKET_LAUNCH', volume: 1, pitch: 1 }, label: undefined } }
    ],
    edges: [
      { id: 't-wf-e1', source: 't-wf-1', target: 't-wf-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-wf-e2', source: 't-wf-2', target: 't-wf-3', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-wf-e3', source: 't-wf-3', target: 't-wf-4', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'player_greeting',
    name: 'Golden Greeting',
    description: 'Send a special message when player walks on gold block',
    icon: 'footprints',
    difficulty: 'medium',
    tags: ['move', 'block', 'effect'],
    nodes: [
      { id: 't-pg-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'player_move', properties: {}, label: undefined } },
      { id: 't-pg-2', type: 'blockNode', position: { x: 400, y: 100 }, data: { definitionId: 'if_block_below', properties: { block: 'GOLD_BLOCK' }, label: undefined } },
      { id: 't-pg-3', type: 'blockNode', position: { x: 750, y: 50 }, data: { definitionId: 'send_message', properties: { message: '&6You stepped on gold!' }, label: undefined } },
      { id: 't-pg-4', type: 'blockNode', position: { x: 750, y: 200 }, data: { definitionId: 'play_sound', properties: { sound: 'BLOCK_NOTE_BLOCK_PLING', volume: 1, pitch: 2 }, label: undefined } }
    ],
    edges: [
      { id: 't-pg-e1', source: 't-pg-1', target: 't-pg-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-pg-e2', source: 't-pg-2', target: 't-pg-3', sourceHandle: 'branch-true', targetHandle: 'input' },
      { id: 't-pg-e3', source: 't-pg-3', target: 't-pg-4', sourceHandle: 'output', targetHandle: 'input' }
    ]
  },
  {
    id: 'random_teleport',
    name: 'Random Teleport',
    description: 'Teleport the player to a random location with /rtp',
    icon: 'compass',
    difficulty: 'hard',
    tags: ['variable', 'teleport', 'random'],
    nodes: [
      { id: 't-rt-1', type: 'blockNode', position: { x: 50, y: 100 }, data: { definitionId: 'player_command', properties: { command: '/rtp' }, label: undefined } },
      { id: 't-rt-2', type: 'blockNode', position: { x: 400, y: 0 }, data: { definitionId: 'set_variable', properties: { variable: 'rtp_x', value: '' }, label: 'Random X' } },
      { id: 't-rt-3', type: 'blockNode', position: { x: 400, y: 150 }, data: { definitionId: 'set_variable', properties: { variable: 'rtp_z', value: '' }, label: 'Random Z' } },
      { id: 't-rt-4', type: 'blockNode', position: { x: 400, y: 300 }, data: { definitionId: 'teleport', properties: { target_player: '', x: 0, y: 64, z: 0, world: 'world' }, label: undefined } },
      { id: 't-rt-5', type: 'blockNode', position: { x: 400, y: 450 }, data: { definitionId: 'send_message', properties: { message: '&aWhoosh! Teleported to a random spot!' }, label: undefined } }
    ],
    edges: [
      { id: 't-rt-e1', source: 't-rt-1', target: 't-rt-2', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-rt-e2', source: 't-rt-2', target: 't-rt-3', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-rt-e3', source: 't-rt-3', target: 't-rt-4', sourceHandle: 'output', targetHandle: 'input' },
      { id: 't-rt-e4', source: 't-rt-4', target: 't-rt-5', sourceHandle: 'output', targetHandle: 'input' }
    ]
  }
]
