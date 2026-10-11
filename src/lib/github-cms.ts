import type { BlogPost, BlogTag } from '@/data/blog';

// The site is a static export on GitHub Pages, so the studio "saves" by committing
// to the repo. The push to main triggers the Pages workflow, which rebuilds the site.

export const REPO = { owner: 'DARWINZY', name: 'bigbank-personal-web', branch: 'main' };
export const POSTS_PATH = 'src/data/blog-posts.json';
export const TAGS_PATH = 'src/data/blog-tags.json';
export const IMAGE_DIR = 'public/images/blog';
export const ACTIONS_URL = `https://github.com/${REPO.owner}/${REPO.name}/actions`;

const API = `https://api.github.com/repos/${REPO.owner}/${REPO.name}`;

export class GitHubError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

async function gh<T>(token: string, path: string, init: RequestInit = {}, accept = 'application/vnd.github+json'): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: accept,
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new GitHubError(body.message ?? res.statusText, res.status);
  }
  return (accept.endsWith('raw+json') ? res.text() : res.json()) as Promise<T>;
}

/** Throws a GitHubError with a human message when the token can't write to the repo. */
export async function verifyToken(token: string): Promise<void> {
  const repo = await gh<{ permissions?: { push?: boolean } }>(token, '');
  if (!repo.permissions?.push) {
    throw new GitHubError('no-push', 403);
  }
}

async function readJson<T>(token: string, path: string): Promise<T> {
  const text = await gh<string>(
    token,
    `/contents/${path}?ref=${REPO.branch}`,
    {},
    'application/vnd.github.raw+json'
  );
  return JSON.parse(text) as T;
}

export const readPosts = (token: string) => readJson<BlogPost[]>(token, POSTS_PATH);
export const readTags = (token: string) => readJson<BlogTag[]>(token, TAGS_PATH);

function utf8ToBase64(text: string): string {
  return bytesToBase64(new TextEncoder().encode(text));
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}

export const toJsonFile = (data: unknown) => utf8ToBase64(JSON.stringify(data, null, 2) + '\n');

export async function blobToBase64(blob: Blob): Promise<string> {
  return bytesToBase64(new Uint8Array(await blob.arrayBuffer()));
}

/** A file to write (base64 content) or delete (null). */
export type FileChange = { path: string; base64: string | null };

/** Writes several files as one commit, so one save = one deploy. */
export async function commitFiles(token: string, changes: FileChange[], message: string): Promise<void> {
  const ref = await gh<{ object: { sha: string } }>(token, `/git/ref/heads/${REPO.branch}`);
  const head = await gh<{ tree: { sha: string } }>(token, `/git/commits/${ref.object.sha}`);

  const tree = await Promise.all(
    changes.map(async ({ path, base64 }) => {
      if (base64 === null) return { path, mode: '100644', type: 'blob', sha: null };
      const blob = await gh<{ sha: string }>(token, '/git/blobs', {
        method: 'POST',
        body: JSON.stringify({ content: base64, encoding: 'base64' }),
      });
      return { path, mode: '100644', type: 'blob', sha: blob.sha };
    })
  );

  const newTree = await gh<{ sha: string }>(token, '/git/trees', {
    method: 'POST',
    body: JSON.stringify({ base_tree: head.tree.sha, tree }),
  });
  const commit = await gh<{ sha: string }>(token, '/git/commits', {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [ref.object.sha] }),
  });
  await gh(token, `/git/refs/heads/${REPO.branch}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha }),
  });
}

/** Shrinks an image to at most `maxWidth` and re-encodes it as WebP to keep the repo light. */
export async function compressImage(file: File, maxWidth = 1600): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, maxWidth / bitmap.width);
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('encode failed'))), 'image/webp', 0.85)
  );
}
