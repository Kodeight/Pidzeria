import React, { useState, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import { ShoppingBag, Clock, LayoutDashboard, Menu, X, UtensilsCrossed } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenOrderTracker: () => void;
  onNavigateToHome: () => void;
  onNavigateToMenu: () => void;
  onNavigateToSection: (sectionId: string) => void;
  currentRoute: 'home' | 'menu' | 'dashboard';
  onNavigateToDashboard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCart,
  onOpenOrderTracker,
  onNavigateToHome,
  onNavigateToMenu,
  onNavigateToSection,
  currentRoute,
  onNavigateToDashboard,
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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (currentRoute !== 'home') {
      onNavigateToHome();
      setTimeout(() => {
        onNavigateToSection(sectionId);
      }, 150);
    } else {
      onNavigateToSection(sectionId);
    }
  };

  const handleHomeClick = () => {
    setMobileMenuOpen(false);
    onNavigateToHome();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMenuClick = () => {
    setMobileMenuOpen(false);
    onNavigateToMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-12 py-3 transition-all duration-500 ease-out">
      <div
        className={`max-w-7xl mx-auto rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-[#0a0908]/90 backdrop-blur-xl border border-[#2e2823] shadow-2xl shadow-black/80 scale-[0.99]'
            : 'bg-black/40 backdrop-blur-md border border-[#221e1a]/60'
        }`}
      >
        {/* Brand Logo - The official pidzeria.png */}
        <div className="flex items-center gap-3">
          <Logo onClick={handleHomeClick} size="md" className="cursor-pointer" />
          
          {/* Active Table Badge */}
          {activeTableNumber && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1c1814] border border-[#dfd0ba]/30 text-[#dfd0ba] text-xs font-semibold">
              <UtensilsCrossed className="w-3 h-3" />
              <span>Table {activeTableNumber}</span>
            </div>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-medium text-[#cbb89d]">
          <button 
            onClick={handleHomeClick}
            className={`transition-colors cursor-pointer ${
              currentRoute === 'home' ? 'text-[#f7f2e7] font-bold' : 'hover:text-[#f7f2e7]'
            }`}
          >
            Accueil
          </button>
          <button 
            onClick={handleMenuClick}
            className={`transition-colors cursor-pointer ${
              currentRoute === 'menu' ? 'text-[#f7f2e7] font-bold' : 'hover:text-[#f7f2e7]'
            }`}
          >
            Menu
          </button>
          <button 
            onClick={() => handleSectionClick('histoire')}
            className="hover:text-[#f7f2e7] transition-colors cursor-pointer"
          >
            Notre Histoire
          </button>
          <button 
            onClick={() => handleSectionClick('avis')}
            className="hover:text-[#f7f2e7] transition-colors cursor-pointer"
          >
            Avis
          </button>
          <button 
            onClick={() => handleSectionClick('reservation')}
            className="hover:text-[#f7f2e7] transition-colors cursor-pointer"
          >
            Réservation
          </button>
          <button 
            onClick={() => handleSectionClick('contact')}
            className="hover:text-[#f7f2e7] transition-colors cursor-pointer"
          >
            Nous trouver
          </button>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Algerian Flag Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141210] border border-[#2a241f] text-xs font-medium text-[#cbb89d]" title="Pizzeria artisanale à Alger">
            <span className="text-base leading-none">🇩🇿</span>
            <span className="text-[11px] font-mono text-[#8c7e6c]">Alger</span>
          </div>

          {/* Active Order Tracker Button */}
          {activeOrder && (
            <button
              onClick={onOpenOrderTracker}
              className="relative px-3 py-1.5 rounded-full bg-[#1e1a16] border border-[#dfd0ba]/40 text-[#dfd0ba] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#2b241e] transition-all cursor-pointer animate-pulse"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Suivi {activeOrder.orderNumber}</span>
            </button>
          )}

          {/* Restaurant Dashboard Toggle Link */}
          <button
            onClick={onNavigateToDashboard}
            className={`p-2 rounded-full transition-all border cursor-pointer ${
              currentRoute === 'dashboard'
                ? 'bg-[#dfd0ba] text-black border-[#dfd0ba]'
                : 'bg-[#141210] hover:bg-[#1f1b18] text-[#cbb89d] hover:text-[#f7f2e7] border-[#2a241f]'
            }`}
            title={currentRoute === 'dashboard' ? 'Retour au site client' : 'Accéder au Dashboard Restaurant'}
          >
            <LayoutDashboard className="w-4 h-4" />
          </button>

          {/* Cart Drawer Trigger Button in Luxury Cream / Warm Beige */}
          <button
            onClick={onOpenCart}
            className={`relative px-4 py-2 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs tracking-wide flex items-center gap-2 shadow-lg shadow-black/60 transition-all duration-300 cursor-pointer ${
              cartAnimate ? 'scale-105 ring-2 ring-[#dfd0ba]' : 'scale-100 hover:scale-[1.02]'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-black" />
            <span className="hidden sm:inline">Panier</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-black text-[#dfd0ba] text-[11px] font-extrabold flex items-center justify-center border border-[#332e29]">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-[#141210] text-[#cbb89d] hover:text-white cursor-pointer border border-[#2a241f]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 glass-panel rounded-3xl p-6 border border-[#2a241f] shadow-2xl flex flex-col gap-4 text-center bg-[#0d0b0a]/95">
          <button 
            onClick={handleHomeClick} 
            className="py-2 text-[#dfd0ba] font-medium hover:text-white"
          >
            Accueil
          </button>
          <button 
            onClick={handleMenuClick} 
            className="py-2 text-[#dfd0ba] font-bold hover:text-white"
          >
            Menu (/menu)
          </button>
          <button 
            onClick={() => handleSectionClick('histoire')} 
            className="py-2 text-[#cbb89d] font-medium hover:text-white"
          >
            Notre Histoire
          </button>
          <button 
            onClick={() => handleSectionClick('avis')} 
            className="py-2 text-[#cbb89d] font-medium hover:text-white"
          >
            Avis Clients
          </button>
          <button 
            onClick={() => handleSectionClick('reservation')} 
            className="py-2 text-[#cbb89d] font-medium hover:text-white"
          >
            Réservation
          </button>
          <button 
            onClick={() => handleSectionClick('contact')} 
            className="py-2 text-[#cbb89d] font-medium hover:text-white"
          >
            Nous trouver
          </button>
        </div>
      )}
    </header>
  );
};
