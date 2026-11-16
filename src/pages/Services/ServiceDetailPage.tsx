import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES, getServiceBySlug } from '../../data/services.js';
import { PROJECTS } from '../../data/projects.js';
import { buildFaqSchema, buildServiceSchema, useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { SmartImage, ImageKey } from '../../components/ui/SmartImage';
import { Stepper } from '../../components/ui/Stepper';
import { Accordion } from '../../components/ui/Accordion';
import { Button } from '../../components/ui/Button';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { CtaBand } from '../../components/sections/CtaBand';

interface ServiceDetailPageProps {
  serviceId: string;
}

export default function ServiceDetailPage({ serviceId }: ServiceDetailPageProps) {
  const service = getServiceBySlug(serviceId) || SERVICES[0];
  const related = SERVICES.filter((s) => s.id !== service.id);

  const matchingProjects = PROJECTS.filter((p) => {
    if (service.id === 'garage-door-repair') return p.category === 'Garage Door Repair';
    if (service.id === 'new-garage-door-installation') return p.category === 'New Doors';
    return p.category === 'Wood Fences' || p.category === 'Vinyl & Aluminum' || p.category === 'Gates';
  }).slice(0, 3);

  useSeo({
    title: `${service.title} | Crossroads Garage & Fence Co.`,
    description: service.tagline,
    path: service.slug,
    jsonLd: [buildServiceSchema(service), buildFaqSchema(service.faqs)],
  });

  return (
    <>
      <PageHero
        imageKey={service.heroImageKey as ImageKey}
        kicker={service.categoryLabel}
        title={service.title}
        subtitle={service.tagline}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.shortTitle },
        ]}
        ctaLabel={`Estimate ${service.shortTitle}`}
        ctaTo={`/contact?service=${service.id}`}
      />

      {/* Overview & Materials Spec */}
      <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-4">
            <p className="spec-kicker text-[var(--color-rust)]">Scope Overview</p>
            <h2 className="h-section text-[var(--color-charcoal)]">
              Built right on every Indiana job site.
            </h2>
            <p className="lead-copy text-[var(--color-steel-dark)]">{service.overview}</p>
            <div className="pt-2">
              <Button to={`/contact?service=${service.id}`} size="md">
                <span>Schedule Free On-Site Estimate</span>
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 reg-frame p-6 bg-[var(--color-paper)] border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)]">
            <span className="font-mono-spec text-[0.74rem] uppercase tracking-[0.08em] text-[var(--color-rust)] block mb-4">
              Hardware &amp; Material Specs
            </span>
            <dl className="divide-y divide-[rgba(28,27,26,0.12)]">
              {service.materials.map((m) => (
                <div key={m.label} className="py-3 first:pt-0 last:pb-0">
                  <dt className="font-mono-spec text-[0.72rem] uppercase text-[var(--color-steel-dark)]">
                    {m.label}
                  </dt>
                  <dd className="font-semibold text-[0.95rem] text-[var(--color-charcoal)] mt-0.5">
                    {m.spec}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Anchored Sub-Service Sections */}
      <section className="surface-paper section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch space-y-16">
          <div>
            <p className="spec-kicker text-[var(--color-rust)] mb-2">Detailed Breakdown</p>
            <h2 className="h-section text-[var(--color-charcoal)]">
              What we repair, frame, and install.
            </h2>
          </div>

          {service.subServices.map((sub, idx) => (
            <article
              key={sub.id}
              id={sub.id}
              className="scroll-mt-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-10 border-t border-[var(--line-dark)]"
            >
              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <SmartImage
                  imageKey={sub.imageKey as ImageKey}
                  aspectRatio="4 / 3"
                  className="border border-[rgba(28,27,26,0.22)] rounded-[var(--radius-xs)] shadow-[var(--shadow-card)]"
                />
              </div>

              <div className={`lg:col-span-7 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <span className="font-mono-spec text-[0.76rem] font-semibold text-[var(--color-rust)] block">
                  SPEC {sub.index}
                </span>
                <h3 className="h-sub text-[var(--color-charcoal)]">{sub.title}</h3>
                <p className="lead-copy text-[var(--color-steel-dark)]">{sub.summary}</p>

                <div className="pt-2">
                  <span className="font-mono-spec text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-charcoal)] block mb-2.5">
                    What&apos;s Included
                  </span>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {sub.included.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-[0.92rem] text-[var(--color-charcoal)]"
                      >
                        <Check size={16} className="text-[var(--color-rust)] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Button
                    to={`/contact?service=${service.id}&style=${encodeURIComponent(sub.title)}`}
                    variant="outline-on-light"
                    size="sm"
                  >
                    Ask About {sub.title}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="surface-dark section-pad blueprint-grid-dark">
        <div className="container-arch">
          <div className="mb-10">
            <p className="spec-kicker text-[var(--color-rust-light)] mb-2">
              Step-by-Step Workflow
            </p>
            <h2 className="h-section text-[var(--color-cream)]">
              How {service.shortTitle} works on your property.
            </h2>
          </div>
          <Stepper steps={service.process} darkSurface />
        </div>
      </section>

      {/* Sample Gallery Strip */}
      <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="spec-kicker text-[var(--color-rust)] mb-2">
                Sample Reference Work
              </p>
              <h2 className="h-sub text-[var(--color-charcoal)]">
                Recent {service.shortTitle} examples across Indiana
              </h2>
            </div>
            <Link
              to="/projects"
              className="font-mono-spec text-[0.76rem] uppercase tracking-[0.06em] text-[var(--color-rust)] hover:underline"
            >
              Browse All Projects →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {matchingProjects.map((proj) => (
              <div
                key={proj.id}
                className="border border-[rgba(28,27,26,0.18)] bg-[var(--color-paper)] rounded-[var(--radius-xs)] overflow-hidden"
              >
                <SmartImage
                  imageKey={proj.imageKey as ImageKey}
                  aspectRatio="4 / 3"
                  showSampleTag
                />
                <div className="p-4 space-y-1.5">
                  <span className="font-mono-spec text-[0.7rem] text-[var(--color-rust)]">
                    {proj.town} · {proj.category}
                  </span>
                  <h3 className="font-display font-bold text-[1.05rem] text-[var(--color-charcoal)]">
                    {proj.title}
                  </h3>
                  <p className="text-[0.875rem] text-[var(--color-steel-dark)]">{proj.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filtered Testimonials */}
      <TestimonialsSection
        limit={3}
        serviceFilterDefault={service.id}
        showAllLink
      />

      {/* Service FAQs + Related Services */}
      <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
        <div className="container-arch grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <p className="spec-kicker text-[var(--color-rust)] mb-2">
              {service.shortTitle} Questions
            </p>
            <h2 className="h-section text-[var(--color-charcoal)] mb-6">
              Frequently asked about this work.
            </h2>
            <Accordion
              defaultOpenId={`${service.id}-faq-0`}
              items={service.faqs.map((f, i) => ({
                id: `${service.id}-faq-${i}`,
                question: f.q,
                answer: f.a,
              }))}
            />
          </div>

          <aside className="lg:col-span-4 space-y-5">
            <p className="spec-kicker text-[var(--color-rust)]">Related Divisions</p>
            {related.map((rel) => (
              <Link
                key={rel.id}
                to={rel.slug}
                className="block p-5 bg-[var(--color-paper)] border border-[rgba(28,27,26,0.18)] hover:border-[var(--color-rust)] rounded-[var(--radius-xs)] transition-colors space-y-2"
              >
                <span className="font-mono-spec text-[0.7rem] text-[var(--color-rust)]">
                  SERVICE {rel.index}
                </span>
                <h3 className="font-display font-bold text-[1.1rem] text-[var(--color-charcoal)]">
                  {rel.title}
                </h3>
                <p className="text-[0.875rem] text-[var(--color-steel-dark)]">{rel.tagline}</p>
              </Link>
            ))}
          </aside>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
