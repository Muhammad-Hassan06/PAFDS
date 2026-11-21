import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import {
  UserRole,
  BranchId,
  DateRange,
  ProductModuleId,
  ProductItem,
  CustomerItem,
  SupplierItem,
  SalesRecord,
  QualityIssue,
  RepairItem,
  RecommendationItem,
  PipelineItem,
  SecurityThreatItem,
  AuditLogEntry,
  DataSourceItem,
  NotificationItem,
  TeamMember,
  TEAM_MEMBERS,
} from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_CUSTOMERS,
  INITIAL_SUPPLIERS,
  INITIAL_SALES,
  INITIAL_QUALITY_ISSUES,
  INITIAL_REPAIRS,
  INITIAL_RECOMMENDATIONS,
  INITIAL_PIPELINES,
  INITIAL_SECURITY_THREATS,
  INITIAL_AUDIT_LOGS,
  INITIAL_DATA_SOURCES,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

// Simple deterministic hash simulation for tamper-evident audit logs
function generateHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hex}${hex.split('').reverse().join('')}019482019482019482019482`;
}

interface ProductContextType {
  // Navigation & Filters
  activeModule: ProductModuleId;
  setActiveModule: (module: ProductModuleId) => void;
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentMember: TeamMember;
  setCurrentMember: (member: TeamMember) => void;
  branch: BranchId;
  setBranch: (branch: BranchId) => void;
  dateRange: DateRange;
  setDateRange: (range: DateRange) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Datasets
  products: ProductItem[];
  customers: CustomerItem[];
  suppliers: SupplierItem[];
  sales: SalesRecord[];
  qualityIssues: QualityIssue[];
  repairs: RepairItem[];
  recommendations: RecommendationItem[];
  pipelines: PipelineItem[];
  securityThreats: SecurityThreatItem[];
  auditLogs: AuditLogEntry[];
  dataSources: DataSourceItem[];
  notifications: NotificationItem[];

  // Computed Metrics
  qualityScore: {
    overall: number;
    completeness: number;
    uniqueness: number;
    validity: number;
    consistency: number;
  };
  metrics: {
    totalRevenuePKR: number;
    inflatedRevenuePKR: number;
    verifiedRevenuePKR: number;
    totalOrders: number;
    unitsSold: number;
    activeSKUs: number;
    inventoryValuePKR: number;
    stockoutRiskCount: number;
    pendingRepairsCount: number;
  };

  // Actions
  approveRepair: (repairId: string, customNote?: string) => void;
  rejectRepair: (repairId: string, reason?: string) => void;
  rollbackRepair: (repairId: string) => void;
  acceptRecommendation: (id: string, note?: string) => void;
  rejectRecommendation: (id: string, reason?: string) => void;
  runPipeline: (id: string) => Promise<void>;
  resolveSecurityThreat: (id: string) => void;
  addNewDataSource: (source: DataSourceItem) => void;
  regenerateData: (preset: 'clean' | 'realistic' | 'stress') => void;
  verifyAuditChain: () => { isValid: boolean; checkedCount: number; brokenAtIndex?: number };
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addAuditLog: (action: string, moduleName: string, details: string, status?: 'SUCCESS' | 'BLOCKED' | 'FLAGGED') => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeModule, setActiveModule] = useState<ProductModuleId>('overview');
  const [currentMember, setCurrentMemberState] = useState<TeamMember>(TEAM_MEMBERS[0]);
  const [role, setRole] = useState<UserRole>('Owner');
  const [branch, setBranch] = useState<BranchId>('all');
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const setCurrentMember = useCallback((member: TeamMember) => {
    setCurrentMemberState(member);
    setRole(member.role);
  }, []);

  // Primary State
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState<CustomerItem[]>(INITIAL_CUSTOMERS);
  const [suppliers, setSuppliers] = useState<SupplierItem[]>(INITIAL_SUPPLIERS);
  const [sales, setSales] = useState<SalesRecord[]>(INITIAL_SALES);
  const [qualityIssues, setQualityIssues] = useState<QualityIssue[]>(INITIAL_QUALITY_ISSUES);
  const [repairs, setRepairs] = useState<RepairItem[]>(INITIAL_REPAIRS);
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>(INITIAL_RECOMMENDATIONS);
  const [pipelines, setPipelines] = useState<PipelineItem[]>(INITIAL_PIPELINES);
  const [securityThreats, setSecurityThreats] = useState<SecurityThreatItem[]>(INITIAL_SECURITY_THREATS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [dataSources, setDataSources] = useState<DataSourceItem[]>(INITIAL_DATA_SOURCES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  // Helper to add to audit log with hash chaining
  const addAuditLog = useCallback(
    (action: string, moduleName: string, details: string, status: 'SUCCESS' | 'BLOCKED' | 'FLAGGED' = 'SUCCESS') => {
      setAuditLogs((prevLogs) => {
        const lastHash = prevLogs.length > 0 ? prevLogs[prevLogs.length - 1].hash : '00000000000000000000000000000000';
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
        const newId = `AUD-${String(prevLogs.length + 1).padStart(3, '0')}`;
        const newHash = generateHash(`${lastHash}_${newId}_${action}_${timestamp}`);
        const newEntry: AuditLogEntry = {
          id: newId,
          timestamp,
          actor: `${currentMember.shortName} (${currentMember.title})`,
          role,
          action,
          module: moduleName,
          details,
          status,
          hash: newHash,
          previousHash: lastHash,
        };
        return [...prevLogs, newEntry];
      });
    },
    [role, currentMember]
  );

  // Filter sales by branch
  const filteredSales = useMemo(() => {
    if (branch === 'all') return sales;
    return sales.filter((s) => s.branchId === branch);
  }, [sales, branch]);

  // Dynamic Quality Score Calculation
  const qualityScore = useMemo(() => {
    const pendingCritical = qualityIssues.filter((q) => q.status === 'Pending' && q.severity === 'Critical').length;
    const pendingHigh = qualityIssues.filter((q) => q.status === 'Pending' && q.severity === 'High').length;
    const pendingMed = qualityIssues.filter((q) => q.status === 'Pending' && q.severity === 'Medium').length;

    // Base scores
    let completeness = 96.8;
    let uniqueness = 94.5;
    let validity = 95.1;
    let consistency = 90.4;

    // Adjust uniqueness based on duplicate repair status
    const dupRepair = repairs.find((r) => r.issueId === 'ISSUE-001');
    if (dupRepair?.status === 'Applied') {
      uniqueness = 99.2;
    }

    // Adjust validity based on customer ID & negative quantity repairs
    const custRepair = repairs.find((r) => r.issueId === 'ISSUE-002');
    if (custRepair?.status === 'Applied') {
      completeness = 99.5;
    }
    const negRepair = repairs.find((r) => r.issueId === 'ISSUE-003');
    if (negRepair?.status === 'Applied') {
      validity = 98.8;
    }

    const overall = Number(((completeness + uniqueness + validity + consistency) / 4).toFixed(1));
    return {
      overall,
      completeness,
      uniqueness,
      validity,
      consistency,
    };
  }, [qualityIssues, repairs]);

  // Dynamic Metrics Calculation
  const metrics = useMemo(() => {
    let totalRevenuePKR = 0;
    let inflatedRevenuePKR = 0;
    let totalOrders = filteredSales.length;
    let unitsSold = 0;

    filteredSales.forEach((item) => {
      if (item.status === 'Flagged' && item.flagReason?.includes('Duplicate')) {
        inflatedRevenuePKR += item.totalRevenuePKR;
      }
      totalRevenuePKR += item.totalRevenuePKR;
      unitsSold += Math.max(0, item.quantity);
    });

    const verifiedRevenuePKR = totalRevenuePKR - inflatedRevenuePKR;

    let inventoryValuePKR = 0;
    let stockoutRiskCount = 0;
    products.forEach((p) => {
      inventoryValuePKR += p.currentStock * p.costPKR;
      if (p.status === 'Stockout Risk' || p.status === 'Low Stock' || p.status === 'Out of Stock') {
        stockoutRiskCount++;
      }
    });

    const pendingRepairsCount = repairs.filter((r) => r.status === 'Pending Approval').length;

    return {
      totalRevenuePKR,
      inflatedRevenuePKR,
      verifiedRevenuePKR,
      totalOrders,
      unitsSold,
      activeSKUs: products.length,
      inventoryValuePKR,
      stockoutRiskCount,
      pendingRepairsCount,
    };
  }, [filteredSales, products, repairs]);

  // Actions
  const approveRepair = useCallback(
    (repairId: string, customNote?: string) => {
      setRepairs((prev) =>
        prev.map((r) => {
          if (r.id === repairId) {
            return {
              ...r,
              status: 'Applied',
              appliedBy: `${role} (${customNote || 'Manual Human Approval'})`,
              appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
              hash: generateHash(`REPAIR_${repairId}_APPROVED`),
            };
          }
          return r;
        })
      );

      // Also update related issue status
      const repair = repairs.find((r) => r.id === repairId);
      if (repair) {
        setQualityIssues((prev) =>
          prev.map((iss) => (iss.id === repair.issueId ? { ...iss, status: 'Repaired' } : iss))
        );

        // If duplicate invoice repair, update sales status to 'Repaired' and zero out duplicate inflation
        if (repair.issueId === 'ISSUE-001') {
          setSales((prev) =>
            prev.map((s) =>
              s.id === 'sal-004-DUP' || s.id === 'sal-005-DUP2'
                ? { ...s, status: 'Repaired', totalRevenuePKR: 0, flagReason: 'Quarantined Duplicate (Repaired by Human Approval)' }
                : s
            )
          );
        }
      }

      addAuditLog('DATA_REPAIR_APPROVED', 'Data Repair Engine', `Approved repair ${repairId}: ${repair?.recordIdentifier}`);
    },
    [repairs, role, addAuditLog]
  );

  const rejectRepair = useCallback(
    (repairId: string, reason?: string) => {
      setRepairs((prev) =>
        prev.map((r) => (r.id === repairId ? { ...r, status: 'Rejected', impactExplanation: `Rejected: ${reason || 'User declined fix'}` } : r))
      );
      addAuditLog('DATA_REPAIR_REJECTED', 'Data Repair Engine', `Rejected repair ${repairId}: ${reason || 'Manual rejection'}`);
    },
    [addAuditLog]
  );

  const rollbackRepair = useCallback(
    (repairId: string) => {
      setRepairs((prev) =>
        prev.map((r) => (r.id === repairId ? { ...r, status: 'Pending Approval', appliedBy: undefined, appliedAt: undefined } : r))
      );

      const repair = repairs.find((r) => r.id === repairId);
      if (repair) {
        setQualityIssues((prev) =>
          prev.map((iss) => (iss.id === repair.issueId ? { ...iss, status: 'Pending' } : iss))
        );

        if (repair.issueId === 'ISSUE-001') {
          setSales((prev) =>
            prev.map((s) => {
              if (s.id === 'sal-004-DUP') return { ...s, status: 'Flagged', totalRevenuePKR: 49000 };
              if (s.id === 'sal-005-DUP2') return { ...s, status: 'Flagged', totalRevenuePKR: 36000 };
              return s;
            })
          );
        }
      }

      addAuditLog('DATA_REPAIR_ROLLEDBACK', 'Data Repair Engine', `Rolled back repair ${repairId}`);
    },
    [repairs, addAuditLog]
  );

  const acceptRecommendation = useCallback(
    (id: string, note?: string) => {
      setRecommendations((prev) =>
        prev.map((rec) => (rec.id === id ? { ...rec, status: 'Accepted', feedbackNote: note || 'Approved by Manager' } : rec))
      );
      addAuditLog('RECOMMENDATION_ACCEPTED', 'Recommendations Center', `Accepted recommendation ${id} (${note || 'Action dispatched'})`);
    },
    [addAuditLog]
  );

  const rejectRecommendation = useCallback(
    (id: string, reason?: string) => {
      setRecommendations((prev) =>
        prev.map((rec) => (rec.id === id ? { ...rec, status: 'Rejected', feedbackNote: reason || 'Declined' } : rec))
      );
      addAuditLog('RECOMMENDATION_REJECTED', 'Recommendations Center', `Rejected recommendation ${id}: ${reason || 'No reason'}`);
    },
    [addAuditLog]
  );

  const runPipeline = useCallback(
    async (id: string) => {
      // Simulate pipeline run
      setPipelines((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: 'Delayed', recordsProcessed: p.recordsProcessed } : p))
      );

      await new Promise((resolve) => setTimeout(resolve, 800));

      const now = new Date().toISOString().replace('T', ' ').substring(11, 19);
      setPipelines((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            return {
              ...p,
              status: 'Healthy',
              lastRun: 'Just now',
              recordsProcessed: p.recordsProcessed + 42,
              errorsCount: 0,
              warningsCount: 0,
              logs: [
                ...p.logs,
                { timestamp: now, level: 'INFO', message: `Manual trigger initiated by ${role}. Ingested 42 new delta records.` },
                { timestamp: now, level: 'INFO', message: 'Schema checksum verified. Pipeline finished with code 0.' },
              ],
            };
          }
          return p;
        })
      );

      addAuditLog('PIPELINE_RUN_SUCCESS', 'Pipeline Monitoring', `Executed pipeline ${id} successfully`);
    },
    [role, addAuditLog]
  );

  const resolveSecurityThreat = useCallback(
    (id: string) => {
      setSecurityThreats((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: 'Resolved' } : t))
      );
      addAuditLog('SECURITY_ALERT_RESOLVED', 'Security Center', `Resolved security threat alert ${id}`);
    },
    [addAuditLog]
  );

  const addNewDataSource = useCallback(
    (source: DataSourceItem) => {
      setDataSources((prev) => [source, ...prev]);
      addAuditLog('DATA_SOURCE_IMPORTED', 'Data Sources', `Ingested new dataset "${source.name}" (${source.rowCount} rows)`);
    },
    [addAuditLog]
  );

  const regenerateData = useCallback(
    (preset: 'clean' | 'realistic' | 'stress') => {
      if (preset === 'clean') {
        setQualityIssues([]);
        setRepairs((prev) => prev.map((r) => ({ ...r, status: 'Applied' })));
        setSales((prev) =>
          prev.map((s) => ({ ...s, status: 'Verified', flagReason: undefined }))
        );
      } else if (preset === 'stress') {
        setQualityIssues([
          ...INITIAL_QUALITY_ISSUES,
          {
            id: 'ISSUE-099',
            type: 'Price Anomaly',
            dataset: 'Sales',
            severity: 'Critical',
            affectedRecordsCount: 45,
            financialImpactPKR: 1250000,
            detectedAt: '2026-11-21 09:20 AM',
            status: 'Pending',
            description: 'Stress-test injected 45 outlier price anomalies above 300% historical range.',
            sampleRecordId: 'INV-STRESS-409',
            sampleDetails: {
              field: 'unitPricePKR',
              foundValue: 'PKR 45,000 (Expected ~PKR 980)',
              expectedPattern: 'price between 800 - 1,200 PKR',
              suggestedFix: 'Clamp to historical median price',
            },
          },
        ]);
      } else {
        // realistic reset
        setProducts(INITIAL_PRODUCTS);
        setCustomers(INITIAL_CUSTOMERS);
        setSuppliers(INITIAL_SUPPLIERS);
        setSales(INITIAL_SALES);
        setQualityIssues(INITIAL_QUALITY_ISSUES);
        setRepairs(INITIAL_REPAIRS);
        setRecommendations(INITIAL_RECOMMENDATIONS);
      }
      addAuditLog('DATASET_REGENERATED', 'Synthetic Generator', `Regenerated demo workspace data with preset: ${preset.toUpperCase()}`);
    },
    [addAuditLog]
  );

  const verifyAuditChain = useCallback(() => {
    let isValid = true;
    let brokenAtIndex: number | undefined = undefined;

    for (let i = 1; i < auditLogs.length; i++) {
      if (auditLogs[i].previousHash !== auditLogs[i - 1].hash) {
        isValid = false;
        brokenAtIndex = i;
        break;
      }
    }
    return {
      isValid,
      checkedCount: auditLogs.length,
      brokenAtIndex,
    };
  }, [auditLogs]);

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return (
    <ProductContext.Provider
      value={{
        activeModule,
        setActiveModule,
        role,
        setRole,
        branch,
        setBranch,
        dateRange,
        setDateRange,
        searchQuery,
        setSearchQuery,
        currentMember,
        setCurrentMember,
        products,
        customers,
        suppliers,
        sales,
        qualityIssues,
        repairs,
        recommendations,
        pipelines,
        securityThreats,
        auditLogs,
        dataSources,
        notifications,
        qualityScore,
        metrics,
        approveRepair,
        rejectRepair,
        rollbackRepair,
        acceptRecommendation,
        rejectRecommendation,
        runPipeline,
        resolveSecurityThreat,
        addNewDataSource,
        regenerateData,
        verifyAuditChain,
        markNotificationRead,
        markAllNotificationsRead,
        addAuditLog,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct must be used within a ProductProvider');
  }
  return context;
};

