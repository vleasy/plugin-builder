import React from 'react'
import { Header } from './Header'
import { LeftSidebar } from './LeftSidebar'
import { RightSidebar } from './RightSidebar'
import { FlowCanvas } from './FlowCanvas'
import { CodePreview } from './CodePreview'
import { ExportDialog } from './ExportDialog'
import { DebugPanel } from './DebugPanel'
import { PluginConfigDialog } from './PluginConfigDialog'
import { ItemBuilderDialog } from './ItemBuilderDialog'
import { TemplateGalleryDialog } from './TemplateGalleryDialog'
import { useEditorStore } from '../store/editorStore'

export function EditorLayout() {
  const showPluginConfig = useEditorStore((s) => s.showPluginConfig)
  const togglePluginConfig = useEditorStore((s) => s.togglePluginConfig)
  const showItemBuilder = useEditorStore((s) => s.showItemBuilder)
  const toggleItemBuilder = useEditorStore((s) => s.toggleItemBuilder)
  const showTemplateGallery = useEditorStore((s) => s.showTemplateGallery)
  const toggleTemplateGallery = useEditorStore((s) => s.toggleTemplateGallery)
  return (
    <div className="h-screen flex flex-col bg-bg-primary overflow-hidden">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <LeftSidebar />
        <FlowCanvas />
        <RightSidebar />
      </div>
      <CodePreview />
      <ExportDialog />
      <DebugPanel />
      <PluginConfigDialog open={showPluginConfig} onClose={togglePluginConfig} />
      <ItemBuilderDialog open={showItemBuilder} onClose={toggleItemBuilder} />
      <TemplateGalleryDialog open={showTemplateGallery} onClose={toggleTemplateGallery} />
    </div>
  )
}
