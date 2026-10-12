'use client';

import { useCallback, useEffect, useState } from 'react';
import type { BlogPost, BlogTag } from '@/data/blog';
import {
  ACTIONS_URL,
  IMAGE_DIR,
  POSTS_PATH,
  TAGS_PATH,
  GitHubError,
  blobToBase64,
  commitFiles,
  readPosts,
  readTags,
  toJsonFile,
  verifyToken,
  type FileChange,
} from '@/lib/github-cms';
import ConnectPanel from './ConnectPanel';
import PostList from './PostList';
import PostEditor, { type PostDraft, type StagedImage } from './PostEditor';
import { studioImagesIn, unusedImages } from './images';
import TagManager from './TagManager';
import styles from '@/styles/studio.module.css';

const TOKEN_KEY = 'studio-gh-token';

type View = { kind: 'list' } | { kind: 'edit'; post: BlogPost | null };
type Toast = { kind: 'ok' | 'error'; text: string; withActions?: boolean };


function describeError(err: unknown): string {
  if (err instanceof GitHubError) {
    if (err.status === 401) return 'โทเคนไม่ถูกต้องหรือหมดอายุ สร้างโทเคนใหม่แล้วเชื่อมต่ออีกครั้ง';
    if (err.message === 'no-push' || err.status === 403)
      return 'โทเคนนี้ไม่มีสิทธิ์เขียน repo ตั้งสิทธิ์ Contents เป็น Read and write';
    if (err.status === 404)
      return 'ไม่พบไฟล์บทความบน GitHub ต้อง push โค้ดเวอร์ชันที่มีระบบ Studio ขึ้น main ก่อน';
    if (err.status === 409 || err.status === 422) return 'มีการแก้ไขชนกันบน GitHub ลองกดบันทึกอีกครั้ง';
    return `GitHub ตอบกลับว่า: ${err.message}`;
  }
  return 'เชื่อมต่อ GitHub ไม่ได้ ตรวจอินเทอร์เน็ตแล้วลองอีกครั้ง';
}

