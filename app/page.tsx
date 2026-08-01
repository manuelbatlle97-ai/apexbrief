import { getAllPosts } from '@/lib/posts'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

export default function HomePage() {
  const posts = getAllPosts()
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div>
      {featured ? (
        <div className="mb-12">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Top Story</p>
          <Link href={`/articles/${featured.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100">
            {featured.image ? (
              <div className="aspect-[2/1] overflow-hidden bg-gray-100">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-[1.01] transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              </div>
            ) : (
              <div className="aspect-[2/1] bg-gradient-to-br from-blue-50 to-indigo-100" />
            )}
            <div className="p-8">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{featured.category}</span>
              <h1 className="mt-2 text-3xl font-black text-gray-900 leading-tight group-hover:text-blue-700 transition-colors">
                {featured.title}
              </h1>
              <p className="mt-3 text-gray-600 text-base leading-relaxed max-w-3xl">{featured.excerpt}</p>
              <p className="mt-4 text-xs text-gray-400">
                {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </p>
            </div>
          </Link>
        </div>
      ) : (
        <div className="text-center py-24 text-gray-400">
          <p className="text-xl font-semibold">No articles yet.</p>
          <p className="mt-2 text-sm">Run the publishing pipeline to populate this page.</p>
        </div>
      )}

      {rest.length > 0 && (
        <div>
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Latest</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(post => <ArticleCard key={post.slug} post={post} />)}
          </div>
        </div>
      )}
    </div>
  )
}
