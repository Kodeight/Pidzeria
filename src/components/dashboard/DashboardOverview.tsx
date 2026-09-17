import React from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';
import { ShoppingBag, DollarSign, Utensils, Clock, TrendingUp, Users, ArrowUpRight, CheckCircle } from 'lucide-react';

interface DashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { orders, tables, updateOrderStatus } = useStore();

  const validOrders = orders.filter((o) => o.status !== 'annulee');
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);
  const deliveredOrders = orders.filter((o) => o.status === 'servie');
  const deliveredRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);

  const totalOrdersCount = orders.length;
  const activeTablesCount = tables.filter((t) => t.status !== 'libre').length;
  const preparingOrdersCount = orders.filter(
    (o) => o.status === 'en_preparation' || o.status === 'recue' || o.status === 'acceptee'
  ).length;

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f2e7]">
            Aperçu Général — PIDZERIA
          </h1>
          <p className="text-xs sm:text-sm text-[#8c7e6c] font-mono mt-1">
            Activité en direct • Restaurant Alger Centre
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('kitchen')}
            className="px-5 py-2.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-black/80 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Clock className="w-4 h-4 text-[#0a0a0a]" />
            <span>Ouvrir Écran Cuisine</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8c7e6c]">Commandes du jour</span>
            <div className="p-2.5 rounded-xl bg-[#161311] border border-[#2a241f] text-[#dfd0ba]">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-extrabold text-[#f7f2e7]">{totalOrdersCount}</span>
            <span className="text-xs text-[#dfd0ba] font-mono font-bold flex items-center gap-0.5">
              +14% <TrendingUp className="w-3 h-3" />
            </span>
          </div>
          <p className="text-[11px] text-[#8c7e6c]">Service en cours à Alger</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8c7e6c]">Chiffre d'Affaires</span>
            <div className="p-2.5 rounded-xl bg-[#161311] border border-[#2a241f] text-[#dfd0ba]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-extrabold text-[#dfd0ba]">
              {totalRevenue.toLocaleString('fr-DZ')} DA
            </span>
          </div>
          <p className="text-[11px] text-[#a8e092] font-mono flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>Encaissé (livré): {deliveredRevenue.toLocaleString('fr-DZ')} DA</span>
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8c7e6c]">Tables Actives</span>
            <div className="p-2.5 rounded-xl bg-[#161311] border border-[#2a241f] text-[#dfd0ba]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-extrabold text-[#f7f2e7]">{activeTablesCount} / {tables.length}</span>
          </div>
          <p className="text-[11px] text-[#8c7e6c]">Taux d'occupation en salle</p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-3 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8c7e6c]">En Préparation</span>
            <div className="p-2.5 rounded-xl bg-[#161311] border border-[#2a241f] text-[#dfd0ba]">
              <Utensils className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-serif font-extrabold text-[#dfd0ba]">{preparingOrdersCount}</span>
          </div>
          <p className="text-[11px] text-[#8c7e6c]">Commandes au four à bois</p>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-5 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-[#f7f2e7]">Dernières Commandes</h3>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs text-[#dfd0ba] hover:underline flex items-center gap-1 cursor-pointer font-mono"
          >
            <span>Voir le kanban complet</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-3">
          {orders.slice(0, 6).map((order) => (
            <div
              key={order.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#080706] border border-[#221e1a] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#383129] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#161311] border border-[#2a241f] text-[#dfd0ba] font-extrabold text-xs flex items-center justify-center font-mono shrink-0">
                  {order.orderNumber}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#f7f2e7]">
                    {order.customerName} {order.tableNumber ? `(Table ${order.tableNumber})` : ''}
                  </h4>
                  <p className="text-xs text-[#8c7e6c] mt-0.5">
                    {order.items.map((i) => `${i.quantity}x ${i.menuItem.name}`).join(', ')}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 border-t sm:border-t-0 pt-3 sm:pt-0 border-[#221e1a]">
                <span className="text-sm font-serif font-extrabold text-[#dfd0ba]">
                  {order.total.toLocaleString('fr-DZ')} DA
                </span>

                {/* Direct Status Selector */}
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold uppercase font-mono tracking-wider cursor-pointer focus:outline-none transition-all ${
                    order.status === 'servie'
                      ? 'bg-[#182414] text-[#a8e092] border border-[#2d4a24]'
                      : order.status === 'prete'
                      ? 'bg-[#1e2518] text-[#9bc774] border border-[#2f3d26]'
                      : order.status === 'en_preparation'
                      ? 'bg-[#221a12] text-[#dfd0ba] border border-[#3d2f20]'
                      : 'bg-[#141210] text-[#8c7e6c] border border-[#221e1a]'
                  }`}
                >
                  <option value="recue" className="bg-black text-[#f7f2e7]">Nouvelle</option>
                  <option value="acceptee" className="bg-black text-[#f7f2e7]">Acceptée</option>
                  <option value="en_preparation" className="bg-black text-[#f7f2e7]">En Préparation</option>
                  <option value="prete" className="bg-black text-[#f7f2e7]">Prête</option>
                  <option value="servie" className="bg-black text-[#a8e092]">Servie / Livrée</option>
                  <option value="annulee" className="bg-black text-red-400">Annulée</option>
                </select>

                {order.status !== 'servie' && order.status !== 'annulee' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'servie')}
                    className="px-3 py-1 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-black font-extrabold text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer shadow-md active:scale-95 flex items-center gap-1"
                  >
                    <CheckCircle className="w-3 h-3 text-black" />
                    <span>Livrée</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
