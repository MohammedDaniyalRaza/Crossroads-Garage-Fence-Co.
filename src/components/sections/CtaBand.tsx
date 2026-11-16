import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { LinkButton } from '../ui/Button';
import { SmartImage, ImageKey } from '../ui/SmartImage';

interface CtaBandProps {
  title?: string;
  subtitle?: string;
  imageKey?: ImageKey;
}

export const CtaBand: React.FC<CtaBandProps> = ({
  title = 'Ready for an honest look at your door or fence line?',
  subtitle = 'Tell us what is going on and which Indiana town you are in. We bring accurate on-site measurements, itemized quotes, and parts stocked on the truck.',
  imageKey = 'cleanDrivewayHome',
}) => {
  return (
    <section
      data-surface="dark"
      className="relative py-20 sm:py-24 bg-[var(--color-charcoal-deep)] text-[var(--color-cream)] overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <SmartImage imageKey={imageKey} aspectRatio="16 / 9" className="w-full h-full" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10 bg-gradient-to-r from-[#121110] via-[rgba(18,17,16,0.88)] to-[rgba(18,17,16,0.72)]"
      />

      <div className="container-arch relative z-20">
        <div className="max-w-[760px] reg-frame p-6 sm:p-10 bg-[rgba(18,17,16,0.72)] border border-[rgba(243,237,226,0.16)]">
          <p className="spec-kicker text-[var(--color-rust-light)] mb-3">
            {BUSINESS.trustChip} · Free On-Site Measurements
          </p>
          <h2 className="h-section text-[var(--color-cream)] mb-4">{title}</h2>
          <p className="lead-copy text-[var(--color-paper)] mb-7">{subtitle}</p>
          <div className="flex flex-wrap items-center gap-3.5">
            <LinkButton to="/contact" variant="primary" size="lg">
              <span>Request a Free Estimate</span>
              <ArrowRight size={17} />
            </LinkButton>
            {BUSINESS.phone && (
              <LinkButton
                href={formatPhoneTel(BUSINESS.phone)}
                variant="outline-on-dark"
                size="lg"
              >
                <Phone size={16} /> Call {BUSINESS.phone}
              </LinkButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
