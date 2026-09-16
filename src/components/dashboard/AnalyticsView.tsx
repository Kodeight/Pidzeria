import React from 'react';
import { useStore } from '../../context/StoreContext';
import { BarChart3, TrendingUp, PieChart, Star, Flame } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const { orders, menuItems } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  // Category breakdown calculation
  const categorySales: Record<string, number> = {
    italiennes: 0,
    algeriennes: 0,
    carrees: 0,
    americaines: 0,
    accompagnements: 0,
    boissons: 0,
    desserts: 0,
  };

  orders.forEach(order => {
    order.items.forEach(item => {
      const cat = item.menuItem.category;
      if (categorySales[cat] !== undefined) {
        categorySales[cat] += item.itemTotal;
      }
    });
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f2e7]">Analytique Ventes & Performances</h1>
        <p className="text-xs text-[#8c7e6c] font-mono mt-1">
          Rapports détaillés des pizzas les plus vendues et répartition du chiffre d'affaires.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl">
          <span className="text-xs font-mono text-[#8c7e6c]">Total Ventes Cumulées</span>
          <p className="text-3xl font-serif font-extrabold text-[#dfd0ba]">
            {totalRevenue.toLocaleString('fr-DZ')} DA
          </p>
          <span className="text-[11px] text-[#9bc774] font-bold font-mono">+18.5% vs mois dernier</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl">
          <span className="text-xs font-mono text-[#8c7e6c]">Nombre de Commandes</span>
          <p className="text-3xl font-serif font-extrabold text-[#f7f2e7]">
            {orders.length}
          </p>
          <span className="text-[11px] text-[#8c7e6c] font-mono">Moyenne 42 cmd/jour</span>
        </div>

        <div className="p-6 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-2 shadow-xl">
          <span className="text-xs font-mono text-[#8c7e6c]">Panier Moyen</span>
          <p className="text-3xl font-serif font-extrabold text-[#f7f2e7]">
            {orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString('fr-DZ') : 0} DA
          </p>
          <span className="text-[11px] text-[#8c7e6c] font-mono">Par commande à Alger</span>
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-6 shadow-xl">
        <h3 className="text-lg font-serif font-bold text-[#f7f2e7]">
          Ventes par Catégorie de Pizza
        </h3>

        <div className="space-y-4">
          {[
            { label: 'Pizzas Algériennes (Merguez, Poulet, Tadjine)', key: 'algeriennes', color: 'from-[#dfd0ba] to-[#c5b095]' },
            { label: 'Pizzas Carrées Traditionnelles', key: 'carrees', color: 'from-[#b89c7d] to-[#9c7d5c]' },
            { label: 'Pizzas Italiennes Napolitaines', key: 'italiennes', color: 'from-[#8c7e6c] to-[#6b5f50]' },
            { label: 'Pizzas Américaines', key: 'americaines', color: 'from-[#5e5347] to-[#483e34]' },
            { label: 'Accompagnements, Boissons & Desserts', key: 'accompagnements', color: 'from-[#3a3229] to-[#2c261f]' },
          ].map(cat => {
            const amount = categorySales[cat.key] || 0;
            const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 15;

            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-[#cbb89d]">{cat.label}</span>
                  <span className="font-mono text-[#dfd0ba] font-bold">{amount.toLocaleString('fr-DZ')} DA ({pct}%)</span>
                </div>
                <div className="w-full bg-[#080706] h-2 rounded-full overflow-hidden p-0.5 border border-[#221e1a]">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-700`}
                    style={{ width: `${Math.max(8, pct)}%` }}
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

