import React, { useState, useEffect, useCallback } from 'react';
import { StoreProvider } from './context/StoreContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PidzeriaLoader } from './components/loader/PidzeriaLoader';
import { Navbar } from './components/layout/Navbar';
import { CinematicExperience } from './components/cinematic/CinematicExperience';
import { MobileEditorialHero } from './components/cinematic/MobileEditorialHero';
import { HomepageMenuDiscovery } from './components/storefront/HomepageMenuDiscovery';
import { StorySection } from './components/storefront/StorySection';
import { PhilosophySection } from './components/storefront/PhilosophySection';
import { TestimonialsSection } from './components/storefront/TestimonialsSection';
import { ReservationSection } from './components/storefront/ReservationSection';
import { FindUsSection } from './components/storefront/FindUsSection';
import { FinalCtaSection } from './components/storefront/FinalCtaSection';
import { Footer } from './components/layout/Footer';
import { MenuPage } from './components/menu/MenuPage';
import { CartDrawer } from './components/storefront/CartDrawer';
import { OrderTrackerModal } from './components/storefront/OrderTrackerModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardLoginPage } from './components/dashboard/DashboardLoginPage';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { MenuCategory } from './types';
import { Logo } from './components/brand/Logo';
import { Loader2 } from 'lucide-react';

type AppRoute = 'home' | 'menu' | 'dashboard' | 'dashboard-login';

const parseRouteFromPath = (path: string): AppRoute => {
  if (path === '/dashboard/login' || path.startsWith('/dashboard/login')) {
    return 'dashboard-login';
  }
  if (path.startsWith('/dashboard')) {
    return 'dashboard';
  }
  if (path.startsWith('/menu')) {
    return 'menu';
  }
  return 'home';
};

const parseDashboardTabFromPath = (path: string): 'overview' | 'orders' | 'kitchen' | 'tables' | 'menu' | 'analytics' => {
  if (path.includes('/orders')) return 'orders';
  if (path.includes('/kitchen')) return 'kitchen';
  if (path.includes('/tables')) return 'tables';
  if (path.includes('/menu')) return 'menu';
  if (path.includes('/analytics')) return 'analytics';
  return 'overview';
};

