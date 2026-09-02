export type OpportunityLevel = 'high' | 'medium' | 'low';

export interface LeadProblem {
  id: string;
  title: string;
  severity: 'critical' | 'warning' | 'good';
  evidence: string;
  impact: string;
  solution: string;
}

export interface AuditCategory {
  name: string;
  issues: LeadProblem[];
}

export interface WebsiteAudit {
  id: string;
  leadId: string;
  lastScanned: string;
  categories: AuditCategory[];
  bottomLine: string;
}

export interface Lead {
  id: string;
  businessName: string;
  category: string;
  location: string;
  website: string;
  phone: string;
  rating: number;
  reviewCount: number;
  websiteScore: number;
  mobileScore: number;
  seoScore: number;
  performanceScore: number;
  conversionScore: number;
  opportunityScore: number;
  opportunityLevel: OpportunityLevel;
  problems: LeadProblem[];
  strengths: string[];
  socialActivity: string;
  competitorSignals: string;
  description: string;
  saved: boolean;
  inCampaign: boolean;
}

export interface SalesPitch {
  whyThisLead: string[];
  topPainPoints: string[];
  yourAngle: string;
  generatedMessage: string;
}

export interface SearchResult {
  leads: Lead[];
  totalCount: number;
  query: string;
}

export type Page = 'dashboard' | 'find-leads' | 'leads' | 'lead-detail' | 'audit' | 'sales-pitch' | 'settings';

export interface AppState {
  currentPage: Page;
  selectedLeadId: string | null;
  searchQuery: string;
  searchResults: Lead[];
  isSearching: boolean;
  searchStep: string;
  leads: Lead[];
  commandPaletteOpen: boolean;
  toasts: Toast[];
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}
