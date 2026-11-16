export const SYMPTOMS = [
  {
    id: 'wont-open',
    label: "Door won't open",
    code: 'DX-01',
    likelyCause:
      'Most often caused by a broken counterbalance spring, engaged manual lock, or an opener motor/logic fault preventing lift.',
    recommendedService: 'Broken Spring Replacement or Opener Diagnostics',
    serviceRoute: '/services/garage-door-repair#broken-spring-replacement',
    safetyNote:
      'Avoid forcing the opener repeatedly—if a spring has lost tension, the opener cannot safely lift dead door weight.',
  },
  {
    id: 'loud-bang',
    label: 'Loud bang, then stuck',
    code: 'DX-02',
    likelyCause:
      'A sharp gunshot-like bang followed by a heavy door that only lifts a few inches is the classic sign of a snapped torsion or extension spring.',
    recommendedService: 'Broken Spring Replacement (Single-Visit Truck Stock)',
    serviceRoute: '/services/garage-door-repair#broken-spring-replacement',
    safetyNote:
      'Leave the door closed and do not pull the emergency release while vehicles are underneath unless cleared safely.',
  },
  {
    id: 'off-track',
    label: 'Tilted / off one side',
    code: 'DX-03',
    likelyCause:
      'Typically points to a snapped or unraveled lift cable on one drum, or rollers that jumped the vertical track curve.',
    recommendedService: 'Off-Track Doors & Cable Repair',
    serviceRoute: '/services/garage-door-repair#off-track-doors-cable-repair',
    safetyNote:
      'Stop running the opener right away so the crooked weight does not kink or bend the door panels.',
  },
  {
    id: 'opener-hums',
    label: "Opener hums, doesn't move",
    code: 'DX-04',
    likelyCause:
      'Often a stripped nylon drive gear inside the opener head, a failed capacitor, or a disengaged trolley carriage.',
    recommendedService: 'Opener Repair & Installation',
    serviceRoute: '/services/garage-door-repair#opener-repair-installation',
    safetyNote:
      'Check if the emergency release cord was pulled; otherwise a technician inspects the gear assembly and door balance on-site.',
  },
  {
    id: 'noisy-shaky',
    label: 'Noisy / shaky travel',
    code: 'DX-05',
    likelyCause:
      'Worn unsealed steel rollers, dry hinge pins, loose track mounting lags, or an unbalanced counterbalance spring.',
    recommendedService: 'Nylon Roller Upgrade & Hardware Tune-Up',
    serviceRoute: '/services/garage-door-repair#off-track-doors-cable-repair',
    safetyNote:
      'Quiet nylon ball-bearing rollers paired with track tightening eliminate most shuddering.',
  },
  {
    id: 'panel-damaged',
    label: 'Panel dented or cracked',
    code: 'DX-06',
    likelyCause:
      'Vehicle bump or impact damage on one section. If the door model is still produced and tracks are straight, single-panel swaps are often possible.',
    recommendedService: 'Panel & Hardware Replacement',
    serviceRoute: '/services/garage-door-repair#panel-hardware-replacement',
    safetyNote:
      'We inspect surrounding hinges and stiles on-site to verify whether a single section swap or full door is best.',
  },
  {
    id: 'seal-gap',
    label: 'Weatherstrip / bottom gap',
    code: 'DX-07',
    likelyCause:
      'Brittle rubber bottom astragal, cracked perimeter vinyl stop molding, or uneven floor contact letting drafts, water, and pests inside.',
    recommendedService: 'Bottom Seal & Perimeter Weatherstripping',
    serviceRoute: '/services/garage-door-repair#panel-hardware-replacement',
    safetyNote:
      'Final diagnosis and seal sizing are always confirmed during our on-site inspection.',
  },
];
