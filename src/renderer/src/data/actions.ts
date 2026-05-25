import type { BlockDefinition } from '../types/blocks'

const delayField = {
  key: 'delay',
  label: 'Delay (ticks, 20 = 1 sec)',
  type: 'number' as const,
  defaultValue: 0,
  placeholder: '0',
  description: 'Delay before this action executes'
}

export const actions: BlockDefinition[] = [
  {
    id: 'send_message',
    type: 'action',
    label: 'Send Message',
    icon: 'message-circle',
    color: '#22D3EE',
    description: 'Отправляет сообщение в чат игроку',
    tags: ['message', 'chat', 'send', 'msg', 'tell', 'text'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'message',
        label: 'Message',
        type: 'string',
        defaultValue: 'Hello!',
        placeholder: 'Enter message text...',
        description: 'Use & for color codes'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'broadcast_message',
    type: 'action',
    label: 'Broadcast Message',
    icon: 'megaphone',
    color: '#22D3EE',
    description: 'Отправляет сообщение всем игрокам на сервере',
    tags: ['message', 'broadcast', 'chat', 'all', 'everyone', 'announce'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'message',
        label: 'Message',
        type: 'string',
        defaultValue: '&cAnnouncement!',
        placeholder: 'Message text...',
        description: 'Use & for color codes'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'send_actionbar',
    type: 'action',
    label: 'Send Action Bar',
    icon: 'align-justify',
    color: '#22D3EE',
    description: 'Отправляет сообщение в action bar (над панелью предметов)',
    tags: ['actionbar', 'action', 'bar', 'message', 'text'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'message',
        label: 'Message',
        type: 'string',
        defaultValue: 'Welcome!',
        placeholder: 'Action bar text'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'send_title',
    type: 'action',
    label: 'Send Title',
    icon: 'type',
    color: '#22D3EE',
    description: 'Показывает большой титул и подзаголовок на экране игрока',
    tags: ['title', 'subtitle', 'screen', 'display', 'text'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'title',
        label: 'Title',
        type: 'string',
        defaultValue: 'Welcome!',
        placeholder: 'Title text'
      },
      {
        key: 'subtitle',
        label: 'Subtitle',
        type: 'string',
        defaultValue: '',
        placeholder: 'Subtitle text'
      },
      {
        key: 'fadeIn',
        label: 'Fade In (ticks)',
        type: 'number',
        defaultValue: 10,
        placeholder: '10'
      },
      {
        key: 'stay',
        label: 'Stay (ticks)',
        type: 'number',
        defaultValue: 70,
        placeholder: '70'
      },
      {
        key: 'fadeOut',
        label: 'Fade Out (ticks)',
        type: 'number',
        defaultValue: 20,
        placeholder: '20'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'send_bossbar',
    type: 'action',
    label: 'Send Boss Bar',
    icon: 'columns',
    color: '#22D3EE',
    description: 'Показывает временную полосу босс-бара с сообщением',
    tags: ['bossbar', 'bar', 'message', 'display'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'message',
        label: 'Message',
        type: 'string',
        defaultValue: '&cAlert!',
        placeholder: 'Boss bar text'
      },
      {
        key: 'color',
        label: 'Color',
        type: 'select',
        defaultValue: 'RED',
        options: [
          { label: 'Red', value: 'RED' },
          { label: 'Blue', value: 'BLUE' },
          { label: 'Green', value: 'GREEN' },
          { label: 'Pink', value: 'PINK' },
          { label: 'White', value: 'WHITE' },
          { label: 'Yellow', value: 'YELLOW' },
          { label: 'Purple', value: 'PURPLE' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'teleport',
    type: 'action',
    label: 'Teleport Player',
    icon: 'map-pin',
    color: '#22D3EE',
    description: 'Телепортирует игрока по указанным координатам',
    tags: ['teleport', 'tp', 'move', 'location', 'position'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'x',
        label: 'X',
        type: 'number',
        defaultValue: 0,
        placeholder: '0'
      },
      {
        key: 'y',
        label: 'Y',
        type: 'number',
        defaultValue: 64,
        placeholder: '64'
      },
      {
        key: 'z',
        label: 'Z',
        type: 'number',
        defaultValue: 0,
        placeholder: '0'
      },
      {
        key: 'world',
        label: 'World',
        type: 'select',
        defaultValue: 'world',
        options: [
          { label: 'World', value: 'world' },
          { label: 'Nether', value: 'world_nether' },
          { label: 'The End', value: 'world_the_end' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'give_item',
    type: 'action',
    label: 'Give Item',
    icon: 'gift',
    color: '#22D3EE',
    description: 'Выдаёт предмет в инвентарь игроку',
    tags: ['item', 'give', 'inventory', 'add'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'item',
        label: 'Item',
        type: 'item',
        defaultValue: 'DIAMOND',
        description: 'Material ID (e.g. DIAMOND, GOLD_INGOT, DIAMOND_SWORD)'
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'remove_item',
    type: 'action',
    label: 'Remove Item',
    icon: 'trash-2',
    color: '#22D3EE',
    description: 'Забирает предмет из инвентаря игрока',
    tags: ['item', 'remove', 'take', 'inventory'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'item',
        label: 'Item',
        type: 'item',
        defaultValue: 'DIAMOND',
        description: 'Material ID to remove'
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'clear_inventory',
    type: 'action',
    label: 'Clear Inventory',
    icon: 'eraser',
    color: '#22D3EE',
    description: 'Очищает весь инвентарь игрока',
    tags: ['inventory', 'clear', 'remove', 'items'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'spawn_entity',
    type: 'action',
    label: 'Spawn Entity',
    icon: 'bug',
    color: '#22D3EE',
    description: 'Создаёт существо рядом с игроком',
    tags: ['spawn', 'entity', 'mob', 'summon', 'creature'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'entity',
        label: 'Entity Type',
        type: 'select',
        defaultValue: 'ZOMBIE',
        options: [
          { label: 'Zombie', value: 'ZOMBIE' },
          { label: 'Skeleton', value: 'SKELETON' },
          { label: 'Creeper', value: 'CREEPER' },
          { label: 'Spider', value: 'SPIDER' },
          { label: 'Enderman', value: 'ENDERMAN' },
          { label: 'Wolf', value: 'WOLF' },
          { label: 'Iron Golem', value: 'IRON_GOLEM' },
          { label: 'Villager', value: 'VILLAGER' },
          { label: 'Cow', value: 'COW' },
          { label: 'Pig', value: 'PIG' }
        ]
      },
      {
        key: 'amount',
        label: 'Amount',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'kill_entity',
    type: 'action',
    label: 'Kill Entity',
    icon: 'skull',
    color: '#22D3EE',
    description: 'Убивает выбранных существ рядом с игроком',
    tags: ['kill', 'entity', 'remove', 'death'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'entity',
        label: 'Entity Type',
        type: 'select',
        defaultValue: 'ZOMBIE',
        options: [
          { label: 'All Hostile', value: 'ALL_HOSTILE' },
          { label: 'All Passive', value: 'ALL_PASSIVE' },
          { label: 'Zombie', value: 'ZOMBIE' },
          { label: 'Skeleton', value: 'SKELETON' },
          { label: 'Creeper', value: 'CREEPER' },
          { label: 'Spider', value: 'SPIDER' }
        ]
      },
      {
        key: 'radius',
        label: 'Radius',
        type: 'number',
        defaultValue: 10,
        placeholder: '10'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'damage_entity',
    type: 'action',
    label: 'Damage Entity',
    icon: 'sword',
    color: '#22D3EE',
    description: 'Наносит урон существу рядом с игроком',
    tags: ['damage', 'entity', 'hurt', 'attack'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'damage',
        label: 'Damage Amount',
        type: 'number',
        defaultValue: 5,
        placeholder: '5'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'explosion',
    type: 'action',
    label: 'Create Explosion',
    icon: 'bomb',
    color: '#22D3EE',
    description: 'Создаёт взрыв в месте игрока',
    tags: ['explosion', 'explode', 'boom', 'tnt', 'blast'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'power',
        label: 'Power',
        type: 'number',
        defaultValue: 4,
        placeholder: '4.0'
      },
      {
        key: 'fire',
        label: 'Fire',
        type: 'boolean',
        defaultValue: false
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_block',
    type: 'action',
    label: 'Set Block',
    icon: 'box',
    color: '#22D3EE',
    description: 'Устанавливает блок на указанном расстоянии от игрока',
    tags: ['block', 'set', 'place', 'build'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'block',
        label: 'Block Type',
        type: 'select',
        defaultValue: 'DIAMOND_BLOCK',
        options: [
          { label: 'Diamond Block', value: 'DIAMOND_BLOCK' },
          { label: 'Gold Block', value: 'GOLD_BLOCK' },
          { label: 'Iron Block', value: 'IRON_BLOCK' },
          { label: 'Stone', value: 'STONE' },
          { label: 'Glass', value: 'GLASS' },
          { label: 'TNT', value: 'TNT' }
        ]
      },
      {
        key: 'x',
        label: 'X offset',
        type: 'number',
        defaultValue: 0,
        placeholder: '0'
      },
      {
        key: 'y',
        label: 'Y offset',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      },
      {
        key: 'z',
        label: 'Z offset',
        type: 'number',
        defaultValue: 0,
        placeholder: '0'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'play_sound',
    type: 'action',
    label: 'Play Sound',
    icon: 'volume-2',
    color: '#22D3EE',
    description: 'Проигрывает звуковой эффект для игрока',
    tags: ['sound', 'play', 'effect', 'audio'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'sound',
        label: 'Sound',
        type: 'select',
        defaultValue: 'ENTITY_EXPERIENCE_ORB_PICKUP',
        options: [
          { label: 'XP Pickup', value: 'ENTITY_EXPERIENCE_ORB_PICKUP' },
          { label: 'Explosion', value: 'ENTITY_GENERIC_EXPLODE' },
          { label: 'Level Up', value: 'ENTITY_PLAYER_LEVELUP' },
          { label: 'Anvil', value: 'BLOCK_ANVIL_USE' },
          { label: 'Thunder', value: 'ENTITY_LIGHTNING_BOLT_THUNDER' },
          { label: 'Sword Hit', value: 'ENTITY_PLAYER_ATTACK_STRONG' }
        ]
      },
      {
        key: 'volume',
        label: 'Volume',
        type: 'number',
        defaultValue: 1,
        placeholder: '1.0'
      },
      {
        key: 'pitch',
        label: 'Pitch',
        type: 'number',
        defaultValue: 1,
        placeholder: '1.0'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'execute_command',
    type: 'action',
    label: 'Execute Command',
    icon: 'terminal',
    color: '#22D3EE',
    description: 'Выполняет серверную команду от имени консоли или игрока',
    tags: ['command', 'execute', 'run', 'cmd', 'console'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'command',
        label: 'Command',
        type: 'string',
        defaultValue: '/say Hello!',
        placeholder: '/command'
      },
      {
        key: 'as_console',
        label: 'Run as Console',
        type: 'boolean',
        defaultValue: true
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'wait',
    type: 'action',
    label: 'Wait / Delay',
    icon: 'clock',
    color: '#22D3EE',
    description: 'Создаёт задержку в выполнении цепочки действий',
    tags: ['wait', 'delay', 'sleep', 'time', 'timer', 'seconds'],
    fields: [
      {
        key: 'ticks',
        label: 'Ticks (20 ticks = 1 sec)',
        type: 'number',
        defaultValue: 20,
        placeholder: '20'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'flow',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'kick_player',
    type: 'action',
    label: 'Kick Player',
    icon: 'user-x',
    color: '#22D3EE',
    description: 'Выкидывает игрока с сервера с указанной причиной',
    tags: ['kick', 'ban', 'remove', 'player'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'reason',
        label: 'Reason',
        type: 'string',
        defaultValue: 'You have been kicked!',
        placeholder: 'Kick reason'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_gamemode',
    type: 'action',
    label: 'Set Gamemode',
    icon: 'gamepad-2',
    color: '#22D3EE',
    description: 'Изменяет режим игры игроку',
    tags: ['gamemode', 'gm', 'survival', 'creative', 'adventure', 'spectator', 'mode'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
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
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'heal_player',
    type: 'action',
    label: 'Heal Player',
    icon: 'heart',
    color: '#22D3EE',
    description: 'Лечит игрока на указанное количество HP',
    tags: ['heal', 'health', 'hp', 'regen', 'cure'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'amount',
        label: 'Heal Amount',
        type: 'number',
        defaultValue: 10,
        placeholder: '10'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_health',
    type: 'action',
    label: 'Set Health',
    icon: 'heart-pulse',
    color: '#22D3EE',
    description: 'Устанавливает здоровье игрока на точное значение',
    tags: ['health', 'set', 'hp', 'exact'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'health',
        label: 'Health',
        type: 'number',
        defaultValue: 20,
        placeholder: '20'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_food',
    type: 'action',
    label: 'Set Food Level',
    icon: 'utensils-crossed',
    color: '#22D3EE',
    description: 'Устанавливает уровень еды и насыщения игроку',
    tags: ['food', 'hunger', 'feed', 'saturation'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'food',
        label: 'Food Level',
        type: 'number',
        defaultValue: 20,
        placeholder: '20'
      },
      {
        key: 'saturation',
        label: 'Saturation',
        type: 'number',
        defaultValue: 10,
        placeholder: '10'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'lightning',
    type: 'action',
    label: 'Strike Lightning',
    icon: 'zap',
    color: '#22D3EE',
    description: 'Бьёт молнией в местоположение игрока',
    tags: ['lightning', 'bolt', 'thunder', 'strike', 'weather'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'apply_effect',
    type: 'action',
    label: 'Apply Potion Effect',
    icon: 'flask-conical',
    color: '#22D3EE',
    description: 'Накладывает эффект зелья на игрока',
    tags: ['potion', 'effect', 'buff', 'debuff', 'status'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'effect',
        label: 'Effect',
        type: 'select',
        defaultValue: 'SPEED',
        options: [
          { label: 'Speed', value: 'SPEED' },
          { label: 'Slowness', value: 'SLOWNESS' },
          { label: 'Haste', value: 'HASTE' },
          { label: 'Mining Fatigue', value: 'MINING_FATIGUE' },
          { label: 'Strength', value: 'STRENGTH' },
          { label: 'Jump Boost', value: 'JUMP_BOOST' },
          { label: 'Regeneration', value: 'REGENERATION' },
          { label: 'Resistance', value: 'RESISTANCE' },
          { label: 'Fire Resistance', value: 'FIRE_RESISTANCE' },
          { label: 'Water Breathing', value: 'WATER_BREATHING' },
          { label: 'Invisibility', value: 'INVISIBILITY' },
          { label: 'Blindness', value: 'BLINDNESS' },
          { label: 'Night Vision', value: 'NIGHT_VISION' },
          { label: 'Poison', value: 'POISON' },
          { label: 'Wither', value: 'WITHER' },
          { label: 'Glowing', value: 'GLOWING' },
          { label: 'Levitation', value: 'LEVITATION' },
          { label: 'Luck', value: 'LUCK' }
        ]
      },
      {
        key: 'duration',
        label: 'Duration (ticks)',
        type: 'number',
        defaultValue: 100,
        placeholder: '100'
      },
      {
        key: 'amplifier',
        label: 'Amplifier (level-1)',
        type: 'number',
        defaultValue: 0,
        placeholder: '0'
      },
      {
        key: 'particles',
        label: 'Show Particles',
        type: 'boolean',
        defaultValue: true
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'remove_effect',
    type: 'action',
    label: 'Remove Effect',
    icon: 'flask-conical-off',
    color: '#22D3EE',
    description: 'Снимает эффект зелья с игрока',
    tags: ['potion', 'effect', 'remove', 'clear', 'debuff'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'effect',
        label: 'Effect',
        type: 'select',
        defaultValue: 'POISON',
        options: [
          { label: 'All Effects', value: 'ALL' },
          { label: 'Speed', value: 'SPEED' },
          { label: 'Slowness', value: 'SLOWNESS' },
          { label: 'Poison', value: 'POISON' },
          { label: 'Wither', value: 'WITHER' },
          { label: 'Blindness', value: 'BLINDNESS' },
          { label: 'Levitation', value: 'LEVITATION' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'give_experience',
    type: 'action',
    label: 'Give Experience',
    icon: 'sparkles',
    color: '#22D3EE',
    description: 'Даёт игроку опыт',
    tags: ['xp', 'experience', 'level', 'exp'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'amount',
        label: 'XP Amount',
        type: 'number',
        defaultValue: 100,
        placeholder: '100'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_experience',
    type: 'action',
    label: 'Set Level',
    icon: 'sigma',
    color: '#22D3EE',
    description: 'Устанавливает игроку уровень опыта',
    tags: ['xp', 'experience', 'level', 'set', 'exp'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'level',
        label: 'Level',
        type: 'number',
        defaultValue: 10,
        placeholder: '10'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_velocity',
    type: 'action',
    label: 'Set Velocity (Push)',
    icon: 'arrow-up',
    color: '#22D3EE',
    description: 'Запускает игрока в указанном направлении',
    tags: ['velocity', 'push', 'launch', 'knockback', 'throw'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'x',
        label: 'X velocity',
        type: 'number',
        defaultValue: 0,
        placeholder: '0'
      },
      {
        key: 'y',
        label: 'Y velocity (up)',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      },
      {
        key: 'z',
        label: 'Z velocity',
        type: 'number',
        defaultValue: 0,
        placeholder: '0'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'launch_projectile',
    type: 'action',
    label: 'Launch Projectile',
    icon: 'crosshair',
    color: '#22D3EE',
    description: 'Запускает снаряд от имени игрока',
    tags: ['projectile', 'launch', 'shoot', 'arrow', 'fireball'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'projectile',
        label: 'Projectile Type',
        type: 'select',
        defaultValue: 'ARROW',
        options: [
          { label: 'Arrow', value: 'ARROW' },
          { label: 'Snowball', value: 'SNOWBALL' },
          { label: 'Egg', value: 'EGG' },
          { label: 'Fireball', value: 'FIREBALL' },
          { label: 'Small Fireball', value: 'SMALL_FIREBALL' },
          { label: 'Trident', value: 'TRIDENT' },
          { label: 'Wither Skull', value: 'WITHER_SKULL' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_time',
    type: 'action',
    label: 'Set World Time',
    icon: 'sun',
    color: '#22D3EE',
    description: 'Устанавливает время суток в мире игрока',
    tags: ['time', 'world', 'day', 'night', 'set'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'time',
        label: 'Time',
        type: 'select',
        defaultValue: '1000',
        options: [
          { label: 'Day (1000)', value: '1000' },
          { label: 'Noon (6000)', value: '6000' },
          { label: 'Night (13000)', value: '13000' },
          { label: 'Midnight (18000)', value: '18000' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_weather',
    type: 'action',
    label: 'Set Weather',
    icon: 'cloud-sun',
    color: '#22D3EE',
    description: 'Меняет погоду в мире игрока',
    tags: ['weather', 'rain', 'clear', 'storm', 'sun', 'world'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'weather',
        label: 'Weather',
        type: 'select',
        defaultValue: 'CLEAR',
        options: [
          { label: 'Clear', value: 'CLEAR' },
          { label: 'Rain', value: 'RAIN' },
          { label: 'Thunder', value: 'THUNDER' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_difficulty',
    type: 'action',
    label: 'Set Difficulty',
    icon: 'alert-triangle',
    color: '#22D3EE',
    description: 'Меняет сложность игры',
    tags: ['difficulty', 'peaceful', 'easy', 'normal', 'hard'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'difficulty',
        label: 'Difficulty',
        type: 'select',
        defaultValue: 'NORMAL',
        options: [
          { label: 'Peaceful', value: 'PEACEFUL' },
          { label: 'Easy', value: 'EASY' },
          { label: 'Normal', value: 'NORMAL' },
          { label: 'Hard', value: 'HARD' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'spawn_particles',
    type: 'action',
    label: 'Spawn Particles',
    icon: 'sparkle',
    color: '#22D3EE',
    description: 'Создаёт частицы вокруг местоположения игрока',
    tags: ['particle', 'spawn', 'effect', 'visual'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'particle',
        label: 'Particle Type',
        type: 'select',
        defaultValue: 'FLAME',
        options: [
          { label: 'Flame', value: 'FLAME' },
          { label: 'Heart', value: 'HEART' },
          { label: 'Happy Villager', value: 'VILLAGER_HAPPY' },
          { label: 'Angry Villager', value: 'VILLAGER_ANGRY' },
          { label: 'Note', value: 'NOTE' },
          { label: 'Enchantment', value: 'ENCHANTMENT_TABLE' },
          { label: 'Portal', value: 'PORTAL' },
          { label: 'Lava', value: 'LAVA' },
          { label: 'Water Splash', value: 'WATER_SPLASH' },
          { label: 'Cloud', value: 'CLOUD' },
          { label: 'Crit', value: 'CRIT' },
          { label: 'Magic Crit', value: 'CRIT_MAGIC' },
          { label: 'End Rod', value: 'END_ROD' },
          { label: 'Dust', value: 'REDSTONE' }
        ]
      },
      {
        key: 'count',
        label: 'Count',
        type: 'number',
        defaultValue: 20,
        placeholder: '20'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_fire_ticks',
    type: 'action',
    label: 'Set On Fire',
    icon: 'flame',
    color: '#22D3EE',
    description: 'Поджигает игрока на указанное количество тиков',
    tags: ['fire', 'burn', 'flame', 'combust'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'ticks',
        label: 'Burn Time (ticks)',
        type: 'number',
        defaultValue: 100,
        placeholder: '100'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_glowing',
    type: 'action',
    label: 'Set Glowing',
    icon: 'sunrise',
    color: '#22D3EE',
    description: 'Включает или выключает свечение игрока',
    tags: ['glow', 'glowing', 'effect', 'visual'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'glowing',
        label: 'Glowing',
        type: 'boolean',
        defaultValue: true
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'set_walk_speed',
    type: 'action',
    label: 'Set Walk Speed',
    icon: 'footprints',
    color: '#22D3EE',
    description: 'Устанавливает скорость ходьбы игрока',
    tags: ['speed', 'walk', 'move', 'slow', 'fast'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'speed',
        label: 'Speed (0.1-1.0)',
        type: 'number',
        defaultValue: 0.2,
        placeholder: '0.2'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'toggle_flight',
    type: 'action',
    label: 'Allow Flight',
    icon: 'plane',
    color: '#22D3EE',
    description: 'Включает или выключает возможность летать',
    tags: ['fly', 'flight', 'allow', 'toggle'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'allow',
        label: 'Allow Flight',
        type: 'boolean',
        defaultValue: true
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'play_animation',
    type: 'action',
    label: 'Play Animation',
    icon: 'monitor-play',
    color: '#22D3EE',
    description: 'Проигрывает анимацию (например, взмах рукой)',
    tags: ['animation', 'play', 'arm', 'swing', 'effect'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      },
      {
        key: 'animation',
        label: 'Animation',
        type: 'select',
        defaultValue: 'SWING_MAIN',
        options: [
          { label: 'Swing Main Hand', value: 'SWING_MAIN' },
          { label: 'Swing Off Hand', value: 'SWING_OFF' },
          { label: 'Take Damage', value: 'TAKE_DAMAGE' },
          { label: 'Crit', value: 'CRIT' },
          { label: 'Wake Up', value: 'WAKE_UP' }
        ]
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'close_inventory',
    type: 'action',
    label: 'Close Inventory',
    icon: 'panel-close',
    color: '#22D3EE',
    description: 'Закрывает открытый инвентарь игрока',
    tags: ['inventory', 'close', 'gui', 'screen'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...',
        description: 'Apply action to another player by name'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'cancel_event',
    type: 'action',
    label: 'Cancel Event',
    icon: 'ban',
    color: '#22D3EE',
    description: 'Отменяет событие или очищает список разрушаемых блоков (для EntityExplode)',
    tags: ['cancel', 'event', 'stop', 'prevent', 'block', 'explosion'],
    fields: [
      delayField,
      {
        key: 'clear_blocks',
        label: 'Clear block list (EntityExplode)',
        type: 'boolean',
        defaultValue: true,
        description: 'Clear the list of destroyed blocks instead of cancelling the whole event'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'damage_event_entity',
    type: 'action',
    label: 'Damage Event Entity',
    icon: 'sword',
    color: '#22D3EE',
    description: 'Наносит урон сущности из контекста события (например, взрывающемуся криперу)',
    tags: ['damage', 'entity', 'hurt', 'event', 'creeper'],
    fields: [
      delayField,
      {
        key: 'damage',
        label: 'Damage Amount',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'repeat',
    type: 'action',
    label: 'Repeat',
    icon: 'repeat',
    color: '#22D3EE',
    description: 'Повторяет вложенные действия по таймеру',
    tags: ['repeat', 'timer', 'loop', 'schedule', 'periodic'],
    fields: [
      {
        key: 'interval',
        label: 'Interval (ticks, 20 = 1 sec)',
        type: 'number',
        defaultValue: 20,
        placeholder: '20'
      },
      {
        key: 'times',
        label: 'Repeat Count (0 = infinite)',
        type: 'number',
        defaultValue: 0,
        placeholder: '0'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'flow',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'create_gui',
    type: 'action',
    label: 'Create GUI',
    icon: 'layout-grid',
    color: '#22D3EE',
    description: 'Создает графический интерфейс (инвентарь) с настраиваемыми слотами',
    tags: ['gui', 'inventory', 'menu', 'chest', 'interface'],
    fields: [
      {
        key: 'gui_id',
        label: 'GUI ID',
        type: 'string',
        defaultValue: 'my_gui',
        placeholder: 'my_gui',
        description: 'Unique identifier for this GUI'
      },
      {
        key: 'title',
        label: 'GUI Title',
        type: 'string',
        defaultValue: 'Menu',
        placeholder: 'Menu',
        description: 'Title displayed at the top of the GUI'
      },
      {
        key: 'rows',
        label: 'Rows (1-6)',
        type: 'number',
        defaultValue: 3,
        placeholder: '3',
        description: 'Number of inventory rows'
      },
      {
        key: 'slots',
        label: 'Slots (JSON)',
        type: 'string',
        defaultValue: '[]',
        description: 'Slot configuration as JSON array'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'open_gui',
    type: 'action',
    label: 'Open GUI',
    icon: 'external-link',
    color: '#22D3EE',
    description: 'Открывает созданный GUI игроку',
    tags: ['gui', 'inventory', 'open', 'menu', 'show'],
    fields: [
      delayField,
      {
        key: 'target_player',
        label: 'Target Player (leave empty for self)',
        type: 'string',
        defaultValue: '',
        placeholder: 'Player name...'
      },
      {
        key: 'gui_id',
        label: 'GUI ID',
        type: 'string',
        defaultValue: 'my_gui',
        placeholder: 'my_gui',
        description: 'ID of the GUI to open'
      }
    ],
    hasInput: true,
    hasOutput: false,
    canConnectTo: ['action', 'condition', 'variable']
  }
]
