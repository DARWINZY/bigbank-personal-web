import type { Project } from './projects';

type Locale = 'th' | 'en' | 'lo';
export type Award = NonNullable<Project['award']>;

const awardLabels: Record<Award, Record<Locale, string>> = {
  gold: { th: 'เหรียญทอง', en: 'Gold', lo: 'ຫຼຽນຄຳ' },
  silver: { th: 'เหรียญเงิน', en: 'Silver', lo: 'ຫຼຽນເງິນ' },
  bronze: { th: 'เหรียญทองแดง', en: 'Bronze', lo: 'ຫຼຽນທອງແດງ' },
};

/** Badge text for a project's award: its own wording if set, else the medal name. */
export function awardLabel(project: Project, locale: string): string | undefined {
  if (!project.award) return undefined;
  const loc = locale as Locale;
  return project.awardText?.[loc] ?? awardLabels[project.award][loc];
}
