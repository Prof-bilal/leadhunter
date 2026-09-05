import React from 'react';
import { Send, Mail, CheckCircle2, XCircle, Clock, Eye, MessageSquare, ArrowRight } from 'lucide-react';
import { Page } from '../../types';
import { mockOutreach } from '../../data/mockLeads';
import { Badge } from '../../components/ui/Badge';

interface OutreachProps {
  onNavigate: (page: Page, leadId?: string) => void;
}

const statusConfig: Record<string, { label: string; variant: 'success' | 'warning' | 'danger' | 'info' | 'default'; icon: React.ReactNode }> = {
  replied: { label: 'Replied', variant: 'success', icon: <MessageSquare size={12} /> },
  opened: { label: 'Opened', variant: 'info', icon: <Eye size={12} /> },
  sent: { label: 'Sent', variant: 'default', icon: <Send size={12} /> },
  pending: { label: 'Pending', variant: 'warning', icon: <Clock size={12} /> },
  bounced: { label: 'Bounced', variant: 'danger', icon: <XCircle size={12} /> },
};

export function Outreach({ onNavigate }: OutreachProps) {
  const stats = {
    total: mockOutreach.length,
    replied: mockOutreach.filter(o => o.status === 'replied').length,
    opened: mockOutreach.filter(o => o.status === 'opened').length,
    sent: mockOutreach.filter(o => o.status === 'sent').length,
    pending: mockOutreach.filter(o => o.status === 'pending').length,
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-[960px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight mb-1">Outreach</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Track your messages and responses</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <StatCard icon={<Mail size={16} />} label="Total" value={stats.total} color="var(--color-text-secondary)" />
          <StatCard icon={<MessageSquare size={16} />} label="Replied" value={stats.replied} color="var(--color-success)" />
          <StatCard icon={<Eye size={16} />} label="Opened" value={stats.opened} color="var(--color-info)" />
          <StatCard icon={<Send size={16} />} label="Sent" value={stats.sent} color="var(--color-text-muted)" />
          <StatCard icon={<Clock size={16} />} label="Pending" value={stats.pending} color="var(--color-warning)" />
        </div>

        {/* Outreach List */}
        <div>
          <div className="label mb-3">ALL MESSAGES</div>
          <div className="space-y-2">
            {mockOutreach.map(item => {
              const config = statusConfig[item.status] || statusConfig.sent;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate('lead-detail', item.leadId)}
                  className="w-full text-left px-4 py-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[var(--color-surface-active)] flex items-center justify-center text-xs font-medium text-[var(--color-text-secondary)]">
                        {item.leadName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--color-text-primary)]">{item.leadName}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{item.campaign}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={config.variant}>
                        <span className="flex items-center gap-1">{config.icon} {config.label}</span>
                      </Badge>
                      <ArrowRight size={14} className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <div className="ml-[42px]">
                    <div className="text-sm text-[var(--color-text-secondary)] mb-1">{item.subject}</div>
                    {item.reply && (
                      <div className="text-xs text-[var(--color-text-muted)] italic bg-[var(--color-bg)] rounded-[var(--radius-md)] px-3 py-2 mt-2 border border-[var(--color-border)]">
                        "{item.reply}"
                      </div>
                    )}
                    <div className="text-[11px] text-[var(--color-text-muted)] mt-1.5">{item.sentAt || 'Not sent yet'}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: number; color: string }) {
  return (
    <div className="px-4 py-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
      <div className="flex items-center gap-2 mb-2">
        <span style={{ color }}>{icon}</span>
        <span className="label">{label}</span>
      </div>
      <div className="text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight">{value}</div>
    </div>
  );
}
