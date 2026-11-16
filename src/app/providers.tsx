import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/gsap';
import { useLenis } from '../hooks/useLenis';
import { useLoader } from './LoaderContext';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const lenisRef = useLenis();
  const { showLoader } = useLoader();
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (showLoader) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [showLoader, lenisRef]);

  useEffect(() => {
    try {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    } catch {
      // ignore
    }

    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [pathname, hash, lenisRef]);

  return <>{children}</>;
};
