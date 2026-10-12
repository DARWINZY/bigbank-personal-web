import type { Project } from './projects';

type Locale = 'th' | 'en' | 'lo' | 'zh';
export type Award = NonNullable<Project['award']>;

const awardLabels: Record<Award, Record<Locale, string>> = {
  gold: { th: 'เหรียญทอง', en: 'Gold', lo: 'ຫຼຽນຄຳ', zh: '金奖' },
  silver: { th: 'เหรียญเงิน', en: 'Silver', lo: 'ຫຼຽນເງິນ', zh: '银奖' },
  bronze: { th: 'เหรียญทองแดง', en: 'Bronze', lo: 'ຫຼຽນທອງແດງ', zh: '铜奖' },
};

/** Badge text for a project's award: its own wording if set, else the medal name. */
export function awardLabel(project: Project, locale: string): string | undefined {
  if (!project.award) return undefined;
  const loc = locale as Locale;
  return project.awardText?.[loc] ?? awardLabels[project.award][loc];
}
