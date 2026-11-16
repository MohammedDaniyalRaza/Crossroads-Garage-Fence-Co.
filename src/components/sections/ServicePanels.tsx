import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { cn } from '../../lib/helpers';
import { SmartImage, ImageKey } from '../ui/SmartImage';
import { LinkButton } from '../ui/Button';

export const ServicePanels: React.FC = () => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);

  return (
    <section data-surface="dark" className="surface-dark section-pad blueprint-grid-dark overflow-hidden">
      <div className="container-arch">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <p className="spec-kicker text-[var(--color-rust-light)] mb-2">
              Core Trade Capabilities
            </p>
            <h2 className="h-section text-[var(--color-cream)] max-w-[18ch]">
              Three divisions. One local crew.
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[0.95rem] text-[var(--color-paper)] max-w-[40ch] hidden sm:block">
              Hover or select a bay panel to inspect sub-services, hardware specs, and direct scope details.
            </p>
            <LinkButton to="/services" variant="outline-on-dark" size="sm">
              Compare All Services
            </LinkButton>
          </div>
        </div>

        {/* Desktop Interactive Sliding Door Panels */}
        <div className="hidden lg:flex gap-3 min-h-[520px]">
          {SERVICES.map((service) => {
            const isActive = activeId === service.id;
            return (
              <div
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onFocus={() => setActiveId(service.id)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveId(service.id);
                  }
                }}
                aria-expanded={isActive}
                className={cn(
                  'relative overflow-hidden border border-[rgba(243,237,226,0.18)] rounded-[var(--radius-xs)] transition-[flex-grow] duration-500 ease-[var(--ease-out-expo)] cursor-pointer flex flex-col justify-between',
                  isActive
                    ? 'flex-[2.4] bg-[var(--color-charcoal-deep)]'
                    : 'flex-[1] bg-[var(--color-charcoal-soft)]'
                )}
              >
                <div
                  className={cn(
                    'absolute inset-0 transition-opacity duration-500',
                    isActive ? 'opacity-40' : 'opacity-20'
                  )}
                >
                  <SmartImage
                    imageKey={service.heroImageKey as ImageKey}
                    aspectRatio="4 / 3"
                    className="w-full h-full"
                  />
                </div>
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[rgba(18,17,16,0.75)] to-[rgba(18,17,16,0.45)]"
                />

                <div className="relative z-10 p-6 flex items-start justify-between gap-4 border-b border-[rgba(243,237,226,0.12)]">
                  <div>
                    <span className="font-mono-spec text-[0.72rem] uppercase tracking-[0.09em] text-[var(--color-rust-light)]">
                      Bay {service.index}
                    </span>
                    <h3 className="font-display font-bold text-[1.45rem] text-[var(--color-cream)] mt-1 leading-tight">
                      {service.title}
                    </h3>
                  </div>
                  <span className="outline-index text-[3rem] leading-none">{service.index}</span>
                </div>

                <div className="relative z-10 p-6 flex-1 flex flex-col justify-end">
                  {isActive ? (
                    <div className="space-y-5">
                      <p className="text-[0.98rem] text-[var(--color-paper)] max-w-[54ch] leading-relaxed">
                        {service.tagline}
                      </p>

                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[rgba(243,237,226,0.14)]">
                        {service.subServices.map((sub) => (
                          <Link
                            key={sub.id}
                            to={`${service.slug}#${sub.id}`}
                            className="p-3 bg-[rgba(18,17,16,0.78)] border border-[rgba(243,237,226,0.16)] hover:border-[var(--color-rust)] rounded-[var(--radius-xs)] transition-colors group text-[var(--color-cream)]"
                          >
                            <span className="font-mono-spec text-[0.68rem] text-[var(--color-rust-light)] block">
                              {sub.index}
                            </span>
                            <span className="font-semibold text-[0.9rem] text-[var(--color-cream)] group-hover:text-[var(--color-rust-light)] block mt-0.5">
                              {sub.title}
                            </span>
                          </Link>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <Link
                          to={service.slug}
                          className="inline-flex items-center gap-2 font-mono-spec text-[0.78rem] uppercase tracking-[0.06em] text-[var(--color-rust-light)] hover:text-[var(--color-cream)]"
                        >
                          <span>Full {service.shortTitle} Specs</span>
                          <ArrowUpRight size={15} />
                        </Link>
                        <LinkButton
                          to={`/contact?service=${service.id}`}
                          variant="primary"
                          size="sm"
                        >
                          Estimate This Service
                        </LinkButton>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-[0.875rem] text-[var(--color-steel-light)] line-clamp-3">
                        {service.tagline}
                      </p>
                      <span className="inline-flex items-center gap-1.5 font-mono-spec text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-rust-light)]">
                        Open Bay {service.index} <ArrowUpRight size={13} />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Stacked Door Accordions */}
        <div className="lg:hidden space-y-4">
          {SERVICES.map((service) => {
            const isOpen = activeId === service.id;
            return (
              <div
                key={service.id}
                className="border border-[rgba(243,237,226,0.18)] bg-[var(--color-charcoal-deep)] rounded-[var(--radius-xs)] overflow-hidden"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setActiveId(isOpen ? '' : service.id)}
                  className="w-full p-5 flex items-center justify-between gap-4 text-left cursor-pointer bg-[var(--color-charcoal-deep)] text-[var(--color-cream)] hover:bg-[var(--color-charcoal-soft)] transition-colors"
                >
                  <div>
                    <span className="font-mono-spec text-[0.7rem] text-[var(--color-rust-light)] block mb-1">
                      BAY {service.index}
                    </span>
                    <span className="font-display font-bold text-[1.25rem] text-[var(--color-cream)] block">
                      {service.title}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={cn(
                      'text-[var(--color-rust-light)] transition-transform duration-200 shrink-0',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 space-y-4 border-t border-[rgba(243,237,226,0.12)] pt-4">
                    <SmartImage
                      imageKey={service.heroImageKey as ImageKey}
                      aspectRatio="16 / 9"
                      className="rounded-[var(--radius-xs)]"
                    />
                    <p className="text-[0.95rem] text-[var(--color-paper)]">{service.tagline}</p>
                    <ul className="space-y-2">
                      {service.subServices.map((sub) => (
                        <li key={sub.id}>
                          <Link
                            to={`${service.slug}#${sub.id}`}
                            className="flex items-center justify-between p-3 border border-[rgba(243,237,226,0.16)] rounded-[var(--radius-xs)] text-[0.9rem] text-[var(--color-cream)] hover:border-[var(--color-rust)]"
                          >
                            <span>
                              <span className="font-mono-spec text-[0.7rem] text-[var(--color-rust-light)] mr-2">
                                {sub.index}
                              </span>
                              {sub.title}
                            </span>
                            <ArrowUpRight size={14} className="text-[var(--color-rust-light)]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <LinkButton to={service.slug} variant="outline-on-dark" size="sm">
                        View Specs
                      </LinkButton>
                      <LinkButton
                        to={`/contact?service=${service.id}`}
                        variant="primary"
                        size="sm"
                      >
                        Request Estimate
                      </LinkButton>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
