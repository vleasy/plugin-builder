import React, { useMemo, useState } from 'react'
import { useEditorStore } from '../store/editorStore'
import { getBlockById } from '../data'
import { validateGraph } from '../generators/validator'
import { X, Bug, Play, StepForward, RotateCcw, Terminal, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import { Button } from './ui/Button'

export function DebugPanel() {
  const { showDebugPanel, toggleDebugPanel, nodes, edges } = useEditorStore()
  const [currentStep, setCurrentStep] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)

  const errors = useMemo(() => validateGraph(nodes, edges), [nodes, edges])

  const sortedNodes = useMemo(() => {
    const triggerNodes = nodes.filter(n => {
      const def = getBlockById(n.data.definitionId)
      return def?.type === 'trigger'
    })

    if (triggerNodes.length === 0) return []

    const result: { nodeId: string; label: string; defId: string; status: 'pending' | 'running' | 'done' | 'error' }[] = []
    const visited = new Set<string>()
    const queue = [...triggerNodes]

    while (queue.length > 0) {
      const node = queue.shift()!
      if (visited.has(node.id)) continue
      visited.add(node.id)
      const def = getBlockById(node.data.definitionId)
      result.push({
        nodeId: node.id,
        label: def?.label || 'Unknown',
        defId: node.data.definitionId,
        status: 'pending'
      })

      const outgoing = edges.filter(e => e.source === node.id)
      for (const edge of outgoing) {
        const target = nodes.find(n => n.id === edge.target)
        if (target && !visited.has(target.id)) queue.push(target)
      }
    }

    return result
  }, [nodes, edges])

  const handleStart = () => {
    setIsRunning(true)
    setCurrentStep(0)
  }

  const handleStep = () => {
    if (currentStep < sortedNodes.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentStep(-1)
  }

  if (!showDebugPanel) return null

  const getLogMessage = (item: typeof sortedNodes[0]) => {
    const def = getBlockById(item.defId)
    switch (def?.type) {
      case 'trigger': return `Event triggered: ${item.label}`
      case 'action': return `Executing action: ${item.label}`
      case 'condition': return `Checking condition: ${item.label}`
      case 'variable': return `Processing variable: ${item.label}`
      default: return `Processing: ${item.label}`
    }
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 glass-strong rounded-xl border border-white/10 overflow-hidden z-40 shadow-2xl">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Bug className="w-3.5 h-3.5 text-accent-action" />
          <span className="text-xs font-semibold text-text-primary">Debug Panel</span>
        </div>
        <button onClick={toggleDebugPanel} className="text-text-secondary hover:text-text-primary transition-colors">
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="p-3 space-y-3 max-h-80 overflow-y-auto">
        {errors.length > 0 && (
          <div className="p-2 rounded-lg bg-red-500/10 border border-red-500/20">
            <div className="flex items-center gap-1 text-xs text-red-400">
              <AlertTriangle className="w-3 h-3" />
              <span>{errors.length} validation {errors.length === 1 ? 'error' : 'errors'} — fix before debugging</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-1">
          <Button variant="primary" size="sm" icon={<Play className="w-3 h-3" />} onClick={handleStart} disabled={isRunning || errors.length > 0 || sortedNodes.length === 0}>
            Start
          </Button>
          <Button variant="secondary" size="sm" icon={<StepForward className="w-3 h-3" />} onClick={handleStep} disabled={!isRunning || currentStep >= sortedNodes.length - 1}>
            Step
          </Button>
          <Button variant="ghost" size="sm" icon={<RotateCcw className="w-3 h-3" />} onClick={handleReset} disabled={!isRunning}>
            Reset
          </Button>
        </div>

        {isRunning && currentStep >= 0 && currentStep < sortedNodes.length && (
          <div className="p-2 rounded-lg bg-accent-action/5 border border-accent-action/20">
            <div className="flex items-center gap-1.5 text-xs text-accent-action mb-1">
              <StepForward className="w-3 h-3" />
              <span className="font-medium">Current step ({currentStep + 1}/{sortedNodes.length})</span>
            </div>
            <div className="text-sm font-medium text-text-primary">
              {sortedNodes[currentStep].label}
            </div>
            <div className="text-[10px] text-text-secondary mt-0.5">
              {getLogMessage(sortedNodes[currentStep])}
            </div>
          </div>
        )}

        <div className="space-y-1">
          {sortedNodes.length === 0 && (
            <div className="text-xs text-text-secondary/50 text-center py-4">
              No blocks on the canvas. Add a trigger to start debugging.
            </div>
          )}
          {sortedNodes.map((item, i) => {
            const isActive = isRunning && i === currentStep
            const isDone = isRunning && i < currentStep
            const isPending = !isRunning || i > currentStep
            const def = getBlockById(item.defId)

            let icon: React.ReactNode
            if (isActive) icon = <ArrowRight className="w-3 h-3 text-accent-action" />
            else if (isDone) icon = <CheckCircle className="w-3 h-3 text-green-400" />
            else icon = <div className="w-3 h-3 rounded-full border border-white/10" />

            return (
              <div
                key={item.nodeId}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-all ${
                  isActive ? 'bg-accent-action/10 border border-accent-action/20' : 'hover:bg-white/5'
                }`}
              >
                {icon}
                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: def?.color || '#666' }} />
                <span className={isActive ? 'text-text-primary font-medium' : isDone ? 'text-text-secondary/60' : 'text-text-secondary/40'}>
                  {item.label}
                </span>
                <span className={`ml-auto text-[10px] ${isActive ? 'text-accent-action' : isDone ? 'text-green-400/60' : 'text-text-secondary/30'}`}>
                  {isActive ? 'RUNNING' : isDone ? 'DONE' : ''}
                </span>
              </div>
            )
          })}
        </div>

        {isRunning && currentStep >= sortedNodes.length - 1 && sortedNodes.length > 0 && (
          <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-1.5 text-xs text-green-400">
            <CheckCircle className="w-3 h-3" />
            <span>Execution completed!</span>
          </div>
        )}
      </div>
    </div>
  )
}
