import React from 'react';
import { ArrowLeft, User, Palette, Keyboard, Bell, CreditCard, Monitor } from 'lucide-react';
import { Page } from '../../types';

interface SettingsProps {
  onNavigate: (page: Page) => void;
}

export function Settings({ onNavigate }: SettingsProps) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-[640px]">
        <button
          onClick={() => onNavigate('dashboard')}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer mb-5"
        >
          <ArrowLeft size={13} /> Back to dashboard
        </button>

        <h1 className="text-xl font-semibold text-[var(--color-text-primary)] tracking-tight mb-1">Settings</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mb-7">Manage your account and preferences</p>

        {/* Account */}
        <Section title="ACCOUNT" icon={<User size={15} />}>
          <SettingRow label="Name" value="Bilal" />
          <SettingRow label="Email" value="bilal@example.com" />
          <SettingRow label="Workspace" value="Personal Workspace" />
        </Section>

        {/* Appearance */}
        <Section title="APPEARANCE" icon={<Palette size={15} />}>
          <SettingRow label="Theme" value="Dark" action="Change" />
          <SettingRow label="Accent Color" value="Blue (#3b9eff)" action="Change" />
          <SettingRow label="Font Size" value="Default (14px)" action="Change" />
        </Section>

        {/* Keyboard Shortcuts */}
        <Section title="KEYBOARD SHORTCUTS" icon={<Keyboard size={15} />}>
          <ShortcutRow shortcut="⌘K" description="Open Command Palette" />
          <ShortcutRow shortcut="⌘D" description="Go to Dashboard" />
          <ShortcutRow shortcut="⌘F" description="Go to Find Leads" />
          <ShortcutRow shortcut="⌘L" description="Go to Leads" />
          <ShortcutRow shortcut="J / K" description="Navigate leads up/down" />
          <ShortcutRow shortcut="S" description="Save lead" />
          <ShortcutRow shortcut="D" description="Open audit" />
          <ShortcutRow shortcut="A" description="Add to campaign" />
        </Section>

        {/* Notifications */}
        <Section title="NOTIFICATIONS" icon={<Bell size={15} />}>
          <ToggleRow label="Email notifications" enabled={false} />
          <ToggleRow label="Desktop notifications" enabled={true} />
          <ToggleRow label="Campaign updates" enabled={true} />
        </Section>

        {/* Display */}
        <Section title="DISPLAY" icon={<Monitor size={15} />}>
          <SettingRow label="Sidebar width" value="220px" />
          <SettingRow label="Density" value="Comfortable" action="Change" />
          <SettingRow label="Show lead scores" value="Enabled" action="Change" />
        </Section>

        {/* Billing */}
        <Section title="BILLING" icon={<CreditCard size={15} />}>
          <SettingRow label="Plan" value="Free Trial" />
          <SettingRow label="Leads used" value="47 / 100" />
          <SettingRow label="Audits used" value="12 / 25" />
          <div className="pt-1">
            <button className="h-9 px-4 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] transition-colors cursor-pointer">
              Upgrade Plan
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <div className="flex items-center gap-2 label mb-3">
        <span className="text-[var(--color-text-muted)]">{icon}</span>
        {title}
      </div>
      <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] divide-y divide-[var(--color-border)]">
        {children}
      </div>
    </div>
  );
}

function SettingRow({ label, value, action }: { label: string; value: string; action?: string }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm text-[var(--color-text-primary)]">{value}</span>
        {action && (
          <button className="text-xs text-[var(--color-accent)] hover:underline cursor-pointer">{action}</button>
        )}
      </div>
    </div>
  );
}

function ShortcutRow({ shortcut, description }: { shortcut: string; description: string }) {
  return (
    <div className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
      <span className="text-sm text-[var(--color-text-secondary)]">{description}</span>
      <kbd className="px-2 py-0.5 rounded bg-[var(--color-surface-hover)] text-xs font-mono text-[var(--color-text-muted)] border border-[var(--color-border)]">{shortcut}</kbd>
    </div>
  );
}

function ToggleRow({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <button className={`w-10 h-[22px] rounded-full relative cursor-pointer transition-colors ${enabled ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-surface-active)] border border-[var(--color-border)]'}`}>
        <div className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${enabled ? 'translate-x-[22px]' : 'translate-x-[3px]'}`} />
      </button>
    </div>
  );
}
