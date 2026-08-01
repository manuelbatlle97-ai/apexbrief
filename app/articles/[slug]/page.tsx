import { getPost, getAllSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    openGraph: { title: post.title, description: post.excerpt, images: post.image ? [post.image] : [] },
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-6">
        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{post.category}</span>
        <h1 className="mt-2 text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
        <p className="mt-2 text-gray-500 text-sm">{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      </div>

      {post.image && (
        <div className="mb-8 rounded-xl overflow-hidden aspect-video bg-gray-100">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      <div
        className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-blue-600"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  )
}
