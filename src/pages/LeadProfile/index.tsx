import React from 'react';
import { Star, MapPin, Globe, Phone, Save, ArrowRight, BarChart3, Target, ExternalLink } from 'lucide-react';
import { Lead, Page } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface LeadProfileProps {
  lead: Lead;
  onNavigate: (page: Page, leadId?: string) => void;
  onSave: (id: string) => void;
  onBack: () => void;
}

export function LeadProfile({ lead, onNavigate, onSave, onBack }: LeadProfileProps) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-[720px] mx-auto p-6">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer mb-4"
        >
          ← Back to results
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <h1 className="text-xl font-semibold text-[var(--color-text-primary)] tracking-tight">{lead.businessName}</h1>
              {lead.saved && <Star size={14} className="text-[var(--color-warning)] fill-[var(--color-warning)]" />}
            </div>
            <div className="flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
              <span>{lead.category}</span>
              <span className="flex items-center gap-1"><MapPin size={13} /> {lead.location}</span>
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-[var(--color-text-muted)]">
              <a href={lead.website} target="_blank" rel="noopener" className="flex items-center gap-1 hover:text-[var(--color-accent)] transition-colors">
                <Globe size={12} /> {lead.website} <ExternalLink size={10} />
              </a>
              <span className="flex items-center gap-1"><Phone size={12} /> {lead.phone}</span>
            </div>
          </div>
          <Badge variant={lead.opportunityLevel === 'high' ? 'success' : 'warning'} size="md">
            {lead.opportunityScore}/100
          </Badge>
        </div>

        {/* Opportunity Score Card */}
        <div className="mb-6 p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-3">
            <div className="label">OPPORTUNITY SCORE</div>
            <div className="text-2xl font-bold text-[var(--color-text-primary)]">{lead.opportunityScore}<span className="text-sm font-normal text-[var(--color-text-muted)]">/100</span></div>
          </div>
          <div className="space-y-2">
            <ScoreBar label="Website Quality" value={lead.websiteScore} />
            <ScoreBar label="Business Demand" value={Math.round((lead.rating / 5) * 100)} />
            <ScoreBar label="Conversion Gap" value={100 - lead.conversionScore} />
            <ScoreBar label="Competitive Fit" value={lead.seoScore + 20} />
            <ScoreBar label="Intent Signals" value={Math.round(lead.reviewCount / 10)} />
          </div>
        </div>

        {/* Why This Lead */}
        <div className="mb-6 p-4 rounded-[var(--radius-md)] bg-[rgba(59,158,255,0.05)] border border-[rgba(59,158,255,0.15)]">
          <div className="label mb-2 text-[var(--color-accent)]">WHY THIS LEAD?</div>
          <div className="space-y-2">
            <div className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
              <span className="text-[var(--color-success)] mt-0.5">✓</span>
              <span>Strong customer demand — {lead.reviewCount} Google reviews, {lead.rating}★ rating</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
              <span className="text-[var(--color-danger)] mt-0.5">✗</span>
              <span>Technical gaps — {lead.problems.filter(p => p.severity === 'critical').map(p => p.title).join(', ')}</span>
            </div>
            <div className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
              <span className="text-[var(--color-warning)] mt-0.5">!</span>
              <span>Competitive weakness — {lead.competitorSignals}</span>
            </div>
          </div>
        </div>

        {/* Detected Problems */}
        <div className="mb-6">
          <div className="label mb-3">DETECTED PROBLEMS</div>
          <div className="space-y-2">
            {lead.problems.map(problem => (
              <div key={problem.id} className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    problem.severity === 'critical' ? 'bg-[var(--color-danger)]' : problem.severity === 'warning' ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-success)]'
                  }`} />
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">{problem.title}</span>
                  <Badge variant={problem.severity === 'critical' ? 'danger' : problem.severity === 'warning' ? 'warning' : 'success'} size="sm">
                    {problem.severity}
                  </Badge>
                </div>
                <div className="ml-4 space-y-1">
                  <div className="text-xs text-[var(--color-text-muted)]">Evidence: {problem.evidence}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">Impact: {problem.impact}</div>
                  <div className="text-xs text-[var(--color-accent)]">Solution: {problem.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Business Signals */}
        <div className="mb-6 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="label mb-2">BUSINESS SIGNALS</div>
          <div className="space-y-1.5 text-sm text-[var(--color-text-secondary)]">
            <div>📱 Social Activity: {lead.socialActivity}</div>
            <div>🏢 Competitor Signals: {lead.competitorSignals}</div>
          </div>
        </div>

        {/* Recommended Approach */}
        <div className="mb-6 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="label mb-2">RECOMMENDED APPROACH</div>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Your tool solves: {lead.problems.filter(p => p.severity === 'critical').map(p => p.title).join(' + ')}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-border)]">
          <Button onClick={() => onNavigate('audit', lead.id)} variant="secondary" size="md">
            <BarChart3 size={14} /> Audit Website
          </Button>
          <Button onClick={() => onNavigate('sales-pitch', lead.id)} size="md">
            <Target size={14} /> Craft Pitch
          </Button>
          <Button onClick={() => onSave(lead.id)} variant="ghost" size="md">
            <Save size={14} /> {lead.saved ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  const v = Math.min(100, Math.max(0, value));
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-[var(--color-text-secondary)] w-[140px] shrink-0">{label}</span>
      <div className="flex-1 h-1.5 rounded-full bg-[var(--color-surface-active)] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${v > 70 ? 'bg-[var(--color-success)]' : v > 40 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-danger)]'}`}
          style={{ width: `${v}%` }}
        />
      </div>
      <span className="text-xs font-medium text-[var(--color-text-primary)] w-8 text-right">{v}%</span>
    </div>
  );
}
