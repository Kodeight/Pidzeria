import React from 'react';
import { useStore } from '../../context/StoreContext';
import { ChefHat, Check, Clock, Flame, Utensils } from 'lucide-react';

export const KitchenDisplay: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  const kitchenOrders = orders.filter(
    o => o.status === 'recue' || o.status === 'acceptee' || o.status === 'en_preparation' || o.status === 'prete'
  );

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0e0c0a] p-6 sm:p-8 rounded-3xl border border-[#221e1a] shadow-xl">
        <div>
          <div className="flex items-center gap-3">
            <ChefHat className="w-8 h-8 text-[#dfd0ba]" />
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#f7f2e7]">
              Écran Cuisine — KDS
            </h1>
          </div>
          <p className="text-xs text-[#8c7e6c] font-mono mt-1">
            Affichage optimisé pour l'équipe en cuisine • Envoi direct au four
          </p>
        </div>

        <div className="px-4 py-2 rounded-full bg-[#161311] border border-[#2e2823] text-[#dfd0ba] font-mono font-bold text-xs">
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
              className={`p-6 sm:p-7 rounded-3xl border shadow-2xl flex flex-col justify-between transition-all ${
                isPreparing
                  ? 'bg-[#14100c] border-[#dfd0ba]/40 shadow-black/80'
                  : 'bg-[#0e0c0a] border-[#221e1a]'
              }`}
            >
              <div>
                {/* Order Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#221e1a] mb-4">
                  <span className="text-3xl font-serif font-black text-[#dfd0ba]">
                    {order.orderNumber}
                  </span>
                  {order.tableNumber ? (
                    <span className="px-4 py-1.5 rounded-full bg-[#dfd0ba] text-[#0a0a0a] font-black text-xs font-mono">
                      TABLE {order.tableNumber}
                    </span>
                  ) : (
                    <span className="px-3 py-1 rounded-full bg-[#161311] text-[#cbb89d] text-xs font-mono font-bold uppercase border border-[#2a241f]">
                      {order.type.replace('_', ' ')}
                    </span>
                  )}
                </div>

                {/* Items list with large legible font */}
                <div className="space-y-3 mb-6">
                  {order.items.map(item => (
                    <div key={item.id} className="p-3.5 rounded-2xl bg-[#080706] border border-[#221e1a]">
                      <div className="flex items-center justify-between text-base font-bold text-[#f7f2e7]">
                        <span>{item.quantity}x {item.menuItem.name}</span>
                      </div>
                      {item.selectedExtras.length > 0 && (
                        <p className="text-xs text-[#dfd0ba] font-mono mt-1">
                          + {item.selectedExtras.map(e => e.name).join(', ')}
                        </p>
                      )}
                      {item.instructions && (
                        <p className="text-xs italic text-[#dfd0ba] bg-[#1a1410] p-2.5 rounded-xl mt-2 border border-[#3d2a1d] font-medium">
                          Note: {item.instructions}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Large Action Touch Buttons */}
              <div className="pt-4 border-t border-[#221e1a] flex flex-col gap-2.5">
                {order.status !== 'en_preparation' && order.status !== 'prete' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'en_preparation')}
                    className="w-full py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                  >
                    <Flame className="w-4 h-4 text-[#0a0a0a]" />
                    <span>Lancer la Cuisson</span>
                  </button>
                )}

                {order.status === 'en_preparation' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'prete')}
                    className="w-full py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[3] text-[#0a0a0a]" />
                    <span>Marquer Comme Prête</span>
                  </button>
                )}

                {order.status !== 'servie' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'servie')}
                    className="w-full py-2.5 rounded-full bg-[#182414] hover:bg-[#20331a] text-[#a8e092] border border-[#2d4a24] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-[#a8e092]" />
                    <span>Marquer Servie / Livrée</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}

        {kitchenOrders.length === 0 && (
          <div className="col-span-full text-center py-24 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-3">
            <Utensils className="w-12 h-12 text-[#5a5045] mx-auto" />
            <h3 className="text-lg font-bold text-[#f7f2e7]">Toutes les commandes sont à jour</h3>
            <p className="text-[#8c7e6c] text-xs font-mono">Les nouvelles commandes apparaîtront automatiquement ici.</p>
          </div>
        )}
      </div>
    </div>
  );
};

