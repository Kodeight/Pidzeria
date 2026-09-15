import React from 'react';
import { MenuItem } from '../../types';
import { Plus, Flame, Leaf, Heart } from 'lucide-react';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect, onQuickAdd }) => {
  const formattedPrice = item.price.toLocaleString('fr-DZ') + ' DA';

  return (
    <div 
      onClick={() => onSelect(item)}
      className="group glass-panel rounded-3xl p-4 border border-[#243326]/80 hover:border-[#547734]/50 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-[#547734]/10 transform hover:-translate-y-1 relative overflow-hidden"
    >
      {/* Top badges without AI sparkle */}
      <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-1.5 pointer-events-none">
        {item.isPopular && (
          <span className="px-2.5 py-1 rounded-full bg-[#547734] text-[#fbf7ee] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
            <Heart className="w-3 h-3 fill-current" />
            Populaire
          </span>
        )}
        {item.isSpicy && (
          <span className="px-2.5 py-1 rounded-full bg-red-700/90 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
            <Flame className="w-3 h-3" />
            Épicé
          </span>
        )}
        {item.isVegetarian && (
          <span className="px-2.5 py-1 rounded-full bg-[#3e6027] text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-lg">
            <Leaf className="w-3 h-3" />
            Végétarien
          </span>
        )}
      </div>

      <div>
        {/* Product Image */}
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#121813]">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070907]/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
        </div>

        {/* Title and Category */}
        <div className="mb-2">
          <h3 className="text-lg font-serif font-bold text-[#fbf7ee] group-hover:text-[#9bc774] transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-[#a89c89] text-xs line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Ingredients Pills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {item.ingredients.slice(0, 3).map((ing, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-[#121813] border border-[#243326] text-[11px] text-[#c7baa4]">
              {ing}
            </span>
          ))}
          {item.ingredients.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md bg-[#121813] text-[10px] text-[#6e7b70]">
              +{item.ingredients.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Price & Add Button */}
      <div className="pt-3 border-t border-[#243326]/80 flex items-center justify-between mt-auto">
        <div>
          <span className="text-xs text-[#8a988c] block font-mono">Prix</span>
          <span className="text-lg font-serif font-extrabold text-[#9bc774]">
            {formattedPrice}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(item);
          }}
          disabled={!item.isAvailable}
          className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            item.isAvailable
              ? 'bg-[#547734]/20 hover:bg-[#547734] text-[#a4d47c] hover:text-[#fbf7ee] border border-[#547734]/40 hover:scale-105 shadow-md'
              : 'bg-[#18211a] text-[#556357] cursor-not-allowed'
          }`}
        >
          {item.isAvailable ? (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Ajouter</span>
            </>
          ) : (
            <span>Épuisé</span>
          )}
        </button>
      </div>
    </div>
  );
};
