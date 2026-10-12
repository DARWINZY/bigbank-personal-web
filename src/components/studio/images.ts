import type { BlogPost } from '@/data/blog';

/** Files the studio uploaded itself (slug-timestamp names); only these are safe to delete. */
export const isStudioImage = (src: string) => /^\/images\/blog\/[a-z0-9-]+-\d{13}(-\d+)?\.(webp|jpg)$/.test(src);

const markdownImage = /!\[[^\]]*\]\((\/images\/blog\/[^)\s]+)\)/g;

/** Studio-uploaded images a post uses: its cover plus any image in its content, in every language. */
export function studioImagesIn(post: BlogPost): Set<string> {
  const found = new Set<string>();
  if (isStudioImage(post.image)) found.add(post.image);
  for (const text of Object.values(post.content)) {
    for (const m of (text ?? '').matchAll(markdownImage)) {
      if (isStudioImage(m[1])) found.add(m[1]);
    }
  }
  return found;
}

/** Of `candidates`, the images no post in `posts` uses any more. */
export function unusedImages(candidates: Iterable<string>, posts: BlogPost[]): string[] {
  const inUse = new Set(posts.flatMap((p) => [...studioImagesIn(p)]));
  return [...candidates].filter((src) => !inUse.has(src));
}
