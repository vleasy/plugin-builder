import React, { useState, useEffect } from 'react'
import { useCustomItemStore, generateCustomItemId, type CustomItem } from '../store/customItemStore'
import { ALL_ITEMS, searchItems } from '../data/itemDatabase'
import { X, Plus, Trash2, Sparkles } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

const ENCHANT_OPTIONS = [
  'sharpness', 'power', 'protection', 'fire_aspect', 'knockback',
  'unbreaking', 'efficiency', 'fortune', 'looting', 'sweeping',
  'depth_strider', 'feather_falling', 'thorns', 'mending',
  'infinity', 'flame', 'punch', 'silktouch', 'respiration',
  'aqua_affinity', 'luck_of_the_sea', 'lure', 'frost_walker'
]

const FLAG_OPTIONS = [
  'HIDE_ENCHANTS', 'HIDE_ATTRIBUTES', 'HIDE_UNBREAKABLE',
  'HIDE_DESTROYS', 'HIDE_PLACED_ON', 'HIDE_POTION_EFFECTS',
  'HIDE_DYE', 'HIDE_ARMOR_TRIM'
]

const defaultItem: CustomItem = {
  id: '',
  material: 'DIAMOND_SWORD',
  amount: 1,
  displayName: '',
  lore: [],
  enchantments: [],
  flags: [],
  unbreakable: false,
  customModelData: 0
}

