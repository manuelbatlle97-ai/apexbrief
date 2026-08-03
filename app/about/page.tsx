import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about ApexBrief — daily news coverage on Tech, Finance, Sports, Health, and US Current Events.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-black text-gray-900 mb-6">About ApexBrief</h1>

      <div className="prose prose-gray max-w-none prose-p:text-gray-700 prose-p:leading-relaxed prose-h2:font-black prose-h2:text-gray-900">
        <p>
          ApexBrief is a daily news publication covering the stories that matter most across five categories:
          Technology & AI, Money & Finance, Sports, Health & Wellness, and US Current Events.
        </p>

        <h2>What We Do</h2>
        <p>
          We scan hundreds of news sources every day and surface the most relevant, timely stories — written
          in a clear, concise format so you can stay informed without spending hours reading the news.
        </p>

        <h2>Our Coverage</h2>
        <ul>
          <li><strong>Tech & AI</strong> — Artificial intelligence, software, gadgets, and the companies shaping the digital world</li>
          <li><strong>Money & Finance</strong> — Markets, the economy, personal finance, and business</li>
          <li><strong>Sports</strong> — Scores, trades, analysis, and the stories behind the games</li>
          <li><strong>Health & Wellness</strong> — Medical research, fitness, nutrition, and mental health</li>
          <li><strong>US Current Events</strong> — Politics, society, and the news driving conversation across the country</li>
        </ul>

        <h2>Contact</h2>
        <p>
          Questions or feedback? Reach us at{' '}
          <a href="mailto:contact@apexbrief.net" className="text-blue-600 hover:underline">
            contact@apexbrief.net
          </a>
        </p>
      </div>
    </div>
  )
}
