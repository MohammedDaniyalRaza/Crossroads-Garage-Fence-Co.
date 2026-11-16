import { useEffect } from 'react';
import { BUSINESS } from '../data/business.js';
import { ALL_TOWNS } from '../data/areas.js';

function setMetaTag(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

export function buildLocalBusinessSchema() {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const areaServed = ALL_TOWNS.map((town) => ({
    '@type': 'City',
    name: `${town}, IN`,
  }));

  const locations = BUSINESS.hubs.map((hub) => {
    const node: Record<string, unknown> = {
      '@type': 'LocalBusiness',
      name: `${BUSINESS.name} — ${hub.city}`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: hub.city,
        addressRegion: hub.state,
        addressCountry: 'US',
        ...(hub.address ? { streetAddress: hub.address } : {}),
      },
      areaServed,
    };
    if (BUSINESS.phone) node.telephone = BUSINESS.phone;
    if (BUSINESS.email) node.email = BUSINESS.email;
    return node;
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: BUSINESS.name,
    description: BUSINESS.tagline,
    url: origin || undefined,
    areaServed,
    subOrganization: locations,
    ...(BUSINESS.phone ? { telephone: BUSINESS.phone } : {}),
    ...(BUSINESS.email ? { email: BUSINESS.email } : {}),
  };
}

export function buildFaqSchema(items: Array<{ question?: string; q?: string; answer?: string; a?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question || item.q || '',
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer || item.a || '',
      },
    })),
  };
}

export function buildServiceSchema(service: {
  title: string;
  overview: string;
  slug: string;
  subServices: Array<{ title: string; summary: string }>;
}) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.overview,
    url: `${origin}${service.slug}`,
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: BUSINESS.name,
    },
    areaServed: ALL_TOWNS.map((t) => `${t}, IN`),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.title,
      itemListElement: service.subServices.map((sub) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: sub.title,
          description: sub.summary,
        },
      })),
    },
  };
}

interface UseSeoOptions {
  title: string;
  description: string;
  path?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
}

export function useSeo({ title, description, path, jsonLd }: UseSeoOptions) {
  useEffect(() => {
    const fullTitle = title.includes(BUSINESS.name) ? title : `${title} | ${BUSINESS.name}`;
    document.title = fullTitle;

    const currentUrl =
      typeof window !== 'undefined'
        ? `${window.location.origin}${path || window.location.pathname}`
        : '';

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', fullTitle);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', currentUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    if (currentUrl) setCanonical(currentUrl);

    const existing = document.querySelectorAll('script[data-crossroads-ld="true"]');
    existing.forEach((node) => node.remove());

    const schemas: Array<Record<string, unknown>> = [buildLocalBusinessSchema()];
    if (jsonLd) {
      if (Array.isArray(jsonLd)) {
        schemas.push(...jsonLd);
      } else {
        schemas.push(jsonLd);
      }
    }

    const created: HTMLScriptElement[] = [];
    schemas.forEach((schema) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.crossroadsLd = 'true';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      created.push(script);
    });

    return () => {
      created.forEach((node) => node.remove());
    };
  }, [title, description, path, jsonLd]);
}
