'use client';

import { useEffect, useRef, useState } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FiBold, FiCode, FiImage, FiLink, FiList } from 'react-icons/fi';
import proseStyles from '@/styles/blog-post.module.css';
import styles from '@/styles/studio.module.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  /** Compresses and stages an image; resolves to its site path, or null if it failed. */
  onPickImage: (file: File) => Promise<string | null>;
  /** Where to load an image from in the preview (staged blobs, then the repo). */
  resolveImage: (src: string) => string;
}

type Edit = { text: string; selectStart: number; selectEnd: number };

const NEWLINE = String.fromCharCode(10);

type Tool = 'bold' | 'h2' | 'h3' | 'bullets' | 'numbers' | 'quote' | 'link' | 'code';

const TOOLS: { id: Tool; label: string; icon: React.ReactNode }[] = [
  { id: 'bold', label: 'ตัวหนา', icon: <FiBold size={15} /> },
  { id: 'h2', label: 'หัวข้อ', icon: <span className={styles.toolText}>H2</span> },
  { id: 'h3', label: 'หัวข้อย่อย', icon: <span className={styles.toolText}>H3</span> },
  { id: 'bullets', label: 'รายการแบบจุด', icon: <FiList size={15} /> },
  { id: 'numbers', label: 'รายการแบบตัวเลข', icon: <span className={styles.toolText}>1.</span> },
  { id: 'quote', label: 'ข้อความอ้างอิง', icon: <span className={styles.toolText}>&ldquo;</span> },
  { id: 'link', label: 'ลิงก์', icon: <FiLink size={15} /> },
  { id: 'code', label: 'โค้ด', icon: <FiCode size={15} /> },
];

/** Wrap the selection (or a placeholder) in before/after. */
function wrap(value: string, start: number, end: number, before: string, after: string, placeholder: string): Edit {
  const selected = value.slice(start, end) || placeholder;
  const text = value.slice(0, start) + before + selected + after + value.slice(end);
  const selectStart = start + before.length;
  return { text, selectStart, selectEnd: selectStart + selected.length };
}

/** Prefix every line the selection touches, e.g. "- " or "1. ". */
function prefixLines(value: string, start: number, end: number, prefix: (i: number) => string, placeholder: string): Edit {
  const lineStart = value.lastIndexOf('\n', start - 1) + 1;
  const lineEndIdx = value.indexOf('\n', end);
  const lineEnd = lineEndIdx === -1 ? value.length : lineEndIdx;
  const block = value.slice(lineStart, lineEnd) || placeholder;
  const lines = block.split('\n').map((line, i) => prefix(i) + line);
  const replaced = lines.join('\n');
  return {
    text: value.slice(0, lineStart) + replaced + value.slice(lineEnd),
    selectStart: lineStart + prefix(0).length,
    selectEnd: lineStart + replaced.length,
  };
}

export default function ContentEditor({ value, onChange, rows = 16, onPickImage, resolveImage }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<'write' | 'preview'>('write');
  const [uploading, setUploading] = useState(false);
  // Latest text, for edits that finish after an await
  const valueRef = useRef(value);
  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  const apply = (make: (v: string, s: number, e: number) => Edit) => {
    const el = ref.current;
    if (!el) return;
    const edit = make(value, el.selectionStart, el.selectionEnd);
    onChange(edit.text);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(edit.selectStart, edit.selectEnd);
    });
  };

  const insertImage = async (file: File | undefined) => {
    if (!file) return;
    // Remember where the cursor was; the text may change while the image compresses
    const pos = ref.current?.selectionStart ?? valueRef.current.length;
    setUploading(true);
    const path = await onPickImage(file);
    setUploading(false);
    if (!path) return;

    // Insert into the latest text, even if the user kept typing or switched to preview
    const v = valueRef.current;
    const s = Math.min(pos, v.length);
    const before = s > 0 && v[s - 1] !== NEWLINE ? NEWLINE + NEWLINE : '';
    const alt = 'คำอธิบายรูป';
    const snippet = `${before}![${alt}](${path})${NEWLINE}`;
    const altStart = s + before.length + 2;
    onChange(v.slice(0, s) + snippet + v.slice(s));
    requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(altStart, altStart + alt.length);
    });
  };

  const runTool = (tool: Tool) => {
    switch (tool) {
      case 'bold': return apply((v, s, e) => wrap(v, s, e, '**', '**', 'ตัวหนา'));
      case 'h2': return apply((v, s, e) => prefixLines(v, s, e, () => '## ', 'หัวข้อ'));
      case 'h3': return apply((v, s, e) => prefixLines(v, s, e, () => '### ', 'หัวข้อย่อย'));
      case 'bullets': return apply((v, s, e) => prefixLines(v, s, e, () => '- ', 'รายการ'));
      case 'numbers': return apply((v, s, e) => prefixLines(v, s, e, (i) => `${i + 1}. `, 'รายการ'));
      case 'quote': return apply((v, s, e) => prefixLines(v, s, e, () => '> ', 'ข้อความอ้างอิง'));
      case 'link': return apply((v, s, e) => wrap(v, s, e, '[', '](https://)', 'ข้อความลิงก์'));
      case 'code': return apply((v, s, e) => (v.slice(s, e).includes(NEWLINE)
        ? wrap(v, s, e, '```' + NEWLINE, NEWLINE + '```', 'code')
        : wrap(v, s, e, '`', '`', 'code')));
    }
  };

  const components: Components = {
    // eslint-disable-next-line @next/next/no-img-element
    img: ({ src, alt }) => <img src={typeof src === 'string' ? resolveImage(src) : undefined} alt={alt ?? ''} />,
  };

  return (
    <div className={styles.contentEditor}>
      <div className={styles.editorBar}>
        <div className={styles.modeTabs} role="tablist" aria-label="โหมดเนื้อหา">
          <button type="button" role="tab" aria-selected={mode === 'write'} className={`${styles.modeTab} ${mode === 'write' ? styles.modeTabActive : ''}`} onClick={() => setMode('write')}>
            เขียน
          </button>
          <button type="button" role="tab" aria-selected={mode === 'preview'} className={`${styles.modeTab} ${mode === 'preview' ? styles.modeTabActive : ''}`} onClick={() => setMode('preview')}>
            ดูตัวอย่าง
          </button>
        </div>
        {mode === 'write' && (
          <div className={styles.toolbar} role="toolbar" aria-label="จัดรูปแบบ">
            {TOOLS.map((tool) => (
              <button key={tool.id} type="button" className={styles.toolButton} onClick={() => runTool(tool.id)} aria-label={tool.label} title={tool.label}>
                {tool.icon}
              </button>
            ))}
            <button
              type="button"
              className={styles.toolButton}
              onClick={() => fileRef.current?.click()}
              aria-label="แทรกรูป"
              title="แทรกรูป"
              disabled={uploading}
            >
              <FiImage size={15} />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className={styles.visuallyHidden}
              tabIndex={-1}
              onChange={(e) => {
                insertImage(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </div>
        )}
      </div>

      {mode === 'write' ? (
        <textarea
          ref={ref}
          className={`${styles.input} ${styles.contentArea}`}
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <div className={`${proseStyles.prose} ${styles.preview}`}>
          {value.trim() ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{value}</ReactMarkdown>
          ) : (
            <p className={styles.muted}>ยังไม่มีเนื้อหา</p>
          )}
        </div>
      )}
      {uploading && <span className={styles.hint}>กำลังย่อรูป…</span>}
    </div>
  );
}
