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
  badgeIconOnly?: boolean;
  year?: string;
  grade?: {
    th: string;
    en: string;
    lo: string;
    zh: string;
  };
}

export const projects: Project[] = [
  // ══ 🥇 GOLD (ปีล่าสุดก่อน) ══════════════════════════════
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
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4', zh: '高一' },
  },
  {
    id: '2b-kmutt-fibo',
    title: {
      th: 'Researcher, 2B-KMUTT (Batch 20) — FIBO, KMUTT',
      en: 'Researcher, 2B-KMUTT (Batch 20) — FIBO, KMUTT',
      lo: 'Researcher, 2B-KMUTT (Batch 20) — FIBO, KMUTT',
      zh: 'Researcher, 2B-KMUTT (Batch 20) — FIBO, KMUTT',
    },
    description: {
      th: 'ได้รับคัดเลือกจากผู้สมัครกว่า 4,000 คน (อัตรารับเพียง 1.6%) เข้าร่วมโปรแกรมวิจัยเชิงโครงงานที่สถาบันวิทยาการหุ่นยนต์ภาคสนาม (FIBO) มจธ. มุ่งเน้นด้านปัญญาประดิษฐ์ โดยประยุกต์ใช้โมเดล CNN Pre-trained สำหรับการตรวจจับภาพ',
      en: 'Selected from over 4,000 applicants (1.6% acceptance rate) to join a project-based research program at the Institute of Field Robotics (FIBO), KMUTT. Focused on Artificial Intelligence, utilizing Convolutional Neural Network (CNN) pre-trained models for image detection.',
      lo: 'ໄດ້ຮັບຄັດເລືອກຈາກຜູ້ສະໝັກກວ່າ 4,000 ຄົນ (ອັດຕາຮັບພຽງ 1.6%) ເຂົ້າຮ່ວມໂປຣແກຣມວິໄຈເຊີງໂຄງການທີ່ສະຖາບັນວິທະຍາການຫຸ່ນຍົນພາກສະໜາມ (FIBO) ມຈທ. ມຸ່ງເນັ້ນດ້ານ AI ໂດຍໃຊ້ໂມເດນ CNN Pre-trained ສຳລັບກວດຈັບພາບ',
      zh: '从4,000多名申请者中脱颖而出（录取率仅1.6%），参加KMUTT现场机器人研究所（FIBO）基于项目的研究计划。专注于人工智能领域，利用CNN预训练模型进行图像检测。',
    },
    image: '/images/projects/2b-kmutt.jpg',
    tags: ['CNN', 'Python', 'HTML', 'SQLite'],
    featured: true,
    award: 'gold',
    badgeIconOnly: true,
    year: '2569',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4', zh: '高一' },
  },
  {
    id: 'kku-open-house',
    title: {
      th: 'Computer Education KKU Open House 2024',
      en: 'Computer Education KKU Open House 2024',
      lo: 'Computer Education KKU Open House 2024',
      zh: 'Computer Education KKU Open House 2024',
    },
    description: {
      th: 'คว้ารางวัลชนะเลิศสาขา Infographic ในงาน KKU Open House 2024 โดยนำเนื้อหาภาษาไทยมาแปลเป็นภาษาอังกฤษ พร้อมออกแบบสื่อกราฟิกที่สวยงามและสื่อสารได้อย่างชัดเจน',
      en: 'Won the first place in the Infographic category at KKU Open House 2024 by translating Thai content into English and crafting visually compelling graphic media with clear communication.',
      lo: 'ຄວ້າລາງວັນຊະນະເລີດສາຂາ Infographic ໃນງານ KKU Open House 2024 ໂດຍແປເນື້ອຫາພາສາໄທເປັນພາສາອັງກິດ ພ້ອມອອກແບບສື່ກຣາຟິກທີ່ສວຍງາມ ແລະສື່ສານໄດ້ຢ່າງຊັດເຈນ',
      zh: '在KKU Open House 2024的信息图表类别中荣获冠军，将泰语内容翻译成英语并制作了视觉精美且信息传达清晰的图形媒体。',
    },
    image: '/images/projects/kku-open-house.jpg',
    tags: ['Adobe Illustrator', 'Adobe Photoshop'],
    featured: true,
    award: 'gold',
    year: '2567',
    grade: { th: 'ม.2', en: 'Grade 8', lo: 'ມ.2', zh: '初二' },
  },
  // ══ 🥈 SILVER ════════════════════════════════════════════
  {
    id: 'click-camp-16',
    title: {
      th: 'Click Camp 16',
      en: 'Click Camp 16',
      lo: 'Click Camp 16',
      zh: 'Click Camp 16',
    },
    description: {
      th: 'เข้าร่วมค่ายโดยคณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยมหิดล เรียนรู้การสร้าง AI พื้นฐาน และเจาะลึก Cyber Security ด้วยเครื่องมือจริง',
      en: 'Attended a camp hosted by the Computer Engineering department at Mahidol University. Learned foundational AI development and explored Cyber Security with industry-standard tools.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍໂດຍຄະນະວິສະວະກຳສາດ ສາຂາວິສະວະກຳຄອມພິວເຕີ ມະຫາວິທະຍາໄລມະຫິດົນ ຮຽນຮູ້ການສ້າງ AI ພື້ນຖານ ແລະ ສຳຫຼວດ Cyber Security ດ້ວຍເຄື່ອງມືຈິງ',
      zh: '参加玛希隆大学计算机工程系举办的营地，学习基础AI开发，并使用专业工具深入探索网络安全。',
    },
    image: '/images/projects/cc16.jpg',
    tags: ['Python', 'Streamlit', 'WireShark', 'Burp Suite'],
    featured: true,
    award: 'silver',
    badgeIconOnly: true,
    year: '2568',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4', zh: '高一' },
  },
  {
    id: 'silpahattakam-71',
    title: {
      th: 'ศิลปหัตถกรรม ครั้งที่ 71',
      en: 'National Arts & Crafts Competition #71',
      lo: 'ສິລະປະຫັດຖະກຳ ຄັ້ງທີ 71',
      zh: '第71届艺术工艺大赛',
    },
    description: {
      th: 'ได้รับรางวัลระดับเหรียญเงิน ในสาขาสร้างเกมสร้างสรรค์ด้วยโปรแกรมคอมพิวเตอร์ ออกแบบและพัฒนาเกมที่มีความสร้างสรรค์โดดเด่น',
      en: 'Awarded a Silver Medal in the Creative Game Development with Computer Programs category, designing and developing a standout creative game.',
      lo: 'ໄດ້ຮັບລາງວັນລະດັບຫຼຽນເງິນ ໃນສາຂາສ້າງເກມສ້າງສັນດ້ວຍໂປຣແກຣມຄອມພິວເຕີ ອອກແບບ ແລະ ພັດທະນາເກມທີ່ມີຄວາມສ້າງສັນໂດດເດັ່ນ',
      zh: '在"计算机程序创意游戏开发"类别中荣获银牌，设计并开发了一款极具创意的游戏。',
    },
    image: '/images/projects/silpahattakam-71.jpg',
    tags: ['Construct 2'],
    featured: true,
    award: 'silver',
    year: '2566',
    grade: { th: 'ม.2', en: 'Grade 8', lo: 'ມ.2', zh: '初二' },
  },
  // ══ 🥉 BRONZE ════════════════════════════════════════════
  {
    id: 'silpahattakam-70',
    title: {
      th: 'ศิลปะหัตถกรรม ครั้งที่ 70',
      en: 'National Arts & Crafts Competition #70',
      lo: 'ສິລະປະຫັດຖະກຳ ຄັ້ງທີ 70',
      zh: '第70届艺术工艺大赛',
    },
    description: {
      th: 'ได้รับรางวัลระดับเหรียญทองแดง ในสาขาเขียนโปรแกรมแก้โจทย์ปัญหาด้วยภาษา C++ ทดสอบทักษะการคิดเชิงตรรกะและอัลกอริทึม',
      en: 'Awarded a Bronze Medal in the Programming Problem Solving with C++ category, demonstrating strong logical thinking and algorithmic skills.',
      lo: 'ໄດ້ຮັບລາງວັນລະດັບຫຼຽນທອງແດງ ໃນສາຂາຂຽນໂປຣແກຣມແກ້ໂຈດບັນຫາດ້ວຍພາສາ C++ ທົດສອບທັກສະການຄິດເຊີງຕັກກະ ແລະ ອັນກໍຣິທຶມ',
      zh: '在"C++编程问题解决"类别中荣获铜牌，展示了出色的逻辑思维和算法技能。',
    },
    image: '/images/projects/silpahattakam-70.jpg',
    tags: ['C++'],
    featured: true,
    award: 'bronze',
    year: '2565',
    grade: { th: 'ม.1', en: 'Grade 7', lo: 'ມ.1', zh: '初一' },
  },
  // ══ ไม่มีเหรียญ (ปีล่าสุดก่อน) ═════════════════════════
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
    grade: { th: 'ม.5', en: 'Grade 11', lo: 'ມ.5', zh: '高二' },
  },
  {
    id: 'rsca-drone',
    title: {
      th: 'RSCA — ออกแบบแผนบินโดรนแปรอักษร',
      en: 'RSCA — Drone Formation Flight Design',
      lo: 'RSCA — ອອກແບບແຜນບິນໂດຣນແປຣອັກສອນ',
      zh: 'RSCA — 无人机编队飞行设计',
    },
    description: {
      th: 'ใช้ทักษะการวางแผนและความคิดสร้างสรรค์ ออกแบบแผนการบินโดรนแปรอักษรด้วยโปรแกรม Blender ผ่านเข้ารอบ 16 ทีมสุดท้ายระดับประเทศ แต่สละสิทธิ์เนื่องจากตารางซ้อนทับ',
      en: 'Applied strategic planning and creative thinking to design drone swarm formation flights using Blender. Advanced to the national Top 16 but withdrew due to scheduling conflicts.',
      lo: 'ໃຊ້ທັກສະການວາງແຜນ ແລະຄວາມຄິດສ້າງສັນ ອອກແບບແຜນການບິນໂດຣນແປຣອັກສອນດ້ວຍໂປຣແກຣມ Blender ຜ່ານເຂົ້າຮອບ 16 ທີມສຸດທ້າຍລະດັບຊາດ ແຕ່ສະລະສິດເນື່ອງຈາກຕາຕະລາງຊ້ອນທັບ',
      zh: '运用规划能力和创造性思维，使用Blender设计无人机编队飞行方案。晋级全国前16强，但因日程冲突放弃参赛。',
    },
    image: '/images/projects/rsca.jpg',
    tags: ['Blender', 'Python'],
    featured: true,
    year: '2569',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4', zh: '高一' },
  },
  {
    id: 'jwc14',
    title: {
      th: 'Junior Web Master Camp 14 (JWC14)',
      en: 'Junior Web Master Camp 14 (JWC14)',
      lo: 'Junior Web Master Camp 14 (JWC14)',
      zh: 'Junior Web Master Camp 14 (JWC14)',
    },
    description: {
      th: 'เข้าร่วมค่าย Hackathon ภายใต้แนวคิด "Start Small, Think Big" ร่วมกับทีมพัฒนาแพลตฟอร์ม vibematch.in.th — ระบบจับคู่ทีมสำหรับผู้ที่ต้องการหาสมาชิกร่วมแข่งขันในเวทีต่าง ๆ',
      en: 'Participated in a Hackathon camp under the concept "Start Small, Think Big." Collaborated with a team to build vibematch.in.th — a platform that helps users find teammates for various competitions.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍ Hackathon ພາຍໃຕ້ແນວຄິດ "Start Small, Think Big" ຮ່ວມກັບທີມພັດທະນາແພລດຟອມ vibematch.in.th — ລະບົບຈັບຄູ່ທີມສຳລັບຜູ້ທີ່ຕ້ອງການຫາສະມາຊິກຮ່ວມແຂ່ງຂັນໃນເວທີຕ່າງໆ',
      zh: '参加"Start Small, Think Big"主题黑客松营地，与团队共同开发vibematch.in.th——一个帮助用户为各类竞赛寻找队友的平台。',
    },
    image: '/images/projects/jwc14.jpg',
    tags: ['TypeScript', 'Next.js'],
    featured: true,
    year: '2569',
    grade: { th: 'ม.5', en: 'Grade 11', lo: 'ມ.5', zh: '高二' },
  },
  {
    id: 'robotics-ai-frontier',
    title: {
      th: 'Robotics and AI Frontier Camp 2026',
      en: 'Robotics and AI Frontier Camp 2026',
      lo: 'Robotics and AI Frontier Camp 2026',
      zh: 'Robotics and AI Frontier Camp 2026',
    },
    description: {
      th: 'เข้าร่วมค่ายปฏิบัติการด้านหุ่นยนต์และปัญญาประดิษฐ์ ลงมือทำ Workshop หุ่นยนต์ ฝึก AI Classification บนบอร์ด Arduino พร้อมเขียนโปรแกรมควบคุมโดรนจริง',
      en: 'Attended a hands-on Robotics & AI camp featuring robot workshops, AI Classification on Arduino boards, and real drone programming exercises.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍປະຕິບັດການດ້ານຫຸ່ນຍົນ ແລະ AI ລົງມືເຮັດ Workshop ຫຸ່ນຍົນ ຝຶກ AI Classification ເທິງບອດ Arduino ພ້ອມຂຽນໂປຣແກຣມຄວບຄຸມໂດຣນຈິງ',
      zh: '参加机器人与AI实践营地，亲手完成机器人工作坊、在Arduino板上进行AI分类训练，并编写真实的无人机控制程序。',
    },
    image: '/images/projects/robotics-ai.jpg',
    tags: ['Python', 'C', 'Arduino'],
    featured: true,
    year: '2569',
    grade: { th: 'ม.5', en: 'Grade 11', lo: 'ມ.5', zh: '高二' },
  },
  {
    id: 'env-science-camp',
    title: {
      th: 'ค่ายวิทยาศาสตร์สิ่งแวดล้อม',
      en: 'Environmental Science Camp',
      lo: 'ຄ່າຍວິທະຍາສາດສິ່ງແວດລ້ອມ',
      zh: '环境科学营',
    },
    description: {
      th: 'ค่ายบูรณาการความรู้ STEM เข้ากับการเรียนรู้หลากหลายสาขาของวิทยาศาสตร์ ฝึกทักษะการคิดเชิงระบบและการทำงานภาคสนาม',
      en: 'An integrative STEM camp combining multi-disciplinary sciences with systems thinking and hands-on fieldwork experience.',
      lo: 'ຄ່າຍບູລະນາການຄວາມຮູ້ STEM ເຂົ້າກັບການຮຽນຮູ້ຫຼາກຫຼາຍສາຂາຂອງວິທະຍາສາດ ຝຶກທັກສະການຄິດເຊີງລະບົບ ແລະ ການເຮັດວຽກພາກສະໜາມ',
      zh: '将STEM知识与多学科科学学习相结合的营地，培养系统思维和实地工作技能。',
    },
    image: '/images/projects/env-science-camp.jpg',
    tags: ['Basic Sci'],
    featured: true,
    year: '2568',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4', zh: '高一' },
  },

  {
    id: 'scientist-path-thammasat',
    title: {
      th: 'ค่ายจุดประกายเส้นทางนักวิทยาศาสตร์ — มธ.',
      en: 'Scientist Path Camp — Thammasat University',
      lo: 'ຄ່າຍຈຸດປະກາຍເສັ້ນທາງນັກວິທະຍາສາດ — ມທ.',
      zh: '科学家之路启航营 — 法政大学',
    },
    description: {
      th: 'เข้าร่วมค่ายวิทยาศาสตร์ที่มหาวิทยาลัยธรรมศาสตร์ บูรณาการความรู้ STEM เข้ากับกิจกรรมหลากหลายสาขา ฝึกทักษะกระบวนการคิดแบบนักวิทยาศาสตร์',
      en: 'Attended a science camp at Thammasat University integrating STEM disciplines through multi-field activities, building scientific thinking methodologies.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍວິທະຍາສາດທີ່ມະຫາວິທະຍາໄລທຳມະສາດ ບູລະນາການຄວາມຮູ້ STEM ເຂົ້າກັບກິດຈະກຳຫຼາກຫຼາຍສາຂາ ຝຶກທັກສະກະບວນການຄິດແບບນັກວິທະຍາສາດ',
      zh: '参加法政大学科学营地，将STEM学科整合到多领域活动中，培养科学思维方法。',
    },
    image: '/images/projects/scientist-path-thammasat.jpg',
    tags: ['Basic Sci'],
    featured: true,
    year: '2568',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4', zh: '高一' },
  },
  {
    id: 'ypls-singapore',
    title: {
      th: 'อบรมภาษาอังกฤษ — YPLS, สิงคโปร์',
      en: 'English Training — YPLS, Singapore',
      lo: 'ອົບຮົມພາສາອັງກິດ — YPLS, ສິງກະໂປ',
      zh: '英语培训 — YPLS，新加坡',
    },
    description: {
      th: 'เข้าอบรมภาษาอังกฤษเชิงปฏิบัติการกับสถาบัน YPLS ประเทศสิงคโปร์ มุ่งเน้นการพัฒนาทักษะภาษาอังกฤษเพื่อการสื่อสารและการประยุกต์ใช้ในชีวิตจริง',
      en: 'Completed a practical English training program at the YPLS Institute in Singapore, focusing on communication skills and real-world language application.',
      lo: 'ເຂົ້າອົບຮົມພາສາອັງກິດເຊີງປະຕິບັດການກັບສະຖາບັນ YPLS ປະເທດສິງກະໂປ ມຸ່ງເນັ້ນການພັດທະນາທັກສະພາສາອັງກິດເພື່ອການສື່ສານ ແລະ ການປະຍຸກໃຊ້ໃນຊີວິດຈິງ',
      zh: '在新加坡YPLS学院完成实用英语培训课程，专注于沟通技能和语言实际应用。',
    },
    image: '/images/projects/ypls.jpg',
    tags: ['English'],
    featured: true,
    year: '2567',
    grade: { th: 'ม.3', en: 'Grade 9', lo: 'ມ.3', zh: '初三' },
  },
  {
    id: 'erican-malaysia',
    title: {
      th: 'อบรมภาษาอังกฤษ — Erican Language Centre, มาเลเซีย',
      en: 'English Training — Erican Language Centre, Malaysia',
      lo: 'ອົບຮົມພາສາອັງກິດ — Erican Language Centre, ມາເລເຊຍ',
      zh: '英语培训 — Erican Language Centre，马来西亚',
    },
    description: {
      th: 'เข้าอบรมภาษาอังกฤษเชิงปฏิบัติการกับ Erican Language Centre ประเทศมาเลเซีย มุ่งเน้นการฝึกทักษะภาษาอังกฤษเพื่อการสื่อสารข้ามวัฒนธรรมและการใช้งานจริง',
      en: 'Completed a practical English training program at Erican Language Centre in Malaysia, emphasizing cross-cultural communication and applied language skills.',
      lo: 'ເຂົ້າອົບຮົມພາສາອັງກິດເຊີງປະຕິບັດການກັບ Erican Language Centre ປະເທດມາເລເຊຍ ມຸ່ງເນັ້ນການຝຶກທັກສະພາສາອັງກິດເພື່ອການສື່ສານຂ້າມວັດທະນະທຳ ແລະ ການໃຊ້ງານຈິງ',
      zh: '在马来西亚Erican语言中心完成实用英语培训课程，侧重跨文化沟通和语言应用技能。',
    },
    image: '/images/projects/erican-malaysia.jpg',
    tags: ['English'],
    featured: true,
    year: '2567',
    grade: { th: 'ม.3', en: 'Grade 9', lo: 'ມ.3', zh: '初三' },
  },
  {
    id: 'english-channel-camp',
    title: {
      th: 'English Channel Camp',
      en: 'English Channel Camp',
      lo: 'English Channel Camp',
      zh: 'English Channel Camp',
    },
    description: {
      th: 'เข้าร่วมค่ายฝึกทักษะภาษาอังกฤษแบบเข้มข้น เสริมสร้างความมั่นใจในการสื่อสารผ่านกิจกรรมกลุ่มและสถานการณ์จำลองที่หลากหลาย',
      en: 'Attended an intensive English skills camp that boosted communication confidence through team activities and diverse scenario-based exercises.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍຝຶກທັກສະພາສາອັງກິດແບບເຂັ້ມຂຸ້ນ ເສີມສ້າງຄວາມໝັ້ນໃຈໃນການສື່ສານຜ່ານກິດຈະກຳກຸ່ມ ແລະ ສະຖານະການຈຳລອງທີ່ຫຼາກຫຼາຍ',
      zh: '参加英语技能强化营，通过团队活动和多样化的情景模拟练习提升沟通自信。',
    },
    image: '/images/projects/english-channel-camp.jpg',
    tags: ['English'],
    featured: true,
    year: '2567',
    grade: { th: 'ม.3', en: 'Grade 9', lo: 'ມ.3', zh: '初三' },
  },
  // ══ 📌 Sirindhorn (ปักหมุดท้ายสุดตามคำขอ) ═══════════════
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
      zh: '为 Sirindhorn 学校开发了在线"好人好事记录"系统，将学生数据管理升级为无纸化模式，以减少纸张浪费并提高审核效率。',
    },
    image: '/images/projects/sirindhorn-good-deeds.png',
    tags: ['Nest.js', 'TypeScript', 'Cloudflare'],
    featured: true,
    year: '2569',
    grade: { th: 'ม.5', en: 'Grade 11', lo: 'ມ.5', zh: '高二' },
  },
];
