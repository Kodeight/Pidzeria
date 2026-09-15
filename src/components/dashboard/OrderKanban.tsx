import React from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';
import { Clock, ChefHat, Sparkles, CheckCheck, UtensilsCrossed, Phone, ArrowRight } from 'lucide-react';

const KANBAN_COLUMNS: { id: OrderStatus; label: string; color: string }[] = [
  { id: 'recue', label: 'Nouvelles', color: 'border-blue-500/40 bg-blue-500/5' },
  { id: 'acceptee', label: 'Acceptées', color: 'border-amber-500/40 bg-amber-500/5' },
  { id: 'en_preparation', label: 'En Préparation', color: 'border-orange-500/40 bg-orange-500/5' },
  { id: 'prete', label: 'Prêtes', color: 'border-emerald-500/40 bg-emerald-500/5' },
  { id: 'servie', label: 'Servies / Terminées', color: 'border-stone-800 bg-stone-900/30' },
];

export const OrderKanban: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();

  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    switch (current) {
      case 'recue': return 'acceptee';
      case 'acceptee': return 'en_preparation';
      case 'en_preparation': return 'prete';
      case 'prete': return 'servie';
      default: return null;
    }
  };

  const getButtonLabel = (current: OrderStatus): string => {
    switch (current) {
      case 'recue': return 'Accepter';
      case 'acceptee': return 'Lancer cuisine';
      case 'en_preparation': return 'Marquer prête';
      case 'prete': return 'Terminer / Servir';
      default: return 'Archiver';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto">
      <div>
        <h1 className="text-2xl font-serif font-bold text-amber-50">Gestion des Commandes — Kanban POS</h1>
        <p className="text-xs text-stone-400 font-mono mt-1">
          Suivez la progression en temps réel de la commande client jusqu'au service à table ou livraison.
        </p>
      </div>

      {/* Kanban Grid Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map(col => {
          const colOrders = orders.filter(o => o.status === col.id);

          return (
            <div key={col.id} className={`p-4 rounded-3xl border ${col.color} flex flex-col h-[700px] min-w-[280px]`}>
              
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-800">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-200">
                  {col.label}
                </span>
                <span className="w-6 h-6 rounded-full bg-stone-900 text-amber-400 font-mono font-extrabold text-xs flex items-center justify-center border border-stone-800">
                  {colOrders.length}
                </span>
              </div>

              {/* Order Cards List */}
              <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {colOrders.map(order => {
                  const nextStatus = getNextStatus(order.status);

                  return (
                    <div
                      key={order.id}
                      className="p-4 rounded-2xl bg-stone-950/90 border border-stone-800 space-y-3 shadow-lg hover:border-amber-500/30 transition-all"
                    >
                      {/* Top Info */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-amber-400">
                          {order.orderNumber}
                        </span>
                        {order.tableNumber && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] font-bold">
                            Table {order.tableNumber}
                          </span>
                        )}
                      </div>

                      {/* Customer Info */}
                      <div>
                        <h4 className="text-xs font-bold text-stone-200">{order.customerName}</h4>
                        {order.customerPhone && (
                          <p className="text-[10px] text-stone-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-amber-500" />
                            <span>{order.customerPhone}</span>
                          </p>
                        )}
                      </div>

                      {/* Items */}
                      <div className="space-y-1 pt-2 border-t border-stone-800/80">
                        {order.items.map(item => (
                          <div key={item.id} className="text-[11px] text-stone-300 flex justify-between">
                            <span>{item.quantity}x {item.menuItem.name}</span>
                            <span className="text-stone-500 font-mono">{item.itemTotal} DA</span>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <p className="text-[10px] italic text-amber-300/80 bg-amber-500/5 p-2 rounded-lg border border-amber-500/10">
                          Note: "{order.notes}"
                        </p>
                      )}

                      {/* Total & Action */}
                      <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                        <span className="text-xs font-serif font-extrabold text-amber-400">
                          {order.total.toLocaleString('fr-DZ')} DA
                        </span>

                        {nextStatus && (
                          <button
                            onClick={() => updateOrderStatus(order.id, nextStatus)}
                            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-md"
                          >
                            <span>{getButtonLabel(order.status)}</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}

                {colOrders.length === 0 && (
                  <div className="text-center py-12 text-stone-600 text-xs font-mono">
                    Aucune commande
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};
