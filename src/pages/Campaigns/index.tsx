import React from 'react';
import { Target, Send, MessageSquare, Clock, Plus, BarChart3 } from 'lucide-react';
import { Page } from '../../types';
import { mockCampaigns, mockOutreach } from '../../data/mockLeads';
import { Badge } from '../../components/ui/Badge';

interface CampaignsProps {
  onNavigate: (page: Page) => void;
}

export function Campaigns({ onNavigate }: CampaignsProps) {
  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-[960px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight mb-1">Campaigns</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Manage your outreach campaigns</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <StatCard icon={<Target size={16} />} label="Active" value={mockCampaigns.length} color="var(--color-accent)" />
          <StatCard icon={<Send size={16} />} label="Total Sent" value={mockCampaigns.reduce((a, c) => a + c.sent, 0)} color="var(--color-info)" />
          <StatCard icon={<MessageSquare size={16} />} label="Replies" value={mockCampaigns.reduce((a, c) => a + c.replies, 0)} color="var(--color-success)" />
          <StatCard icon={<Clock size={16} />} label="Pending" value={mockCampaigns.reduce((a, c) => a + c.pending, 0)} color="var(--color-warning)" />
        </div>

        {/* Campaign List */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="label">ALL CAMPAIGNS</div>
            <button className="flex items-center gap-2 h-8 p-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-xs font-medium border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-muted)] active:scale-[0.98] transition-all cursor-pointer">
              <Plus size={14} />
              New Campaign
            </button>
          </div>
          <div className="space-y-2">
            {mockCampaigns.map(campaign => {
              const replyRate = campaign.sent > 0 ? Math.round((campaign.replies / campaign.sent) * 100) : 0;
              const campaignOutreach = mockOutreach.filter(o => o.campaign === campaign.name);
              const replied = campaignOutreach.filter(o => o.status === 'replied').length;
              return (
                <div
                  key={campaign.id}
                  className="px-4 py-3.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-text-muted)] transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-[var(--radius-md)] bg-[var(--color-accent)]/10 flex items-center justify-center">
                        <Target size={15} className="text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-[var(--color-text-primary)]">{campaign.name}</div>
                        <div className="text-xs text-[var(--color-text-muted)]">{campaignOutreach.length} leads contacted</div>
                      </div>
                    </div>
                    <Badge variant={replyRate > 25 ? 'success' : replyRate > 15 ? 'warning' : 'default'}>
                      {replyRate}% reply rate
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                    <span className="flex items-center gap-1"><Clock size={12} /> {campaign.pending} pending</span>
                    <span className="flex items-center gap-1"><Send size={12} /> {campaign.sent} sent</span>
                    <span className="flex items-center gap-1 text-[var(--color-success)]"><MessageSquare size={12} /> {campaign.replies} replies</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="pt-5 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('find-leads')}
              className="flex items-center gap-2 h-9 px-4 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Target size={15} />
              Find Leads
            </button>
            <button
              onClick={() => onNavigate('outreach')}
              className="flex items-center gap-2 h-9 px-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm font-medium border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-muted)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <BarChart3 size={15} />
              View Outreach
            </button>
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
