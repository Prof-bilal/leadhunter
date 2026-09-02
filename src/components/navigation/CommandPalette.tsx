import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Home, FolderOpen, BarChart3, Target, Send, Zap, Settings } from 'lucide-react';
import { Page } from '../../types';
import { mockLeads } from '../../data/mockLeads';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page, leadId?: string) => void;
}

const quickActions = [
  { id: 'find-leads', label: 'Find Leads', icon: <Search size={15} />, page: 'find-leads' as Page },
  { id: 'dashboard', label: 'Open Dashboard', icon: <Home size={15} />, page: 'dashboard' as Page },
  { id: 'leads', label: 'View All Leads', icon: <FolderOpen size={15} />, page: 'leads' as Page },
  { id: 'campaigns', label: 'View Campaigns', icon: <Target size={15} />, page: 'leads' as Page },
  { id: 'outreach', label: 'View Outreach', icon: <Send size={15} />, page: 'leads' as Page },
  { id: 'settings', label: 'Open Settings', icon: <Settings size={15} />, page: 'settings' as Page },
];

export function CommandPalette({ isOpen, onClose, onNavigate }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const filteredActions = quickActions.filter(a =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  const filteredLeads = mockLeads.filter(l =>
    l.businessName.toLowerCase().includes(query.toLowerCase()) ||
    l.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  const allItems = [
    ...filteredActions.map(a => ({ type: 'action' as const, id: a.id, label: a.label, icon: a.icon, page: a.page })),
    ...filteredLeads.map(l => ({ type: 'lead' as const, id: l.id, label: `${l.businessName} (${l.opportunityScore}/100)`, icon: <Zap size={15} className="text-[var(--color-warning)]" />, page: 'lead-detail' as Page, leadId: l.id })),
  ];

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, allItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && allItems[selectedIndex]) {
      const item = allItems[selectedIndex];
      onNavigate(item.page, (item as { leadId?: string }).leadId);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [allItems, selectedIndex, onNavigate, onClose]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[250] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div
        className="relative w-[520px] bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] shadow-[var(--shadow-xl)] animate-scale-in overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-2.5 px-4 h-12 border-b border-[var(--color-border)]">
          <Search size={16} className="text-[var(--color-text-muted)] shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search leads, pages, actions..."
            className="flex-1 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-hover)] text-[10px] font-mono text-[var(--color-text-muted)] border border-[var(--color-border)]">ESC</kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[320px] overflow-y-auto py-1.5">
          {filteredActions.length > 0 && (
            <div className="px-2 mb-1">
              <div className="px-2 py-1 text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Quick Actions</div>
              {filteredActions.map((action, i) => (
                <button
                  key={action.id}
                  onClick={() => { onNavigate(action.page); onClose(); }}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[var(--radius-sm)] text-sm cursor-pointer transition-colors ${
                    selectedIndex === i ? 'bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                  }`}
                >
                  <span className="text-[var(--color-text-muted)]">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {filteredLeads.length > 0 && (
            <div className="px-2">
              <div className="px-2 py-1 text-[11px] font-medium text-[var(--color-text-muted)] uppercase tracking-wider">Leads</div>
              {filteredLeads.map((lead, i) => {
                const idx = filteredActions.length + i;
                return (
                  <button
                    key={lead.id}
                    onClick={() => { onNavigate('lead-detail', lead.id); onClose(); }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-[var(--radius-sm)] text-sm cursor-pointer transition-colors ${
                      selectedIndex === idx ? 'bg-[var(--color-surface-hover)] text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)]'
                    }`}
                  >
                    <Zap size={15} className="text-[var(--color-warning)] shrink-0" />
                    <span className="truncate">{lead.businessName}</span>
                    <span className="ml-auto text-[11px] text-[var(--color-text-muted)]">{lead.opportunityScore}/100</span>
                  </button>
                );
              })}
            </div>
          )}

          {allItems.length === 0 && (
            <div className="px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
              No results found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
