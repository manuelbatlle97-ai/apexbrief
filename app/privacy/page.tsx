import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for ApexBrief.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-black text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: August 2026</p>

      <div className="prose prose-gray max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-h2:font-black prose-h2:text-gray-900 prose-h2:text-xl">

        <p>
          ApexBrief ("we", "our", or "us") operates apexbrief.net. This page explains what information
          we collect, how we use it, and your rights.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We do not collect any personally identifiable information. We do not require registration or
          login to read our content. We may collect anonymous usage data (such as page views and referral
          sources) through standard web analytics tools to understand how readers use the site.
        </p>

        <h2>Cookies</h2>
        <p>
          We may use cookies for analytics purposes only. These cookies do not identify you personally.
          You can disable cookies in your browser settings at any time.
        </p>

        <h2>Third-Party Services</h2>
        <p>
          Our site displays images and links to content hosted by third-party news sources and image
          providers. When you click external links, you are subject to the privacy policies of those
          third-party sites. We are not responsible for their content or practices.
        </p>

        <h2>Advertising</h2>
        <p>
          We may display advertisements served by third-party ad networks, including Google AdSense.
          These networks may use cookies to serve ads based on your prior visits to our site or other
          sites. You can opt out of personalized advertising by visiting{' '}
          <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
            Google's Ads Settings
          </a>.
        </p>

        <h2>Children's Privacy</h2>
        <p>
          Our site is not directed to children under 13. We do not knowingly collect information from
          children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. Changes will be posted on this page with an
          updated date.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email us at{' '}
          <a href="mailto:contact@apexbrief.net" className="text-blue-600 hover:underline">
            contact@apexbrief.net
          </a>
        </p>
      </div>
    </div>
  )
}
