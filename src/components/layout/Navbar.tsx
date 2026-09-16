import React, { useState, useEffect } from 'react';
import { Logo } from '../brand/Logo';
import { 
  ShoppingBag, 
  Clock, 
  LayoutDashboard, 
  Menu, 
  X, 
  UtensilsCrossed, 
  ChevronRight, 
  ArrowUpRight, 
  Calendar, 
  MapPin, 
  Phone,
  Instagram,
  Facebook
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface NavbarProps {
  onOpenCart: () => void;
  onOpenOrderTracker: () => void;
  onNavigateToHome: () => void;
  onNavigateToMenu: () => void;
  onNavigateToSection: (sectionId: string) => void;
  currentRoute: 'home' | 'menu' | 'dashboard' | 'dashboard-login';
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

  // Lock body scroll when full-height mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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

  const handleDashboardClick = () => {
    setMobileMenuOpen(false);
    onNavigateToDashboard();
  };

  const navLinks = [
    { number: '01', label: 'Accueil', action: handleHomeClick, active: currentRoute === 'home' },
    { number: '02', label: 'La Carte', action: handleMenuClick, active: currentRoute === 'menu' },
    { number: '03', label: 'Notre Histoire', action: () => handleSectionClick('histoire'), active: false },
    { number: '04', label: 'Avis Clients', action: () => handleSectionClick('avis'), active: false },
    { number: '05', label: 'Réservation', action: () => handleSectionClick('reservation'), active: false },
    { number: '06', label: 'Nous Trouver', action: () => handleSectionClick('contact'), active: false },
  ];

  return (
    <>
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
                <span className="hidden xs:inline">Suivi {activeOrder.orderNumber}</span>
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
              className={`relative px-3.5 sm:px-4 py-2 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] active:scale-95 text-[#0a0a0a] font-bold text-xs tracking-wide flex items-center gap-1.5 sm:gap-2 shadow-lg shadow-black/60 transition-all duration-300 cursor-pointer ${
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

            {/* Mobile Menu Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Ouvrir le menu"
              className="md:hidden p-2 rounded-full bg-[#141210] text-[#dfd0ba] hover:text-white cursor-pointer border border-[#2a241f] active:scale-95 transition-transform"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* FULL-HEIGHT MOBILE HAMBURGER DRAWER (Fixed Inset Fullscreen) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#070605] flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          
          {/* Top Bar inside Drawer */}
          <div className="px-6 pt-5 pb-4 flex items-center justify-between border-b border-[#1c1916] bg-[#0a0908]/90 backdrop-blur-md sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <Logo onClick={handleHomeClick} size="md" className="cursor-pointer" />
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#161311] border border-[#26211c] text-[10px] font-mono text-[#cbb89d]">
                <span>🇩🇿 Alger</span>
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Fermer le menu"
              className="w-10 h-10 rounded-full bg-[#161412] border border-[#2e2823] text-[#dfd0ba] hover:text-white flex items-center justify-center cursor-pointer active:scale-90 transition-transform shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links list */}
          <div className="px-6 py-8 flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
            <div className="space-y-1 divide-y divide-[#171412]">
              {navLinks.map((link, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={link.number}
                    className={`transition-all duration-500 ease-out animate-in ${
                      isEven ? 'slide-in-from-left-6' : 'slide-in-from-right-6'
                    } fade-in fill-mode-both`}
                    style={{ animationDelay: `${idx * 70 + 80}ms`, animationDuration: '450ms' }}
                  >
                    <button
                      onClick={link.action}
                      className={`w-full py-4 flex items-center justify-between text-left group transition-all cursor-pointer ${
                        link.active ? 'text-[#f7f2e7]' : 'text-[#cbb89d] hover:text-[#f7f2e7]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[#8c7e6c] group-hover:text-[#dfd0ba] transition-colors">
                          {link.number}
                        </span>
                        <span className={`text-xl sm:text-2xl font-serif tracking-tight ${
                          link.active ? 'font-bold text-[#dfd0ba]' : 'font-medium'
                        }`}>
                          {link.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {link.active && (
                          <span className="w-2 h-2 rounded-full bg-[#dfd0ba] animate-pulse" />
                        )}
                        <ChevronRight className="w-4 h-4 text-[#5a5045] group-hover:text-[#dfd0ba] group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  </div>
                );
              })}

              {/* Dashboard Link for Restaurant Staff */}
              <div
                className="transition-all duration-500 ease-out animate-in slide-in-from-bottom-4 fade-in fill-mode-both"
                style={{ animationDelay: `${navLinks.length * 70 + 100}ms`, animationDuration: '450ms' }}
              >
                <button
                  onClick={handleDashboardClick}
                  className="w-full py-4 flex items-center justify-between text-left group transition-all cursor-pointer text-[#8c7e6c] hover:text-[#dfd0ba]"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#5a5045]">07</span>
                    <span className="text-base font-sans font-medium flex items-center gap-2">
                      <LayoutDashboard className="w-4 h-4 text-[#8c7e6c]" />
                      <span>Espace Équipe / Dashboard</span>
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#5a5045]" />
                </button>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div 
              className="mt-8 space-y-3 pt-6 border-t border-[#1a1714] animate-in slide-in-from-bottom-6 fade-in fill-mode-both"
              style={{ animationDelay: '520ms', animationDuration: '500ms' }}
            >
              <button
                onClick={handleMenuClick}
                className="w-full py-3.5 px-6 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] active:scale-[0.98] text-[#0a0a0a] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-black/80 transition-all cursor-pointer"
              >
                <span>Découvrir la carte</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={() => handleSectionClick('reservation')}
                className="w-full py-3.5 px-6 rounded-full bg-[#141210] hover:bg-[#1f1b18] active:scale-[0.98] text-[#dfd0ba] border border-[#2e2823] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#cbb89d]" />
                <span>Réserver une table</span>
              </button>
            </div>
          </div>

          {/* Drawer Bottom Information & Social */}
          <div className="px-6 py-6 border-t border-[#1a1714] bg-[#090807] space-y-3 text-xs text-[#8c7e6c]">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#dfd0ba] shrink-0" />
              <span className="truncate">14 Rue Didouche Mourad, Alger Centre</span>
            </div>
            
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#dfd0ba] shrink-0" />
                <span className="font-mono text-[#dfd0ba]">+213 (0)21 65 43 21</span>
              </div>
              
              <div className="flex items-center gap-3 text-[#cbb89d]">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#dfd0ba]">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#dfd0ba]">
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="text-[11px] text-[#5a5045] pt-1">
              <span>Ouvert 7j/7 • 11h30 – 23h30 (Service continu)</span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
