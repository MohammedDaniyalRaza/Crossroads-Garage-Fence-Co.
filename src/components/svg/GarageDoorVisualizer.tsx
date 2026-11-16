import React from 'react';

interface GarageDoorVisualizerProps {
  styleId: string;
  colorHex: string;
  accentHex: string;
  styleName: string;
  colorName: string;
}

export const GarageDoorVisualizer: React.FC<GarageDoorVisualizerProps> = ({
  styleId,
  colorHex,
  accentHex,
  styleName,
  colorName,
}) => {
  const isDark = colorHex.toLowerCase() === '#2b2a28' || colorHex.toLowerCase() === '#555a5e';
  const strokeTone = isDark ? 'rgba(243,237,226,0.22)' : 'rgba(28,27,26,0.24)';
  const hardwareTone = isDark ? '#D07A4B' : '#1C1B1A';

  const panelY = [108, 152, 196, 240];

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 640 360"
        className="w-full h-auto block"
        role="img"
        aria-label={`Architectural elevation preview of ${styleName} garage door in ${colorName}`}
      >
        {/* Blueprint backdrop */}
        <rect x="0" y="0" width="640" height="360" fill="#1C1B1A" />
        <g stroke="rgba(243,237,226,0.05)" strokeWidth="1">
          {Array.from({ length: 16 }).map((_, i) => (
            <line key={`vg-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="360" />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`hg-${i}`} x1="0" y1={i * 40} x2="640" y2={i * 40} />
          ))}
        </g>

        {/* Gable Roof & Fascia Outline */}
        <polygon
          points="70,104 320,26 570,104"
          fill="#262422"
          stroke="#8A8680"
          strokeWidth="1.5"
        />
        <line x1="58" y1="108" x2="320" y2="24" stroke="#B4532A" strokeWidth="2.5" />
        <line x1="582" y1="108" x2="320" y2="24" stroke="#B4532A" strokeWidth="2.5" />

        {/* Brick/Siding Garage Surround */}
        <rect x="92" y="104" width="456" height="196" fill="#2A2825" stroke="#5C5853" strokeWidth="1.5" />
        {/* Door Jamb Trim */}
        <rect x="136" y="104" width="368" height="186" fill="#121110" stroke="#EAE2D3" strokeWidth="2" />

        {/* 4 Sectional Panels */}
        {panelY.map((y, idx) => (
          <g key={y}>
            <rect
              x="144"
              y={y}
              width="352"
              height="41"
              fill={colorHex}
              stroke={accentHex}
              strokeWidth="1.2"
            />

            {/* Style 1: Traditional Raised-Panel */}
            {styleId === 'raised-panel' && (
              <g>
                {idx === 0 ? (
                  [0, 1, 2, 3].map((col) => (
                    <rect
                      key={col}
                      x={158 + col * 84}
                      y={y + 8}
                      width="70"
                      height="25"
                      rx="1"
                      fill="#C6D6DD"
                      fillOpacity="0.82"
                      stroke={strokeTone}
                      strokeWidth="1.5"
                    />
                  ))
                ) : (
                  [0, 1, 2, 3].map((col) => (
                    <g key={col}>
                      <rect
                        x={158 + col * 84}
                        y={y + 8}
                        width="70"
                        height="25"
                        fill="none"
                        stroke={strokeTone}
                        strokeWidth="1.5"
                      />
                      <rect
                        x={164 + col * 84}
                        y={y + 13}
                        width="58"
                        height="15"
                        fill="none"
                        stroke={accentHex}
                        strokeWidth="1"
                      />
                    </g>
                  ))
                )}
              </g>
            )}

            {/* Style 2: Carriage House */}
            {styleId === 'carriage-house' && (
              <g>
                {idx === 0 ? (
                  [0, 1, 2, 3].map((col) => (
                    <g key={col}>
                      <rect
                        x={156 + col * 85}
                        y={y + 8}
                        width="72"
                        height="26"
                        fill="#CBD7DC"
                        fillOpacity="0.86"
                        stroke={strokeTone}
                        strokeWidth="1.5"
                      />
                      <line
                        x1={192 + col * 85}
                        y1={y + 8}
                        x2={192 + col * 85}
                        y2={y + 34}
                        stroke={colorHex}
                        strokeWidth="2"
                      />
                    </g>
                  ))
                ) : (
                  <g>
                    {/* Vertical tongue-groove lines */}
                    {Array.from({ length: 14 }).map((_, i) => (
                      <line
                        key={i}
                        x1={168 + i * 24}
                        y1={y}
                        x2={168 + i * 24}
                        y2={y + 41}
                        stroke={strokeTone}
                        strokeWidth="0.9"
                      />
                    ))}
                    {/* Overlay carriage trim & strap hinges */}
                    <rect x="150" y={y + 4} width="166" height="33" fill="none" stroke={accentHex} strokeWidth="2.4" />
                    <rect x="324" y={y + 4} width="166" height="33" fill="none" stroke={accentHex} strokeWidth="2.4" />
                    {(idx === 1 || idx === 3) && (
                      <>
                        <rect x="150" y={y + 17} width="26" height="6" fill={hardwareTone} />
                        <rect x="464" y={y + 17} width="26" height="6" fill={hardwareTone} />
                      </>
                    )}
                    {idx === 2 && (
                      <>
                        <rect x="304" y={y + 12} width="5" height="16" fill={hardwareTone} />
                        <rect x="331" y={y + 12} width="5" height="16" fill={hardwareTone} />
                      </>
                    )}
                  </g>
                )}
              </g>
            )}

            {/* Style 3: Modern Full-View Glass */}
            {styleId === 'full-view-glass' && (
              <g>
                {[0, 1, 2, 3].map((col) => (
                  <rect
                    key={col}
                    x={154 + col * 86}
                    y={y + 5}
                    width="74"
                    height="31"
                    fill="#B9CDD6"
                    fillOpacity="0.72"
                    stroke={accentHex}
                    strokeWidth="2"
                  />
                ))}
                {/* Subtle glass reflection */}
                <line x1="164" y1={y + 32} x2="188" y2={y + 9} stroke="#F3EDE2" strokeOpacity="0.35" strokeWidth="1.5" />
                <line x1="336" y1={y + 32} x2="360" y2={y + 9} stroke="#F3EDE2" strokeOpacity="0.35" strokeWidth="1.5" />
              </g>
            )}

            {/* Style 4: Flush Insulated Steel */}
            {styleId === 'insulated-steel' && (
              <g>
                <line x1="146" y1={y + 14} x2="494" y2={y + 14} stroke={strokeTone} strokeWidth="1" />
                <line x1="146" y1={y + 28} x2="494" y2={y + 28} stroke={strokeTone} strokeWidth="1" />
                <rect
                  x="448"
                  y={y + 8}
                  width="36"
                  height="25"
                  fill="#C4D4DC"
                  fillOpacity="0.76"
                  stroke={strokeTone}
                  strokeWidth="1.2"
                />
              </g>
            )}
          </g>
        ))}

        {/* Bottom Weatherstrip Astragal */}
        <rect x="144" y="282" width="352" height="5" fill="#121110" />

        {/* Driveway apron */}
        <rect x="52" y="290" width="536" height="16" fill="#353330" />

        {/* Blueprint Dimension Lines */}
        <g stroke="#B4532A" strokeWidth="1">
          {/* Width callout */}
          <line x1="136" y1="324" x2="504" y2="324" />
          <line x1="136" y1="316" x2="136" y2="332" />
          <line x1="504" y1="316" x2="504" y2="332" />
          {/* Height callout */}
          <line x1="594" y1="104" x2="594" y2="290" />
          <line x1="586" y1="104" x2="602" y2="104" />
          <line x1="586" y1="290" x2="602" y2="290" />
        </g>

        <rect x="260" y="315" width="120" height="18" fill="#1C1B1A" />
        <text
          x="320"
          y="328"
          textAnchor="middle"
          fill="#EAE2D3"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="10"
        >
          16&apos;-0&quot; TYPICAL BAY
        </text>

        <text
          x="608"
          y="200"
          fill="#D07A4B"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="10"
          transform="rotate(-90 608 200)"
          textAnchor="middle"
        >
          7&apos;-0&quot; CLEAR H
        </text>
      </svg>
    </div>
  );
};
