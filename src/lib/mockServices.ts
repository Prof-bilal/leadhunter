import { Lead, SearchResult, WebsiteAudit, SalesPitch } from '../types';
import { mockLeads, getMockAudit, getMockPitch } from '../data/mockLeads';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockLeadService = {
  async findLeads(query: string, onProgress?: (step: string) => void): Promise<SearchResult> {
    const steps = [
      'Finding businesses...',
      'Analyzing websites...',
      'Checking business signals...',
      'Ranking opportunities...',
    ];
    for (const step of steps) {
      onProgress?.(step);
      await delay(800 + Math.random() * 600);
    }
    const lowerQuery = query.toLowerCase();
    const matched = mockLeads.filter(lead => {
      const searchText = `${lead.businessName} ${lead.category} ${lead.location} ${lead.description}`.toLowerCase();
      if (lowerQuery.includes('restaurant') || lowerQuery.includes('pizza') || lowerQuery.includes('food')) {
        return ['Restaurant', 'Fast Food', 'Cafe', 'Bakery'].includes(lead.category);
      }
      if (lowerQuery.includes('saas') || lowerQuery.includes('software') || lowerQuery.includes('tech')) {
        return ['SaaS', 'IT Services'].includes(lead.category);
      }
      if (lowerQuery.includes('beauty') || lowerQuery.includes('salon') || lowerQuery.includes('nail')) {
        return lead.category === 'Beauty Salon';
      }
      if (lowerQuery.includes('fitness') || lowerQuery.includes('gym')) {
        return lead.category === 'Fitness';
      }
      if (lowerQuery.includes('school') || lowerQuery.includes('education') || lowerQuery.includes('academy')) {
        return ['Education', 'Music School'].includes(lead.category);
      }
      if (lowerQuery.includes('travel') || lowerQuery.includes('tour')) {
        return ['Travel Agency', 'Tourism'].includes(lead.category);
      }
      return searchText.includes(lowerQuery) || searchText.includes(lowerQuery.replace('i ', ''));
    });
    const results = matched.length > 0 ? matched : mockLeads.sort(() => Math.random() - 0.5).slice(0, 8);
    return {
      leads: results.sort((a, b) => b.opportunityScore - a.opportunityScore),
      totalCount: results.length,
      query,
    };
  },

  async getLead(id: string): Promise<Lead | null> {
    await delay(200);
    return mockLeads.find(l => l.id === id) || null;
  },

  async getAllLeads(): Promise<Lead[]> {
    await delay(300);
    return [...mockLeads];
  },
};

export const mockAuditService = {
  async getAudit(leadId: string): Promise<WebsiteAudit | null> {
    await delay(500);
    return getMockAudit(leadId);
  },
};

export const mockPitchService = {
  async generatePitch(leadId: string, onProgress?: (step: string) => void): Promise<SalesPitch | null> {
    const steps = [
      'Analyzing lead data...',
      'Identifying pain points...',
      'Crafting personalized message...',
    ];
    for (const step of steps) {
      onProgress?.(step);
      await delay(600 + Math.random() * 400);
    }
    return getMockPitch(leadId);
  },
};
