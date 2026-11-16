import React from 'react';
import { useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { CtaBand } from '../../components/sections/CtaBand';

export default function TestimonialsPage() {
  useSeo({
    title: 'Customer Reviews | Crossroads Garage & Fence Co.',
    description:
      'Read sample customer feedback for garage door repair, new door installations, and custom wood, vinyl, and aluminum fence builds across Central Indiana.',
    path: '/testimonials',
  });

  return (
    <>
      <PageHero
        imageKey="carriageExterior"
        kicker="Homeowner Feedback · Central Indiana"
        title="Built to earn"
        italicAccent="repeat calls."
        subtitle="Filter sample reviews below by garage door repair, new door installation, or custom fence and gate construction."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Testimonials' }]}
      />

      <TestimonialsSection limit={12} showAllLink={false} />

      <CtaBand />
    </>
  );
}
