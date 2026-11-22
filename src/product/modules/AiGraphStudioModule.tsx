import React, { useState } from 'react';
import {
  LineChart as LineChartIcon,
  BarChart3,
  TrendingUp,
  Sparkles,
  Send,
  Calendar,
  Layers,
  ArrowRight,
  Maximize2,
  Download,
  RotateCcw,
  Building2,
  CheckCircle2,
  Info,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { useProduct } from '../context/ProductContext';

type ChartType = 'area' | 'bar' | 'line';

interface ChartBotMessage {
  id: string;
  sender: 'user' | 'bot';
  timestamp: string;
  query: string;
  title: string;
  subtitle: string;
  recommendedChartType: ChartType;
  currentChartType: ChartType;
  summaryPoints: string[];
  kpiStats: Array<{ label: string; value: string; trend?: string; isPositive?: boolean }>;
  data: Array<Record<string, any>>;
  dataKeys: Array<{ key: string; name: string; color: string }>;
  unit: string;
  xAxisKey: string;
}

export const AiGraphStudioModule: React.FC = () => {
  const { metrics, products, customers, addAuditLog } = useProduct();
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initial message: Default previous month sales trend analysis!
  const [history, setHistory] = useState<ChartBotMessage[]>([
    {
      id: 'chart-msg-1',
      sender: 'bot',
      timestamp: 'Today at 08:30 AM',
      query: 'Analyze previous month sales trend across all depots',
      title: 'Previous Month Sales Trajectory (October vs. November)',
      subtitle: 'Comparison of 8-week weekly depot sales velocity with verified data reconciliation',
      recommendedChartType: 'area',
      currentChartType: 'area',
      summaryPoints: [
        'Total October gross revenue closed at PKR 46.2M across 4 depot hubs.',
        'November verified sales pace is currently +8.4% ahead of October, projected to reach PKR 48.6M.',
        'Peak sales surge occurred in Week 3 of October due to seasonal wedding FMCG bulk orders.',
        'Isolation of PKR 85,000 in duplicate invoices corrected an artificial +14% velocity skew in Lahore.',
      ],
      kpiStats: [
        { label: 'October Revenue', value: 'PKR 46.2M', trend: '+5.2% vs Sep', isPositive: true },
        { label: 'Current 30d Run', value: 'PKR 48.6M', trend: '+8.4% MoM', isPositive: true },
        { label: 'Peak Sales Week', value: 'W3 Oct (PKR 12.2M)' },
        { label: 'Data Trust Rating', value: '94.2% Clean' },
      ],
      data: [
        { week: 'W1 Oct', lastMonth: 10.4, currentMonth: 11.2, benchmark: 10.5 },
        { week: 'W2 Oct', lastMonth: 11.1, currentMonth: 11.8, benchmark: 11.0 },
        { week: 'W3 Oct', lastMonth: 11.8, currentMonth: 12.6, benchmark: 11.7 },
        { week: 'W4 Oct', lastMonth: 12.2, currentMonth: 12.9, benchmark: 12.3 },
        { week: 'W1 Nov', lastMonth: 12.5, currentMonth: 13.4, benchmark: 12.8 },
        { week: 'W2 Nov', lastMonth: 12.9, currentMonth: 13.8, benchmark: 13.1 },
      ],
      dataKeys: [
        { key: 'lastMonth', name: 'Prior Period Sales (PKR M)', color: '#D9A441' },
        { key: 'currentMonth', name: 'Current Verified Sales (PKR M)', color: '#176B62' },
        { key: 'benchmark', name: 'Baseline Moving Average (PKR M)', color: '#697681' },
      ],
      unit: 'M',
      xAxisKey: 'week',
    },
  ]);

  const QUICK_PROMPTS = [
    { label: '📈 Previous Month Sales Trend', prompt: 'Analyze previous month sales trend across all depots' },
    { label: '🏛️ Karachi vs Lahore Branch Comparison', prompt: 'Compare monthly revenue between Karachi Hub and Lahore Depot' },
    { label: '🏷️ Category Gross Revenue Distribution', prompt: 'Show product category sales distribution and margins' },
    { label: '📦 Top SKUs Velocity vs Stock', prompt: 'Plot daily run-rate versus warehouse inventory for top products' },
    { label: '🛡️ Verified Clean vs Raw Sales Trend', prompt: 'Show weekly verified sales compared to raw unverified sales' },
  ];

  const handlePromptClick = (promptText: string) => {
    handleRunAnalysis(promptText);
  };

  const handleRunAnalysis = (queryText: string) => {
    if (!queryText.trim()) return;
    setIsAnalyzing(true);
    setInputText('');

    setTimeout(() => {
      const lower = queryText.toLowerCase();
      let newMsg: ChartBotMessage;

      // Scenario 1: Branch Comparison (Karachi vs Lahore vs Islamabad)
      if (lower.includes('karachi') || lower.includes('lahore') || lower.includes('branch') || lower.includes('depot')) {
        newMsg = {
          id: `chart-msg-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          query: queryText,
          title: 'Depot Revenue Comparison (Karachi vs. Lahore vs. Islamabad)',
          subtitle: 'Multi-branch monthly sales distribution across the past 5 operational cycles',
          recommendedChartType: 'bar',
          currentChartType: 'bar',
          summaryPoints: [
            'Karachi Central Hub leads total revenue generation with 41.5% market share (PKR 20.1M).',
            'Lahore South Depot represents 32.8% of volume, recovering after duplicate line quarantine.',
            'Islamabad Federal Depot shows steady linear growth (+6.2% MoM) driven by institutional clients.',
            'Faisalabad Depot represents the fastest growing tier in edible oil dispatches.',
          ],
          kpiStats: [
            { label: 'Karachi Hub 30d', value: 'PKR 20.1M', trend: '+10.2%', isPositive: true },
            { label: 'Lahore Depot 30d', value: 'PKR 15.9M', trend: '+5.4%', isPositive: true },
            { label: 'Islamabad Federal', value: 'PKR 8.8M', trend: '+6.2%', isPositive: true },
            { label: 'Faisalabad Hub', value: 'PKR 3.8M', trend: '+3.1%', isPositive: true },
          ],
          data: [
            { month: 'Jul', Karachi: 17.2, Lahore: 13.8, Islamabad: 7.2 },
            { month: 'Aug', Karachi: 18.1, Lahore: 14.2, Islamabad: 7.6 },
            { month: 'Sep', Karachi: 18.9, Lahore: 14.8, Islamabad: 8.1 },
            { month: 'Oct', Karachi: 19.5, Lahore: 15.2, Islamabad: 8.4 },
            { month: 'Nov', Karachi: 20.1, Lahore: 15.9, Islamabad: 8.8 },
          ],
          dataKeys: [
            { key: 'Karachi', name: 'Karachi Central Hub (PKR M)', color: '#176B62' },
            { key: 'Lahore', name: 'Lahore South Depot (PKR M)', color: '#D9A441' },
            { key: 'Islamabad', name: 'Islamabad Federal Depot (PKR M)', color: '#202A32' },
          ],
          unit: 'M',
          xAxisKey: 'month',
        };
      }
      // Scenario 2: Category Breakdown
      else if (lower.includes('category') || lower.includes('margin') || lower.includes('distribution')) {
        newMsg = {
          id: `chart-msg-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          query: queryText,
          title: 'Wholesale Category Revenue & Gross Margins',
          subtitle: 'Gross revenue and margin percentage breakdown by wholesale product vertical',
          recommendedChartType: 'bar',
          currentChartType: 'bar',
          summaryPoints: [
            'Beverages and Edible Oils contribute 56% of total depot gross sales volume.',
            'Tea & Spices generate the highest gross profit margin at 16.3% per carton.',
            'Dairy & UHT exhibits the fastest inventory turns (every 4.2 days on average).',
            'Household cleaning presents working capital overstock with Surf Excel supply at 68 days.',
          ],
          kpiStats: [
            { label: 'Beverages Revenue', value: 'PKR 14.8M', trend: '30.4% Share' },
            { label: 'Edible Oils Revenue', value: 'PKR 12.4M', trend: '25.5% Share' },
            { label: 'Top Margin Category', value: 'Tea & Spices (16.3%)' },
            { label: 'Active Vertical SKUs', value: '10 Tracked' },
          ],
          data: [
            { category: 'Beverages', revenue: 14.8, margin: 16.3 },
            { category: 'Edible Oils', revenue: 12.4, margin: 11.1 },
            { category: 'Dairy & UHT', revenue: 10.9, margin: 10.1 },
            { category: 'Tea & Spices', revenue: 6.2, margin: 18.5 },
            { category: 'Household', revenue: 4.3, margin: 10.8 },
          ],
          dataKeys: [
            { key: 'revenue', name: 'Gross Revenue (PKR M)', color: '#176B62' },
            { key: 'margin', name: 'Gross Margin %', color: '#D9A441' },
          ],
          unit: 'M',
          xAxisKey: 'category',
        };
      }
      // Scenario 3: SKU Velocity vs Stock
      else if (lower.includes('sku') || lower.includes('product') || lower.includes('run-rate') || lower.includes('stock')) {
        newMsg = {
          id: `chart-msg-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          query: queryText,
          title: 'Top SKU Velocity vs. Current Stock Buffer',
          subtitle: 'Comparing daily consumption demand against on-hand warehouse inventory',
          recommendedChartType: 'bar',
          currentChartType: 'bar',
          summaryPoints: [
            'Gourmet Cola 1.5L has 120 units against 28/day demand: 4.2 days of runway remaining.',
            'Sufi Sunflower Cooking Oil has 68 cans against 18/day demand: 3.7 days of runway.',
            'Surf Excel Detergent is heavily overstocked with 820 bales holding PKR 5.08M capital.',
            'Tarang Tea Whitener and Olpers Milk have healthy stock buffers matching weekly replenishment.',
          ],
          kpiStats: [
            { label: 'Critical Stockouts', value: '2 SKUs', trend: '< 5d Runway', isPositive: false },
            { label: 'Overstock SKU', value: 'Surf Excel (820 Bales)' },
            { label: 'Depot Run-rate', value: '183 Units / Day' },
            { label: 'Replenishment Reqs', value: '400 Cartons' },
          ],
          data: [
            { name: 'Gourmet Cola', currentStock: 120, dailyDemand: 28, threshold: 250 },
            { name: 'Sufi Oil 5L', currentStock: 68, dailyDemand: 18, threshold: 180 },
            { name: 'Olpers Milk', currentStock: 195, dailyDemand: 35, threshold: 300 },
            { name: 'Tapal Tea', currentStock: 480, dailyDemand: 16, threshold: 200 },
            { name: 'Surf Excel', currentStock: 820, dailyDemand: 12, threshold: 220 },
          ],
          dataKeys: [
            { key: 'currentStock', name: 'Current Stock (Units)', color: '#176B62' },
            { key: 'threshold', name: 'Reorder Buffer Point', color: '#D9A441' },
          ],
          unit: '',
          xAxisKey: 'name',
        };
      }
      // Scenario 4: Default / Previous month sales trend
      else {
        newMsg = {
          id: `chart-msg-${Date.now()}`,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          query: queryText,
          title: 'Wholesale Sales Trend & Velocity Analysis',
          subtitle: `Automated dynamic chart generated for intent: "${queryText}"`,
          recommendedChartType: 'area',
          currentChartType: 'area',
          summaryPoints: [
            `Total verified revenue over the analyzed timeframe is PKR ${(metrics.verifiedRevenuePKR / 1000000).toFixed(2)}M.`,
            'Weekly growth delta continues at +8.4% above baseline moving average.',
            'Data quality filter actively excluded PKR 85,000 in duplicate invoices to prevent chart distortion.',
            'Sales trajectory indicates stable growth across beverage and dairy lines.',
          ],
          kpiStats: [
            { label: 'Analyzed Sales', value: `PKR ${(metrics.verifiedRevenuePKR / 1000000).toFixed(2)}M`, trend: '+8.4%', isPositive: true },
            { label: 'Active SKUs', value: `${products.length} Products` },
            { label: 'Weekly Volume', value: '~1,450 Cartons' },
            { label: 'Forecast Accuracy', value: 'MAPE 6.8%' },
          ],
          data: [
            { period: 'W1', sales: 10.4, forecast: 10.6 },
            { period: 'W2', sales: 11.1, forecast: 11.2 },
            { period: 'W3', sales: 11.8, forecast: 11.9 },
            { period: 'W4', sales: 12.2, forecast: 12.4 },
            { period: 'W5', sales: 12.9, forecast: 13.1 },
            { period: 'W6', sales: 13.4, forecast: 13.8 },
          ],
          dataKeys: [
            { key: 'sales', name: 'Verified Commercial Sales (PKR M)', color: '#176B62' },
            { key: 'forecast', name: 'Predictive Baseline (PKR M)', color: '#D9A441' },
          ],
          unit: 'M',
          xAxisKey: 'period',
        };
      }

      setHistory((prev) => [newMsg, ...prev]);
      setIsAnalyzing(false);
      addAuditLog(
        'CHART_STUDIO_QUERY',
        'AI Graph Studio',
        `Generated interactive ${newMsg.recommendedChartType.toUpperCase()} chart for: "${queryText.substring(0, 45)}..."`
      );
    }, 750);
  };

  const handleSwitchChartType = (msgId: string, newType: ChartType) => {
    setHistory((prev) =>
      prev.map((m) => (m.id === msgId ? { ...m, currentChartType: newType } : m))
    );
  };

  const latestMessage = history[0];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 bg-white border border-border rounded-lg shadow-panel flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-teal-light text-teal">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-sm font-semibold text-navy">
              AI Visual Trend &amp; Graph Studio
            </h2>
          </div>
          <p className="text-xs text-slate">
            Conversational data visualization engine: Ask for sales trends, branch comparisons, or product velocity in natural language to dynamically generate the best chart.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold rounded border border-emerald-200">
            Intelligent Graph Selection: Active
          </span>
        </div>
      </div>

      {/* Quick Trend Prompt Chips */}
      <div className="space-y-2">
        <div className="text-[11px] font-mono font-bold text-slate uppercase">
          Quick Analytical Visualizations:
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {QUICK_PROMPTS.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handlePromptClick(qp.prompt)}
              className="px-3.5 py-1.5 bg-white hover:bg-teal-light text-navy text-xs rounded-lg border border-border hover:border-teal/50 transition-all font-medium whitespace-nowrap shadow-panel shrink-0 flex items-center gap-1.5"
            >
              <span>{qp.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Conversational Query Input Bar */}
      <div className="p-3.5 bg-white border border-border rounded-lg shadow-panel flex items-center gap-2">
        <input
          type="text"
          placeholder="Ask the Graph Bot to draw or analyze any trend (e.g., 'Analyze previous month sales trend', 'Plot Karachi vs Lahore revenue')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleRunAnalysis(inputText)}
          className="flex-1 px-3.5 py-2 text-xs border border-border rounded bg-ivory/40 focus:outline-none focus:border-teal text-navy placeholder:text-slate"
        />
        <button
          onClick={() => handleRunAnalysis(inputText)}
          disabled={!inputText.trim() || isAnalyzing}
          className="px-5 py-2 bg-teal hover:bg-teal-hover text-white text-xs font-semibold rounded flex items-center gap-1.5 shadow-sm transition-colors disabled:opacity-50 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAnalyzing ? 'Analyzing Data...' : 'Generate Graph'}</span>
        </button>
      </div>

      {/* Main Dynamic Chart Canvas */}
      {latestMessage && (
        <div className="bg-white border border-border rounded-lg shadow-panel p-6 space-y-6 animate-fadeIn">
          {/* Chart Header & Type Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Prompt: "{latestMessage.query}"</span>
              </div>
              <h3 className="text-base font-bold text-navy mt-1">{latestMessage.title}</h3>
              <p className="text-xs text-slate mt-0.5">{latestMessage.subtitle}</p>
            </div>

            {/* Interactive Graph Type Switcher */}
            <div className="flex items-center gap-1 bg-ivory border border-border rounded p-1 self-start sm:self-auto text-xs font-mono">
              <span className="text-[10px] text-slate px-1.5 uppercase font-bold">Chart Mode:</span>
              <button
                onClick={() => handleSwitchChartType(latestMessage.id, 'area')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  latestMessage.currentChartType === 'area'
                    ? 'bg-navy text-white font-bold shadow-sm'
                    : 'text-slate hover:text-navy'
                }`}
              >
                Area
              </button>
              <button
                onClick={() => handleSwitchChartType(latestMessage.id, 'bar')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  latestMessage.currentChartType === 'bar'
                    ? 'bg-navy text-white font-bold shadow-sm'
                    : 'text-slate hover:text-navy'
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => handleSwitchChartType(latestMessage.id, 'line')}
                className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                  latestMessage.currentChartType === 'line'
                    ? 'bg-navy text-white font-bold shadow-sm'
                    : 'text-slate hover:text-navy'
                }`}
              >
                Line
              </button>
            </div>
          </div>

          {/* KPI Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
            {latestMessage.kpiStats.map((kpi, idx) => (
              <div key={idx} className="p-3 bg-ivory/60 rounded border border-border space-y-1">
                <span className="text-[10px] text-slate block">{kpi.label}</span>
                <div className="text-base font-bold text-navy">{kpi.value}</div>
                {kpi.trend && (
                  <span
                    className={`text-[10px] font-bold ${
                      kpi.isPositive === false ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {kpi.trend}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Recharts Render Area */}
          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              {latestMessage.currentChartType === 'area' ? (
                <AreaChart data={latestMessage.data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="studioTeal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#176B62" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#176B62" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="studioAmber" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D9A441" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#D9A441" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" />
                  <XAxis dataKey={latestMessage.xAxisKey} tick={{ fontSize: 11, fill: '#697681' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#697681' }} unit={latestMessage.unit} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#101D2B',
                      borderRadius: '6px',
                      color: '#F5F4EF',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  {latestMessage.dataKeys.map((dk, i) => (
                    <Area
                      key={dk.key}
                      type="monotone"
                      dataKey={dk.key}
                      name={dk.name}
                      stroke={dk.color}
                      strokeWidth={2.5}
                      fill={i === 0 ? 'url(#studioAmber)' : 'url(#studioTeal)'}
                    />
                  ))}
                </AreaChart>
              ) : latestMessage.currentChartType === 'bar' ? (
                <BarChart data={latestMessage.data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" />
                  <XAxis dataKey={latestMessage.xAxisKey} tick={{ fontSize: 11, fill: '#697681' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#697681' }} unit={latestMessage.unit} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#101D2B',
                      borderRadius: '6px',
                      color: '#F5F4EF',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  {latestMessage.dataKeys.map((dk) => (
                    <Bar key={dk.key} dataKey={dk.key} name={dk.name} fill={dk.color} radius={[4, 4, 0, 0]} />
                  ))}
                </BarChart>
              ) : (
                <LineChart data={latestMessage.data} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E4E7E5" />
                  <XAxis dataKey={latestMessage.xAxisKey} tick={{ fontSize: 11, fill: '#697681' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#697681' }} unit={latestMessage.unit} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#101D2B',
                      borderRadius: '6px',
                      color: '#F5F4EF',
                      fontSize: '12px',
                    }}
                  />
                  <Legend />
                  {latestMessage.dataKeys.map((dk) => (
                    <Line
                      key={dk.key}
                      type="monotone"
                      dataKey={dk.key}
                      name={dk.name}
                      stroke={dk.color}
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: dk.color }}
                    />
                  ))}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>

          {/* AI Analytical Insights Commentary */}
          <div className="p-4 bg-ivory/60 rounded-lg border border-border space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-navy">
              <Sparkles className="w-3.5 h-3.5 text-teal" />
              <span>AI Analytical Trend Summary &amp; Key Findings</span>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate">
              {latestMessage.summaryPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Data Points Table */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold text-slate uppercase">
              Underlying Data Matrix (PKR):
            </span>
            <div className="table-region border border-border rounded text-xs font-mono">
              <table className="w-full text-left">
                <thead className="bg-ivory text-slate border-b border-border">
                  <tr>
                    <th className="p-2.5">{latestMessage.xAxisKey.toUpperCase()}</th>
                    {latestMessage.dataKeys.map((dk) => (
                      <th key={dk.key} className="p-2.5 text-right">{dk.name}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {latestMessage.data.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-ivory/30">
                      <td className="p-2.5 font-bold text-navy">{row[latestMessage.xAxisKey]}</td>
                      {latestMessage.dataKeys.map((dk) => (
                        <td key={dk.key} className="p-2.5 text-right font-semibold text-navy">
                          {typeof row[dk.key] === 'number'
                            ? `${row[dk.key]}${latestMessage.unit ? ` ${latestMessage.unit}` : ''}`
                            : row[dk.key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

