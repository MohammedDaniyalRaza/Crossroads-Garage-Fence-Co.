import React, { useState } from 'react';
import { FAQ_CATEGORIES, FAQS } from '../../data/faqs.js';
import { buildFaqSchema, useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { Tabs } from '../../components/ui/Tabs';
import { Accordion } from '../../components/ui/Accordion';
import { CtaBand } from '../../components/sections/CtaBand';

export default function FaqPage() {
  const [category, setCategory] = useState('All');

  useSeo({
    title: 'Garage Door & Fence FAQ | Crossroads Garage & Fence Co.',
    description:
      'Answers on broken spring repairs, single-panel replacements, Indiana frost-line fence post depth, free on-site estimates, and service coverage.',
    path: '/faq',
    jsonLd: buildFaqSchema(FAQS),
  });

  const filtered = FAQS.filter((f) => (category === 'All' ? true : f.category === category));

  return (
    <>
      <PageHero
        imageKey="blueprintMeasure"
        kicker="Answers & Specs · 20 Common Questions"
        title="Straight answers on"
        italicAccent="doors & fences."
        subtitle="Honest guidance on torsion spring safety, opener troubleshooting, frost-line concrete footings, permits, and how our free on-site estimates work."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'FAQ' }]}
      />

      <section className="surface-cream section-pad">
        <div className="container-arch space-y-8">
          <div className="space-y-4">
            <p className="spec-kicker text-[var(--color-rust)]">Browse By Topic</p>
            <Tabs
              tabs={FAQ_CATEGORIES.map((cat) => ({
                id: cat,
                label: cat,
                count:
                  cat === 'All'
                    ? FAQS.length
                    : FAQS.filter((f) => f.category === cat).length,
              }))}
              activeId={category}
              onChange={setCategory}
            />
          </div>

          <div className="max-w-[960px]">
            <Accordion
              defaultOpenId={filtered[0]?.id}
              items={filtered.map((f) => ({
                id: f.id,
                question: f.question,
                answer: f.answer,
                meta: f.category,
              }))}
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
