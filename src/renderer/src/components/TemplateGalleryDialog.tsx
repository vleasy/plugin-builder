import React, { useState } from 'react'
import { useEditorStore } from '../store/editorStore'
import { templates } from '../data/templates'
import { X, ArrowRight, MessageCircle, Plane, Zap, Gift, Megaphone, Sword, Shield, Flame, MapPin, ShieldOff, Sparkles, Footprints, Compass, BookOpen } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

const iconMap: Record<string, React.ReactNode> = {
  'message-circle': <MessageCircle className="w-5 h-5" />,
  'plane': <Plane className="w-5 h-5" />,
  'zap': <Zap className="w-5 h-5" />,
  'gift': <Gift className="w-5 h-5" />,
  'megaphone': <Megaphone className="w-5 h-5" />,
  'sword': <Sword className="w-5 h-5" />,
  'shield': <Shield className="w-5 h-5" />,
  'flame': <Flame className="w-5 h-5" />,
  'map-pin': <MapPin className="w-5 h-5" />,
  'shield-off': <ShieldOff className="w-5 h-5" />,
  'sparkles': <Sparkles className="w-5 h-5" />,
  'footprints': <Footprints className="w-5 h-5" />,
  'compass': <Compass className="w-5 h-5" />
}

const difficultyConfig = {
  easy: { color: 'text-green-400 bg-green-500/10 border-green-500/20', label: 'Easy' },
  medium: { color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', label: 'Medium' },
  hard: { color: 'text-red-400 bg-red-500/10 border-red-500/20', label: 'Hard' }
}

export function TemplateGalleryDialog({ open, onClose }: Props) {
  const loadTemplate = useEditorStore((s) => s.loadTemplate)
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')

  const filtered = templates.filter(t => {
    if (filterDifficulty !== 'all' && t.difficulty !== filterDifficulty) return false
    return true
  })

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[800px] max-h-[80vh] glass-strong rounded-2xl border border-white/10 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent-action" />
            <h2 className="text-sm font-medium text-text-primary">Template Gallery</h2>
            <span className="text-[10px] text-text-secondary/50 ml-1">{templates.length} templates</span>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex gap-2 px-4 py-2 border-b border-white/5 flex-wrap">
          <button onClick={() => setFilterDifficulty('all')} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${filterDifficulty === 'all' ? 'bg-accent-action/20 text-accent-action' : 'bg-white/5 text-text-secondary hover:bg-white/10'}`}>All</button>
          {(['easy', 'medium', 'hard'] as const).map(d => (
            <button key={d} onClick={() => setFilterDifficulty(d)} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors capitalize ${filterDifficulty === d ? 'bg-accent-action/20 text-accent-action' : 'bg-white/5 text-text-secondary hover:bg-white/10'}`}>{d}</button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((tpl) => {
              const diff = difficultyConfig[tpl.difficulty]
              const icon = iconMap[tpl.icon] || <Zap className="w-5 h-5" />
              return (
                <button
                  key={tpl.id}
                  onClick={() => { loadTemplate(tpl.nodes, tpl.edges); onClose() }}
                  className="glass rounded-xl p-4 text-left hover:bg-white/[0.08] transition-all duration-200 group border border-transparent hover:border-white/10"
                >
                  <div className="flex items-start justify-between mb-2.5">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      tpl.difficulty === 'easy' ? 'bg-accent-trigger/20 text-accent-trigger' :
                      tpl.difficulty === 'medium' ? 'bg-accent-action/20 text-accent-action' :
                      'bg-accent-condition/20 text-accent-condition'
                    }`}>
                      {icon}
                    </div>
                    <span className={`text-[9px] font-medium px-1.5 py-0.5 rounded-full border ${diff.color}`}>{diff.label}</span>
                  </div>
                  <h3 className="font-semibold text-sm text-text-primary mb-0.5">{tpl.name}</h3>
                  <p className="text-[11px] text-text-secondary/70 mb-2 line-clamp-2">{tpl.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-text-secondary/40">{tpl.nodes.length} blocks</span>
                    <span className="text-accent-action opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </button>
              )
            })}
          </div>
          {filtered.length === 0 && <p className="text-center text-text-secondary/40 text-sm py-8">No templates match</p>}
        </div>
      </div>
    </div>
  )
}
