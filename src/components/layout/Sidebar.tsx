import React from 'react';
import { Home, Search, FolderOpen, BarChart3, Target, Send, Settings } from 'lucide-react';
import { Page } from '../../types';

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <Home size={18} /> },
  { id: 'find-leads', label: 'Find Leads', icon: <Search size={18} /> },
  { id: 'leads', label: 'Leads', icon: <FolderOpen size={18} /> },
  { id: 'audit', label: 'Audits', icon: <BarChart3 size={18} /> },
  { id: 'campaigns', label: 'Campaigns', icon: <Target size={18} /> },
  { id: 'outreach', label: 'Outreach', icon: <Send size={18} /> },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-[220px] h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col shrink-0">
      {/* Navigation */}
      <nav className="flex-1 py-3 px-5 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => onNavigate(item.id)}
              style={isActive ? { backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)' } : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)] text-sm transition-all duration-[0.1s] cursor-pointer mb-1 ${
                isActive
                  ? 'text-[var(--color-accent)] font-medium'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
              }`}
            >
              <span className={isActive ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-5 py-3 border-t border-[var(--color-border)]">
        <button
          onClick={() => onNavigate('settings')}
          style={currentPage === 'settings' ? { backgroundColor: 'color-mix(in srgb, var(--color-accent) 10%, transparent)' } : undefined}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)] text-sm transition-all duration-[0.1s] cursor-pointer ${
            currentPage === 'settings'
              ? 'text-[var(--color-accent)] font-medium'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)]'
          }`}
        >
          <span className={currentPage === 'settings' ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-muted)]'}><Settings size={18} /></span>
          Settings
        </button>
      </div>

      {/* User Profile */}
      <div className="px-4 py-3 border-t border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[var(--color-surface-active)] flex items-center justify-center text-xs font-medium text-[var(--color-text-secondary)]">
            B
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-[var(--color-text-primary)] truncate">Bilal</div>
            <div className="text-[11px] text-[var(--color-text-muted)] truncate">Personal Workspace</div>
          </div>
        </div>
      </div>
    </div>
  );
}
