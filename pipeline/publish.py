"""
Full publishing pipeline for ApexBrief.
Fetches news → writes articles → sources images → saves markdown → git push.

Usage:
  python publish.py                         # save drafts for review (default)
  python publish.py --publish               # skip review, push directly to live site
  python publish.py --category "Tech & AI"  # one category only
  python publish.py --count 3               # articles per category
"""

import os
import re
import argparse
import subprocess
from datetime import date

from fetch_news import fetch_candidates, CATEGORY_CONFIG
from write_article import write_article
from source_image import get_image_url

POSTS_DIR   = os.path.join(os.path.dirname(__file__), '..', 'posts')
DRAFTS_DIR  = os.path.join(os.path.dirname(__file__), '..', 'posts', 'drafts')
REPO_DIR    = os.path.join(os.path.dirname(__file__), '..')

os.makedirs(DRAFTS_DIR, exist_ok=True)


def slugify(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[^a-z0-9\s-]", "", slug)
    slug = re.sub(r"\s+", "-", slug.strip())
    slug = re.sub(r"-+", "-", slug)
    return slug[:60].rstrip("-")


def already_exists(slug: str) -> bool:
    return (
        os.path.exists(os.path.join(POSTS_DIR, f"{slug}.md")) or
        os.path.exists(os.path.join(DRAFTS_DIR, f"{slug}.md"))
    )


def build_content(slug: str, article: dict, category: str, image_url: str) -> str:
    today    = date.today().isoformat()
    title    = article["title"].replace('"', '\\"')
    excerpt  = article["excerpt"].replace('"', '\\"')
    keywords = article["keywords"]
    body     = article["body"]
    return f"""---
title: "{title}"
date: "{today}"
category: "{category}"
excerpt: "{excerpt}"
image: "{image_url}"
keywords: "{keywords}"
---

{body}
"""


def save_draft(slug: str, content: str) -> str:
    path = os.path.join(DRAFTS_DIR, f"{slug}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Draft saved: posts/drafts/{slug}.md")
    return path


def save_and_push(slug: str, content: str):
    path = os.path.join(POSTS_DIR, f"{slug}.md")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  Published: posts/{slug}.md")
    return path


def git_push(slugs: list[str]):
    try:
        subprocess.run(["git", "-C", REPO_DIR, "add", "posts/"], check=True)
        msg = f"publish: {len(slugs)} article(s) for {date.today().isoformat()}"
        subprocess.run(["git", "-C", REPO_DIR, "commit", "-m", msg], check=True)
        subprocess.run(["git", "-C", REPO_DIR, "push"], check=True)
        print(f"\nPushed {len(slugs)} article(s) to GitHub. Vercel will deploy automatically.")
    except subprocess.CalledProcessError as e:
        print(f"Git error: {e}")


def run_category(category: str, count: int, as_draft: bool):
    print(f"\n[{category}]")
    candidates = fetch_candidates(category, max_results=count + 4)
    saved = []

    for candidate in candidates:
        if len(saved) >= count:
            break
        slug = slugify(candidate["title"])
        if already_exists(slug):
            print(f"  Skip (exists): {slug}")
            continue
        print(f"  Writing: {candidate['title'][:70]}")
        try:
            article   = write_article(candidate, category)
            image_url = candidate.get("image_url") or get_image_url(article.get("keywords", ""), fallback_query=category)
            content   = build_content(slug, article, category, image_url)
            if as_draft:
                save_draft(slug, content)
            else:
                save_and_push(slug, content)
            saved.append(slug)
        except Exception as e:
            print(f"  Error: {e}")

    return saved


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--category", default=None)
    parser.add_argument("--count", type=int, default=1)
    parser.add_argument("--publish", action="store_true", help="Skip review and push live immediately")
    args = parser.parse_args()

    as_draft = not args.publish
    all_saved = []

    if args.category:
        all_saved = run_category(args.category, args.count, as_draft)
    else:
        for category in CATEGORY_CONFIG:
            slugs = run_category(category, args.count, as_draft)
            all_saved.extend(slugs)

    if not all_saved:
        print("\nNo new articles generated.")
        return

    if as_draft:
        print(f"\n{len(all_saved)} draft(s) saved to posts/drafts/")
        print("Run: python review.py  -- to approve and publish")
    else:
        git_push(all_saved)


if __name__ == "__main__":
    main()
