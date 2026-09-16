import React, { useState } from 'react';
import { INITIAL_MENU_ITEMS } from '../../data/mockData';
import { MenuItem, MenuCategory } from '../../types';
import { useStore } from '../../context/StoreContext';
import { ArrowRight, Plus, Check, Flame, Award, ArrowUpRight, Sparkles } from 'lucide-react';
import { FloatingIngredient } from '../cinematic/FloatingIngredient';
import { FadeUp, FadeLeft, FadeRight, ScaleReveal, StaggerReveal } from '../motion/MotionSystem';

interface HomepageMenuDiscoveryProps {
  onGoToMenu: (category?: MenuCategory) => void;
  onOpenCart?: () => void;
}

interface CategoryTab {
  id: MenuCategory | 'featured';
  name: string;
  badge?: string;
  subtitle: string;
}

const CATEGORY_TABS: CategoryTab[] = [
  {
    id: 'featured',
    name: 'Sélection Signature',
    badge: 'Incontournables',
    subtitle: 'Nos créations emblématiques réunies',
  },
  {
    id: 'italiennes',
    name: 'Pizzas Italiennes',
    badge: 'Tradition',
    subtitle: 'Farine Tipo 00 & Levain 48h au feu de bois',
  },
  {
    id: 'algeriennes',
    name: 'Pizzas Algériennes',
    badge: 'Terroir Dz',
    subtitle: 'Merguez artisanale, ras el hanout & harsa douce',
  },
  {
    id: 'carrees',
    name: 'Pizzas Carrées',
    badge: 'Authentique Alger',
    subtitle: 'Pâte dorée croustillante façon pizza carrée d’Alger',
  },
  {
    id: 'americaines',
    name: 'Pizzas Américaines',
    badge: 'Gourmet',
    subtitle: 'Pepperoni croustillant, sauce BBQ & double fromage',
  },
  {
    id: 'accompagnements',
    name: 'Accompagnements',
    subtitle: 'Bâtonnets mozza filants, wings marinés & frites maison',
  },
  {
    id: 'boissons',
    name: 'Boissons',
    subtitle: 'Sélecto glacé, Hamoud Boualem & jus pressés',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    subtitle: 'Tiramisu maison au café & calzone chaude au Nutella',
  },
];

