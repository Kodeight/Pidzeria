import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import { PidzeriaLoader } from './components/loader/PidzeriaLoader';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/storefront/HeroSection';
import { PizzaScrollExperience } from './components/cinematic/PizzaScrollExperience';
import { MenuSection } from './components/storefront/MenuSection';
import { StorySection } from './components/storefront/StorySection';
import { TestimonialsSection } from './components/storefront/TestimonialsSection';
import { ReservationSection } from './components/storefront/ReservationSection';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/storefront/CartDrawer';
import { OrderTrackerModal } from './components/storefront/OrderTrackerModal';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { ScrollProgress } from './components/motion/ScrollProgress';

function StorefrontApp() {
  const [currentView, setCurrentView] = useState<'storefront' | 'dashboard'>('storefront');
  const [cartOpen, setCartOpen] = useState(false);
  const [trackerOpen, setTrackerOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (currentView === 'dashboard') {
    return (
      <DashboardLayout
        onReturnToStorefront={() => setCurrentView('storefront')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#070606] text-[#f5f2eb] font-sans selection:bg-amber-500 selection:text-black relative">
      {/* Subtle Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Responsive Liquid Glass Navbar */}
      <Navbar
        onOpenCart={() => setCartOpen(true)}
        onOpenOrderTracker={() => setTrackerOpen(true)}
        onNavigateToSection={scrollToSection}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Storefront Experience */}
      <main className="relative">
        {/* 1. Cinematic Hero with Official PIDZERIA Branding */}
        <HeroSection
          onGoToMenu={() => scrollToSection('menu')}
          onGoToReservation={() => scrollToSection('reservation')}
        />

        {/* 2. Scroll-Driven 3D/Composited Pizza Journey with Story Stages */}
        <PizzaScrollExperience
          onScrollToMenu={() => scrollToSection('menu')}
        />

        {/* 3. Interactive Menu & Specialities with Staggered Motion */}
        <MenuSection />

        {/* 4. Heritage Story & Artisanal Philosophy with FadeLeft/FadeRight */}
        <StorySection />

        {/* 5. Customer Testimonials */}
        <TestimonialsSection />

        {/* 6. Table Reservation Form */}
        <ReservationSection />
      </main>

      {/* Footer */}
      <Footer onNavigateToSection={scrollToSection} />

      {/* Slide-over Cart Drawer */}
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
