export interface Project {
  id: string;
  title: {
    th: string;
    en: string;
    lo: string;
  };
  description: {
    th: string;
    en: string;
    lo: string;
  };
  image: string;
  tags: string[];
  liveUrl?: string;
  codeUrl?: string;
  /** Groups entries on the resume. */
  category: 'competition' | 'camp' | 'training' | 'project';
  featured: boolean;
  /** Shown in "Featured work" on the home page (keep it to about three). */
  highlight?: boolean;
  award?: 'gold' | 'silver' | 'bronze';
  /** Badge text when the prize isn't a medal, e.g. "Bronze Prize". */
  awardText?: {
    th: string;
    en: string;
    lo: string;
  };
  badgeIconOnly?: boolean;
  year?: string;
  grade?: {
    th: string;
    en: string;
    lo: string;
  };
}

export const projects: Project[] = [
  // ══ 🥇 GOLD (ปีล่าสุดก่อน) ══════════════════════════════
  {
    id: 'thailand-metaverse',
    title: {
      th: 'Thailand Metaverse Hackathon #2',
      en: 'Thailand Metaverse Hackathon #2',
      lo: 'Thailand Metaverse Hackathon #2',
    },
    description: {
      th: 'ชนะเลิศ Entertainment Track กับทีม EdVantage จากไอเดีย VR Concert ที่ผสม Gamification ผมรับหน้าที่ออกแบบระบบ สถาปัตยกรรม และ Flowchart จัดโดยวิศวกรรม จุฬาฯ',
      en: 'Won the Entertainment Track with team EdVantage for a VR Concert idea with gamification. I designed the system, its architecture and the flowcharts. Organized by Engineering, Chulalongkorn University.',
      lo: 'ຊະນະເລີດ Entertainment Track ກັບທີມ EdVantage ຈາກໄອເດຍ VR Concert ທີ່ຜະສົມ Gamification ຂ້ອຍຮັບໜ້າທີ່ອອກແບບລະບົບ ສະຖາປັດຕະຍະກຳ ແລະ Flowchart ຈັດໂດຍວິສະວະກຳ ຈຸລາລົງກອນ',
    },
    image: '/images/projects/thailand-metaverse.jpg',
    tags: ['HTML', 'CSS', 'JavaScript'],
    category: 'competition',
    featured: true,
    highlight: true,
    award: 'gold',
    year: '2569',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4' },
  },
  {
    id: 'kku-open-house',
    title: {
      th: 'Computer Education KKU Open House 2024',
      en: 'Computer Education KKU Open House 2024',
      lo: 'Computer Education KKU Open House 2024',
    },
    description: {
      th: 'คว้ารางวัลชนะเลิศสาขา Infographic ในงาน KKU Open House 2024 โดยนำเนื้อหาภาษาไทยมาแปลเป็นภาษาอังกฤษ พร้อมออกแบบสื่อกราฟิกที่สวยงามและสื่อสารได้อย่างชัดเจน',
      en: 'Won the first place in the Infographic category at KKU Open House 2024 by translating Thai content into English and crafting visually compelling graphic media with clear communication.',
      lo: 'ຄວ້າລາງວັນຊະນະເລີດສາຂາ Infographic ໃນງານ KKU Open House 2024 ໂດຍແປເນື້ອຫາພາສາໄທເປັນພາສາອັງກິດ ພ້ອມອອກແບບສື່ກຣາຟິກທີ່ສວຍງາມ ແລະສື່ສານໄດ້ຢ່າງຊັດເຈນ',
    },
    image: '/images/projects/kku-open-house.jpg',
    tags: ['Adobe Illustrator', 'Adobe Photoshop'],
    category: 'competition',
    featured: true,
    award: 'gold',
    year: '2567',
    grade: { th: 'ม.2', en: 'Grade 8', lo: 'ມ.2' },
  },
  // ══ 🥈 SILVER ════════════════════════════════════════════
  {
    id: 'silpahattakam-71',
    title: {
      th: 'ศิลปหัตถกรรม ครั้งที่ 71',
      en: 'National Arts & Crafts Competition #71',
      lo: 'ສິລະປະຫັດຖະກຳ ຄັ້ງທີ 71',
    },
    description: {
      th: 'ได้รับรางวัลระดับเหรียญเงิน ในสาขาสร้างเกมสร้างสรรค์ด้วยโปรแกรมคอมพิวเตอร์ ออกแบบและพัฒนาเกมที่มีความสร้างสรรค์โดดเด่น',
      en: 'Awarded a Silver Medal in the Creative Game Development with Computer Programs category, designing and developing a standout creative game.',
      lo: 'ໄດ້ຮັບລາງວັນລະດັບຫຼຽນເງິນ ໃນສາຂາສ້າງເກມສ້າງສັນດ້ວຍໂປຣແກຣມຄອມພິວເຕີ ອອກແບບ ແລະ ພັດທະນາເກມທີ່ມີຄວາມສ້າງສັນໂດດເດັ່ນ',
    },
    image: '/images/projects/silpahattakam-71.jpg',
    tags: ['Construct 2'],
    category: 'competition',
    featured: true,
    award: 'silver',
    year: '2566',
    grade: { th: 'ม.2', en: 'Grade 8', lo: 'ມ.2' },
  },
  // ══ 🥉 BRONZE ════════════════════════════════════════════
  {
    id: 'coding-thailand-2026',
    title: {
      th: 'Coding Thailand 2026: AI Inspires the Future',
      en: 'Coding Thailand 2026: AI Inspires the Future',
      lo: 'Coding Thailand 2026: AI Inspires the Future',
    },
    description: {
      th: 'ได้ Bronze Prize ระดับประเทศ และ Silver Prize ระดับภูมิภาคอีสานตอนล่าง กับทีม Sleep',
      en: 'Bronze Prize at the national level and Silver Prize in the Lower Northeast region, with team Sleep.',
      lo: 'ໄດ້ Bronze Prize ລະດັບປະເທດ ແລະ Silver Prize ລະດັບພາກອີສານຕອນລຸ່ມ ກັບທີມ Sleep',
    },
    image: '/images/projects/coding-thailand-2026.jpg',
    tags: [],
    category: 'competition',
    featured: true,
    highlight: true,
    award: 'bronze',
    awardText: { th: 'Bronze Prize', en: 'Bronze Prize', lo: 'Bronze Prize' },
    year: '2569',
  },
  {
    id: 'silpahattakam-70',
    title: {
      th: 'ศิลปหัตถกรรม ครั้งที่ 70',
      en: 'National Arts & Crafts Competition #70',
      lo: 'ສິລະປະຫັດຖະກຳ ຄັ້ງທີ 70',
    },
    description: {
      th: 'ได้รับรางวัลระดับเหรียญทองแดง ในสาขาเขียนโปรแกรมแก้โจทย์ปัญหาด้วยภาษา C++ ทดสอบทักษะการคิดเชิงตรรกะและอัลกอริทึม',
      en: 'Awarded a Bronze Medal in the Programming Problem Solving with C++ category, demonstrating strong logical thinking and algorithmic skills.',
      lo: 'ໄດ້ຮັບລາງວັນລະດັບຫຼຽນທອງແດງ ໃນສາຂາຂຽນໂປຣແກຣມແກ້ໂຈດບັນຫາດ້ວຍພາສາ C++ ທົດສອບທັກສະການຄິດເຊີງຕັກກະ ແລະ ອັນກໍຣິທຶມ',
    },
    image: '/images/projects/silpahattakam-70.jpg',
    tags: ['C++'],
    category: 'competition',
    featured: true,
    award: 'bronze',
    year: '2565',
    grade: { th: 'ม.1', en: 'Grade 7', lo: 'ມ.1' },
  },
  // ══ ไม่มีเหรียญ (ปีล่าสุดก่อน) ═════════════════════════
  {
    id: '2b-kmutt-fibo',
    title: {
      th: 'Researcher, 2B-KMUTT (Batch 20) — FIBO, KMUTT',
      en: 'Researcher, 2B-KMUTT (Batch 20) — FIBO, KMUTT',
      lo: 'Researcher, 2B-KMUTT (Batch 20) — FIBO, KMUTT',
    },
    description: {
      th: 'ใช้ชีวิต 20 วันที่ มจธ. ในค่าย 2B-KMUTT รุ่นที่ 20 ทำงานกับ FIBO ในโปรเจกต์ AI คัดกรองรูปถ่ายบุคคลเบื้องต้น แยกรูปเบลอและรูปที่มีคนหลับตาออกให้ช่างภาพ ด้วย InsightFace, pHash และ EAR',
      en: 'Spent 20 days at KMUTT in 2B-KMUTT Batch 20, working with FIBO on an AI project that pre-screens portrait photos, setting aside blurry shots and closed eyes for photographers, using InsightFace, pHash and EAR.',
      lo: 'ໃຊ້ຊີວິດ 20 ວັນທີ່ ມຈທ. ໃນຄ່າຍ 2B-KMUTT ລຸ້ນທີ 20 ເຮັດວຽກກັບ FIBO ໃນໂປຣເຈັກ AI ຄັດກອງຮູບຖ່າຍບຸກຄົນເບື້ອງຕົ້ນ ແຍກຮູບມົວ ແລະ ຮູບທີ່ມີຄົນຫຼັບຕາອອກໃຫ້ຊ່າງພາບ ດ້ວຍ InsightFace, pHash ແລະ EAR',
    },
    image: '/images/projects/2b-kmutt.jpg',
    tags: ['InsightFace', 'pHash', 'Python', 'HTML', 'SQLite'],
    category: 'camp',
    featured: true,
    highlight: true,
    year: '2569',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4' },
  },
  {
    id: 'it-clash',
    title: {
      th: 'IT Clash',
      en: 'IT Clash',
      lo: 'IT Clash',
    },
    description: {
      th: 'ผ่านเข้ารอบ 16 ทีมสุดท้ายในการแข่งขัน IT Clash ซึ่งจัดขึ้นที่สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง (สจล.)',
      en: "Reached the Top 16 finalists in the IT Clash competition held at King Mongkut's Institute of Technology Ladkrabang (KMITL).",
      lo: 'ຜ່ານເຂົ້າຮອບ 16 ທີມສຸດທ້າຍໃນການແຂ່ງຂັນ IT Clash ທີ່ສະຖາບັນເທັກໂນໂລຢີພະຈອມເກົ້າເຈົ້າຄຸນທະຫານລາດກະບັງ (ສຈລ).',
    },
    image: '/images/projects/it-clash.jpg',
    tags: ['Python'],
    category: 'competition',
    featured: true,
    year: '2569',
    grade: { th: 'ม.5', en: 'Grade 11', lo: 'ມ.5' },
  },
  {
    id: 'rsca-drone',
    title: {
      th: 'RSCA — ออกแบบแผนบินโดรนแปรอักษร',
      en: 'RSCA — Drone Formation Flight Design',
      lo: 'RSCA — ອອກແບບແຜນບິນໂດຣນແປຣອັກສອນ',
    },
    description: {
      th: 'ใช้ทักษะการวางแผนและความคิดสร้างสรรค์ ออกแบบแผนการบินโดรนแปรอักษรด้วยโปรแกรม Blender ผ่านเข้ารอบ 16 ทีมสุดท้ายระดับประเทศ แต่สละสิทธิ์เนื่องจากตารางซ้อนทับ',
      en: 'Applied strategic planning and creative thinking to design drone swarm formation flights using Blender. Advanced to the national Top 16 but withdrew due to scheduling conflicts.',
      lo: 'ໃຊ້ທັກສະການວາງແຜນ ແລະຄວາມຄິດສ້າງສັນ ອອກແບບແຜນການບິນໂດຣນແປຣອັກສອນດ້ວຍໂປຣແກຣມ Blender ຜ່ານເຂົ້າຮອບ 16 ທີມສຸດທ້າຍລະດັບຊາດ ແຕ່ສະລະສິດເນື່ອງຈາກຕາຕະລາງຊ້ອນທັບ',
    },
    image: '/images/projects/rsca.jpg',
    tags: ['Blender', 'Python'],
    category: 'competition',
    featured: true,
    year: '2569',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4' },
  },
  {
    id: 'jwc14',
    title: {
      th: 'Junior Web Master Camp 14 (JWC14)',
      en: 'Junior Web Master Camp 14 (JWC14)',
      lo: 'Junior Web Master Camp 14 (JWC14)',
    },
    description: {
      th: 'เข้าร่วมค่าย Hackathon ภายใต้แนวคิด "Start Small, Think Big" ร่วมกับทีมพัฒนาแพลตฟอร์ม vibematch.in.th — ระบบจับคู่ทีมสำหรับผู้ที่ต้องการหาสมาชิกร่วมแข่งขันในเวทีต่าง ๆ',
      en: 'Participated in a Hackathon camp under the concept "Start Small, Think Big." Collaborated with a team to build vibematch.in.th — a platform that helps users find teammates for various competitions.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍ Hackathon ພາຍໃຕ້ແນວຄິດ "Start Small, Think Big" ຮ່ວມກັບທີມພັດທະນາແພລດຟອມ vibematch.in.th — ລະບົບຈັບຄູ່ທີມສຳລັບຜູ້ທີ່ຕ້ອງການຫາສະມາຊິກຮ່ວມແຂ່ງຂັນໃນເວທີຕ່າງໆ',
    },
    image: '/images/projects/jwc14.jpg',
    tags: ['TypeScript', 'Next.js'],
    category: 'camp',
    featured: true,
    year: '2569',
    grade: { th: 'ม.5', en: 'Grade 11', lo: 'ມ.5' },
  },
  {
    id: 'robotics-ai-frontier',
    title: {
      th: 'Robotics and AI Frontier Camp 2026',
      en: 'Robotics and AI Frontier Camp 2026',
      lo: 'Robotics and AI Frontier Camp 2026',
    },
    description: {
      th: 'เข้าร่วมค่ายปฏิบัติการด้านหุ่นยนต์และปัญญาประดิษฐ์ ลงมือทำ Workshop หุ่นยนต์ ฝึก AI Classification บนบอร์ด Arduino พร้อมเขียนโปรแกรมควบคุมโดรนจริง',
      en: 'Attended a hands-on Robotics & AI camp featuring robot workshops, AI Classification on Arduino boards, and real drone programming exercises.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍປະຕິບັດການດ້ານຫຸ່ນຍົນ ແລະ AI ລົງມືເຮັດ Workshop ຫຸ່ນຍົນ ຝຶກ AI Classification ເທິງບອດ Arduino ພ້ອມຂຽນໂປຣແກຣມຄວບຄຸມໂດຣນຈິງ',
    },
    image: '/images/projects/robotics-ai.jpg',
    tags: ['Python', 'C', 'Arduino'],
    category: 'camp',
    featured: true,
    year: '2569',
    grade: { th: 'ม.5', en: 'Grade 11', lo: 'ມ.5' },
  },
  {
    id: 'click-camp-16',
    title: {
      th: 'Click Camp 16',
      en: 'Click Camp 16',
      lo: 'Click Camp 16',
    },
    description: {
      th: 'เข้าร่วมค่ายโดยคณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยมหิดล เรียนรู้การสร้าง AI พื้นฐาน และเจาะลึก Cyber Security ด้วยเครื่องมือจริง',
      en: 'Attended a camp hosted by the Computer Engineering department at Mahidol University. Learned foundational AI development and explored Cyber Security with industry-standard tools.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍໂດຍຄະນະວິສະວະກຳສາດ ສາຂາວິສະວະກຳຄອມພິວເຕີ ມະຫາວິທະຍາໄລມະຫິດົນ ຮຽນຮູ້ການສ້າງ AI ພື້ນຖານ ແລະ ສຳຫຼວດ Cyber Security ດ້ວຍເຄື່ອງມືຈິງ',
    },
    image: '/images/projects/cc16.jpg',
    tags: ['Python', 'Streamlit', 'WireShark', 'Burp Suite'],
    category: 'camp',
    featured: true,
    year: '2568',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4' },
  },
  {
    id: 'env-science-camp',
    title: {
      th: 'ค่ายวิทยาศาสตร์สิ่งแวดล้อม',
      en: 'Environmental Science Camp',
      lo: 'ຄ່າຍວິທະຍາສາດສິ່ງແວດລ້ອມ',
    },
    description: {
      th: 'ค่ายบูรณาการความรู้ STEM เข้ากับการเรียนรู้หลากหลายสาขาของวิทยาศาสตร์ ฝึกทักษะการคิดเชิงระบบและการทำงานภาคสนาม',
      en: 'An integrative STEM camp combining multi-disciplinary sciences with systems thinking and hands-on fieldwork experience.',
      lo: 'ຄ່າຍບູລະນາການຄວາມຮູ້ STEM ເຂົ້າກັບການຮຽນຮູ້ຫຼາກຫຼາຍສາຂາຂອງວິທະຍາສາດ ຝຶກທັກສະການຄິດເຊີງລະບົບ ແລະ ການເຮັດວຽກພາກສະໜາມ',
    },
    image: '/images/projects/env-science-camp.jpg',
    tags: ['Basic Sci'],
    category: 'camp',
    featured: true,
    year: '2568',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4' },
  },

  {
    id: 'scientist-path-thammasat',
    title: {
      th: 'ค่ายจุดประกายเส้นทางนักวิทยาศาสตร์ — มธ.',
      en: 'Scientist Path Camp — Thammasat University',
      lo: 'ຄ່າຍຈຸດປະກາຍເສັ້ນທາງນັກວິທະຍາສາດ — ມທ.',
    },
    description: {
      th: 'เข้าร่วมค่ายวิทยาศาสตร์ที่มหาวิทยาลัยธรรมศาสตร์ บูรณาการความรู้ STEM เข้ากับกิจกรรมหลากหลายสาขา ฝึกทักษะกระบวนการคิดแบบนักวิทยาศาสตร์',
      en: 'Attended a science camp at Thammasat University integrating STEM disciplines through multi-field activities, building scientific thinking methodologies.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍວິທະຍາສາດທີ່ມະຫາວິທະຍາໄລທຳມະສາດ ບູລະນາການຄວາມຮູ້ STEM ເຂົ້າກັບກິດຈະກຳຫຼາກຫຼາຍສາຂາ ຝຶກທັກສະກະບວນການຄິດແບບນັກວິທະຍາສາດ',
    },
    image: '/images/projects/scientist-path-thammasat.jpg',
    tags: ['Basic Sci'],
    category: 'camp',
    featured: true,
    year: '2568',
    grade: { th: 'ม.4', en: 'Grade 10', lo: 'ມ.4' },
  },
  {
    id: 'ypls-singapore',
    title: {
      th: 'อบรมภาษาอังกฤษ — YPLS, สิงคโปร์',
      en: 'English Training — YPLS, Singapore',
      lo: 'ອົບຮົມພາສາອັງກິດ — YPLS, ສິງກະໂປ',
    },
    description: {
      th: 'เข้าอบรมภาษาอังกฤษเชิงปฏิบัติการกับสถาบัน YPLS ประเทศสิงคโปร์ มุ่งเน้นการพัฒนาทักษะภาษาอังกฤษเพื่อการสื่อสารและการประยุกต์ใช้ในชีวิตจริง',
      en: 'Completed a practical English training program at the YPLS Institute in Singapore, focusing on communication skills and real-world language application.',
      lo: 'ເຂົ້າອົບຮົມພາສາອັງກິດເຊີງປະຕິບັດການກັບສະຖາບັນ YPLS ປະເທດສິງກະໂປ ມຸ່ງເນັ້ນການພັດທະນາທັກສະພາສາອັງກິດເພື່ອການສື່ສານ ແລະ ການປະຍຸກໃຊ້ໃນຊີວິດຈິງ',
    },
    image: '/images/projects/ypls.jpg',
    tags: ['English'],
    category: 'training',
    featured: true,
    year: '2567',
    grade: { th: 'ม.3', en: 'Grade 9', lo: 'ມ.3' },
  },
  {
    id: 'erican-malaysia',
    title: {
      th: 'อบรมภาษาอังกฤษ — Erican Language Centre, มาเลเซีย',
      en: 'English Training — Erican Language Centre, Malaysia',
      lo: 'ອົບຮົມພາສາອັງກິດ — Erican Language Centre, ມາເລເຊຍ',
    },
    description: {
      th: 'เข้าอบรมภาษาอังกฤษเชิงปฏิบัติการกับ Erican Language Centre ประเทศมาเลเซีย มุ่งเน้นการฝึกทักษะภาษาอังกฤษเพื่อการสื่อสารข้ามวัฒนธรรมและการใช้งานจริง',
      en: 'Completed a practical English training program at Erican Language Centre in Malaysia, emphasizing cross-cultural communication and applied language skills.',
      lo: 'ເຂົ້າອົບຮົມພາສາອັງກິດເຊີງປະຕິບັດການກັບ Erican Language Centre ປະເທດມາເລເຊຍ ມຸ່ງເນັ້ນການຝຶກທັກສະພາສາອັງກິດເພື່ອການສື່ສານຂ້າມວັດທະນະທຳ ແລະ ການໃຊ້ງານຈິງ',
    },
    image: '/images/projects/erican-malaysia.jpg',
    tags: ['English'],
    category: 'training',
    featured: true,
    year: '2567',
    grade: { th: 'ม.3', en: 'Grade 9', lo: 'ມ.3' },
  },
  {
    id: 'english-channel-camp',
    title: {
      th: 'English Channel Camp',
      en: 'English Channel Camp',
      lo: 'English Channel Camp',
    },
    description: {
      th: 'เข้าร่วมค่ายฝึกทักษะภาษาอังกฤษแบบเข้มข้น เสริมสร้างความมั่นใจในการสื่อสารผ่านกิจกรรมกลุ่มและสถานการณ์จำลองที่หลากหลาย',
      en: 'Attended an intensive English skills camp that boosted communication confidence through team activities and diverse scenario-based exercises.',
      lo: 'ເຂົ້າຮ່ວມຄ່າຍຝຶກທັກສະພາສາອັງກິດແບບເຂັ້ມຂຸ້ນ ເສີມສ້າງຄວາມໝັ້ນໃຈໃນການສື່ສານຜ່ານກິດຈະກຳກຸ່ມ ແລະ ສະຖານະການຈຳລອງທີ່ຫຼາກຫຼາຍ',
    },
    image: '/images/projects/english-channel-camp.jpg',
    tags: ['English'],
    category: 'training',
    featured: true,
    year: '2567',
    grade: { th: 'ม.3', en: 'Grade 9', lo: 'ມ.3' },
  },
  // ══ 📌 Sirindhorn (ปักหมุดท้ายสุดตามคำขอ) ═══════════════
  {
    id: 'sirindhorn-good-deeds',
    title: {
      th: 'ระบบสมุดบันทึกความดี โรงเรียนสิรินธร',
      en: 'Sirindhorn School Good Deeds System',
      lo: 'ລະບົບສະໝຸດບັນທຶກຄວາມດີ ໂຮງຮຽນສິຣິນທອນ',
    },
    description: {
      th: 'พัฒนาระบบสมุดบันทึกความดีออนไลน์สำหรับโรงเรียนสิรินธร เพื่อยกระดับการจัดการข้อมูลนักเรียนสู่รูปแบบดิจิทัล (Paperless) ช่วยลดการใช้ทรัพยากรกระดาษและเพิ่มประสิทธิภาพในการตรวจสอบ',
      en: 'Developed an online Good Deeds Record system for Sirindhorn School, transitioning student data management to a paperless format to reduce resource consumption and enhance verification efficiency.',
      lo: 'ພັດທະນາລະບົບສະໝຸດບັນທຶກຄວາມດີອອນລາຍສຳລັບໂຮງຮຽນສິຣິນທອນ ເພື່ອຍົກລະດັບການຈັດການຂໍ້ມູນນັກຮຽນສູ່ຮູບແບບດິຈິຕອລ (Paperless) ຊ່ວຍລຸດຜ່ອນການໃຊ້ຊັບພະຍາກອນເຈ້ຍ ແລະເພີ່ມປະສິດທິພາບໃນການກວດສອບ',
    },
    image: '/images/projects/sirindhorn-good-deeds.png',
    tags: ['Nest.js', 'TypeScript', 'Cloudflare'],
    category: 'project',
    featured: true,
    year: '2569',
    grade: { th: 'ม.5', en: 'Grade 11', lo: 'ມ.5' },
  },
];
