import './globals.css';
import { Inter, Noto_Sans_Thai, Playfair_Display } from 'next/font/google';
import type { Metadata } from 'next';
import NotFoundContent, { type Locale, type NotFoundCopy } from '@/components/NotFoundContent';
import { blogPosts } from '@/data/blog';
import th from '@/messages/th.json';
import en from '@/messages/en.json';
import lo from '@/messages/lo.json';
import zh from '@/messages/zh.json';

// Becomes out/404.html, which GitHub Pages serves for every missing URL in every language.

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' });
const notoSansThai = Noto_Sans_Thai({ subsets: ['thai'], display: 'swap', variable: '--font-noto-thai' });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap', variable: '--font-playfair' });

// Next adds the noindex robots tag to 404 pages on its own
export const metadata: Metadata = {
  title: '404 | Bigbank',
};

const strings: Record<Locale, Omit<NotFoundCopy, 'nav'>> = {
  th: { title: 'หาหน้านี้ไม่เจอ', description: 'ลิงก์อาจพิมพ์ผิด หรือหน้านี้ถูกย้ายไปแล้ว', didYouMean: 'หมายถึงหน้านี้หรือเปล่า', home: 'หน้าแรก' },
  en: { title: "We couldn't find this page", description: 'The link may have a typo, or the page has moved.', didYouMean: 'Did you mean', home: 'Home' },
  lo: { title: 'ບໍ່ພົບໜ້ານີ້', description: 'ລິ້ງອາດພິມຜິດ ຫຼື ໜ້ານີ້ຖືກຍ້າຍໄປແລ້ວ', didYouMean: 'ໝາຍເຖິງໜ້ານີ້ບໍ່', home: 'ໜ້າຫຼັກ' },
  zh: { title: '找不到这个页面', description: '链接可能有误，或页面已移动。', didYouMean: '你是不是要找', home: '首页' },
};

const messages = { th, en, lo, zh };
const copy = Object.fromEntries(
  (Object.keys(strings) as Locale[]).map((l) => [
    l,
    {
      ...strings[l],
      nav: {
        about: messages[l].nav.about,
        portfolio: messages[l].nav.portfolio,
        resume: messages[l].nav.resume,
        blog: messages[l].nav.blog,
        contact: messages[l].nav.contact,
      },
    },
  ])
) as Record<Locale, NotFoundCopy>;

const posts = blogPosts.map((p) => ({ slug: p.slug, title: p.title }));

export default function GlobalNotFound() {
  return (
    <html lang="th" className={`${inter.variable} ${notoSansThai.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body>
        <NotFoundContent copy={copy} posts={posts} />
      </body>
    </html>
  );
}
