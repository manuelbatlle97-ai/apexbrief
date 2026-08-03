import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with the ApexBrief team.',
}

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-black text-gray-900 mb-4">Contact Us</h1>
      <p className="text-gray-600 mb-10">Have a question, tip, or feedback? We'd love to hear from you.</p>

      <div className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-bold text-gray-900 mb-1">General Inquiries</h2>
          <p className="text-sm text-gray-500 mb-3">Questions about our coverage or the site</p>
          <a
            href="mailto:contact@apexbrief.net"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            contact@apexbrief.net
          </a>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-bold text-gray-900 mb-1">News Tips</h2>
          <p className="text-sm text-gray-500 mb-3">Have a story we should cover?</p>
          <a
            href="mailto:tips@apexbrief.net"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            tips@apexbrief.net
          </a>
        </div>
      </div>
    </div>
  )
}
