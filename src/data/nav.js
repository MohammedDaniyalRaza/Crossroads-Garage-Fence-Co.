export const PRIMARY_NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services', hasMegaMenu: true },
  { label: 'Projects', to: '/projects' },
  { label: 'Service Area', to: '/service-area' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'FAQ', to: '/faq' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const FOOTER_LINKS = {
  services: [
    { label: 'All Services Overview', to: '/services' },
    { label: 'Garage Door Repair & Maintenance', to: '/services/garage-door-repair' },
    { label: 'New Garage Door Installation', to: '/services/new-garage-door-installation' },
    { label: 'Custom Fence & Gate Construction', to: '/services/fence-and-gate-construction' },
    { label: 'Free Estimate Request', to: '/contact' },
  ],
  coverage: [
    { label: 'Full Indiana Service Area', to: '/service-area' },
    { label: 'Lafayette & Tippecanoe Hub', to: '/locations/lafayette' },
    { label: 'Avon & West Indy Hub', to: '/locations/avon' },
  ],
  company: [
    { label: 'About Crossroads', to: '/about' },
    { label: 'Sample Project Gallery', to: '/projects' },
    { label: 'Customer Reviews', to: '/testimonials' },
    { label: 'Frequently Asked Questions', to: '/faq' },
  ],
};

export const SITEMAP_ROUTES = [
  { path: '/', title: 'Home', priority: 1.0 },
  { path: '/services', title: 'Services Overview', priority: 0.9 },
  { path: '/services/garage-door-repair', title: 'Garage Door Repair & Maintenance', priority: 0.9 },
  { path: '/services/new-garage-door-installation', title: 'New Garage Door Installation', priority: 0.9 },
  { path: '/services/fence-and-gate-construction', title: 'Custom Fence & Gate Construction', priority: 0.9 },
  { path: '/projects', title: 'Projects & Before/After Gallery', priority: 0.8 },
  { path: '/service-area', title: 'Indiana Service Area', priority: 0.8 },
  { path: '/locations/lafayette', title: 'Lafayette, IN Hub', priority: 0.8 },
  { path: '/locations/avon', title: 'Avon, IN Hub', priority: 0.8 },
  { path: '/about', title: 'About Crossroads Garage & Fence Co.', priority: 0.7 },
  { path: '/testimonials', title: 'Customer Reviews', priority: 0.7 },
  { path: '/faq', title: 'Frequently Asked Questions', priority: 0.8 },
  { path: '/contact', title: 'Get a Free Estimate', priority: 0.95 },
];
