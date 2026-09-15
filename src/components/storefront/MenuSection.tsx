import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { PizzaCategory, MenuItem } from '../../types';
import { MenuCard } from './MenuCard';
import { ProductModal } from './ProductModal';
import { Search, Sparkles, Filter } from 'lucide-react';
import { FadeUp, StaggerReveal } from '../motion/MotionSystem';

const CATEGORIES: { id: PizzaCategory | 'toutes'; label: string; icon: string }[] = [
  { id: 'toutes', label: 'Toutes les créations', icon: '✨' },
  { id: 'italiennes', label: 'Pizzas Italiennes', icon: '🇮🇹' },
  { id: 'algeriennes', label: 'Pizzas Algériennes', icon: '🇩🇿' },
  { id: 'carrees', label: 'Pizzas Carrées', icon: '🔲' },
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>La Carte Gourmande</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-50 mb-4 tracking-tight">
          Nos Pizzas & Spécialités
        </h2>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
          Pizzas rondes italiennes napolitaines, recettes algéroises aux épices du pays et la légendaire pizza carrée. Préparées à la commande.
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
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-lg shadow-amber-500/20 scale-105'
                : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border border-stone-800'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </FadeUp>

      {/* Search Input Bar */}
      <FadeUp delay={0.18} distance={20} className="relative max-w-md mx-auto mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Rechercher une pizza, merguez, sauce..."
          className="w-full bg-stone-900/90 border border-stone-800 rounded-full pl-11 pr-4 py-3 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-500/50 shadow-xl"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white"
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
                onQuickAdd={handleQuickAdd}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 glass-panel rounded-3xl border border-stone-800">
            <Filter className="w-12 h-12 text-stone-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-stone-300 mb-2">Aucun résultat trouvé</h3>
            <p className="text-stone-500 text-sm mb-4">Essayer une autre catégorie ou modifier la recherche.</p>
            <button
              onClick={() => { setSelectedCategory('toutes'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
            >
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Product Customization Modal */}
      <ProductModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
    </section>
  );
};
