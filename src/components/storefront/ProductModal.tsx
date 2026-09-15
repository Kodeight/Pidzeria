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
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#0e0c0b] border border-[#2e2823] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#161412]/80 hover:bg-[#24201c] text-[#cbb89d] hover:text-[#f7f2e7] backdrop-blur-md border border-[#2e2823] cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative w-full h-56 sm:h-64 bg-[#141210] overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c0b] via-transparent to-black/50" />

          {/* Badges */}
          <div className="absolute bottom-4 left-6 flex flex-wrap gap-2">
            {item.isPopular && (
              <span className="px-3 py-1 rounded-full bg-[#dfd0ba] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Heart className="w-3.5 h-3.5 fill-current" />
                Coup de cœur
              </span>
            )}
            {item.isSpicy && (
              <span className="px-3 py-1 rounded-full bg-[#c93a2b] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg">
                <Flame className="w-3.5 h-3.5" />
                Épicé
              </span>
            )}
            {item.isVegetarian && (
              <span className="px-3 py-1 rounded-full bg-[#24201c] border border-[#3d3730] text-[#dfd0ba] font-bold text-xs uppercase tracking-wider flex items-center gap-1 shadow-lg">
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
              <h2 className="text-2xl font-serif font-bold text-[#f7f2e7]">
                {item.name}
              </h2>
              <span className="text-2xl font-serif font-extrabold text-[#dfd0ba]">
                {item.price.toLocaleString('fr-DZ')} DA
              </span>
            </div>
            <p className="text-[#a69684] text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Composition / Ingredients */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-2">
              Ingrédients principaux
            </h4>
            <div className="flex flex-wrap gap-2">
              {item.ingredients.map((ing, idx) => (
                <span key={idx} className="px-3 py-1 rounded-lg bg-[#161412] border border-[#2a241f] text-xs text-[#cbb89d]">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          {/* Optional Extras */}
          {item.options?.extras && item.options.extras.length > 0 && (
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#dfd0ba] mb-3">
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
                          ? 'bg-[#221e1a] border-[#dfd0ba]/60 text-[#f7f2e7]'
                          : 'bg-[#141210]/60 border-[#2a241f] text-[#cbb89d] hover:border-[#3d3730]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected ? 'bg-[#dfd0ba] border-[#dfd0ba] text-black' : 'border-[#3d3730]'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-sm font-medium">{extra.name}</span>
                      </div>
                      <span className="text-xs font-mono text-[#dfd0ba] font-bold">
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
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#8c7e6c] mb-2">
              Instructions spéciales
            </h4>
            <textarea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              placeholder="Ex: Pâte bien cuite, sans harissa, etc."
              rows={2}
              className="w-full bg-[#141210] border border-[#2a241f] rounded-2xl p-3 text-sm text-[#f7f2e7] placeholder:text-[#6a5e51] focus:outline-none focus:border-[#dfd0ba]/60"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-[#26221d] bg-[#0c0a09] flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Quantity selector */}
          <div className="flex items-center gap-3 bg-[#141210] border border-[#2a241f] px-3 py-1.5 rounded-full">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full text-[#8c7e6c] hover:text-white hover:bg-[#1f1c18] cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center text-sm font-bold font-mono text-[#dfd0ba]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-full text-[#8c7e6c] hover:text-white hover:bg-[#1f1c18] cursor-pointer"
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
                ? 'bg-[#221e1a] text-[#dfd0ba] border border-[#dfd0ba]'
                : 'bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] shadow-black/80 hover:scale-[1.02]'
            }`}
          >
            {addedSuccess ? (
              <>
                <Check className="w-4 h-4 text-[#dfd0ba]" />
                <span>Ajouté au Panier !</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>Ajouter • {formattedTotal}</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
