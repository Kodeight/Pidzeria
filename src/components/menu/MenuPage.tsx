import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { PizzaCategory, MenuItem } from '../../types';
import { MenuCard } from '../storefront/MenuCard';
import { ProductModal } from '../storefront/ProductModal';
import { Search, ArrowLeft, UtensilsCrossed, Sparkles } from 'lucide-react';
import { FadeUp, FadeLeft, FadeRight, ScaleReveal, StaggerReveal } from '../motion/MotionSystem';

const CATEGORIES: { id: PizzaCategory | 'toutes'; label: string; flag?: string }[] = [
  { id: 'toutes', label: 'Toutes les créations' },
  { id: 'italiennes', label: 'Pizzas Italiennes', flag: '🇮🇹' },
  { id: 'algeriennes', label: 'Pizzas Algériennes', flag: '🇩🇿' },
  { id: 'carrees', label: 'Pizzas Carrées', flag: '🔲' },
  { id: 'americaines', label: 'Pizzas Américaines', flag: '🇺🇸' },
  { id: 'accompagnements', label: 'Accompagnements' },
  { id: 'boissons', label: 'Boissons' },
  { id: 'desserts', label: 'Desserts' },
];

interface MenuPageProps {
  onBackToHome: () => void;
  onOpenCart: () => void;
}

