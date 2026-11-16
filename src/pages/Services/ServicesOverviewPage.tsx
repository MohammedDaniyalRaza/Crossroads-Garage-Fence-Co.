import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { SmartImage, ImageKey } from '../../components/ui/SmartImage';
import { Button } from '../../components/ui/Button';
import { CtaBand } from '../../components/sections/CtaBand';

const PRICE_FACTORS = [
  {
    code: '01',
    title: 'Garage Door Size & Insulation',
    detail:
      'Single-car bays, double residential openings, and tall pole-barn doors require different section counts, strut bracing, and spring assemblies. Multi-layer insulated steel also differs from single-layer or full-view aluminum glass.',
  },
  {
    code: '02',
    title: 'Track, Jamb & Hardware Condition',
    detail:
      'A straightforward spring or cable swap costs far less than rebuilding bent tracks, replacing rotted wood framing bucks, or upgrading a stripped opener rail.',
  },
  {
    code: '03',
    title: 'Fence Linear Footage, Grade & Material',
    detail:
      'Total run length, corner count, Indiana clay or tree-root excavation, sloped-yard stepping/racking, and your choice of pressure-treated pine, Western Red Cedar, vinyl, or aluminum all shape the quote.',
  },
  {
    code: '04',
    title: 'Gate Widths & Framing',
    detail:
      'Single walk gates and wide double drive-through gates require larger concrete hinge-post footings, welded or cross-braced sub-frames, and heavy-duty strap hardware.',
  },
];

const FENCE_COMPARISON = [
  {
    material: 'Pressure-Treated Pine',
    look: 'Traditional warm woodgrain that weathers silver-gray naturally or accepts stain after curing.',
    maintenance: 'Periodic cleaning and optional sealing or staining every few years to slow checking.',
    longevity: 'Built for years of yard service when posts are set in concrete below the frost line.',
    bestFor: 'Full backyard privacy, shadowbox lines, and cost-conscious perimeter runs.',
  },
  {
    material: 'Western Red Cedar',
    look: 'Rich reddish-brown heartwood tone with tight knots and straight, clean picket lines.',
    maintenance: 'Light wash and UV-inhibiting clear or semi-transparent stain keeps natural cedar color.',
    longevity: 'Naturally rot- and insect-resistant lumber that resists warping in humid summers.',
    bestFor: 'High-visibility privacy fences, custom front pickets, and architectural curb appeal.',
  },
  {
    material: 'Heavy-Wall Vinyl',
    look: 'Crisp, uniform opaque panels with clean top rails and matching caps.',
    maintenance: 'Minimal—rinses clean with a garden hose; never needs sanding, painting, or staining.',
    longevity: 'UV-stabilized panels built not to peel, splinter, or attract wood-boring insects.',
    bestFor: 'Homeowners prioritizing zero-stain upkeep and solid privacy screening.',
  },
  {
    material: 'Powder-Coated Aluminum',
    look: 'Open ornamental picket profile preserving sightlines across lawns, gardens, and pools.',
    maintenance: 'Occasional rinse; durable factory powder coat resists chipping and rust.',
    longevity: 'High resistance to moisture and rust across wet Indiana springs and winters.',
    bestFor: 'Pool enclosures, sloped lots, and properties backing onto trees or ponds.',
  },
];

