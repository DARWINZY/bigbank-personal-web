'use client';

import { useState } from 'react';
import { REPO } from '@/lib/github-cms';
import styles from '@/styles/studio.module.css';

const NEW_TOKEN_URL = 'https://github.com/settings/personal-access-tokens/new';

interface Props {
  onConnect: (token: string) => void;
  busy: boolean;
  error: string | null;
}

export default function ConnectPanel({ onConnect, busy, error }: Props) {
  const [token, setToken] = useState('');

  return (
    <section className={styles.connect}>
      <h1 className={styles.connectTitle}>เชื่อมต่อ GitHub</h1>
      <p className={styles.muted}>
        Studio บันทึกโพสต์ลง repo ของเว็บโดยตรง ใช้โทเคนครั้งเดียว ระบบจะจำไว้ในเบราว์เซอร์นี้
      </p>

      <ol className={styles.steps}>
        <li>
          เปิด{' '}
          <a href={NEW_TOKEN_URL} target="_blank" rel="noopener noreferrer">
            หน้าสร้าง Fine-grained token
          </a>
        </li>
        <li>
          Repository access เลือก <b>Only select repositories</b> แล้วเลือก <b>{REPO.name}</b>
        </li>
        <li>
          Permissions เพิ่ม <b>Contents</b> ตั้งเป็น <b>Read and write</b>
        </li>
        <li>กด Generate token แล้วคัดลอกมาวางด้านล่าง</li>
      </ol>

      <form
        className={styles.connectForm}
        onSubmit={(e) => {
          e.preventDefault();
          if (token.trim()) onConnect(token.trim());
        }}
      >
        <label className={styles.field}>
          <span className={styles.label}>โทเคน</span>
          <input
            type="password"
            className={styles.input}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="github_pat_…"
            autoComplete="off"
            spellCheck={false}
          />
        </label>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.primaryBtn} disabled={busy || !token.trim()}>
          {busy ? 'กำลังเชื่อมต่อ…' : 'เชื่อมต่อ'}
        </button>
      </form>
    </section>
  );
}
