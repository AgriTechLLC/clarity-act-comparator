
export interface BillVersionComparison {
  original?: string | string[];
  hfsc?: string | string[];
  hag?: string | string[];
  keyDifferences?: string | string[]; // Changed to allow array for multiple points
}

export interface ComparisonTableRow {
  id: string;
  provision: string;
  originalSummary: string | string[];
  hfscAnalysis: string | string[];
  hagAnalysis: string | string[];
  keyDifferencesHfscVsHag: string | string[];
}

export interface ComplianceItem {
  requirementId: string;
  requirementTitle: string;
  description: string | string[];
  responsibleEntities: string[];
  keyRegulatoryFocus: "SEC" | "CFTC" | "Both" | "FINCEN" | "Federal Banking Regulator" | "State Regulator" | "Other";
  penaltiesSummary: string;
  notes?: string;
  sourceSections?: string; 
}

export interface ExternalLegislationLink {
  url: string;
  label: string;
}

export interface ReportSectionData {
  id: string;
  title: string;
  shortTitle?: string; 
  content?: string | string[];
  comparison?: BillVersionComparison;
  subsections?: ReportSectionData[];
  tableData?: ComparisonTableRow[];
  relatedLinks?: Array<{ path: string; linkText: string; }>;
  complianceData?: ComplianceItem[];
  externalLegislationLinks?: ExternalLegislationLink[];
}

export interface ProcessedReportSectionData extends ReportSectionData {
  path: string; 
  subsections?: ProcessedReportSectionData[];
}