function MainApp() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(() =>
    parseRouteFromPath(window.location.pathname)
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  // Responsive Breakpoint Detection for Desktop Cinematic vs Mobile Static Hero
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  // Sync browser back/forward history navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(parseRouteFromPath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((route: AppRoute, path: string) => {
    setCurrentRoute(route);
    window.history.pushState(null, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Server & Client Route Protection for /dashboard
  useEffect(() => {
    if (!authLoading) {
      const isDashboardRoute = currentRoute === 'dashboard';
      const isLoginRoute = currentRoute === 'dashboard-login';

      if (isDashboardRoute && !isAuthenticated) {
        // Redirect unauthenticated visitor to /dashboard/login
        setCurrentRoute('dashboard-login');
        window.history.replaceState(null, '', '/dashboard/login');
      } else if (isLoginRoute && isAuthenticated) {
        // If already authenticated, redirect to /dashboard
        setCurrentRoute('dashboard');
        window.history.replaceState(null, '', '/dashboard');
      }
    }
  }, [currentRoute, isAuthenticated, authLoading]);

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

  // 1. Loading authentication state
  if (authLoading && (currentRoute === 'dashboard' || currentRoute === 'dashboard-login')) {
    return (
      <div className="min-h-screen bg-black text-[#f7f2e7] flex flex-col items-center justify-center p-6">
        <Logo size="lg" className="mb-6 animate-pulse" />
        <div className="flex items-center gap-2 text-xs font-mono text-[#cbb89d]">
          <Loader2 className="w-4 h-4 animate-spin text-[#dfd0ba]" />
          <span>Vérification des accès...</span>
        </div>
      </div>
    );
  }

  // 2. Dashboard Login Route
  if (currentRoute === 'dashboard-login') {
    return (
      <DashboardLoginPage
        onLoginSuccess={() => navigateTo('dashboard', '/dashboard')}
        onReturnToStorefront={() => navigateTo('home', '/')}
      />
    );
  }

  // 3. Protected Dashboard (All subroutes protected)
  if (currentRoute === 'dashboard') {
    if (!isAuthenticated) {
      return (
        <DashboardLoginPage
          onLoginSuccess={() => navigateTo('dashboard', '/dashboard')}
          onReturnToStorefront={() => navigateTo('home', '/')}
        />
      );
    }

    return (
      <DashboardLayout
        onReturnToStorefront={() => navigateTo('home', '/')}
        onLogout={() => navigateTo('dashboard-login', '/dashboard/login')}
        initialTab={parseDashboardTabFromPath(window.location.pathname)}
      />
    );
  }

  // 4. Public Customer-facing Website & /menu
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
        onNavigateToDashboard={() => {
          if (isAuthenticated) {
            navigateTo('dashboard', '/dashboard');
          } else {
            navigateTo('dashboard-login', '/dashboard/login');
          }
        }}
      />

      {/* VIEW ROUTING: Home Page vs Dedicated /menu Page */}
      {currentRoute === 'home' ? (
        isDesktop ? (
          /* ========================================================
             DESKTOP EXPERIENCE: Full 7-stage Scroll-driven Cinematic Film
             ======================================================== */
          <main className="relative">
            {/* 1. Cinematic Story: Camera-moving scrubbed video narrative with 7 stages */}
            <CinematicExperience
              onNavigateToMenu={() => navigateTo('menu', '/menu')}
              onNavigateToReservation={() => scrollToSection('reservation')}
            />

            {/* 2. Homepage Menu Discovery: All categories + representative items + floating ingredients */}
            <HomepageMenuDiscovery
              onGoToMenu={(category?: MenuCategory) => {
                const targetPath = category ? `/menu?category=${category}` : '/menu';
                navigateTo('menu', targetPath);
              }}
              onOpenCart={() => setCartOpen(true)}
            />

            {/* 3. Heritage Story */}
            <StorySection />

            {/* 4. Artisanal Philosophy & Craftsmanship */}
            <PhilosophySection />

            {/* 5. Verified Customer Testimonials */}
            <TestimonialsSection />

            {/* 6. Table Reservation Form */}
            <ReservationSection />

            {/* 7. Find Us / Restaurant Location in Algiers */}
            <FindUsSection />

            {/* 8. Final Call to Action */}
            <FinalCtaSection
              onNavigateToMenu={() => navigateTo('menu', '/menu')}
              onNavigateToReservation={() => scrollToSection('reservation')}
            />

            {/* Storefront Footer */}
            <Footer
              onNavigateToSection={scrollToSection}
              onNavigateToMenu={() => navigateTo('menu', '/menu')}
            />
          </main>
        ) : (
          /* ========================================================
             MOBILE EXPERIENCE: Clean Editorial Hero + Story + Philosophy + Menu Discovery + Reviews + Reservation + Find Us + CTA + Footer
             - NO video playback / decoding
             - Static final exploded pizza frame with smooth touch rotation
             - Pure typography & breathing negative space
             - Menu Discovery with fixed category selector, pizza carousel & products grid
             ======================================================== */
          <main className="relative">
            {/* 1. Mobile Clean Editorial Hero with Static Final Frame */}
            <MobileEditorialHero
              onNavigateToMenu={() => navigateTo('menu', '/menu')}
              onNavigateToReservation={() => scrollToSection('reservation')}
            />

            {/* 2. Notre Histoire */}
            <StorySection />

            {/* 3. Notre Philosophie & Savoir-Faire */}
            <PhilosophySection />

            {/* 4. Menu Discovery (Categories, Carousel & Products Grid) */}
            <HomepageMenuDiscovery
              onGoToMenu={(category?: MenuCategory) => {
                const targetPath = category ? `/menu?category=${category}` : '/menu';
                navigateTo('menu', targetPath);
              }}
              onOpenCart={() => setCartOpen(true)}
            />

            {/* 5. Avis Clients */}
            <TestimonialsSection />

            {/* 6. Réservation */}
            <ReservationSection />

            {/* 7. Find Us / Restaurant Location in Algiers */}
            <FindUsSection />

            {/* 8. Final Call to Action */}
            <FinalCtaSection
              onNavigateToMenu={() => navigateTo('menu', '/menu')}
              onNavigateToReservation={() => scrollToSection('reservation')}
            />

            {/* Storefront Footer */}
            <Footer
              onNavigateToSection={scrollToSection}
              onNavigateToMenu={() => navigateTo('menu', '/menu')}
            />
          </main>
        )
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
    <AuthProvider>
      <StoreProvider>
        {isLoading ? (
          <PidzeriaLoader onComplete={() => setIsLoading(false)} />
        ) : (
          <MainApp />
        )}
      </StoreProvider>
    </AuthProvider>
  );
}
