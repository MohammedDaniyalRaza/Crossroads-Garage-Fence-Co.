import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useSeo } from '../../lib/seo';
import { PageHero } from '../../components/layout/PageHero';
import { Button } from '../../components/ui/Button';

export default function NotFoundPage() {
  useSeo({
    title: 'Page Not Found | Crossroads Garage & Fence Co.',
    description: 'The page you were looking for could not be found. Return to Crossroads Garage & Fence Co.',
  });

  return (
    <>
      <PageHero
        imageKey="sunsetPostFence"
        kicker="Error 404 · Off the Route"
        title="Wrong turn at the"
        italicAccent="crossroads."
        subtitle="That page or job reference is not at this address. Head back to our main services, service area map, or request a free estimate directly."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: '404' }]}
        ctaLabel="Back to Home"
        ctaTo="/"
      />

      <section data-surface="light" className="surface-cream section-pad">
        <div className="container-arch flex flex-wrap items-center gap-4">
          <Button to="/" variant="primary" size="md">
            <span>Go Home</span>
            <ArrowRight size={16} />
          </Button>
          <Button to="/services" variant="outline-on-light" size="md">
            View Services
          </Button>
          <Button to="/service-area" variant="outline-on-light" size="md">
            Check Indiana Service Area
          </Button>
          <Button to="/contact" variant="dark" size="md">
            Request Free Estimate
          </Button>
        </div>
      </section>
    </>
  );
}
