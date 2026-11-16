import React from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, ArrowRight } from 'lucide-react';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { LinkButton } from '../ui/Button';

export const MobileBar: React.FC = () => {
  const { pathname } = useLocation();
  if (pathname === '/contact') return null;

  return (
    <div
      data-surface="dark"
      style={{
        zIndex: 500,
        paddingBottom: 'max(0.625rem, env(safe-area-inset-bottom))',
      }}
      className="sm:hidden fixed bottom-0 left-0 right-0 w-full bg-[var(--color-charcoal-deep)] border-t border-[rgba(243,237,226,0.16)] px-4 py-2.5"
    >
      <div className="flex items-center gap-2.5">
        <LinkButton
          to="/contact"
          variant="primary"
          size="md"
          magnetic={false}
          className="flex-1"
        >
          <span>Request Free Estimate</span>
          <ArrowRight size={16} />
        </LinkButton>
        {BUSINESS.phone && (
          <LinkButton
            href={formatPhoneTel(BUSINESS.phone)}
            variant="outline-on-dark"
            size="md"
            magnetic={false}
            aria-label={`Call ${BUSINESS.phone}`}
          >
            <Phone size={15} />
            <span>Call</span>
          </LinkButton>
        )}
      </div>
    </div>
  );
};
