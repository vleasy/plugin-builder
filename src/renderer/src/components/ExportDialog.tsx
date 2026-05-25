import React from 'react'
import { useEditorStore } from '../store/editorStore'
import { useProjectStore } from '../store/projectStore'
import { generateJava } from '../generators/javaGenerator'
import { generateKotlin } from '../generators/kotlinGenerator'
import { generateJson } from '../generators/jsonGenerator'
import { validateGraph } from '../generators/validator'
import { X, FileType, FileCog, FileJson, AlertTriangle, CheckCircle, Download, FileDown } from 'lucide-react'
import { Button } from './ui/Button'

export function ExportDialog() {
  const { showExportDialog, toggleExportDialog, nodes, edges } = useEditorStore()
  const project = useProjectStore(s => s.project)
  const exportPlugin = useProjectStore(s => s.exportPlugin)

  if (!showExportDialog) return null

  const errors = validateGraph(nodes, edges)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-96 glass-strong rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <h2 className="text-sm font-semibold text-text-primary">Export Plugin</h2>
          <button onClick={toggleExportDialog} className="text-text-secondary hover:text-text-primary transition-colors p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3">
          {errors.length > 0 && (
            <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="flex items-center gap-1.5 text-xs text-red-400 mb-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span className="font-medium">Validation Errors</span>
              </div>
              {errors.map((err, i) => (
                <div key={i} className="text-[11px] text-red-300/80 ml-5">• {err.message}</div>
              ))}
            </div>
          )}

          {errors.length === 0 && (
            <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center gap-2 text-xs text-green-400">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>No errors — ready to export!</span>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-xs text-text-secondary font-medium">Export as:</p>

            <button
              onClick={async () => {
                const code = generateJava(project, nodes, edges)
                await exportPlugin(code, 'java')
              }}
              className="w-full glass rounded-lg p-3 text-left hover:bg-white/[0.06] transition-colors border border-white/5 hover:border-accent-action/30 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-action/10 flex items-center justify-center">
                  <FileType className="w-4 h-4 text-accent-action" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent-action transition-colors">Java Plugin</div>
                  <div className="text-xs text-text-secondary">Paper/Bukkit 1.20+</div>
                </div>
                <Download className="w-4 h-4 text-text-secondary/40 group-hover:text-accent-action transition-colors" />
              </div>
            </button>

            <button
              onClick={async () => {
                const code = generateKotlin(project, nodes, edges)
                await exportPlugin(code, 'kt')
              }}
              className="w-full glass rounded-lg p-3 text-left hover:bg-white/[0.06] transition-colors border border-white/5 hover:border-accent-condition/30 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-condition/10 flex items-center justify-center">
                  <FileCog className="w-4 h-4 text-accent-condition" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent-condition transition-colors">Kotlin Plugin</div>
                  <div className="text-xs text-text-secondary">Paper/Bukkit 1.20+</div>
                </div>
                <Download className="w-4 h-4 text-text-secondary/40 group-hover:text-accent-condition transition-colors" />
              </div>
            </button>

            <button
              onClick={async () => {
                const json = generateJson(project, nodes, edges)
                if (window.electronAPI) {
                  await window.electronAPI.saveProject(json)
                }
              }}
              className="w-full glass rounded-lg p-3 text-left hover:bg-white/[0.06] transition-colors border border-white/5 hover:border-accent-variable/30 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent-variable/10 flex items-center justify-center">
                  <FileJson className="w-4 h-4 text-accent-variable" />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-text-primary group-hover:text-accent-variable transition-colors">JSON Project</div>
                  <div className="text-xs text-text-secondary">Save/share your project</div>
                </div>
                <Download className="w-4 h-4 text-text-secondary/40 group-hover:text-accent-variable transition-colors" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
