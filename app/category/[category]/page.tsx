import { getAllPosts, CATEGORIES } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'

const slugToCategory = (slug: string) =>
  CATEGORIES.find(c => c.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug)

export async function generateStaticParams() {
  return CATEGORIES.map(cat => ({ category: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-') }))
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const categoryName = slugToCategory(category)
  if (!categoryName) notFound()

  const posts = getAllPosts().filter(p => p.category === categoryName)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{categoryName}</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No articles in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => <ArticleCard key={post.slug} post={post} />)}
        </div>
      )}
    </div>
  )
}
