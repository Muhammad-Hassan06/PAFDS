import React, { useState } from 'react';
import { ProductProvider, useProduct } from './context/ProductContext';
import { ProductSidebar } from './components/ProductSidebar';
import { ProductHeader } from './components/ProductHeader';

// 12 Most Important Core Platform Modules
import { OverviewDashboard } from './modules/OverviewDashboard';
import { DataSourcesModule } from './modules/DataSourcesModule';
import { DataQualityModule } from './modules/DataQualityModule';
import { DataRepairModule } from './modules/DataRepairModule';
import { DataImpactModule } from './modules/DataImpactModule';
import { SalesAnalyticsModule } from './modules/SalesAnalyticsModule';
import { InventoryModule } from './modules/InventoryModule';
import { DemandForecastingModule } from './modules/DemandForecastingModule';
import { AiGraphStudioModule } from './modules/AiGraphStudioModule';
import { RecommendationsModule } from './modules/RecommendationsModule';
import { AiAssistantModule } from './modules/AiAssistantModule';
import { SecurityCenterModule } from './modules/SecurityCenterModule';

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
      case 'graph-studio':
        return <AiGraphStudioModule />;
      case 'recommendations':
        return <RecommendationsModule />;
      case 'assistant':
        return <AiAssistantModule />;
      case 'security':
        return <SecurityCenterModule />;
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
