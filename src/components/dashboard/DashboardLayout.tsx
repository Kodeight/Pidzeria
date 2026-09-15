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
  ArrowLeft,
  Settings
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
    <div className="min-h-screen bg-[#070606] text-stone-200 flex flex-col md:flex-row font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[#0d0b0b] border-r border-stone-800 shrink-0 p-6 flex flex-col justify-between">
        <div>
          {/* Brand header */}
          <div className="flex items-center justify-between mb-8">
            <Logo size="md" />
            <button
              onClick={onReturnToStorefront}
              className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors border border-stone-800"
              title="Retour au site client"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider mb-6 flex items-center justify-between">
            <span>GESTION RESTAURANT</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                  : 'hover:bg-stone-900 text-stone-400 hover:text-stone-200'
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
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                  : 'hover:bg-stone-900 text-stone-400 hover:text-stone-200'
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
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                  : 'hover:bg-stone-900 text-stone-400 hover:text-stone-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <ChefHat className="w-4 h-4" />
                <span>Ecran Cuisine KDS</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('tables')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                activeTab === 'tables'
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                  : 'hover:bg-stone-900 text-stone-400 hover:text-stone-200'
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
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                  : 'hover:bg-stone-900 text-stone-400 hover:text-stone-200'
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
                  ? 'bg-amber-500 text-stone-950 font-black shadow-lg shadow-amber-500/20'
                  : 'hover:bg-stone-900 text-stone-400 hover:text-stone-200'
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
        <div className="pt-6 border-t border-stone-800">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-full p-3 rounded-2xl bg-stone-900/80 hover:bg-stone-800 border border-stone-800 text-xs font-medium flex items-center justify-between text-stone-300 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
              <span>Alertes Sonores</span>
            </div>
            <span className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md ${
              soundEnabled ? 'bg-emerald-500/20 text-emerald-300' : 'bg-stone-800 text-stone-500'
            }`}>
              {soundEnabled ? 'ON' : 'OFF'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Tab Content */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
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
