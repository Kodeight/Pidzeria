import React from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';
import { X, CheckCircle2, Clock, ChefHat, Utensils, CheckCheck, Flame } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_STEPS: { key: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'recue', label: 'Reçue', icon: Clock },
  { key: 'acceptee', label: 'Validée', icon: CheckCircle2 },
  { key: 'en_preparation', label: 'Au four', icon: Flame },
  { key: 'prete', label: 'Prête', icon: Utensils },
  { key: 'servie', label: 'Servie', icon: CheckCheck },
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({ isOpen, onClose }) => {
  const { activeOrder } = useStore();

  if (!isOpen || !activeOrder) return null;

  const getStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'recue': return 0;
      case 'acceptee': return 1;
      case 'en_preparation': return 2;
      case 'prete': return 3;
      case 'servie': return 4;
      default: return 0;
    }
  };

  const currentStepIdx = getStepIndex(activeOrder.status);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-[#0e0c0b] border border-[#2e2823] rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#26221d]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1814] border border-[#dfd0ba]/30 text-[#dfd0ba] text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Commande Enregistrée</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#f7f2e7]">
              Commande {activeOrder.orderNumber}
            </h2>
            {activeOrder.tableNumber && (
              <p className="text-xs text-[#dfd0ba] font-mono mt-0.5">
                Table {activeOrder.tableNumber}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#141210] hover:bg-[#201d19] text-[#8c7e6c] hover:text-white transition-colors cursor-pointer border border-[#2a241f]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Realtime Progress Stepper */}
        <div>
          <div className="flex items-center justify-between mb-4 px-2">
            {STATUS_STEPS.map((step, idx) => {
              const IconComp = step.icon;
              const isCompleted = idx <= currentStepIdx;
              const isCurrent = idx === currentStepIdx;

              return (
                <div key={step.key} className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    isCurrent
                      ? 'bg-[#dfd0ba] border-[#f3eadc] text-black shadow-lg shadow-black/80 scale-110'
                      : isCompleted
                      ? 'bg-[#221e1a] border-[#dfd0ba]/50 text-[#dfd0ba]'
                      : 'bg-[#141210] border-[#2a241f] text-[#554d44]'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-medium mt-2 text-center hidden sm:block ${
                    isCurrent ? 'text-[#dfd0ba] font-bold' : isCompleted ? 'text-[#cbb89d]' : 'text-[#554d44]'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stepper Bar */}
          <div className="w-full bg-[#141210] h-1.5 rounded-full overflow-hidden p-0.5 border border-[#2a241f]">
            <div 
              className="bg-[#dfd0ba] h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStepIdx + 1) / STATUS_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Estimated Time */}
        <div className="p-4 rounded-2xl bg-[#141210] border border-[#2a241f] text-center">
          <p className="text-xs text-[#cbb89d] uppercase font-mono tracking-wider">
            Temps de préparation estimé
          </p>
          <p className="text-3xl font-serif font-extrabold text-[#dfd0ba] my-1">
            ~15 - 20 minutes
          </p>
          <p className="text-xs text-[#8c7e6c]">
            Nos pizzaiolos préparent votre commande avec soin au four à 450°C.
          </p>
        </div>

        {/* Order Summary Items */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-3">
            Détails des articles
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {activeOrder.items.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs text-[#cbb89d] p-2.5 rounded-xl bg-[#141210]/60 border border-[#26221d]">
                <span>{item.quantity}x {item.menuItem.name}</span>
                <span className="font-mono font-bold text-[#dfd0ba]">{item.itemTotal.toLocaleString('fr-DZ')} DA</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Action */}
        <div className="pt-4 border-t border-[#26221d] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8c7e6c] block">Total</span>
            <span className="text-xl font-serif font-bold text-[#dfd0ba]">
              {activeOrder.total.toLocaleString('fr-DZ')} DA
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#141210] hover:bg-[#201d19] border border-[#2a241f] text-[#cbb89d] text-xs font-bold transition-all cursor-pointer"
          >
            Fermer le suivi
          </button>
        </div>

      </div>
    </div>
  );
};
