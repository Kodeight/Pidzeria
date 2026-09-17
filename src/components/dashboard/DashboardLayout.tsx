import React, { useState, useEffect } from 'react';
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
  LogOut,
  Menu as MenuIcon,
  X,
  Store,
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { DashboardOverview } from './DashboardOverview';
import { OrderKanban } from './OrderKanban';
import { KitchenDisplay } from './KitchenDisplay';
import { TableMap } from './TableMap';
import { MenuManager } from './MenuManager';
import { AnalyticsView } from './AnalyticsView';

type DashboardTab = 'overview' | 'orders' | 'kitchen' | 'tables' | 'menu' | 'analytics';

interface DashboardLayoutProps {
  onReturnToStorefront: () => void;
  onLogout: () => void;
  initialTab?: DashboardTab;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  onReturnToStorefront,
  onLogout,
  initialTab = 'overview',
}) => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { orders, soundEnabled, setSoundEnabled } = useStore();
  const { logout } = useAuth();

  const newOrdersCount = orders.filter((o) => o.status === 'recue').length;

  const handleLogoutClick = async () => {
    await logout();
    onLogout();
  };

  const handleTabSelect = (tab: DashboardTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    // Update URL path without full reload
    const path = tab === 'overview' ? '/dashboard' : `/dashboard/${tab}`;
    window.history.pushState(null, '', path);
  };

  // Close mobile drawer on escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    {
      id: 'overview' as DashboardTab,
      label: 'Tableau de bord',
      icon: LayoutDashboard,
    },
    {
      id: 'orders' as DashboardTab,
      label: 'Commandes POS',
      icon: ShoppingBag,
      badge: newOrdersCount > 0 ? newOrdersCount : undefined,
    },
    {
      id: 'kitchen' as DashboardTab,
      label: 'Écran Cuisine KDS',
      icon: ChefHat,
    },
    {
      id: 'tables' as DashboardTab,
      label: 'Plan des Tables & QR',
      icon: Grid2X2,
    },
    {
      id: 'menu' as DashboardTab,
      label: 'Gestion du Menu',
      icon: UtensilsCrossed,
    },
    {
      id: 'analytics' as DashboardTab,
      label: 'Analytique Ventes',
      icon: BarChart3,
    },
  ];

  return (
    <div className="min-h-screen bg-black text-[#f7f2e7] flex flex-col md:flex-row font-sans selection:bg-[#dfd0ba] selection:text-black">
      
      {/* ========================================================
          MOBILE TOP APP BAR
          ======================================================== */}
      <header className="md:hidden sticky top-0 z-40 bg-[#0a0807]/95 backdrop-blur-xl border-b border-[#26221d] px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#141210] border border-[#2a241f] text-[#dfd0ba] hover:bg-[#1f1b18] transition-colors cursor-pointer"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
          <Logo size="sm" />
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Alert Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-[#141210] border border-[#2a241f] text-[#8c7e6c] hover:text-[#dfd0ba] transition-colors cursor-pointer"
            title={soundEnabled ? 'Désactiver les sons' : 'Activer les sons'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-[#dfd0ba]" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-600" />
            )}
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogoutClick}
            className="p-2 rounded-xl bg-[#1d1110] border border-[#3d1a16] text-[#f7a494] hover:bg-[#2d1613] transition-colors cursor-pointer"
            title="Se déconnecter"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ========================================================
          MOBILE SLIDE-OUT NAVIGATION DRAWER
          ======================================================== */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Panel */}
          <div className="relative w-4/5 max-w-xs bg-[#0a0807] border-r border-[#26221d] h-full p-6 flex flex-col justify-between overflow-y-auto shadow-2xl z-10">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#211c17]">
                <Logo size="md" />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-xl bg-[#141210] border border-[#2a241f] text-[#8c7e6c]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-3 py-1.5 rounded-xl bg-[#161311] border border-[#2e2823] text-[#dfd0ba] text-[10px] font-mono font-bold uppercase tracking-wider mb-5 flex items-center justify-between">
                <span>GESTION RESTAURANT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfd0ba] animate-pulse" />
              </div>

              {/* Nav links */}
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isSelected = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabSelect(item.id)}
                      className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#dfd0ba] text-[#0a0a0a] shadow-lg shadow-black/80 font-black'
                          : 'bg-transparent text-[#8c7e6c] hover:bg-[#141210] hover:text-[#f7f2e7]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Drawer Bottom Actions */}
            <div className="pt-6 border-t border-[#26221d] space-y-2">
              <button
                onClick={onReturnToStorefront}
                className="w-full px-4 py-3 rounded-xl bg-[#12100e] border border-[#2a241f] text-xs font-semibold text-[#cbb89d] hover:text-[#f7f2e7] flex items-center gap-3 cursor-pointer"
              >
                <Store className="w-4 h-4 text-[#dfd0ba]" />
                <span>Retour au site client</span>
              </button>

              <button
                onClick={handleLogoutClick}
                className="w-full px-4 py-3 rounded-xl bg-[#1e100e] border border-[#3d1a16] text-xs font-bold text-[#f7a494] hover:bg-[#2e1613] flex items-center gap-3 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Se déconnecter</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          DESKTOP SIDEBAR NAVIGATION
          ======================================================== */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-[#0a0807] border-r border-[#26221d] shrink-0 p-6 flex-col justify-between">
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
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isSelected = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabSelect(item.id)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs font-bold flex items-center justify-between transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#dfd0ba] text-[#0a0a0a] font-black shadow-lg shadow-black/80'
                      : 'hover:bg-[#141210] text-[#8c7e6c] hover:text-[#f7f2e7]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-black">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions: Sound Alert & Logout */}
        <div className="pt-6 border-t border-[#26221d] space-y-3">
          {/* Sound alert switch */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="w-full p-3 rounded-2xl bg-[#141210] hover:bg-[#1f1b18] border border-[#2a241f] text-xs font-medium flex items-center justify-between text-[#8c7e6c] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[#dfd0ba]" />
              ) : (
                <VolumeX className="w-4 h-4 text-stone-500" />
              )}
              <span>Alertes Sonores</span>
            </div>
            <span
              className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded-md ${
                soundEnabled
                  ? 'bg-[#221e1a] text-[#dfd0ba] border border-[#3d3730]'
                  : 'bg-[#141210] text-stone-500'
              }`}
            >
              {soundEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Logout button */}
          <button
            onClick={handleLogoutClick}
            className="w-full p-3 rounded-2xl bg-[#19100e] hover:bg-[#291410] border border-[#3a1a16] text-xs font-bold flex items-center justify-between text-[#f7a494] cursor-pointer transition-all"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Se déconnecter</span>
            </div>
            <span className="text-[10px] font-mono text-[#a85b4d]">Quitter</span>
          </button>
        </div>
      </aside>

      {/* ========================================================
          MAIN TAB CONTENT AREA
          ======================================================== */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 overflow-y-auto bg-black min-h-0">
        {activeTab === 'overview' && (
          <DashboardOverview onNavigateTab={(t) => handleTabSelect(t as DashboardTab)} />
        )}
        {activeTab === 'orders' && <OrderKanban />}
        {activeTab === 'kitchen' && <KitchenDisplay />}
        {activeTab === 'tables' && <TableMap />}
        {activeTab === 'menu' && <MenuManager />}
        {activeTab === 'analytics' && <AnalyticsView />}
      </main>

    </div>
  );
};
