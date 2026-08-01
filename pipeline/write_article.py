"""
Use Claude to write a full SEO article from a news headline + description.
Returns a dict with title, excerpt, keywords, and body (markdown).
"""

import os
import anthropic
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))


SYSTEM_PROMPT = """You are a professional news writer for ApexBrief, a concise US news site.
Write factual, engaging articles in a clear journalistic style.
Never fabricate quotes or specific statistics not mentioned in the source material.
Format output as valid JSON only — no markdown fences, no extra text."""

ARTICLE_PROMPT = """Write a news article based on this headline and description.

Headline: {title}
Description: {description}
Source: {source}
Category: {category}

Return JSON with exactly these fields:
{{
  "title": "SEO-optimized article title (max 70 chars)",
  "excerpt": "2-sentence summary for the article card (max 160 chars)",
  "keywords": "comma-separated SEO keywords (8-12 keywords)",
  "body": "Full article in markdown. Use ## subheadings. 4-6 paragraphs. ~400 words. Do not mention ApexBrief in the body."
}}"""


def write_article(candidate: dict, category: str) -> dict:
    prompt = ARTICLE_PROMPT.format(
        title=candidate["title"],
        description=candidate["description"] or candidate["title"],
        source=candidate["source"],
        category=category,
    )

    message = client.messages.create(
        model="claude-haiku-4-5-20251001",
        max_tokens=1500,
        messages=[{"role": "user", "content": prompt}],
        system=SYSTEM_PROMPT,
    )

    import json, re
    text = message.content[0].text.strip()
    # Strip markdown code fences if present
    text = re.sub(r"^```(?:json)?\s*", "", text)
    text = re.sub(r"\s*```$", "", text)
    return json.loads(text)


if __name__ == "__main__":
    import json
    from fetch_news import fetch_candidates

    candidates = fetch_candidates("Tech & AI", max_results=1)
    if candidates:
        print(f"Writing article for: {candidates[0]['title']}")
        article = write_article(candidates[0], "Tech & AI")
        print(json.dumps(article, indent=2))
