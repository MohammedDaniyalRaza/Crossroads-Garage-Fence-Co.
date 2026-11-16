import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import {
  GARAGE_DOOR_STYLES,
  GARAGE_DOOR_COLORS,
  FENCE_STYLES,
  FENCE_FINISHES,
} from '../../data/styles.js';
import { buildEstimateUrl, cn } from '../../lib/helpers';
import { Tabs } from '../ui/Tabs';
import { Button } from '../ui/Button';
import { GarageDoorVisualizer } from '../svg/GarageDoorVisualizer';
import { FenceVisualizer } from '../svg/FenceVisualizer';

export const StyleExplorer: React.FC = () => {
  const [mode, setMode] = useState<'door' | 'fence'>('door');

  const [doorStyleId, setDoorStyleId] = useState(GARAGE_DOOR_STYLES[0].id);
  const [doorColorId, setDoorColorId] = useState(GARAGE_DOOR_COLORS[0].id);

  const [fenceStyleId, setFenceStyleId] = useState(FENCE_STYLES[0].id);
  const [fenceFinishId, setFenceFinishId] = useState(FENCE_FINISHES[0].id);

  const activeDoor =
    GARAGE_DOOR_STYLES.find((s) => s.id === doorStyleId) || GARAGE_DOOR_STYLES[0];
  const activeDoorColor =
    GARAGE_DOOR_COLORS.find((c) => c.id === doorColorId) || GARAGE_DOOR_COLORS[0];

  const activeFence = FENCE_STYLES.find((s) => s.id === fenceStyleId) || FENCE_STYLES[0];
  const activeFenceFinish =
    FENCE_FINISHES.find((f) => f.id === fenceFinishId) || FENCE_FINISHES[0];

  const prefillStyle =
    mode === 'door'
      ? `${activeDoor.name} (${activeDoorColor.name})`
      : `${activeFence.name} (${activeFenceFinish.name})`;

  const prefillService =
    mode === 'door' ? 'new-garage-door-installation' : 'fence-and-gate-construction';

  return (
    <section className="surface-paper section-pad border-b border-[var(--line-dark)]">
      <div className="container-arch">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-9">
          <div>
            <p className="spec-kicker text-[var(--color-rust)] mb-2">
              Elevation &amp; Material Explorer
            </p>
            <h2 className="h-section text-[var(--color-charcoal)]">
              Preview your{' '}
              <span className="font-serif-accent font-normal text-[var(--color-rust)]">
                door or fence
              </span>{' '}
              spec.
            </h2>
          </div>

          <Tabs
            tabs={[
              { id: 'door', label: 'Garage Door Styles' },
              { id: 'fence', label: 'Fence & Footing Styles' },
            ]}
            activeId={mode}
            onChange={(id) => setMode(id as 'door' | 'fence')}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* SVG Blueprint Canvas */}
          <div className="lg:col-span-7 reg-frame border border-[rgba(28,27,26,0.28)] bg-[var(--color-charcoal)] p-3 sm:p-4 rounded-[var(--radius-xs)] shadow-[var(--shadow-workshop)]">
            <div className="flex items-center justify-between gap-4 pb-2.5 mb-3 border-b border-[rgba(243,237,226,0.12)] font-mono-spec text-[0.72rem] text-[var(--color-paper)]">
              <span>
                {mode === 'door'
                  ? `ELEVATION // ${activeDoor.code}`
                  : `PERIMETER // ${activeFence.code}`}
              </span>
              <span className="text-[var(--color-rust-light)]">
                {mode === 'door' ? activeDoorColor.name : activeFenceFinish.name}
              </span>
            </div>

            {mode === 'door' ? (
              <GarageDoorVisualizer
                styleId={activeDoor.id}
                colorHex={activeDoorColor.hex}
                accentHex={activeDoorColor.accent}
                styleName={activeDoor.name}
                colorName={activeDoorColor.name}
              />
            ) : (
              <FenceVisualizer
                styleId={activeFence.id}
                finishHex={activeFenceFinish.hex}
                grainHex={activeFenceFinish.grain}
                styleName={activeFence.name}
                finishName={activeFenceFinish.name}
              />
            )}
          </div>

          {/* Controls & Spec Readout */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="font-mono-spec text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-steel-dark)] block mb-3">
                01. Choose Profile
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {(mode === 'door' ? GARAGE_DOOR_STYLES : FENCE_STYLES).map((item) => {
                  const selected =
                    mode === 'door' ? item.id === doorStyleId : item.id === fenceStyleId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        mode === 'door'
                          ? setDoorStyleId(item.id)
                          : setFenceStyleId(item.id)
                      }
                      className={cn(
                        'p-3.5 text-left border rounded-[var(--radius-xs)] transition-colors cursor-pointer',
                        selected
                          ? 'bg-[#1C1B1A] text-[#F3EDE2] border-[#1C1B1A] hover:bg-[#121110] hover:text-[#F3EDE2]'
                          : 'bg-[#F3EDE2] text-[#1C1B1A] border-[rgba(28,27,26,0.28)] hover:bg-[#1C1B1A] hover:text-[#F3EDE2] hover:border-[#1C1B1A]'
                      )}
                    >
                      <span
                        className={cn(
                          'font-mono-spec text-[0.68rem] block',
                          selected ? 'text-[#D07A4B]' : 'text-[#B4532A]'
                        )}
                      >
                        {item.code}
                      </span>
                      <span className="font-semibold text-[0.94rem] block mt-0.5 text-current">
                        {item.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="font-mono-spec text-[0.72rem] uppercase tracking-[0.08em] text-[var(--color-steel-dark)] block mb-3">
                02. Choose Finish / Material Tone
              </span>
              <div className="flex flex-wrap gap-2.5">
                {(mode === 'door' ? GARAGE_DOOR_COLORS : FENCE_FINISHES).map((swatch) => {
                  const selected =
                    mode === 'door'
                      ? swatch.id === doorColorId
                      : swatch.id === fenceFinishId;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() =>
                        mode === 'door'
                          ? setDoorColorId(swatch.id)
                          : setFenceFinishId(swatch.id)
                      }
                      className={cn(
                        'px-3 py-2 border rounded-[var(--radius-xs)] inline-flex items-center gap-2 text-[0.82rem] cursor-pointer transition-colors',
                        selected
                          ? 'border-[#B4532A] bg-[#1C1B1A] text-[#F3EDE2] font-semibold hover:bg-[#121110] hover:text-[#F3EDE2]'
                          : 'border-[rgba(28,27,26,0.28)] bg-[#F3EDE2] text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-[#F3EDE2] hover:border-[#1C1B1A]'
                      )}
                    >
                      <span
                        className="w-4 h-4 rounded-[2px] border border-[rgba(28,27,26,0.3)] shrink-0"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="text-current">{swatch.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 bg-[var(--color-cream)] border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono-spec text-[0.72rem] uppercase text-[var(--color-rust)]">
                  Selected Specification
                </span>
                <span className="font-mono-spec text-[0.72rem] text-[var(--color-steel-dark)]">
                  {mode === 'door' ? activeDoor.code : activeFence.code}
                </span>
              </div>
              <h3 className="font-display font-bold text-[1.2rem] text-[var(--color-charcoal)]">
                {prefillStyle}
              </h3>
              <p className="text-[0.94rem] text-[var(--color-steel-dark)] leading-relaxed">
                {mode === 'door' ? activeDoor.description : activeFence.description}
              </p>
              <p className="font-mono-spec text-[0.74rem] text-[var(--color-charcoal)] pt-1 border-t border-[rgba(28,27,26,0.12)]">
                {mode === 'door' ? activeDoor.specs : activeFence.specs}
              </p>
            </div>

            <Button
              to={buildEstimateUrl({ service: prefillService, style: prefillStyle })}
              size="lg"
              className="w-full sm:w-auto"
            >
              <span>Request This Style</span>
              <ArrowRight size={17} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
