import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ChefHat, Check, Clock, Flame, Utensils } from 'lucide-react';

export const KitchenDisplay: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  const kitchenOrders = orders.filter(
    o => o.status === 'recue' || o.status === 'acceptee' || o.status === 'en_preparation'
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between bg-stone-900/90 p-6 rounded-3xl border border-stone-800">
        <div>
          <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-amber-400" />
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-amber-50">
              Écran Cuisine — KDS
            </h1>
          </div>
          <p className="text-xs text-stone-400 font-mono mt-1">
            Affichage optimisé pour l'équipe en cuisine • Envoi direct au four
          </p>
        </div>

        <div className="px-4 py-2 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono font-bold text-sm">
          {kitchenOrders.length} commande{kitchenOrders.length > 1 ? 's' : ''} en attente
        </div>
      </div>

      {/* Large KDS Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kitchenOrders.map(order => {
          const isPreparing = order.status === 'en_preparation';

          return (
            <div
              key={order.id}
              className={`p-6 rounded-3xl border shadow-2xl flex flex-col justify-between transition-all ${
                isPreparing
                  ? 'bg-amber-950/40 border-amber-500/50 shadow-amber-500/10'
                  : 'bg-stone-900/80 border-stone-800'
              }`}
            >
              <div>
                {/* Order Header */}
                <div className="flex items-center justify-between pb-4 border-b border-stone-800 mb-4">
                  <span className="text-3xl font-serif font-black text-amber-400">
                    {order.orderNumber}
                  </span>
                  {order.tableNumber ? (
                    <span className="px-4 py-1.5 rounded-full bg-amber-500 text-stone-950 font-black text-sm">
                      TABLE {order.tableNumber}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-stone-800 text-stone-300 text-xs font-bold uppercase">
                      {order.type.replace('_', ' ')}
                    </span>
                  )}
                </div>

                {/* Items list with large legible font */}
                <div className="space-y-3 mb-6">
                  {order.items.map(item => (
                    <div key={item.id} className="p-3 rounded-2xl bg-stone-950/80 border border-stone-800/80">
                      <div className="flex items-center justify-between text-base font-bold text-amber-50">
                        <span>{item.quantity}x {item.menuItem.name}</span>
                      </div>
                      {item.selectedExtras.length > 0 && (
                        <p className="text-xs text-amber-400 font-semibold mt-1">
                          + {item.selectedExtras.map(e => e.name).join(', ')}
                        </p>
                      )}
                      {item.instructions && (
                        <p className="text-xs italic text-red-400 bg-red-500/10 p-2 rounded-lg mt-2 border border-red-500/20 font-semibold">
                          ⚠️ Note: {item.instructions}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Action Touch Buttons */}
              <div className="pt-4 border-t border-stone-800 flex items-center gap-3">
                {!isPreparing ? (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'en_preparation')}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] cursor-pointer"
                  >
                    <Flame className="w-5 h-5" />
                    <span>Commencer la Préparation</span>
                  </button>
                ) : (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'prete')}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-stone-950 font-black text-base uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.02] cursor-pointer"
                  >
                    <Check className="w-6 h-6 stroke-[3]" />
                    <span>Marquer Comme PRÊTE</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}

        {kitchenOrders.length === 0 && (
          <div className="col-span-full text-center py-24 glass-panel rounded-3xl border border-stone-800 space-y-3">
            <Utensils className="w-12 h-12 text-stone-600 mx-auto" />
            <h3 className="text-lg font-bold text-stone-300">Toutes les commandes sont à jour</h3>
            <p className="text-stone-500 text-xs">Les nouvelles commandes apparaîtront automatiquement ici.</p>
          </div>
        )}
      </div>
    </div>
  );
};
