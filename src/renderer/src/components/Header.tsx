import React, { useState } from 'react'
import { useEditorStore } from '../store/editorStore'
import { useProjectStore } from '../store/projectStore'
import { Button } from './ui/Button'
import {
  Undo2, Redo2, Save, Download, Code2, Bug,
  Play, FileJson, FileType, FileCog, PanelRightOpen, PanelRightClose,
  Pencil, Settings, Sparkles, BookOpen
} from 'lucide-react'
import { generateJson } from '../generators/jsonGenerator'
import { generateJava } from '../generators/javaGenerator'
import { generateKotlin } from '../generators/kotlinGenerator'

export function Header() {
  const {
    projectName, setProjectName,
    undo, redo,
    toggleCodePreview, toggleDebugPanel, toggleExportDialog, togglePluginConfig, toggleItemBuilder, toggleTemplateGallery,
    nodes, edges,
    pushHistory
  } = useEditorStore()
  const { project, saveProject, updateProject } = useProjectStore()
  const [editingName, setEditingName] = useState(false)
  const [nameInput, setNameInput] = useState(projectName)

  const handleSave = async () => {
    await saveProject(nodes, edges)
  }

  const handleExportJava = async () => {
    const code = generateJava(project, nodes, edges)
    await useProjectStore.getState().exportPlugin(code, 'java')
  }

  const handleExportKotlin = async () => {
    const code = generateKotlin(project, nodes, edges)
    await useProjectStore.getState().exportPlugin(code, 'kt')
  }

  const handleExportJson = async () => {
    const json = generateJson(project, nodes, edges)
    if (window.electronAPI) {
      await window.electronAPI.saveProject(json)
    }
  }

  return (
    <header className="h-11 glass-strong border-b border-white/5 flex items-center justify-between px-3 shrink-0 z-50">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-md bg-accent-action/20 border border-accent-action/30 flex items-center justify-center">
            <FileCog className="w-3.5 h-3.5 text-accent-action" />
          </div>
          {editingName ? (
            <input
              autoFocus
              className="bg-white/10 text-sm text-text-primary px-2 py-0.5 rounded border border-white/20 outline-none w-40"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onBlur={() => {
                setProjectName(nameInput)
                updateProject({ name: nameInput })
                setEditingName(false)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setProjectName(nameInput)
                  updateProject({ name: nameInput })
                  setEditingName(false)
                }
              }}
            />
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="flex items-center gap-1 text-sm text-text-primary hover:text-accent-action transition-colors group"
            >
              <span>{projectName}</span>
              <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-text-secondary" />
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="sm" icon={<Undo2 className="w-3.5 h-3.5" />} onClick={undo} title="Undo (Ctrl+Z)" />
        <Button variant="ghost" size="sm" icon={<Redo2 className="w-3.5 h-3.5" />} onClick={redo} title="Redo (Ctrl+Shift+Z)" />

        <div className="w-px h-5 bg-white/10 mx-1" />

        <Button variant="ghost" size="sm" icon={<Save className="w-3.5 h-3.5" />} onClick={handleSave} title="Save project (Ctrl+S)" />
        <Button variant="ghost" size="sm" icon={<Code2 className="w-3.5 h-3.5" />} onClick={toggleCodePreview} title="Preview generated code" />
        <Button variant="ghost" size="sm" icon={<Bug className="w-3.5 h-3.5" />} onClick={toggleDebugPanel} title="Debug mode" />
        <Button variant="ghost" size="sm" icon={<Settings className="w-3.5 h-3.5" />} onClick={togglePluginConfig} title="Plugin configuration" />
        <Button variant="ghost" size="sm" icon={<BookOpen className="w-3.5 h-3.5" />} onClick={toggleTemplateGallery} title="Template Gallery" />
        <Button variant="ghost" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />} onClick={toggleItemBuilder} title="Item Builder" />

        <div className="w-px h-5 bg-white/10 mx-1" />

        <Button variant="primary" size="sm" icon={<Play className="w-3.5 h-3.5" />} onClick={toggleExportDialog} title="Export plugin">
          Export
        </Button>
      </div>
    </header>
  )
}
