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
      className="group glass-panel rounded-2xl p-4 sm:p-5 border border-[#26221d] hover:border-[#dfd0ba]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer hover:shadow-2xl hover:shadow-black/70 transform hover:-translate-y-1 relative overflow-hidden bg-[#0e0c0b]/90"
    >
      {/* Top badges without AI sparkle */}
      <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-1.5 pointer-events-none">
        {item.isPopular && (
          <span className="px-2.5 py-1 rounded-full bg-[#dfd0ba] text-[#0a0a0a] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Heart className="w-3 h-3 fill-current" />
            Coup de cœur
          </span>
        )}
        {item.isSpicy && (
          <span className="px-2.5 py-1 rounded-full bg-[#c93a2b] text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Flame className="w-3 h-3" />
            Épicé
          </span>
        )}
        {item.isVegetarian && (
          <span className="px-2.5 py-1 rounded-full bg-[#2a2622] text-[#dfd0ba] border border-[#443d35] font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-md">
            <Leaf className="w-3 h-3" />
            Végétarien
          </span>
        )}
      </div>

      <div>
        {/* Product Image */}
        <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#141210]">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />
        </div>

        {/* Title and Category */}
        <div className="mb-2.5">
          <h3 className="text-lg font-serif font-bold text-[#f7f2e7] group-hover:text-[#dfd0ba] transition-colors line-clamp-1">
            {item.name}
          </h3>
          <p className="text-[#a69684] text-xs line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Ingredients Pills */}
        <div className="flex flex-wrap gap-1 mb-4">
          {item.ingredients.slice(0, 3).map((ing, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md bg-[#161412] border border-[#2a2520] text-[11px] text-[#cbb89d]">
              {ing}
            </span>
          ))}
          {item.ingredients.length > 3 && (
            <span className="px-1.5 py-0.5 rounded-md bg-[#161412] text-[10px] text-[#7d6f5f]">
              +{item.ingredients.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Price & Add Button */}
      <div className="pt-3 border-t border-[#26221d] flex items-center justify-between mt-auto">
        <div>
          <span className="text-[10px] text-[#8c7e6c] block font-mono uppercase tracking-wider">Prix</span>
          <span className="text-base sm:text-lg font-serif font-bold text-[#dfd0ba]">
            {formattedPrice}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(item);
          }}
          disabled={!item.isAvailable}
          className={`px-3.5 py-1.5 rounded-full font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
            item.isAvailable
              ? 'bg-[#221e1a] hover:bg-[#dfd0ba] text-[#dfd0ba] hover:text-[#0a0a0a] border border-[#3d3730] hover:scale-105 shadow-sm'
              : 'bg-[#141210] text-[#554d44] cursor-not-allowed border border-[#221f1c]'
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
