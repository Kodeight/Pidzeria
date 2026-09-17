import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BarChart3, TrendingUp, CheckCircle, ShoppingBag, DollarSign } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { orders } = useStore();

  // ONLY count orders that have been delivered / served ('servie')
  const deliveredOrders = orders.filter((o) => o.status === 'servie');
  const totalRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);

  // Category breakdown calculation strictly from delivered orders
  const categorySales: Record<string, number> = {
    italiennes: 0,
    algeriennes: 0,
    carrees: 0,
    americaines: 0,
    accompagnements: 0,
    boissons: 0,
    desserts: 0,
  };

  deliveredOrders.forEach((order) => {
    order.items.forEach((item) => {
      const cat = item.menuItem.category;
      if (categorySales[cat] !== undefined) {
        categorySales[cat] += item.itemTotal;
      }
    });
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      <div>
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-[#dfd0ba]" />
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f2e7]">
            Analytique Ventes & Performances
          </h1>
        </div>
        <p className="text-xs text-[#8c7e6c] font-mono mt-1">
          Rapports financiers et statistiques comptabilisés <span className="text-[#dfd0ba] font-bold">uniquement sur les commandes livrées / servies</span>.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-[#8c7e6c]">
            <span>Chiffre d'Affaires Encaisssé</span>
            <DollarSign className="w-4 h-4 text-[#dfd0ba]" />
          </div>
          <p className="text-3xl font-serif font-extrabold text-[#dfd0ba]">
            {totalRevenue.toLocaleString('fr-DZ')} DA
          </p>
          <span className="text-[11px] text-[#a8e092] font-bold font-mono flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span>Commandes livrées uniquement</span>
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-[#8c7e6c]">
            <span>Commandes Livrées / Servies</span>
            <ShoppingBag className="w-4 h-4 text-[#dfd0ba]" />
          </div>
          <p className="text-3xl font-serif font-extrabold text-[#f7f2e7]">
            {deliveredOrders.length} <span className="text-xs font-normal text-[#8c7e6c]">/ {orders.length} au total</span>
          </p>
          <span className="text-[11px] text-[#8c7e6c] font-mono">
            {orders.length - deliveredOrders.length} commande(s) en cours de préparation/livraison
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-[#8c7e6c]">
            <span>Panier Moyen Livré</span>
            <TrendingUp className="w-4 h-4 text-[#dfd0ba]" />
          </div>
          <p className="text-3xl font-serif font-extrabold text-[#f7f2e7]">
            {deliveredOrders.length > 0
              ? Math.round(totalRevenue / deliveredOrders.length).toLocaleString('fr-DZ')
              : 0}{' '}
            DA
          </p>
          <span className="text-[11px] text-[#8c7e6c] font-mono">
            Moyenne des ventes clôturées
          </span>
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-[#f7f2e7]">
            Ventes Réelles par Catégorie (Commandes Livrées)
          </h3>
          <span className="text-xs font-mono text-[#8c7e6c]">
            {deliveredOrders.length} commande(s) comptabilisée(s)
          </span>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Pizzas Algériennes (Merguez, Poulet, Tadjine)', key: 'algeriennes', color: 'from-[#dfd0ba] to-[#c5b095]' },
            { label: 'Pizzas Carrées Traditionnelles', key: 'carrees', color: 'from-[#b89c7d] to-[#9c7d5c]' },
            { label: 'Pizzas Italiennes Napolitaines', key: 'italiennes', color: 'from-[#8c7e6c] to-[#6b5f50]' },
            { label: 'Pizzas Américaines', key: 'americaines', color: 'from-[#5e5347] to-[#483e34]' },
            { label: 'Accompagnements, Boissons & Desserts', key: 'accompagnements', color: 'from-[#3a3229] to-[#2c261f]' },
          ].map((cat) => {
            const amount = categorySales[cat.key] || 0;
            const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0;

            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#cbb89d]">{cat.label}</span>
                  <span className="font-mono text-[#dfd0ba] font-bold">
                    {amount.toLocaleString('fr-DZ')} DA ({pct}%)
                  </span>
                </div>
                <div className="w-full bg-[#080706] h-2 rounded-full overflow-hidden p-0.5 border border-[#221e1a]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-700`}
                    style={{ width: `${pct > 0 ? Math.max(6, pct) : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
