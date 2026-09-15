import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, DollarSign, Utensils, Clock, TrendingUp, Users, ArrowUpRight } from 'lucide-react';

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { orders, tables } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrdersCount = orders.length;
  const activeTablesCount = tables.filter(t => t.status !== 'libre').length;
  const preparingOrdersCount = orders.filter(o => o.status === 'en_preparation' || o.status === 'recue' || o.status === 'acceptee').length;

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-50">
            Aperçu Général — PIDZERIA
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-mono mt-1">
            Activité en direct • Restaurant Alger Centre
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('kitchen')}
            className="px-4 py-2.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-stone-950 border border-amber-500/30 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
          >
            <Clock className="w-4 h-4" />
            <span>Ouvrir Ecran Cuisine</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">Commandes du jour</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-extrabold text-amber-50">{totalOrdersCount}</span>
            <span className="text-xs text-emerald-400 font-bold flex items-center">
              +14% <TrendingUp className="w-3 h-3 ml-0.5" />
            </span>
          </div>
          <p className="text-[11px] text-stone-500">Service en cours à Alger</p>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">Chiffre d'Affaires</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-extrabold text-amber-400">
              {totalRevenue.toLocaleString('fr-DZ')} DA
            </span>
          </div>
          <p className="text-[11px] text-stone-500">Chiffre calculé en DZD</p>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">Tables Actives</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-extrabold text-amber-50">{activeTablesCount} / {tables.length}</span>
          </div>
          <p className="text-[11px] text-stone-500">Taux d'occupation en salle</p>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400">En Préparation</span>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
              <Utensils className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-extrabold text-red-400">{preparingOrdersCount}</span>
          </div>
          <p className="text-[11px] text-stone-500">Commandes en cuisine</p>
        </div>

      </div>

      {/* Recent Orders Overview */}
      <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-amber-50">Dernières Commandes</h3>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Voir toutes le kanban</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {orders.slice(0, 5).map(order => (
            <div
              key={order.id}
              className="p-4 rounded-2xl bg-stone-950/60 border border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-extrabold text-xs flex items-center justify-center font-mono">
                  {order.orderNumber}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-stone-200">
                    {order.customerName} {order.tableNumber ? `(Table ${order.tableNumber})` : ''}
                  </h4>
                  <p className="text-xs text-stone-400">
                    {order.items.map(i => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-stone-800">
                <span className="text-sm font-serif font-extrabold text-amber-400">
                  {order.total.toLocaleString('fr-DZ')} DA
                </span>
                <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  order.status === 'prete'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : order.status === 'en_preparation'
                    ? 'bg-amber-500/20 text-amber-300 animate-pulse'
                    : 'bg-stone-800 text-stone-400'
                }`}>
                  {order.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
