import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { BUSINESS } from '../../data/business.js';
import { useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { SmartImage } from '../../components/ui/SmartImage';
import { Button } from '../../components/ui/Button';
import { CtaBand } from '../../components/sections/CtaBand';

export default function AboutPage() {
  useSeo({
    title: 'About Crossroads Garage & Fence Co. | Indiana Trade Crew',
    description: BUSINESS.about.lead,
    path: '/about',
  });

  return (
    <>
      <PageHero
        imageKey="shopWrenchWall"
        kicker="Straightforward Trade Work · Lafayette & Avon"
        title="Built on showing up"
        italicAccent="and doing it right."
        subtitle={BUSINESS.about.lead}
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'About' }]}
      />

      {/* Editorial Story & Crew Imagery */}
      <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-block p-3 bg-[var(--color-cream)] border border-[rgba(28,27,26,0.18)] rounded-[var(--radius-xs)]">
              <img
                src={BUSINESS.logoWide}
                alt={BUSINESS.name}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </div>

            <h2 className="h-section text-[var(--color-charcoal)]">
              Mechanical skill meets{' '}
              <span className="font-serif-accent font-normal text-[var(--color-rust)]">
                hands-on construction.
              </span>
            </h2>

            <p className="lead-copy text-[var(--color-charcoal)] font-medium">
              {BUSINESS.about.lead}
            </p>
            <p className="body-copy text-[var(--color-steel-dark)]">{BUSINESS.about.body}</p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button to="/contact" variant="primary" size="md">
                <span>Request a Free Estimate</span>
                <ArrowRight size={16} />
              </Button>
              <Button to="/services" variant="outline-on-light" size="md">
                Explore Our Services
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-stretch">
            <div className="col-span-7">
              <SmartImage
                imageKey="aboutFenceCrewPortrait"
                aspectRatio="3 / 4"
                className="h-full border border-[rgba(28,27,26,0.22)] rounded-[var(--radius-xs)]"
              />
            </div>
            <div className="col-span-5 flex flex-col gap-4">
              <SmartImage
                imageKey="crewSitePlanning"
                aspectRatio="1 / 1"
                className="border border-[rgba(28,27,26,0.22)] rounded-[var(--radius-xs)]"
              />
              <SmartImage
                imageKey="blueprintMeasure"
                aspectRatio="4 / 3"
                className="flex-1 border border-[rgba(28,27,26,0.22)] rounded-[var(--radius-xs)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Core Trade Pillars */}
      <section className="surface-dark section-pad blueprint-grid-dark">
        <div className="container-arch">
          <div className="max-w-[720px] mb-10">
            <p className="spec-kicker text-[var(--color-rust-light)] mb-2">
              How We Operate
            </p>
            <h2 className="h-section text-[var(--color-cream)]">
              Three principles on every driveway and fence line.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BUSINESS.about.pillars.map((pillar) => (
              <div
                key={pillar.index}
                className="p-6 bg-[var(--color-charcoal-deep)] border border-[rgba(243,237,226,0.16)] rounded-[var(--radius-xs)] space-y-3"
              >
                <span className="font-mono-spec text-[0.76rem] text-[var(--color-rust-light)] block">
                  PRINCIPLE {pillar.index}
                </span>
                <h3 className="font-display font-bold text-[1.3rem] text-[var(--color-cream)]">
                  {pillar.title}
                </h3>
                <p className="text-[0.95rem] text-[var(--color-paper)] leading-relaxed">
                  {pillar.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Hubs */}
      <section className="surface-paper section-pad">
        <div className="container-arch">
          <div className="mb-8">
            <p className="spec-kicker text-[var(--color-rust)] mb-2">Dual Operations</p>
            <h2 className="h-section text-[var(--color-charcoal)]">
              Dispatching from Lafayette &amp; Avon.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BUSINESS.hubs.map((hub) => (
              <div
                key={hub.id}
                className="p-6 bg-[var(--color-cream)] border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)] flex flex-col justify-between gap-5"
              >
                <div className="space-y-2.5">
                  <span className="font-mono-spec text-[0.72rem] uppercase text-[var(--color-rust)]">
                    {hub.corridor}
                  </span>
                  <h3 className="font-display font-bold text-[1.35rem] text-[var(--color-charcoal)] flex items-center gap-2">
                    <MapPin size={18} className="text-[var(--color-rust)]" />
                    <span>
                      {hub.city}, {hub.state}
                    </span>
                  </h3>
                  <p className="body-copy text-[var(--color-steel-dark)]">{hub.summary}</p>
                </div>
                <div>
                  <Button to={hub.route} variant="outline-on-light" size="sm">
                    <span>Explore {hub.city} Hub</span>
                    <ArrowRight size={15} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
