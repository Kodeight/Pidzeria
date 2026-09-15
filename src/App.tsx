import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { PidzeriaLoader } from './components/loader/PidzeriaLoader';
import { Navbar } from './components/layout/Navbar';
import { CinematicExperience } from './components/cinematic/CinematicExperience';
import { MenuInvitationSection } from './components/storefront/MenuInvitationSection';
import { StorySection } from './components/storefront/StorySection';
import { TestimonialsSection } from './components/storefront/TestimonialsSection';
import { ReservationSection } from './components/storefront/ReservationSection';
import { Footer } from './components/layout/Footer';
import { MenuPage } from './components/menu/MenuPage';
import { CartDrawer } from './components/storefront/CartDrawer';
import { OrderTrackerModal } from './components/storefront/OrderTrackerModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ScrollProgress } from './components/motion/ScrollProgress';

type AppRoute = 'home' | 'menu' | 'dashboard';

function StorefrontApp() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/menu')) return 'menu';
    if (path.startsWith('/dashboard')) return 'dashboard';
    return 'home';
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);

  // Sync browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/menu')) {
        setCurrentRoute('menu');
      } else if (path.startsWith('/dashboard')) {
        setCurrentRoute('dashboard');
      } else {
        setCurrentRoute('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (route: AppRoute, path: string) => {
    setCurrentRoute(route);
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    if (currentRoute !== 'home') {
      navigateTo('home', '/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentRoute === 'dashboard') {
    return (
      <DashboardLayout
        onReturnToStorefront={() => navigateTo('home', '/')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#f7f2e7] font-sans selection:bg-[#dfd0ba] selection:text-black relative">
      {/* Subtle Scroll Progress Indicator in Warm Cream */}
      <ScrollProgress />

      {/* Responsive Liquid Glass Navbar with official pidzeria.png */}
      <Navbar
        onOpenCart={() => setCartOpen(true)}
        onOpenOrderTracker={() => setTrackerOpen(true)}
        onNavigateToHome={() => navigateTo('home', '/')}
        onNavigateToMenu={() => navigateTo('menu', '/menu')}
        onNavigateToSection={scrollToSection}
        currentRoute={currentRoute}
        onNavigateToDashboard={() => navigateTo('dashboard', '/dashboard')}
      />

      {/* VIEW ROUTING: Home Page vs Dedicated /menu Page */}
      {currentRoute === 'home' ? (
        <main className="relative">
          {/* 1. Cinematic Story: Unified Hero + 5 Narrative Stages scrubbed with pizza.mp4 */}
          <CinematicExperience
            onNavigateToMenu={() => navigateTo('menu', '/menu')}
            onNavigateToReservation={() => scrollToSection('reservation')}
          />

          {/* 2. Editorial Transition Section inviting user to the /menu destination */}
          <MenuInvitationSection
            onGoToMenu={() => navigateTo('menu', '/menu')}
          />

          {/* 3. Heritage Story & Artisanal Philosophy */}
          <StorySection />

          {/* 4. Verified Customer Testimonials */}
          <TestimonialsSection />

          {/* 5. Table Reservation Form */}
          <ReservationSection />

          {/* Storefront Footer */}
          <Footer
            onNavigateToSection={scrollToSection}
            onNavigateToMenu={() => navigateTo('menu', '/menu')}
          />
        </main>
      ) : (
        <main className="relative">
          {/* Dedicated /menu Page */}
          <MenuPage
            onBackToHome={() => navigateTo('home', '/')}
            onOpenCart={() => setCartOpen(true)}
          />

          {/* Storefront Footer */}
          <Footer
            onNavigateToSection={scrollToSection}
            onNavigateToMenu={() => navigateTo('menu', '/menu')}
          />
        </main>
      )}

      {/* Slide-over Cart Drawer in Luxury Black & Cream */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onOrderPlaced={() => setTrackerOpen(true)}
      />

      {/* Order Realtime Status Tracker */}
      <OrderTrackerModal
        isOpen={trackerOpen}
        onClose={() => setTrackerOpen(false)}
      />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <StoreProvider>
      {isLoading ? (
        <PidzeriaLoader onComplete={() => setIsLoading(false)} />
      ) : (
        <StorefrontApp />
      )}
    </StoreProvider>
  );
}
