import Link from 'next/link'
import { CATEGORIES } from '@/lib/posts'

const categorySlug = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900 tracking-tight">
            ApexBrief
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={`/category/${categorySlug(cat)}`}
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
