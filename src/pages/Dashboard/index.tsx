import React from 'react';
import { Search, BarChart3, Send, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import { Page } from '../../types';
import { mockLeads, mockSearchHistory, mockCampaigns, mockWeeklyStats } from '../../data/mockLeads';
import { Badge } from '../../components/ui/Badge';

interface DashboardProps {
  onNavigate: (page: Page, leadId?: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const highOppLeads = mockLeads
    .filter(l => l.opportunityLevel === 'high')
    .sort((a, b) => b.opportunityScore - a.opportunityScore)
    .slice(0, 5);

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-[960px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight mb-1">LeadHunter</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">What should I do next?</p>
        </div>

        {/* This Week Metrics */}
        <div className="mb-6">
          <div className="label mb-3">THIS WEEK</div>
          <div className="grid grid-cols-4 gap-3">
            <MetricCard icon={<Search size={16} />} label="Leads Found" value={mockWeeklyStats.leadsFound} color="var(--color-accent)" />
            <MetricCard icon={<BarChart3 size={16} />} label="Audits Completed" value={mockWeeklyStats.auditsCompleted} color="var(--color-success)" />
            <MetricCard icon={<Send size={16} />} label="Outreach Sent" value={mockWeeklyStats.outreachSent} color="var(--color-info)" />
            <MetricCard icon={<MessageSquare size={16} />} label="Reply Rate" value={`${mockWeeklyStats.replyRate}%`} color="var(--color-warning)" />
          </div>
        </div>

        <div className="grid grid-cols-[1fr_340px] gap-4">
          {/* High-Opportunity Leads */}
          <div>
            <div className="label mb-3">HIGH-OPPORTUNITY LEADS (NEW)</div>
            <div className="space-y-1">
              {highOppLeads.map(lead => (
                <button
                  key={lead.id}
                  onClick={() => onNavigate('lead-detail', lead.id)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer text-left group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{lead.businessName}</span>
                      <Badge variant={lead.opportunityLevel === 'high' ? 'success' : 'warning'}>
                        {lead.opportunityScore}/100
                      </Badge>
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)] truncate">
                      {lead.problems.filter(p => p.severity === 'critical').slice(0, 2).map(p => p.title).join(' · ')}
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-[var(--color-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Active Campaigns */}
            <div>
              <div className="label mb-3">ACTIVE CAMPAIGNS</div>
              <div className="space-y-1">
                {mockCampaigns.map(campaign => (
                  <div key={campaign.id} className="px-3 py-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-[var(--color-text-primary)]">{campaign.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
                      <span>{campaign.pending} pending</span>
                      <span>{campaign.sent} sent</span>
                      <span className="text-[var(--color-success)]">{campaign.replies} replies</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div>
              <div className="label mb-3">RECENT SEARCHES</div>
              <div className="space-y-1">
                {mockSearchHistory.map((search, i) => (
                  <button
                    key={i}
                    onClick={() => onNavigate('find-leads')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer text-left"
                  >
                    <Search size={13} className="text-[var(--color-text-muted)] shrink-0" />
                    <span className="text-xs text-[var(--color-text-secondary)] truncate flex-1">"{search.query}"</span>
                    <span className="text-[11px] text-[var(--color-text-muted)] shrink-0">{search.timeAgo}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 pt-5 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('find-leads')}
              className="flex items-center gap-2 h-9 px-4 rounded-[var(--radius-md)] bg-[var(--color-accent)] text-white text-sm font-medium hover:bg-[var(--color-accent-hover)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <Search size={15} />
              New Search
            </button>
            <button
              onClick={() => onNavigate('audit')}
              className="flex items-center gap-2 h-9 px-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm font-medium border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-muted)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <BarChart3 size={15} />
              Run Audit
            </button>
            <button
              onClick={() => onNavigate('leads')}
              className="flex items-center gap-2 h-9 px-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] text-[var(--color-text-primary)] text-sm font-medium border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-muted)] active:scale-[0.98] transition-all cursor-pointer"
            >
              <TrendingUp size={15} />
              View Campaigns
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string | number; color: string }) {
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
