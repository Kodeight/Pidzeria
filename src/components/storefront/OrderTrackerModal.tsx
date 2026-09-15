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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl bg-[#0c120e] border border-[#547734]/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#243326]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#547734]/15 border border-[#547734]/30 text-[#9bc774] text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Commande Enregistrée</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-[#fbf7ee]">
              Commande {activeOrder.orderNumber}
            </h2>
            {activeOrder.tableNumber && (
              <p className="text-xs text-[#9bc774] font-mono mt-0.5">
                Table {activeOrder.tableNumber}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#121813] hover:bg-[#1a231b] text-[#8a988c] hover:text-white transition-colors cursor-pointer border border-[#243326]"
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
                      ? 'bg-[#547734] border-[#7db352] text-[#fbf7ee] shadow-lg shadow-[#547734]/35 scale-110'
                      : isCompleted
                      ? 'bg-[#233325] border-[#547734] text-[#9bc774]'
                      : 'bg-[#121813] border-[#243326] text-[#556357]'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-medium mt-2 text-center hidden sm:block ${
                    isCurrent ? 'text-[#9bc774] font-bold' : isCompleted ? 'text-[#c7baa4]' : 'text-[#556357]'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stepper Bar */}
          <div className="w-full bg-[#121813] h-1.5 rounded-full overflow-hidden p-0.5 border border-[#243326]">
            <div 
              className="bg-[#547734] h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStepIdx + 1) / STATUS_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Estimated Time */}
        <div className="p-4 rounded-2xl bg-[#547734]/10 border border-[#547734]/20 text-center">
          <p className="text-xs text-[#d4e4c2] uppercase font-mono tracking-wider">
            Temps de préparation estimé
          </p>
          <p className="text-3xl font-serif font-extrabold text-[#9bc774] my-1">
            ~15 - 20 minutes
          </p>
          <p className="text-xs text-[#a89c89]">
            Nos pizzaiolos préparent votre commande avec soin au feu de bois.
          </p>
        </div>

        {/* Order Summary Items */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#8a988c] mb-3">
            Détails des articles
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {activeOrder.items.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs text-[#c7baa4] p-2.5 rounded-xl bg-[#121813]/60 border border-[#243326]">
                <span>{item.quantity}x {item.menuItem.name}</span>
                <span className="font-mono font-bold text-[#9bc774]">{item.itemTotal.toLocaleString('fr-DZ')} DA</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Action */}
        <div className="pt-4 border-t border-[#243326] flex items-center justify-between">
          <div>
            <span className="text-xs text-[#8a988c] block">Total</span>
            <span className="text-xl font-serif font-bold text-[#9bc774]">
              {activeOrder.total.toLocaleString('fr-DZ')} DA
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#121813] hover:bg-[#1a231b] border border-[#243326] text-[#c7baa4] text-xs font-bold transition-all cursor-pointer"
          >
            Fermer le suivi
          </button>
        </div>

      </div>
    </div>
  );
};
