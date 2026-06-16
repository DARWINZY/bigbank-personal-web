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
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
    award: 'silver',
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
    liveUrl: '#',
    featured: true,
    award: 'bronze',
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
    liveUrl: '#',
    codeUrl: '#',
    featured: true,
  },
];
