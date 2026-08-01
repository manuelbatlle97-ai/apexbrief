import { getPost, getAllSlugs } from '@/lib/posts'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ClientImage from '@/components/ClientImage'
import type { Metadata } from 'next'

const CATEGORY_COLORS: Record<string, string> = {
  'Tech & AI':         'bg-violet-100 text-violet-700',
  'Money & Finance':   'bg-emerald-100 text-emerald-700',
  'Sports':            'bg-orange-100 text-orange-700',
  'Health & Wellness': 'bg-sky-100 text-sky-700',
  'US Current Events': 'bg-red-100 text-red-700',
}

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

  const badgeClass = CATEGORY_COLORS[post.category] ?? 'bg-gray-100 text-gray-600'
  const categorySlug = post.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')

  return (
    <div className="max-w-3xl mx-auto">
      {/* Back link */}
      <Link href="/" className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-gray-700 mb-8 transition-colors">
        ← Back to headlines
      </Link>

      {/* Article header */}
      <div className="mb-8">
        <Link href={`/category/${categorySlug}`}>
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${badgeClass}`}>
            {post.category}
          </span>
        </Link>
        <h1 className="mt-4 text-4xl font-black text-gray-900 leading-tight">{post.title}</h1>
        <p className="mt-3 text-lg text-gray-500 leading-relaxed">{post.excerpt}</p>
        <p className="mt-4 text-sm text-gray-400">
          {new Date(post.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      {/* Hero image */}
      {post.image && (
        <div className="mb-10 rounded-2xl overflow-hidden aspect-video bg-gray-100">
          <ClientImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-gray-200 mb-10" />

      {/* Article body */}
      <div
        className="prose prose-gray max-w-none
          prose-headings:font-black prose-headings:text-gray-900
          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-base
          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
          prose-strong:text-gray-900
          prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Footer separator */}
      <div className="border-t border-gray-200 mt-12 pt-6 text-sm text-gray-400">
        Published by ApexBrief · {new Date(post.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </div>
    </div>
  )
}
