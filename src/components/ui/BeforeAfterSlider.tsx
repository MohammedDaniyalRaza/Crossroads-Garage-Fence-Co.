import React, { useRef, useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { SmartImage, ImageKey } from './SmartImage';

interface BeforeAfterSliderProps {
  beforeImageKey: ImageKey;
  afterImageKey: ImageKey;
  beforeLabel: string;
  afterLabel: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImageKey,
  afterImageKey,
  beforeLabel,
  afterLabel,
}) => {
  const [pos, setPos] = useState(52);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(8, Math.min(92, Math.round(pct))));
  };

  return (
    <div
      ref={trackRef}
      className="relative w-full overflow-hidden select-none border border-[rgba(243,237,226,0.18)] rounded-[var(--radius-xs)] touch-pan-y"
      style={{ aspectRatio: '16 / 10' }}
      onPointerDown={(e) => {
        dragging.current = true;
        (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        updateFromClientX(e.clientX);
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      onPointerCancel={() => {
        dragging.current = false;
      }}
    >
      {/* After Image (Full layer) */}
      <div className="absolute inset-0">
        <SmartImage
          imageKey={afterImageKey}
          aspectRatio="16 / 10"
          className="w-full h-full"
        />
      </div>

      {/* Before Image (Clipped layer) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      >
        <SmartImage
          imageKey={beforeImageKey}
          aspectRatio="16 / 10"
          className="w-full h-full"
        />
      </div>

      {/* Labels */}
      <span className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[rgba(18,17,16,0.85)] text-[var(--color-cream)] font-mono-spec text-[0.7rem] uppercase tracking-[0.06em]">
        {beforeLabel}
      </span>
      <span className="absolute top-3 right-3 z-20 px-2.5 py-1 bg-[var(--color-rust)] text-[var(--color-cream)] font-mono-spec text-[0.7rem] uppercase tracking-[0.06em]">
        {afterLabel}
      </span>

      {/* Divider line & handle */}
      <div
        className="absolute top-0 bottom-0 z-30 w-[2px] bg-[var(--color-cream)] pointer-events-none"
        style={{ left: `${pos}%` }}
      >
        <div
          role="slider"
          tabIndex={0}
          aria-label="Comparison slider between before and after photos"
          aria-valuemin={8}
          aria-valuemax={92}
          aria-valuenow={pos}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPos((p) => Math.max(8, p - 4));
            if (e.key === 'ArrowRight') setPos((p) => Math.min(92, p + 4));
          }}
          className="pointer-events-auto absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-[var(--radius-xs)] bg-[var(--color-rust)] border-2 border-[var(--color-cream)] text-[var(--color-cream)] flex items-center justify-center shadow-[var(--shadow-workshop)] cursor-ew-resize"
        >
          <MoveHorizontal size={18} />
        </div>
      </div>
    </div>
  );
};
