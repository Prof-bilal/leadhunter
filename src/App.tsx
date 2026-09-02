import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';
import { CommandPalette } from './components/navigation/CommandPalette';
import { ToastContainer } from './components/ui/Toast';
import { Dashboard } from './pages/Dashboard';
import { FindLeads } from './pages/FindLeads';
import { LeadResults } from './pages/Leads';
import { LeadProfile } from './pages/LeadProfile';
import { Audit } from './pages/Audit';
import { SalesPitch } from './pages/SalesPitch';
import { Settings } from './pages/Settings';
import { Page, Lead } from './types';
import { mockLeadService } from './lib/mockServices';
import { useToast } from './hooks/useToast';
import { mockLeads } from './data/mockLeads';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [searchResults, setSearchResults] = useState<Lead[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState('');
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const selectedLead = selectedLeadId ? leads.find(l => l.id === selectedLeadId) || null : null;

  const handleNavigate = useCallback((page: Page, leadId?: string) => {
    setCurrentPage(page);
    if (leadId) {
      setSelectedLeadId(leadId);
      if (page === 'lead-detail') {
        setCurrentPage('lead-detail');
      }
    }
  }, []);

  const handleSearch = useCallback(async (query: string, location: string) => {
    setIsSearching(true);
    setSearchStep('Finding businesses...');
    try {
      const result = await mockLeadService.findLeads(`${query} ${location}`, step => setSearchStep(step));
      setSearchResults(result.leads);
      setCurrentPage('leads');
      if (result.leads.length > 0) {
        setSelectedLeadId(result.leads[0].id);
      }
    } catch {
      addToast('Search failed. Please try again.', 'error');
    } finally {
      setIsSearching(false);
      setSearchStep('');
    }
  }, [addToast]);

  const handleSaveLead = useCallback((id: string) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, saved: !l.saved } : l));
    setSearchResults(prev => prev.map(l => l.id === id ? { ...l, saved: !l.saved } : l));
    const lead = leads.find(l => l.id === id);
    if (lead) {
      addToast(lead.saved ? 'Lead unsaved' : 'Lead saved', 'success');
    }
  }, [leads, addToast]);

  const handleSelectLead = useCallback((id: string) => {
    setSelectedLeadId(id);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
        e.preventDefault();
        setCurrentPage('dashboard');
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'f') {
        e.preventDefault();
        setCurrentPage('find-leads');
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault();
        setCurrentPage('leads');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'find-leads':
        return (
          <FindLeads
            onNavigate={handleNavigate}
            onSearch={handleSearch}
            isSearching={isSearching}
            searchStep={searchStep}
          />
        );
      case 'leads':
        return (
          <LeadResults
            leads={searchResults.length > 0 ? searchResults : leads}
            selectedLeadId={selectedLeadId}
            onSelectLead={handleSelectLead}
            onNavigate={handleNavigate}
            onSaveLead={handleSaveLead}
          />
        );
      case 'lead-detail':
        return selectedLead ? (
          <LeadProfile
            lead={selectedLead}
            onNavigate={handleNavigate}
            onSave={handleSaveLead}
            onBack={() => setCurrentPage('leads')}
          />
        ) : (
          <Dashboard onNavigate={handleNavigate} />
        );
      case 'audit':
        return selectedLead ? (
          <Audit
            lead={selectedLead}
            onNavigate={handleNavigate}
            onBack={() => setCurrentPage('lead-detail')}
          />
        ) : (
          <Dashboard onNavigate={handleNavigate} />
        );
      case 'sales-pitch':
        return selectedLead ? (
          <SalesPitch
            lead={selectedLead}
            onNavigate={handleNavigate}
            onBack={() => setCurrentPage('lead-detail')}
            onSave={handleSaveLead}
            addToast={addToast}
          />
        ) : (
          <Dashboard onNavigate={handleNavigate} />
        );
      case 'settings':
        return <Settings onNavigate={handleNavigate} />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-[var(--color-bg)]">
      <TopBar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />
      <div className="flex-1 flex min-h-0">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1 overflow-hidden min-w-0">
          {renderPage()}
        </main>
      </div>
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={handleNavigate}
      />
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
