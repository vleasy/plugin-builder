import React, { useState, useMemo } from 'react'
import { useEditorStore } from '../store/editorStore'
import { useProjectStore } from '../store/projectStore'
import { generateJava } from '../generators/javaGenerator'
import { generateKotlin } from '../generators/kotlinGenerator'
import { generateJson } from '../generators/jsonGenerator'
import { validateGraph } from '../generators/validator'
import { X, Copy, Check, AlertTriangle, FileJson, FileType, FileCog } from 'lucide-react'
import { Button } from './ui/Button'

type Tab = 'java' | 'kotlin' | 'json'

export function CodePreview() {
  const { showCodePreview, toggleCodePreview, nodes, edges, projectName } = useEditorStore()
  const project = useProjectStore(s => s.project)
  const [activeTab, setActiveTab] = useState<Tab>('java')
  const [copied, setCopied] = useState(false)

  const errors = useMemo(() => validateGraph(nodes, edges), [nodes, edges])

  const code = useMemo(() => {
    switch (activeTab) {
      case 'java': return generateJava(project, nodes, edges)
      case 'kotlin': return generateKotlin(project, nodes, edges)
      case 'json': return generateJson(project, nodes, edges)
    }
  }, [activeTab, project, nodes, edges])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!showCodePreview) return null

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'java', label: 'Java', icon: <FileType className="w-3.5 h-3.5" /> },
    { id: 'kotlin', label: 'Kotlin', icon: <FileCog className="w-3.5 h-3.5" /> },
    { id: 'json', label: 'JSON', icon: <FileJson className="w-3.5 h-3.5" /> }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[800px] max-h-[80vh] glass-strong rounded-xl border border-white/10 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold text-text-primary">Code Preview</h2>
            {errors.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                <AlertTriangle className="w-3 h-3" />
                <span>{errors.length} {errors.length === 1 ? 'error' : 'errors'}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" icon={copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />} onClick={handleCopy}>
              {copied ? 'Copied!' : 'Copy'}
            </Button>
            <button onClick={toggleCodePreview} className="text-text-secondary hover:text-text-primary transition-colors p-1">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-white/5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'text-accent-action border-accent-action bg-accent-action/5'
                  : 'text-text-secondary border-transparent hover:text-text-primary hover:bg-white/5'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-auto p-4">
          {errors.length > 0 && (
            <div className="mb-3 p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="text-xs font-medium text-red-400 mb-1">Validation Errors:</div>
              {errors.map((err, i) => (
                <div key={i} className="text-xs text-red-300/80 ml-2">• {err.message}</div>
              ))}
            </div>
          )}

          <pre className="text-xs font-mono text-text-primary leading-relaxed overflow-x-auto whitespace-pre">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
