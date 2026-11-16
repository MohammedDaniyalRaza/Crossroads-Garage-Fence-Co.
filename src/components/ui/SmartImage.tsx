import React, { useState } from 'react';
import { IMAGES } from '../../data/images.js';
import { ScrollTrigger } from '../../lib/gsap';
import { cn } from '../../lib/helpers';
import { CrossroadsGlyph } from '../svg/CrossroadsGlyph';

export type ImageKey = keyof typeof IMAGES;

interface SmartImageProps {
  imageKey: ImageKey;
  eager?: boolean;
  aspectRatio?: string;
  className?: string;
  imgClassName?: string;
  caption?: string;
  showSampleTag?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  imageKey,
  eager = false,
  aspectRatio = '16 / 10',
  className,
  imgClassName,
  caption,
  showSampleTag = false,
}) => {
  const entry = IMAGES[imageKey] as {
    url: string;
    alt: string;
    objectPosition?: string;
    isSample?: boolean;
  };
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        'relative overflow-hidden bg-[var(--color-charcoal-soft)]',
        className
      )}
      style={{ aspectRatio }}
    >
      {!failed ? (
        <img
          src={entry.url}
          alt={entry.alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding={eager ? 'sync' : 'async'}
          referrerPolicy="no-referrer"
          onLoad={() => {
            setLoaded(true);
            ScrollTrigger.refresh();
          }}
          onError={() => setFailed(true)}
          style={{ objectPosition: entry.objectPosition || '50% 50%' }}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName
          )}
        />
      ) : (
        <div
          role="img"
          aria-label={entry.alt}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[var(--color-charcoal)] blueprint-grid-dark border border-[rgba(180,83,42,0.3)]"
        >
          <CrossroadsGlyph size={38} color="#B4532A" className="mb-3" />
          <span className="font-mono-spec text-[0.72rem] uppercase tracking-[0.12em] text-[var(--color-rust-light)] mb-1">
            Crossroads Field Frame
          </span>
          <p className="text-[0.85rem] text-[var(--color-paper)] max-w-[32ch] leading-snug">
            {entry.alt}
          </p>
        </div>
      )}

      {showSampleTag && entry.isSample && (
        <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 bg-[rgba(18,17,16,0.82)] text-[var(--color-paper)] font-mono-spec text-[0.65rem] tracking-[0.06em]">
          Sample Reference Photo
        </div>
      )}

      {caption && (
        <div className="absolute bottom-0 inset-x-0 px-3 py-2 bg-[rgba(18,17,16,0.78)] text-[var(--color-cream)] font-mono-spec text-[0.7rem]">
          {caption}
        </div>
      )}
    </div>
  );
};
