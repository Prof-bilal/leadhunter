import React from 'react';
import { Search } from 'lucide-react';

interface TopBarProps {
  onOpenCommandPalette: () => void;
}

export function TopBar({ onOpenCommandPalette }: TopBarProps) {
  return (
    <div className="h-12 border-b border-[var(--color-border)] flex items-center px-4 gap-3 shrink-0 bg-[var(--color-surface)]">
      <button
        onClick={onOpenCommandPalette}
        className="flex items-center gap-2 h-8 px-3 rounded-[var(--radius-md)] bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text-muted)] text-xs hover:border-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer min-w-[220px]"
      >
        <Search size={14} />
        <span>Search leads, pages, actions...</span>
        <div className="flex-1" />
        <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[10px] font-mono border border-[var(--color-border)]">⌘K</kbd>
      </button>
      <div className="flex-1" />
      <span className="text-xs text-[var(--color-text-muted)] shrink-0 pl-3">LeadHunter Prototype</span>
    </div>
  );
}
