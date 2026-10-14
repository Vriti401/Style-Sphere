import { SEO_PAGE_MAP, SeoMeta } from '../data/seoConfig';

function setMetaTag(nameOrProperty: 'name' | 'property', key: string, content: string) {
  let element = document.head.querySelector(`meta[${nameOrProperty}="${key}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(nameOrProperty, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function applySeoMetadata(meta: SeoMeta) {
  // Update Document Title
  document.title = meta.title;

  // Standard Meta Description
  setMetaTag('name', 'description', meta.metaDescription);

  // OpenGraph Tags
  setMetaTag('property', 'og:title', meta.title);
  setMetaTag('property', 'og:description', meta.metaDescription);
  setMetaTag('property', 'og:type', meta.ogType || 'website');

  // Twitter Cards
  setMetaTag('name', 'twitter:title', meta.title);
  setMetaTag('name', 'twitter:description', meta.metaDescription);

  // Canonical and OG URL
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const canonicalUrl = `${origin}${meta.canonicalPath}`;
  setCanonical(canonicalUrl);
  setMetaTag('property', 'og:url', canonicalUrl);
}

export function getSeoForPath(path: string): SeoMeta {
  const normalized = path.replace(/\/$/, '') || '/';
  if (SEO_PAGE_MAP[normalized]) {
    return SEO_PAGE_MAP[normalized];
  }
  // Fallback for article slug paths
  const slug = normalized.replace(/^\//, '');
  return {
    title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} | Sartorial Mind`,
    metaDescription: 'Read this research-led treatise in Sartorial Mind on the psychology of dress and enclothed cognition.',
    mainKeyword: slug.replace(/-/g, ' '),
    relatedKeywords: ['psychology of dress', 'enclothed cognition'],
    canonicalPath: normalized,
    ogType: 'article',
    h1: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}
