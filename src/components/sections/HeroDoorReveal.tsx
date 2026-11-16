import React, { useEffect, useRef } from 'react';
import { ArrowRight, Phone, MapPin } from 'lucide-react';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLoader } from '../../app/LoaderContext';
import { Button, LinkButton } from '../ui/Button';
import { SmartImage } from '../ui/SmartImage';
import { CrossroadsGlyph } from '../svg/CrossroadsGlyph';

export const HeroDoorReveal: React.FC = () => {
  const { appReady } = useLoader();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const introPlayedRef = useRef(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || reducedMotion || !appReady || introPlayedRef.current) return;
    introPlayedRef.current = true;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.58,
        stagger: 0.075,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.to('.hero-photo-layer', {
        scale: 1.07,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [appReady, reducedMotion]);

  return (
    <section
      ref={heroRef}
      data-surface="dark"
      className="relative min-h-[84svh] md:min-h-[90dvh] pt-[calc(var(--nav-height)+2.25rem)] pb-14 md:pb-20 flex items-end bg-[var(--color-charcoal-deep)] text-[var(--color-cream)] overflow-hidden"
    >
      {/* Background photograph */}
      <div className="hero-photo-layer absolute inset-0 z-0 will-change-transform">
        <SmartImage
          imageKey="heroHome"
          eager
          aspectRatio="16 / 9"
          className="w-full h-full"
        />
      </div>

      {/* Measured contrast scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#121110] via-[rgba(18,17,16,0.72)] to-[rgba(18,17,16,0.34)]"
      />

      {/* Content in normal flow */}
      <div className="container-arch relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-9">
            <div className="hero-stagger flex flex-wrap items-center gap-x-4 gap-y-1.5 font-mono-spec text-[0.76rem] uppercase tracking-[0.1em] text-[var(--color-rust-light)] mb-4">
              <span className="inline-flex items-center gap-1.5">
                <CrossroadsGlyph size={14} color="#D07A4B" />
                <span>{BUSINESS.trustChip}</span>
              </span>
              <span aria-hidden="true" className="text-[var(--color-steel)]">/</span>
              <span className="text-[var(--color-paper)]">Residential &amp; Light Commercial</span>
              <span aria-hidden="true" className="text-[var(--color-steel)]">/</span>
              <span className="text-[var(--color-paper)]">I-65 &amp; I-70 Corridors</span>
            </div>

            <h1 className="hero-stagger h-hero text-[var(--color-cream)] mb-5">
              Built right the{' '}
              <span className="font-serif-accent font-normal text-[var(--color-rust-light)]">
                first time.
              </span>{' '}
              Repaired without the runaround.
            </h1>

            <p className="hero-stagger lead-copy text-[var(--color-paper)] mb-8">
              Garage door diagnostics, new door installations, and deep-set wood, vinyl, and
              aluminum fencing—dispatched out of our Lafayette and Avon hubs across Central and
              Northwest Indiana.
            </p>

            <div className="hero-stagger flex flex-wrap items-center gap-4">
              <LinkButton to="/contact" variant="primary" size="lg">
                <span>Request a Free Estimate</span>
                <ArrowRight size={18} />
              </LinkButton>
              {BUSINESS.phone && (
                <Button
                  href={formatPhoneTel(BUSINESS.phone)}
                  variant="outline-on-dark"
                  size="lg"
                >
                  <Phone size={16} /> Call {BUSINESS.phone}
                </Button>
              )}
              <LinkButton to="/services" variant="outline-on-dark" size="lg">
                Explore Services
              </LinkButton>
            </div>
          </div>

          {/* Road-sign Hub Marker */}
          <div className="lg:col-span-3 hero-stagger">
            <div className="reg-frame p-4 bg-[rgba(18,17,16,0.78)] border border-[rgba(243,237,226,0.16)]">
              <div className="flex items-center justify-between font-mono-spec text-[0.68rem] uppercase tracking-[0.1em] text-[var(--color-rust-light)] pb-2 mb-2.5 border-b border-[rgba(243,237,226,0.12)]">
                <span>Dual Dispatch Hubs</span>
                <span>IN</span>
              </div>
              <div className="space-y-2 text-[0.875rem]">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-cream)]">
                    <MapPin size={13} className="text-[var(--color-rust)]" /> Lafayette
                  </span>
                  <span className="font-mono-spec text-[0.72rem] text-[var(--color-steel-light)]">
                    I-65 North
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--color-cream)]">
                    <MapPin size={13} className="text-[var(--color-rust)]" /> Avon
                  </span>
                  <span className="font-mono-spec text-[0.72rem] text-[var(--color-steel-light)]">
                    I-70 / Indy
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
