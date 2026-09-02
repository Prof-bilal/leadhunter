import React, { useState, useEffect } from 'react';
import { ArrowLeft, RefreshCw, Target, Download, Calendar } from 'lucide-react';
import { Lead, WebsiteAudit as AuditType, Page } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { mockAuditService } from '../../lib/mockServices';

interface AuditProps {
  lead: Lead;
  onNavigate: (page: Page, leadId?: string) => void;
  onBack: () => void;
}

export function Audit({ lead, onNavigate, onBack }: AuditProps) {
  const [audit, setAudit] = useState<AuditType | null>(null);
  const [loading, setLoading] = useState(true);
  const [rescanning, setRescanning] = useState(false);

  useEffect(() => {
    setLoading(true);
    mockAuditService.getAudit(lead.id).then(data => {
      setAudit(data);
      setLoading(false);
    });
  }, [lead.id]);

  const handleRescan = () => {
    setRescanning(true);
    mockAuditService.getAudit(lead.id).then(data => {
      setAudit(data);
      setRescanning(false);
    });
  };

  if (loading) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-[720px] mx-auto">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-20 w-full mb-3" />
          <Skeleton className="h-20 w-full mb-3" />
          <Skeleton className="h-20 w-full mb-3" />
        </div>
      </div>
    );
  }

  if (!audit) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-[var(--color-text-secondary)] mb-2">Audit not available</div>
          <Button onClick={onBack} variant="ghost" size="sm">← Go back</Button>
        </div>
      </div>
    );
  }

  const totalIssues = audit.categories.reduce((sum, cat) => sum + cat.issues.length, 0);
  const criticalIssues = audit.categories.reduce(
    (sum, cat) => sum + cat.issues.filter(i => i.severity === 'critical').length, 0
  );

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-[720px] mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer mb-4"
        >
          <ArrowLeft size={13} /> Back to lead
        </button>

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-[var(--color-text-primary)] tracking-tight mb-1">
              Website Audit: {lead.businessName}
            </h1>
            <div className="flex items-center gap-3 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1"><Calendar size={12} /> Last scanned: {audit.lastScanned}</span>
              <Badge variant={criticalIssues > 2 ? 'danger' : 'warning'}>{criticalIssues} critical issues</Badge>
            </div>
          </div>
          <Button onClick={handleRescan} loading={rescanning} variant="secondary" size="sm">
            <RefreshCw size={13} /> Rescan
          </Button>
        </div>

        {/* Audit Categories */}
        {audit.categories.map(category => (
          <div key={category.name} className="mb-6">
            <div className="label mb-2.5">
              {category.name}
              <span className="ml-2 text-[var(--color-text-muted)]">({category.issues.length} issues)</span>
            </div>
            <div className="space-y-2">
              {category.issues.map(issue => (
                <div
                  key={issue.id}
                  className="p-3 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      issue.severity === 'critical' ? 'bg-[var(--color-danger)]' :
                      issue.severity === 'warning' ? 'bg-[var(--color-warning)]' :
                      'bg-[var(--color-success)]'
                    }`} />
                    <span className="text-sm font-medium text-[var(--color-text-primary)]">{issue.title}</span>
                    <Badge variant={issue.severity === 'critical' ? 'danger' : issue.severity === 'warning' ? 'warning' : 'success'}>
                      {issue.severity === 'critical' ? 'Needs fix' : issue.severity === 'warning' ? 'Could improve' : 'Good'}
                    </Badge>
                  </div>
                  <div className="ml-4 space-y-1.5">
                    <div className="text-xs">
                      <span className="text-[var(--color-text-muted)]">Evidence: </span>
                      <span className="text-[var(--color-text-secondary)]">{issue.evidence}</span>
                    </div>
                    <div className="text-xs">
                      <span className="text-[var(--color-text-muted)]">Impact: </span>
                      <span className="text-[var(--color-text-secondary)]">{issue.impact}</span>
                    </div>
                    {issue.severity !== 'good' && (
                      <div className="text-xs">
                        <span className="text-[var(--color-accent)]">Fix: </span>
                        <span className="text-[var(--color-text-secondary)]">{issue.solution}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Bottom Line */}
        <div className="p-4 rounded-[var(--radius-md)] bg-[rgba(59,158,255,0.05)] border border-[rgba(59,158,255,0.15)] mb-6">
          <div className="label mb-2 text-[var(--color-accent)]">BOTTOM LINE</div>
          <p className="text-sm text-[var(--color-text-secondary)]">{audit.bottomLine}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-border)]">
          <Button onClick={() => onNavigate('sales-pitch', lead.id)} size="md">
            <Target size={14} /> Craft Pitch
          </Button>
          <Button variant="secondary" size="md" onClick={() => {}}>
            <Download size={14} /> Download Report
          </Button>
        </div>
      </div>
    </div>
  );
}
