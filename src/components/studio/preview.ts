import { REPO } from '@/lib/github-cms';

/**
 * Images the studio just uploaded aren't on the deployed site until the rebuild
 * finishes, so preview them straight from the repo instead.
 */
export function previewUrl(src: string): string {
  if (!src.startsWith('/')) return src;
  return `https://raw.githubusercontent.com/${REPO.owner}/${REPO.name}/${REPO.branch}/public${src}`;
}
