import React from 'react';
import { useStore } from '../../context/StoreContext';
import { OrderStatus } from '../../types';
import { X, CheckCircle2, Clock, ChefHat, Sparkles, Utensils, CheckCheck } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const STATUS_STEPS: { key: OrderStatus; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: 'recue', label: 'Reçue', icon: Clock },
  { key: 'acceptee', label: 'Acceptée', icon: Sparkles },
  { key: 'en_preparation', label: 'En préparation', icon: ChefHat },
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
        className="relative w-full max-w-xl bg-[#121010] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Commande Confirmée</span>
            </div>
            <h2 className="text-2xl font-serif font-bold text-amber-50">
              Commande {activeOrder.orderNumber}
            </h2>
            {activeOrder.tableNumber && (
              <p className="text-xs text-amber-400 font-mono mt-0.5">
                Table {activeOrder.tableNumber}
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white transition-colors cursor-pointer"
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
                      ? 'bg-amber-500 border-amber-400 text-stone-950 shadow-lg shadow-amber-500/30 scale-110'
                      : isCompleted
                      ? 'bg-emerald-600 border-emerald-500 text-white'
                      : 'bg-stone-900 border-stone-800 text-stone-600'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-medium mt-2 text-center hidden sm:block ${
                    isCurrent ? 'text-amber-300 font-bold' : isCompleted ? 'text-stone-300' : 'text-stone-600'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Stepper Bar */}
          <div className="w-full bg-stone-900 h-1.5 rounded-full overflow-hidden p-0.5">
            <div 
              className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${((currentStepIdx + 1) / STATUS_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Estimated Time */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
          <p className="text-xs text-amber-200/80 uppercase font-mono tracking-wider">
            Temps de préparation estimé
          </p>
          <p className="text-3xl font-serif font-extrabold text-amber-400 my-1">
            ~15 - 20 minutes
          </p>
          <p className="text-xs text-stone-400">
            Notre chef prépare votre pizza avec des ingrédients frais.
          </p>
        </div>

        {/* Order Summary Items */}
        <div>
          <h4 className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-3">
            Détails des articles
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {activeOrder.items.map(item => (
              <div key={item.id} className="flex items-center justify-between text-xs text-stone-300 p-2.5 rounded-xl bg-stone-900/60">
                <span>{item.quantity}x {item.menuItem.name}</span>
                <span className="font-mono font-bold text-amber-400">{item.itemTotal.toLocaleString('fr-DZ')} DA</span>
              </div>
            ))}
          </div>
        </div>

        {/* Total & Action */}
        <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-stone-400 block">Total réglé</span>
            <span className="text-xl font-serif font-bold text-amber-400">
              {activeOrder.total.toLocaleString('fr-DZ')} DA
            </span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold transition-all cursor-pointer"
          >
            Fermer le suivi
          </button>
        </div>

      </div>
    </div>
  );
};
