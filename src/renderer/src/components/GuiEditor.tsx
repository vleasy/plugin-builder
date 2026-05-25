import React, { useState, useEffect } from 'react'
import { searchItems, ALL_ITEMS_MAP } from '../data/itemDatabase'
import { X, Trash2 } from 'lucide-react'

export interface GuiSlot {
  index: number
  item: string
  amount: number
  name: string
  lore: string[]
  enchanted: boolean
}

interface Props {
  slots: GuiSlot[]
  rows: number
  onChange: (slots: GuiSlot[]) => void
}

const CATEGORY_COLORS: Record<string, string> = {
  building: '#e8b87a', decoration: '#7ab8e8', redstone: '#e87a7a',
  transportation: '#7ae8b8', tool: '#b87ae8', weapon: '#e87a7a',
  armor: '#7a7ae8', food: '#7ae87a', material: '#e8e87a',
  plant: '#7ae8b8', mob: '#e87ae8', other: '#aaa'
}

export function GuiEditor({ slots, rows, onChange }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [localItem, setLocalItem] = useState<GuiSlot>({ index: -1, item: '', amount: 1, name: '', lore: [], enchanted: false })
  const [localLore, setLocalLore] = useState('')

  const totalSlots = rows * 9

  const getSlot = (index: number): GuiSlot => {
    return slots.find(s => s.index === index) || { index, item: '', amount: 1, name: '', lore: [], enchanted: false }
  }

  const handleSlotClick = (index: number) => {
    const existing = getSlot(index)
    setLocalItem({ ...existing })
    setLocalLore(existing.lore.join('\n'))
    setEditingIndex(index)
  }

  const saveSlot = () => {
    if (editingIndex === null) return
    const newSlots = slots.filter(s => s.index !== editingIndex)
    if (localItem.item) {
      newSlots.push({ ...localItem, lore: localLore.split('\n').filter(Boolean), index: editingIndex })
    }
    onChange(newSlots)
    setEditingIndex(null)
  }

  const clearSlot = () => {
    if (editingIndex === null) return
    const newSlots = slots.filter(s => s.index !== editingIndex)
    onChange(newSlots)
    setEditingIndex(null)
  }

  const filteredItems = searchItems(searchQuery, 50)

  // Auto-save when closing
  useEffect(() => {
    if (editingIndex === null) {
      setSearchQuery('')
      setLocalLore('')
    }
  }, [editingIndex])

  return (
    <div className="space-y-2">
      <div className="text-[11px] text-text-secondary font-medium">Slot Editor</div>

      <div className="grid gap-px" style={{ gridTemplateColumns: 'repeat(9, 1fr)' }}>
        {Array.from({ length: totalSlots }, (_, i) => {
          const slot = getSlot(i)
          const hasItem = !!slot.item
          return (
            <button
              key={i}
              onClick={() => handleSlotClick(i)}
              className={`aspect-square rounded border text-[9px] flex items-center justify-center transition-all ${
                editingIndex === i
                  ? 'border-accent-action bg-accent-action/20'
                  : hasItem
                    ? 'border-accent-action/50 bg-accent-action/10'
                    : 'border-white/5 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="text-center leading-tight p-0.5">
                <div className="text-[10px]">{hasItem ? '◆' : ''}</div>
                <div className="truncate max-w-full">{slot.name || (hasItem ? slot.item.slice(0, 6) : '')}</div>
              </div>
            </button>
          )
        })}
      </div>

      {editingIndex !== null && (
        <div className="bg-white/5 rounded-xl p-3 space-y-2 mt-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-text-secondary font-medium">Slot {editingIndex}</span>
            <div className="flex gap-1">
              <button onClick={clearSlot} className="text-red-400 hover:text-red-300"><Trash2 className="w-2.5 h-2.5" /></button>
              <button onClick={() => setEditingIndex(null)} className="text-text-secondary hover:text-text-primary"><X className="w-2.5 h-2.5" /></button>
            </div>
          </div>

          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-text-primary outline-none focus:border-accent-action/50"
            placeholder="Search item..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <div className="max-h-24 overflow-y-auto space-y-0.5">
            {filteredItems.slice(0, 10).map(item => (
              <button
                key={item.value}
                onClick={() => setLocalItem(s => ({ ...s, item: item.value }))}
                className={`w-full text-left px-2 py-0.5 text-[10px] rounded transition-colors ${localItem.item === item.value ? 'bg-accent-action/20 text-accent-action' : 'text-text-secondary hover:bg-white/5'}`}
              >
                <span className="mr-1" style={{ color: CATEGORY_COLORS[item.category] || '#888' }}>◆</span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] text-text-secondary/60">Item ID</label>
              <input className="w-full bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-text-primary outline-none"
                value={localItem.item} onChange={e => setLocalItem(s => ({ ...s, item: e.target.value }))} />
            </div>
            <div>
              <label className="text-[9px] text-text-secondary/60">Amount</label>
              <input type="number" min={1} max={64}
                className="w-full bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[10px] text-text-primary outline-none"
                value={localItem.amount} onChange={e => setLocalItem(s => ({ ...s, amount: Math.min(64, Math.max(1, parseInt(e.target.value) || 1)) }))} />
            </div>
          </div>

          <input
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-text-primary outline-none focus:border-accent-action/50"
            placeholder="Display name (&cRed Name)"
            value={localItem.name}
            onChange={e => setLocalItem(s => ({ ...s, name: e.target.value }))}
          />

          <textarea
            className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-text-primary outline-none focus:border-accent-action/50 resize-none h-12"
            placeholder="Lore (one per line)"
            value={localLore}
            onChange={e => setLocalLore(e.target.value)}
          />

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input type="checkbox" checked={localItem.enchanted}
              onChange={e => setLocalItem(s => ({ ...s, enchanted: e.target.checked }))}
              className="w-2.5 h-2.5 accent-accent-action" />
            <span className="text-[10px] text-text-secondary">Enchanted glow</span>
          </label>

          <button onClick={saveSlot}
            className="w-full py-1 bg-accent-action/20 text-accent-action rounded-lg text-[11px] font-medium hover:bg-accent-action/30 transition-colors">
            {localItem.item ? 'Save Slot' : 'Clear Slot'}
          </button>
        </div>
      )}
    </div>
  )
}
