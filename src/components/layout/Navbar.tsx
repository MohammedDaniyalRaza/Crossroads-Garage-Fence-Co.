import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, Phone } from 'lucide-react';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { PRIMARY_NAV } from '../../data/nav.js';
import { cn } from '../../lib/helpers';
import { Button, LinkButton } from '../ui/Button';
import { MegaMenu } from './MegaMenu';
import { MobileMenu } from './MobileMenu';

export const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);
  const closeTimer = useRef<number | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      setHidden(false);
    }
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (y > 140 && y > lastY.current + 8 && !megaOpen && !mobileOpen) {
        setHidden(true);
      } else if (y < lastY.current - 6 || y <= 80) {
        setHidden(false);
      }
      lastY.current = y;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [megaOpen, mobileOpen]);

  const openMega = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMegaOpen(true);
  };

  const scheduleCloseMega = () => {
    closeTimer.current = window.setTimeout(() => setMegaOpen(false), 140);
  };

  return (
    <>
      <header
        data-surface="dark"
        onMouseLeave={scheduleCloseMega}
        style={{ zIndex: 700 }}
        className={cn(
          'fixed top-0 left-0 right-0 w-full h-[var(--nav-height)] transition-[transform,background-color] duration-300 ease-[var(--ease-out-expo)] border-b',
          hidden && !mobileOpen ? '-translate-y-full' : 'translate-y-0',
          scrolled
            ? 'bg-[rgba(28,27,26,0.96)] backdrop-blur-[8px] border-[rgba(243,237,226,0.16)] text-[var(--color-cream)]'
            : 'bg-[rgba(28,27,26,0.72)] backdrop-blur-[6px] border-[rgba(243,237,226,0.12)] text-[var(--color-cream)]'
        )}
      >
        {/* DESKTOP NAVBAR (>= 1100px) */}
        <div className="nav-desktop-only container-arch h-full items-center justify-between gap-6">
          <Link
            to="/"
            className="flex items-center gap-3 whitespace-nowrap shrink-0 group text-[var(--color-cream)]"
            aria-label={`${BUSINESS.name} — Home`}
          >
            <img
              src={BUSINESS.logo}
              alt=""
              className="w-10 h-10 rounded-full object-contain shrink-0 transition-transform duration-300 group-hover:rotate-[-6deg]"
            />
            <span className="font-display font-bold text-[1.05rem] tracking-tight text-[var(--color-cream)]">
              {BUSINESS.name}
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="flex items-center gap-5">
            {PRIMARY_NAV.map((item) => {
              const active =
                item.to === '/'
                  ? pathname === '/'
                  : pathname === item.to || pathname.startsWith(`${item.to}/`);

              if (item.hasMegaMenu) {
                return (
                  <div
                    key={item.to}
                    onMouseEnter={openMega}
                    className="relative flex items-center"
                  >
                    <Link
                      to={item.to}
                      onFocus={openMega}
                      className={cn(
                        'relative py-2 text-[0.875rem] font-medium whitespace-nowrap shrink-0 inline-flex items-center gap-1 transition-colors',
                        active
                          ? 'text-[var(--color-rust-light)]'
                          : 'text-[var(--color-paper)] hover:text-[var(--color-cream)]'
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown
                        size={14}
                        className={cn(
                          'transition-transform duration-200',
                          megaOpen && 'rotate-180 text-[var(--color-rust-light)]'
                        )}
                      />
                      <span
                        className={cn(
                          'absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-rust)] transition-transform duration-250 origin-left',
                          active ? 'scale-x-100' : 'scale-x-0'
                        )}
                      />
                    </Link>
                  </div>
                );
              }

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    'relative py-2 text-[0.875rem] font-medium whitespace-nowrap shrink-0 transition-colors',
                    active
                      ? 'text-[var(--color-rust-light)]'
                      : 'text-[var(--color-paper)] hover:text-[var(--color-cream)]'
                  )}
                >
                  <span>{item.label}</span>
                  <span
                    className={cn(
                      'absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-rust)] transition-transform duration-250 origin-left',
                      active ? 'scale-x-100' : 'scale-x-0'
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            {BUSINESS.phone && (
              <LinkButton
                href={formatPhoneTel(BUSINESS.phone)}
                variant="outline-on-dark"
                size="sm"
              >
                <Phone size={14} /> {BUSINESS.phone}
              </LinkButton>
            )}
            <LinkButton to="/contact" variant="primary" size="sm">
              Free Estimate
            </LinkButton>
          </div>
        </div>

        {/* MOBILE / TABLET NAVBAR (< 1100px) */}
        <div className="nav-mobile-only nav-mobile-inner">
          <Link
            to="/"
            className="nav-mobile-brand text-[var(--color-cream)]"
            aria-label={`${BUSINESS.name} — Home`}
          >
            <img
              src={BUSINESS.logo}
              alt={BUSINESS.name}
              className="nav-mobile-logo rounded-full"
            />
            <span className="font-display font-bold text-[0.95rem] tracking-tight text-[var(--color-cream)] truncate">
              {BUSINESS.shortName}
            </span>
          </Link>

          <div className="nav-mobile-actions">
            <LinkButton
              to="/contact"
              variant="primary"
              size="sm"
              magnetic={false}
              className="nav-mobile-estimate"
            >
              Estimate
            </LinkButton>
            <button
              ref={hamburgerRef}
              type="button"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
              className="btn btn--outline-on-dark btn--sm !min-w-[44px] !min-h-[44px] !p-0"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        <MegaMenu open={megaOpen} onClose={() => setMegaOpen(false)} />
      </header>

      <MobileMenu
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false);
          requestAnimationFrame(() => hamburgerRef.current?.focus());
        }}
      />
    </>
  );
};
