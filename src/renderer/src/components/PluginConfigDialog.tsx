import React, { useState } from 'react'
import { useProjectStore } from '../store/projectStore'
import { X, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

export function PluginConfigDialog({ open, onClose }: Props) {
  const { project, updateProject, addCommand, updateCommand, removeCommand, addPermission, updatePermission, removePermission, addPermissionChild, updatePermissionChild, removePermissionChild } = useProjectStore()

  const [tab, setTab] = useState<'general' | 'commands' | 'permissions'>('general')

  if (!open) return null

  const generatePluginYml = () => {
    let yml = `name: ${project.name}\nversion: ${project.version}\nmain: ${project.mainClass}\napi-version: ${project.apiVersion}\n`

    if (project.author) yml += `author: ${project.author}\n`
    if (project.description) yml += `description: ${project.description}\n`

    if (project.commands.length > 0) {
      yml += '\ncommands:\n'
      for (const cmd of project.commands) {
        if (!cmd.name) continue
        yml += `  ${cmd.name}:\n`
        if (cmd.description) yml += `    description: ${cmd.description}\n`
        if (cmd.aliases.length > 0) yml += `    aliases: [${cmd.aliases.join(', ')}]\n`
        if (cmd.permission) yml += `    permission: ${cmd.permission}\n`
        if (cmd.usage) yml += `    usage: ${cmd.usage}\n`
      }
    }

    if (project.permissions.length > 0) {
      yml += '\npermissions:\n'
      for (const perm of project.permissions) {
        if (!perm.name) continue
        yml += `  ${perm.name}:\n`
        if (perm.description) yml += `    description: ${perm.description}\n`
        if (perm.default !== 'op') yml += `    default: ${perm.default}\n`
        if (perm.children.length > 0) {
          yml += '    children:\n'
          for (const child of perm.children) {
            if (!child.name) continue
            yml += `      ${child.name}: ${child.value}\n`
          }
        }
      }
    }

    return yml
  }

  const [ymlPreview, setYmlPreview] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[640px] max-h-[80vh] glass-strong rounded-2xl border border-white/10 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
          <h2 className="text-sm font-medium text-text-primary">Plugin Configuration</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setYmlPreview(!ymlPreview); navigator.clipboard?.writeText(generatePluginYml()) }}
              className="text-[11px] text-text-secondary hover:text-text-primary transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              {ymlPreview ? 'Hide YAML' : 'Copy YAML'}
            </button>
            <button onClick={onClose} className="text-text-secondary hover:text-text-primary transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex border-b border-white/5">
          {(['general', 'commands', 'permissions'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2 text-xs font-medium transition-colors capitalize ${
                tab === t ? 'text-accent-action border-b-2 border-accent-action' : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {tab === 'general' && (
            <div className="space-y-3">
              {[
                { key: 'name', label: 'Plugin Name' },
                { key: 'version', label: 'Version' },
                { key: 'mainClass', label: 'Main Class' },
                { key: 'apiVersion', label: 'API Version' },
                { key: 'author', label: 'Author' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[11px] text-text-secondary mb-1 block">{f.label}</label>
                  <input
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-action/50"
                    value={(project as any)[f.key] || ''}
                    onChange={(e) => updateProject({ [f.key]: e.target.value })}
                  />
                </div>
              ))}
              <div>
                <label className="text-[11px] text-text-secondary mb-1 block">Description</label>
                <textarea
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-text-primary outline-none focus:border-accent-action/50 resize-none h-16"
                  value={project.description}
                  onChange={(e) => updateProject({ description: e.target.value })}
                />
              </div>
            </div>
          )}

          {tab === 'commands' && (
            <div className="space-y-2">
              {project.commands.map((cmd, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-text-secondary">Command {i + 1}</span>
                    <button onClick={() => removeCommand(i)} className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-text-secondary/60">Name</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-action/50" value={cmd.name} onChange={e => updateCommand(i, { name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-[10px] text-text-secondary/60">Aliases (comma-separated)</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-action/50" value={cmd.aliases.join(', ')} onChange={e => updateCommand(i, { aliases: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} />
                    </div>
                    <div>
                      <label className="text-[10px] text-text-secondary/60">Description</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-action/50" value={cmd.description} onChange={e => updateCommand(i, { description: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-[10px] text-text-secondary/60">Permission</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-action/50" value={cmd.permission} onChange={e => updateCommand(i, { permission: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-text-secondary/60">Usage</label>
                    <input className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-action/50" value={cmd.usage} onChange={e => updateCommand(i, { usage: e.target.value })} />
                  </div>
                </div>
              ))}
              <button onClick={addCommand} className="w-full py-2 border border-dashed border-white/10 rounded-xl text-xs text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors">
                + Add Command
              </button>
            </div>
          )}

          {tab === 'permissions' && (
            <div className="space-y-2">
              {project.permissions.map((perm, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-text-secondary">Permission {i + 1}</span>
                    <button onClick={() => removePermission(i)} className="text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-text-secondary/60">Name</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-action/50" value={perm.name} onChange={e => updatePermission(i, { name: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-[10px] text-text-secondary/60">Default</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-action/50" value={perm.default} onChange={e => updatePermission(i, { default: e.target.value as any })}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                        <option value="op">op</option>
                        <option value="not-op">not-op</option>
                      </select>
                    </div>
                    <div className="col-span-2">
                      <label className="text-[10px] text-text-secondary/60">Description</label>
                      <input className="w-full bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-xs text-text-primary outline-none focus:border-accent-action/50" value={perm.description} onChange={e => updatePermission(i, { description: e.target.value })} />
                    </div>
                  </div>
                  {perm.children.length > 0 && (
                    <div className="ml-3 space-y-1.5 border-l border-white/10 pl-3">
                      {perm.children.map((child, ci) => (
                        <div key={ci} className="flex items-center gap-2">
                          <input className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-text-primary outline-none focus:border-accent-action/50" placeholder="child.permission" value={child.name} onChange={e => updatePermissionChild(i, ci, { name: e.target.value })} />
                          <select className="bg-white/5 border border-white/10 rounded-lg px-2 py-1 text-[11px] text-text-primary outline-none" value={String(child.value)} onChange={e => updatePermissionChild(i, ci, { value: e.target.value === 'true' })}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                          </select>
                          <button onClick={() => removePermissionChild(i, ci)} className="text-red-400 hover:text-red-300 shrink-0"><Trash2 className="w-2.5 h-2.5" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button onClick={() => addPermissionChild(i)} className="text-[11px] text-text-secondary hover:text-text-primary transition-colors">
                    + Add child
                  </button>
                </div>
              ))}
              <button onClick={addPermission} className="w-full py-2 border border-dashed border-white/10 rounded-xl text-xs text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors">
                + Add Permission
              </button>
            </div>
          )}
        </div>

        {ymlPreview && (
          <div className="border-t border-white/5 p-3">
            <pre className="text-[11px] text-text-secondary bg-black/30 rounded-lg p-3 max-h-40 overflow-y-auto select-text cursor-text">{generatePluginYml()}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
