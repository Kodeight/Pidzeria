import React from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';
import { Clock, ChefHat, CheckCheck, UtensilsCrossed, Phone, ArrowRight } from 'lucide-react';

const KANBAN_COLUMNS: { id: OrderStatus; label: string; color: string }[] = [
  { id: 'recue', label: 'Nouvelles', color: 'border-blue-500/40 bg-blue-500/5' },
  { id: 'acceptee', label: 'Acceptées', color: 'border-[#547734]/40 bg-[#547734]/5' },
  { id: 'en_preparation', label: 'En Préparation', color: 'border-[#7db352]/40 bg-[#7db352]/5' },
  { id: 'prete', label: 'Prêtes', color: 'border-emerald-500/40 bg-emerald-500/5' },
  { id: 'servie', label: 'Servies / Terminées', color: 'border-[#243326] bg-[#121813]/30' },
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
        <h1 className="text-2xl font-serif font-bold text-[#fbf7ee]">Gestion des Commandes — Kanban POS</h1>
        <p className="text-xs text-[#8a988c] font-mono mt-1">
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
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#243326]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#d4e4c2]">
                  {col.label}
                </span>
                <span className="w-6 h-6 rounded-full bg-[#121813] text-[#9bc774] font-mono font-extrabold text-xs flex items-center justify-center border border-[#243326]">
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
                      className="p-4 rounded-2xl bg-[#0c120e] border border-[#243326] space-y-3 shadow-lg hover:border-[#547734]/40 transition-all"
                    >
                      {/* Top Info */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#9bc774]">
                          {order.orderNumber}
                        </span>
                        {order.tableNumber && (
                          <span className="px-2 py-0.5 rounded-full bg-[#547734]/15 border border-[#547734]/30 text-[#9bc774] text-[10px] font-bold">
                            Table {order.tableNumber}
                          </span>
                        )}
                      </div>

                      {/* Customer Info */}
                      <div>
                        <h4 className="text-xs font-bold text-[#f2e5ce]">{order.customerName}</h4>
                        {order.customerPhone && (
                          <p className="text-[10px] text-[#8a988c] flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-[#7db352]" />
                            <span>{order.customerPhone}</span>
                          </p>
                        )}
                      </div>

                      {/* Items */}
                      <div className="space-y-1 pt-2 border-t border-[#243326]">
                        {order.items.map(item => (
                          <div key={item.id} className="text-[11px] text-[#c7baa4] flex justify-between">
                            <span>{item.quantity}x {item.menuItem.name}</span>
                            <span className="text-[#8a988c] font-mono">{item.itemTotal} DA</span>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <p className="text-[10px] italic text-[#d4e4c2] bg-[#547734]/10 p-2 rounded-lg border border-[#547734]/20">
                          Note: "{order.notes}"
                        </p>
                      )}

                      {/* Total & Action */}
                      <div className="pt-2 border-t border-[#243326] flex items-center justify-between">
                        <span className="text-xs font-serif font-extrabold text-[#9bc774]">
                          {order.total.toLocaleString('fr-DZ')} DA
                        </span>

                        {nextStatus && (
                          <button
                            onClick={() => updateOrderStatus(order.id, nextStatus)}
                            className="px-3 py-1.5 rounded-xl bg-[#547734] hover:bg-[#628b3d] text-[#fbf7ee] font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-md"
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
                  <div className="text-center py-12 text-[#556357] text-xs font-mono">
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
