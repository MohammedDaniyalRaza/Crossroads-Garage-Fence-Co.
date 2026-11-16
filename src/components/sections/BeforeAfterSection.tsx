import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BEFORE_AFTER_PAIRS, PROJECTS } from '../../data/projects.js';
import { BeforeAfterSlider } from '../ui/BeforeAfterSlider';
import { SmartImage, ImageKey } from '../ui/SmartImage';
import { Tabs } from '../ui/Tabs';
import { LinkButton } from '../ui/Button';

export const BeforeAfterSection: React.FC = () => {
  const [pairId, setPairId] = useState(BEFORE_AFTER_PAIRS[0].id);
  const activePair =
    BEFORE_AFTER_PAIRS.find((p) => p.id === pairId) || BEFORE_AFTER_PAIRS[0];
  const featured = PROJECTS.slice(0, 3);

  return (
    <section data-surface="dark" className="surface-dark section-pad">
      <div className="container-arch">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="spec-kicker text-[var(--color-rust-light)] mb-2">
              Project Showcase · Sample Imagery
            </p>
            <h2 className="h-section text-[var(--color-cream)]">
              Before the framing. After the{' '}
              <span className="font-serif-accent font-normal text-[var(--color-rust-light)]">
                finish.
              </span>
            </h2>
          </div>

          <LinkButton to="/projects" variant="outline-on-dark" size="md">
            <span>View Full Project Gallery</span>
            <ArrowRight size={16} />
          </LinkButton>
        </div>

        {/* Before / After Slider Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 mb-12 border-b border-[rgba(243,237,226,0.14)]">
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImageKey={activePair.beforeImageKey as ImageKey}
              afterImageKey={activePair.afterImageKey as ImageKey}
              beforeLabel={activePair.beforeLabel}
              afterLabel={activePair.afterLabel}
            />
          </div>

          <div className="lg:col-span-5 space-y-5">
            <Tabs
              darkSurface
              tabs={BEFORE_AFTER_PAIRS.map((p, idx) => ({
                id: p.id,
                label: idx === 0 ? 'Garage Door Bay' : 'Fence Perimeter',
              }))}
              activeId={pairId}
              onChange={setPairId}
            />
            <div>
              <span className="font-mono-spec text-[0.72rem] uppercase text-[var(--color-rust-light)] block mb-1.5">
                {activePair.location}
              </span>
              <h3 className="font-display font-bold text-[1.4rem] text-[var(--color-cream)] mb-2.5">
                {activePair.title}
              </h3>
              <p className="text-[0.94rem] text-[var(--color-paper)] leading-relaxed">
                {activePair.caption}
              </p>
            </div>
            <p className="font-mono-spec text-[0.72rem] text-[var(--color-steel-light)]">
              Drag the vertical handle left or right (or use arrow keys) to compare.
            </p>
          </div>
        </div>

        {/* 3 Highlighted Project Rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((proj) => (
            <div
              key={proj.id}
              className="group border border-[rgba(243,237,226,0.14)] bg-[var(--color-charcoal-deep)] rounded-[var(--radius-xs)] overflow-hidden flex flex-col"
            >
              <SmartImage
                imageKey={proj.imageKey as ImageKey}
                aspectRatio="4 / 3"
                showSampleTag
                imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 font-mono-spec text-[0.7rem] text-[var(--color-rust-light)] mb-1.5">
                    <span>{proj.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[var(--color-steel-light)]">{proj.town}</span>
                  </div>
                  <h3 className="font-display font-bold text-[1.1rem] text-[var(--color-cream)] mb-2">
                    {proj.title}
                  </h3>
                  <p className="text-[0.88rem] text-[var(--color-paper)] leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
                <div className="pt-3 border-t border-[rgba(243,237,226,0.1)] font-mono-spec text-[0.7rem] text-[var(--color-steel-light)]">
                  {proj.specs.join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