export default function Studio() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [tab, setTab] = useState<'posts' | 'tags'>('posts');
  const [view, setView] = useState<View>({ kind: 'list' });
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [connectError, setConnectError] = useState<string | null>(null);

  const load = useCallback(async (tk: string) => {
    const [p, t] = await Promise.all([readPosts(tk), readTags(tk)]);
    setPosts(p);
    setTags(t);
  }, []);

  const connect = useCallback(
    async (tk: string) => {
      setBusy(true);
      setConnectError(null);
      try {
        await verifyToken(tk);
        await load(tk);
        try {
          localStorage.setItem(TOKEN_KEY, tk);
        } catch {}
        setToken(tk);
      } catch (err) {
        setConnectError(describeError(err));
      } finally {
        setBusy(false);
        setReady(true);
      }
    },
    [load]
  );

  // Restore the token saved in this browser (localStorage isn't available during prerender)
  useEffect(() => {
    const restore = async () => {
      await Promise.resolve();
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(TOKEN_KEY);
      } catch {}
      if (saved) await connect(saved);
      else setReady(true);
    };
    restore();
  }, [connect]);

  const disconnect = () => {
    try {
      localStorage.removeItem(TOKEN_KEY);
    } catch {}
    setToken(null);
    setPosts([]);
    setTags([]);
    setView({ kind: 'list' });
  };

  /** Re-reads the latest data from GitHub, applies `build`, commits the result. */
  async function run(build: (fresh: { posts: BlogPost[]; tags: BlogTag[] }) => Promise<{
    changes: FileChange[];
    message: string;
    done: string;
  }>) {
    if (!token) return false;
    setBusy(true);
    setToast(null);
    try {
      const fresh = { posts: await readPosts(token), tags: await readTags(token) };
      const { changes, message, done } = await build(fresh);
      await commitFiles(token, changes, message);
      await load(token);
      setToast({ kind: 'ok', text: done, withActions: true });
      return true;
    } catch (err) {
      setToast({ kind: 'error', text: describeError(err) });
      return false;
    } finally {
      setBusy(false);
    }
  }

  const savePost = async (draft: PostDraft, cover: Blob | null, images: StagedImage[]) => {
    const ok = await run(async ({ posts: fresh }) => {
      const changes: FileChange[] = [];
      let image = draft.image;
      if (cover) {
        image = `/images/blog/${draft.slug}-${Date.now()}.jpg`;
        changes.push({ path: `${IMAGE_DIR}/${image.split('/').pop()}`, base64: await blobToBase64(cover) });
      }
      for (const img of images) {
        changes.push({ path: `public${img.path}`, base64: await blobToBase64(img.blob) });
      }

      const post: BlogPost = { ...draft, image };
      const existing = fresh.find((p) => p.id === post.id);
      const next = existing ? fresh.map((p) => (p.id === post.id ? post : p)) : [post, ...fresh];

      // Delete images the old version used (cover or content) that no post uses anymore
      if (existing) {
        for (const src of unusedImages(studioImagesIn(existing), next)) {
          changes.push({ path: `public${src}`, base64: null });
        }
      }

      changes.push({ path: POSTS_PATH, base64: toJsonFile(next) });
      return {
        changes,
        message: `${existing ? 'Update' : 'Add'} blog post: ${post.slug}`,
        done: existing ? 'บันทึกการแก้ไขแล้ว' : 'เผยแพร่โพสต์แล้ว',
      };
    });
    if (ok) setView({ kind: 'list' });
  };

  const deletePost = (post: BlogPost) =>
    run(async ({ posts: fresh }) => {
      const next = fresh.filter((p) => p.id !== post.id);
      const changes: FileChange[] = [{ path: POSTS_PATH, base64: toJsonFile(next) }];
      for (const src of unusedImages(studioImagesIn(post), next)) {
        changes.push({ path: `public${src}`, base64: null });
      }
      return { changes, message: `Delete blog post: ${post.slug}`, done: 'ลบโพสต์แล้ว' };
    });

  const saveTags = (nextTags: BlogTag[]) =>
    run(async () => ({
      changes: [{ path: TAGS_PATH, base64: toJsonFile(nextTags) }],
      message: 'Update blog tags',
      done: 'บันทึกแท็กแล้ว',
    }));

  if (!ready) {
    return <div className={styles.page}><p className={styles.muted}>กำลังโหลด…</p></div>;
  }

  if (!token) {
    return (
      <div className={styles.page}>
        <ConnectPanel onConnect={connect} busy={busy} error={connectError} />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={styles.brand}>
          <span className={styles.brandName}>Studio</span>
          <span className={styles.muted}>จัดการบทความ</span>
        </div>
        <div className={styles.topbarActions}>
          <a href="/th/blog/" target="_blank" rel="noopener noreferrer" className={styles.linkBtn}>
            ดูหน้าบทความ
          </a>
          <button className={styles.linkBtn} onClick={disconnect}>ออกจากระบบ</button>
        </div>
      </header>

      {toast && (
        <div className={`${styles.toast} ${toast.kind === 'error' ? styles.toastError : ''}`} role="status">
          <span>
            {toast.text}
            {toast.withActions && <> เว็บจริงจะอัปเดตในราว 2 นาที</>}
          </span>
          {toast.withActions && (
            <a href={ACTIONS_URL} target="_blank" rel="noopener noreferrer" className={styles.toastLink}>
              ดูสถานะ
            </a>
          )}
          <button className={styles.toastClose} onClick={() => setToast(null)} aria-label="ปิด">✕</button>
        </div>
      )}

      {view.kind === 'edit' ? (
        <PostEditor
          key={view.post?.id ?? 'new'}
          post={view.post}
          tags={tags}
          takenSlugs={posts.filter((p) => p.id !== view.post?.id).map((p) => p.slug)}
          busy={busy}
          onSave={savePost}
          onBack={() => setView({ kind: 'list' })}
        />
      ) : (
        <>
          <nav className={styles.tabs} aria-label="ส่วนของ Studio">
            <button
              className={`${styles.tab} ${tab === 'posts' ? styles.tabActive : ''}`}
              onClick={() => setTab('posts')}
              aria-current={tab === 'posts' ? 'page' : undefined}
            >
              บทความ <span className={styles.count}>{posts.length}</span>
            </button>
            <button
              className={`${styles.tab} ${tab === 'tags' ? styles.tabActive : ''}`}
              onClick={() => setTab('tags')}
              aria-current={tab === 'tags' ? 'page' : undefined}
            >
              แท็ก <span className={styles.count}>{tags.length}</span>
            </button>
          </nav>

          {tab === 'posts' ? (
            <PostList
              posts={posts}
              tags={tags}
              busy={busy}
              onNew={() => setView({ kind: 'edit', post: null })}
              onEdit={(post) => setView({ kind: 'edit', post })}
              onDelete={deletePost}
            />
          ) : (
            <TagManager tags={tags} posts={posts} busy={busy} onSave={saveTags} />
          )}
        </>
      )}
    </div>
  );
}
