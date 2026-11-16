import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { TESTIMONIALS } from '../../data/testimonials.js';
import { ChipToggle } from '../ui/ChipToggle';
import { LinkButton } from '../ui/Button';

interface TestimonialsSectionProps {
  limit?: number;
  serviceFilterDefault?: string;
  showAllLink?: boolean;
}

const FILTERS = [
  { id: 'all', label: 'All Work' },
  { id: 'garage-door-repair', label: 'Door Repair' },
  { id: 'new-garage-door-installation', label: 'New Doors' },
  { id: 'fence-and-gate-construction', label: 'Fences & Gates' },
];

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  limit = 6,
  serviceFilterDefault = 'all',
  showAllLink = true,
}) => {
  const [filter, setFilter] = useState(serviceFilterDefault);

  const visible = TESTIMONIALS.filter((t) =>
    filter === 'all' ? true : t.serviceId === filter
  ).slice(0, limit);

  return (
    <section data-surface="light" className="surface-paper section-pad border-b border-[var(--line-dark)]">
      <div className="container-arch">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
          <div>
            <p className="spec-kicker text-[var(--color-rust)] mb-2">
              Customer Feedback · Sample Reviews
            </p>
            <h2 className="h-section text-[var(--color-charcoal)]">
              Word around{' '}
              <span className="font-serif-accent font-normal text-[var(--color-rust)]">
                Central Indiana.
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter customer reviews">
            {FILTERS.map((f) => (
              <ChipToggle
                key={f.id}
                label={f.label}
                selected={filter === f.id}
                onClick={() => setFilter(f.id)}
              />
            ))}
          </div>
        </div>

        {/* Staggered Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((item, idx) => (
            <article
              key={item.id}
              className={`p-6 bg-[var(--color-cream)] border border-[rgba(28,27,26,0.18)] rounded-[var(--radius-xs)] flex flex-col justify-between gap-5 ${
                idx % 3 === 1 ? 'lg:translate-y-4' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-[rgba(28,27,26,0.12)] font-mono-spec text-[0.7rem]">
                  <span className="text-[var(--color-rust)] uppercase">{item.serviceLabel}</span>
                  <span className="text-[var(--color-steel-dark)]">{item.town}</span>
                </div>
                <blockquote className="text-[0.98rem] text-[var(--color-charcoal)] leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <footer className="pt-3 border-t border-[rgba(28,27,26,0.1)] flex items-baseline justify-between gap-3">
                <span className="font-display font-bold text-[1rem] text-[var(--color-charcoal)]">
                  {item.name}
                </span>
                <span className="font-mono-spec text-[0.72rem] text-[var(--color-steel-dark)] text-right">
                  {item.jobDetail}
                </span>
              </footer>
            </article>
          ))}
        </div>

        {showAllLink && (
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[rgba(28,27,26,0.14)]">
            <p className="font-mono-spec text-[0.72rem] text-[var(--color-steel-dark)]">
              Sample homeowner reviews across Lafayette, Avon, and surrounding Indiana towns.
            </p>
            <LinkButton to="/testimonials" variant="outline-on-light" size="md">
              <span>Read All Reviews</span>
              <ArrowRight size={16} />
            </LinkButton>
          </div>
        )}
      </div>
    </section>
  );
};
