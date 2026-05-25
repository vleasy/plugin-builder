import React from 'react'
import { useEditorStore } from '../store/editorStore'
import { templates } from '../data/templates'
import { Button } from './ui/Button'
import { Sparkles, BookOpen, Zap, MessageCircle, Plane, ArrowRight } from 'lucide-react'

const iconMap: Record<string, React.ReactNode> = {
  'message-circle': <MessageCircle className="w-5 h-5" />,
  'plane': <Plane className="w-5 h-5" />,
  'zap': <Zap className="w-5 h-5" />
}

const difficultyColors = {
  easy: 'text-green-400 bg-green-500/10 border-green-500/20',
  medium: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
  hard: 'text-red-400 bg-red-500/10 border-red-500/20'
}

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard'
}

export function WelcomeScreen() {
  const { loadTemplate, clearProject, setWelcomeScreen } = useEditorStore()

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-bg-primary p-8">
      <div className="max-w-3xl w-full space-y-10">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 glass px-4 py-2 rounded-2xl">
            <Sparkles className="w-6 h-6 text-accent-action" />
            <span className="text-lg font-semibold text-text-primary">Minecraft Plugin Builder</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mt-4">
            Build plugins visually, <span className="text-accent-action">no coding needed</span>
          </h1>
          <p className="text-text-secondary text-base max-w-lg mx-auto">
            Drag and drop blocks to create Minecraft plugins. Connect triggers with actions, add conditions and variables — generate ready-to-use Java or Kotlin code.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
            <BookOpen className="w-4 h-4" />
            <span>Choose a tutorial to start:</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => loadTemplate(tpl.nodes, tpl.edges)}
                className="glass rounded-xl p-5 text-left hover:bg-white/[0.08] transition-all duration-200 group text-start border border-transparent hover:border-white/10"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    tpl.difficulty === 'easy' ? 'bg-accent-trigger/20 text-accent-trigger' :
                    tpl.difficulty === 'medium' ? 'bg-accent-action/20 text-accent-action' :
                    'bg-accent-condition/20 text-accent-condition'
                  }`}>
                    {iconMap[tpl.icon] || <Zap className="w-5 h-5" />}
                  </div>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${difficultyColors[tpl.difficulty]}`}>
                    {difficultyLabels[tpl.difficulty]}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-text-primary mb-1">{tpl.name}</h3>
                <p className="text-xs text-text-secondary mb-3">{tpl.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-text-secondary">{tpl.nodes.length} blocks</span>
                  <span className="text-accent-action opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="ghost"
            size="lg"
            icon={<Sparkles className="w-4 h-4" />}
            onClick={() => { clearProject(); setWelcomeScreen(false) }}
            className="text-text-secondary hover:text-text-primary"
          >
            Start from scratch
          </Button>
        </div>
      </div>
    </div>
  )
}
