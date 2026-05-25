import type { BlockDefinition } from '../types/blocks'

export const triggers: BlockDefinition[] = [
  {
    id: 'player_join',
    type: 'trigger',
    label: 'Player Join',
    icon: 'log-in',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок заходит на сервер',
    tags: ['player', 'join', 'login', 'enter'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_leave',
    type: 'trigger',
    label: 'Player Leave',
    icon: 'log-out',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок выходит с сервера',
    tags: ['player', 'leave', 'quit', 'disconnect', 'exit'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_first_join',
    type: 'trigger',
    label: 'First Join',
    icon: 'star',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок заходит на сервер впервые',
    tags: ['player', 'first', 'join', 'new', 'welcome'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_command',
    type: 'trigger',
    label: 'Player Command',
    icon: 'terminal',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок вводит команду в чат',
    tags: ['player', 'command', 'cmd', 'execute', 'chat'],
    fields: [
      {
        key: 'command',
        label: 'Command',
        type: 'string',
        defaultValue: '/hello',
        placeholder: '/command',
        description: 'The command to listen for (without slash)'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_death',
    type: 'trigger',
    label: 'Player Death',
    icon: 'skull',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок умирает',
    tags: ['player', 'death', 'die', 'kill', 'respawn'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_respawn',
    type: 'trigger',
    label: 'Player Respawn',
    icon: 'rotate-ccw',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок возрождается после смерти',
    tags: ['player', 'respawn', 'death', 'spawn', 'revive'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_advancement',
    type: 'trigger',
    label: 'Player Advancement',
    icon: 'trophy',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок получает достижение',
    tags: ['player', 'advancement', 'achievement', 'earn'],
    fields: [
      {
        key: 'advancement',
        label: 'Advancement (optional)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Leave empty for any',
        description: 'Specific advancement ID'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_level_change',
    type: 'trigger',
    label: 'Player Level Change',
    icon: 'sigma',
    color: '#FBBF24',
    description: 'Срабатывает, когда у игрока меняется уровень опыта',
    tags: ['player', 'level', 'xp', 'experience', 'change'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_drop_item',
    type: 'trigger',
    label: 'Player Drop Item',
    icon: 'arrow-down-from-line',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок выбрасывает предмет из инвентаря',
    tags: ['player', 'drop', 'item', 'throw', 'inventory'],
    fields: [
      {
        key: 'item',
        label: 'Item (optional)',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Item', value: 'any' },
          { label: 'Diamond', value: 'DIAMOND' },
          { label: 'Sword', value: 'DIAMOND_SWORD' }
        ],
        description: 'Filter by item type'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player_item',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_pickup_item',
    type: 'trigger',
    label: 'Player Pickup Item',
    icon: 'arrow-up-from-line',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок подбирает предмет с земли',
    tags: ['player', 'pickup', 'item', 'collect', 'inventory'],
    fields: [
      {
        key: 'item',
        label: 'Item (optional)',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Item', value: 'any' },
          { label: 'Diamond', value: 'DIAMOND' },
          { label: 'Arrow', value: 'ARROW' }
        ],
        description: 'Filter by item type'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player_item',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_consume',
    type: 'trigger',
    label: 'Player Consume',
    icon: 'utensils-crossed',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок съедает или выпивает предмет',
    tags: ['player', 'eat', 'drink', 'consume', 'food', 'potion'],
    fields: [
      {
        key: 'item',
        label: 'Item (optional)',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Food', value: 'any' },
          { label: 'Golden Apple', value: 'GOLDEN_APPLE' },
          { label: 'Cooked Beef', value: 'COOKED_BEEF' },
          { label: 'Potion', value: 'POTION' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_teleport',
    type: 'trigger',
    label: 'Player Teleport',
    icon: 'map-pin',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок телепортируется',
    tags: ['player', 'teleport', 'tp', 'move', 'portal'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_toggle_sneak',
    type: 'trigger',
    label: 'Player Sneak Toggle',
    icon: 'chevron-down',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок садится или встаёт (шифт)',
    tags: ['player', 'sneak', 'crouch', 'toggle'],
    fields: [
      {
        key: 'sneaking',
        label: 'State',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any', value: 'any' },
          { label: 'Start Sneaking', value: 'true' },
          { label: 'Stop Sneaking', value: 'false' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_toggle_sprint',
    type: 'trigger',
    label: 'Player Sprint Toggle',
    icon: 'chevrons-right',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок начинает или прекращает бег',
    tags: ['player', 'sprint', 'run', 'toggle'],
    fields: [
      {
        key: 'sprinting',
        label: 'State',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any', value: 'any' },
          { label: 'Start Sprinting', value: 'true' },
          { label: 'Stop Sprinting', value: 'false' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_bucket_empty',
    type: 'trigger',
    label: 'Bucket Empty',
    icon: 'droplets',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок выливает ведро',
    tags: ['player', 'bucket', 'water', 'lava', 'empty', 'fluid'],
    fields: [
      {
        key: 'fluid',
        label: 'Fluid Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any', value: 'any' },
          { label: 'Water', value: 'WATER' },
          { label: 'Lava', value: 'LAVA' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_bucket_fill',
    type: 'trigger',
    label: 'Bucket Fill',
    icon: 'droplet',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок наполняет ведро',
    tags: ['player', 'bucket', 'fill', 'water', 'lava', 'fluid'],
    fields: [
      {
        key: 'fluid',
        label: 'Fluid Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any', value: 'any' },
          { label: 'Water', value: 'WATER' },
          { label: 'Lava', value: 'LAVA' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'block_break',
    type: 'trigger',
    label: 'Block Break',
    icon: 'pickaxe',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок ломает блок',
    tags: ['block', 'break', 'mine', 'destroy'],
    fields: [
      {
        key: 'block',
        label: 'Block Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Block', value: 'any' },
          { label: 'Stone', value: 'STONE' },
          { label: 'Diamond Ore', value: 'DIAMOND_ORE' },
          { label: 'Oak Log', value: 'OAK_LOG' },
          { label: 'Dirt', value: 'DIRT' },
          { label: 'Grass Block', value: 'GRASS_BLOCK' },
          { label: 'Ancient Debris', value: 'ANCIENT_DEBRIS' }
        ],
        description: 'Filter by block type'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player_block',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'block_place',
    type: 'trigger',
    label: 'Block Place',
    icon: 'cubes',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок ставит блок',
    tags: ['block', 'place', 'build'],
    fields: [
      {
        key: 'block',
        label: 'Block Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Block', value: 'any' },
          { label: 'Stone', value: 'STONE' },
          { label: 'Diamond Block', value: 'DIAMOND_BLOCK' },
          { label: 'Dirt', value: 'DIRT' },
          { label: 'TNT', value: 'TNT' }
        ],
        description: 'Filter by block type'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player_block',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'block_explode',
    type: 'trigger',
    label: 'Block Explode',
    icon: 'bomb',
    color: '#FBBF24',
    description: 'Срабатывает, когда происходит взрыв блока',
    tags: ['block', 'explode', 'boom', 'tnt', 'blast', 'creeper'],
    fields: [
      {
        key: 'block',
        label: 'Block Type (optional)',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Block', value: 'any' },
          { label: 'TNT', value: 'TNT' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'block',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'block_grow',
    type: 'trigger',
    label: 'Block Grow',
    icon: 'sprout',
    color: '#FBBF24',
    description: 'Срабатывает, когда растение растёт (например, пшеница)',
    tags: ['block', 'grow', 'crop', 'plant', 'farm', 'wheat'],
    fields: [
      {
        key: 'crop',
        label: 'Crop Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Crop', value: 'any' },
          { label: 'Wheat', value: 'WHEAT' },
          { label: 'Carrots', value: 'CARROTS' },
          { label: 'Potatoes', value: 'POTATOES' },
          { label: 'Beetroots', value: 'BEETROOTS' },
          { label: 'Nether Wart', value: 'NETHER_WART' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'block',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'entity_damage',
    type: 'trigger',
    label: 'Entity Damage',
    icon: 'sword',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок атакует другое существо',
    tags: ['damage', 'hurt', 'entity', 'combat'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'player_entity',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'entity_death',
    type: 'trigger',
    label: 'Entity Death',
    icon: 'skull',
    color: '#FBBF24',
    description: 'Срабатывает, когда любое существо умирает',
    tags: ['entity', 'death', 'kill', 'mob', 'die'],
    fields: [
      {
        key: 'entity',
        label: 'Entity Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Entity', value: 'any' },
          { label: 'Zombie', value: 'ZOMBIE' },
          { label: 'Skeleton', value: 'SKELETON' },
          { label: 'Creeper', value: 'CREEPER' },
          { label: 'Cow', value: 'COW' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'entity',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'entity_tame',
    type: 'trigger',
    label: 'Entity Tame',
    icon: 'heart-handshake',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок приручает животное',
    tags: ['entity', 'tame', 'animal', 'pet', 'wolf', 'cat'],
    fields: [
      {
        key: 'entity',
        label: 'Entity Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any', value: 'any' },
          { label: 'Wolf', value: 'WOLF' },
          { label: 'Cat', value: 'CAT' },
          { label: 'Parrot', value: 'PARROT' },
          { label: 'Horse', value: 'HORSE' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player_entity',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'entity_breed',
    type: 'trigger',
    label: 'Entity Breed',
    icon: 'heart',
    color: '#FBBF24',
    description: 'Срабатывает, когда животные размножаются',
    tags: ['entity', 'breed', 'animal', 'love', 'baby'],
    fields: [
      {
        key: 'entity',
        label: 'Animal Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any', value: 'any' },
          { label: 'Cow', value: 'COW' },
          { label: 'Sheep', value: 'SHEEP' },
          { label: 'Pig', value: 'PIG' },
          { label: 'Chicken', value: 'CHICKEN' },
          { label: 'Rabbit', value: 'RABBIT' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player_entity',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'projectile_hit',
    type: 'trigger',
    label: 'Projectile Hit',
    icon: 'crosshair',
    color: '#FBBF24',
    description: 'Срабатывает, когда снаряд (стрела, снежок) попадает в цель',
    tags: ['projectile', 'hit', 'arrow', 'snowball', 'egg', 'fireball'],
    fields: [
      {
        key: 'projectile',
        label: 'Projectile Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any', value: 'any' },
          { label: 'Arrow', value: 'ARROW' },
          { label: 'Snowball', value: 'SNOWBALL' },
          { label: 'Egg', value: 'EGG' },
          { label: 'Trident', value: 'TRIDENT' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'projectile',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'weather_change',
    type: 'trigger',
    label: 'Weather Change',
    icon: 'cloud-sun',
    color: '#FBBF24',
    description: 'Срабатывает, когда меняется погода в мире',
    tags: ['weather', 'change', 'rain', 'clear', 'storm', 'thunder'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'server',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'server_start',
    type: 'trigger',
    label: 'Server Start',
    icon: 'power',
    color: '#FBBF24',
    description: 'Срабатывает при запуске сервера',
    tags: ['server', 'start', 'load', 'enable', 'init'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'server',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'server_stop',
    type: 'trigger',
    label: 'Server Stop',
    icon: 'power-off',
    color: '#FBBF24',
    description: 'Срабатывает при остановке сервера',
    tags: ['server', 'stop', 'disable', 'shutdown'],
    fields: [],
    hasInput: false,
    hasOutput: true,
    outputType: 'server',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'entity_explode',
    type: 'trigger',
    label: 'Entity Explode',
    icon: 'bomb',
    color: '#FBBF24',
    description: 'Срабатывает, когда любая сущность взрывается (крипер, тнт и т.д.)',
    tags: ['entity', 'explode', 'creeper', 'tnt', 'boom', 'blast'],
    fields: [
      {
        key: 'entity',
        label: 'Entity Type (optional)',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Entity', value: 'any' },
          { label: 'Creeper', value: 'CREEPER' },
          { label: 'TNT', value: 'TNT' },
          { label: 'Fireball', value: 'FIREBALL' },
          { label: 'Wither Skull', value: 'WITHER_SKULL' }
        ],
        description: 'Filter by exploding entity type'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'entity',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_move',
    type: 'trigger',
    label: 'Player Move',
    icon: 'move',
    color: '#FBBF24',
    description: 'Срабатывает при каждом движении игрока (ВНИМАНИЕ: очень частое событие!)',
    tags: ['player', 'move', 'walk', 'run', 'position'],
    fields: [
      {
        key: 'min_distance',
        label: 'Min distance (blocks)',
        type: 'number',
        defaultValue: 0,
        placeholder: '0',
        description: 'Minimum distance moved to trigger (0 = every tick)'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'player_interact',
    type: 'trigger',
    label: 'Player Interact',
    icon: 'hand',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок взаимодействует с блоком или предметом',
    tags: ['player', 'interact', 'click', 'right-click'],
    fields: [
      {
        key: 'action',
        label: 'Action Type',
        type: 'select',
        defaultValue: 'any',
        options: [
          { label: 'Any Action', value: 'any' },
          { label: 'Right Click Block', value: 'RIGHT_CLICK_BLOCK' },
          { label: 'Left Click Block', value: 'LEFT_CLICK_BLOCK' },
          { label: 'Right Click Air', value: 'RIGHT_CLICK_AIR' }
        ]
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'chat_message',
    type: 'trigger',
    label: 'Chat Message',
    icon: 'message-square',
    color: '#FBBF24',
    description: 'Срабатывает, когда игрок пишет сообщение в чат',
    tags: ['player', 'chat', 'message', 'say', 'talk'],
    fields: [
      {
        key: 'contains',
        label: 'Contains Text (optional)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Leave empty for all messages',
        description: 'Filter messages containing this text'
      }
    ],
    hasInput: false,
    hasOutput: true,
    outputType: 'player_message',
    canConnectTo: ['action', 'condition', 'variable']
  }
]
