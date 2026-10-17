'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import {
  type BlogPost,
  type BlogTag,
  type Locale,
  type LocalizedText,
  readableTextColor,
} from '@/data/blog';
import { compressImage } from '@/lib/github-cms';
import { previewUrl } from './preview';
import ContentEditor from './ContentEditor';
import styles from '@/styles/studio.module.css';

export type PostDraft = BlogPost;

/** An image added to the content, uploaded together with the post. */
export type StagedImage = { path: string; blob: Blob; url: string };

type Fields = { title: string; description: string; content: string };
type FieldKey = keyof Fields;

const EXTRA_LANGS: { id: Exclude<Locale, 'th'>; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'lo', label: 'ລາວ' },
];

const SLUG_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

// Local calendar date (toISOString would give yesterday before 7am in Thailand)
const today = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function uniqueSlug(base: string, taken: string[]): string {
  let slug = base;
  for (let i = 2; taken.includes(slug); i++) slug = `${base}-${i}`;
  return slug;
}

/** Rough reading time: Thai has no spaces, so count characters (~800/min). */
function estimateReadTime(content: string): number {
  return Math.max(1, Math.round(content.replace(/\s+/g, '').length / 800));
}

function fieldsFor(post: BlogPost | null, lang: Locale): Fields {
  return {
    title: post?.title[lang] ?? '',
    description: post?.description[lang] ?? '',
    content: post?.content[lang] ?? '',
  };
}

