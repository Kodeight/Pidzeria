import React, { useState } from 'react';
import { Logo } from '../brand/Logo';
import {
  LayoutDashboard,
  ShoppingBag,
  ChefHat,
  Grid2X2,
  UtensilsCrossed,
  BarChart3,
  Volume2,
  VolumeX,
  ArrowLeft
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { DashboardOverview } from './DashboardOverview';
import { OrderKanban } from './OrderKanban';
import { KitchenDisplay } from './KitchenDisplay';
import { TableMap } from './TableMap';
import { MenuManager } from './MenuManager';
import { AnalyticsView } from './AnalyticsView';

type DashboardTab = 'overview' | 'orders' | 'kitchen' | 'tables' | 'menu' | 'analytics';

interface DashboardLayoutProps {
  onReturnToStorefront: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onReturnToStorefront }) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const { orders, soundEnabled, setSoundEnabled } = useStore();

  const activeOrdersCount = orders.filter(o => o.status !== 'servie' && o.status !== 'annulee').length;

  return (
    <div className="min-h-screen bg-black text-[#f7f2e7] flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0a0807] border-r border-[#26221d] shrink-0 p-6 flex flex-col justify-between">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between mb-8">
            <Logo size="md" />
            <button
              onClick={onReturnToStorefront}
              className="p-2 rounded-xl bg-[#141210] hover:bg-[#1f1b18] text-[#8c7e6c] hover:text-[#f7f2e7] transition-colors border border-[#2a241f] cursor-pointer"
              title="Retour au site client"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2e2823] text-[#dfd0ba] text-xs font-mono font-bold uppercase tracking-wider mb-6 flex items-center justify-between">
            <span>GESTION RESTAURANT</span>
            <span className="w-2 h-2 rounded-full bg-[#dfd0ba] animate-pulse" />
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-[#dfd0ba] text-[#0a0a0a] font-black shadow-lg shadow-black/80'
                  : 'hover:bg-[#141210] text-[#8c7e6c] hover:text-[#f7f2e7]'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4" />
                <span>Tableau de bord</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#dfd0ba] text-[#0a0a0a] font-black shadow-lg shadow-black/80'
                  : 'hover:bg-[#141210] text-[#8c7e6c] hover:text-[#f7f2e7]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Commandes POS</span>
              </div>
              {activeOrdersCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">
                  {activeOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('kitchen')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'kitchen'
                  ? 'bg-[#dfd0ba] text-[#0a0a0a] font-black shadow-lg shadow-black/80'
                  : 'hover:bg-[#141210] text-[#8c7e6c] hover:text-[#f7f2e7]'
              }`}
            >
              <div className="flex items-center gap-3">
                <ChefHat className="w-4 h-4" />
                <span>Écran Cuisine KDS</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tables')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'tables'
                  ? 'bg-[#dfd0ba] text-[#0a0a0a] font-black shadow-lg shadow-black/80'
                  : 'hover:bg-[#141210] text-[#8c7e6c] hover:text-[#f7f2e7]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Grid2X2 className="w-4 h-4" />
                <span>Plan des Tables & QR</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('menu')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'menu'
                  ? 'bg-[#dfd0ba] text-[#0a0a0a] font-black shadow-lg shadow-black/80'
                  : 'hover:bg-[#141210] text-[#8c7e6c] hover:text-[#f7f2e7]'
              }`}
            >
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Gestion du Menu</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'analytics'
                  ? 'bg-[#dfd0ba] text-[#0a0a0a] font-black shadow-lg shadow-black/80'
                  : 'hover:bg-[#141210] text-[#8c7e6c] hover:text-[#f7f2e7]'
              }`}
            >
              <div className="flex items-center gap-3">
                <BarChart3 className="w-4 h-4" />
                <span>Analytique Ventes</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Bottom Sound Alert Toggle */}
        <div className="pt-6 border-t border-[#26221d]">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-full p-3 rounded-2xl bg-[#141210] hover:bg-[#1f1b18] border border-[#2a241f] text-xs font-medium flex items-center justify-between text-[#8c7e6c] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-[#dfd0ba]" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
              <span>Alertes Sonores</span>
            </div>
            <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md ${
              soundEnabled ? 'bg-[#221e1a] text-[#dfd0ba] border border-[#3d3730]' : 'bg-[#141210] text-stone-500'
            }`}>
              {soundEnabled ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Tab Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-black">
        {activeTab === 'overview' && <DashboardOverview onNavigateTab={(t) => setActiveTab(t as DashboardTab)} />}
        {activeTab === 'orders' && <OrderKanban />}
        {activeTab === 'kitchen' && <KitchenDisplay />}
        {activeTab === 'tables' && <TableMap />}
        {activeTab === 'menu' && <MenuManager />}
        {activeTab === 'analytics' && <AnalyticsView />}
      </main>

    </div>
  );
};
