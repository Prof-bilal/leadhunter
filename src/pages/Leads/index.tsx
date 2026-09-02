import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, Star, ArrowRight, Save, Target, Eye, BarChart3 } from 'lucide-react';
import { Lead, Page } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

interface LeadResultsProps {
  leads: Lead[];
  selectedLeadId: string | null;
  onSelectLead: (id: string) => void;
  onNavigate: (page: Page, leadId?: string) => void;
  onSaveLead: (id: string) => void;
}

type SortOption = 'opportunity-desc' | 'opportunity-asc' | 'reviews-desc' | 'rating-desc';

export function LeadResults({ leads, selectedLeadId, onSelectLead, onNavigate, onSaveLead }: LeadResultsProps) {
  const [sortBy, setSortBy] = useState<SortOption>('opportunity-desc');
  const [filterType, setFilterType] = useState<string>('all');
  const [sortOpen, setSortOpen] = useState(false);

  const categories = Array.from(new Set(leads.map(l => l.category)));

  const sortedLeads = [...leads]
    .filter(l => filterType === 'all' || l.category === filterType)
    .sort((a, b) => {
      switch (sortBy) {
        case 'opportunity-desc': return b.opportunityScore - a.opportunityScore;
        case 'opportunity-asc': return a.opportunityScore - b.opportunityScore;
        case 'reviews-desc': return b.reviewCount - a.reviewCount;
        case 'rating-desc': return b.rating - a.rating;
        default: return 0;
      }
    });

  const selectedLead = leads.find(l => l.id === selectedLeadId);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    const currentIdx = sortedLeads.findIndex(l => l.id === selectedLeadId);
    if (e.key === 'j' || e.key === 'J') {
      const next = currentIdx < sortedLeads.length - 1 ? currentIdx + 1 : 0;
      onSelectLead(sortedLeads[next].id);
    } else if (e.key === 'k' || e.key === 'K') {
      const prev = currentIdx > 0 ? currentIdx - 1 : sortedLeads.length - 1;
      onSelectLead(sortedLeads[prev].id);
    } else if (e.key === 's' || e.key === 'S') {
      if (selectedLeadId) onSaveLead(selectedLeadId);
    } else if (e.key === 'd' || e.key === 'D') {
      if (selectedLeadId) onNavigate('audit', selectedLeadId);
    } else if (e.key === 'a' || e.key === 'A') {
      if (selectedLeadId) onSaveLead(selectedLeadId);
    }
  }, [sortedLeads, selectedLeadId, onSelectLead, onSaveLead, onNavigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const sortLabels: Record<SortOption, string> = {
    'opportunity-desc': 'Opportunity (High → Low)',
    'opportunity-asc': 'Opportunity (Low → High)',
    'reviews-desc': 'Most Reviews',
    'rating-desc': 'Highest Rating',
  };

  return (
    <div className="h-full flex">
      {/* Filters Panel */}
      <div className="w-[220px] shrink-0 border-r border-[var(--color-border)] p-3 overflow-y-auto">
        <div className="label mb-3">SORT BY</div>
        <div className="relative mb-4">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            className="w-full flex items-center justify-between h-8 px-2.5 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] hover:border-[var(--color-text-muted)] transition-colors cursor-pointer"
          >
            <span className="truncate">{sortLabels[sortBy]}</span>
            <ChevronDown size={13} className={`shrink-0 transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
          </button>
          {sortOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-md)] shadow-[var(--shadow-md)] z-10 py-1">
              {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => { setSortBy(key); setSortOpen(false); }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs hover:bg-[var(--color-surface-hover)] cursor-pointer ${sortBy === key ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-secondary)]'}`}
                >
                  {sortBy === key && '✓ '}{label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="label mb-2">FILTERS</div>
        <div className="space-y-1.5 mb-4">
          <FilterChip label="All" active={filterType === 'all'} onClick={() => setFilterType('all')} count={leads.length} />
          {categories.map(cat => (
            <FilterChip
              key={cat}
              label={cat}
              active={filterType === cat}
              onClick={() => setFilterType(filterType === cat ? 'all' : cat)}
              count={leads.filter(l => l.category === cat).length}
            />
          ))}
        </div>

        <div className="pt-3 border-t border-[var(--color-border)]">
          <div className="label mb-2">KEYBOARD</div>
          <div className="space-y-1 text-[11px] text-[var(--color-text-muted)]">
            <div>J / K — Navigate</div>
            <div>S — Save lead</div>
            <div>D — Audit lead</div>
            <div>A — Add to campaign</div>
          </div>
        </div>
      </div>

      {/* Lead List */}
      <div className="w-[360px] shrink-0 border-r border-[var(--color-border)] overflow-y-auto">
        <div className="px-3 py-2.5 border-b border-[var(--color-border)] flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-muted)]">{sortedLeads.length} leads</span>
        </div>
        <div>
          {sortedLeads.map(lead => (
            <button
              key={lead.id}
              onClick={() => onSelectLead(lead.id)}
              className={`w-full text-left px-3 py-3 border-b border-[var(--color-border)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer ${
                selectedLeadId === lead.id ? 'bg-[var(--color-surface-active)] border-l-2 border-l-[var(--color-accent)]' : 'border-l-2 border-l-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-1">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm font-medium text-[var(--color-text-primary)] truncate">{lead.businessName}</span>
                  {lead.saved && <Save size={11} className="text-[var(--color-warning)] shrink-0" />}
                </div>
                <Badge variant={lead.opportunityLevel === 'high' ? 'success' : lead.opportunityLevel === 'medium' ? 'warning' : 'default'}>
                  {lead.opportunityScore}
                </Badge>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mb-1.5">{lead.category} · {lead.location}</div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {lead.problems.filter(p => p.severity === 'critical').slice(0, 2).map(p => (
                  <span key={p.id} className="text-[11px] text-[var(--color-danger)] bg-[rgba(248,81,73,0.1)] px-1.5 py-0.5 rounded">
                    {p.title}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-1.5 text-[11px] text-[var(--color-text-muted)]">
                <span className="flex items-center gap-0.5"><Star size={10} className="text-[var(--color-warning)]" /> {lead.rating}</span>
                <span>{lead.reviewCount} reviews</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="flex-1 overflow-y-auto">
        {selectedLead ? (
          <LeadDetailPanel lead={selectedLead} onNavigate={onNavigate} onSave={onSaveLead} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center px-8">
            <Eye size={32} className="text-[var(--color-text-muted)] mb-3" />
            <div className="text-sm font-medium text-[var(--color-text-secondary)] mb-1">Select a lead</div>
            <div className="text-xs text-[var(--color-text-muted)]">Click on a lead to view details, or press J/K to navigate</div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterChip({ label, active, onClick, count }: { label: string; active: boolean; onClick: () => void; count?: number }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between h-7 px-2.5 rounded-[var(--radius-sm)] text-xs transition-colors cursor-pointer ${
        active
          ? 'bg-[rgba(59,158,255,0.15)] text-[var(--color-accent)] border border-[rgba(59,158,255,0.3)]'
          : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]'
      }`}
    >
      <span className="truncate">{label}</span>
      {count !== undefined && <span className="text-[10px] text-[var(--color-text-muted)]">{count}</span>}
    </button>
  );
}

function LeadDetailPanel({ lead, onNavigate, onSave }: { lead: Lead; onNavigate: (page: Page, leadId?: string) => void; onSave: (id: string) => void }) {
  return (
    <div className="p-4 animate-fade-in">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">{lead.businessName}</h2>
          <Badge variant={lead.opportunityLevel === 'high' ? 'success' : 'warning'}>
            {lead.opportunityScore}/100 {lead.opportunityLevel.toUpperCase()}
          </Badge>
        </div>
        <div className="text-sm text-[var(--color-text-secondary)]">{lead.category} · {lead.location}</div>
        <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{lead.website}</div>
      </div>

      {/* Score Breakdown */}
      <div className="mb-4 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
        <div className="label mb-2">OPPORTUNITY SCORE</div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <ScoreRow label="Website Quality" value={lead.websiteScore} />
          <ScoreRow label="Business Demand" value={Math.round((lead.rating / 5) * 100)} />
          <ScoreRow label="Conversion Gap" value={100 - lead.conversionScore} />
          <ScoreRow label="Competitive Fit" value={lead.seoScore + 20} />
        </div>
      </div>

      {/* Problems */}
      <div className="mb-4">
        <div className="label mb-2">DETECTED PROBLEMS</div>
        <div className="space-y-1.5">
          {lead.problems.map(problem => (
            <div key={problem.id} className="flex items-start gap-2 px-2.5 py-2 rounded-[var(--radius-sm)] bg-[var(--color-surface)] border border-[var(--color-border)]">
              <span className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${
                problem.severity === 'critical' ? 'bg-[var(--color-danger)]' : problem.severity === 'warning' ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-success)]'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-[var(--color-text-primary)]">{problem.title}</div>
                <div className="text-[11px] text-[var(--color-text-muted)] mt-0.5">{problem.evidence}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths */}
      <div className="mb-4">
        <div className="label mb-2">STRENGTHS</div>
        <div className="flex flex-wrap gap-1.5">
          {lead.strengths.map((s, i) => (
            <span key={i} className="text-[11px] px-2 py-1 rounded bg-[rgba(63,185,80,0.1)] text-[var(--color-success)]">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Business Signals */}
      <div className="mb-4 p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
        <div className="label mb-2">BUSINESS SIGNALS</div>
        <div className="space-y-1.5 text-xs text-[var(--color-text-secondary)]">
          <div>📱 Social: {lead.socialActivity}</div>
          <div>🏢 Competitors: {lead.competitorSignals}</div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-3 border-t border-[var(--color-border)]">
        <Button onClick={() => onNavigate('audit', lead.id)} size="sm" variant="secondary">
          <BarChart3 size={13} /> Audit
        </Button>
        <Button onClick={() => onNavigate('sales-pitch', lead.id)} size="sm">
          <Target size={13} /> Pitch
        </Button>
        <Button onClick={() => onSave(lead.id)} size="sm" variant="ghost">
          <Save size={13} /> {lead.saved ? 'Saved' : 'Save'}
        </Button>
      </div>
    </div>
  );
}

function ScoreRow({ label, value }: { label: string; value: number }) {
  const clampedValue = Math.min(100, Math.max(0, value));
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[var(--color-text-secondary)]">{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-16 h-1.5 rounded-full bg-[var(--color-surface-active)] overflow-hidden">
          <div
            className={`h-full rounded-full ${clampedValue > 70 ? 'bg-[var(--color-success)]' : clampedValue > 40 ? 'bg-[var(--color-warning)]' : 'bg-[var(--color-danger)]'}`}
            style={{ width: `${clampedValue}%` }}
          />
        </div>
        <span className="text-xs font-medium text-[var(--color-text-primary)] w-7 text-right">{clampedValue}%</span>
      </div>
    </div>
  );
}
