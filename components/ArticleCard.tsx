import Link from 'next/link'
import { PostMeta } from '@/lib/posts'
import ClientImage from '@/components/ClientImage'

const CATEGORY_COLORS: Record<string, string> = {
  'Tech & AI':         'bg-violet-100 text-violet-700',
  'Money & Finance':   'bg-emerald-100 text-emerald-700',
  'Sports':            'bg-orange-100 text-orange-700',
  'Health & Wellness': 'bg-sky-100 text-sky-700',
  'US Current Events': 'bg-red-100 text-red-700',
}

export default function ArticleCard({ post }: { post: PostMeta }) {
  const badgeClass = CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'

  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
      {post.image ? (
        <div className="aspect-video overflow-hidden bg-gray-100">
          <ClientImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <span className="text-gray-400 text-sm font-medium">{post.category}</span>
        </div>
      )}

      <div className="p-5 flex flex-col flex-1">
        <span className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
          {post.category}
        </span>
        <h2 className="mt-2 text-base font-bold text-gray-900 leading-snug line-clamp-3">
          <Link href={`/articles/${post.slug}`} className="hover:text-blue-700 transition-colors">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">{post.excerpt}</p>
        <p className="mt-4 text-xs text-gray-400">
          {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </article>
  )
}
