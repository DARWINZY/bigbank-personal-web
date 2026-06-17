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
  },
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
    content: {
      th: 'นี่คือเนื้อหาจำลองของบทความเรื่อง SEO ด้วย Next.js\n\nการทำ SEO ในยุคปัจจุบันจำเป็นต้องอาศัยความเร็วและการอ่านข้อมูลที่ง่ายสำหรับ Bot ซึ่ง Next.js ตอบโจทย์นี้ได้ดีมาก...',
      en: 'This is mock content for the SEO with Next.js article.\n\nModern SEO requires speed and easy parsing for Bots, which Next.js excels at...',
      lo: 'ນີ້ຄືເນື້ອຫາຈຳລອງຂອງບົດຄວາມເລື່ອງ SEO ດ້ວຍ Next.js\n\nການເຮັດ SEO ໃນຍຸກປັດຈຸບັນຈຳເປັນຕ້ອງອາໄສຄວາມໄວແລະການອ່ານຂໍ້ມູນທີ່ງ່າຍສຳລັບ Bot ຊຶ່ງ Next.js ຕອບໂຈດນີ້ໄດ້ດີມາກ...',
      zh: '这是关于 Next.js SEO 文章的模拟内容。\n\n现代 SEO 需要速度和易于 Bot 解析，而 Next.js 在这方面表现出色...',
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
    content: {
      th: 'นี่คือเนื้อหาจำลองสำหรับเทคนิค CSS สมัยใหม่\n\nCSS มีการพัฒนาอย่างรวดเร็วในช่วงไม่กี่ปีที่ผ่านมา ฟีเจอร์ใหม่ๆ ช่วยให้นักพัฒนาลดการพึ่งพา JavaScript ลงได้มาก...',
      en: 'This is mock content for modern CSS techniques.\n\nCSS has evolved rapidly in recent years. New features help developers reduce reliance on JavaScript...',
      lo: 'ນີ້ຄືເນື້ອຫາຈຳລອງສຳລັບເທັກນິກ CSS ສະໄໝໃໝ່\n\nCSS ມີການພັດທະນາຢ່າງໄວວາໃນຊ່ວງບໍ່ກີ່ປີທີ່ຜ່ານມາ ຟີເຈີໃໝ່ໆ ຊ່ວຍໃຫ້ນັກພັດທະນາລຸດການເພິ່ງພາ JavaScript ລົງໄດ້ມາກ...',
      zh: '这是关于现代 CSS 技巧的模拟内容。\n\n近年来 CSS 发展迅速。新功能帮助开发者减少对 JavaScript 的依赖...',
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
    content: {
      th: 'นี่คือเนื้อหาจำลองสำหรับเคล็ดลับฟรีแลนซ์มือใหม่\n\nการเป็นฟรีแลนซ์ต้องอาศัยวินัยและการจัดการเวลาที่ดีเยี่ยม รวมถึงการสื่อสารกับลูกค้าอย่างมีประสิทธิภาพ...',
      en: 'This is mock content for beginner freelance tips.\n\nBeing a freelancer requires excellent discipline and time management, as well as effective communication with clients...',
      lo: 'ນີ້ຄືເນື້ອຫາຈຳລອງສຳລັບເຄັດລັບຟຣີແລນມືໃໝ່\n\nການເປັນຟຣີແລນຕ້ອງອາໄສວິໄນແລະການຈັດການເວລາທີ່ດີຍອດຢ້ຽມ ລວມເຖິງການສື່ສານກັບລູກຄ້າຢ່າງມີປະສິດທິພາບ...',
      zh: '这是关于给新手自由职业者的建议的模拟内容。\n\n成为一名自由职业者需要极好的纪律和时间管理，以及与客户的有效沟通...',
    },
    date: '2026-05-15',
    readTime: 4,
    category: 'Freelance',
    image: '/images/blog/blog-3.webp',
  },
];
