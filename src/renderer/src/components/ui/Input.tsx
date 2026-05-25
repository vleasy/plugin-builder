import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
}

export function Input({ label, description, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-medium text-text-secondary">{label}</label>}
      <input
        className={`w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-text-primary placeholder-text-secondary/40 outline-none focus:border-accent-action/50 focus:bg-white/10 transition-all ${className}`}
        {...props}
      />
      {description && <p className="text-xs text-text-secondary/60">{description}</p>}
    </div>
  )
}

interface ComboBoxProps {
  label?: string
  description?: string
  options: { label: string; value: string | number | boolean }[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function ComboBox({ label, description, options, value, onChange, placeholder, className = '' }: ComboBoxProps) {
  const [inputValue, setInputValue] = React.useState(value ?? '')
  const [isOpen, setIsOpen] = React.useState(false)
  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const filtered = options.filter(
    (opt) => opt.label.toLowerCase().includes(inputValue.toLowerCase()) || String(opt.value).toLowerCase().includes(inputValue.toLowerCase())
  )

  React.useEffect(() => {
    setInputValue(value ?? '')
  }, [value])

  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectOption = (opt: { label: string; value: string | number | boolean }) => {
    setInputValue(String(opt.value))
    onChange(String(opt.value))
    setIsOpen(false)
  }

  return (
    <div className="space-y-1" ref={wrapperRef}>
      {label && <label className="block text-xs font-medium text-text-secondary">{label}</label>}
      <div className="relative">
        <input
          className={`w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-sm text-text-primary placeholder-text-secondary/40 outline-none focus:border-accent-action/50 focus:bg-white/10 transition-all ${className}`}
          value={inputValue}
          placeholder={placeholder}
          onChange={(e) => {
            setInputValue(e.target.value)
            onChange(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
        />
        <svg
          className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-text-secondary/40 pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {isOpen && filtered.length > 0 && (
          <div className="absolute z-50 top-full mt-1 w-full bg-bg-primary border border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto">
            {filtered.map((opt) => (
              <button
                key={String(opt.value)}
                type="button"
                className="w-full text-left px-3 py-1.5 text-sm text-text-primary hover:bg-white/5 transition-colors"
                onMouseDown={(e) => { e.preventDefault(); selectOption(opt) }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {description && <p className="text-xs text-text-secondary/60">{description}</p>}
    </div>
  )
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  description?: string
  options: { label: string; value: string | number | boolean }[]
}

export function Select({ label, description, options, className = '', ...props }: SelectProps) {
  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-medium text-text-secondary">{label}</label>}
      <select
        className={`w-full bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-text-primary outline-none focus:border-accent-action/50 focus:bg-white/10 transition-all appearance-none cursor-pointer ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={String(opt.value)} className="bg-bg-primary text-text-primary">
            {opt.label}
          </option>
        ))}
      </select>
      {description && <p className="text-xs text-text-secondary/60">{description}</p>}
    </div>
  )
}

interface ToggleProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className={`relative w-8 h-4 rounded-full transition-colors ${checked ? 'bg-accent-action' : 'bg-white/10'}`}>
        <div className={`absolute top-0.5 left-0.5 w-3 h-3 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
      <span className="text-xs text-text-secondary">{label}</span>
    </label>
  )
}
