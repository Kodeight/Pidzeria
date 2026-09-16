import React from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';
import { Clock, ChefHat, CheckCheck, UtensilsCrossed, Phone, ArrowRight } from 'lucide-react';

const KANBAN_COLUMNS: { id: OrderStatus; label: string; color: string }[] = [
  { id: 'recue', label: 'Nouvelles', color: 'border-[#3a3229] bg-[#12100e]/70' },
  { id: 'acceptee', label: 'Acceptées', color: 'border-[#4a3f33] bg-[#14120f]/70' },
  { id: 'en_preparation', label: 'En Préparation', color: 'border-[#dfd0ba]/30 bg-[#1a1714]/80' },
  { id: 'prete', label: 'Prêtes', color: 'border-[#dfd0ba]/50 bg-[#221e1a]/80' },
  { id: 'servie', label: 'Servies / Terminées', color: 'border-[#26211c] bg-[#0c0a09]/50' },
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
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f2e7]">Gestion des Commandes — Kanban POS</h1>
        <p className="text-xs text-[#8c7e6c] font-mono mt-1">
          Suivez la progression en temps réel de la commande client jusqu'au service à table ou livraison.
        </p>
      </div>

      {/* Kanban Grid Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map(col => {
          const colOrders = orders.filter(o => o.status === col.id);

          return (
            <div key={col.id} className={`p-4 rounded-3xl border ${col.color} flex flex-col h-[700px] min-w-[280px] shadow-2xl`}>
              
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#26211c]">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#dfd0ba]">
                  {col.label}
                </span>
                <span className="w-6 h-6 rounded-full bg-[#080706] text-[#dfd0ba] font-mono font-extrabold text-xs flex items-center justify-center border border-[#26211c]">
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
                      className="p-4 rounded-2xl bg-[#080706] border border-[#221e1a] space-y-3 shadow-lg hover:border-[#dfd0ba]/40 transition-all"
                    >
                      {/* Top Info */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-black text-[#dfd0ba]">
                          {order.orderNumber}
                        </span>
                        {order.tableNumber && (
                          <span className="px-2 py-0.5 rounded-full bg-[#161311] border border-[#2e2823] text-[#dfd0ba] text-[10px] font-bold font-mono">
                            Table {order.tableNumber}
                          </span>
                        )}
                      </div>

                      {/* Customer Info */}
                      <div>
                        <h4 className="text-xs font-bold text-[#f7f2e7]">{order.customerName}</h4>
                        {order.customerPhone && (
                          <p className="text-[10px] text-[#8c7e6c] flex items-center gap-1 mt-0.5 font-mono">
                            <Phone className="w-3 h-3 text-[#dfd0ba]" />
                            <span>{order.customerPhone}</span>
                          </p>
                        )}
                      </div>

                      {/* Items */}
                      <div className="space-y-1 pt-2 border-t border-[#221e1a]">
                        {order.items.map(item => (
                          <div key={item.id} className="text-[11px] text-[#cbb89d] flex justify-between">
                            <span>{item.quantity}x {item.menuItem.name}</span>
                            <span className="text-[#8c7e6c] font-mono">{item.itemTotal} DA</span>
                          </div>
                        ))}
                      </div>

                      {order.notes && (
                        <p className="text-[10px] italic text-[#dfd0ba] bg-[#161311] p-2 rounded-lg border border-[#2a241f]">
                          Note: "{order.notes}"
                        </p>
                      )}

                      {/* Total & Action */}
                      <div className="pt-2 border-t border-[#221e1a] flex items-center justify-between">
                        <span className="text-xs font-serif font-extrabold text-[#dfd0ba]">
                          {order.total.toLocaleString('fr-DZ')} DA
                        </span>

                        {nextStatus && (
                          <button
                            onClick={() => updateOrderStatus(order.id, nextStatus)}
                            className="px-3.5 py-1.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-md active:scale-95"
                          >
                            <span>{getButtonLabel(order.status)}</span>
                            <ArrowRight className="w-3 h-3 text-[#0a0a0a]" />
                          </button>
                        )}
                      </div>

                    </div>
                  );
                })}

                {colOrders.length === 0 && (
                  <div className="text-center py-12 text-[#5a5045] text-xs font-mono">
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

