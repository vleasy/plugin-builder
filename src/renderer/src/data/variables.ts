import type { BlockDefinition } from '../types/blocks'

export const variables: BlockDefinition[] = [
  {
    id: 'set_var',
    type: 'variable',
    label: 'Set Variable',
    icon: 'save',
    color: '#A78BFA',
    description: 'Устанавливает переменную с указанным именем и значением',
    tags: ['variable', 'set', 'assign', 'var', 'store'],
    fields: [
      {
        key: 'name',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'my_var',
        placeholder: 'variable_name'
      },
      {
        key: 'value',
        label: 'Value',
        type: 'string',
        defaultValue: '0',
        placeholder: 'Value'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'increment_var',
    type: 'variable',
    label: 'Increment Variable',
    icon: 'plus',
    color: '#A78BFA',
    description: 'Увеличивает числовую переменную на указанное значение',
    tags: ['variable', 'increment', 'add', 'increase', '++'],
    fields: [
      {
        key: 'name',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'counter',
        placeholder: 'variable_name'
      },
      {
        key: 'value',
        label: 'Add Value',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'decrement_var',
    type: 'variable',
    label: 'Decrement Variable',
    icon: 'minus',
    color: '#A78BFA',
    description: 'Уменьшает числовую переменную на указанное значение',
    tags: ['variable', 'decrement', 'subtract', 'decrease', '--'],
    fields: [
      {
        key: 'name',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'counter',
        placeholder: 'variable_name'
      },
      {
        key: 'value',
        label: 'Subtract Value',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'math_op',
    type: 'variable',
    label: 'Math Operation',
    icon: 'calculator',
    color: '#A78BFA',
    description: 'Выполняет математическую операцию над двумя переменными',
    tags: ['math', 'calculate', 'add', 'subtract', 'multiply', 'divide', 'number'],
    fields: [
      {
        key: 'var_a',
        label: 'Variable A',
        type: 'string',
        defaultValue: 'var1',
        placeholder: 'variable_a'
      },
      {
        key: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: '+',
        options: [
          { label: 'Add (+)', value: '+' },
          { label: 'Subtract (-)', value: '-' },
          { label: 'Multiply (*)', value: '*' },
          { label: 'Divide (/)', value: '/' }
        ]
      },
      {
        key: 'var_b',
        label: 'Variable B (or number)',
        type: 'string',
        defaultValue: 'var2',
        placeholder: 'variable_b'
      },
      {
        key: 'result',
        label: 'Result Variable',
        type: 'string',
        defaultValue: 'result',
        placeholder: 'result_var'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'random_int',
    type: 'variable',
    label: 'Random Integer',
    icon: 'dice-6',
    color: '#A78BFA',
    description: 'Генерирует случайное число в указанном диапазоне',
    tags: ['random', 'rand', 'number', 'int', 'generate'],
    fields: [
      {
        key: 'min',
        label: 'Minimum',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      },
      {
        key: 'max',
        label: 'Maximum',
        type: 'number',
        defaultValue: 100,
        placeholder: '100'
      },
      {
        key: 'result',
        label: 'Result Variable',
        type: 'string',
        defaultValue: 'random',
        placeholder: 'result_var'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'concat_text',
    type: 'variable',
    label: 'Combine Text',
    icon: 'text-cursor',
    color: '#A78BFA',
    description: 'Соединяет два текста в один (конкатенация)',
    tags: ['text', 'combine', 'concat', 'string', 'join', 'append'],
    fields: [
      {
        key: 'text_a',
        label: 'Text A',
        type: 'string',
        defaultValue: 'Hello ',
        placeholder: 'First text'
      },
      {
        key: 'text_b',
        label: 'Text B',
        type: 'string',
        defaultValue: 'World!',
        placeholder: 'Second text'
      },
      {
        key: 'result',
        label: 'Result Variable',
        type: 'string',
        defaultValue: 'combined',
        placeholder: 'result_var'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'store_player_name',
    type: 'variable',
    label: 'Store Player Name',
    icon: 'user',
    color: '#A78BFA',
    description: 'Сохраняет имя игрока в переменную',
    tags: ['player', 'name', 'store', 'variable', 'string'],
    fields: [
      {
        key: 'result',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'player_name',
        placeholder: 'variable_name'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'store_player_uuid',
    type: 'variable',
    label: 'Store Player UUID',
    icon: 'fingerprint',
    color: '#A78BFA',
    description: 'Сохраняет UUID игрока в переменную',
    tags: ['player', 'uuid', 'store', 'variable', 'id'],
    fields: [
      {
        key: 'result',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'player_uuid',
        placeholder: 'variable_name'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'store_player_health',
    type: 'variable',
    label: 'Store Player Health',
    icon: 'heart',
    color: '#A78BFA',
    description: 'Сохраняет текущее здоровье игрока в переменную',
    tags: ['player', 'health', 'store', 'variable', 'hp'],
    fields: [
      {
        key: 'result',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'health',
        placeholder: 'variable_name'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'store_player_x',
    type: 'variable',
    label: 'Store Player X',
    icon: 'arrow-right',
    color: '#A78BFA',
    description: 'Сохраняет X координату игрока в переменную',
    tags: ['player', 'x', 'coordinate', 'store', 'location', 'pos'],
    fields: [
      {
        key: 'result',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'pos_x',
        placeholder: 'variable_name'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'store_player_y',
    type: 'variable',
    label: 'Store Player Y',
    icon: 'arrow-up',
    color: '#A78BFA',
    description: 'Сохраняет Y координату игрока в переменную',
    tags: ['player', 'y', 'coordinate', 'store', 'location', 'pos'],
    fields: [
      {
        key: 'result',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'pos_y',
        placeholder: 'variable_name'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'store_player_z',
    type: 'variable',
    label: 'Store Player Z',
    icon: 'arrow-down',
    color: '#A78BFA',
    description: 'Сохраняет Z координату игрока в переменную',
    tags: ['player', 'z', 'coordinate', 'store', 'location', 'pos'],
    fields: [
      {
        key: 'result',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'pos_z',
        placeholder: 'variable_name'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'store_random_player',
    type: 'variable',
    label: 'Store Random Player',
    icon: 'shuffle',
    color: '#A78BFA',
    description: 'Сохраняет имя случайного игрока онлайн в переменную',
    tags: ['player', 'random', 'store', 'variable', 'pick'],
    fields: [
      {
        key: 'result',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'random_player',
        placeholder: 'variable_name'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  },
  {
    id: 'get_command_arg',
    type: 'variable',
    label: 'Get Command Arg',
    icon: 'terminal',
    color: '#A78BFA',
    description: 'Извлекает аргумент из команды, которая вызвала событие',
    tags: ['command', 'arg', 'argument', 'parse', 'command', 'parameter'],
    fields: [
      {
        key: 'index',
        label: 'Argument Index (0 = command, 1 = first arg)',
        type: 'number',
        defaultValue: 1,
        placeholder: '1'
      },
      {
        key: 'result',
        label: 'Variable Name',
        type: 'string',
        defaultValue: 'target_arg',
        placeholder: 'variable_name'
      }
    ],
    hasInput: true,
    hasOutput: true,
    outputType: 'variable',
    canConnectTo: ['action', 'condition', 'variable']
  }
]