export const HomepageMenuDiscovery: React.FC<HomepageMenuDiscoveryProps> = ({
  onGoToMenu,
  onOpenCart,
}) => {
  const [activeTab, setActiveTab] = useState<MenuCategory | 'featured'>('featured');
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const { addToCart } = useStore();

  const handleQuickAdd = (e: React.MouseEvent, item: MenuItem) => {
    e.stopPropagation();
    addToCart(item, 1, [], '');
    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  // Filter 3 to 4 representative products based on active tab
  const getDisplayedItems = (): MenuItem[] => {
    if (activeTab === 'featured') {
      // Pick the best flagship from each major category
      const signatureIds = ['dz-1', 'it-1', 'sq-1', 'am-1', 'des-1', 'acc-1'];
      return INITIAL_MENU_ITEMS.filter((i) => signatureIds.includes(i.id));
    }
    return INITIAL_MENU_ITEMS.filter((item) => item.category === activeTab).slice(0, 4);
  };

  const displayedItems = getDisplayedItems();
  const currentTabInfo = CATEGORY_TABS.find((t) => t.id === activeTab) || CATEGORY_TABS[0];

  return (
    <section 
      id="menu-discovery" 
      className="relative py-28 md:py-36 bg-black text-[#f7f2e7] overflow-hidden border-t border-[#1f1b17]"
    >
      {/* BACKGROUND FLOATING INGREDIENTS (GSAP Scroll Parallax) */}
      {/* 1. Fresh Basil Leaf floating top left */}
      <div className="absolute top-20 left-4 md:left-12 pointer-events-none z-10">
        <FloatingIngredient
          ingredient="basil"
          size={120}
          parallaxSpeed={-70}
          rotationSpeed={30}
          opacity={0.8}
        />
      </div>

      {/* 2. Juicy San Marzano Tomato Slice floating mid-right */}
      <div className="absolute top-1/3 -right-6 md:right-10 pointer-events-none z-10">
        <FloatingIngredient
          ingredient="tomato"
          size={135}
          parallaxSpeed={80}
          rotationSpeed={-25}
          opacity={0.85}
        />
      </div>

      {/* 3. Black Kalamata Olive floating mid-left */}
      <div className="absolute top-2/3 left-6 md:left-16 pointer-events-none z-10">
        <FloatingIngredient
          ingredient="olive"
          size={75}
          parallaxSpeed={-50}
          rotationSpeed={40}
          opacity={0.75}
          hideOnMobile
        />
      </div>

      {/* 4. Pepperoni Slice floating bottom right */}
      <div className="absolute bottom-24 right-8 md:right-20 pointer-events-none z-10">
        <FloatingIngredient
          ingredient="pepperoni"
          size={110}
          parallaxSpeed={60}
          rotationSpeed={-20}
          opacity={0.85}
          hideOnMobile
        />
      </div>

      {/* SECTION CONTAINER */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        
        {/* EDITORIAL HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <FadeLeft distance={-40} duration={0.9} className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141210] border border-[#2a241f] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#dfd0ba] animate-pulse"></span>
              <span className="text-[11px] font-mono tracking-widest text-[#dfd0ba] uppercase font-semibold">
                La Carte PIDZERIA
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-[#f7f2e7] tracking-tight leading-[1.08]">
              Découvrez notre carte.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-[#cbb89d] font-light leading-relaxed">
              Des classiques italiens aux créations algériennes, pensées pour toutes les envies. 
              Pâte au levain 48h, merguez maison d’Alger, sauces mijotées et cuisson au feu de bois.
            </p>
          </FadeLeft>

          {/* CTA: Go directly to the full menu */}
          <FadeRight distance={40} duration={0.9} className="flex-shrink-0">
            <button
              onClick={() => onGoToMenu()}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-black/80 hover:scale-[1.02] cursor-pointer"
            >
              <span>Voir toute la carte</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </FadeRight>
        </div>

        {/* HORIZONTAL CATEGORY NAVIGATION BAR */}
        <FadeUp distance={25} duration={0.8} className="relative mb-12">
          <div className="flex items-center gap-2 pb-3 overflow-x-auto no-scrollbar scroll-smooth">
            {CATEGORY_TABS.map((tab, tabIdx) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{ animationDelay: `${tabIdx * 60}ms` }}
                  className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 cursor-pointer flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#dfd0ba] text-[#0a0a0a] border-[#dfd0ba] shadow-lg shadow-[#dfd0ba]/10 scale-105'
                      : 'bg-[#100e0c]/90 text-[#cbb89d] border-[#26211c] hover:border-[#dfd0ba]/50 hover:text-[#f7f2e7]'
                  }`}
                >
                  <span>{tab.name}</span>
                  {tab.badge && (
                    <span
                      className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-black/20 text-[#0a0a0a]'
                          : 'bg-[#1e1a16] text-[#dfd0ba]'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Subtitle indicator for active category */}
          <div className="mt-3 text-xs font-mono text-[#8c7e6c] tracking-wider flex items-center gap-2">
            <span className="w-4 h-[1px] bg-[#3d3730]"></span>
            <span>{currentTabInfo.subtitle}</span>
          </div>
        </FadeUp>

        {/* REPRESENTATIVE PRODUCTS GRID (Directionally Animated Fade-Up, Fade-Left, Fade-Right) */}
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayedItems.map((item, idx) => {
            const isAdded = !!addedItemIds[item.id];
            const isHeroCard = idx === 0 && activeTab === 'featured';
            
            // Alternating directional reveals
            const animVariant = idx % 3 === 0 ? 'fade-up' : idx % 3 === 1 ? 'fade-left' : 'fade-right';

            const cardContent = (
              <div
                onClick={() => onGoToMenu(item.category)}
                className={`group relative rounded-2xl bg-[#0d0c0a] border border-[#211c17] hover:border-[#dfd0ba]/50 transition-all duration-500 overflow-hidden flex flex-col justify-between cursor-pointer h-full ${
                  isHeroCard ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Product Image Stage */}
                <div
                  className={`relative overflow-hidden bg-black ${
                    isHeroCard ? 'h-64 sm:h-72 md:h-80' : 'h-52 sm:h-60'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.88] group-hover:brightness-100"
                  />
                  
                  {/* Subtle darkening vignette gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0c0a] via-transparent to-black/30 pointer-events-none" />

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {item.isPopular && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dfd0ba] text-black text-[10px] font-bold uppercase tracking-wider shadow-lg">
                        <Award className="w-3 h-3" />
                        Signature
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#2a130f] border border-[#632015] text-[#f7a494] text-[10px] font-bold uppercase tracking-wider">
                        <Flame className="w-3 h-3" />
                        Épicé
                      </span>
                    )}
                    {item.category === 'algeriennes' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#131b14] border border-[#233526] text-[#cbb89d] text-[10px] font-bold uppercase tracking-wider">
                        Terroir d’Alger
                      </span>
                    )}
                    {item.category === 'carrees' && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#181410] border border-[#382b20] text-[#dfd0ba] text-[10px] font-bold uppercase tracking-wider">
                        Carrée Algéroise
                      </span>
                    )}
                  </div>

                  {/* Price Tag pill */}
                  <div className="absolute bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#3d3730] text-[#dfd0ba] font-mono font-bold text-xs">
                    {item.price} DA
                  </div>
                </div>

                {/* Product Content Block */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7f2e7] group-hover:text-[#dfd0ba] transition-colors duration-300">
                      {item.name}
                    </h3>
                    
                    <p className="mt-2 text-xs sm:text-sm text-[#cbb89d] font-light line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Ingredients list pills */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {item.ingredients.slice(0, 3).map((ing, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#161310] text-[#8c7e6c] border border-[#211d19]"
                        >
                          {ing}
                        </span>
                      ))}
                      {item.ingredients.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded text-[#8c7e6c]">
                          +{item.ingredients.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-6 pt-4 border-t border-[#1e1a16] flex items-center justify-between">
                    <span className="text-xs text-[#8c7e6c] group-hover:text-[#dfd0ba] transition-colors flex items-center gap-1.5 font-medium">
                      <span>Détails & personnalisation</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <button
                      type="button"
                      onClick={(e) => handleQuickAdd(e, item)}
                      className={`h-9 px-3.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-white text-black'
                          : 'bg-[#181512] hover:bg-[#dfd0ba] text-[#dfd0ba] hover:text-black border border-[#2f2821] hover:border-[#dfd0ba]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Ajouté</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Ajouter</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );

            if (isHeroCard) {
              return (
                <div key={item.id} className="md:col-span-2 lg:col-span-2">
                  <FadeUp delay={idx * 0.1} distance={30} duration={0.8}>
                    {cardContent}
                  </FadeUp>
                </div>
              );
            }

            if (animVariant === 'fade-left') {
              return (
                <FadeLeft key={item.id} delay={idx * 0.08} distance={-35} duration={0.8} className="h-full">
                  {cardContent}
                </FadeLeft>
              );
            }

            if (animVariant === 'fade-right') {
              return (
                <FadeRight key={item.id} delay={idx * 0.08} distance={35} duration={0.8} className="h-full">
                  {cardContent}
                </FadeRight>
              );
            }

            return (
              <FadeUp key={item.id} delay={idx * 0.08} distance={35} duration={0.8} className="h-full">
                {cardContent}
              </FadeUp>
            );
          })}
        </div>

        {/* BOTTOM CALL TO ACTION BANNER */}
        <FadeUp distance={40} duration={0.9} className="mt-16">
          <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#12100d] via-[#16130f] to-[#12100d] border border-[#2d251d] text-center flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="text-left max-w-xl">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#dfd0ba] font-semibold block mb-1">
                Carte Complète • 24 Créations Artisanales
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7f2e7]">
                Envie de découvrir toutes nos recettes et formules ?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#cbb89d] font-light">
                Pizzas napolitaines, spécialités algéroises au feu de bois, formats carrés, entrées à partager et desserts maison.
              </p>
            </div>

            <button
              onClick={() => onGoToMenu()}
              className="flex-shrink-0 px-8 py-4 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm uppercase tracking-widest transition-all duration-300 shadow-xl shadow-black/80 hover:scale-[1.02] flex items-center gap-3 cursor-pointer"
            >
              <span>Explorer le menu complet</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </button>
          </div>
        </FadeUp>

      </div>
    </section>
  );
};
