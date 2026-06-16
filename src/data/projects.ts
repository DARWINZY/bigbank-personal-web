export interface Project {
  id: string;
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
  image: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  featured: boolean;
  award?: 'gold' | 'silver' | 'bronze';
  year?: string;
  grade?: {
    th: string;
    en: string;
    lo: string;
    zh: string;
  };
}

export const projects: Project[] = [
  {
    id: 'thailand-metaverse',
    title: {
      th: 'Thailand Metaverse and Exhibition',
      en: 'Thailand Metaverse and Exhibition',
      lo: 'Thailand Metaverse and Exhibition',
      zh: 'Thailand Metaverse and Exhibition',
    },
    description: {
      th: 'คว้ารางวัลชนะเลิศการแข่งขัน Thailand Metaverse and Exhibition ด้วยแพลตฟอร์ม LiveVerse ที่ผสานเทคโนโลยี Metaverse เข้ากับความบันเทิงอย่างลงตัว',
      en: 'Won first place at the Thailand Metaverse and Exhibition competition with LiveVerse — a platform that seamlessly blends Metaverse technology with entertainment.',
      lo: 'ຄວ້າລາງວັນຊະນະເລີດການແຂ່ງຂັນ Thailand Metaverse and Exhibition ດ້ວຍແພລດຟອມ LiveVerse ທີ່ຜະສານເທັກໂນໂລຊີ Metaverse ເຂົ້າກັບຄວາມບັນເທີງຢ່າງລົງຕົວ',
      zh: '凭借 LiveVerse 平台荣获 Thailand Metaverse and Exhibition 大赛冠军——该平台将元宇宙技术与娱乐完美融合。',
    },
    image: '/images/projects/thailand-metaverse.jpg',
    tags: ['HTML', 'CSS', 'JavaScript'],
    featured: true,
    award: 'gold',
    year: '2569',
    grade: {
      th: 'ม.4',
      en: 'Grade 10',
      lo: 'ມ.4',
      zh: '高一',
    },
  },
  {
    id: 'restaurant-website',
    title: {
      th: 'เว็บไซต์ร้านอาหาร',
      en: 'Restaurant Website',
      lo: 'ເວັບໄຊທ໌ຮ້ານອາຫານ',
      zh: '餐厅网站',
    },
    description: {
      th: 'เว็บไซต์ร้านอาหารสุดพรีเมียม พร้อมระบบจองโต๊ะออนไลน์ เมนูแบบ interactive และ Google Maps',
      en: 'Premium restaurant website with online reservation system, interactive menu display, and Google Maps integration.',
      lo: 'ເວັບໄຊທ໌ຮ້ານອາຫານສຸດພຣີມຽມ ພ້ອມລະບົບຈອງໂຕະອອນລາຍ ເມນູແບບ interactive ແລະ Google Maps',
      zh: '提供在线预订系统、交互式菜单显示和 Google 地图集成的高级餐厅网站。',
    },
    image: '/images/projects/project-2.webp',
    tags: ['React', 'Node.js', 'Firebase', 'CSS Modules'],
    featured: true,
    award: 'silver',
    year: '2568',
    grade: {
      th: 'ม.3',
      en: 'Grade 9',
      lo: 'ມ.3',
      zh: '初三',
    },
  },
  {
    id: 'portfolio-agency',
    title: {
      th: 'เว็บไซต์ Agency ครีเอทีฟ',
      en: 'Creative Agency Website',
      lo: 'ເວັບໄຊທ໌ Agency ຄຣີເອທີຟ',
      zh: '创意代理网站',
    },
    description: {
      th: 'เว็บไซต์โชว์ผลงานสำหรับบริษัทออกแบบ พร้อม animation สุดเจ๋ง และ CMS สำหรับจัดการเนื้อหา',
      en: 'Portfolio website for a design agency with stunning animations and CMS for content management.',
      lo: 'ເວັບໄຊທ໌ໂຊຜົນງານສຳລັບບໍລິສັດອອກແບບ ພ້ອມ animation ສຸດເຈ໋ງ ແລະ CMS ສຳລັບຈັດການເນື້ອຫາ',
      zh: '设计机构的作品集网站，拥有惊艳的动画效果和内容管理系统。',
    },
    image: '/images/projects/project-3.webp',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS', 'Sanity CMS'],
    featured: true,
    award: 'bronze',
    year: '2568',
    grade: {
      th: 'ม.3',
      en: 'Grade 9',
      lo: 'ມ.3',
      zh: '初三',
    },
  },
  {
    id: 'fitness-app',
    title: {
      th: 'แอปฟิตเนส',
      en: 'Fitness Tracker App',
      lo: 'ແອັບຟິດເນສ',
      zh: '健身追踪应用',
    },
    description: {
      th: 'เว็บแอปติดตามการออกกำลังกาย บันทึกเวิร์กเอาท์ แสดงสถิติแบบกราฟ และตั้งเป้าหมาย',
      en: 'Fitness tracking web app with workout logging, visual statistics, and goal setting features.',
      lo: 'ເວັບແອັບຕິດຕາມການອອກກຳລັງກາຍ ບັນທຶກເວີກເອົາ ສະແດງສະຖິຕິແບບກຣາຟ ແລະຕັ້ງເປົ້າໝາຍ',
      zh: '健身追踪网页应用，具有锻炼记录、可视化统计和目标设定功能。',
    },
    image: '/images/projects/project-4.webp',
    tags: ['React', 'TypeScript', 'PostgreSQL', 'Chart.js'],
    featured: true,
    year: '2567',
    grade: {
      th: 'ม.2',
      en: 'Grade 8',
      lo: 'ມ.2',
      zh: '初二',
    },
  },
  {
    id: 'it-clash',
    title: {
      th: 'IT Clash',
      en: 'IT Clash',
      lo: 'IT Clash',
      zh: 'IT Clash',
    },
    description: {
      th: 'ผ่านเข้ารอบ 16 ทีมสุดท้ายในการแข่งขัน IT Clash ซึ่งจัดขึ้นที่สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (สจล.)',
      en: "Reached the Top 16 finalists in the IT Clash competition held at King Mongkut's Institute of Technology Ladkrabang (KMITL).",
      lo: 'ຜ່ານເຂົ້າຮອບ 16 ທີມສຸດທ້າຍໃນການແຂ່ງຂັນ IT Clash ທີ່ສະຖາບັນເທັກໂນໂລຢີພະຈອມເກົ້າເຈົ້າຄຸນທະຫານລາດກະບັງ (ສຈລ).',
      zh: '在先皇技术学院（KMITL）举办的 IT Clash 比赛中晋级前 16 强。',
    },
    image: '/images/projects/it-clash.jpg',
    tags: ['Python'],
    featured: true,
    year: '2569',
    grade: {
      th: 'ม.5',
      en: 'Grade 11',
      lo: 'ມ.5',
      zh: '高二',
    },
  },
  {
    id: 'sirindhorn-good-deeds',
    title: {
      th: 'ระบบสมุดบันทึกความดี โรงเรียนสิรินธร',
      en: 'Sirindhorn School Good Deeds System',
      lo: 'ລະບົບສະໝຸດບັນທຶກຄວາມດີ ໂຮງຮຽນສິຣິນທອນ',
      zh: 'Sirindhorn 学校好人好事记录系统',
    },
    description: {
      th: 'พัฒนาระบบสมุดบันทึกความดีออนไลน์สำหรับโรงเรียนสิรินธร เพื่อยกระดับการจัดการข้อมูลนักเรียนสู่รูปแบบดิจิทัล (Paperless) ช่วยลดการใช้ทรัพยากรกระดาษและเพิ่มประสิทธิภาพในการตรวจสอบ',
      en: 'Developed an online Good Deeds Record system for Sirindhorn School, transitioning student data management to a paperless format to reduce resource consumption and enhance verification efficiency.',
      lo: 'ພັດທະນາລະບົບສະໝຸດບັນທຶກຄວາມດີອອນລາຍສຳລັບໂຮງຮຽນສິຣິນທອນ ເພື່ອຍົກລະດັບການຈັດການຂໍ້ມູນນັກຮຽນສູ່ຮູບແບບດິຈິຕອລ (Paperless) ຊ່ວຍລຸດຜ່ອນການໃຊ້ຊັບພະຍາກອນເຈ້ຍ ແລະເພີ່ມປະສິດທິພາບໃນການກວດສອບ',
      zh: '为 Sirindhorn 学校开发了在线“好人好事记录”系统，将学生数据管理升级为无纸化模式，以减少纸张浪费并提高审核效率。',
    },
    image: '/images/projects/sirindhorn-good-deeds.png',
    tags: ['Nest.js', 'TypeScript', 'Cloudflare'],
    featured: true,
    year: '2569',
    grade: {
      th: 'ม.5',
      en: 'Grade 11',
      lo: 'ມ.5',
      zh: '高二',
    },
  },
];
