import Link from 'next/link'
import { PostMeta } from '@/lib/posts'

export default function ArticleCard({ post }: { post: PostMeta }) {
  return (
    <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
      {post.image && (
        <div className="aspect-video bg-gray-100 overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{post.category}</span>
        <h2 className="mt-1 text-lg font-bold text-gray-900 leading-snug">
          <Link href={`/articles/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h2>
        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
        <p className="mt-3 text-xs text-gray-400">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>
    </article>
  )
}
