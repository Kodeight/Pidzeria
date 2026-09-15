import React, { useState, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import { ShoppingBag, Clock, LayoutDashboard, Menu, X, UtensilsCrossed } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenOrderTracker: () => void;
  onNavigateToSection: (sectionId: string) => void;
  currentView: 'storefront' | 'dashboard';
  setCurrentView: (view: 'storefront' | 'dashboard') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenOrderTracker,
  onNavigateToSection,
  currentView,
  setCurrentView,
}) => {
  const { cartItems, activeTableNumber, activeOrder } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartAnimate, setCartAnimate] = useState(false);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Micro-interaction: subtle cart bump when items change
  useEffect(() => {
    if (cartCount > 0) {
      setCartAnimate(true);
      const t = setTimeout(() => setCartAnimate(false), 450);
      return () => clearTimeout(t);
    }
  }, [cartCount]);

  // Scroll listener for liquid glass navbar transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'storefront') {
      setCurrentView('storefront');
      setTimeout(() => onNavigateToSection(id), 100);
    } else {
      onNavigateToSection(id);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-12 py-3 transition-all duration-500 ease-out">
      <div
        className={`max-w-7xl mx-auto rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-[#0d0b0b]/85 backdrop-blur-xl border border-stone-800/80 shadow-2xl shadow-black/60 scale-[0.99]'
            : 'bg-transparent border border-transparent backdrop-blur-none'
        }`}
      >
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <Logo onClick={() => handleNavClick('hero')} size="md" className="cursor-pointer" />
          
          {/* Active Table Badge */}
          {activeTableNumber && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
              <UtensilsCrossed className="w-3 h-3" />
              <span>Table {activeTableNumber}</span>
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium text-stone-300">
          <button 
            onClick={() => handleNavClick('hero')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Accueil
          </button>
          <button 
            onClick={() => handleNavClick('menu')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Menu
          </button>
          <button 
            onClick={() => handleNavClick('histoire')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Notre Histoire
          </button>
          <button 
            onClick={() => handleNavClick('avis')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Avis
          </button>
          <button 
            onClick={() => handleNavClick('reservation')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Réservation
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className="hover:text-amber-400 transition-colors cursor-pointer"
          >
            Nous trouver
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Algerian Flag Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/80 border border-stone-800 text-xs font-medium text-stone-300" title="Origine Algérie">
            <span className="text-base leading-none">🇩🇿</span>
            <span className="text-[11px] font-mono text-stone-400">Alger</span>
          </div>

          {/* Active Order Tracker Button */}
          {activeOrder && (
            <button
              onClick={onOpenOrderTracker}
              className="relative px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-amber-500/30 transition-all cursor-pointer animate-pulse"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Suivi {activeOrder.orderNumber}</span>
            </button>
          )}

          {/* Dashboard Toggle Link */}
          <button
            onClick={() => setCurrentView(currentView === 'storefront' ? 'dashboard' : 'storefront')}
            className="p-2 rounded-full bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-amber-400 transition-all border border-stone-800 cursor-pointer"
            title={currentView === 'storefront' ? 'Espace Restaurant / Dashboard' : 'Retour au site client'}
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          {/* Cart Drawer Trigger Button with micro-interaction */}
          <button
            onClick={onOpenCart}
            className={`relative px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all duration-300 cursor-pointer ${
              cartAnimate ? 'scale-105 ring-2 ring-amber-400/50' : 'scale-100 hover:scale-[1.02]'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Panier</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-stone-950 text-amber-400 text-[11px] font-extrabold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-stone-900 text-stone-300 hover:text-amber-400 cursor-pointer border border-stone-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-3xl p-6 border border-stone-800 shadow-2xl flex flex-col gap-4 text-center animate-fade-in">
          <button 
            onClick={() => handleNavClick('hero')} 
            className="py-2 text-stone-200 font-medium hover:text-amber-400"
          >
            Accueil
          </button>
          <button 
            onClick={() => handleNavClick('menu')} 
            className="py-2 text-stone-200 font-medium hover:text-amber-400"
          >
            Menu
          </button>
          <button 
            onClick={() => handleNavClick('histoire')} 
            className="py-2 text-stone-200 font-medium hover:text-amber-400"
          >
            Notre Histoire
          </button>
          <button 
            onClick={() => handleNavClick('avis')} 
            className="py-2 text-stone-200 font-medium hover:text-amber-400"
          >
            Avis
          </button>
          <button 
            onClick={() => handleNavClick('reservation')} 
            className="py-2 text-stone-200 font-medium hover:text-amber-400"
          >
            Réservation
          </button>
          <button 
            onClick={() => handleNavClick('contact')} 
            className="py-2 text-stone-200 font-medium hover:text-amber-400"
          >
            Nous trouver
          </button>
        </div>
      )}
    </header>
  );
};
