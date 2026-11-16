import React, { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { AREA_REGIONS } from '../../data/areas.js';
import { BUSINESS } from '../../data/business.js';
import { buildEstimateUrl, cn } from '../../lib/helpers';
import { IndianaMap } from '../svg/IndianaMap';
import { LinkButton } from '../ui/Button';

export const AreaMapSection: React.FC = () => {
  const [selectedTown, setSelectedTown] = useState<string>('Avon');

  return (
    <section data-surface="light" className="surface-cream section-pad border-b border-[var(--line-dark)]">
      <div className="container-arch">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Stylized SVG Map */}
          <div className="lg:col-span-6">
            <div className="reg-frame border border-[rgba(28,27,26,0.28)] bg-[var(--color-charcoal)] p-3 sm:p-4 rounded-[var(--radius-xs)] shadow-[var(--shadow-workshop)]">
              <div className="flex items-center justify-between pb-2.5 mb-2 border-b border-[rgba(243,237,226,0.12)] font-mono-spec text-[0.7rem] text-[var(--color-paper)]">
                <span>DISPATCH COVERAGE · I-65 &amp; I-70</span>
                <span className="text-[var(--color-rust-light)]">
                  Selected: {selectedTown}
                </span>
              </div>
              <IndianaMap activeTown={selectedTown} onSelectTown={setSelectedTown} />
            </div>
          </div>

          {/* Right: Regions & Dual Hubs */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="spec-kicker text-[var(--color-rust)] mb-2">
                Central &amp; Northwest Indiana Service Area
              </p>
              <h2 className="h-section text-[var(--color-charcoal)] mb-3">
                Dual hubs in{' '}
                <span className="font-serif-accent font-normal text-[var(--color-rust)]">
                  Lafayette &amp; Avon.
                </span>
              </h2>
              <p className="body-copy text-[var(--color-steel-dark)]">
                {BUSINESS.serves} Click any town on the map or list to prefill your estimate
                request.
              </p>
            </div>

            <div className="space-y-5">
              {AREA_REGIONS.map((region) => (
                <div
                  key={region.id}
                  className="pt-4 border-t border-[rgba(28,27,26,0.16)]"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-display font-bold text-[1.08rem] text-[var(--color-charcoal)]">
                      {region.name}
                    </h3>
                    <span className="font-mono-spec text-[0.72rem] text-[var(--color-rust)]">
                      {region.corridor}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1.5">
                    {region.towns.map((town) => {
                      const active = selectedTown === town;
                      return (
                        <button
                          key={town}
                          type="button"
                          onClick={() => setSelectedTown(town)}
                          className={cn(
                            'text-[0.9rem] transition-colors cursor-pointer underline-offset-4 bg-transparent border-0 px-0 py-0.5',
                            active
                              ? 'text-[var(--color-rust)] font-semibold underline'
                              : 'text-[var(--color-steel-dark)] hover:text-[var(--color-charcoal)]'
                          )}
                        >
                          {town}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <LinkButton
                to={buildEstimateUrl({ town: selectedTown })}
                variant="primary"
                size="md"
              >
                <span>Estimate in {selectedTown}</span>
                <ArrowRight size={16} />
              </LinkButton>
              <LinkButton
                to="/locations/lafayette"
                variant="outline-on-light"
                size="sm"
              >
                <MapPin size={14} /> Lafayette Hub
              </LinkButton>
              <LinkButton
                to="/locations/avon"
                variant="outline-on-light"
                size="sm"
              >
                <MapPin size={14} /> Avon Hub
              </LinkButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
