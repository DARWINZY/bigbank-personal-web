'use client';

import { useState } from 'react';
import { type BlogPost, type BlogTag, readableTextColor } from '@/data/blog';
import styles from '@/styles/studio.module.css';

const PRESET_COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6', '#EF4444', '#14B8A6', '#64748B'];

function makeId(label: string, taken: string[]): string {
  const base = label.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'tag';
  let id = base;
  for (let i = 2; taken.includes(id); i++) id = `${base}-${i}`;
  return id;
}

interface Props {
  tags: BlogTag[];
  posts: BlogPost[];
  busy: boolean;
  onSave: (tags: BlogTag[]) => void;
}

export default function TagManager({ tags, posts, busy, onSave }: Props) {
  const [draft, setDraft] = useState<BlogTag[]>(tags);
  const [newLabel, setNewLabel] = useState('');
  const [error, setError] = useState<string | null>(null);

  const dirty = JSON.stringify(draft) !== JSON.stringify(tags);
  const usage = (id: string) => posts.filter((p) => p.tag === id).length;

  const update = (id: string, patch: Partial<BlogTag>) =>
    setDraft((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));

  const add = () => {
    const label = newLabel.trim();
    if (!label) return;
    const color = PRESET_COLORS[draft.length % PRESET_COLORS.length];
    setDraft((prev) => [...prev, { id: makeId(label, prev.map((t) => t.id)), label, color }]);
    setNewLabel('');
  };

  const save = () => {
    if (draft.some((t) => !t.label.trim())) {
      setError('ทุกแท็กต้องมีชื่อ');
      return;
    }
    setError(null);
    onSave(draft.map((t) => ({ ...t, label: t.label.trim() })));
  };

  return (
    <section>
      <div className={styles.sectionHead}>
        <p className={styles.muted}>สีของแท็กจะแสดงที่มุมซ้ายบนของโพสต์</p>
      </div>

      <ul className={styles.tagList}>
        {draft.map((t) => {
          const used = usage(t.id);
          return (
            <li key={t.id} className={styles.tagRow}>
              <input
                type="color"
                className={styles.colorInput}
                value={t.color}
                onChange={(e) => update(t.id, { color: e.target.value.toUpperCase() })}
                aria-label={`สีของแท็ก ${t.label}`}
              />
              <input
                className={styles.input}
                value={t.label}
                onChange={(e) => update(t.id, { label: e.target.value })}
                aria-label="ชื่อแท็ก"
              />
              <span
                className={styles.tagPill}
                style={{ background: t.color, color: readableTextColor(t.color) }}
              >
                {t.label || 'ตัวอย่าง'}
              </span>
              <span className={styles.muted}>{used} โพสต์</span>
              <button
                className={`${styles.ghostBtn} ${styles.dangerText}`}
                disabled={used > 0}
                title={used > 0 ? 'ย้ายโพสต์ที่ใช้แท็กนี้ไปแท็กอื่นก่อน จึงจะลบได้' : undefined}
                onClick={() => setDraft((prev) => prev.filter((x) => x.id !== t.id))}
              >
                ลบ
              </button>
            </li>
          );
        })}
      </ul>

      <form
        className={styles.addTag}
        onSubmit={(e) => {
          e.preventDefault();
          add();
        }}
      >
        <input
          className={styles.input}
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="ชื่อแท็กใหม่ เช่น Tutorial"
        />
        <button type="submit" className={styles.ghostBtn} disabled={!newLabel.trim()}>
          เพิ่มแท็ก
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.saveBar}>
        {dirty && <span className={styles.muted}>มีการเปลี่ยนแปลงที่ยังไม่ได้บันทึก</span>}
        {dirty && (
          <button className={styles.ghostBtn} onClick={() => setDraft(tags)} disabled={busy}>
            ยกเลิก
          </button>
        )}
        <button className={styles.primaryBtn} onClick={save} disabled={busy || !dirty}>
          {busy ? 'กำลังบันทึก…' : 'บันทึกแท็ก'}
        </button>
      </div>
    </section>
  );
}
