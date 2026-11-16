export const SERVICES = [
  {
    id: 'garage-door-repair',
    index: '01',
    slug: '/services/garage-door-repair',
    categoryLabel: 'Service 01 · Mechanical & Diagnostics',
    title: 'Garage Door Repair & Maintenance',
    shortTitle: 'Door Repair',
    tagline: 'Fast diagnostics and single-visit repairs for broken springs, openers, cables, and tracks.',
    heroImageKey: 'workshopToolsWall',
    overview:
      'When a garage door stops moving before work, makes a loud bang in the middle of the night, or tilts crooked in the opening, you need a technician who carries the right parts on the truck and shoots straight about what actually needs fixing. We diagnose the entire counterbalance and drive system and give you upfront pricing before turning a wrench.',
    subServices: [
      {
        id: 'broken-spring-replacement',
        index: '01.A',
        title: 'Broken Spring Replacement',
        summary:
          'Safe, fast replacement of torsion and extension springs using high-cycle, oil-tempered steel.',
        imageKey: 'structuralHardware',
        included: [
          'Full counterbalance inspection and door weight verification',
          'High-cycle oil-tempered steel torsion or extension springs',
          'Proper winding, set-screw torque, and center bearing check',
          'Safety balance test at waist-height and top travel limit',
        ],
      },
      {
        id: 'opener-repair-installation',
        index: '01.B',
        title: 'Opener Repair & Installation',
        summary:
          'Diagnostics, gear replacements, sensor alignment, and smart Wi-Fi opener upgrades (LiftMaster, Chamberlain, Genie).',
        imageKey: 'electricalDiagnostic',
        included: [
          'Motor, logic board, trolley, and drive-gear troubleshooting',
          'Photo-eye safety sensor wiring and laser alignment',
          'Travel limit and down-force calibration',
          'New LiftMaster, Chamberlain, and Genie Wi-Fi unit installation',
        ],
      },
      {
        id: 'off-track-doors-cable-repair',
        index: '01.C',
        title: 'Off-Track Doors & Cable Repair',
        summary:
          'Re-aligning derailed doors, replacing frayed lift cables, and swapping noisy rollers for quiet nylon bearings.',
        imageKey: 'technicianInspecting',
        included: [
          'Safe tension release and controlled door re-seating',
          'Galvanized aircraft-grade lift cable pair replacement',
          'Vertical and horizontal track plumb and bracket tightening',
          'Quiet sealed nylon ball-bearing roller upgrades',
        ],
      },
      {
        id: 'panel-hardware-replacement',
        index: '01.D',
        title: 'Panel & Hardware Replacement',
        summary:
          'Replacing damaged sections, worn hinges, weatherstripping, and bottom seals.',
        imageKey: 'hammerAndFasteners',
        included: [
          'Single-section matching when door model is in production',
          'Heavy-gauge numbered hinges and reinforcement struts',
          'Perimeter vinyl weatherstrip and bottom astragal rubber seal',
          'Full hinge, roller, and spring lubrication service',
        ],
      },
    ],
    process: [
      {
        step: '01',
        title: 'Describe the Symptom',
        detail: 'Tell us what the door is doing—snapped spring, humming motor, or skewed track—and which Indiana town you are in.',
      },
      {
        step: '02',
        title: 'On-Site Mechanical Inspection',
        detail: 'We inspect springs, cables, drums, rollers, hinges, and opener force settings on-site before quoting.',
      },
      {
        step: '03',
        title: 'Upfront Options, Zero Upsells',
        detail: 'You get straightforward pricing on what is worn or broken so you can approve the repair with confidence.',
      },
      {
        step: '04',
        title: 'Balanced & Tested Operation',
        detail: 'We complete the repair, balance the door manually, test safety reverse sensors, and clean up the bay.',
      },
    ],
    materials: [
      { label: 'Springs', spec: 'High-cycle oil-tempered steel torsion & extension assemblies' },
      { label: 'Rollers', spec: 'Precision-bearing nylon rollers rated for quiet daily cycles' },
      { label: 'Openers', spec: 'LiftMaster, Chamberlain, and Genie belt & chain systems' },
      { label: 'Cables', spec: 'Galvanized steel lift cables matched to door height and weight' },
    ],
    faqs: [
      {
        q: 'How fast can you fix a broken garage door spring?',
        a: 'We stock standard residential torsion and extension springs on our service trucks so most spring repairs are completed in a single visit.',
      },
      {
        q: 'Can you repair just one damaged garage door panel?',
        a: 'If the door model is still in production and the structural integrity of the remaining sections is sound, we can source and install a matching replacement panel.',
      },
      {
        q: 'Should I replace both torsion springs if only one snapped?',
        a: 'On two-spring systems, both springs carry the same cycle history. Replacing them as a matched pair balances the door evenly and prevents the second spring from failing shortly after.',
      },
      {
        q: 'My opener hums or clicks, but the door will not lift. Why?',
        a: 'That usually points to a stripped drive gear, a failed motor capacitor, or a broken spring forcing the opener to try lifting dead weight. Avoid running the motor until it is inspected.',
      },
    ],
  },
  {
    id: 'new-garage-door-installation',
    index: '02',
    slug: '/services/new-garage-door-installation',
    categoryLabel: 'Service 02 · New Construction & Replacement',
    title: 'New Garage Door Installation',
    shortTitle: 'New Doors',
    tagline: 'Precision-fitted raised-panel, carriage house, full-view glass, and insulated steel doors.',
    heroImageKey: 'modernGarageHouse',
    overview:
      'A new garage door changes both the curb appeal and daily comfort of your home or workshop. Whether you are upgrading an uninsulated builder-grade door in Avon or outfitting an oversized pole barn outside Lafayette, we measure the jamb, headroom, and backroom down to the fraction of an inch and handle complete teardown and haul-away.',
    subServices: [
      {
        id: 'residential-door-upgrades',
        index: '02.A',
        title: 'Residential Door Upgrades',
        summary:
          'Traditional raised-panel, carriage house, modern full-view glass, and insulated steel doors.',
        imageKey: 'suburbanBrickHome',
        included: [
          'Traditional raised-panel steel and stamped carriage-house designs',
          'Modern aluminum-and-glass full-view architectural doors',
          'Polystyrene and polyurethane insulated sandwich construction',
          'Optional frosted, clear, or decorative top-section glass inserts',
        ],
      },
      {
        id: 'custom-sizing-framing',
        index: '02.B',
        title: 'Custom Sizing & Framing',
        summary:
          'Precision fitting for standard single/double bays as well as oversized workshops and pole barns.',
        imageKey: 'commercialSteel',
        included: [
          'Exact rough-opening, headroom, and side-room measurements',
          'Low-headroom and high-lift track configurations where needed',
          'Wood buck framing and jamb repair prior to track installation',
          'Heavy-duty hardware for detached shops and pole barns',
        ],
      },
      {
        id: 'old-door-haul-away',
        index: '02.C',
        title: 'Old Door Haul-Away',
        summary:
          'Complete teardown and disposal of your existing door and track system.',
        imageKey: 'framingBuild',
        included: [
          'Safe unwinding and removal of old springs and tracks',
          'Full teardown of worn wood or metal door sections',
          'Swept garage floor and haul-away of all old materials',
          'Fresh perimeter weatherstripping sealed tight to the frame',
        ],
      },
    ],
    process: [
      {
        step: '01',
        title: 'Free On-Site Measurement',
        detail: 'We measure opening width, height, headroom, side-room, and framing condition right at your property.',
      },
      {
        step: '02',
        title: 'Style & Spec Selection',
        detail: 'Pick your panel architecture, insulation profile, window layout, and finish with an itemized quote.',
      },
      {
        step: '03',
        title: 'Teardown & Precision Framing',
        detail: 'We remove the old door and tracks, prep the jambs, and hang commercial-grade track and hardware.',
      },
      {
        step: '04',
        title: 'Balance, Seal & Walkthrough',
        detail: 'We calibrate spring tension, pair your opener, seal the perimeter, and walk you through operation.',
      },
    ],
    materials: [
      { label: 'Door Skins', spec: 'Heavy-gauge galvanized steel or anodized aluminum frames' },
      { label: 'Insulation', spec: 'Multi-layer insulated core options for attached garages' },
      { label: 'Tracks & Hinges', spec: 'Commercial-grade steel track with reinforced end stiles' },
      { label: 'Seals', spec: 'Flexible bottom astragal and dual-fin jamb weatherstripping' },
    ],
    faqs: [
      {
        q: 'Do you offer free estimates for new garage doors and fences?',
        a: 'Yes. We provide free, on-site measurements and itemized quotes for full garage door replacements and new fence installations.',
      },
      {
        q: 'Do you remove and dispose of my old garage door?',
        a: 'Yes. Complete teardown and haul-away of your existing sections, springs, and old track system are part of our installation process.',
      },
      {
        q: 'Can you fit oversized pole barns or non-standard garage openings?',
        a: 'Yes. We handle custom sizing, jamb framing adjustments, and high-lift or low-headroom track layouts for workshops and pole barns.',
      },
    ],
  },
  {
    id: 'fence-and-gate-construction',
    index: '03',
    slug: '/services/fence-and-gate-construction',
    categoryLabel: 'Service 03 · Perimeter & Access',
    title: 'Custom Fence & Gate Construction',
    shortTitle: 'Fences & Gates',
    tagline: 'Cedar and pine privacy fences, vinyl and aluminum perimeters, and sag-free custom gates.',
    heroImageKey: 'woodFenceBackyard',
    overview:
      'Indiana clay soil and winter freeze-thaw cycles punish shallow fence posts and flimsy gate hardware. We set every post below the frost line in concrete, build with ground-contact rated pine, Western Red Cedar, low-maintenance vinyl, or powder-coated aluminum, and frame our gates so they stay square and latch cleanly season after season.',
    subServices: [
      {
        id: 'wood-privacy-picket-fencing',
        index: '03.A',
        title: 'Wood Privacy & Picket Fencing',
        summary:
          'Cedar and pressure-treated pine privacy fences, shadowbox designs, and classic picket styles set in deep concrete footings.',
        imageKey: 'weatheredCedarFence',
        included: [
          'Ground-contact rated pressure-treated pine and Western Red Cedar',
          'Dog-ear privacy, board-on-board shadowbox, and classic picket layouts',
          'Posts set in concrete below the Indiana frost line',
          'Corrosion-resistant exterior fasteners to prevent rust streaking',
        ],
      },
      {
        id: 'vinyl-aluminum-fencing',
        index: '03.B',
        title: 'Vinyl & Aluminum Fencing',
        summary:
          'Low-maintenance, weather-resistant perimeter solutions for residential yards and pools.',
        imageKey: 'sunsetPostFence',
        included: [
          'Full-privacy and semi-privacy heavy-wall vinyl panel runs',
          'Powder-coated aluminum fencing suited for pool enclosures and slopes',
          'Racked or stepped transitions across uneven yard grades',
          'Clean post caps and matching aluminum or vinyl gate hardware',
        ],
      },
      {
        id: 'custom-gates-access',
        index: '03.C',
        title: 'Custom Gates & Access',
        summary:
          'Heavy-duty walk gates, double drive-through gates, and custom-welded or framed entry gates built not to sag.',
        imageKey: 'timberFraming',
        included: [
          'Rigid diagonal cross-braced or welded steel-frame gate builds',
          'Wide double drive-through gates for mowers, trailers, and boats',
          'Heavy-duty strap hinges, drop rods, and lockable gravity latches',
          'Oversized concrete hinge-post footings to carry gate load',
        ],
      },
      {
        id: 'fence-repair-post-replacement',
        index: '03.D',
        title: 'Fence Repair & Post Replacement',
        summary:
          'Storm damage restoration, leaning post resets, and latch/hinge upgrades.',
        imageKey: 'carpentryMeasure',
        included: [
          'Excavation and replacement of rotted or frost-heaved posts',
          'Wind and tree-limb storm damage section rebuilds',
          'Sagging gate re-squaring, hinge upgrades, and latch swaps',
          'Loose rail and picket re-fastening along existing fence lines',
        ],
      },
    ],
    process: [
      {
        step: '01',
        title: 'Property Walk & Measurement',
        detail: 'We walk your property lines, measure linear footage, check grade changes, and discuss gate placement.',
      },
      {
        step: '02',
        title: 'Itemized Material & Layout Quote',
        detail: 'You receive a clear breakdown covering lumber or vinyl/aluminum spec, post spacing, concrete footings, and gates.',
      },
      {
        step: '03',
        title: 'Frost-Line Footings & Framing',
        detail: 'Utilities are marked before digging, posts are set plumb below the frost line in concrete, and rails are framed straight.',
      },
      {
        step: '04',
        title: 'Gate Fit & Final Walkthrough',
        detail: 'Gates are hung square, latches tested, and dirt/debris cleared before we sign off with you on-site.',
      },
    ],
    materials: [
      { label: 'Lumber', spec: 'Ground-contact pressure-treated pine & Western Red Cedar' },
      { label: 'Footings', spec: 'Concrete-set posts anchored below the Indiana frost line' },
      { label: 'Metals', spec: 'Powder-coated aluminum & galvanized/stainless fasteners' },
      { label: 'Gates', spec: 'Anti-sag steel-reinforced frames and heavy-duty strap hardware' },
    ],
    faqs: [
      {
        q: 'What type of wood do you use for privacy fences?',
        a: 'We build with ground-contact rated pressure-treated pine and Western Red Cedar, setting posts in concrete below the Indiana frost line to prevent heaving and leaning.',
      },
      {
        q: 'Do I need a permit or HOA approval before building a fence?',
        a: 'Permit rules, setback lines, and HOA style guidelines vary by municipality and subdivision across Indiana. We recommend checking local requirements and HOA covenants before installation begins, and we can provide clear project specs for your submission.',
      },
      {
        q: 'How do you keep wide wooden gates from sagging over time?',
        a: 'Gate sag starts at the hinge post and the frame. We set larger, deeper concrete footings on gate posts and build rigid cross-braced or steel-framed gates with heavy-duty hinges.',
      },
      {
        q: 'Can you replace just a few leaning posts or storm-damaged sections?',
        a: 'Yes. If the rest of your fence line is in solid condition, we can reset leaning posts in fresh concrete and rebuild damaged bays without replacing the entire perimeter.',
      },
    ],
  },
];

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.id === slug || s.slug === slug);
}
