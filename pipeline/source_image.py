"""
Find a relevant image from Pexels for an article.
Falls back to empty string if nothing found (site handles missing images gracefully).
"""

import os
import requests
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
PEXELS_URL = "https://api.pexels.com/v1/search"


def get_image_url(keywords: str, fallback_query: str = "news") -> str:
    query = keywords.split(",")[0].strip() if keywords else fallback_query

    headers = {"Authorization": PEXELS_API_KEY}
    params = {"query": query, "per_page": 1, "orientation": "landscape"}

    try:
        resp = requests.get(PEXELS_URL, headers=headers, params=params, timeout=10)
        resp.raise_for_status()
        photos = resp.json().get("photos", [])
        if photos:
            return photos[0]["src"]["large2x"]
    except Exception as e:
        print(f"Pexels error: {e}")

    return ""


if __name__ == "__main__":
    url = get_image_url("artificial intelligence, technology")
    print(f"Image URL: {url}")
