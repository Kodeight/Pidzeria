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
        <h1 className="text-2xl font-serif font-bold text-amber-50">Analytique Ventes & Performances</h1>
        <p className="text-xs text-stone-400 font-mono mt-1">
          Rapports détaillés des pizzas les plus vendues et répartition du chiffre d'affaires.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-2">
          <span className="text-xs font-mono text-stone-400">Total Ventes Cumulées</span>
          <p className="text-3xl font-serif font-extrabold text-amber-400">
            {totalRevenue.toLocaleString('fr-DZ')} DA
          </p>
          <span className="text-[11px] text-emerald-400 font-bold">+18.5% vs mois dernier</span>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-2">
          <span className="text-xs font-mono text-stone-400">Nombre de Commandes</span>
          <p className="text-3xl font-serif font-extrabold text-amber-50">
            {orders.length}
          </p>
          <span className="text-[11px] text-stone-500">Moyenne 42 cmd/jour</span>
        </div>

        <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-2">
          <span className="text-xs font-mono text-stone-400">Panier Moyen</span>
          <p className="text-3xl font-serif font-extrabold text-amber-50">
            {orders.length > 0 ? Math.round(totalRevenue / orders.length).toLocaleString('fr-DZ') : 0} DA
          </p>
          <span className="text-[11px] text-stone-500">Par commande à Alger</span>
        </div>
      </div>

      {/* Category Breakdown Progress */}
      <div className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 space-y-6">
        <h3 className="text-lg font-serif font-bold text-amber-50">
          Ventes par Catégorie de Pizza
        </h3>

        <div className="space-y-4">
          {[
            { label: 'Pizzas Algériennes (Merguez, Poulet, Tadjine)', key: 'algeriennes', color: 'from-amber-500 to-amber-600' },
            { label: 'Pizzas Carrées Traditionnelles', key: 'carrees', color: 'from-red-500 to-red-600' },
            { label: 'Pizzas Italiennes Napolitaines', key: 'italiennes', color: 'from-emerald-500 to-emerald-600' },
            { label: 'Pizzas Américaines', key: 'americaines', color: 'from-indigo-500 to-indigo-600' },
            { label: 'Accompagnements, Boissons & Desserts', key: 'accompagnements', color: 'from-stone-600 to-stone-500' },
          ].map(cat => {
            const amount = categorySales[cat.key] || 0;
            const pct = totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 15;

            return (
              <div key={cat.key} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-stone-300">{cat.label}</span>
                  <span className="font-mono text-amber-400 font-bold">{amount.toLocaleString('fr-DZ')} DA ({pct}%)</span>
                </div>
                <div className="w-full bg-stone-950 h-2 rounded-full overflow-hidden p-0.5 border border-stone-800">
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
