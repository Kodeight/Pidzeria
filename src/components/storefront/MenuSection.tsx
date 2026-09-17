import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PizzaCategory, MenuItem } from '../../types';
import { MenuCard } from './MenuCard';
import { ProductModal } from './ProductModal';
import { Search, Utensils, Leaf } from 'lucide-react';
import { FadeUp } from '../motion/MotionSystem';

const CATEGORIES: { id: PizzaCategory | 'toutes'; label: string; icon: string }[] = [
  { id: 'toutes', label: 'Toutes les créations', icon: '🍕' },
  { id: 'algeriennes', label: 'Pizzas Algériennes', icon: '🇩🇿' },
  { id: 'italiennes', label: 'Pizzas Italiennes', icon: '🇮🇹' },
  { id: 'americaines', label: 'Pizzas Américaines', icon: '🇺🇸' },
  { id: 'accompagnements', label: 'Accompagnements', icon: '🍟' },
  { id: 'boissons', label: 'Boissons', icon: '🥤' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
];

export const MenuSection: React.FC = () => {
  const { menuItems, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<PizzaCategory | 'toutes'>('toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = selectedCategory === 'toutes' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.ingredients.some(ing => ing.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCategoryChange = (catId: PizzaCategory | 'toutes') => {
    if (catId === selectedCategory) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedCategory(catId);
      setIsTransitioning(false);
    }, 180);
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, 1, []);
  };

  return (
    <section id="menu" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full relative">
      {/* Section Header */}
      <FadeUp distance={30} className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#547734]/15 border border-[#547734]/30 text-[#8ec062] text-xs font-mono uppercase tracking-widest mb-4">
          <Leaf className="w-3.5 h-3.5 text-[#7db352]" />
          <span>La Carte Gourmande</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#fbf7ee] mb-4 tracking-tight">
          Nos Pizzas & Spécialités
        </h2>
        <p className="text-[#cfc0a7] text-sm sm:text-base leading-relaxed">
          Pizzas rondes napolitaines, recettes algéroises aux épices du pays et la légendaire pizza carrée. Préparées à la commande.
        </p>
      </FadeUp>

      {/* Category Pills Bar */}
      <FadeUp delay={0.1} distance={20} className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
        {CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-[#547734] text-[#fbf7ee] shadow-lg shadow-[#547734]/25 scale-105'
                : 'bg-[#121813]/85 hover:bg-[#1a231b] text-[#c7baa4] border border-[#243326]'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </FadeUp>

      {/* Search Input Bar */}
      <FadeUp delay={0.18} distance={20} className="relative max-w-md mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a988c]" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une pizza, merguez, sauce..."
          className="w-full bg-[#121813]/90 border border-[#243326] rounded-full pl-11 pr-4 py-3 text-sm text-[#f2e5ce] placeholder:text-[#6e7b70] focus:outline-none focus:border-[#547734] shadow-xl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8a988c] hover:text-white"
          >
            Effacer
          </button>
        )}
      </FadeUp>

      {/* Grid of Menu Cards with smooth transition on category changes */}
      <div className={`transition-opacity duration-200 ease-out ${isTransitioning ? 'opacity-0 scale-[0.99]' : 'opacity-100 scale-100'}`}>
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <MenuCard
                key={item.id}
                item={item}
                onSelect={(selected) => setActiveModalItem(selected)}
                onQuickAdd={(selected) => handleQuickAdd(selected)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-[#8a988c] text-sm">
            Aucun résultat ne correspond à votre recherche.
          </div>
        )}
      </div>

      {/* Detailed Customizer Modal */}
      <ProductModal
        item={activeModalItem}
        isOpen={!!activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
    </section>
  );
};
