import { MetadataRoute } from 'next'
import { getAllPosts, CATEGORIES } from '@/lib/posts'

const BASE_URL = 'https://apexbrief.net'
const categorySlug = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()

  const articleUrls = posts.map(post => ({
    url:          `${BASE_URL}/articles/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'never' as const,
    priority: 0.7,
  }))

  const categoryUrls = CATEGORIES.map(cat => ({
    url:             `${BASE_URL}/category/${categorySlug(cat)}`,
    lastModified:    new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  return [
    { url: BASE_URL,               lastModified: new Date(), changeFrequency: 'daily',  priority: 1.0 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/contact`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/privacy`,  lastModified: new Date(), changeFrequency: 'monthly', priority: 0.2 },
    ...categoryUrls,
    ...articleUrls,
  ]
}