export default function ServicesOverviewPage() {
  useSeo({
    title: 'Garage Door & Fence Services | Crossroads Garage & Fence Co.',
    description:
      'Explore garage door repair, new residential and pole-barn garage door installation, and custom wood, vinyl, and aluminum fence construction across Indiana.',
    path: '/services',
  });

  return (
    <>
      <PageHero
        imageKey="crewSitePlanning"
        kicker="Full Trade Scope · Lafayette & Avon"
        title="Doors, openers, and fences built for"
        italicAccent="daily use."
        subtitle="Three specialized divisions under one roof: fast mechanical repair, precision-fitted new garage doors, and deep-set perimeter fencing and gates."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
      />

      {/* 3 Service Groups */}
      <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch space-y-16">
          {SERVICES.map((service, idx) => (
            <article
              key={service.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-10 first:pt-0 border-t first:border-t-0 border-[var(--line-dark)]"
            >
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="reg-frame p-2 border border-[rgba(28,27,26,0.22)] bg-[var(--color-paper)] rounded-[var(--radius-xs)]">
                  <SmartImage
                    imageKey={service.heroImageKey as ImageKey}
                    aspectRatio="4 / 3"
                  />
                </div>
              </div>

              <div className={`lg:col-span-7 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="flex items-center justify-between gap-4">
                  <span className="spec-kicker text-[var(--color-rust)]">
                    {service.categoryLabel}
                  </span>
                  <span className="outline-index text-[2.6rem]">{service.index}</span>
                </div>
                <h2 className="h-section text-[var(--color-charcoal)]">{service.title}</h2>
                <p className="lead-copy text-[var(--color-steel-dark)]">{service.overview}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {service.subServices.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`${service.slug}#${sub.id}`}
                      className="p-4 bg-[var(--color-paper)] border border-[rgba(28,27,26,0.16)] hover:border-[var(--color-rust)] rounded-[var(--radius-xs)] transition-colors"
                    >
                      <span className="font-mono-spec text-[0.7rem] text-[var(--color-rust)] block">
                        {sub.index}
                      </span>
                      <span className="font-display font-bold text-[1rem] text-[var(--color-charcoal)] block mt-0.5">
                        {sub.title}
                      </span>
                      <span className="text-[0.86rem] text-[var(--color-steel-dark)] block mt-1 leading-snug">
                        {sub.summary}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3.5 pt-2">
                  <Button to={service.slug} variant="dark" size="md">
                    <span>View Full {service.shortTitle} Page</span>
                    <ArrowRight size={16} />
                  </Button>
                  <Button to={`/contact?service=${service.id}`} variant="primary" size="md">
                    Request Free Estimate
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* What Affects the Price */}
      <section data-surface="dark" className="surface-dark section-pad blueprint-grid-dark">
        <div className="container-arch">
          <div className="max-w-[740px] mb-10">
            <p className="spec-kicker text-[var(--color-rust-light)] mb-2">
              Honest Estimating · Zero Guesswork Numbers
            </p>
            <h2 className="h-section text-[var(--color-cream)] mb-4">
              What actually shapes your quote.
            </h2>
            <p className="lead-copy text-[var(--color-paper)]">
              Every driveway framing, torsion assembly, and backyard slope is different. Rather
              than tossing out teaser numbers that change on-site, we measure your property free of
              charge and hand you an itemized quote based on four real job factors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRICE_FACTORS.map((item) => (
              <div
                key={item.code}
                className="p-6 bg-[var(--color-charcoal-deep)] border border-[rgba(243,237,226,0.16)] rounded-[var(--radius-xs)] space-y-2.5"
              >
                <span className="font-mono-spec text-[0.75rem] text-[var(--color-rust-light)]">
                  FACTOR {item.code}
                </span>
                <h3 className="font-display font-bold text-[1.2rem] text-[var(--color-cream)]">
                  {item.title}
                </h3>
                <p className="text-[0.94rem] text-[var(--color-paper)] leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fence Material Comparison Table */}
      <section className="surface-paper section-pad">
        <div className="container-arch">
          <div className="max-w-[740px] mb-9">
            <p className="spec-kicker text-[var(--color-rust)] mb-2">
              Fencing Material Spec Sheet
            </p>
            <h2 className="h-section text-[var(--color-charcoal)] mb-3">
              Wood vs. Vinyl vs. Aluminum Fencing
            </h2>
            <p className="body-copy text-[var(--color-steel-dark)]">
              Compare how each fence material handles upkeep, curb appearance, and Indiana seasons
              before we walk your property line.
            </p>
          </div>

          <div className="overflow-x-auto border border-[rgba(28,27,26,0.22)] bg-[var(--color-cream)] rounded-[var(--radius-xs)]">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-[var(--color-charcoal)] text-[var(--color-cream)] font-mono-spec text-[0.74rem] uppercase tracking-[0.07em]">
                  <th className="p-4 border-b border-[rgba(243,237,226,0.16)]">Material</th>
                  <th className="p-4 border-b border-[rgba(243,237,226,0.16)]">Look &amp; Finish</th>
                  <th className="p-4 border-b border-[rgba(243,237,226,0.16)]">Upkeep</th>
                  <th className="p-4 border-b border-[rgba(243,237,226,0.16)]">Durability</th>
                  <th className="p-4 border-b border-[rgba(243,237,226,0.16)]">Common Fit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(28,27,26,0.14)] text-[0.92rem]">
                {FENCE_COMPARISON.map((row) => (
                  <tr key={row.material} className="align-top hover:bg-[rgba(234,226,211,0.5)]">
                    <td className="p-4 font-display font-bold text-[var(--color-charcoal)] whitespace-nowrap">
                      <span className="inline-flex items-center gap-2">
                        <Check size={14} className="text-[var(--color-rust)]" />
                        {row.material}
                      </span>
                    </td>
                    <td className="p-4 text-[var(--color-steel-dark)]">{row.look}</td>
                    <td className="p-4 text-[var(--color-steel-dark)]">{row.maintenance}</td>
                    <td className="p-4 text-[var(--color-steel-dark)]">{row.longevity}</td>
                    <td className="p-4 text-[var(--color-charcoal)] font-medium">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
