import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { MobileBar } from '../components/layout/MobileBar';
import { PageTransition } from '../components/layout/PageTransition';
import { CustomCursor } from '../components/ui/CustomCursor';

const RouteFallback: React.FC = () => (
  <div className="min-h-[78svh] bg-[var(--color-charcoal-deep)]" aria-hidden="true" />
);

export const RootLayout: React.FC = () => {
  return (
    <div className="min-h-dvh flex flex-col bg-[var(--color-cream)] text-[var(--color-charcoal)] overflow-x-clip">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <CustomCursor />
      <Navbar />

      <main id="main-content" className="flex-1 min-w-0">
        <PageTransition>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>

      <Footer />
      <MobileBar />
    </div>
  );
};
