import React from 'react';

interface IndianaMapProps {
  activeTown?: string | null;
  onSelectTown?: (town: string) => void;
}

const TOWN_PINS = [
  { name: 'Lafayette', x: 162, y: 122, isHub: true },
  { name: 'West Lafayette', x: 144, y: 112 },
  { name: 'Frankfort', x: 205, y: 146 },
  { name: 'Crawfordsville', x: 146, y: 186 },
  { name: 'Lebanon', x: 206, y: 192 },
  { name: 'Zionsville', x: 238, y: 214 },
  { name: 'Westfield', x: 274, y: 198 },
  { name: 'Noblesville', x: 304, y: 205 },
  { name: 'Carmel', x: 274, y: 222 },
  { name: 'Fishers', x: 306, y: 230 },
  { name: 'Brownsburg', x: 208, y: 244 },
  { name: 'Danville', x: 180, y: 266 },
  { name: 'Avon', x: 204, y: 268, isHub: true },
  { name: 'Plainfield', x: 212, y: 292 },
  { name: 'Speedway', x: 238, y: 258 },
  { name: 'Downtown Indianapolis', x: 268, y: 268 },
];

export const IndianaMap: React.FC<IndianaMapProps> = ({ activeTown, onSelectTown }) => {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 460 400"
        className="w-full h-auto block select-none"
        role="img"
        aria-label="Service coverage map of Central and Northwest Indiana showing Lafayette and Avon hubs along the I-65 and I-70 corridors"
      >
        {/* Map grid */}
        <rect x="0" y="0" width="460" height="400" fill="#1C1B1A" />
        <g stroke="rgba(243,237,226,0.05)" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="400" />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 40} x2="460" y2={i * 40} />
          ))}
        </g>

        {/* Stylized Central & NW Indiana Boundary */}
        <path
          d="M74,36 L388,36 L396,170 L402,290 L376,368 L94,368 L68,268 L74,36 Z"
          fill="#262422"
          stroke="rgba(243,237,226,0.16)"
          strokeWidth="1.5"
        />

        {/* Coverage Halo */}
        <ellipse
          cx="228"
          cy="210"
          rx="145"
          ry="135"
          fill="rgba(180, 83, 42, 0.08)"
          stroke="rgba(180, 83, 42, 0.35)"
          strokeDasharray="5 5"
          strokeWidth="1.2"
        />

        {/* I-65 Corridor */}
        <path
          d="M112,36 L162,122 L206,192 L268,268 L302,368"
          fill="none"
          stroke="#B4532A"
          strokeWidth="2.2"
          strokeOpacity="0.85"
        />
        {/* I-70 Corridor */}
        <path
          d="M68,312 L204,268 L268,268 L402,248"
          fill="none"
          stroke="#D07A4B"
          strokeWidth="2"
          strokeOpacity="0.75"
        />
        {/* I-465 Loop */}
        <ellipse
          cx="266"
          cy="266"
          rx="38"
          ry="30"
          fill="none"
          stroke="rgba(243,237,226,0.28)"
          strokeWidth="1.4"
        />

        {/* Highway Shields */}
        <g fontFamily="IBM Plex Mono, monospace" fontSize="9" fontWeight="600">
          <rect x="108" y="64" width="38" height="17" rx="2" fill="#121110" stroke="#B4532A" />
          <text x="127" y="76" textAnchor="middle" fill="#EAE2D3">I-65</text>

          <rect x="336" y="246" width="38" height="17" rx="2" fill="#121110" stroke="#D07A4B" />
          <text x="355" y="258" textAnchor="middle" fill="#EAE2D3">I-70</text>
        </g>

        {/* Town & Hub Pins */}
        {TOWN_PINS.map((pin) => {
          const isSelected = activeTown === pin.name;
          const labelRight =
            pin.name === 'Avon' ||
            pin.name === 'West Lafayette' ||
            pin.name === 'Danville' ||
            pin.name === 'Crawfordsville' ||
            pin.name === 'Plainfield'
              ? false
              : true;

          return (
            <g
              key={pin.name}
              onClick={() => onSelectTown?.(pin.name)}
              style={{ cursor: onSelectTown ? 'pointer' : 'default' }}
            >
              {pin.isHub ? (
                <>
                  <circle cx={pin.x} cy={pin.y} r="13" fill="rgba(180,83,42,0.22)" />
                  <circle
                    cx={pin.x}
                    cy={pin.y}
                    r="6"
                    fill="#B4532A"
                    stroke="#F3EDE2"
                    strokeWidth="2"
                  />
                </>
              ) : (
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  r={isSelected ? 5.5 : 3.5}
                  fill={isSelected ? '#D07A4B' : '#EAE2D3'}
                  stroke="#121110"
                  strokeWidth="1.2"
                />
              )}

              <text
                x={labelRight ? pin.x + 10 : pin.x - 10}
                y={pin.y + 3.5}
                textAnchor={labelRight ? 'start' : 'end'}
                fontFamily="IBM Plex Mono, monospace"
                fontSize={pin.isHub ? '10.5' : '8.5'}
                fontWeight={pin.isHub || isSelected ? '600' : '400'}
                fill={pin.isHub ? '#F3EDE2' : isSelected ? '#D07A4B' : '#B8B2A8'}
              >
                {pin.isHub ? `${pin.name.toUpperCase()} HUB` : pin.name}
              </text>
            </g>
          );
        })}

        {/* Compass / Crossroads Stamp */}
        <g transform="translate(394, 72)">
          <circle cx="0" cy="0" r="18" fill="#121110" stroke="rgba(243,237,226,0.22)" />
          <line x1="0" y1="-13" x2="0" y2="13" stroke="#B4532A" strokeWidth="1.4" />
          <line x1="-13" y1="0" x2="13" y2="0" stroke="#8A8680" strokeWidth="1.2" />
          <text x="0" y="-22" textAnchor="middle" fill="#8A8680" fontFamily="IBM Plex Mono, monospace" fontSize="8">
            N
          </text>
        </g>
      </svg>
    </div>
  );
};
