import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/admissions`,
      lastModified: new Date(),
      priority: 0.9,
    },
    {
      url: `${baseUrl}/academics`,
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: `${baseUrl}/notices`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/events`,
      lastModified: new Date(),
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/downloads`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/staff`,
      lastModified: new Date(),
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      priority: 0.8,
    },
  ]
}
