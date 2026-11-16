export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export function buildEstimateUrl(params?: {
  service?: string;
  style?: string;
  town?: string;
  symptom?: string;
}) {
  if (!params) return '/contact';
  const sp = new URLSearchParams();
  if (params.service) sp.set('service', params.service);
  if (params.style) sp.set('style', params.style);
  if (params.town) sp.set('town', params.town);
  if (params.symptom) sp.set('symptom', params.symptom);
  const query = sp.toString();
  return query ? `/contact?${query}` : '/contact';
}
