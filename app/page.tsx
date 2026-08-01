import { getAllPosts } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'

export default function HomePage() {
  const posts = getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div>
      {featured ? (
        <div className="mb-10">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Top Story</p>
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            {featured.image && (
              <div className="aspect-video bg-gray-100 overflow-hidden max-h-96">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-6">
              <span className="text-xs font-semibold text-blue-600 uppercase">{featured.category}</span>
              <h1 className="mt-1 text-3xl font-bold text-gray-900 leading-tight">
                <a href={`/articles/${featured.slug}`} className="hover:underline">{featured.title}</a>
              </h1>
              <p className="mt-3 text-gray-600">{featured.excerpt}</p>
              <p className="mt-3 text-xs text-gray-400">{new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 text-gray-400">
          <p className="text-xl font-semibold">No articles yet.</p>
          <p className="mt-2 text-sm">The publishing pipeline will populate this page automatically.</p>
        </div>
      )}

      {rest.length > 0 && (
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Latest</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => <ArticleCard key={post.slug} post={post} />)}
          </div>
        </div>
      )}
    </div>
  )
}