/** Cheat sheet for the Markdown the post page understands. */
function MarkdownHint() {
  return (
    <details className={styles.mdHint}>
      <summary>วิธีจัดรูปแบบเนื้อหา</summary>
      <table>
        <tbody>
          <tr><td><code>## หัวข้อ</code></td><td>หัวข้อใหญ่ (ขึ้นในสารบัญ)</td></tr>
          <tr><td><code>### หัวข้อย่อย</code></td><td>หัวข้อย่อย</td></tr>
          <tr><td><code>**ตัวหนา**</code></td><td><strong>ตัวหนา</strong></td></tr>
          <tr><td><code>- รายการ</code></td><td>รายการแบบจุด</td></tr>
          <tr><td><code>1. รายการ</code></td><td>รายการแบบตัวเลข</td></tr>
          <tr><td><code>[ข้อความ](https://...)</code></td><td>ลิงก์</td></tr>
          <tr><td><code>![คำอธิบายรูป](https://...)</code></td><td>รูปภาพจากลิงก์</td></tr>
          <tr><td><code>&gt; ข้อความ</code></td><td>ข้อความอ้างอิง</td></tr>
        </tbody>
      </table>
      <p>เว้นบรรทัดว่าง 1 บรรทัดเพื่อขึ้นย่อหน้าใหม่</p>
    </details>
  );
}

interface Props {
  post: BlogPost | null;
  tags: BlogTag[];
  takenSlugs: string[];
  busy: boolean;
  onSave: (draft: PostDraft, cover: Blob | null, images: StagedImage[]) => void;
  onBack: () => void;
}

export default function PostEditor({ post, tags, takenSlugs, busy, onSave, onBack }: Props) {
  const isNew = post === null;

  const [text, setText] = useState<Record<Locale, Fields>>(() => ({
    th: fieldsFor(post, 'th'),
    en: fieldsFor(post, 'en'),
    lo: fieldsFor(post, 'lo'),
  }));
  const [tag, setTag] = useState(post?.tag ?? tags[0]?.id ?? '');
  const [date, setDate] = useState(post?.date ?? today());
  const [slug, setSlug] = useState(post?.slug ?? '');
  const [slugEdited, setSlugEdited] = useState(false);
  const [cover, setCover] = useState<Blob | null>(null);
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [extraLang, setExtraLang] = useState<Exclude<Locale, 'th'>>('en');
  const [errors, setErrors] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const [staged, setStaged] = useState<StagedImage[]>([]);

  // New posts get a slug from the English title, or the date when there isn't one
  const autoSlug = useMemo(
    () => uniqueSlug(slugify(text.en.title) || `post-${date.replaceAll('-', '')}`, takenSlugs),
    [text.en.title, date, takenSlugs]
  );
  const finalSlug = isNew && !slugEdited ? autoSlug : slug;

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  useEffect(() => () => {
    if (coverUrl) URL.revokeObjectURL(coverUrl);
  }, [coverUrl]);

  // Free the preview blob URLs when the editor closes
  const stagedRef = useRef(staged);
  useEffect(() => {
    stagedRef.current = staged;
  }, [staged]);
  useEffect(() => () => stagedRef.current.forEach((img) => URL.revokeObjectURL(img.url)), []);

  /** Compress an image for the content; it's uploaded with the post when saved. */
  const stageImage = async (file: File): Promise<string | null> => {
    if (!file.type.startsWith('image/')) return null;
    try {
      const blob = await compressImage(file);
      // The slug field may be mid-edit; only a valid slug goes into a file name
      const prefix = SLUG_RE.test(finalSlug) ? finalSlug : 'post';
      const path = `/images/blog/${prefix}-${Date.now()}-${staged.length + 1}.jpg`;
      setStaged((prev) => [...prev, { path, blob, url: URL.createObjectURL(blob) }]);
      setDirty(true);
      return path;
    } catch {
      setErrors(['อ่านไฟล์รูปนี้ไม่ได้ ลองใช้ไฟล์ JPG หรือ PNG']);
      return null;
    }
  };

  const resolveImage = (src: string) => staged.find((img) => img.path === src)?.url ?? previewUrl(src);

  const setField = (lang: Locale, key: FieldKey, value: string) => {
    setDirty(true);
    setText((prev) => ({ ...prev, [lang]: { ...prev[lang], [key]: value } }));
  };

  const pickCover = async (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    setCompressing(true);
    try {
      const blob = await compressImage(file);
      setCover(blob);
      setCoverUrl(URL.createObjectURL(blob));
      setDirty(true);
    } catch {
      setErrors(['อ่านไฟล์รูปนี้ไม่ได้ ลองใช้ไฟล์ JPG หรือ PNG']);
    } finally {
      setCompressing(false);
    }
  };

  const submit = () => {
    const problems: string[] = [];
    if (!text.th.title.trim()) problems.push('ใส่หัวข้อภาษาไทย');
    if (!text.th.description.trim()) problems.push('ใส่คำอธิบายสั้นภาษาไทย');
    if (!text.th.content.trim()) problems.push('ใส่เนื้อหาภาษาไทย');
    if (!cover && !post?.image) problems.push('เพิ่มรูปปก');
    if (!tag) problems.push('เลือกแท็ก (ถ้ายังไม่มี สร้างได้ที่แท็บแท็ก)');
    if (!SLUG_RE.test(finalSlug)) problems.push('ลิงก์ของโพสต์ใช้ได้แค่ a-z, 0-9 และขีด -');
    else if (takenSlugs.includes(finalSlug)) problems.push('ลิงก์นี้มีโพสต์อื่นใช้แล้ว');
    setErrors(problems);
    if (problems.length) return;

    const pick = (key: FieldKey): LocalizedText => {
      const out: LocalizedText = { th: text.th[key].trim() };
      for (const { id } of EXTRA_LANGS) {
        const v = text[id][key].trim();
        if (v) out[id] = v;
      }
      return out;
    };

    // Only upload images that are still in the text
    const allContent = (Object.keys(text) as Locale[]).map((l) => text[l].content).join(' ');
    const used = staged.filter((img) => allContent.includes(img.path));

    setDirty(false);
    onSave(
      {
        id: post?.id ?? finalSlug,
        slug: finalSlug,
        title: pick('title'),
        description: pick('description'),
        content: pick('content'),
        date,
        readTime: estimateReadTime(text.th.content),
        tag,
        image: post?.image ?? '',
      },
      cover,
      used
    );
  };

  const back = () => {
    if (!dirty || confirm('ยังไม่ได้บันทึก ออกจากหน้านี้เลยไหม?')) onBack();
  };

  const shownCover = coverUrl ?? (post?.image ? previewUrl(post.image) : null);

  return (
    <section>
      <div className={styles.editorHead}>
        <button className={styles.linkBtn} onClick={back}>← กลับไปรายการ</button>
        <h1 className={styles.editorTitle}>{isNew ? 'โพสต์ใหม่' : 'แก้ไขโพสต์'}</h1>
      </div>

      <div className={styles.editorGrid}>
        <div className={styles.editorMain}>
          <label className={styles.field}>
            <span className={styles.label}>หัวข้อ</span>
            <input
              className={`${styles.input} ${styles.inputLarge}`}
              value={text.th.title}
              onChange={(e) => setField('th', 'title', e.target.value)}
              placeholder="เช่น สิ่งที่ได้เรียนรู้จากค่าย…"
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>คำอธิบายสั้น</span>
            <span className={styles.hint}>แสดงใต้หัวข้อในหน้ารวมบทความ 1–2 ประโยคกำลังดี</span>
            <textarea
              className={styles.input}
              rows={2}
              value={text.th.description}
              onChange={(e) => setField('th', 'description', e.target.value)}
            />
          </label>

          <div className={styles.field}>
            <span className={styles.label}>เนื้อหา</span>
            <MarkdownHint />
            <ContentEditor
              value={text.th.content}
              onChange={(v) => setField('th', 'content', v)}
              onPickImage={stageImage}
              resolveImage={resolveImage}
            />
          </div>

          <details className={styles.disclosure}>
            <summary>ภาษาอื่น (ไม่บังคับ)</summary>
            <p className={styles.hint}>ช่องที่เว้นว่างจะแสดงภาษาไทยแทน</p>
            <div className={styles.langTabs} role="tablist">
              {EXTRA_LANGS.map((l) => (
                <button
                  key={l.id}
                  role="tab"
                  aria-selected={extraLang === l.id}
                  className={`${styles.langTab} ${extraLang === l.id ? styles.langTabActive : ''}`}
                  onClick={() => setExtraLang(l.id)}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <label className={styles.field}>
              <span className={styles.label}>หัวข้อ</span>
              <input
                className={styles.input}
                value={text[extraLang].title}
                onChange={(e) => setField(extraLang, 'title', e.target.value)}
              />
            </label>
            <label className={styles.field}>
              <span className={styles.label}>คำอธิบายสั้น</span>
              <textarea
                className={styles.input}
                rows={2}
                value={text[extraLang].description}
                onChange={(e) => setField(extraLang, 'description', e.target.value)}
              />
            </label>
            <div className={styles.field}>
              <span className={styles.label}>เนื้อหา</span>
              <ContentEditor
                key={extraLang}
                value={text[extraLang].content}
                onChange={(v) => setField(extraLang, 'content', v)}
                rows={10}
                onPickImage={stageImage}
                resolveImage={resolveImage}
              />
            </div>
          </details>
        </div>

        <aside className={styles.editorSide}>
          <div className={styles.field}>
            <span className={styles.label}>รูปปก</span>
            <label
              className={styles.dropzone}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                pickCover(e.dataTransfer.files[0]);
              }}
            >
              {shownCover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={shownCover} alt="ตัวอย่างรูปปก" className={styles.coverPreview} />
              ) : (
                <span className={styles.dropzoneText}>
                  {compressing ? 'กำลังย่อรูป…' : 'คลิกหรือลากรูปมาวาง'}
                </span>
              )}
              <input
                type="file"
                accept="image/*"
                className={styles.visuallyHidden}
                onChange={(e) => pickCover(e.target.files?.[0])}
              />
            </label>
            {shownCover && <span className={styles.hint}>คลิกที่รูปเพื่อเปลี่ยน ระบบย่อรูปให้อัตโนมัติ</span>}
          </div>

          <div className={styles.field}>
            <span className={styles.label}>แท็ก</span>
            <div className={styles.tagPicker} role="radiogroup" aria-label="แท็ก">
              {tags.map((t) => (
                <button
                  key={t.id}
                  role="radio"
                  aria-checked={tag === t.id}
                  className={`${styles.tagOption} ${tag === t.id ? styles.tagOptionActive : ''}`}
                  style={
                    tag === t.id
                      ? { background: t.color, borderColor: t.color, color: readableTextColor(t.color) }
                      : { borderColor: t.color }
                  }
                  onClick={() => {
                    setTag(t.id);
                    setDirty(true);
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>วันที่</span>
            <input
              type="date"
              className={styles.input}
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setDirty(true);
              }}
            />
          </label>

          <div className={styles.field}>
            <span className={styles.label}>ลิงก์ของโพสต์</span>
            {isNew ? (
              <input
                className={styles.input}
                value={finalSlug}
                onChange={(e) => {
                  setSlug(e.target.value.toLowerCase());
                  setSlugEdited(true);
                }}
                spellCheck={false}
              />
            ) : (
              <code className={styles.slugFixed}>/blog/{finalSlug}</code>
            )}
            <span className={styles.hint}>
              {isNew ? 'ตั้งจากหัวข้ออังกฤษให้อัตโนมัติ แก้ได้ แต่เผยแพร่แล้วจะเปลี่ยนไม่ได้' : 'เปลี่ยนไม่ได้ เพื่อไม่ให้ลิงก์เดิมเสีย'}
            </span>
          </div>

          {errors.length > 0 && (
            <ul className={styles.errorList} role="alert">
              {errors.map((e) => <li key={e}>{e}</li>)}
            </ul>
          )}

          <button className={`${styles.primaryBtn} ${styles.publishBtn}`} onClick={submit} disabled={busy || compressing}>
            {busy ? 'กำลังบันทึก…' : isNew ? 'เผยแพร่' : 'บันทึกการแก้ไข'}
          </button>
        </aside>
      </div>
    </section>
  );
}
