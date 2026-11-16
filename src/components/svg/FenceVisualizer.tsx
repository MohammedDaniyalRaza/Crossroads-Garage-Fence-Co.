import React from 'react';

interface FenceVisualizerProps {
  styleId: string;
  finishHex: string;
  grainHex: string;
  styleName: string;
  finishName: string;
}

export const FenceVisualizer: React.FC<FenceVisualizerProps> = ({
  styleId,
  finishHex,
  grainHex,
  styleName,
  finishName,
}) => {
  const isAluminum = styleId === 'aluminum';
  const isVinyl = styleId === 'vinyl';
  const isPicket = styleId === 'picket';
  const isShadowbox = styleId === 'shadowbox';

  const topY = isPicket ? 126 : 86;
  const posts = [72, 232, 392, 552];

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 640 360"
        className="w-full h-auto block"
        role="img"
        aria-label={`Architectural elevation preview of ${styleName} fence in ${finishName}`}
      >
        <rect x="0" y="0" width="640" height="360" fill="#1C1B1A" />
        <g stroke="rgba(243,237,226,0.05)" strokeWidth="1">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`vg-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="360" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`hg-${i}`} x1="0" y1={i * 40} x2="640" y2={i * 40} />
          ))}
        </g>

        {/* Subsurface Frost-Line Cutaway */}
        <rect x="0" y="256" width="640" height="104" fill="#141312" />
        <line x1="0" y1="256" x2="640" y2="256" stroke="#8A8680" strokeWidth="1.5" />
        <line
          x1="0"
          y1="318"
          x2="640"
          y2="318"
          stroke="#B4532A"
          strokeWidth="1.2"
          strokeDasharray="6 4"
        />

        {/* Concrete Post Footings Below Frost Line */}
        {posts.map((px) => (
          <g key={`footing-${px}`}>
            <path
              d={`M${px - 10},256 L${px + 26},256 L${px + 29},338 L${px - 13},338 Z`}
              fill="#5C5853"
              fillOpacity="0.45"
              stroke="#8A8680"
              strokeWidth="1"
            />
          </g>
        ))}

        {/* Fence Bays */}
        {[0, 1, 2].map((bay) => {
          const startX = posts[bay] + 16;
          const bayWidth = 144;

          if (isAluminum) {
            return (
              <g key={`bay-${bay}`}>
                {/* Horizontal rails */}
                <rect x={startX} y="102" width={bayWidth} height="6" fill={finishHex} stroke="#8A8680" strokeWidth="0.8" />
                <rect x={startX} y="236" width={bayWidth} height="6" fill={finishHex} stroke="#8A8680" strokeWidth="0.8" />
                {/* Vertical pickets */}
                {Array.from({ length: 9 }).map((_, p) => (
                  <rect
                    key={p}
                    x={startX + 10 + p * 15}
                    y="88"
                    width="4"
                    height="156"
                    fill={finishHex}
                    stroke="#8A8680"
                    strokeWidth="0.6"
                  />
                ))}
              </g>
            );
          }

          if (isVinyl) {
            return (
              <g key={`bay-${bay}`}>
                <rect x={startX} y="92" width={bayWidth} height="8" fill={finishHex} stroke={grainHex} strokeWidth="1" />
                <rect x={startX} y="238" width={bayWidth} height="8" fill={finishHex} stroke={grainHex} strokeWidth="1" />
                {Array.from({ length: 8 }).map((_, p) => (
                  <rect
                    key={p}
                    x={startX + p * 18}
                    y="100"
                    width="18"
                    height="138"
                    fill={finishHex}
                    stroke={grainHex}
                    strokeWidth="1"
                  />
                ))}
              </g>
            );
          }

          if (isPicket) {
            return (
              <g key={`bay-${bay}`}>
                <rect x={startX} y="160" width={bayWidth} height="7" fill={grainHex} />
                <rect x={startX} y="222" width={bayWidth} height="7" fill={grainHex} />
                {Array.from({ length: 8 }).map((_, p) => {
                  const px = startX + 5 + p * 17.5;
                  return (
                    <polygon
                      key={p}
                      points={`${px},138 ${px + 6},124 ${px + 12},138 ${px + 12},248 ${px},248`}
                      fill={finishHex}
                      stroke={grainHex}
                      strokeWidth="1"
                    />
                  );
                })}
              </g>
            );
          }

          if (isShadowbox) {
            return (
              <g key={`bay-${bay}`}>
                <rect x={startX} y="112" width={bayWidth} height="6" fill={grainHex} />
                <rect x={startX} y="178" width={bayWidth} height="6" fill={grainHex} />
                <rect x={startX} y="232" width={bayWidth} height="6" fill={grainHex} />
                {Array.from({ length: 9 }).map((_, p) => {
                  const px = startX + p * 16;
                  const backBoard = p % 2 === 1;
                  return (
                    <rect
                      key={p}
                      x={px}
                      y="86"
                      width="15"
                      height="164"
                      fill={backBoard ? grainHex : finishHex}
                      stroke="rgba(18,17,16,0.35)"
                      strokeWidth="0.9"
                    />
                  );
                })}
              </g>
            );
          }

          // Default: Dog-Ear Privacy
          return (
            <g key={`bay-${bay}`}>
              <rect x={startX} y="116" width={bayWidth} height="6" fill={grainHex} />
              <rect x={startX} y="228" width={bayWidth} height="6" fill={grainHex} />
              {Array.from({ length: 9 }).map((_, p) => {
                const px = startX + p * 16;
                return (
                  <polygon
                    key={p}
                    points={`${px + 3},86 ${px + 13},86 ${px + 16},92 ${px + 16},250 ${px},250 ${px},92`}
                    fill={finishHex}
                    stroke={grainHex}
                    strokeWidth="0.9"
                  />
                );
              })}
            </g>
          );
        })}

        {/* Structural Posts */}
        {posts.map((px) => (
          <g key={`post-${px}`}>
            <rect
              x={px}
              y={topY - 6}
              width="16"
              height={332 - (topY - 6)}
              fill={isAluminum ? '#2B2A28' : isVinyl ? finishHex : grainHex}
              stroke="#8A8680"
              strokeWidth="1"
            />
            <rect
              x={px - 2}
              y={topY - 10}
              width="20"
              height="5"
              fill="#B4532A"
            />
          </g>
        ))}

        {/* Blueprint Annotations */}
        <g stroke="#B4532A" strokeWidth="1">
          <line x1="36" y1={topY} x2="36" y2="256" />
          <line x1="29" y1={topY} x2="43" y2={topY} />
          <line x1="29" y1="256" x2="43" y2="256" />

          <line x1="72" y1="54" x2="232" y2="54" />
          <line x1="72" y1="47" x2="72" y2="61" />
          <line x1="232" y1="47" x2="232" y2="61" />
        </g>

        <text
          x="24"
          y="175"
          fill="#EAE2D3"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9.5"
          transform="rotate(-90 24 175)"
          textAnchor="middle"
        >
          {isPicket ? "4'-0\" HT" : "6'-0\" HT"}
        </text>
        <text
          x="152"
          y="46"
          fill="#EAE2D3"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9.5"
          textAnchor="middle"
        >
          8&apos;-0&quot; O.C. POST SPAN
        </text>
        <text
          x="520"
          y="334"
          fill="#D07A4B"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9.5"
          textAnchor="end"
        >
          INDIANA FROST LINE · CONCRETE FOOTING BELOW 36&quot;
        </text>
      </svg>
    </div>
  );
};
