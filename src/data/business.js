export const BUSINESS = {
  name: 'Crossroads Garage & Fence Co.',
  shortName: 'Crossroads',
  tagline: 'Garage Doors & Custom Fencing Across Central & Northwest Indiana',
  // TODO: client to provide
  phone: '',
  // TODO: client to provide
  email: '',
  // TODO: client to provide
  streetAddress: '',
  logo: '/assets/aistudio/crossroads_garage_fence_transparent_24287a0f.png',
  logoWide: '/assets/aistudio/WhatsApp_Image_2026-11-17_at_3.41.09_AM_a5d0c9aa.jpeg',
  hubs: [
    {
      id: 'lafayette',
      city: 'Lafayette',
      state: 'IN',
      label: 'Lafayette Hub',
      route: '/locations/lafayette',
      corridor: 'I-65 North Corridor',
      regionTitle: 'Tippecanoe & Surrounding Counties',
      summary:
        'Dispatching garage door service trucks and fence crews across Tippecanoe, Montgomery, Clinton, and Boone counties.',
      // TODO: client to provide hub street address
      address: '',
    },
    {
      id: 'avon',
      city: 'Avon',
      state: 'IN',
      label: 'Avon Hub',
      route: '/locations/avon',
      corridor: 'I-70 & West Indy Metro',
      regionTitle: 'West, Central & North Indy Metro',
      summary:
        'Serving Hendricks County, Downtown Indianapolis, and the northside suburbs with fast mechanical diagnostics and perimeter builds.',
      // TODO: client to provide hub street address
      address: '',
    },
  ],
  serves:
    'Greater Indianapolis metro and Central + Northwest Indiana, residential and light commercial, along the I-65 and I-70 corridors.',
  trustChip: 'Lafayette · Avon · Indy Metro',
  valuePoints: [
    {
      index: '01',
      title: 'Local Indiana Hubs',
      description:
        'Operating out of Lafayette and Avon to serve the greater Indianapolis metro and surrounding counties.',
    },
    {
      index: '02',
      title: 'Fast, Honest Diagnostics',
      description:
        "Upfront pricing with no unnecessary upsells. We fix what's broken or replace what's worn out.",
    },
    {
      index: '03',
      title: 'Built-to-Last Materials',
      description:
        'Commercial-grade hardware, high-cycle springs, and weather-resistant fencing lumber and steel.',
    },
  ],
  about: {
    lead: 'Crossroads Garage & Fence Co. was built on straightforward trade work: show up on time, build things right the first time, and stand behind the work.',
    body: 'Whether your garage door is stuck halfway up before work or you need a secure perimeter fence installed around your property, our crew brings hands-on mechanical and construction expertise to every job site. With dual operations based in Lafayette and Avon, we deploy quickly across Central and Northwest Indiana without the overhead or runaround of massive national franchises.',
    pillars: [
      {
        index: '01',
        title: 'Show Up On Time',
        detail:
          'Clear arrival windows and direct communication from the crew working your property—no call-center runaround.',
      },
      {
        index: '02',
        title: 'Build It Right the First Time',
        detail:
          'Concrete footings set below the Indiana frost line, properly balanced spring tension, and plumb framing on every bay and post.',
      },
      {
        index: '03',
        title: 'Stand Behind the Work',
        detail:
          'We repair what is actually failing and specify durable hardware—oil-tempered springs, nylon bearings, and ground-contact lumber.',
      },
    ],
  },
};

export function formatPhoneTel(phone) {
  if (!phone) return '';
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}
