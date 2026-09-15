import React, { useState } from 'react';
import { MenuItem } from '../../types';
import { X, Plus, Minus, ShoppingBag, Check, Flame, Leaf, Heart } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface ProductModalProps {
  item: MenuItem | null;
  isOpen?: boolean;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ item, isOpen = true, onClose }) => {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<{ id: string; name: string; price: number }[]>([]);
  const [instructions, setInstructions] = useState('');
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!item || !isOpen) return null;

  const toggleExtra = (extra: { id: string; name: string; price: number }) => {
    setSelectedExtras(prev => 
      prev.some(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalPrice = (item.price + extrasTotal) * quantity;
  const formattedTotal = totalPrice.toLocaleString('fr-DZ') + ' DA';

  const handleAddToCart = () => {
    addToCart(item, quantity, selectedExtras, instructions);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#0c120e] border border-[#547734]/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#121813]/80 hover:bg-[#1c271e] text-[#c7baa4] hover:text-[#9bc774] backdrop-blur-md border border-[#243326] cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative w-full h-56 sm:h-64 bg-[#121813] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c120e] via-transparent to-black/40" />

          {/* Badges without AI sparkles */}
          <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
            {item.isPopular && (
              <span className="px-3 py-1 rounded-full bg-[#547734] text-[#fbf7ee] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Heart className="w-3.5 h-3.5 fill-current" />
                Populaire
              </span>
            )}
            {item.isSpicy && (
              <span className="px-3 py-1 rounded-full bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg">
                <Flame className="w-3.5 h-3.5" />
                Épicé
              </span>
            )}
            {item.isVegetarian && (
              <span className="px-3 py-1 rounded-full bg-[#3e6027] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg">
                <Leaf className="w-3.5 h-3.5" />
                Végétarien
              </span>
            )}
          </div>
        </div>

        {/* Content Scrollable Area */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div>
            <div className="flex items-center justify-between gap-4 mb-2">
              <h2 className="text-2xl font-serif font-bold text-[#fbf7ee]">
                {item.name}
              </h2>
              <span className="text-2xl font-serif font-extrabold text-[#9bc774]">
                {item.price.toLocaleString('fr-DZ')} DA
              </span>
            </div>
            <p className="text-[#a89c89] text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Composition / Ingredients */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#8a988c] mb-2">
              Ingrédients principaux
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-[#121813] border border-[#243326] text-xs text-[#d4e4c2]">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Optional Extras */}
          {item.options?.extras && item.options.extras.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#9bc774] mb-3">
                Personnalisez votre pizza (Suppléments)
              </h4>
              <div className="space-y-2">
                {item.options.extras.map(extra => {
                  const isSelected = selectedExtras.some(e => e.id === extra.id);
                  return (
                    <div
                      key={extra.id}
                      onClick={() => toggleExtra(extra)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#547734]/15 border-[#547734]/40 text-[#fbf7ee]'
                          : 'bg-[#121813]/60 border-[#243326] text-[#c7baa4] hover:border-[#384e3a]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-[#547734] border-[#547734] text-white' : 'border-[#384e3a]'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-sm font-medium">{extra.name}</span>
                      </div>
                      <span className="text-xs font-mono text-[#9bc774] font-bold">
                        +{extra.price} DA
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special instructions */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#8a988c] mb-2">
              Instructions spéciales
            </h4>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Ex: Pâte bien cuite, sans harissa, etc."
              rows={2}
              className="w-full bg-[#121813]/90 border border-[#243326] rounded-2xl p-3 text-sm text-[#f2e5ce] placeholder:text-[#556357] focus:outline-none focus:border-[#547734]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#243326] bg-[#090e0a]/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity selector */}
          <div className="flex items-center gap-3 bg-[#121813] border border-[#243326] px-3 py-1.5 rounded-full">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full text-[#8a988c] hover:text-white hover:bg-[#1a231b] cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold font-mono text-[#9bc774]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-full text-[#8a988c] hover:text-white hover:bg-[#1a231b] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={addedSuccess}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
              addedSuccess
                ? 'bg-[#3e6027] text-white'
                : 'bg-[#547734] hover:bg-[#628b3d] text-[#fbf7ee] shadow-[#547734]/25 hover:scale-[1.02]'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4" />
                <span>Ajouté au Panier !</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Ajouter • {formattedTotal}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