export const MenuPage: React.FC<MenuPageProps> = ({ onBackToHome, onOpenCart }) => {
  const { menuItems, addToCart, activeTableNumber, setActiveTableNumber } = useStore();
  
  // Initialize category from URL parameter if present
  const [selectedCategory, setSelectedCategory] = useState<PizzaCategory | 'toutes'>(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category') as PizzaCategory | null;
    if (cat && ['italiennes', 'algeriennes', 'carrees', 'americaines', 'accompagnements', 'boissons', 'desserts'].includes(cat)) {
      return cat;
    }
    return 'toutes';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalItem, setActiveModalItem] = useState<MenuItem | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Check URL query parameters for ?table=X or ?category=Y
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tableParam = params.get('table');
    if (tableParam) {
      const num = parseInt(tableParam, 10);
      if (!isNaN(num) && num > 0) {
        setActiveTableNumber(num);
      }
    }
    const catParam = params.get('category') as PizzaCategory | null;
    if (catParam && ['italiennes', 'algeriennes', 'carrees', 'americaines', 'accompagnements', 'boissons', 'desserts'].includes(catParam)) {
      setSelectedCategory(catParam);
    }
  }, [setActiveTableNumber]);

  // Scroll to top upon mounting /menu
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
    
    // Update URL query string without reloading page
    const newUrl = catId === 'toutes' 
      ? '/menu' 
      : `/menu?category=${encodeURIComponent(catId)}`;
    window.history.replaceState(null, '', newUrl);

    setTimeout(() => {
      setSelectedCategory(catId);
      setIsTransitioning(false);
    }, 150);
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, 1, []);
  };

  return (
    <div className="min-h-screen bg-black text-[#f7f2e7] pt-28 pb-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#dfd0ba]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Navigation Breadcrumb / Back Button */}
        <div className="flex items-center justify-between mb-8">
          <FadeLeft distance={-30} duration={0.7}>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#12100e] hover:bg-[#1f1b18] border border-[#2e2823] text-xs font-mono tracking-wider uppercase text-[#cbb89d] hover:text-[#dfd0ba] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Retour à l'accueil</span>
            </button>
          </FadeLeft>

          {/* Table indicator if ordering in-house */}
          {activeTableNumber && (
            <FadeRight distance={30} duration={0.7}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1c1814] border border-[#dfd0ba]/30 text-[#dfd0ba] text-xs font-semibold">
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#dfd0ba]" />
                <span>Commande en salle • Table {activeTableNumber}</span>
              </div>
            </FadeRight>
          )}
        </div>

        {/* Page Title & Editorial Presentation */}
        <FadeUp distance={35} duration={0.8} className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141210] border border-[#2d2823] text-[#dfd0ba] text-xs font-mono uppercase tracking-widest mb-4">
            <span>PIDZERIA • Carte des Pizzas</span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#f7f2e7] mb-4 tracking-tight">
            Nos Pizzas & Spécialités
          </h1>
          <p className="text-[#cbb89d] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Recettes napolitaines à croûte alvéolée, créations algéroises épicées et la légendaire pizza carrée. Préparées artisanalement à chaque commande.
          </p>
        </FadeUp>

        {/* Search Bar */}
        <FadeUp distance={25} duration={0.7} className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c7e6c]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Rechercher une pizza, merguez, fromage..."
            className="w-full bg-[#12100e] border border-[#2a2520] rounded-full pl-11 pr-4 py-3 text-sm text-[#f7f2e7] placeholder:text-[#6a5e51] focus:outline-none focus:border-[#dfd0ba]/60 shadow-xl transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#8c7e6c] hover:text-[#dfd0ba]"
            >
              Effacer
            </button>
          )}
        </FadeUp>

        {/* Category Filter Pills in Warm Cream / Dark Charcoal */}
        <FadeRight distance={40} duration={0.8} className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-10 no-scrollbar scroll-smooth">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? 'bg-[#dfd0ba] text-[#0a0a0a] shadow-lg shadow-black/80 scale-105'
                    : 'bg-[#12100e] hover:bg-[#1a1714] text-[#cbb89d] hover:text-[#f7f2e7] border border-[#2a2520]'
                }`}
              >
                {cat.flag && <span>{cat.flag}</span>}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </FadeRight>

        {/* Products Grid with smooth transition & directional animation */}
        <div className={`transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0 scale-[0.98]' : 'opacity-100 scale-100'}`}>
          {filteredItems.length > 0 ? (
            <div key={`${selectedCategory}-${searchQuery}`} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => {
                const animDir = idx % 3 === 0 ? 'fade-up' : idx % 3 === 1 ? 'fade-left' : 'fade-right';
                
                if (animDir === 'fade-left') {
                  return (
                    <FadeLeft key={item.id} delay={idx * 0.05} distance={-30} duration={0.7} className="h-full">
                      <MenuCard
                        item={item}
                        onSelect={(selected) => setActiveModalItem(selected)}
                        onQuickAdd={(selected) => handleQuickAdd(selected)}
                      />
                    </FadeLeft>
                  );
                }

                if (animDir === 'fade-right') {
                  return (
                    <FadeRight key={item.id} delay={idx * 0.05} distance={30} duration={0.7} className="h-full">
                      <MenuCard
                        item={item}
                        onSelect={(selected) => setActiveModalItem(selected)}
                        onQuickAdd={(selected) => handleQuickAdd(selected)}
                      />
                    </FadeRight>
                  );
                }

                return (
                  <FadeUp key={item.id} delay={idx * 0.05} distance={30} duration={0.7} className="h-full">
                    <MenuCard
                      item={item}
                      onSelect={(selected) => setActiveModalItem(selected)}
                      onQuickAdd={(selected) => handleQuickAdd(selected)}
                    />
                  </FadeUp>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#0e0c0b] border border-[#221e1a] rounded-3xl max-w-md mx-auto">
              <p className="text-[#8c7e6c] text-sm mb-4">
                Aucune création ne correspond à votre recherche.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('toutes');
                  setSearchQuery('');
                }}
                className="px-5 py-2 rounded-full bg-[#1f1b18] text-[#dfd0ba] text-xs font-semibold hover:bg-[#2b2520] transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>

        {/* Product Customization Modal */}
        <ProductModal
          item={activeModalItem}
          isOpen={!!activeModalItem}
          onClose={() => setActiveModalItem(null)}
        />

      </div>
    </div>
  );
};
