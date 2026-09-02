import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Send, Save, Target, RefreshCw, CheckCircle } from 'lucide-react';
import { Lead, SalesPitch as PitchType, Page } from '../../types';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Skeleton } from '../../components/ui/Skeleton';
import { mockPitchService } from '../../lib/mockServices';
import { useClipboard } from '../../hooks/useClipboard';

interface SalesPitchProps {
  lead: Lead;
  onNavigate: (page: Page, leadId?: string) => void;
  onBack: () => void;
  onSave: (id: string) => void;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export function SalesPitch({ lead, onNavigate, onBack, onSave, addToast }: SalesPitchProps) {
  const [pitch, setPitch] = useState<PitchType | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState('');
  const { copy } = useClipboard();

  useEffect(() => {
    setLoading(true);
    mockPitchService.generatePitch(lead.id).then(data => {
      setPitch(data);
      setEditedMessage(data?.generatedMessage || '');
      setLoading(false);
    });
  }, [lead.id]);

  const handleRegenerate = () => {
    setGenerating(true);
    mockPitchService.generatePitch(lead.id).then(data => {
      setPitch(data);
      setEditedMessage(data?.generatedMessage || '');
      setGenerating(false);
      addToast('Pitch regenerated', 'success');
    });
  };

  const handleCopy = async () => {
    const text = editing ? editedMessage : pitch?.generatedMessage || '';
    const success = await copy(text);
    if (success) {
      addToast('Copied to clipboard', 'success');
    }
  };

  if (loading) {
    return (
      <div className="h-full overflow-y-auto p-6">
        <div className="max-w-[720px] mx-auto">
          <Skeleton className="h-6 w-48 mb-4" />
          <Skeleton className="h-8 w-64 mb-6" />
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!pitch) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <div className="text-sm text-[var(--color-text-secondary)] mb-2">Could not generate pitch</div>
          <Button onClick={onBack} variant="ghost" size="sm">← Go back</Button>
        </div>
      </div>
    );
  }

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
              Sales Pitch: {lead.businessName}
            </h1>
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <span>{lead.category}</span>
              <span>·</span>
              <Badge variant={lead.opportunityLevel === 'high' ? 'success' : 'warning'}>
                {lead.opportunityScore}/100
              </Badge>
            </div>
          </div>
          <Button onClick={handleRegenerate} loading={generating} variant="secondary" size="sm">
            <RefreshCw size={13} /> Regenerate
          </Button>
        </div>

        {/* Why This Lead */}
        <div className="mb-5 p-4 rounded-[var(--radius-md)] bg-[rgba(59,158,255,0.05)] border border-[rgba(59,158,255,0.15)]">
          <div className="label mb-2.5 text-[var(--color-accent)]">WHY THIS LEAD?</div>
          <div className="space-y-2">
            {pitch.whyThisLead.map((reason, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
                <span className="text-[var(--color-accent)] font-medium mt-0.5">{i + 1}.</span>
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pain Points */}
        <div className="mb-5 p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="label mb-2.5">TOP PAIN POINTS</div>
          <div className="space-y-1.5">
            {pitch.topPainPoints.map((point, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)]">
                <span className="text-[var(--color-danger)] mt-0.5">•</span>
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Your Angle */}
        <div className="mb-5 p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
          <div className="label mb-2.5">YOUR ANGLE</div>
          <p className="text-sm text-[var(--color-text-secondary)]">{pitch.yourAngle}</p>
        </div>

        {/* Generated Message */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="label">GENERATED OPENING</div>
            <button
              onClick={() => setEditing(!editing)}
              className="text-xs text-[var(--color-accent)] hover:underline cursor-pointer"
            >
              {editing ? 'Done editing' : 'Edit'}
            </button>
          </div>
          <div className="p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)]">
            {editing ? (
              <textarea
                value={editedMessage}
                onChange={e => setEditedMessage(e.target.value)}
                className="w-full h-48 bg-transparent text-sm text-[var(--color-text-primary)] resize-none focus:outline-none font-[var(--font-sans)] leading-relaxed"
              />
            ) : (
              <pre className="text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap font-[var(--font-sans)] leading-relaxed">
                {editedMessage}
              </pre>
            )}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--color-border)]">
              <Button onClick={handleCopy} variant="ghost" size="sm">
                <Copy size={13} /> Copy
              </Button>
              <Button onClick={() => addToast('Send functionality coming soon', 'info')} variant="ghost" size="sm">
                <Send size={13} /> Send
              </Button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-4 border-t border-[var(--color-border)]">
          <Button onClick={() => { onSave(lead.id); addToast('Lead added to campaign', 'success'); }} size="md">
            <Target size={14} /> Add to Campaign
          </Button>
          <Button onClick={() => addToast('Draft saved', 'success')} variant="secondary" size="md">
            <Save size={14} /> Save Draft
          </Button>
        </div>
      </div>
    </div>
  );
}
