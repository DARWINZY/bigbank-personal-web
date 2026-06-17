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
  content: {
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
    id: '2b-kmutt-camp',
    slug: '2b-kmutt',
    title: {
      th: '2B-KMUTT Future Leader Camp 🌟',
      en: '2B-KMUTT Future Leader Camp 🌟',
      lo: '2B-KMUTT Future Leader Camp 🌟',
      zh: '2B-KMUTT Future Leader Camp 🌟',
    },
    description: {
      th: 'ประสบการณ์ 20 วัน ที่เปลี่ยนคุณจากนักเรียน สู่ นักวิจัย กับค่ายสุดเข้มข้นที่มจธ.',
      en: '20 days of transformation from a student to a researcher at KMUTT.',
      lo: 'ປະສົບການ 20 ວັນ ທີ່ປ່ຽນຄຸນຈາກນັກຮຽນ ສູ່ ນັກວິໄຈ ກັບຄ່າຍສຸດເຂັ້ມຂົ້ນທີ່ ມຈທ.',
      zh: '在国王科技大学，用20天时间从学生转变为研究人员。',
    },
    content: {
      th: '', // We will use custom component instead
      en: '',
      lo: '',
      zh: '',
    },
    date: '2026-06-15',
    readTime: 10,
    category: 'Experience',
    image: '/images/blog/2bkmutt-hover.png',
  }
];
