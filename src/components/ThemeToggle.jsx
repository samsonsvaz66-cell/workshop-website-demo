import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

/**
 * ThemeToggle component supporting Light and Dark themes.
 * Persists selection via useTheme hook to localStorage.
 */
export const ThemeToggle = ({ compact = false, className = '' }) => {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ];

  return (
    <div
      role="group"
      aria-label="Theme selection"
      className={`inline-flex items-center p-1 rounded-xl bg-surface-secondary/80 border border-border-default backdrop-blur-sm ${className}`}
    >
      {options.map((opt) => {
        const Icon = opt.icon;
        const isActive = theme === opt.value;

        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => setTheme(opt.value)}
            aria-pressed={isActive}
            title={`${opt.label} Theme${isActive ? ' (Active)' : ''}`}
            className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 select-none ${
              isActive
                ? 'bg-surface-card text-brand-500 shadow-sm border border-border-default/60 font-semibold'
                : 'text-content-muted hover:text-content-primary hover:bg-surface-tertiary/50'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 transition-transform ${isActive ? 'scale-110' : ''}`} />
            {!compact && <span className="capitalize">{opt.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeToggle;
