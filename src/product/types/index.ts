export type UserRole = 'Owner' | 'Branch Manager' | 'Analyst' | 'Auditor';

export type BranchId = 'all' | 'karachi' | 'lahore' | 'islamabad' | 'faisalabad';

export type DateRange = '7d' | '30d' | '90d' | 'custom';

export type ProductModuleId =
  | 'overview'
  | 'sources'
  | 'quality'
  | 'repair'
  | 'impact'
  | 'sales'
  | 'inventory'
  | 'forecast'
  | 'stockout'
  | 'recommendations'
  | 'assistant'
  | 'security';

export interface TeamMember {
  id: string;
  name: string;
  shortName: string;
  initials: string;
  role: UserRole;
  title: string;
  domain: string;
  email: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'hassan',
    name: 'Muhammad Hassan',
    shortName: 'M. Hassan',
    initials: 'MH',
    role: 'Owner',
    title: 'Project Lead',
    domain: 'AI & Natural-Language Analytics',
    email: 'hassan@distrisight.pk',
  },
  {
    id: 'farjad',
    name: 'Farjad Khan',
    shortName: 'Farjad Khan',
    initials: 'FK',
    role: 'Branch Manager',
    title: 'Backend Lead',
    domain: 'Backend & Data Infrastructure',
    email: 'farjad@distrisight.pk',
  },
  {
    id: 'zain',
    name: 'Zain Raza',
    shortName: 'Zain Raza',
    initials: 'ZR',
    role: 'Analyst',
    title: 'ML & Quality Lead',
    domain: 'Data Quality Engine & Machine Learning',
    email: 'zain@distrisight.pk',
  },
  {
    id: 'shaji',
    name: 'Shaji Naqvi',
    shortName: 'Shaji Naqvi',
    initials: 'SN',
    role: 'Auditor',
    title: 'Security Lead',
    domain: 'Cybersecurity, Frontend & Testing',
    email: 'shaji@distrisight.pk',
  },
];

export interface ProductItem {
  id: string;
  sku: string;
  name: string;
  category: 'Beverages' | 'Edible Oils' | 'Dairy & UHT' | 'Tea & Spices' | 'Personal Care' | 'Household';
  unit: string;
  costPKR: number;
  pricePKR: number;
  currentStock: number;
  reorderThreshold: number;
  dailyDemand: number;
  supplierId: string;
  supplierName: string;
  leadTimeDays: number;
  status: 'Healthy' | 'Low Stock' | 'Stockout Risk' | 'Overstock' | 'Out of Stock';
  historicalDemand: number[]; // 12 weeks
}

export interface CustomerItem {
  id: string;
  code: string;
  name: string;
  city: string;
  channel: 'Wholesale Depot' | 'Supermarket' | 'Cash & Carry' | 'Retail Kiryana';
  phone: string; // PII to be masked
  email: string; // PII
  totalSpend30dPKR: number;
  ordersCount30d: number;
  spendTrend: number; // percentage change vs prior period
  status: 'Active' | 'At Risk' | 'Inactive';
}

export interface SupplierItem {
  id: string;
  name: string;
  category: string;
  avgLeadTimeDays: number;
  onTimeDeliveryRate: number; // percentage e.g. 94.5
  totalSupplied30dPKR: number;
  status: 'Reliable' | 'Delayed' | 'Review Required';
}

export interface SalesRecord {
  id: string;
  invoiceNo: string;
  date: string;
  branchId: BranchId;
  branchName: string;
  customerId: string;
  customerName: string;
  sku: string;
  productName: string;
  category: string;
  quantity: number;
  unitPricePKR: number;
  totalRevenuePKR: number;
  status: 'Verified' | 'Flagged' | 'Repaired';
  flagReason?: string;
}

export interface QualityIssue {
  id: string;
  type:
    | 'Duplicate Invoice Line'
    | 'Missing Customer ID'
    | 'Negative Quantity'
    | 'Inconsistent Naming'
    | 'Format Drift'
    | 'Referential Integrity'
    | 'Price Anomaly';
  dataset: 'Sales' | 'Inventory' | 'Customers' | 'Catalog';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  affectedRecordsCount: number;
  financialImpactPKR: number;
  detectedAt: string;
  status: 'Pending' | 'In Review' | 'Repaired' | 'Ignored';
  description: string;
  sampleRecordId: string;
  sampleDetails: {
    field: string;
    foundValue: string;
    expectedPattern: string;
    suggestedFix: string;
  };
}

export interface RepairItem {
  id: string;
  issueId: string;
  recordIdentifier: string;
  dataset: string;
  field: string;
  originalValue: string;
  proposedValue: string;
  confidenceScore: number; // 0 - 100
  repairType: 'Automatic Safe' | 'Human Approval Required';
  status: 'Pending Approval' | 'Applied' | 'Rejected' | 'Rolled Back';
  reason: string;
  impactExplanation: string;
  appliedBy?: string;
  appliedAt?: string;
  hash?: string;
}

export interface RecommendationItem {
  id: string;
  title: string;
  category: 'Inventory Reorder' | 'Revenue Protection' | 'Customer Retention' | 'Supplier Quality' | 'Margin Optimization';
  priority: 'Critical' | 'High' | 'Medium';
  reason: string;
  supportingData: string;
  expectedBenefit: string;
  recommendedAction: string;
  status: 'Active' | 'Accepted' | 'Rejected' | 'Snoozed' | 'Completed';
  createdAt: string;
  feedbackNote?: string;
}

export interface PipelineItem {
  id: string;
  name: string;
  type: 'Batch ETL' | 'CDC Stream' | 'Daily Sync' | 'EDI Import';
  source: string;
  target: string;
  lastRun: string;
  nextScheduled: string;
  durationSeconds: number;
  recordsProcessed: number;
  errorsCount: number;
  warningsCount: number;
  status: 'Healthy' | 'Delayed' | 'Failed' | 'Warning';
  logs: Array<{ timestamp: string; level: 'INFO' | 'WARN' | 'ERROR'; message: string }>;
}

export interface SecurityThreatItem {
  id: string;
  event: string;
  category:
    | 'Prompt Injection'
    | 'SQL Injection Block'
    | 'Formula Injection'
    | 'Unauthorized Access'
    | 'Suspicious Price Edit'
    | 'Off-Hours Bulk Change';
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  sourceIp: string;
  actor: string;
  detectedAt: string;
  status: 'Investigating' | 'Blocked' | 'Resolved' | 'Dismissed';
  details: string;
  mitigation: string;
  rawPayload?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: UserRole;
  action: string;
  module: string;
  details: string;
  status: 'SUCCESS' | 'BLOCKED' | 'FLAGGED';
  hash: string;
  previousHash: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'stockout' | 'quality' | 'pipeline' | 'security' | 'recommendation';
  targetModule: ProductModuleId;
  read: boolean;
}

export interface DataSourceItem {
  id: string;
  name: string;
  type: 'Excel (.xlsx)' | 'CSV' | 'PostgreSQL' | 'ERP Export';
  datasetType: 'Sales' | 'Inventory' | 'Customers' | 'Products' | 'Suppliers';
  lastSync: string;
  rowCount: number;
  status: 'Connected' | 'Syncing' | 'Schema Drift' | 'Error';
  qualityScore: number;
  sourceSize: string;
}

