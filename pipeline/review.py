"""
Review and approve draft articles before publishing.

Usage:
  python review.py          # review all drafts one by one
  python review.py --all    # approve all drafts without reviewing
"""

import os
import re
import argparse
import subprocess
from datetime import date

DRAFTS_DIR = os.path.join(os.path.dirname(__file__), '..', 'posts', 'drafts')
POSTS_DIR  = os.path.join(os.path.dirname(__file__), '..', 'posts')
REPO_DIR   = os.path.join(os.path.dirname(__file__), '..')

DIVIDER = "─" * 60


def list_drafts() -> list[str]:
    if not os.path.exists(DRAFTS_DIR):
        return []
    return sorted(f for f in os.listdir(DRAFTS_DIR) if f.endswith('.md'))


def parse_frontmatter(content: str) -> dict:
    meta = {}
    lines = content.splitlines()
    if lines[0].strip() == '---':
        for i, line in enumerate(lines[1:], 1):
            if line.strip() == '---':
                break
            if ':' in line:
                key, _, val = line.partition(':')
                meta[key.strip()] = val.strip().strip('"')
    return meta


def show_preview(filename: str, content: str):
    meta  = parse_frontmatter(content)
    body  = re.split(r'^---\s*$', content, maxsplit=2, flags=re.MULTILINE)[-1].strip()
    # Strip markdown headings for cleaner terminal preview
    body  = re.sub(r'^#{1,6}\s+', '', body, flags=re.MULTILINE)
    lines = body.splitlines()
    preview = '\n'.join(lines[:12])

    print(f"\n{DIVIDER}")
    print(f"FILE:     {filename}")
    print(f"TITLE:    {meta.get('title', '?')}")
    print(f"CATEGORY: {meta.get('category', '?')}")
    print(f"DATE:     {meta.get('date', '?')}")
    print(f"IMAGE:    {meta.get('image', '(none)')[:80]}")
    print(f"{DIVIDER}")
    print(preview)
    if len(lines) > 12:
        print(f"  ... ({len(lines) - 12} more lines)")
    print(DIVIDER)


def approve(filename: str):
    src  = os.path.join(DRAFTS_DIR, filename)
    dest = os.path.join(POSTS_DIR, filename)
    os.rename(src, dest)
    print(f"  Approved: {filename}")


def reject(filename: str):
    path = os.path.join(DRAFTS_DIR, filename)
    os.remove(path)
    print(f"  Rejected and deleted: {filename}")


def git_push(approved: list[str]):
    try:
        subprocess.run(["git", "-C", REPO_DIR, "add", "posts/"], check=True)
        msg = f"publish: {len(approved)} approved article(s) for {date.today().isoformat()}"
        subprocess.run(["git", "-C", REPO_DIR, "commit", "-m", msg], check=True)
        subprocess.run(["git", "-C", REPO_DIR, "push"], check=True)
        print(f"\nPushed {len(approved)} article(s) to GitHub. Vercel will deploy automatically.")
    except subprocess.CalledProcessError as e:
        print(f"Git error: {e}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--all", action="store_true", help="Approve all drafts without reviewing")
    args = parser.parse_args()

    drafts = list_drafts()

    if not drafts:
        print("No drafts to review. Run: python publish.py")
        return

    print(f"\nFound {len(drafts)} draft(s) to review.")
    approved = []

    if args.all:
        for filename in drafts:
            approve(filename)
            approved.append(filename)
    else:
        print("Commands:  y = approve  |  n = reject  |  s = skip  |  q = quit\n")
        for filename in drafts:
            path = os.path.join(DRAFTS_DIR, filename)
            with open(path, encoding="utf-8") as f:
                content = f.read()

            show_preview(filename, content)

            while True:
                choice = input("\n  Approve this article? [y/n/s/q]: ").strip().lower()
                if choice == 'y':
                    approve(filename)
                    approved.append(filename)
                    break
                elif choice == 'n':
                    reject(filename)
                    break
                elif choice == 's':
                    print(f"  Skipped: {filename}")
                    break
                elif choice == 'q':
                    print("\nReview ended early.")
                    break
                else:
                    print("  Type y, n, s, or q.")
            else:
                continue
            if choice == 'q':
                break

    if approved:
        print(f"\n{len(approved)} article(s) approved.")
        git_push(approved)
    else:
        print("\nNothing approved — nothing pushed.")


if __name__ == "__main__":
    main()
