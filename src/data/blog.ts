export interface BlogPost {
  id: string;
  slug: string;
  title: {
    th: string;
    en: string;
    lo: string;
    zh: string;
  };
  description: {
    th: string;
    en: string;
    lo: string;
    zh: string;
  };
  date: string;
  readTime: number;
  category: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'why-nextjs-for-seo',
    title: {
      th: 'ทำไม Next.js ถึงดีที่สุดสำหรับ SEO',
      en: 'Why Next.js is Best for SEO',
      lo: 'ເປັນຫຍັງ Next.js ຈຶ່ງດີທີ່ສຸດສຳລັບ SEO',
      zh: '为什么 Next.js 是 SEO 的最佳选择',
    },
    description: {
      th: 'เปรียบเทียบ Next.js กับ Framework อื่นๆ ในแง่ของ SEO และอธิบายว่าทำไม SSR/SSG ถึงสำคัญ',
      en: 'Comparing Next.js with other frameworks for SEO and explaining why SSR/SSG matters.',
      lo: 'ປຽບທຽບ Next.js ກັບ Framework ອື່ນໆ ໃນແງ່ຂອງ SEO ແລະອະທິບາຍວ່າເປັນຫຍັງ SSR/SSG ຈຶ່ງສຳຄັນ',
      zh: '比较 Next.js 与其他框架的 SEO 表现，并解释为什么 SSR/SSG 很重要。',
    },
    date: '2026-06-10',
    readTime: 5,
    category: 'Web Development',
    image: '/images/blog/blog-1.webp',
  },
  {
    id: '2',
    slug: 'modern-css-techniques',
    title: {
      th: 'เทคนิค CSS สมัยใหม่ที่ต้องรู้',
      en: 'Modern CSS Techniques You Must Know',
      lo: 'ເທັກນິກ CSS ສະໄໝໃໝ່ທີ່ຕ້ອງຮູ້',
      zh: '你必须知道的现代 CSS 技巧',
    },
    description: {
      th: 'รวมเทคนิค CSS ใหม่ๆ เช่น Container Queries, Cascade Layers, และ View Transitions',
      en: 'A collection of modern CSS techniques including Container Queries, Cascade Layers, and View Transitions.',
      lo: 'ລວມເທັກນິກ CSS ໃໝ່ໆ ເຊັ່ນ Container Queries, Cascade Layers, ແລະ View Transitions',
      zh: '现代 CSS 技巧集合，包括容器查询、级联层和视图过渡。',
    },
    date: '2026-05-28',
    readTime: 7,
    category: 'CSS',
    image: '/images/blog/blog-2.webp',
  },
  {
    id: '3',
    slug: 'freelance-tips',
    title: {
      th: '5 เคล็ดลับสำหรับ Freelance Developer มือใหม่',
      en: '5 Tips for Beginner Freelance Developers',
      lo: '5 ເຄັດລັບສຳລັບ Freelance Developer ມືໃໝ່',
      zh: '给新手自由网页开发者的 5 个建议',
    },
    description: {
      th: 'แชร์ประสบการณ์และเคล็ดลับที่ช่วยให้เริ่มต้นเป็น Freelance Developer ได้อย่างมั่นใจ',
      en: 'Sharing experiences and tips to help you start your freelance developer career with confidence.',
      lo: 'ແບ່ງປັນປະສົບການແລະເຄັດລັບທີ່ຊ່ວຍໃຫ້ເລີ່ມຕົ້ນເປັນ Freelance Developer ໄດ້ຢ່າງໝັ້ນໃຈ',
      zh: '分享经验和技巧，帮助您自信地开始自由开发者的职业生涯。',
    },
    date: '2026-05-15',
    readTime: 4,
    category: 'Freelance',
    image: '/images/blog/blog-3.webp',
  },
];