export function ItemBuilderDialog({ open, onClose }: Props) {
  const { items, addItem, updateItem, removeItem } = useCustomItemStore()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<CustomItem>({ ...defaultItem, id: generateCustomItemId() })
  const [tab, setTab] = useState<'list' | 'editor'>('list')
  const [searchQuery, setSearchQuery] = useState('')
  const [loreInput, setLoreInput] = useState('')
  const [newEnchant, setNewEnchant] = useState('')
  const [newLevel, setNewLevel] = useState(1)

  useEffect(() => {
    if (open) {
      setTab('list')
      setEditingId(null)
    }
  }, [open])

  if (!open) return null

  const filteredItems = searchItems(searchQuery, 100)

  const handleEdit = (item: CustomItem) => {
    setForm({ ...item })
    setLoreInput(item.lore.join('\n'))
    setEditingId(item.id)
    setTab('editor')
  }

  const handleSave = () => {
    const item = {
      ...form,
      lore: loreInput.split('\n').filter(Boolean)
    }
    if (editingId) {
      updateItem(editingId, item)
    } else {
      addItem({ ...item, id: generateCustomItemId() })
    }
    setTab('list')
    setEditingId(null)
    setForm({ ...defaultItem, id: generateCustomItemId() })
    setLoreInput('')
  }

  const handleNew = () => {
    setForm({ ...defaultItem, id: generateCustomItemId() })
    setLoreInput('')
    setEditingId(null)
    setTab('editor')
  }

  const previewLines = [
    `Material: ${form.material}`,
    `Amount: ${form.amount}`,
    form.displayName && `Name: §r${form.displayName}§r`,
    form.lore.length && `Lore: ${form.lore.join(' / ')}`,
    form.enchantments.length && `Enchants: ${form.enchantments.map(e => `${e.name} ${e.level}`).join(', ')}`,
    form.unbreakable && 'Unbreakable',
    form.flags.length && `Flags: ${form.flags.join(', ')}`,
    form.customModelData > 0 && `CustomModelData: ${form.customModelData}`
  ].filter(Boolean)

  const addEnchant = () => {
    if (!newEnchant) return
    setForm(f => ({
      ...f,
      enchantments: [...f.enchantments.filter(e => e.name !== newEnchant), { name: newEnchant, level: newLevel }]
    }))
    setNewEnchant('')
    setNewLevel(1)
  }

  const removeEnchant = (name: string) => {
    setForm(f => ({
      ...f,
      enchantments: f.enchantments.filter(e => e.name !== name)
    }))
  }

  const toggleFlag = (flag: string) => {
    setForm(f => ({
      ...f,
      flags: f.flags.includes(flag) ? f.flags.filter(x => x !== flag) : [...f.flags, flag]
    }))
  }

  const categoryColors: Record<string, string> = {
    building: '#e8b87a', decoration: '#7ab8e8', redstone: '#e87a7a',
    transportation: '#7ae8b8', tool: '#b87ae8', weapon: '#e87a7a',
    armor: '#7a7ae8', food: '#7ae87a', material: '#e8e87a',
    plant: '#7ae8b8', mob: '#e87ae8', other: '#aaa'
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[700px] max-h-[85vh] glass-strong rounded-2xl border border-white/10 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <h2 className="text-sm font-medium text-text-primary">Item Builder</h2>
            <span className="text-[10px] text-text-secondary/50 ml-1">{items.length} custom items</span>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex border-b border-white/5">
          <button onClick={() => setTab('list')} className={`flex-1 py-2 text-xs font-medium transition-colors ${tab === 'list' ? 'text-accent-action border-b-2 border-accent-action' : 'text-text-secondary hover:text-text-primary'}`}>My Items</button>
          <button onClick={() => setTab('editor')} className={`flex-1 py-2 text-xs font-medium transition-colors ${tab === 'editor' ? 'text-accent-action border-b-2 border-accent-action' : 'text-text-secondary hover:text-text-primary'}`}>Editor</button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {tab === 'list' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-action/50"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
                <button onClick={handleNew} className="px-3 py-1.5 bg-accent-action/20 text-accent-action rounded-lg text-xs hover:bg-accent-action/30 transition-colors shrink-0">
                  + New Item
                </button>
              </div>

              {items.length === 0 && searchQuery === '' && (
                <div className="text-center py-8">
                  <p className="text-xs text-text-secondary/40">No custom items yet</p>
                  <button onClick={handleNew} className="mt-2 text-xs text-accent-action hover:underline">Create your first item</button>
                </div>
              )}

              <div className="space-y-1">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-xl px-3 py-2 transition-colors cursor-pointer" onClick={() => handleEdit(item)}>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[11px] font-mono text-text-secondary/60 shrink-0 w-20 truncate">{item.material}</span>
                      <span className="text-xs text-text-primary truncate">{item.displayName || item.material}</span>
                      <span className="text-[10px] text-text-secondary/40">x{item.amount}</span>
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); removeItem(item.id) }} className="text-red-400/50 hover:text-red-400 transition-colors shrink-0 ml-2">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'editor' && (
            <div className="flex gap-4">
              <div className="flex-1 space-y-3 min-w-0">
                <div>
                  <label className="text-[11px] text-text-secondary mb-1 block">Material</label>
                  <div className="relative">
                    <input
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-action/50"
                      value={form.material}
                      onChange={e => setForm(f => ({ ...f, material: e.target.value.toUpperCase() }))}
                      placeholder="DIAMOND_SWORD"
                    />
                    <div className="mt-1 max-h-36 overflow-y-auto space-y-0.5">
                      {filteredItems.slice(0, 20).map(item => (
                        <button
                          key={item.value}
                          onClick={() => setForm(f => ({ ...f, material: item.value }))}
                          className={`w-full text-left px-2 py-0.5 text-[11px] rounded transition-colors ${form.material === item.value ? 'bg-accent-action/20 text-accent-action' : 'text-text-secondary hover:bg-white/5'}`}
                        >
                          <span className="text-[10px] opacity-50 mr-1" style={{ color: categoryColors[item.category] }}>◆</span>
                          {item.label}
                          <span className="text-[9px] text-text-secondary/30 ml-1 font-mono">{item.value}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-text-secondary mb-1 block">Amount (1-64)</label>
                    <input type="number" min={1} max={64}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-action/50"
                      value={form.amount} onChange={e => setForm(f => ({ ...f, amount: Math.min(64, Math.max(1, parseInt(e.target.value) || 1)) }))} />
                  </div>
                  <div>
                    <label className="text-[11px] text-text-secondary mb-1 block">Custom Model Data</label>
                    <input type="number"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-action/50"
                      value={form.customModelData} onChange={e => setForm(f => ({ ...f, customModelData: parseInt(e.target.value) || 0 }))} />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-text-secondary mb-1 block">Display Name</label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-action/50"
                    value={form.displayName} onChange={e => setForm(f => ({ ...f, displayName: e.target.value }))}
                    placeholder="&6Legendary Sword of Power" />
                </div>

                <div>
                  <label className="text-[11px] text-text-secondary mb-1 block">Lore (one line per row)</label>
                  <textarea
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-action/50 resize-none h-16"
                    value={loreInput} onChange={e => setLoreInput(e.target.value)}
                    placeholder="&7A powerful sword&#10;&cRare drop" />
                </div>

                <div>
                  <label className="text-[11px] text-text-secondary mb-1 block">Enchantments</label>
                  <div className="flex gap-1.5 mb-1.5">
                    <select
                      className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-text-primary outline-none"
                      value={newEnchant} onChange={e => setNewEnchant(e.target.value)}>
                      <option value="">Select enchant...</option>
                      {ENCHANT_OPTIONS.map(e => (
                        <option key={e} value={e}>{e}</option>
                      ))}
                    </select>
                    <input type="number" min={1} max={255} value={newLevel} onChange={e => setNewLevel(parseInt(e.target.value) || 1)}
                      className="w-14 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-text-primary outline-none text-center" />
                    <button onClick={addEnchant} className="px-2 bg-accent-action/20 text-accent-action rounded-lg hover:bg-accent-action/30 transition-colors">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {form.enchantments.map(en => (
                      <span key={en.name} className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-white/10 rounded text-[10px] text-text-secondary">
                        {en.name} {en.level}
                        <button onClick={() => removeEnchant(en.name)} className="text-red-400 hover:text-red-300"><X className="w-2.5 h-2.5" /></button>
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-text-secondary mb-1 block">Item Flags</label>
                  <div className="flex flex-wrap gap-1">
                    {FLAG_OPTIONS.map(f => (
                      <button key={f} onClick={() => toggleFlag(f)}
                        className={`px-1.5 py-0.5 rounded text-[10px] transition-colors ${form.flags.includes(f) ? 'bg-accent-action/20 text-accent-action' : 'bg-white/5 text-text-secondary hover:bg-white/10'}`}>
                        {f}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.unbreakable} onChange={e => setForm(f => ({ ...f, unbreakable: e.target.checked }))}
                    className="w-3 h-3 accent-accent-action" />
                  <span className="text-[11px] text-text-secondary">Unbreakable</span>
                </label>
              </div>

              <div className="w-48 shrink-0">
                <label className="text-[11px] text-text-secondary mb-2 block">Preview</label>
                <div className="bg-black/40 rounded-xl p-3 border border-white/5">
                  <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-lg border border-white/10 flex items-center justify-center mb-2">
                    <span className="text-lg font-bold text-purple-300">◆</span>
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-medium text-text-primary truncate">{form.displayName || form.material}</p>
                    {previewLines.slice(2).map((line, i) => (
                      <p key={i} className="text-[10px] text-text-secondary/60 truncate">{line}</p>
                    ))}
                  </div>
                </div>
                <button onClick={handleSave} className="w-full mt-3 py-2 bg-accent-action/20 text-accent-action rounded-xl text-xs font-medium hover:bg-accent-action/30 transition-colors">
                  {editingId ? 'Update Item' : 'Create Item'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
