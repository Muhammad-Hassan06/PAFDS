import React, { useState } from 'react';
import {
  Database,
  UploadCloud,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  Trash2,
  FileText,
  Sliders,
  Sparkles,
  Check,
  X,
} from 'lucide-react';
import { useProduct } from '../context/ProductContext';
import { DataSourceItem } from '../types';

export const DataSourcesModule: React.FC = () => {
  const { dataSources, addNewDataSource, setActiveModule } = useProduct();

  // Upload Wizard State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedFile, setSelectedFile] = useState<{ name: string; size: string; type: string } | null>(null);
  const [datasetType, setDatasetType] = useState<DataSourceItem['datasetType']>('Sales');
  const [importProgress, setImportProgress] = useState(0);

  // Column mapping state
  const [columnMappings, setColumnMappings] = useState<Record<string, string>>({
    Item_Code: 'sku',
    Trans_Date: 'date',
    Cust_Account: 'customer_id',
    Quantity_Shipped: 'quantity',
    Net_Invoice_Amount: 'totalRevenuePKR',
    Warehouse_Depot: 'branch_id',
  });

  const TARGET_FIELDS = [
    { key: 'sku', label: 'Product SKU (Primary Key)' },
    { key: 'date', label: 'Transaction Date (ISO 8601)' },
    { key: 'customer_id', label: 'Customer Identifier' },
    { key: 'quantity', label: 'Quantity Shipped' },
    { key: 'totalRevenuePKR', label: 'Gross Revenue (PKR)' },
    { key: 'branch_id', label: 'Branch / Depot Code' },
    { key: 'ignore', label: '-- Do Not Map (Ignore) --' },
  ];

  const handleSimulatedFileDrop = (fileName: string, fileSize: string) => {
    setSelectedFile({
      name: fileName,
      size: fileSize,
      type: fileName.endsWith('.xlsx') ? 'Excel (.xlsx)' : 'CSV',
    });
    setUploadStep(2);
  };

  const handleStartImport = () => {
    setUploadStep(4);
    setImportProgress(15);
    const interval = setInterval(() => {
      setImportProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            if (selectedFile) {
              const newSource: DataSourceItem = {
                id: `src-${Date.now()}`,
                name: selectedFile.name,
                type: selectedFile.type as any,
                datasetType,
                lastSync: 'Just now',
                rowCount: 1240,
                status: 'Connected',
                qualityScore: 96.4,
                sourceSize: selectedFile.size,
              };
              addNewDataSource(newSource);
            }
            setIsUploading(false);
            setUploadStep(1);
            setSelectedFile(null);
            setImportProgress(0);
          }, 500);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
  };

  return (
    <div className="space-y-6">
      {/* Overview Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-white border border-border rounded-lg shadow-panel">
        <div>
          <h2 className="text-base font-semibold text-navy">Connected Data Assets</h2>
          <p className="text-xs text-slate mt-0.5">
            Active connections across branch Excel logs, POS systems, ERP databases, and customer records
          </p>
        </div>
        <button
          onClick={() => {
            setIsUploading(true);
            setUploadStep(1);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded transition-colors shadow-sm self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Ingest New Dataset</span>
        </button>
      </div>

      {/* Connected Data Sources Table */}
      <div className="bg-white border border-border rounded-lg shadow-panel overflow-hidden">
        <div className="p-4 border-b border-border bg-ivory/40 flex items-center justify-between">
          <span className="text-xs font-mono font-semibold text-slate uppercase">
            Live Feed Registry ({dataSources.length} Sources)
          </span>
          <span className="text-xs text-slate">PostgreSQL Pipeline: <strong>Ready</strong></span>
        </div>

        <div className="table-region">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-ivory/60 text-slate font-mono">
                <th className="py-3 px-4">Dataset Name & File</th>
                <th className="py-3 px-4">Connector Type</th>
                <th className="py-3 px-4">Domain Type</th>
                <th className="py-3 px-4 text-right">Row Count</th>
                <th className="py-3 px-4">Last Synced</th>
                <th className="py-3 px-4 text-center">Quality Score</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {dataSources.map((source) => (
                <tr key={source.id} className="hover:bg-ivory/30 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-teal shrink-0" />
                      <div>
                        <div className="font-semibold text-navy">{source.name}</div>
                        <div className="text-[10px] text-slate font-mono">{source.sourceSize}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono text-slate bg-ivory px-2 py-0.5 rounded border border-border">
                      {source.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-medium text-navy">{source.datasetType}</td>
                  <td className="py-3 px-4 text-right font-mono font-semibold">
                    {source.rowCount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-slate">{source.lastSync}</td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        source.qualityScore >= 95
                          ? 'bg-emerald-50 text-emerald-700'
                          : source.qualityScore >= 90
                          ? 'bg-teal-light text-teal'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {source.qualityScore}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                        source.status === 'Connected'
                          ? 'bg-emerald-50 text-emerald-700'
                          : source.status === 'Schema Drift'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-rose-100 text-rose-700'
                      }`}
                    >
                      {source.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setActiveModule('quality')}
                        className="px-2 py-1 text-[11px] text-teal hover:bg-teal-light rounded border border-teal/20 transition-colors"
                        title="Run Quality Profiling"
                      >
                        Profile
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload & Schema Mapping Modal Dialog */}
      {isUploading && (
        <div className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-editorial-lg border border-border max-w-2xl w-full overflow-hidden animate-fadeIn">
            {/* Modal Header */}
            <div className="p-4 border-b border-border bg-ivory/60 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-navy">
                  Data Ingestion & Schema Normalizer
                </h3>
                <p className="text-xs text-slate">
                  Step {uploadStep} of 4: {
                    uploadStep === 1
                      ? 'Select File Source'
                      : uploadStep === 2
                      ? 'Preview & Inspect Data'
                      : uploadStep === 3
                      ? 'Column Schema Mapping'
                      : 'Importing & Normalizing'
                  }
                </p>
              </div>
              <button
                onClick={() => setIsUploading(false)}
                className="text-slate hover:text-navy p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Step 1: Upload Drop Area */}
            {uploadStep === 1 && (
              <div className="p-6 space-y-4">
                <div className="border-2 border-dashed border-border-strong rounded-lg p-8 text-center hover:border-teal transition-colors bg-ivory/30">
                  <UploadCloud className="w-10 h-10 text-teal mx-auto mb-3" />
                  <h4 className="text-sm font-semibold text-navy">
                    Drop your Excel (.xlsx) or CSV file here
                  </h4>
                  <p className="text-xs text-slate mt-1">
                    Supports Microsoft Excel 2016+, CSV with UTF-8 encoding, and ERP batch exports up to 50MB.
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() =>
                        handleSimulatedFileDrop('Faisalabad_Depot_Nov2026_Invoices.xlsx', '1.8 MB')
                      }
                      className="px-3 py-1.5 text-xs font-mono bg-white border border-border rounded hover:border-teal transition-colors text-navy shadow-sm"
                    >
                      📁 Load Demo: Faisalabad_Depot_Invoices.xlsx
                    </button>
                    <button
                      onClick={() =>
                        handleSimulatedFileDrop('Karachi_Supermarket_Sales_Delta.csv', '940 KB')
                      }
                      className="px-3 py-1.5 text-xs font-mono bg-white border border-border rounded hover:border-teal transition-colors text-navy shadow-sm"
                    >
                      📁 Load Demo: Karachi_Sales_Delta.csv
                    </button>
                  </div>
                </div>

                <div className="text-[11px] text-slate font-mono bg-ivory p-3 rounded border border-border">
                  🔒 <strong>Upload Security Active:</strong> Files are scanned for malware signatures, evaluated for formula injection (=cmd/calc), and stripped of malicious macros before staging.
                </div>
              </div>
            )}

            {/* Step 2: Preview Detected Rows */}
            {uploadStep === 2 && selectedFile && (
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-xs bg-ivory p-3 rounded border border-border">
                  <div className="flex items-center gap-2 font-mono">
                    <FileSpreadsheet className="w-4 h-4 text-teal" />
                    <span className="font-semibold text-navy">{selectedFile.name}</span>
                    <span className="text-slate">({selectedFile.size})</span>
                  </div>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono font-bold">
                    Clean Signature
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">
                    Select Target Business Dataset Type:
                  </label>
                  <select
                    value={datasetType}
                    onChange={(e) => setDatasetType(e.target.value as any)}
                    className="w-full text-xs p-2 rounded border border-border bg-white text-navy focus:outline-none focus:border-teal"
                  >
                    <option value="Sales">Sales Invoices & Transactions</option>
                    <option value="Inventory">Inventory Balances & Ledger</option>
                    <option value="Customers">Customer Master & Accounts</option>
                    <option value="Products">Product Master Catalog</option>
                    <option value="Suppliers">Supplier Orders & Lead Times</option>
                  </select>
                </div>

                <div>
                  <h4 className="text-xs font-semibold text-navy mb-1.5">Detected Sample Rows (First 3):</h4>
                  <div className="table-region border border-border rounded text-[11px]">
                    <table className="w-full text-left font-mono">
                      <thead className="bg-ivory text-slate">
                        <tr>
                          <th className="p-2 border-b">Item_Code</th>
                          <th className="p-2 border-b">Cust_Account</th>
                          <th className="p-2 border-b">Qty</th>
                          <th className="p-2 border-b">Net_Amount</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr>
                          <td className="p-2">SKU-BEV-101</td>
                          <td className="p-2">CUST-KHI-01</td>
                          <td className="p-2">60</td>
                          <td className="p-2">58,800</td>
                        </tr>
                        <tr>
                          <td className="p-2">SKU-OIL-202</td>
                          <td className="p-2">CUST-LHR-02</td>
                          <td className="p-2">40</td>
                          <td className="p-2">119,200</td>
                        </tr>
                        <tr>
                          <td className="p-2">SKU-DAI-303</td>
                          <td className="p-2">CUST-ISB-03</td>
                          <td className="p-2">120</td>
                          <td className="p-2">414,000</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setUploadStep(1)}
                    className="px-3 py-1.5 text-xs text-slate hover:text-navy border border-border rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setUploadStep(3)}
                    className="px-4 py-1.5 text-xs font-semibold bg-teal hover:bg-teal-hover text-white rounded flex items-center gap-1.5"
                  >
                    <span>Proceed to Schema Mapping</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Column Schema Mapping */}
            {uploadStep === 3 && (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 p-2.5 rounded bg-teal-light text-teal text-xs">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>
                    Fuzzy matching auto-detected <strong>5 of 6 columns</strong>. Confirm or adjust the target schema mapping below.
                  </span>
                </div>

                <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                  {Object.entries(columnMappings).map(([uploadedCol, targetVal]) => (
                    <div
                      key={uploadedCol}
                      className="flex items-center justify-between p-2.5 rounded border border-border bg-ivory/30 text-xs"
                    >
                      <div className="font-mono font-semibold text-navy flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span>{uploadedCol}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-slate font-mono text-[11px]">&rarr;</span>
                        <select
                          value={targetVal}
                          onChange={(e) =>
                            setColumnMappings({ ...columnMappings, [uploadedCol]: e.target.value })
                          }
                          className="bg-white border border-border text-navy rounded px-2 py-1 text-xs focus:outline-none focus:border-teal font-medium"
                        >
                          {TARGET_FIELDS.map((f) => (
                            <option key={f.key} value={f.key}>
                              {f.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => setUploadStep(2)}
                    className="px-3 py-1.5 text-xs text-slate hover:text-navy border border-border rounded"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleStartImport}
                    className="px-5 py-2 text-xs font-semibold bg-teal hover:bg-teal-hover text-white rounded flex items-center gap-2 shadow-sm"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirm & Execute Ingestion</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Progress Bar */}
            {uploadStep === 4 && (
              <div className="p-8 text-center space-y-4">
                <RefreshCw className="w-8 h-8 text-teal animate-spin mx-auto" />
                <h4 className="text-sm font-semibold text-navy">
                  Normalizing & Ingesting Dataset...
                </h4>
                <p className="text-xs text-slate">
                  Parsing dates, standardizing product SKUs, applying PII mask to customer contact details.
                </p>

                <div className="w-full bg-ivory rounded-full h-2.5 overflow-hidden border border-border">
                  <div
                    className="bg-teal h-full transition-all duration-300"
                    style={{ width: `${importProgress}%` }}
                  />
                </div>
                <div className="text-xs font-mono text-slate">{importProgress}% Completed</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

