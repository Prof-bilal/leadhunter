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
  { id: 'leads', label: 'Campaigns', icon: <Target size={18} /> },
  { id: 'leads', label: 'Outreach', icon: <Send size={18} /> },
];

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <div className="w-[220px] h-full bg-[var(--color-surface)] border-r border-[var(--color-border)] flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-12 flex items-center px-5 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-[var(--radius-md)] bg-[var(--color-accent)] flex items-center justify-center">
            <Target size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-[var(--color-text-primary)] tracking-tight">LeadHunter</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 overflow-y-auto">
        {navItems.map((item, index) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={`${item.label}-${index}`}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)] text-sm transition-all duration-[0.1s] cursor-pointer mb-1 ${
                isActive
                  ? 'bg-[var(--color-surface-active)] text-[var(--color-text-primary)] font-medium border-l-2 border-[var(--color-accent)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] border-l-2 border-transparent'
              }`}
            >
              <span className={isActive ? 'text-[var(--color-accent)]' : ''}>{item.icon}</span>
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="px-3 py-3 border-t border-[var(--color-border)]">
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-[var(--radius-md)] text-sm transition-all duration-[0.1s] cursor-pointer ${
            currentPage === 'settings'
              ? 'bg-[var(--color-surface-active)] text-[var(--color-text-primary)] font-medium border-l-2 border-[var(--color-accent)]'
              : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text-primary)] border-l-2 border-transparent'
          }`}
        >
          <span className={currentPage === 'settings' ? 'text-[var(--color-accent)]' : ''}><Settings size={18} /></span>
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
