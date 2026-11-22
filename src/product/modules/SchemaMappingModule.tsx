import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RefreshCw,
  SlidersHorizontal,
  Layers,
  Calendar,
  Package,
  DollarSign,
  FileCode,
  AlertTriangle,
  Info,
  Check,
  ChevronDown,
  ArrowRightLeft,
  Search,
  UploadCloud,
  Eye,
  ShieldCheck,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';

interface MappingItem {
  id: string;
  sourceColumn: string;
  sampleValue: string;
  targetField: string;
  confidence: number;
  matchType: 'LLM Semantic' | 'Fuzzy String' | 'Exact Match';
  rationale: string;
  confirmed: boolean;
  status: 'Auto-Matched' | 'User Confirmed' | 'Review Required';
}

interface FilePreset {
  id: string;
  name: string;
  type: string;
  sourceOrigin: string;
  totalColumns: number;
  mappedColumns: number;
  mappings: MappingItem[];
}

const FILE_PRESETS: FilePreset[] = [
  {
    id: 'file-a',
    name: 'Excel File A — Supplier_Invoice_Export.xlsx',
    type: 'Excel (.xlsx)',
    sourceOrigin: 'Beverage Vendor Raw File',
    totalColumns: 6,
    mappedColumns: 6,
    mappings: [
      {
        id: 'm1',
        sourceColumn: 'Product_Code',
        sampleValue: 'SKU-GL-15',
        targetField: 'Product SKU',
        confidence: 96,
        matchType: 'LLM Semantic',
        rationale: 'LLM semantic embedding matched "Product_Code" to standard Product SKU based on inventory lookup context.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'm2',
        sourceColumn: 'Customer_ID',
        sampleValue: 'CUST-7729',
        targetField: 'Customer ID',
        confidence: 100,
        matchType: 'Exact Match',
        rationale: 'Exact 1:1 string match with master customer entity definition.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'm3',
        sourceColumn: 'Quantity',
        sampleValue: '120 cartons',
        targetField: 'Order Quantity',
        confidence: 99,
        matchType: 'Exact Match',
        rationale: 'Normalized field header maps directly to wholesale order units.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'm4',
        sourceColumn: 'Net_Amount',
        sampleValue: 'PKR 144,000.00',
        targetField: 'Revenue / Net Sales',
        confidence: 98,
        matchType: 'LLM Semantic',
        rationale: 'LLM recognized "Net_Amount" as transaction gross revenue after discount.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'm5',
        sourceColumn: 'Trx_Date',
        sampleValue: '14/05/2026',
        targetField: 'Transaction Date',
        confidence: 92,
        matchType: 'Fuzzy String',
        rationale: 'Fuzzy token matching identified "Trx" abbreviation for Transaction.',
        confirmed: false,
        status: 'Auto-Matched',
      },
      {
        id: 'm6',
        sourceColumn: 'Whs_Loc',
        sampleValue: 'KHI-NORTH-01',
        targetField: 'Warehouse Depot',
        confidence: 91,
        matchType: 'Fuzzy String',
        rationale: 'Fuzzy substring detected "Whs" as Warehouse location code.',
        confirmed: false,
        status: 'Auto-Matched',
      },
    ],
  },
  {
    id: 'file-b',
    name: 'Excel File B — Retailer_POS_OrderSheet.xlsx',
    type: 'Excel (.xlsx)',
    sourceOrigin: 'Lahore Regional Distributor POS',
    totalColumns: 6,
    mappedColumns: 5,
    mappings: [
      {
        id: 'mb1',
        sourceColumn: 'SKU',
        sampleValue: 'SKU-GL-15',
        targetField: 'Product SKU',
        confidence: 99,
        matchType: 'Exact Match',
        rationale: 'Standard stock keeping unit abbreviation recognized directly.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mb2',
        sourceColumn: 'Client_ID',
        sampleValue: 'LHR-RET-104',
        targetField: 'Customer ID',
        confidence: 97,
        matchType: 'LLM Semantic',
        rationale: 'LLM detected "Client_ID" represents retail buyer entity identical to Customer ID.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mb3',
        sourceColumn: 'Qty',
        sampleValue: '45',
        targetField: 'Order Quantity',
        confidence: 94,
        matchType: 'Fuzzy String',
        rationale: 'Common 3-letter abbreviation "Qty" matched to Order Quantity.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mb4',
        sourceColumn: 'Total_Sales',
        sampleValue: '54,000',
        targetField: 'Revenue / Net Sales',
        confidence: 95,
        matchType: 'LLM Semantic',
        rationale: 'Semantic vector identified "Total_Sales" as commercial revenue metric.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mb5',
        sourceColumn: 'Invoice_Date',
        sampleValue: '05-14-2026',
        targetField: 'Transaction Date',
        confidence: 98,
        matchType: 'LLM Semantic',
        rationale: 'Recognized invoice generation timestamp as ledger transaction date.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mb6',
        sourceColumn: 'Branch_Code',
        sampleValue: 'LHR-CENTRAL',
        targetField: 'Warehouse Depot',
        confidence: 88,
        matchType: 'LLM Semantic',
        rationale: 'Branch identifier maps to physical fulfillment warehouse depot.',
        confirmed: false,
        status: 'Review Required',
      },
    ],
  },
  {
    id: 'file-c',
    name: 'CSV File C — SAP_Daily_ERP_Dump.csv',
    type: 'CSV (.csv)',
    sourceOrigin: 'Legacy Central ERP Server',
    totalColumns: 6,
    mappedColumns: 6,
    mappings: [
      {
        id: 'mc1',
        sourceColumn: 'ITEM_CD',
        sampleValue: 'SKU-COLA-01',
        targetField: 'Product SKU',
        confidence: 93,
        matchType: 'Fuzzy String',
        rationale: 'Legacy ERP code ITEM_CD mapped to canonical Product SKU.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mc2',
        sourceColumn: 'CUST_REF_NO',
        sampleValue: 'CR-9021',
        targetField: 'Customer ID',
        confidence: 91,
        matchType: 'LLM Semantic',
        rationale: 'Customer reference number linked to core customer identity.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mc3',
        sourceColumn: 'TRX_UNITS',
        sampleValue: '80',
        targetField: 'Order Quantity',
        confidence: 95,
        matchType: 'LLM Semantic',
        rationale: 'Transaction units parsed as outbound order line quantity.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mc4',
        sourceColumn: 'NET_VAL_PKR',
        sampleValue: '96000',
        targetField: 'Revenue / Net Sales',
        confidence: 97,
        matchType: 'LLM Semantic',
        rationale: 'Net valuation column identified as clean commercial revenue.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mc5',
        sourceColumn: 'BILL_DT',
        sampleValue: '2026.05.14',
        targetField: 'Transaction Date',
        confidence: 89,
        matchType: 'Fuzzy String',
        rationale: 'Billing date abbreviation matched to canonical transaction date.',
        confirmed: true,
        status: 'User Confirmed',
      },
      {
        id: 'mc6',
        sourceColumn: 'DEPOT_NAME',
        sampleValue: 'ISB_HUB_03',
        targetField: 'Warehouse Depot',
        confidence: 96,
        matchType: 'Exact Match',
        rationale: 'Direct mapping to Islamabad regional warehouse hub.',
        confirmed: true,
        status: 'User Confirmed',
      },
    ],
  },
];

