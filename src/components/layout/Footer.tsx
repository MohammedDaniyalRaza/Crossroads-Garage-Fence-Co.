import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail, MapPin, Phone } from 'lucide-react';
import { BUSINESS, formatPhoneTel } from '../../data/business.js';
import { FOOTER_LINKS } from '../../data/nav.js';
import { PicketDivider } from '../svg/PicketDivider';
import { LinkButton } from '../ui/Button';

export const Footer: React.FC = () => {
  return (
    <footer
      data-surface="dark"
      className="relative bg-[var(--color-charcoal-deep)] text-[var(--color-cream)]"
    >
      <PicketDivider topColor="transparent" bottomColor="var(--color-charcoal-deep)" />

      <div className="container-arch pt-14 pb-24 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[rgba(243,237,226,0.14)]">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3.5 text-[var(--color-cream)]">
              <img
                src={BUSINESS.logo}
                alt={BUSINESS.name}
                className="w-14 h-14 rounded-full object-contain"
              />
              <div>
                <span className="block font-display font-bold text-[1.15rem] text-[var(--color-cream)]">
                  {BUSINESS.name}
                </span>
                <span className="block font-mono-spec text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-rust-light)]">
                  {BUSINESS.trustChip}
                </span>
              </div>
            </Link>

            <p className="text-[0.95rem] text-[var(--color-paper)] leading-relaxed max-w-[44ch]">
              {BUSINESS.serves}
            </p>

            {/* Dual Hubs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {BUSINESS.hubs.map((hub) => (
                <Link
                  key={hub.id}
                  to={hub.route}
                  className="p-3.5 border border-[rgba(243,237,226,0.16)] rounded-[var(--radius-xs)] hover:border-[var(--color-rust)] transition-colors group text-[var(--color-cream)]"
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-mono-spec text-[0.72rem] text-[var(--color-rust-light)] uppercase">
                      {hub.label}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-[var(--color-steel-light)] group-hover:text-[var(--color-rust-light)]"
                    />
                  </div>
                  <p className="font-display font-bold text-[1rem] text-[var(--color-cream)] flex items-center gap-1.5">
                    <MapPin size={14} className="text-[var(--color-rust)]" />
                    <span>
                      {hub.city}, {hub.state}
                    </span>
                  </p>
                  <p className="text-[0.78rem] text-[var(--color-steel-light)] mt-1">
                    {hub.corridor}
                  </p>
                </Link>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <LinkButton to="/contact" variant="primary" size="md">
                Request a Free Estimate
              </LinkButton>
              {BUSINESS.phone && (
                <LinkButton
                  href={formatPhoneTel(BUSINESS.phone)}
                  variant="outline-on-dark"
                  size="md"
                >
                  <Phone size={15} /> {BUSINESS.phone}
                </LinkButton>
              )}
              {BUSINESS.email && (
                <a
                  href={`mailto:${BUSINESS.email}`}
                  className="inline-flex items-center gap-2 text-[0.875rem] text-[var(--color-paper)] hover:text-[var(--color-rust-light)]"
                >
                  <Mail size={15} /> {BUSINESS.email}
                </a>
              )}
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="font-mono-spec text-[0.74rem] uppercase tracking-[0.1em] text-[var(--color-rust-light)] mb-4">
                Services
              </h3>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.services.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[0.9rem] text-[var(--color-paper)] hover:text-[var(--color-rust-light)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono-spec text-[0.74rem] uppercase tracking-[0.1em] text-[var(--color-rust-light)] mb-4">
                Service Area
              </h3>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.coverage.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[0.9rem] text-[var(--color-paper)] hover:text-[var(--color-rust-light)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono-spec text-[0.74rem] uppercase tracking-[0.1em] text-[var(--color-rust-light)] mb-4">
                Company
              </h3>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-[0.9rem] text-[var(--color-paper)] hover:text-[var(--color-rust-light)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[0.8rem] text-[var(--color-steel-light)]">
          <p>
            © {new Date().getFullYear()} {BUSINESS.name}. Serving Central &amp; Northwest Indiana.
          </p>
          <p className="font-mono-spec text-[0.72rem]">
            Lafayette · Avon · I-65 &amp; I-70 Corridors
          </p>
        </div>
      </div>
    </footer>
  );
};
