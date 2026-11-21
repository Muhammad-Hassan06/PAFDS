import React, { useState } from 'react';
import { ProductProvider, useProduct } from './context/ProductContext';
import { ProductSidebar } from './components/ProductSidebar';
import { ProductHeader } from './components/ProductHeader';

// Modules
import { OverviewDashboard } from './modules/OverviewDashboard';
import { DataSourcesModule } from './modules/DataSourcesModule';
import { DataQualityModule } from './modules/DataQualityModule';
import { DataRepairModule } from './modules/DataRepairModule';
import { DataImpactModule } from './modules/DataImpactModule';
import { SalesAnalyticsModule } from './modules/SalesAnalyticsModule';
import { InventoryModule } from './modules/InventoryModule';
import { DemandForecastingModule } from './modules/DemandForecastingModule';
import { StockoutRiskModule } from './modules/StockoutRiskModule';
import { WhatIfSimulatorModule } from './modules/WhatIfSimulatorModule';
import { RecommendationsModule } from './modules/RecommendationsModule';
import { AiAssistantModule } from './modules/AiAssistantModule';
import { PipelineMonitoringModule } from './modules/PipelineMonitoringModule';
import { SecurityCenterModule } from './modules/SecurityCenterModule';
import { AiQueryGuardModule } from './modules/AiQueryGuardModule';
import { RbacAuditModule } from './modules/RbacAuditModule';
import { ExecutiveReportModule } from './modules/ExecutiveReportModule';
import { SyntheticGeneratorModule } from './modules/SyntheticGeneratorModule';
import { SettingsModule } from './modules/SettingsModule';

interface ProductAppProps {
  onExitToWebsite: () => void;
}

const ProductContent: React.FC<ProductAppProps> = ({ onExitToWebsite }) => {
  const { activeModule } = useProduct();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderModule = () => {
    switch (activeModule) {
      case 'overview':
        return <OverviewDashboard />;
      case 'sources':
        return <DataSourcesModule />;
      case 'quality':
        return <DataQualityModule />;
      case 'repair':
        return <DataRepairModule />;
      case 'impact':
        return <DataImpactModule />;
      case 'sales':
        return <SalesAnalyticsModule />;
      case 'inventory':
        return <InventoryModule />;
      case 'forecast':
        return <DemandForecastingModule />;
      case 'stockout':
        return <StockoutRiskModule />;
      case 'what-if':
        return <WhatIfSimulatorModule />;
      case 'recommendations':
        return <RecommendationsModule />;
      case 'assistant':
        return <AiAssistantModule />;
      case 'pipelines':
        return <PipelineMonitoringModule />;
      case 'security':
        return <SecurityCenterModule />;
      case 'guard':
        return <AiQueryGuardModule />;
      case 'audit':
        return <RbacAuditModule />;
      case 'report':
        return <ExecutiveReportModule />;
      case 'generator':
        return <SyntheticGeneratorModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col font-sans">
      {/* Collapsible Left Sidebar */}
      <ProductSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onExitToWebsite={onExitToWebsite}
      />

      {/* Top Header */}
      <ProductHeader
        sidebarCollapsed={sidebarCollapsed}
        onExitToWebsite={onExitToWebsite}
      />

      {/* Main Module Content Area */}
      <main
        className={`flex-1 p-4 sm:p-6 transition-all duration-300 ${
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <div className="max-w-7xl mx-auto">{renderModule()}</div>
      </main>
    </div>
  );
};

export const ProductApp: React.FC<ProductAppProps> = ({ onExitToWebsite }) => {
  return (
    <ProductProvider>
      <ProductContent onExitToWebsite={onExitToWebsite} />
    </ProductProvider>
  );
};

export default ProductApp;
