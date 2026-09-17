import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BarChart3, TrendingUp, CheckCircle, ShoppingBag, DollarSign, Clock } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { orders } = useStore();

  const validOrders = orders.filter((o) => o.status !== 'annulee');
  const deliveredOrders = orders.filter((o) => o.status === 'servie');
  const activeOrders = orders.filter(
    (o) => o.status !== 'servie' && o.status !== 'annulee'
  );

  const deliveredRevenue = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
  const activeRevenue = activeOrders.reduce((sum, o) => sum + o.total, 0);
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.total, 0);

  // If there are delivered orders, calculate category sales from delivered orders.
  // If no order is delivered yet, fallback to all valid active orders.
  const sourceOrders = deliveredOrders.length > 0 ? deliveredOrders : validOrders;
  const sourceRevenue = deliveredOrders.length > 0 ? deliveredRevenue : totalRevenue;

  const categorySales: Record<string, number> = {
    italiennes: 0,
    algeriennes: 0,
    americaines: 0,
    accompagnements: 0,
    boissons: 0,
    desserts: 0,
  };

  sourceOrders.forEach((order) => {
    order.items.forEach((item) => {
      let cat = item.menuItem.category;
      if (cat === 'carrees') cat = 'algeriennes';
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
          Bilan financier en temps réel calculé sur les commandes enregistrées et livrées.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl relative overflow-hidden">
          <div className="flex items-center justify-between text-xs font-mono text-[#8c7e6c]">
            <span>Chiffre d'Affaires Encaissé</span>
            <DollarSign className="w-4 h-4 text-[#dfd0ba]" />
          </div>
          <p className="text-3xl font-serif font-extrabold text-[#dfd0ba]">
            {deliveredRevenue.toLocaleString('fr-DZ')} DA
          </p>
          <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
            <span className="text-[#a8e092] font-bold flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              <span>{deliveredOrders.length} livrées</span>
            </span>
            <span className="text-[#8c7e6c]">
              Total global: {totalRevenue.toLocaleString('fr-DZ')} DA
            </span>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-[#8c7e6c]">
            <span>Commandes En Cours</span>
            <Clock className="w-4 h-4 text-[#dfd0ba]" />
          </div>
          <p className="text-3xl font-serif font-extrabold text-[#f7f2e7]">
            {activeOrders.length} <span className="text-xs font-normal text-[#8c7e6c]">commandes</span>
          </p>
          <span className="text-[11px] text-[#dfd0ba] font-mono">
            Encaissement potentiel: +{activeRevenue.toLocaleString('fr-DZ')} DA
          </span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl">
          <div className="flex items-center justify-between text-xs font-mono text-[#8c7e6c]">
            <span>Panier Moyen</span>
            <TrendingUp className="w-4 h-4 text-[#dfd0ba]" />
          </div>
          <p className="text-3xl font-serif font-extrabold text-[#f7f2e7]">
            {validOrders.length > 0
              ? Math.round(totalRevenue / validOrders.length).toLocaleString('fr-DZ')
              : 0}{' '}
            DA
          </p>
          <span className="text-[11px] text-[#8c7e6c] font-mono">
            Moyenne générale par commande
          </span>
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-[#f7f2e7]">
            Répartition des Ventes par Catégorie
          </h3>
          <span className="text-xs font-mono text-[#8c7e6c]">
            {sourceOrders.length} commande(s) analysée(s)
          </span>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Pizzas Algériennes (Merguez, Poulet, Tadjine, Recettes d’Alger)', key: 'algeriennes', color: 'from-[#dfd0ba] to-[#c5b095]' },
            { label: 'Pizzas Italiennes Napolitaines', key: 'italiennes', color: 'from-[#8c7e6c] to-[#6b5f50]' },
            { label: 'Pizzas Américaines', key: 'americaines', color: 'from-[#5e5347] to-[#483e34]' },
            { label: 'Accompagnements, Boissons & Desserts', key: 'accompagnements', color: 'from-[#3a3229] to-[#2c261f]' },
          ].map((cat) => {
            const amount = categorySales[cat.key] || 0;
            const pct = sourceRevenue > 0 ? Math.round((amount / sourceRevenue) * 100) : 0;

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
