import { create } from 'zustand'

export interface CustomEnchantment {
  name: string
  level: number
}

export interface CustomItem {
  id: string
  material: string
  amount: number
  displayName: string
  lore: string[]
  enchantments: CustomEnchantment[]
  flags: string[]
  unbreakable: boolean
  customModelData: number
}

interface CustomItemState {
  items: CustomItem[]
  addItem: (item: CustomItem) => void
  updateItem: (id: string, data: Partial<CustomItem>) => void
  removeItem: (id: string) => void
  getItem: (id: string) => CustomItem | undefined
}

let customIdCounter = 0

export const useCustomItemStore = create<CustomItemState>((set, get) => ({
  items: [],

  addItem: (item) => {
    set((state) => ({ items: [...state.items, item] }))
  },

  updateItem: (id, data) => {
    set((state) => ({
      items: state.items.map(i => i.id === id ? { ...i, ...data } : i)
    }))
  },

  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter(i => i.id !== id)
    }))
  },

  getItem: (id) => {
    return get().items.find(i => i.id === id)
  }
}))

export function generateCustomItemId(): string {
  customIdCounter++
  return `custom-${Date.now()}-${customIdCounter}`
}
