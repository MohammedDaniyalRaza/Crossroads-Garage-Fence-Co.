import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Phone, ChevronDown, ArrowRight, MapPin } from 'lucide-react';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { PRIMARY_NAV } from '../../data/nav.js';
import { SERVICES } from '../../data/services.js';
import { gsap } from '../../lib/gsap';
import { cn } from '../../lib/helpers';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { LinkButton } from '../ui/Button';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {
  const { pathname } = useLocation();
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const reducedMotion = useReducedMotion();

  // Release scroll lock and close on route change
  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);

        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);

    let ctx: gsap.Context | null = null;
    if (!reducedMotion && dialogRef.current) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          dialogRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.24, ease: 'power2.out' }
        );
        gsap.from('.mm-link-item', {
          y: 14,
          opacity: 0,
          duration: 0.28,
          stagger: 0.03,
          delay: 0.05,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        });
      }, dialogRef);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      ctx?.revert();
    };
  }, [open, onClose, reducedMotion]);

  if (!open) return null;

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      data-surface="dark"
      style={{ zIndex: 950 }}
      className="fixed inset-0 w-full h-dvh bg-[var(--color-charcoal-deep)] text-[var(--color-cream)] overflow-y-auto flex flex-col justify-between"
    >
      {/* Top Bar mirroring Navbar alignment so close sits in exact hamburger position */}
      <div className="h-[var(--nav-height)] shrink-0 border-b border-[rgba(243,237,226,0.14)]">
        <div className="nav-mobile-inner">
          <Link
            to="/"
            onClick={onClose}
            className="nav-mobile-brand text-[var(--color-cream)]"
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

          <button
            ref={closeBtnRef}
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="btn btn--outline-on-dark btn--sm !min-w-[44px] !min-h-[44px] !p-0"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Main Nav Links */}
      <nav aria-label="Mobile links" className="flex-1 px-5 py-6 overflow-y-auto">
        <ul className="space-y-1.5">
          {PRIMARY_NAV.map((item, idx) => {
            if (item.hasMegaMenu) {
              return (
                <li key={item.to} className="mm-link-item border-b border-[rgba(243,237,226,0.1)] pb-2">
                  <div className="flex items-center justify-between gap-3">
                    <Link
                      to={item.to}
                      onClick={onClose}
                      className="py-2 font-display font-bold text-[1.5rem] text-[var(--color-cream)] hover:text-[var(--color-rust-light)] transition-colors"
                    >
                      {item.label}
                    </Link>
                    <button
                      type="button"
                      aria-expanded={servicesExpanded}
                      aria-label="Toggle service sub-links"
                      onClick={() => setServicesExpanded((s) => !s)}
                      className="btn btn--outline-on-dark btn--sm !min-w-[44px] !min-h-[40px] !px-2.5"
                    >
                      <span className="font-mono-spec text-[0.68rem]">SUB</span>
                      <ChevronDown
                        size={15}
                        className={cn(
                          'transition-transform duration-200',
                          servicesExpanded && 'rotate-180'
                        )}
                      />
                    </button>
                  </div>

                  {servicesExpanded && (
                    <div className="mt-2 mb-2 pl-3 border-l border-[var(--color-rust)] space-y-2.5">
                      {SERVICES.map((service) => (
                        <div key={service.id} className="space-y-1">
                          <Link
                            to={service.slug}
                            onClick={onClose}
                            className="block font-semibold text-[0.98rem] text-[var(--color-rust-light)] hover:text-[var(--color-cream)]"
                          >
                            {service.index}. {service.title}
                          </Link>
                          <div className="pl-3 space-y-1">
                            {service.subServices.map((sub) => (
                              <Link
                                key={sub.id}
                                to={`${service.slug}#${sub.id}`}
                                onClick={onClose}
                                className="block text-[0.86rem] text-[var(--color-paper)] hover:text-[var(--color-cream)] py-0.5"
                              >
                                {sub.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            }

            return (
              <li key={item.to} className="mm-link-item border-b border-[rgba(243,237,226,0.08)]">
                <Link
                  to={item.to}
                  onClick={onClose}
                  className="py-2.5 flex items-baseline justify-between font-display font-bold text-[1.5rem] text-[var(--color-cream)] hover:text-[var(--color-rust-light)] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono-spec text-[0.72rem] text-[var(--color-rust-light)]">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom CTA + Dispatch Hubs */}
      <div
        className="px-5 pt-4 pb-5 border-t border-[rgba(243,237,226,0.14)] bg-[var(--color-charcoal)] space-y-4 shrink-0"
        style={{ paddingBottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex flex-col sm:flex-row gap-2.5">
          <LinkButton to="/contact" onClick={onClose} variant="primary" size="lg" className="w-full">
            <span>Free Estimate</span>
            <ArrowRight size={16} />
          </LinkButton>
          {BUSINESS.phone && (
            <LinkButton
              href={formatPhoneTel(BUSINESS.phone)}
              variant="outline-on-dark"
              size="lg"
              className="w-full"
            >
              <Phone size={16} /> Call {BUSINESS.phone}
            </LinkButton>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-[0.82rem] text-[var(--color-paper)]">
          <span className="font-mono-spec text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-steel-light)]">
            Indiana Hubs
          </span>
          <div className="flex items-center gap-4">
            {BUSINESS.hubs.map((hub) => (
              <Link
                key={hub.id}
                to={hub.route}
                onClick={onClose}
                className="inline-flex items-center gap-1.5 font-mono-spec text-[0.76rem] text-[var(--color-cream)] hover:text-[var(--color-rust-light)]"
              >
                <MapPin size={13} className="text-[var(--color-rust)]" />
                <span>
                  {hub.city}, {hub.state}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
