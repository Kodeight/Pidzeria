import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';
import {
  ShoppingBag,
  ChefHat,
  Check,
  Flame,
  Clock,
  Phone,
  MapPin,
  Utensils,
  ArrowRight,
  LayoutGrid,
  Columns,
  XCircle,
} from 'lucide-react';

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; badgeBg: string; textColor: string; borderColor: string }
> = {
  recue: {
    label: 'Nouvelle',
    badgeBg: 'bg-[#2a1d12]',
    textColor: 'text-[#f7a494]',
    borderColor: 'border-[#632a20]',
  },
  acceptee: {
    label: 'Acceptée',
    badgeBg: 'bg-[#1e1a14]',
    textColor: 'text-[#dfd0ba]',
    borderColor: 'border-[#4a3f33]',
  },
  en_preparation: {
    label: 'En Préparation',
    badgeBg: 'bg-[#241c12]',
    textColor: 'text-[#dfd0ba]',
    borderColor: 'border-[#dfd0ba]/40',
  },
  prete: {
    label: 'Prête',
    badgeBg: 'bg-[#182414]',
    textColor: 'text-[#a8e092]',
    borderColor: 'border-[#2d4a24]',
  },
  servie: {
    label: 'Livrée / Servie',
    badgeBg: 'bg-[#141210]',
    textColor: 'text-[#8c7e6c]',
    borderColor: 'border-[#26211c]',
  },
  annulee: {
    label: 'Annulée',
    badgeBg: 'bg-[#1f1010]',
    textColor: 'text-[#f87171]',
    borderColor: 'border-[#5c1d1d]',
  },
};

type FilterCategory = 'toutes' | OrderStatus;