const STANDARD_FIELDS = [
  'Product SKU',
  'Customer ID',
  'Order Quantity',
  'Revenue / Net Sales',
  'Transaction Date',
  'Warehouse Depot',
  'Payment Status',
  'Unit Price',
  'Tax Amount',
  'Skip / Do Not Ingest',
];

export const SchemaMappingModule: React.FC = () => {
  const { setActiveModule, addAuditLog, currentMember } = useProduct();
  const [selectedPresetId, setSelectedPresetId] = useState<string>('file-a');
  const [presets, setPresets] = useState<FilePreset[]>(FILE_PRESETS);
  const [showSaveAlert, setShowSaveAlert] = useState<boolean>(false);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'mapping' | 'standardization' | 'preview'>('mapping');

  const currentFile = presets.find((p) => p.id === selectedPresetId) || presets[0];

  const handleUpdateField = (mappingId: string, newField: string) => {
    setPresets((prev) =>
      prev.map((preset) => {
        if (preset.id !== selectedPresetId) return preset;
        return {
          ...preset,
          mappings: preset.mappings.map((m) => {
            if (m.id !== mappingId) return m;
            return {
              ...m,
              targetField: newField,
              status: 'User Confirmed',
              confirmed: true,
            };
          }),
        };
      })
    );
  };

  const handleConfirmSingle = (mappingId: string) => {
    setPresets((prev) =>
      prev.map((preset) => {
        if (preset.id !== selectedPresetId) return preset;
        return {
          ...preset,
          mappings: preset.mappings.map((m) => {
            if (m.id !== mappingId) return m;
            return {
              ...m,
              confirmed: true,
              status: 'User Confirmed',
            };
          }),
        };
      })
    );
  };

  const handleConfirmAll = () => {
    setPresets((prev) =>
      prev.map((preset) => {
        if (preset.id !== selectedPresetId) return preset;
        return {
          ...preset,
          mappings: preset.mappings.map((m) => ({
            ...m,
            confirmed: true,
            status: 'User Confirmed',
          })),
        };
      })
    );
    setShowSaveAlert(true);
    addAuditLog(
      'SCHEMA_MAPPING_CONFIRMED',
      'Schema Mapping',
      `All 6 column mappings for "${currentFile.name}" verified and committed to canonical data warehouse.`
    );
    setTimeout(() => setShowSaveAlert(false), 4000);
  };

  const filteredMappings = currentFile.mappings.filter(
    (m) =>
      m.sourceColumn.toLowerCase().includes(filterQuery.toLowerCase()) ||
      m.targetField.toLowerCase().includes(filterQuery.toLowerCase()) ||
      m.sampleValue.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Title & Top Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold font-display text-navy">
              Intelligent Schema Mapping &amp; Normalization
            </h1>
            <span className="text-[11px] font-mono bg-teal-light text-teal font-semibold px-2 py-0.5 rounded border border-teal/20 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              LLM + Fuzzy Matching Active
            </span>
          </div>
          <p className="text-xs text-slate mt-1">
            Resolve disparate column names across multiple vendor spreadsheets, confirm semantic mappings, and standardize dates and units.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveModule('sources')}
            className="px-3 py-1.5 border border-border bg-white text-navy hover:bg-ivory rounded text-xs font-medium flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-slate" />
            <span>Back to Ingestion</span>
          </button>
          <button
            onClick={handleConfirmAll}
            className="px-3.5 py-1.5 bg-teal hover:bg-teal-hover text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Confirm &amp; Commit Schema</span>
          </button>
        </div>
      </div>

      {/* Confirmation Banner */}
      {showSaveAlert && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              <strong>Schema confirmed by {currentMember.name}:</strong> All column definitions, date formats, and packaging units are now standardized and ready for Data Quality scanning.
            </span>
          </div>
          <button
            onClick={() => setActiveModule('quality')}
            className="text-emerald-700 underline font-semibold hover:text-emerald-900 ml-4 flex-shrink-0"
          >
            Go to Data Quality Center &rarr;
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* CORE CONCEPT SECTION: SIMPLE ENGLISH EXPLANATION & REAL-WORLD EXAMPLE    */}
      {/* ========================================================================= */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-teal-light text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-bold text-navy">
              The Real-World Distribution Problem: Different Names for the Same Concept
            </h2>
            <p className="text-xs text-slate leading-relaxed">
              In wholesale distribution, different files and branch spreadsheets often use <strong>completely different column headers</strong> for the exact same business concept. Without automated mapping, your team has to manually rename columns in Excel before running any report.
            </p>
          </div>
        </div>

        {/* Real Example Comparison Grid */}
        <div className="overflow-x-auto border border-border rounded-lg bg-ivory/50">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate/5 border-b border-border text-[11px] font-semibold text-slate uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-4 font-bold text-teal">Canonical Business Concept</th>
                <th className="py-2.5 px-4">Excel File A (Supplier Raw)</th>
                <th className="py-2.5 px-4">Excel File B (Retailer POS)</th>
                <th className="py-2.5 px-4">CSV File C (Legacy ERP)</th>
                <th className="py-2.5 px-4">Meaning &amp; Normalization</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-navy">
              <tr className="hover:bg-white/80 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-teal flex items-center gap-1.5">
                  <Package className="w-3.5 h-3.5 text-teal" />
                  Product SKU
                </td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-amber-50/50">Product_Code</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-sky-50/50">SKU</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-emerald-50/50">ITEM_CD</td>
                <td className="py-2.5 px-4 text-slate">Exact same item identifier across all 3 files.</td>
              </tr>
              <tr className="hover:bg-white/80 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-teal flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-teal" />
                  Customer Identifier
                </td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-amber-50/50">Customer_ID</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-sky-50/50">Client_ID</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-emerald-50/50">CUST_REF_NO</td>
                <td className="py-2.5 px-4 text-slate">Identifies the retail buyer account or merchant.</td>
              </tr>
              <tr className="hover:bg-white/80 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-teal flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-teal" />
                  Order Quantity
                </td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-amber-50/50">Quantity</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-sky-50/50">Qty</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-emerald-50/50">TRX_UNITS</td>
                <td className="py-2.5 px-4 text-slate">Volume sold, standardized into base carton units.</td>
              </tr>
              <tr className="hover:bg-white/80 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-teal flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-teal" />
                  Revenue / Net Sales
                </td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-amber-50/50">Net_Amount</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-sky-50/50">Total_Sales</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-emerald-50/50">NET_VAL_PKR</td>
                <td className="py-2.5 px-4 text-slate">Transaction monetary value stripped of currency text.</td>
              </tr>
              <tr className="hover:bg-white/80 transition-colors">
                <td className="py-2.5 px-4 font-semibold text-teal flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal" />
                  Transaction Date
                </td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-amber-50/50">Trx_Date</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-sky-50/50">Invoice_Date</td>
                <td className="py-2.5 px-4 font-mono text-charcoal bg-emerald-50/50">BILL_DT</td>
                <td className="py-2.5 px-4 text-slate">Auto-converted into ISO-8601 (YYYY-MM-DD).</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 3-Pillar Architecture in Simple English */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="p-3 rounded-lg border border-border bg-ivory space-y-1.5">
            <div className="flex items-center gap-2 text-teal font-semibold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1. AI Fuzzy &amp; LLM Matching</span>
            </div>
            <p className="text-[11px] text-slate leading-relaxed">
              Our system uses <strong>Fuzzy String Matching</strong> for abbreviations (like <em>Qty &rarr; Quantity</em>) and <strong>LLM Semantic Understanding</strong> when column names share zero letters (like <em>Client_ID &rarr; Customer_ID</em>).
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-ivory space-y-1.5">
            <div className="flex items-center gap-2 text-navy font-semibold text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-teal" />
              <span>2. Human Confirmation Loop</span>
            </div>
            <p className="text-[11px] text-slate leading-relaxed">
              The AI never silently forces an assumption. You review each detected link with clear confidence scores, edit any target field from a dropdown, and confirm with one click.
            </p>
          </div>

          <div className="p-3 rounded-lg border border-border bg-ivory space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-xs">
              <RefreshCw className="w-3.5 h-3.5" />
              <span>3. Automated Standardization</span>
            </div>
            <p className="text-[11px] text-slate leading-relaxed">
              Once mapped, the engine automatically standardizes <strong>mixed dates</strong> (e.g. 14/05/2026 &rarr; 2026-05-14), converts <strong>packaging units</strong> into cartons, and cleans currency strings.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TABS: SCHEMA MAPPER vs STANDARDIZATION ENGINE vs LIVE PREVIEW             */}
      {/* ========================================================================= */}
      <div className="flex items-center justify-between border-b border-border">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('mapping')}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'mapping'
                ? 'border-teal text-teal'
                : 'border-transparent text-slate hover:text-navy'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Live Column Schema Mapper ({currentFile.mappings.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('standardization')}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'standardization'
                ? 'border-teal text-teal'
                : 'border-transparent text-slate hover:text-navy'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Dates, Units &amp; Formats Standardizer</span>
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`pb-2.5 px-3 text-xs font-semibold flex items-center gap-1.5 border-b-2 transition-colors ${
              activeTab === 'preview'
                ? 'border-teal text-teal'
                : 'border-transparent text-slate hover:text-navy'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Standardized Data Preview</span>
          </button>
        </div>

        <div className="text-[11px] text-slate hidden sm:block">
          Active Source: <strong className="text-navy">{currentFile.sourceOrigin}</strong>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: INTERACTIVE SCHEMA MAPPING TABLE                                   */}
      {/* ========================================================================= */}
      {activeTab === 'mapping' && (
        <div className="space-y-4">
          {/* File Preset Selector Bar */}
          <div className="p-4 bg-white border border-border rounded-lg shadow-panel flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold text-slate whitespace-nowrap">
                Select File to Map:
              </span>
              {presets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded border transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    selectedPresetId === preset.id
                      ? 'bg-teal text-white border-teal shadow-xs'
                      : 'bg-ivory text-navy border-border hover:bg-white'
                  }`}
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>{preset.name.split('—')[0].trim()}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                      selectedPresetId === preset.id ? 'bg-white/20 text-white' : 'bg-slate/10 text-slate'
                    }`}
                  >
                    {preset.type}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate absolute left-2.5 top-2.5" />
              <input
                type="text"
                placeholder="Search mapped columns..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs border border-border rounded bg-ivory text-navy focus:outline-none focus:border-teal w-full sm:w-56"
              />
            </div>
          </div>

          {/* Mapping Table */}
          <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between bg-ivory/30">
              <div className="flex items-center gap-2">
                <FileCode className="w-4 h-4 text-teal" />
                <h3 className="text-xs font-bold text-navy uppercase tracking-wider">
                  {currentFile.name} &mdash; Detected Schema Alignment
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate">
                {currentFile.mappings.filter((m) => m.confirmed).length} of {currentFile.mappings.length} Mappings Confirmed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate/5 border-b border-border text-[11px] font-semibold text-slate uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-4">Uploaded Column</th>
                    <th className="py-2.5 px-4">Sample Raw Value</th>
                    <th className="py-2.5 px-4">Match Engine</th>
                    <th className="py-2.5 px-4">Confidence</th>
                    <th className="py-2.5 px-4">Target Standard Field</th>
                    <th className="py-2.5 px-4">Status</th>
                    <th className="py-2.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredMappings.map((mapping) => (
                    <tr
                      key={mapping.id}
                      className="hover:bg-ivory/50 transition-colors group"
                    >
                      {/* Uploaded Column */}
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-navy">
                          {mapping.sourceColumn}
                        </div>
                        <div className="text-[10px] text-slate mt-0.5 max-w-xs truncate" title={mapping.rationale}>
                          {mapping.rationale}
                        </div>
                      </td>

                      {/* Sample Value */}
                      <td className="py-3 px-4">
                        <span className="font-mono text-charcoal bg-slate/5 px-2 py-0.5 rounded border border-border/50">
                          {mapping.sampleValue}
                        </span>
                      </td>

                      {/* Match Engine */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded ${
                            mapping.matchType === 'LLM Semantic'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : mapping.matchType === 'Exact Match'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-sky-50 text-sky-700 border border-sky-200'
                          }`}
                        >
                          {mapping.matchType === 'LLM Semantic' && <Sparkles className="w-2.5 h-2.5" />}
                          {mapping.matchType === 'Exact Match' && <Check className="w-2.5 h-2.5" />}
                          {mapping.matchType === 'Fuzzy String' && <SlidersHorizontal className="w-2.5 h-2.5" />}
                          {mapping.matchType}
                        </span>
                      </td>

                      {/* Confidence */}
                      <td className="py-3 px-4 font-mono font-bold">
                        <span
                          className={
                            mapping.confidence >= 95
                              ? 'text-emerald-600'
                              : mapping.confidence >= 90
                              ? 'text-teal'
                              : 'text-amber-600'
                          }
                        >
                          {mapping.confidence}%
                        </span>
                      </td>

                      {/* Target Field Dropdown */}
                      <td className="py-3 px-4">
                        <select
                          value={mapping.targetField}
                          onChange={(e) => handleUpdateField(mapping.id, e.target.value)}
                          className="px-2.5 py-1 text-xs border border-border rounded bg-white text-navy font-semibold focus:outline-none focus:border-teal cursor-pointer shadow-xs"
                        >
                          {STANDARD_FIELDS.map((field) => (
                            <option key={field} value={field}>
                              {field}
                            </option>
                          ))}
                        </select>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded inline-flex items-center gap-1 ${
                            mapping.confirmed
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {mapping.confirmed ? (
                            <>
                              <CheckCircle2 className="w-2.5 h-2.5" />
                              Confirmed
                            </>
                          ) : (
                            <>
                              <AlertTriangle className="w-2.5 h-2.5" />
                              Auto-Suggested
                            </>
                          )}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        {!mapping.confirmed ? (
                          <button
                            onClick={() => handleConfirmSingle(mapping.id)}
                            className="px-2.5 py-1 bg-teal hover:bg-teal-hover text-white rounded text-[11px] font-medium transition-colors shadow-xs"
                          >
                            Confirm
                          </button>
                        ) : (
                          <span className="text-[11px] text-slate font-mono">
                            Locked
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: STANDARDIZATION ENGINE (DATES, UNITS, CURRENCIES, FORMATS)        */}
      {/* ========================================================================= */}
      {activeTab === 'standardization' && (
        <div className="space-y-4">
          <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-1">
            <h3 className="text-sm font-bold text-navy flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-teal" />
              Automated Data Standardization Engine
            </h3>
            <p className="text-xs text-slate">
              Beyond matching column names, DistributionIQ automatically normalizes inconsistent date formats, packaging units, and numeric encodings into uniform data standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Card 1: Date Normalization */}
            <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal font-semibold text-xs">
                  <Calendar className="w-4 h-4" />
                  <span>1. Date Format Normalization</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                  Target: ISO-8601 (YYYY-MM-DD)
                </span>
              </div>
              <p className="text-xs text-slate">
                Spreadsheets arrive with Pakistani, British, and US date notations. The engine detects delimiters and standardizes them into unified ISO timestamps:
              </p>

              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">14/05/2026 (DD/MM/YYYY - Vendor)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">2026-05-14</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">05-14-2026 (MM-DD-YYYY - POS)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">2026-05-14</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">2026.05.14 (YYYY.MM.DD - ERP)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">2026-05-14</span>
                </div>
              </div>
            </div>

            {/* Card 2: Packaging Units of Measure (UoM) */}
            <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal font-semibold text-xs">
                  <Package className="w-4 h-4" />
                  <span>2. Packaging &amp; Unit of Measure (UoM)</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                  Target: Standard Carton Units
                </span>
              </div>
              <p className="text-xs text-slate">
                Distributors receive quantities in crates, packs, or single units. The engine maps each product's packaging hierarchy:
              </p>

              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;25 cartons&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">25 Cartons (Base)</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;300 single bottles (1.5L)&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">25 Cartons (12/ctn)</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;10 master crates&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">20 Cartons (2 ctn/crate)</span>
                </div>
              </div>
            </div>

            {/* Card 3: Numeric & Currency Parsing */}
            <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal font-semibold text-xs">
                  <DollarSign className="w-4 h-4" />
                  <span>3. Financials &amp; Currency Strings</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                  Target: Float / Numeric(14,2)
                </span>
              </div>
              <p className="text-xs text-slate">
                Removes currency prefixes, trailing slashes, commas, and formatting symbols to allow mathematical aggregation:
              </p>

              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;PKR 145,000.00&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">145000.00</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;Rs. 89,500/-&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">89500.00</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;96000 PKR (Net)&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">96000.00</span>
                </div>
              </div>
            </div>

            {/* Card 4: Character Encoding & Trimming */}
            <div className="p-4 bg-white border border-border rounded-lg shadow-panel space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-teal font-semibold text-xs">
                  <FileCode className="w-4 h-4" />
                  <span>4. Encoding &amp; String Hygiene</span>
                </div>
                <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded font-bold">
                  Target: Clean UTF-8
                </span>
              </div>
              <p className="text-xs text-slate">
                Fixes Windows-1252 / ASCII character corruption, strips trailing whitespace, and normalizes SKU case:
              </p>

              <div className="space-y-2 pt-1 font-mono text-xs">
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;  sku-gl-15  &quot;</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">&quot;SKU-GL-15&quot;</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;Gourmet\tCola 1.5L&quot;</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">&quot;Gourmet Cola 1.5L&quot;</span>
                </div>
                <div className="p-2.5 bg-ivory rounded border border-border flex items-center justify-between">
                  <span className="text-amber-700">&quot;KHI &ndash; North&quot; (Special Dash)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate" />
                  <span className="text-emerald-700 font-bold">&quot;KHI-North&quot;</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: STANDARDIZED DATA PREVIEW (BEFORE vs AFTER)                       */}
      {/* ========================================================================= */}
      {activeTab === 'preview' && (
        <div className="p-5 bg-white border border-border rounded-lg shadow-panel space-y-4">
          <div>
            <h3 className="text-sm font-bold text-navy flex items-center gap-2">
              <Eye className="w-4 h-4 text-teal" />
              Before &amp; After Normalization Preview
            </h3>
            <p className="text-xs text-slate mt-0.5">
              Review how raw source rows from <em>{currentFile.name}</em> are transformed into canonical, clean records ready for quality profiling and sales analytics.
            </p>
          </div>

          <div className="overflow-x-auto border border-border rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate/5 border-b border-border text-[11px] font-semibold text-slate uppercase tracking-wider">
                <tr>
                  <th className="py-2.5 px-3">State</th>
                  <th className="py-2.5 px-3">Product SKU</th>
                  <th className="py-2.5 px-3">Customer ID</th>
                  <th className="py-2.5 px-3">Quantity</th>
                  <th className="py-2.5 px-3">Revenue (PKR)</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Depot Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-mono">
                {/* Row 1 Raw */}
                <tr className="bg-amber-50/40">
                  <td className="py-2.5 px-3 font-sans font-bold text-amber-700 text-[10px] uppercase">
                    Raw File A
                  </td>
                  <td className="py-2.5 px-3 text-charcoal">sku-gl-15</td>
                  <td className="py-2.5 px-3 text-charcoal">CUST-7729</td>
                  <td className="py-2.5 px-3 text-charcoal">120 cartons</td>
                  <td className="py-2.5 px-3 text-charcoal">PKR 144,000.00</td>
                  <td className="py-2.5 px-3 text-charcoal">14/05/2026</td>
                  <td className="py-2.5 px-3 text-charcoal">KHI-NORTH-01</td>
                </tr>
                {/* Row 1 Standardized */}
                <tr className="bg-emerald-50/50">
                  <td className="py-2.5 px-3 font-sans font-bold text-emerald-700 text-[10px] uppercase">
                    &rarr; Normalized
                  </td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">SKU-GL-15</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">CUST-7729</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">120</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">144000.00</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">2026-05-14</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">Karachi Central</td>
                </tr>

                {/* Row 2 Raw */}
                <tr className="bg-amber-50/40">
                  <td className="py-2.5 px-3 font-sans font-bold text-amber-700 text-[10px] uppercase">
                    Raw File B
                  </td>
                  <td className="py-2.5 px-3 text-charcoal">SKU-COLA-01</td>
                  <td className="py-2.5 px-3 text-charcoal">LHR-RET-104</td>
                  <td className="py-2.5 px-3 text-charcoal">45 ctn</td>
                  <td className="py-2.5 px-3 text-charcoal">54,000</td>
                  <td className="py-2.5 px-3 text-charcoal">05-14-2026</td>
                  <td className="py-2.5 px-3 text-charcoal">LHR-CENTRAL</td>
                </tr>
                {/* Row 2 Standardized */}
                <tr className="bg-emerald-50/50">
                  <td className="py-2.5 px-3 font-sans font-bold text-emerald-700 text-[10px] uppercase">
                    &rarr; Normalized
                  </td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">SKU-COLA-01</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">CUST-104</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">45</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">54000.00</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">2026-05-14</td>
                  <td className="py-2.5 px-3 text-emerald-800 font-bold">Lahore Depot</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-slate">
              Data structure verified against Master Entity Dictionary (v2.4).
            </span>
            <button
              onClick={() => setActiveModule('quality')}
              className="px-3 py-1.5 bg-teal hover:bg-teal-hover text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Scan Standardized Data in Quality Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
