import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MapPin, Building2, Users, Zap } from 'lucide-react';
import { Page } from '../../types';
import { mockSearchHistory } from '../../data/mockLeads';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';

interface FindLeadsProps {
  onNavigate: (page: Page) => void;
  onSearch: (query: string, location: string) => void;
  isSearching: boolean;
  searchStep: string;
}

export function FindLeads({ onNavigate, onSearch, isSearching, searchStep }: FindLeadsProps) {
  const [query, setQuery] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [location, setLocation] = useState('');
  const [industry, setIndustry] = useState('');
  const [companySize, setCompanySize] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query, location);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      handleSearch();
    }
    if (e.key === 'Escape') {
      setQuery('');
    }
  };

  return (
    <div className="h-full overflow-y-auto p-6">
      <div className="max-w-[640px] mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight mb-1">Find Leads</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Discover potential customers for your business</p>
        </div>

        {/* Search Input */}
        <div className="mb-4">
          <label className="label block mb-2">WHAT DO YOU SELL?</label>
          <div className="relative">
            <Input
              icon={<Search size={15} />}
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder='e.g., "I build websites for restaurants"'
              className="h-11 text-base"
            />
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
            <kbd className="px-1 py-0.5 rounded bg-[var(--color-surface-hover)] font-mono border border-[var(--color-border)]">⌘</kbd>
            <span>+</span>
            <kbd className="px-1 py-0.5 rounded bg-[var(--color-surface-hover)] font-mono border border-[var(--color-border)]">Enter</kbd>
            <span>to search</span>
          </div>
        </div>

        {/* Advanced Targeting */}
        <div className="mb-6">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer mb-3"
          >
            {showAdvanced ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            Advanced Targeting
            <span className="text-[11px] text-[var(--color-text-muted)]">(optional)</span>
          </button>

          {showAdvanced && (
            <div className="space-y-3 p-4 rounded-[var(--radius-md)] bg-[var(--color-surface)] border border-[var(--color-border)] animate-fade-in">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label block mb-1.5">LOCATION</label>
                  <div className="relative">
                    <Input
                      icon={<MapPin size={14} />}
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="e.g., Karachi"
                    />
                  </div>
                </div>
                <div>
                  <label className="label block mb-1.5">INDUSTRY</label>
                  <div className="relative">
                    <Input
                      icon={<Building2 size={14} />}
                      value={industry}
                      onChange={e => setIndustry(e.target.value)}
                      placeholder="e.g., Restaurant"
                    />
                  </div>
                </div>
                <div>
                  <label className="label block mb-1.5">COMPANY SIZE</label>
                  <div className="relative">
                    <Input
                      icon={<Users size={14} />}
                      value={companySize}
                      onChange={e => setCompanySize(e.target.value)}
                      placeholder="Any"
                    />
                  </div>
                </div>
                <div>
                  <label className="label block mb-1.5">SIGNALS</label>
                  <div className="relative">
                    <Input
                      icon={<Zap size={14} />}
                      placeholder="e.g., hiring, funding"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          disabled={!query.trim() || isSearching}
          loading={isSearching}
          size="lg"
          className="w-full mb-2"
        >
          {isSearching ? searchStep : 'Find Potential Customers'}
        </Button>

        {isSearching && (
          <div className="mt-3 animate-fade-in">
            <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
              <svg className="animate-spin h-4 w-4 text-[var(--color-accent)]" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>{searchStep}</span>
            </div>
          </div>
        )}

        {/* Recent Searches */}
        <div className="mt-8">
          <div className="label mb-3">RECENT SEARCHES</div>
          <div className="space-y-1">
            {mockSearchHistory.map((search, i) => (
              <button
                key={i}
                onClick={() => { setQuery(search.query); setLocation(search.location); }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)] transition-colors cursor-pointer text-left"
              >
                <Search size={13} className="text-[var(--color-text-muted)] shrink-0" />
                <span className="text-sm text-[var(--color-text-secondary)] flex-1">"{search.query}"</span>
                <span className="text-xs text-[var(--color-text-muted)]">{search.location}</span>
                <span className="text-[11px] text-[var(--color-text-muted)]">{search.timeAgo}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