export const OrderKanban: React.FC = () => {
  const { orders, updateOrderStatus } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<FilterCategory>('toutes');
  const [viewMode, setViewMode] = useState<'kds' | 'kanban'>('kds');

  const getNextStatus = (current: OrderStatus): OrderStatus | null => {
    switch (current) {
      case 'recue':
        return 'acceptee';
      case 'acceptee':
        return 'en_preparation';
      case 'en_preparation':
        return 'prete';
      case 'prete':
        return 'servie';
      default:
        return null;
    }
  };

  const getActionButtonInfo = (
    current: OrderStatus
  ): { label: string; icon: React.ReactNode } | null => {
    switch (current) {
      case 'recue':
        return { label: 'Accepter la commande', icon: <Check className="w-4 h-4 stroke-[3]" /> };
      case 'acceptee':
        return { label: 'Lancer la cuisson', icon: <Flame className="w-4 h-4" /> };
      case 'en_preparation':
        return { label: 'Marquer comme prête', icon: <Check className="w-4 h-4 stroke-[3]" /> };
      case 'prete':
        return { label: 'Marquer Servie / Livrée', icon: <Check className="w-4 h-4 stroke-[3]" /> };
      default:
        return null;
    }
  };

  const filteredOrders =
    selectedStatus === 'toutes'
      ? orders
      : orders.filter((o) => o.status === selectedStatus);

  const newCount = orders.filter((o) => o.status === 'recue').length;

  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e0c0a] p-6 sm:p-8 rounded-3xl border border-[#221e1a] shadow-xl">
        <div>
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-[#dfd0ba]" />
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-[#f7f2e7]">
              Gestion des Commandes — POS
            </h1>
          </div>
          <p className="text-xs text-[#8c7e6c] font-mono mt-1">
            Visualisation claire et structurée style KDS pour le service et l'encaissement.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-3">
          {newCount > 0 && (
            <div className="px-3.5 py-1.5 rounded-full bg-[#2a1d12] border border-[#632a20] text-[#f7a494] text-xs font-mono font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f7a494] animate-pulse" />
              <span>{newCount} nouvelle{newCount > 1 ? 's' : ''}</span>
            </div>
          )}

          <div className="inline-flex items-center p-1 rounded-2xl bg-[#141210] border border-[#2a241f]">
            <button
              onClick={() => setViewMode('kds')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'kds'
                  ? 'bg-[#dfd0ba] text-black font-bold shadow-md'
                  : 'text-[#8c7e6c] hover:text-[#dfd0ba]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grille KDS</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'kanban'
                  ? 'bg-[#dfd0ba] text-black font-bold shadow-md'
                  : 'text-[#8c7e6c] hover:text-[#dfd0ba]'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Colonnes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        <button
          onClick={() => setSelectedStatus('toutes')}
          className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all border cursor-pointer ${
            selectedStatus === 'toutes'
              ? 'bg-[#dfd0ba] text-black border-[#dfd0ba] shadow-lg font-extrabold'
              : 'bg-[#100e0c] text-[#cbb89d] border-[#26211c] hover:bg-[#181512]'
          }`}
        >
          Toutes ({orders.length})
        </button>

        {(['recue', 'acceptee', 'en_preparation', 'prete', 'servie'] as OrderStatus[]).map((st) => {
          const cfg = STATUS_CONFIG[st];
          const count = orders.filter((o) => o.status === st).length;
          const isSelected = selectedStatus === st;

          return (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider whitespace-nowrap transition-all border cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#dfd0ba] text-black border-[#dfd0ba] shadow-lg font-extrabold'
                  : `${cfg.badgeBg} ${cfg.textColor} ${cfg.borderColor} hover:brightness-125`
              }`}
            >
              <span>{cfg.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${isSelected ? 'bg-black text-[#dfd0ba]' : 'bg-black/40 text-current'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* View Mode 1: KDS Grid (Spacious & Clean Desktop Layout) */}
      {viewMode === 'kds' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => {
            const nextStatus = getNextStatus(order.status);
            const actionInfo = nextStatus ? getActionButtonInfo(order.status) : null;
            const cfg = STATUS_CONFIG[order.status];

            return (
              <div
                key={order.id}
                className="p-6 sm:p-7 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] hover:border-[#dfd0ba]/40 transition-all shadow-2xl flex flex-col justify-between"
              >
                <div>
                  {/* Order Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#221e1a] mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-serif font-black text-[#dfd0ba]">
                        {order.orderNumber}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase border ${cfg.badgeBg} ${cfg.textColor} ${cfg.borderColor}`}>
                        {cfg.label}
                      </span>
                    </div>

                    {order.tableNumber ? (
                      <span className="px-3.5 py-1.5 rounded-full bg-[#dfd0ba] text-[#0a0a0a] font-black text-xs font-mono">
                        TABLE {order.tableNumber}
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-[#161311] text-[#cbb89d] text-xs font-mono font-bold uppercase border border-[#2a241f]">
                        {order.type.replace('_', ' ')}
                      </span>
                    )}
                  </div>

                  {/* Customer Info Box */}
                  <div className="p-3.5 rounded-2xl bg-[#080706] border border-[#1e1a16] mb-4 space-y-1">
                    <div className="text-sm font-bold text-[#f7f2e7]">
                      {order.customerName || 'Client POS'}
                    </div>
                    {order.customerPhone && (
                      <p className="text-xs text-[#8c7e6c] font-mono flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#dfd0ba]" />
                        <span>{order.customerPhone}</span>
                      </p>
                    )}
                    {order.deliveryAddress && (
                      <p className="text-xs text-[#cbb89d] font-mono flex items-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#dfd0ba] shrink-0" />
                        <span className="truncate">{order.deliveryAddress}</span>
                      </p>
                    )}
                  </div>

                  {/* Items List (Legible KDS Style) */}
                  <div className="space-y-2.5 mb-6">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-[#080706] border border-[#221e1a] flex flex-col gap-1"
                      >
                        <div className="flex items-center justify-between text-sm font-bold text-[#f7f2e7]">
                          <span>{item.quantity}x {item.menuItem.name}</span>
                          <span className="font-mono text-[#dfd0ba] text-xs">{item.itemTotal} DA</span>
                        </div>
                        {item.selectedExtras.length > 0 && (
                          <p className="text-xs text-[#cbb89d] font-mono">
                            + {item.selectedExtras.map((e) => e.name).join(', ')}
                          </p>
                        )}
                        {item.instructions && (
                          <p className="text-xs italic text-[#dfd0ba] bg-[#1a1410] p-2 rounded-xl mt-1 border border-[#3d2a1d]">
                            Note: {item.instructions}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total & Action Buttons */}
                <div className="pt-4 border-t border-[#221e1a] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#8c7e6c] uppercase">Montant Total</span>
                    <span className="text-xl font-serif font-extrabold text-[#dfd0ba]">
                      {order.total.toLocaleString('fr-DZ')} DA
                    </span>
                  </div>

                  {actionInfo && (
                    <button
                      onClick={() => updateOrderStatus(order.id, nextStatus!)}
                      className="w-full py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                    >
                      {actionInfo.icon}
                      <span>{actionInfo.label}</span>
                    </button>
                  )}

                  {order.status !== 'servie' && order.status !== 'annulee' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'servie')}
                      className="w-full py-2.5 rounded-full bg-[#182414] hover:bg-[#20331a] text-[#a8e092] border border-[#2d4a24] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <Check className="w-4 h-4" />
                      <span>Marquer Livrée / Payée</span>
                    </button>
                  )}

                  {order.status !== 'annulee' && order.status !== 'servie' && (
                    <button
                      onClick={() => updateOrderStatus(order.id, 'annulee')}
                      className="w-full py-2 text-center text-xs font-mono text-[#6e5858] hover:text-[#f7a494] transition-colors cursor-pointer"
                    >
                      Annuler cette commande
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="col-span-full text-center py-20 rounded-3xl bg-[#0e0c0a] border border-[#221e1a] space-y-3">
              <Utensils className="w-12 h-12 text-[#5a5045] mx-auto" />
              <h3 className="text-lg font-bold text-[#f7f2e7]">Aucune commande dans cette catégorie</h3>
              <p className="text-[#8c7e6c] text-xs font-mono">
                Sélectionnez un autre filtre pour consulter les commandes.
              </p>
            </div>
          )}
        </div>
      ) : (
        /* View Mode 2: Kanban Columns */
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {(['recue', 'acceptee', 'en_preparation', 'prete', 'servie'] as OrderStatus[]).map((st) => {
            const colOrders = orders.filter((o) => o.status === st);
            const cfg = STATUS_CONFIG[st];

            return (
              <div
                key={st}
                className={`p-4 rounded-3xl border ${cfg.borderColor} bg-[#0c0a09]/80 flex flex-col h-[700px] min-w-[280px] shadow-2xl`}
              >
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#26211c]">
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${cfg.textColor}`}>
                    {cfg.label}
                  </span>
                  <span className="w-6 h-6 rounded-full bg-[#080706] text-[#dfd0ba] font-mono font-extrabold text-xs flex items-center justify-center border border-[#26211c]">
                    {colOrders.length}
                  </span>
                </div>

                <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                  {colOrders.map((order) => {
                    const nextStatus = getNextStatus(order.status);
                    const actionInfo = nextStatus ? getActionButtonInfo(order.status) : null;

                    return (
                      <div
                        key={order.id}
                        className="p-4 rounded-2xl bg-[#080706] border border-[#221e1a] space-y-3 shadow-lg hover:border-[#dfd0ba]/40 transition-all"
                      >
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

                        <div>
                          <h4 className="text-xs font-bold text-[#f7f2e7]">
                            {order.customerName || 'Client POS'}
                          </h4>
                          {order.customerPhone && (
                            <p className="text-[10px] text-[#8c7e6c] flex items-center gap-1 mt-0.5 font-mono">
                              <Phone className="w-3 h-3 text-[#dfd0ba]" />
                              <span>{order.customerPhone}</span>
                            </p>
                          )}
                        </div>

                        <div className="space-y-1 pt-2 border-t border-[#221e1a]">
                          {order.items.map((item) => (
                            <div key={item.id} className="text-[11px] text-[#cbb89d] flex justify-between">
                              <span>{item.quantity}x {item.menuItem.name}</span>
                              <span className="text-[#8c7e6c] font-mono">{item.itemTotal} DA</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-2 border-t border-[#221e1a] flex items-center justify-between gap-2">
                          <span className="text-xs font-serif font-extrabold text-[#dfd0ba]">
                            {order.total.toLocaleString('fr-DZ')} DA
                          </span>

                          <div className="flex items-center gap-1.5">
                            {actionInfo && (
                              <button
                                onClick={() => updateOrderStatus(order.id, nextStatus!)}
                                className="px-3 py-1 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-[11px] flex items-center gap-1 transition-all cursor-pointer shadow-md active:scale-95"
                              >
                                <span>{actionInfo.label}</span>
                                <ArrowRight className="w-3 h-3 text-[#0a0a0a]" />
                              </button>
                            )}

                            {order.status !== 'servie' && order.status !== 'annulee' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'servie')}
                                className="px-2.5 py-1 rounded-full bg-[#182414] hover:bg-[#23331d] text-[#a8e092] border border-[#2d4a24] font-bold text-[10px] flex items-center gap-1 transition-all cursor-pointer"
                              >
                                <Check className="w-3 h-3 text-[#a8e092]" />
                                <span>Livrer</span>
                              </button>
                            )}
                          </div>
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
      )}
    </div>
  );
};
