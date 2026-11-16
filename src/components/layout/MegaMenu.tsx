import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SERVICES } from '../../data/services.js';
import { LinkButton } from '../ui/Button';

interface MegaMenuProps {
  open: boolean;
  onClose: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div
      data-surface="dark"
      className="nav-desktop-only flex-col absolute left-0 right-0 top-full z-50 bg-[var(--color-charcoal-deep)] text-[var(--color-cream)] border-y border-[rgba(243,237,226,0.16)] shadow-[var(--shadow-workshop)]"
      onMouseLeave={onClose}
    >
      <div className="container-arch py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="border-t border-[rgba(243,237,226,0.14)] pt-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="font-mono-spec text-[0.72rem] text-[var(--color-rust-light)]">
                    SERVICE {service.index}
                  </span>
                  <Link
                    to={service.slug}
                    onClick={onClose}
                    className="inline-flex items-center gap-1 font-mono-spec text-[0.72rem] text-[var(--color-paper)] hover:text-[var(--color-rust-light)]"
                  >
                    Overview <ArrowUpRight size={13} />
                  </Link>
                </div>
                <Link
                  to={service.slug}
                  onClick={onClose}
                  className="block font-display font-bold text-[1.15rem] text-[var(--color-cream)] hover:text-[var(--color-rust-light)] transition-colors mb-3"
                >
                  {service.title}
                </Link>
                <ul className="space-y-1.5 mb-5">
                  {service.subServices.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        to={`${service.slug}#${sub.id}`}
                        onClick={onClose}
                        className="text-[0.88rem] text-[var(--color-steel-light)] hover:text-[var(--color-cream)] transition-colors flex items-baseline gap-2"
                      >
                        <span className="font-mono-spec text-[0.68rem] text-[var(--color-rust)]">
                          {sub.index}
                        </span>
                        <span>{sub.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[rgba(243,237,226,0.12)] flex items-center justify-between gap-4">
          <p className="text-[0.875rem] text-[var(--color-steel-light)]">
            Free on-site measurements and itemized quotes across Lafayette, Avon &amp; Greater Indy.
          </p>
          <div className="flex items-center gap-3 shrink-0">
            <LinkButton
              to="/services"
              onClick={onClose}
              variant="outline-on-dark"
              size="sm"
            >
              All Services →
            </LinkButton>
            <LinkButton
              to="/contact"
              onClick={onClose}
              variant="primary"
              size="sm"
            >
              Request Free Estimate
            </LinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};
