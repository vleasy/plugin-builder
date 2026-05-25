import type { BlockDefinition } from '../types/blocks'

export const conditions: BlockDefinition[] = [
  {
    id: 'if_permission',
    type: 'condition',
    label: 'Has Permission',
    icon: 'shield',
    color: '#F87171',
    description: 'Проверяет, есть ли у игрока указанное право (permission)',
    tags: ['permission', 'perm', 'has', 'check', 'op'],
    fields: [
      {
        key: 'permission',
        label: 'Permission Node',
        type: 'string',
        defaultValue: 'myplugin.use',
        placeholder: 'permission.node'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_gamemode',
    type: 'condition',
    label: 'Is Gamemode',
    icon: 'gamepad-2',
    color: '#F87171',
    description: 'Проверяет, находится ли игрок в указанном игровом режиме',
    tags: ['gamemode', 'gm', 'check', 'is', 'mode'],
    fields: [
      {
        key: 'gamemode',
        label: 'Gamemode',
        type: 'select',
        defaultValue: 'CREATIVE',
        options: [
          { label: 'Survival', value: 'SURVIVAL' },
          { label: 'Creative', value: 'CREATIVE' },
          { label: 'Adventure', value: 'ADVENTURE' },
          { label: 'Spectator', value: 'SPECTATOR' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_item',
    type: 'condition',
    label: 'Has Item',
    icon: 'backpack',
    color: '#F87171',
    description: 'Проверяет, есть ли у игрока в инвентаре указанный предмет',
    tags: ['item', 'has', 'inventory', 'check', 'hold'],
    fields: [
      {
        key: 'item',
        label: 'Item',
        type: 'item',
        defaultValue: 'DIAMOND',
        description: 'Material ID to check'
      },
      {
        key: 'amount',
        label: 'Minimum Amount',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_holding_item',
    type: 'condition',
    label: 'Is Holding Item',
    icon: 'hand',
    color: '#F87171',
    description: 'Проверяет, держит ли игрок указанный предмет в руке',
    tags: ['item', 'holding', 'hand', 'check', 'main-hand'],
    fields: [
      {
        key: 'item',
        label: 'Item',
        type: 'item',
        defaultValue: 'DIAMOND_SWORD',
        description: 'Material ID to check'
      },
      {
        key: 'check_offhand',
        label: 'Check Off Hand too',
        type: 'boolean',
        defaultValue: true
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_biome',
    type: 'condition',
    label: 'Is In Biome',
    icon: 'tree-pine',
    color: '#F87171',
    description: 'Проверяет, находится ли игрок в указанном биоме',
    tags: ['biome', 'check', 'location', 'area', 'region'],
    fields: [
      {
        key: 'biome',
        label: 'Biome',
        type: 'select',
        defaultValue: 'PLAINS',
        options: [
          { label: 'Plains', value: 'PLAINS' },
          { label: 'Desert', value: 'DESERT' },
          { label: 'Forest', value: 'FOREST' },
          { label: 'Taiga', value: 'TAIGA' },
          { label: 'Swamp', value: 'SWAMP' },
          { label: 'Jungle', value: 'JUNGLE' },
          { label: 'Nether Wastes', value: 'NETHER_WASTES' },
          { label: 'The End', value: 'THE_END' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_world',
    type: 'condition',
    label: 'Is In World',
    icon: 'globe',
    color: '#F87171',
    description: 'Проверяет, находится ли игрок в указанном мире',
    tags: ['world', 'check', 'location', 'dimension'],
    fields: [
      {
        key: 'world',
        label: 'World',
        type: 'select',
        defaultValue: 'world',
        options: [
          { label: 'Overworld', value: 'world' },
          { label: 'Nether', value: 'world_nether' },
          { label: 'The End', value: 'world_the_end' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_flying',
    type: 'condition',
    label: 'Is Flying',
    icon: 'plane',
    color: '#F87171',
    description: 'Проверяет, летит ли игрок',
    tags: ['flying', 'flight', 'check', 'fly'],
    fields: [],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_sneaking',
    type: 'condition',
    label: 'Is Sneaking',
    icon: 'chevron-down',
    color: '#F87171',
    description: 'Проверяет, сидит ли игрок (зажат Shift)',
    tags: ['sneaking', 'crouch', 'sneak', 'check'],
    fields: [],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_sprinting',
    type: 'condition',
    label: 'Is Sprinting',
    icon: 'chevrons-right',
    color: '#F87171',
    description: 'Проверяет, бежит ли игрок',
    tags: ['sprinting', 'run', 'sprint', 'check'],
    fields: [],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_on_ground',
    type: 'condition',
    label: 'Is On Ground',
    icon: 'earth',
    color: '#F87171',
    description: 'Проверяет, стоит ли игрок на земле',
    tags: ['ground', 'floor', 'check', 'standing'],
    fields: [],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_in_water',
    type: 'condition',
    label: 'Is In Water',
    icon: 'waves',
    color: '#F87171',
    description: 'Проверяет, находится ли игрок в воде',
    tags: ['water', 'swim', 'check', 'liquid'],
    fields: [],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_health_above',
    type: 'condition',
    label: 'Health Above',
    icon: 'heart',
    color: '#F87171',
    description: 'Проверяет, выше ли здоровье игрока указанного значения',
    tags: ['health', 'hp', 'above', 'check', 'more'],
    fields: [
      {
        key: 'value',
        label: 'Health threshold',
        type: 'number',
        defaultValue: 10,
        placeholder: '10'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_health_below',
    type: 'condition',
    label: 'Health Below',
    icon: 'heart-off',
    color: '#F87171',
    description: 'Проверяет, ниже ли здоровье игрока указанного значения',
    tags: ['health', 'hp', 'below', 'check', 'low'],
    fields: [
      {
        key: 'value',
        label: 'Health threshold',
        type: 'number',
        defaultValue: 6,
        placeholder: '6'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_random',
    type: 'condition',
    label: 'Random Chance',
    icon: 'dice-6',
    color: '#F87171',
    description: 'Случайное условие с указанным шансом в процентах',
    tags: ['random', 'chance', 'luck', 'percent', 'roll'],
    fields: [
      {
        key: 'chance',
        label: 'Chance (%)',
        type: 'number',
        defaultValue: 50,
        placeholder: '50',
        description: 'Percentage chance (1-100)'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_player_count',
    type: 'condition',
    label: 'Player Count',
    icon: 'users',
    color: '#F87171',
    description: 'Проверяет количество игроков онлайн',
    tags: ['player', 'count', 'online', 'check'],
    fields: [
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: '>=',
        options: [
          { label: 'At least (>=)', value: '>=' },
          { label: 'At most (<=)', value: '<=' },
          { label: 'Exactly (==)', value: '==' }
        ]
      },
      {
        key: 'value',
        label: 'Players',
        type: 'number',
        defaultValue: 5,
        placeholder: '5'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_light_level',
    type: 'condition',
    label: 'Light Level',
    icon: 'sun',
    color: '#F87171',
    description: 'Проверяет уровень освещения в месте игрока',
    tags: ['light', 'dark', 'check', 'brightness'],
    fields: [
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: '<',
        options: [
          { label: 'Below (<)', value: '<' },
          { label: 'Above (>)', value: '>' },
          { label: 'Equals (==)', value: '==' }
        ]
      },
      {
        key: 'value',
        label: 'Light Level',
        type: 'number',
        defaultValue: 7,
        placeholder: '7'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_killer_is_player',
    type: 'condition',
    label: 'Killer Is Player',
    icon: 'sword',
    color: '#F87171',
    description: 'Проверяет, убила ли сущность игроком (для Entity Death)',
    tags: ['killer', 'player', 'death', 'kill', 'entity'],
    fields: [],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_entity_type',
    type: 'condition',
    label: 'Entity Is Type',
    icon: 'bug',
    color: '#F87171',
    description: 'Проверяет тип сущности (для событий Entity)',
    tags: ['entity', 'type', 'check', 'mob', 'creature'],
    fields: [
      {
        key: 'entity',
        label: 'Entity Type',
        type: 'select',
        defaultValue: 'CREEPER',
        options: [
          { label: 'Creeper', value: 'CREEPER' },
          { label: 'Zombie', value: 'ZOMBIE' },
          { label: 'Skeleton', value: 'SKELETON' },
          { label: 'Spider', value: 'SPIDER' },
          { label: 'Enderman', value: 'ENDERMAN' },
          { label: 'Player', value: 'PLAYER' },
          { label: 'Cow', value: 'COW' },
          { label: 'Pig', value: 'PIG' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_block_below',
    type: 'condition',
    label: 'Block Below Is',
    icon: 'box',
    color: '#F87171',
    description: 'Проверяет тип блока под игроком на указанном расстоянии',
    tags: ['block', 'below', 'check', 'ground', 'floor'],
    fields: [
      {
        key: 'block',
        label: 'Block Type',
        type: 'select',
        defaultValue: 'DIAMOND_ORE',
        options: [
          { label: 'Diamond Ore', value: 'DIAMOND_ORE' },
          { label: 'Deepslate Diamond Ore', value: 'DEEPSLATE_DIAMOND_ORE' },
          { label: 'Iron Ore', value: 'IRON_ORE' },
          { label: 'Gold Ore', value: 'GOLD_ORE' },
          { label: 'Emerald Ore', value: 'EMERALD_ORE' },
          { label: 'Coal Ore', value: 'COAL_ORE' },
          { label: 'Stone', value: 'STONE' },
          { label: 'Dirt', value: 'DIRT' },
          { label: 'Grass Block', value: 'GRASS_BLOCK' },
          { label: 'Sand', value: 'SAND' },
          { label: 'Gravel', value: 'GRAVEL' },
          { label: 'Water', value: 'WATER' },
          { label: 'Lava', value: 'LAVA' },
          { label: 'Bedrock', value: 'BEDROCK' }
        ]
      },
      {
        key: 'offset',
        label: 'Blocks Below (1 = under feet)',
        type: 'number',
        defaultValue: 1,
        placeholder: '1',
        description: 'How many blocks below the player to check (1 = directly under feet)'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'if_var',
    type: 'condition',
    label: 'Compare Variable',
    icon: 'equal',
    color: '#F87171',
    description: 'Проверяет значение переменной по условию',
    tags: ['variable', 'var', 'compare', 'check', 'if', 'equals'],
    fields: [
      {
        key: 'variable',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'my_var',
        placeholder: 'variable_name'
      },
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: '==',
        options: [
          { label: 'Equals (==)', value: '==' },
          { label: 'Not Equals (!=)', value: '!=' },
          { label: 'Greater Than (>)', value: '>' },
          { label: 'Less Than (<)', value: '<' }
        ]
      },
      {
        key: 'value',
        label: 'Value',
        type: 'string',
        defaultValue: '10',
        placeholder: 'Value to compare'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'condition',
    branches: ['true', 'false'],
    canConnectTo: ['action', 'condition', 'variable']
  }
]
