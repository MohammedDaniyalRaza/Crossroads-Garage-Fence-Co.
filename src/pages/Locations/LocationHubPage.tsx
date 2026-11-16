import React from 'react';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { LOCATION_HUBS } from '../../data/areas.js';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { SERVICES } from '../../data/services.js';
import { buildEstimateUrl } from '../../lib/helpers';
import { useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { ImageKey } from '../../components/ui/SmartImage';
import { Button } from '../../components/ui/Button';
import { CtaBand } from '../../components/sections/CtaBand';

interface LocationHubPageProps {
  hubId: 'lafayette' | 'avon';
}

export default function LocationHubPage({ hubId }: LocationHubPageProps) {
  const hub = LOCATION_HUBS[hubId];
  const otherHub = hubId === 'lafayette' ? LOCATION_HUBS.avon : LOCATION_HUBS.lafayette;

  useSeo({
    title: `${hub.city}, IN Garage Door & Fence Hub | Crossroads Garage & Fence Co.`,
    description: hub.intro,
    path: hub.slug,
  });

  return (
    <>
      <PageHero
        imageKey={hub.heroImageKey as ImageKey}
        kicker={hub.kicker}
        title={hub.title}
        subtitle={hub.intro}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Service Area', to: '/service-area' },
          { label: `${hub.city} Hub` },
        ]}
        ctaLabel={`Request Estimate in ${hub.city}`}
        ctaTo={buildEstimateUrl({ town: hub.city })}
      />

      {/* What We Do From This Hub */}
      <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="spec-kicker text-[var(--color-rust)]">
                Local Operations · {hub.city}, {hub.state}
              </p>
              <h2 className="h-section text-[var(--color-charcoal)]">
                What we dispatch from {hub.city}.
              </h2>
              <p className="body-copy text-[var(--color-steel-dark)]">{hub.corridorNote}</p>

              {(hub.address || BUSINESS.streetAddress || BUSINESS.phone) && (
                <div className="p-4 bg-[var(--color-paper)] border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)] space-y-2 text-[0.9rem]">
                  {(hub.address || BUSINESS.streetAddress) && (
                    <p className="flex items-center gap-2 font-medium">
                      <MapPin size={15} className="text-[var(--color-rust)]" />
                      <span>{hub.address || BUSINESS.streetAddress}</span>
                    </p>
                  )}
                  {BUSINESS.phone && (
                    <p className="flex items-center gap-2 font-medium">
                      <Phone size={15} className="text-[var(--color-rust)]" />
                      <a href={formatPhoneTel(BUSINESS.phone)} className="hover:underline">
                        {BUSINESS.phone}
                      </a>
                    </p>
                  )}
                </div>
              )}

              <div className="pt-1 flex flex-wrap gap-3">
                <Button to={buildEstimateUrl({ town: hub.city })} variant="primary" size="md">
                  <span>Book On-Site Measurement</span>
                  <ArrowRight size={16} />
                </Button>
                <Button to={otherHub.slug} variant="outline-on-light" size="md">
                  Switch to {otherHub.city} Hub
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-5">
              {hub.whatWeDoHere.map((item, idx) => (
                <div
                  key={item.title}
                  className="p-6 bg-[var(--color-paper)] border border-[rgba(28,27,26,0.18)] rounded-[var(--radius-xs)] space-y-2"
                >
                  <span className="font-mono-spec text-[0.72rem] text-[var(--color-rust)]">
                    0{idx + 1} · {hub.city.toUpperCase()} DISPATCH
                  </span>
                  <h3 className="font-display font-bold text-[1.2rem] text-[var(--color-charcoal)]">
                    {item.title}
                  </h3>
                  <p className="body-copy text-[var(--color-steel-dark)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Towns Served & Core Services */}
      <section data-surface="dark" className="surface-dark section-pad blueprint-grid-dark">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-5">
            <p className="spec-kicker text-[var(--color-rust-light)]">
              Nearby Coverage
            </p>
            <h2 className="h-section text-[var(--color-cream)]">
              Towns served from our {hub.city} crew.
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {hub.townsServed.map((town) => (
                <Button
                  key={town}
                  to={buildEstimateUrl({ town })}
                  variant="outline-on-dark"
                  size="sm"
                  className="justify-between"
                >
                  <span>{town}, IN</span>
                  <ArrowRight size={14} />
                </Button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <p className="spec-kicker text-[var(--color-rust-light)]">
              Services Available
            </p>
            <div className="space-y-3">
              {SERVICES.map((s) => (
                <Button
                  key={s.id}
                  to={s.slug}
                  variant="outline-on-dark"
                  size="lg"
                  className="w-full justify-between"
                >
                  <span>
                    {s.index}. {s.title}
                  </span>
                  <ArrowRight size={16} />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
