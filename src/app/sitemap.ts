import type { MetadataRoute } from 'next';
import { siteUrl } from '@/data/seo';
import { projects } from '@/data/projects';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', '/work/', '/about/', '/contact/', ...projects.map((p) => `/work/${p.slug}/`)].map(
    (path) => ({
      url: siteUrl + path,
      changeFrequency: 'monthly',
      priority: path === '/' ? 1 : path === '/work/' ? 0.9 : 0.7,
    }),
  );
}
