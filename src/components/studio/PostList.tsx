'use client';

import { type BlogPost, type BlogTag, getTag, readableTextColor } from '@/data/blog';
import { previewUrl } from './preview';
import styles from '@/styles/studio.module.css';

interface Props {
  posts: BlogPost[];
  tags: BlogTag[];
  busy: boolean;
  onNew: () => void;
  onEdit: (post: BlogPost) => void;
  onDelete: (post: BlogPost) => void;
}

export default function PostList({ posts, tags, busy, onNew, onEdit, onDelete }: Props) {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <section>
      <div className={styles.sectionHead}>
        <p className={styles.muted}>โพสต์ใหม่จะขึ้นเป็นอันแรกในหน้าบทความ</p>
        <button className={styles.primaryBtn} onClick={onNew} disabled={busy}>
          เขียนโพสต์ใหม่
        </button>
      </div>

      {sorted.length === 0 ? (
        <div className={styles.emptyState}>
          <p>ยังไม่มีโพสต์</p>
          <button className={styles.primaryBtn} onClick={onNew}>เขียนโพสต์แรก</button>
        </div>
      ) : (
        <ul className={styles.postList}>
          {sorted.map((post) => {
            const tag = getTag(post.tag, tags);
            return (
              <li key={post.id} className={styles.postRow}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={previewUrl(post.image)} alt="" className={styles.thumb} loading="lazy" />
                <div className={styles.postInfo}>
                  <button className={styles.postTitle} onClick={() => onEdit(post)}>
                    {post.title.th}
                  </button>
                  <div className={styles.postMeta}>
                    <span
                      className={styles.tagPill}
                      style={{ background: tag.color, color: readableTextColor(tag.color) }}
                    >
                      {tag.label}
                    </span>
                    <span>{post.date}</span>
                    <a href={`/th/blog/${post.slug}/`} target="_blank" rel="noopener noreferrer">
                      /blog/{post.slug}
                    </a>
                  </div>
                </div>
                <div className={styles.rowActions}>
                  <button className={styles.ghostBtn} onClick={() => onEdit(post)} disabled={busy}>
                    แก้ไข
                  </button>
                  <button
                    className={`${styles.ghostBtn} ${styles.dangerText}`}
                    disabled={busy}
                    onClick={() => {
                      if (confirm(`ลบโพสต์ "${post.title.th}"? ลบแล้วกู้คืนจากหน้านี้ไม่ได้`)) onDelete(post);
                    }}
                  >
                    ลบ
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
