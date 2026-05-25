import React, { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { getBlockById } from '../data'
import { useEditorStore } from '../store/editorStore'
import type { BlockCategory, BlockDefinition } from '../types/blocks'
import { Zap, Play, GitBranch, Variable, MessageCircle, MapPin, Gift, Bug, Bomb, Box, Volume2, Terminal, Clock, User, UserX, Gamepad2, Heart, Type, LogIn, LogOut, Skull, Pickaxe, Boxes, Sword, Power, Hand, MessageSquare, Shield, Backpack, TreePine, Equal, Save, Calculator, Dice6, TextCursor, Plane, Repeat, Ban, Move } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

const iconMap: Record<string, LucideIcon> = {
  'zap': Zap, 'play': Play, 'git-branch': GitBranch, 'variable': Variable,
  'message-circle': MessageCircle, 'map-pin': MapPin, 'gift': Gift,
  'bug': Bug, 'bomb': Bomb, 'box': Box, 'volume-2': Volume2,
  'terminal': Terminal, 'clock': Clock, 'user-x': UserX,
  'gamepad-2': Gamepad2, 'heart': Heart, 'type': Type,
  'log-in': LogIn, 'log-out': LogOut, 'skull': Skull,
  'pickaxe': Pickaxe,   'cubes': Boxes, 'sword': Sword,
  'power': Power, 'hand': Hand, 'message-square': MessageSquare,
  'shield': Shield, 'backpack': Backpack, 'tree-pine': TreePine,
  'equal': Equal, 'save': Save, 'calculator': Calculator,
  'dice-6': Dice6, 'text-cursor': TextCursor, 'plane': Plane,
  'repeat': Repeat,
  'ban': Ban,
  'move': Move
}

const categoryGradients: Record<BlockCategory, string> = {
  trigger: 'from-amber-500/20 to-amber-500/5',
  action: 'from-cyan-500/20 to-cyan-500/5',
  condition: 'from-red-500/20 to-red-500/5',
  variable: 'from-purple-500/20 to-purple-500/5'
}

function PropertyPreview({ def, props }: { def: BlockDefinition; props: Record<string, any> }) {
  // Show first meaningful field (skip delay + target_player)
  const displayField = def.fields.find(f => f.key !== 'delay' && f.key !== 'target_player')
  const val = displayField ? (props[displayField.key] ?? displayField.defaultValue) : null
  return (
    <div className="px-2.5 pb-1.5 pt-0.5 space-y-0.5">
      {val !== null && val !== undefined && val !== '' && (
        <div className="text-[10px] text-text-secondary/60 bg-white/5 rounded px-1.5 py-0.5 truncate font-mono">
          {String(val).length > 30 ? String(val).slice(0, 30) + '...' : String(val)}
        </div>
      )}
      {def.type === 'action' && props.target_player && (
        <div className="text-[9px] text-yellow-400/70 bg-yellow-500/10 rounded px-1.5 py-0.5 flex items-center gap-1">
          <User className="w-2.5 h-2.5" /> Target: {props.target_player}
        </div>
      )}
      {def.type === 'action' && props.delay > 0 && (
        <div className="text-[9px] text-amber-400/70 bg-amber-500/10 rounded px-1.5 py-0.5 flex items-center gap-1">
          <Clock className="w-2.5 h-2.5" /> Delay: {props.delay}t
        </div>
      )}
    </div>
  )
}

const BlockNode = memo(({ id, data, selected }: NodeProps) => {
  const def = getBlockById(data.definitionId)
  const selectNode = useEditorStore(s => s.selectNode)

  if (!def) {
    return (
      <div className="block-node border-red-500/50 bg-red-500/10 px-3 py-2 text-xs text-red-400">
        Unknown block: {data.definitionId}
      </div>
    )
  }

  const IconComponent = iconMap[def.icon] || Zap
  const gradient = categoryGradients[def.type]

  return (
    <div
      onClick={() => selectNode(id)}
      className={`block-node bounce-in min-w-[160px] bg-bg-card bg-gradient-to-br ${gradient} backdrop-blur-glass`}
      style={{ borderColor: selected ? def.color : `${def.color}40`, boxShadow: selected ? `0 0 0 1px ${def.color}, 0 0 24px ${def.color}20` : 'none' }}
    >
      {def.hasInput && (
        <Handle
          type="target"
          position={Position.Left}
          id="input"
          style={{
            width: 14, height: 14, background: def.color,
            border: '3px solid #121212', borderRadius: '50%',
            left: -9, top: '50%', cursor: 'crosshair'
          }}
        />
      )}

      <div className="flex items-center gap-2 px-2.5 py-2">
        <div
          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${def.color}20`, color: def.color }}
        >
          {IconComponent && <IconComponent className="w-3.5 h-3.5" />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-semibold text-text-primary truncate">{def.label}</div>
          <div className="text-[9px] text-text-secondary/50 capitalize">{def.type}</div>
        </div>
      </div>

      <PropertyPreview def={def} props={data.properties || {}} />

      {(def.hasOutput || def.branches) && (
        <>
          {def.branches ? (
            <div className="flex border-t border-white/5">
              <div className="flex-1 relative py-1 text-[9px] text-center text-green-400 bg-green-500/5">
                ✓ True
                <Handle type="source" position={Position.Right} id="branch-true"
                  style={{
                    width: 16, height: 16, background: '#22c55e',
                    border: '3px solid #121212', borderRadius: '50%',
                    right: -10, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                    cursor: 'crosshair'
                  }}
                />
              </div>
              <div className="w-px bg-white/5" />
              <div className="flex-1 relative py-1 text-[9px] text-center text-red-400 bg-red-500/5">
                ✗ False
                <Handle type="source" position={Position.Right} id="branch-false"
                  style={{
                    width: 16, height: 16, background: '#ef4444',
                    border: '3px solid #121212', borderRadius: '50%',
                    right: -10, top: '50%', transform: 'translateY(-50%)', zIndex: 10,
                    cursor: 'crosshair'
                  }}
                />
              </div>
            </div>
          ) : (
            <Handle
              type="source"
              position={Position.Right}
              id="output"
              style={{
                width: 16, height: 16, background: def.color,
                border: '3px solid #121212', borderRadius: '50%',
                right: -10, top: '50%', cursor: 'crosshair'
              }}
            />
          )}
        </>
      )}
    </div>
  )
})

BlockNode.displayName = 'BlockNode'

export default BlockNode
