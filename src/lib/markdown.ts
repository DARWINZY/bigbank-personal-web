import GithubSlugger from 'github-slugger';

export interface TocItem {
  id: string;
  text: string;
}

/** Strips inline Markdown so heading text matches what rehype-slug sees. */
function plainText(md: string): string {
  return md
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*_`~]/g, '')
    .trim();
}

/**
 * Lists the `##` headings of a post for the table of contents.
 * Every heading level goes through the slugger, in order, so duplicate
 * suffixes (-1, -2) line up with the ids rehype-slug puts on the page.
 */
export function getToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];
  let inFence = false;

  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) continue;
    const m = line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!m) continue;
    const text = plainText(m[2]);
    const id = slugger.slug(text);
    if (m[1].length === 2) items.push({ id, text });
  }
  return items;
}
