import React from 'react';
import { ArrowRight } from 'lucide-react';
import { FAQS } from '../../data/faqs.js';
import { Accordion } from '../ui/Accordion';
import { LinkButton } from '../ui/Button';

export const FaqSection: React.FC = () => {
  const preview = FAQS.filter((f) => f.featured).slice(0, 6);

  return (
    <section data-surface="light" className="surface-cream section-pad">
      <div className="container-arch">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
            <p className="spec-kicker text-[var(--color-rust)]">
              Common Field Questions
            </p>
            <h2 className="h-section text-[var(--color-charcoal)]">
              Straight answers before we{' '}
              <span className="font-serif-accent font-normal text-[var(--color-rust)]">
                roll out.
              </span>
            </h2>
            <p className="body-copy text-[var(--color-steel-dark)]">
              From single-visit spring repairs to concrete post depth below the Indiana frost line,
              here is how our crew approaches the work.
            </p>
            <div className="pt-2">
              <LinkButton to="/faq" variant="outline-on-light" size="md">
                <span>Browse All 20 FAQs</span>
                <ArrowRight size={16} />
              </LinkButton>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Accordion
              defaultOpenId={preview[0]?.id}
              items={preview.map((f) => ({
                id: f.id,
                question: f.question,
                answer: f.answer,
                meta: f.category,
              }))}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
