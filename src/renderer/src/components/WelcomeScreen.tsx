import React, { useState } from 'react'
import { useEditorStore } from '../store/editorStore'
import { templates } from '../data/templates'
import { Button } from './ui/Button'
import { Sparkles, BookOpen, MessageCircle, Plane, Zap, Gift, Megaphone, Sword, Shield, Flame, MapPin, ShieldOff, Footprints, Compass, ArrowRight } from 'lucide-react'

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

const allTags = Array.from(new Set(templates.flatMap(t => t.tags)))

export function WelcomeScreen() {
  const { loadTemplate, clearProject, setWelcomeScreen } = useEditorStore()
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')
  const [filterTag, setFilterTag] = useState<string>('all')

  const filtered = templates.filter(t => {
    if (filterDifficulty !== 'all' && t.difficulty !== filterDifficulty) return false
    if (filterTag !== 'all' && !t.tags.includes(filterTag)) return false
    return true
  })

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-bg-primary p-8 overflow-y-auto">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-2xl">
            <Sparkles className="w-6 h-6 text-accent-action" />
            <span className="text-lg font-semibold text-text-primary">Minecraft Plugin Builder</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mt-4">
            Build plugins visually, <span className="text-accent-action">no coding needed</span>
          </h1>
          <p className="text-text-secondary text-base max-w-lg mx-auto">
            Drag and drop blocks to create Minecraft plugins. Connect triggers with actions, add conditions — generate ready-to-use Java or Kotlin code.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            <span>Choose a template to start:</span>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button onClick={() => setFilterDifficulty('all')} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors ${filterDifficulty === 'all' ? 'bg-accent-action/20 text-accent-action' : 'bg-white/5 text-text-secondary hover:bg-white/10'}`}>All</button>
            {(['easy', 'medium', 'hard'] as const).map(d => (
              <button key={d} onClick={() => setFilterDifficulty(d)} className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors capitalize ${filterDifficulty === d ? 'bg-accent-action/20 text-accent-action' : 'bg-white/5 text-text-secondary hover:bg-white/10'}`}>{d}</button>
            ))}
            <span className="w-px h-5 bg-white/10 mx-1 self-center" />
            <button onClick={() => setFilterTag('all')} className={`px-2 py-0.5 rounded text-[10px] transition-colors ${filterTag === 'all' ? 'bg-white/10 text-text-primary' : 'text-text-secondary/50 hover:text-text-secondary'}`}>All tags</button>
            {allTags.map(t => (
              <button key={t} onClick={() => setFilterTag(t)} className={`px-2 py-0.5 rounded text-[10px] transition-colors ${filterTag === t ? 'bg-white/10 text-text-primary' : 'text-text-secondary/50 hover:text-text-secondary'}`}>{t}</button>
            ))}
          </div>

          <div className="grid grid-cols-4 gap-3">
            {filtered.map((tpl) => {
              const diff = difficultyConfig[tpl.difficulty]
              const icon = iconMap[tpl.icon] || <Zap className="w-5 h-5" />
              return (
                <button
                  key={tpl.id}
                  onClick={() => loadTemplate(tpl.nodes, tpl.edges)}
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
                    <div className="flex gap-1">
                      {tpl.tags.slice(0, 2).map(t => <span key={t} className="text-[9px] text-text-secondary/40 px-1 py-0.5 bg-white/5 rounded">{t}</span>)}
                    </div>
                    <span className="text-accent-action opacity-0 group-hover:opacity-100 transition-opacity"><ArrowRight className="w-3.5 h-3.5" /></span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="text-center">
          <Button variant="ghost" size="lg" icon={<Sparkles className="w-4 h-4" />}
            onClick={() => { clearProject(); setWelcomeScreen(false) }}
            className="text-text-secondary hover:text-text-primary">
            Start from scratch
          </Button>
        </div>
      </div>
    </div>
  )
}
