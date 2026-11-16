import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { AREA_REGIONS } from '../../data/areas.js';
import { BUSINESS } from '../../data/business.js';
import { buildEstimateUrl } from '../../lib/helpers';
import { useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { AreaMapSection } from '../../components/sections/AreaMapSection';
import { Button } from '../../components/ui/Button';
import { CtaBand } from '../../components/sections/CtaBand';

export default function ServiceAreaPage() {
  useSeo({
    title: 'Indiana Service Area | Lafayette, Avon & Greater Indianapolis',
    description:
      'Serving residential and light commercial garage door and fence clients across Lafayette, West Lafayette, Avon, Plainfield, Carmel, Zionsville, and Indianapolis.',
    path: '/service-area',
  });

  return (
    <>
      <PageHero
        imageKey="residentialLot"
        kicker="Dual Dispatch · I-65 & I-70 Corridors"
        title="Central &amp; Northwest"
        italicAccent="Indiana."
        subtitle={BUSINESS.serves}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Service Area' }]}
      />

      <AreaMapSection />

      {/* Regions Breakdown */}
      <section className="surface-paper section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch space-y-10">
          <div>
            <p className="spec-kicker text-[var(--color-rust)] mb-2">Towns By Region</p>
            <h2 className="h-section text-[var(--color-charcoal)]">
              Where our crews roll out daily.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {AREA_REGIONS.map((region) => (
              <div
                key={region.id}
                className="p-6 bg-[var(--color-cream)] border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-3">
                  <span className="font-mono-spec text-[0.72rem] uppercase text-[var(--color-rust)] block">
                    {region.corridor} · {region.hub}
                  </span>
                  <h3 className="font-display font-bold text-[1.3rem] text-[var(--color-charcoal)]">
                    {region.name}
                  </h3>
                  <p className="text-[0.92rem] text-[var(--color-steel-dark)] leading-relaxed">
                    {region.summary}
                  </p>
                  <ul className="pt-2 space-y-2 border-t border-[rgba(28,27,26,0.12)]">
                    {region.towns.map((town) => (
                      <li key={town} className="flex items-center justify-between text-[0.95rem]">
                        <span className="font-medium text-[var(--color-charcoal)]">{town}</span>
                        <Link
                          to={buildEstimateUrl({ town })}
                          className="font-mono-spec text-[0.7rem] text-[var(--color-rust)] hover:underline"
                        >
                          Request Estimate →
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Hub Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            {BUSINESS.hubs.map((hub) => (
              <div
                key={hub.id}
                data-surface="dark"
                className="p-6 bg-[var(--color-charcoal)] text-[var(--color-cream)] rounded-[var(--radius-xs)] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <span className="font-mono-spec text-[0.72rem] text-[var(--color-rust-light)] uppercase">
                    {hub.corridor}
                  </span>
                  <h3 className="font-display font-bold text-[1.35rem] flex items-center gap-2">
                    <MapPin size={18} className="text-[var(--color-rust)]" />
                    <span>
                      {hub.city}, {hub.state} Hub
                    </span>
                  </h3>
                  <p className="text-[0.9rem] text-[var(--color-paper)] max-w-[44ch]">
                    {hub.summary}
                  </p>
                </div>
                <Button to={hub.route} variant="primary" size="md" className="shrink-0">
                  <span>View Hub</span>
                  <ArrowRight size={15} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
