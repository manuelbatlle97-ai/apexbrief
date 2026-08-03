import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-400">© {new Date().getFullYear()} ApexBrief. All rights reserved.</p>
        <nav className="flex items-center gap-6">
          <Link href="/about"   className="text-sm text-gray-400 hover:text-gray-700 transition-colors">About</Link>
          <Link href="/contact" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Contact</Link>
          <Link href="/privacy" className="text-sm text-gray-400 hover:text-gray-700 transition-colors">Privacy Policy</Link>
        </nav>
      </div>
    </footer>
  )
}
