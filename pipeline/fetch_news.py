"""
Fetch top news articles by category from NewsAPI.
Returns a list of candidate articles for writing.
"""

import os
import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

NEWS_API_KEY = os.getenv("NEWS_API_KEY")

# "headlines" uses /v2/top-headlines with category+country
# "search" uses /v2/everything with a keyword query
CATEGORY_CONFIG = {
    "Tech & AI": {
        "endpoint": "everything",
        "params": {"q": "artificial intelligence OR AI OR technology", "language": "en", "sortBy": "publishedAt"},
    },
    "Money & Finance": {
        "endpoint": "everything",
        "params": {"q": "economy OR stock market OR finance OR inflation", "language": "en", "sortBy": "publishedAt"},
    },
    "Sports": {
        "endpoint": "headlines",
        "params": {"category": "sports", "country": "us"},
    },
    "Health & Wellness": {
        "endpoint": "everything",
        "params": {"q": "health OR wellness OR medicine OR fitness", "language": "en", "sortBy": "publishedAt"},
    },
    "US Current Events": {
        "endpoint": "headlines",
        "params": {"category": "general", "country": "us"},
    },
}

BASE_URL = "https://newsapi.org/v2"


def fetch_candidates(category: str, max_results: int = 5) -> list[dict]:
    config = CATEGORY_CONFIG.get(category, CATEGORY_CONFIG["US Current Events"])
    endpoint = "top-headlines" if config["endpoint"] == "headlines" else "everything"

    params = {"apiKey": NEWS_API_KEY, "pageSize": max_results}
    params.update(config["params"])

    resp = requests.get(f"{BASE_URL}/{endpoint}", params=params, timeout=10)
    resp.raise_for_status()
    articles = resp.json().get("articles", [])

    return [
        {
            "title":       a.get("title", ""),
            "description": a.get("description", ""),
            "url":         a.get("url", ""),
            "source":      a.get("source", {}).get("name", ""),
            "published":   a.get("publishedAt", ""),
            "image_url":   a.get("urlToImage", ""),
        }
        for a in articles
        if a.get("title") and "[Removed]" not in a.get("title", "")
    ]


if __name__ == "__main__":
    for cat in CATEGORY_CONFIG:
        print(f"\n--- {cat} ---")
        results = fetch_candidates(cat, max_results=3)
        for r in results:
            print(f"  {r['title'][:80]}")
