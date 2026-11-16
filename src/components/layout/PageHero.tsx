import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { gsap } from '../../lib/gsap';
import { useGsapContext } from '../../hooks/useGsapContext';
import { LinkButton } from '../ui/Button';
import { SmartImage, ImageKey } from '../ui/SmartImage';

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  imageKey: ImageKey;
  kicker: string;
  title: string;
  italicAccent?: string;
  subtitle: string;
  breadcrumbs: Breadcrumb[];
  ctaLabel?: string;
  ctaTo?: string;
  bottomEdge?: 'picket' | 'panel';
}

export const PageHero: React.FC<PageHeroProps> = ({
  imageKey,
  kicker,
  title,
  italicAccent,
  subtitle,
  breadcrumbs,
  ctaLabel = 'Request a Free Estimate',
  ctaTo = '/contact',
  bottomEdge = 'panel',
}) => {
  const heroRef = useGsapContext<HTMLElement>((_, el) => {
    const bg = el.querySelector('.ph-bg');
    if (bg) {
      gsap.fromTo(
        bg,
        { scale: 1.08, yPercent: -3 },
        {
          scale: 1,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }
    gsap.from('.ph-reveal', {
      y: 20,
      opacity: 0,
      duration: 0.55,
      stagger: 0.07,
      ease: 'power3.out',
      clearProps: 'transform,opacity',
    });
  });

  return (
    <section
      ref={heroRef}
      data-surface="dark"
      className="relative min-h-[54svh] md:min-h-[60dvh] pt-[calc(var(--nav-height)+2.5rem)] pb-16 sm:pb-20 flex items-end bg-[var(--color-charcoal-deep)] text-[var(--color-cream)] overflow-hidden"
    >
      {/* Full-bleed background photo */}
      <div className="ph-bg absolute inset-0 z-0 will-change-transform">
        <SmartImage
          imageKey={imageKey}
          eager
          aspectRatio="16 / 9"
          className="w-full h-full"
        />
      </div>

      {/* Measured contrast scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-t from-[#121110] via-[rgba(18,17,16,0.78)] to-[rgba(18,17,16,0.48)]"
      />

      <div className="container-arch relative z-20">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="ph-reveal mb-5">
          <ol className="flex flex-wrap items-center gap-2 font-mono-spec text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-steel-light)]">
            {breadcrumbs.map((crumb, i) => (
              <li key={crumb.label} className="inline-flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {crumb.to ? (
                  <Link
                    to={crumb.to}
                    className="text-[var(--color-paper)] hover:text-[var(--color-rust-light)] transition-colors"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--color-rust-light)]">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="max-w-[920px] reg-frame p-4 sm:p-6 bg-[rgba(18,17,16,0.48)] backdrop-blur-[2px] border border-[rgba(243,237,226,0.14)]">
          <p className="ph-reveal font-mono-spec text-[0.75rem] uppercase tracking-[0.12em] text-[var(--color-rust-light)] mb-3">
            {kicker}
          </p>
          <h1 className="ph-reveal h-hero text-[var(--color-cream)] mb-4">
            {title}{' '}
            {italicAccent && (
              <span className="font-serif-accent font-normal text-[var(--color-rust-light)]">
                {italicAccent}
              </span>
            )}
          </h1>
          <p className="ph-reveal lead-copy text-[var(--color-paper)] mb-7">
            {subtitle}
          </p>
          <div className="ph-reveal flex flex-wrap items-center gap-3.5">
            <LinkButton to={ctaTo} variant="primary" size="lg">
              <span>{ctaLabel}</span>
              <ArrowRight size={17} />
            </LinkButton>
            {BUSINESS.phone && (
              <LinkButton
                href={formatPhoneTel(BUSINESS.phone)}
                variant="outline-on-dark"
                size="lg"
              >
                <Phone size={16} /> Call {BUSINESS.phone}
              </LinkButton>
            )}
          </div>
        </div>
      </div>

      {/* Architectural bottom cut */}
      {bottomEdge === 'picket' ? (
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-[18px] bg-[var(--color-cream)] picket-mask-top z-20"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute bottom-0 inset-x-0 h-[6px] bg-[var(--color-rust)] z-20"
        />
      )}
    </section>
  );
};
