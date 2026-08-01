import Link from 'next/link'
import { CATEGORIES } from '@/lib/posts'

const categorySlug = (cat: string) => cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="text-xl font-black text-gray-900 tracking-tight">
            Apex<span className="text-blue-600">Brief</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map(cat => (
              <Link
                key={cat}
                href={`/category/${categorySlug(cat)}`}
                className="text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors"
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
