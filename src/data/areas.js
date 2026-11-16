export const AREA_REGIONS = [
  {
    id: 'west-central-indy',
    name: 'West & Central Indy',
    corridor: 'I-70 & US-36 Corridor',
    hub: 'Avon Hub',
    towns: [
      'Avon',
      'Plainfield',
      'Brownsburg',
      'Danville',
      'Speedway',
      'Downtown Indianapolis',
    ],
    summary:
      'Rapid dispatch from our Avon operations for Hendricks County subdivisions, historic Indy neighborhoods, and light commercial bays along US-36 and I-70.',
  },
  {
    id: 'north-northeast-metro',
    name: 'North & Northeast Metro',
    corridor: 'US-31 & I-465 North Loop',
    hub: 'Avon & Lafayette Shared Coverage',
    towns: [
      'Carmel',
      'Westfield',
      'Noblesville',
      'Fishers',
      'Zionsville',
    ],
    summary:
      'Architectural carriage-house doors, full-view glass replacements, and HOA-compliant wood, vinyl, and aluminum perimeter fences across Hamilton and Boone counties.',
  },
  {
    id: 'tippecanoe-surrounding',
    name: 'Tippecanoe & Surrounding Counties',
    corridor: 'I-65 & US-52 Corridor',
    hub: 'Lafayette Hub',
    towns: [
      'Lafayette',
      'West Lafayette',
      'Crawfordsville',
      'Frankfort',
      'Lebanon',
    ],
    summary:
      'Serving residential driveways, student-rental properties, rural acreage, and oversized pole-barn workshops out of our Lafayette hub.',
  },
];

export const ALL_TOWNS = AREA_REGIONS.flatMap((r) => r.towns);

export const LOCATION_HUBS = {
  lafayette: {
    id: 'lafayette',
    slug: '/locations/lafayette',
    city: 'Lafayette',
    state: 'Indiana',
    title: 'Lafayette & Tippecanoe County Hub',
    kicker: 'HUB 01 · I-65 CORRIDOR',
    heroImageKey: 'suburbanBrickHome',
    intro:
      'Our Lafayette operation handles residential garage door service, oversized workshop and pole-barn doors, and frost-line deep concrete fence installations across Tippecanoe, Clinton, Montgomery, and northern Boone counties.',
    corridorNote: 'Positioned along I-65 for straightforward dispatch across Central and Northwest Indiana.',
    primaryRegionId: 'tippecanoe-surrounding',
    townsServed: [
      'Lafayette',
      'West Lafayette',
      'Crawfordsville',
      'Frankfort',
      'Lebanon',
      'Zionsville',
    ],
    whatWeDoHere: [
      {
        title: 'Same-Visit Spring & Cable Service',
        detail:
          'Trucks out of Lafayette stock standard residential torsion and extension springs, lift cables, and nylon rollers to resolve most broken-door calls on the first visit.',
      },
      {
        title: 'Pole Barn & Workshop Doors',
        detail:
          'Custom sizing and framing for tall or extra-wide detached garages, rural shops, and light commercial bays throughout Tippecanoe and surrounding counties.',
      },
      {
        title: 'Frost-Line Privacy & Acreage Fencing',
        detail:
          'Pressure-treated pine, Western Red Cedar, and heavy-duty double drive gates engineered with deep concrete footings built to handle Indiana freeze-thaw cycles.',
      },
    ],
    // TODO: client to provide street address & phone
    address: '',
    phone: '',
  },
  avon: {
    id: 'avon',
    slug: '/locations/avon',
    city: 'Avon',
    state: 'Indiana',
    title: 'Avon & Greater Indianapolis Hub',
    kicker: 'HUB 02 · I-70 & WEST METRO',
    heroImageKey: 'modernGarageHouse',
    intro:
      'Our Avon operation covers Hendricks County, Downtown Indianapolis, and the north and northeast suburbs—delivering fast opener diagnostics, curb-appeal garage door upgrades, and neighborhood-ready wood, vinyl, and aluminum fencing.',
    corridorNote: 'Positioned along the US-36 and I-70 corridor for fast coverage across the Indy metro.',
    primaryRegionId: 'west-central-indy',
    townsServed: [
      'Avon',
      'Plainfield',
      'Brownsburg',
      'Danville',
      'Speedway',
      'Downtown Indianapolis',
      'Carmel',
      'Westfield',
      'Noblesville',
      'Fishers',
      'Zionsville',
    ],
    whatWeDoHere: [
      {
        title: 'Opener Diagnostics & Smart Upgrades',
        detail:
          'Troubleshooting humming motors, misaligned safety sensors, stripped drive gears, and installing LiftMaster, Chamberlain, and Genie Wi-Fi openers.',
      },
      {
        title: 'Residential Door Replacements',
        detail:
          'Insulated steel, traditional raised-panel, carriage house, and modern full-view glass doors with full teardown and haul-away of your old door and tracks.',
      },
      {
        title: 'Backyard Privacy, Pool & Gate Builds',
        detail:
          'Custom cedar and pine privacy runs, low-maintenance vinyl and aluminum pool fencing, and sag-resistant walk and drive gates built to fit sloped or tight urban lots.',
      },
    ],
    // TODO: client to provide street address & phone
    address: '',
    phone: '',
  },
};
