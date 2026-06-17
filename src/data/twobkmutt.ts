import { ReactNode } from 'react';

export type LocaleContent = {
  heroTitle: string;
  heroHighlight: string;
  heroSubtitle: string;
  scrollDown: string;
  introLabel: string;
  introP1: string;
  introP2: string;
  researchGroups: string[];
  introP3: string;
  journeyLabel: string;
  journeyTitle: string;
  journeyDesc: string;
  journeySteps: { title: string; text: string }[];
  benefitsLabel: string;
  benefitsTitle: string;
  benefits: { title: string; text: string }[];
  comparisonLabel: string;
  comparisonTitle: string;
  campNormal: { title: string; items: string[] };
  camp2B: { title: string; items: string[] };
  fitLabel: string;
  fitTitle: string;
  fitYes: { title: string; items: string[] };
  fitNo: { title: string; items: string[] };
  ctaText1: string;
  ctaText2: string;
  ctaButton: string;
  ctaDisclaimer: string;
};

export const twoBData: Record<'th' | 'en' | 'lo' | 'zh', LocaleContent> = {
  th: {
    heroTitle: '20 วัน ที่เปลี่ยนคุณจากนักเรียน ',
    heroHighlight: '→ นักวิจัย',
    heroSubtitle: '2B-KMUTT Future Leader Camp (รุ่นที่ 20) — ค่ายที่คนอยากเข้าบางมดพลาดไม่ได้',
    scrollDown: 'เลื่อนลง',
    introLabel: 'What is 2B-KMUTT?',
    introP1: '2B-KMUTT คือโครงการค่ายวิชาการระดับประเทศของมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ.) ที่กินระยะเวลาจัดยาวนานถึง 20 วันเต็ม เป้าหมายของค่ายนี้ไม่ใช่การมานั่งฟังบรรยายในห้องเรียน แต่คือการจำลองชีวิต "นักศึกษามหาวิทยาลัยและนักวิจัยเต็มรูปแบบ" ให้กับเด็กนักเรียนชั้น ม.4 - ม.5 และ ปวช.',
    introP2: 'ผู้เข้าร่วมจะถูกกระจายตัวเข้าไปอยู่ในห้องปฏิบัติการจริงตามสาขาที่ตัวเองสนใจ ซึ่งครอบคลุมหลากหลายสาขาวิชา ไม่ใช่แค่สายเทคฯ เท่านั้น โดยมีทั้งหมด 10 กลุ่มวิจัย ได้แก่:',
    researchGroups: [
      '1. พลังงานแห่งอนาคต',
      '2. วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ',
      '3. นวัตกรรมอาหารเพื่อสุขภาพ',
      '4. เทคโนโลยีสารสนเทศและการสื่อสาร',
      '5. มัลติมีเดียและการออกแบบ',
      '6. คณิตศาสตร์และฟิสิกส์ประยุกต์',
      '7. วิทยาศาสตร์สิ่งแวดล้อมและทรัพยากรธรรมชาติ',
      '8. นวัตกรรมวัสดุศาสตร์',
      '9. วิศวกรรมโยธาและการจัดการโลจิสติกส์',
      '10. วิศวกรรมไฟฟ้าและอิเล็กทรอนิกส์'
    ],
    introP3: 'ทุกคนจะได้ทำวิจัยและสร้างโปรเจกต์นวัตกรรมร่วมกับคณาจารย์และนักวิจัยระดับท็อปของประเทศ',
    journeyLabel: 'The Journey',
    journeyTitle: 'ชีวิต 20 วันในค่าย: ของจริง ไม่มีพี่เลี้ยงคอยป้อน',
    journeyDesc: 'แม้ค่ายนี้จะมี "พี่เลี้ยง (Mentor)" คอยให้คำปรึกษาอย่างใกล้ชิด แต่นั่นไม่ใช่การป้อนความรู้ให้ทั้งหมด (No Spoon-feeding) ผู้เข้าร่วมต้องพร้อมเรียนรู้ด้วยตัวเอง ลงมือทำจริง และเผชิญกับกระบวนการทำงานที่ท้าทายระดับมหาวิทยาลัย',
    journeySteps: [
      { title: 'The Crucible of Ideas', text: 'สัปดาห์แรกคือช่วงเวลาที่ทรหดที่สุด ไม่ใช่การรีบเขียนโค้ด แต่เป็นการเค้นไอเดียหา "หัวข้องานวิจัย" ต้องทำ Literature Review เพื่อตอบให้ได้ว่า สิ่งที่จะทำมีคนทำหรือยัง? สร้าง Impact ให้สังคมได้อย่างไร?' },
      { title: 'Execution', text: 'การลงมือทำ นำทักษะที่มี (เช่น การเขียน Python, การทำโมเดล AI) มาประยุกต์ใช้เพื่อแก้ปัญหาตามหัวข้อที่คิดไว้ให้สำเร็จและใช้งานได้จริงภายในเวลาที่จำกัด' },
      { title: 'University Life', text: 'วิถีชีวิตนักศึกษา ต้องบริหารจัดการตัวเอง 100% นอนหอในของมหาวิทยาลัย ตื่นเอง กินข้าวโรงอาหารมหาลัย เดินทางไปตึกทำงานเอง หากบริหารเวลาพลาด ผลกระทบจะตกอยู่ที่โปรเจกต์ของตัวเองโดยตรง' }
    ],
    benefitsLabel: 'Key Benefits',
    benefitsTitle: 'ดียังไง? ทำไมถึงพลาดไม่ได้?',
    benefits: [
      { title: '1. ตั๋ว Fast Track ผ่านรอบ Active Recruitment', text: 'นี่คือผลประโยชน์ที่เป็นรูปธรรมที่สุด การผ่านชีวิต 20 วันทำให้มหาวิทยาลัยได้เห็นฝีมือ วินัย และวิธีคิด ผู้ที่ผ่านค่ายนี้และมีผลงานวิจัยที่ได้มาตรฐาน จะได้รับสิทธิ์ยื่นเข้าศึกษาต่อรอบ Active Recruitment ทันที' },
      { title: '2. บททดสอบ "Bangmod DNA"', text: 'วัฒนธรรมของบางมดคือความสมบุกสมบัน พึ่งพาตัวเองได้ การโดนอาจารย์ระดับประเทศวิจารณ์งานอย่างตรงไปตรงมา จะช่วยกะเทาะเปลือกและอีโก้ ทำให้คุณเติบโตขึ้นอย่างก้าวกระโดด' },
      { title: '3. ยกระดับ Mindset สู่ "นักแก้ปัญหา"', text: 'เปลี่ยนวิธีคิดจากการเป็นแค่ "คนเขียนโปรแกรมเป็น" สู่การเป็น "นักพัฒนานวัตกรรม" เทคโนโลยีจะไม่มีประโยชน์เลยถ้าไม่ได้แก้ Pain Point ที่มีอยู่จริง ทักษะนี้สามารถนำไปประยุกต์ใช้ใน Hackathon ได้อย่างทรงพลัง' },
      { title: '4. Connection คุณภาพสูง', text: 'สังคมใน 2B-KMUTT คือแหล่งรวมหัวกะทิหลากหลายความสามารถ การฝ่าฟันความกดดันไปด้วยกัน 20 วันทำให้เกิดสายสัมพันธ์ที่ลึกซึ้ง จบค่ายไปแล้วเพื่อนกลุ่มนี้จะกลายเป็นเครือข่ายคนรุ่นใหม่ที่พร้อมช่วยเหลือกันไปอีกยาวนาน' }
    ],
    comparisonLabel: 'The Difference',
    comparisonTitle: 'ต่างจากค่ายอื่นอย่างไร?',
    campNormal: {
      title: 'ค่ายติวทั่วไป',
      items: [
        'ไปนั่งฟังเลคเชอร์ในห้องประชุมใหญ่ๆ',
        'ทำกิจกรรมกลุ่มละลายพฤติกรรมเป็นหลัก',
        'สัมผัสของจริงได้แค่ผิวเผิน',
        'ระยะเวลาสั้นแค่ 2-3 วัน'
      ]
    },
    camp2B: {
      title: '2B-KMUTT',
      items: [
        'ลงมือทำงานวิจัยจริง ในแล็บระดับประเทศ',
        'มีที่ปรึกษา (Mentor) ดูแลประกบแบบ 1 ต่อ 1',
        'ใช้เครื่องมือวิศวกรรมจริง ที่ปกติสงวนไว้ให้ ป.โท/เอก',
        'ใช้ชีวิตในมหาวิทยาลัย ยาวนานถึง 20 วันเต็ม'
      ]
    },
    fitLabel: 'Fit Check',
    fitTitle: 'ค่ายนี้... "คุณใช่หรือเปล่า?"',
    fitYes: {
      title: 'คนที่ใช่',
      items: [
        'ชอบทดลอง ตั้งคำถาม และหาคำตอบด้วยตัวเอง',
        'ไม่กลัวความท้าทาย และพร้อมเรียนรู้สิ่งใหม่ที่ยากๆ',
        'สามารถอยู่ร่วมกับคนอื่นและทำงานเป็นทีมได้',
        'เลือดสูบฉีดเวลาเห็นเทคโนโลยีเจ๋งๆ หรือห้องแล็บล้ำๆ'
      ]
    },
    fitNo: {
      title: 'คนที่ไม่ใช่',
      items: [
        'อยากมาหาเพื่อนเล่นสนุกๆ แบบค่ายนันทนาการ',
        'รอให้คนอื่นป้อนข้อมูลให้ทั้งหมด ไม่ชอบขวนขวายเอง',
        'ยอมแพ้ง่ายเวลาที่โค้ดพัง หรือการทดลองล้มเหลว'
      ]
    },
    ctaText1: '2B-KMUTT ไม่ใช่แค่ค่าย',
    ctaText2: 'แต่มันคือบทพิสูจน์ชิ้นแรก',
    ctaButton: 'ดูข้อมูลค่ายรุ่นที่ 20 →',
    ctaDisclaimer: '*หมายเหตุ: ข้อมูลตัวอย่างสำหรับ 2B-KMUTT รุ่นที่ 20 เท่านั้น'
  },
  en: {
    heroTitle: '20 Days Transforming Students into ',
    heroHighlight: '→ Researchers',
    heroSubtitle: '2B-KMUTT Future Leader Camp (Gen 20) — The must-attend camp for future KMUTT innovators.',
    scrollDown: 'Scroll Down',
    introLabel: 'What is 2B-KMUTT?',
    introP1: '2B-KMUTT is a national academic camp hosted by King Mongkut\'s University of Technology Thonburi (KMUTT) that spans 20 full days. The goal isn\'t just sitting in lectures; it\'s a full-scale simulation of "university student and researcher life" for high school and vocational students.',
    introP2: 'Participants are dispersed into real laboratories based on their interests, covering a wide range of fields—not just technology. There are 10 research groups in total:',
    researchGroups: [
      '1. Future Energy',
      '2. Robotics and Automation Engineering',
      '3. Health Food Innovation',
      '4. Information and Communication Technology',
      '5. Multimedia and Design',
      '6. Applied Mathematics and Physics',
      '7. Environmental Science and Natural Resources',
      '8. Materials Science Innovation',
      '9. Civil Engineering and Logistics Management',
      '10. Electrical and Electronics Engineering'
    ],
    introP3: 'Everyone will conduct research and build innovative projects alongside the country\'s top professors and researchers.',
    journeyLabel: 'The Journey',
    journeyTitle: '20 Days in Camp: Real Life, No Spoon-feeding',
    journeyDesc: 'While the camp provides "Mentors" for close guidance, there is absolutely No Spoon-feeding. Participants must be ready to learn independently, get hands-on, and face university-level work pressures.',
    journeySteps: [
      { title: 'The Crucible of Ideas', text: 'The first week is the most grueling. It\'s not about rushing to code, but squeezing out ideas for a "Research Topic." You must do a Literature Review to answer: Has this been done? How does it impact society?' },
      { title: 'Execution', text: 'Taking action. Applying your skills (e.g., Python coding, AI modeling) to solve the problem based on your proposed topic, making it functional within a strict time limit.' },
      { title: 'University Life', text: 'Simulated university life. You must manage yourself 100%: sleeping in dorms, waking up on your own, eating at the cafeteria, and commuting to labs. Poor time management directly impacts your project.' }
    ],
    benefitsLabel: 'Key Benefits',
    benefitsTitle: 'Why You Can\'t Miss This?',
    benefits: [
      { title: '1. Fast Track to Active Recruitment', text: 'The most tangible benefit. Surviving these 20 days shows the university your skills, discipline, and mindset. Those with standard-meeting research get special quotas for Active Recruitment admission.' },
      { title: '2. The "Bangmod DNA" Test', text: 'KMUTT\'s culture is rugged and self-reliant. Facing direct, honest critiques from top-tier professors shatters your ego and accelerates your growth exponentially.' },
      { title: '3. Elevate Mindset to "Problem Solver"', text: 'Shift from just "knowing how to code" to becoming an "Innovation Developer." Technology is useless if it doesn\'t solve real Pain Points. This mindset is powerful for future Hackathons.' },
      { title: '4. High-Quality Connections', text: '2B-KMUTT gathers the elite. Enduring pressure together for 20 days creates deep bonds. Post-camp, these friends become a network of young talents ready to support each other.' }
    ],
    comparisonLabel: 'The Difference',
    comparisonTitle: 'How is it different from other camps?',
    campNormal: {
      title: 'Typical Tutoring Camps',
      items: [
        'Sit and listen to lectures in large halls',
        'Focus mainly on ice-breaking group activities',
        'Only superficial hands-on experience',
        'Short duration of just 2-3 days'
      ]
    },
    camp2B: {
      title: '2B-KMUTT',
      items: [
        'Real research work in national-level labs',
        '1-on-1 supervision from dedicated Mentors',
        'Use real engineering tools reserved for Master/PhD students',
        'Live in the university for a full 20 days'
      ]
    },
    fitLabel: 'Fit Check',
    fitTitle: '"Are You the Right Fit?"',
    fitYes: {
      title: 'The Right Fit',
      items: [
        'Loves experimenting, asking questions, and finding own answers',
        'Not afraid of challenges and ready to learn difficult things',
        'Can coexist with others and work well in a team',
        'Gets pumped seeing cool tech or advanced labs'
      ]
    },
    fitNo: {
      title: 'Not the Right Fit',
      items: [
        'Just looking to make friends and play games',
        'Waits to be spoon-fed information, dislikes self-study',
        'Gives up easily when code breaks or experiments fail'
      ]
    },
    ctaText1: '2B-KMUTT is not just a camp',
    ctaText2: 'It\'s your first real proof of capability',
    ctaButton: 'View Gen 20 Details →',
    ctaDisclaimer: '*Note: This information is an example based on 2B-KMUTT Gen 20.'
  },
  lo: {
    heroTitle: '20 ວັນ ທີ່ປ່ຽນຄຸນຈາກນັກຮຽນ ',
    heroHighlight: '→ ນັກວິໄຈ',
    heroSubtitle: '2B-KMUTT Future Leader Camp (ລຸ້ນທີ 20) — ຄ່າຍທີ່ຄົນຢາກເຂົ້າບາງມົດພາດບໍ່ໄດ້',
    scrollDown: 'ເລື່ອນລົງ',
    introLabel: 'What is 2B-KMUTT?',
    introP1: '2B-KMUTT ແມ່ນໂຄງການຄ່າຍວິຊາການລະດັບປະເທດຂອງມະຫາວິທະຍາໄລເຕັກໂນໂລຊີພະຈອມເກົ້າທົນບູຣີ (KMUTT) ທີ່ໃຊ້ເວລາຈັດຍາວນານເຖິງ 20 ວັນເຕັມ. ເປົ້າໝາຍບໍ່ແມ່ນການມານັ່ງຟັງບັນຍາຍ ແຕ່ແມ່ນການຈຳລອງຊີວິດ "ນັກສຶກສາມະຫາວິທະຍາໄລແລະນັກວິໄຈເຕັມຮູບແບບ".',
    introP2: 'ຜູ້ເຂົ້າຮ່ວມຈະຖືກກະຈາຍຕົວໄປໃນຫ້ອງປະຕິບັດການຈິງຕາມສາຂາທີ່ຕົນເອງສົນໃຈ ເຊິ່ງກວມເອົາຫຼາຍສາຂາວິຊາ ບໍ່ແມ່ນພຽງແຕ່ສາຍເທັກເທົ່ານັ້ນ ໂດຍມີ 10 ກຸ່ມວິໄຈ ຄື:',
    researchGroups: [
      '1. ພະລັງງານແຫ່ງອະນາຄົດ',
      '2. ວິສະວະກຳຫຸ່ນຍົນແລະລະບົບອັດຕະໂນມັດ',
      '3. ນະວັດຕະກຳອາຫານເພື່ອສຸຂະພາບ',
      '4. ເຕັກໂນໂລຊີຂໍ້ມູນຂ່າວສານແລະການສື່ສານ',
      '5. ມັນຕິມີເດຍແລະການອອກແບບ',
      '6. ຄະນິດສາດແລະຟີຊິກປະຍຸກ',
      '7. ວິທະຍາສາດສິ່ງແວດລ້ອມແລະຊັບພະຍາກອນທຳມະຊາດ',
      '8. ນະວັດຕະກຳວັດສະດຸສາດ',
      '9. ວິສະວະກຳໂຍທາແລະການຈັດການໂລຈິສຕິກ',
      '10. ວິສະວະກຳໄຟຟ້າແລະເອເລັກໂຕຣນິກ'
    ],
    introP3: 'ທຸກຄົນຈະໄດ້ເຮັດວິໄຈແລະສ້າງໂປຣເຈັກນະວັດຕະກຳຮ່ວມກັບຄູອາຈານແລະນັກວິໄຈລະດັບແຖວໜ້າ.',
    journeyLabel: 'The Journey',
    journeyTitle: 'ຊີວິດ 20 ວັນໃນຄ່າຍ: ຂອງຈິງ ບໍ່ມີຄົນປ້ອນຄວາມຮູ້',
    journeyDesc: 'ເຖິງຄ່າຍນີ້ຈະມີ "ພີ່ລ້ຽງ (Mentor)" ແຕ່ບໍ່ແມ່ນການປ້ອນຄວາມຮູ້ໃຫ້ທັງໝົດ ຜູ້ເຂົ້າຮ່ວມຕ້ອງພ້ອມຮຽນຮູ້ດ້ວຍຕົນເອງ ແລະ ປະເຊີນກັບຄວາມກົດດັນລະດັບມະຫາວິທະຍາໄລ.',
    journeySteps: [
      { title: 'The Crucible of Ideas', text: 'ອາທິດທຳອິດຄືຊ່ວງທີ່ໜັກໜ່ວງທີ່ສຸດ ບໍ່ແມ່ນການຟ້າວຂຽນໂຄ້ດ ແຕ່ແມ່ນການຄິດຫາ "ຫົວຂໍ້ວິໄຈ" ຕ້ອງຕອບໃຫ້ໄດ້ວ່າ ສິ່ງທີ່ຈະເຮັດມີຄົນເຮັດຫຼືຍັງ? ສ້າງ Impact ໃຫ້ສັງຄົມແນວໃດ?' },
      { title: 'Execution', text: 'ລົງມືເຮັດ. ນຳທັກສະທີ່ມີ (ເຊັ່ນ Python, AI) ມາປະຍຸກໃຊ້ເພື່ອແກ້ບັນຫາໃຫ້ສຳເລັດແລະໃຊ້ງານໄດ້ຈິງພາຍໃນເວລາທີ່ກຳນົດ.' },
      { title: 'University Life', text: 'ວິຖີຊີວິດນັກສຶກສາ ຕ້ອງບໍລິຫານຈັດການຕົນເອງ 100% ນອນຫໍພັກຕື່ນເອງ ກິນເຂົ້າໂຮງອາຫານ ຖ້າບໍລິຫານເວລາພາດ ຜົນກະທົບຈະຕົກຢູ່ກັບໂປຣເຈັກຂອງຕົນເອງ.' }
    ],
    benefitsLabel: 'Key Benefits',
    benefitsTitle: 'ດີແນວໃດ? ເປັນຫຍັງຈຶ່ງພາດບໍ່ໄດ້?',
    benefits: [
      { title: '1. Fast Track ຜ່ານຮອບ Active Recruitment', text: 'ຜົນປະໂຫຍດທີ່ເປັນຮູບປະທຳ ການຜ່ານຊີວິດ 20 ວັນ ເຮັດໃຫ້ມະຫາວິທະຍາໄລເຫັນສີມື ຜູ້ທີ່ຜ່ານຈະໄດ້ຮັບສິດຍື່ນເຂົ້າສຶກສາຕໍ່ຮອບ Active Recruitment ທັນທີ.' },
      { title: '2. ບົດທົດສອບ "Bangmod DNA"', text: 'ວັດທະນະທຳຂອງ KMUTT ຄືຄວາມເຂັ້ມແຂງເພິ່ງພາຕົນເອງ ການຖືກວິຈານງານຢ່າງຕົງໄປຕົງມາ ຈະຊ່ວຍໃຫ້ທ່ານເຕີບໂຕຂຶ້ນຢ່າງກ້າວກະໂດດ.' },
      { title: '3. ຍົກລະດັບ Mindset ສູ່ "ນັກແກ້ບັນຫາ"', text: 'ປ່ຽນວິທີຄິດຈາກ "ຄົນຂຽນໂປຣແກຣມເປັນ" ສູ່ "ນັກພັດທະນານະວັດຕະກຳ" ເຕັກໂນໂລຊີຈະບໍ່ມີປະໂຫຍດຖ້າບໍ່ໄດ້ແກ້ບັນຫາທີ່ມີຢູ່ຈິງ.' },
      { title: '4. Connection ຄຸນນະພາບສູງ', text: 'ສັງຄົມໃນ 2B-KMUTT ຄືແຫຼ່ງລວມຄົນເກັ່ງ ການຜ່ານຄວາມກົດດັນນຳກັນ 20 ວັນ ສ້າງສາຍສຳພັນທີ່ເລິກເຊິ່ງ ແລະເປັນເຄືອຂ່າຍທີ່ພ້ອມຊ່ວຍເຫຼືອກັນໃນອະນາຄົດ.' }
    ],
    comparisonLabel: 'The Difference',
    comparisonTitle: 'ຕ່າງຈາກຄ່າຍອື່ນແນວໃດ?',
    campNormal: {
      title: 'ຄ່າຍຕິວທົ່ວໄປ',
      items: [
        'ໄປນັ່ງຟັງບັນຍາຍໃນຫ້ອງປະຊຸມໃຫຍ່',
        'ເຮັດກິດຈະກຳກຸ່ມເປັນຫຼັກ',
        'ສຳຜັດຂອງຈິງໄດ້ພຽງຜິວເຜີນ',
        'ໄລຍະເວລາສັ້ນພຽງ 2-3 ວັນ'
      ]
    },
    camp2B: {
      title: '2B-KMUTT',
      items: [
        'ລົງມືເຮັດງານວິໄຈຈິງ ໃນຫ້ອງແລັບລະດັບປະເທດ',
        'ມີທີ່ປຶກສາ (Mentor) ເບິ່ງແຍງແບບ 1 ຕໍ່ 1',
        'ໃຊ້ເຄື່ອງມືວິສະວະກຳຈິງ ທີ່ປົກກະຕິສະຫງວນໄວ້ໃຫ້ ປ.ໂທ/ເອກ',
        'ໃຊ້ຊີວິດໃນມະຫາວິທະຍາໄລ ຍາວນານເຖິງ 20 ວັນເຕັມ'
      ]
    },
    fitLabel: 'Fit Check',
    fitTitle: '"ທ່ານແມ່ນຄົນນັ້ນຫຼືບໍ່?"',
    fitYes: {
      title: 'ຄົນທີ່ແມ່ນ',
      items: [
        'ມັກທົດລອງ ຕັ້ງຄຳຖາມ ແລະ ຫາຄຳຕອບດ້ວຍຕົນເອງ',
        'ບໍ່ຢ້ານຄວາມທ້າທາຍ ແລະ ພ້ອມຮຽນຮູ້ສິ່ງໃໝ່ທີ່ຍາກໆ',
        'ສາມາດຢູ່ຮ່ວມກັບຄົນອື່ນແລະເຮັດວຽກເປັນທີມໄດ້',
        'ຕື່ນເຕັ້ນເມື່ອເຫັນເຕັກໂນໂລຊີໃໝ່ໆ ຫຼື ຫ້ອງແລັບລ້ຳໆ'
      ]
    },
    fitNo: {
      title: 'ຄົນທີ່ບໍ່ແມ່ນ',
      items: [
        'ຢາກມາຫາໝູ່ຫຼິ້ນມ່ວນໆ ແບບຄ່າຍນັນທະນາການ',
        'ລໍຖ້າໃຫ້ຄົນອື່ນປ້ອນຂໍ້ມູນໃຫ້ ບໍ່ມັກຄົ້ນຄວ້າເອງ',
        'ຍອມແພ້ງ່າຍເວລາທີ່ໂຄ້ດພັງ ຫຼື ການທົດລອງລົ້ມເຫຼວ'
      ]
    },
    ctaText1: '2B-KMUTT ບໍ່ແມ່ນພຽງແຕ່ຄ່າຍ',
    ctaText2: 'ແຕ່ມັນຄືບົດພິສູດຊິ້ນທຳອິດ',
    ctaButton: 'ເບິ່ງຂໍ້ມູນຄ່າຍລຸ້ນທີ 20 →',
    ctaDisclaimer: '*ໝາຍເຫດ: ຂໍ້ມູນຕົວຢ່າງສຳລັບ 2B-KMUTT ລຸ້ນທີ 20 ເທົ່ານັ້ນ'
  },
  zh: {
    heroTitle: '用20天时间将学生转变为 ',
    heroHighlight: '→ 研究人员',
    heroSubtitle: '2B-KMUTT 未来领袖营 (第20届) — 梦想进入国王科技大学的人不可错过的夏令营',
    scrollDown: '向下滚动',
    introLabel: '什么是 2B-KMUTT?',
    introP1: '2B-KMUTT 是国王科技大学 (KMUTT) 主办的国家级学术营，为期整整20天。这个营地的目标不是坐在教室里听讲，而是为高中生全面模拟“大学生和研究人员的生活”。',
    introP2: '参与者将根据自己的兴趣被分配到真实的实验室中，这涵盖了各种领域，不仅仅是科技。共有10个研究组：',
    researchGroups: [
      '1. 未来能源',
      '2. 机器人与自动化工程',
      '3. 健康食品创新',
      '4. 信息与通信技术',
      '5. 多媒体与设计',
      '6. 应用数学与物理',
      '7. 环境科学与自然资源',
      '8. 材料科学创新',
      '9. 土木工程与物流管理',
      '10. 电气与电子工程'
    ],
    introP3: '每个人都将与全国顶尖的教授和研究人员一起进行研究并创建创新项目。',
    journeyLabel: '旅程',
    journeyTitle: '营地里的20天：真实的体验，没有保姆式的教学',
    journeyDesc: '虽然营地有“导师”提供密切的建议，但这绝不是填鸭式的教学。参与者必须准备好自主学习、动手实践，并面对大学级别的压力。',
    journeySteps: [
      { title: '思想的熔炉', text: '第一周是最艰难的。这不是关于急于写代码，而是为了寻找“研究课题”而绞尽脑汁。你必须进行文献综述以回答：我们要做的东西有人做过吗？它如何对社会产生影响？' },
      { title: '执行', text: '动手实践。应用你现有的技能（如Python编程，AI模型）在严格的时间限制内解决问题并使其发挥作用。' },
      { title: '大学生活', text: '大学生生活方式。你必须100%管理自己：住在大学宿舍，自己起床，在食堂吃饭，自己去实验室。如果你时间管理不善，直接的影响会落在你自己的项目上。' }
    ],
    benefitsLabel: '核心优势',
    benefitsTitle: '好在哪里？为什么你不能错过？',
    benefits: [
      { title: '1. 快速通道：通过主动招生', text: '这是最切实的利益。经过这20天，大学能看到你的技能、纪律和心态。通过这个营地并拥有达标研究成果的人，将立即获得通过主动招生(Active Recruitment)进入大学的特权。' },
      { title: '2. "Bangmod DNA" 测试', text: '国王科技大学的文化是坚韧和自力更生。面对全国顶尖教授直言不讳的批评，将帮助你打破内心的自我，实现指数级增长。' },
      { title: '3. 将思维提升为“问题解决者”', text: '将思维方式从仅仅“会写代码”转变为“创新开发者”。如果技术不能解决实际痛点，它就毫无用处。这种思维在黑客马拉松中非常强大。' },
      { title: '4. 高质量的人脉', text: '2B-KMUTT 是精英的聚集地。共同度过20天的压力建立了深厚的联系。营地结束后，这些朋友将成为准备互相帮助的青年才俊网络。' }
    ],
    comparisonLabel: '差异',
    comparisonTitle: '与其他夏令营有何不同？',
    campNormal: {
      title: '普通辅导营',
      items: [
        '坐在大会议室里听讲座',
        '主要进行破冰的小组活动',
        '只能体验到表面的东西',
        '持续时间短，仅2-3天'
      ]
    },
    camp2B: {
      title: '2B-KMUTT',
      items: [
        '在国家级实验室进行真正的研究',
        '有导师进行1对1的指导',
        '使用通常为硕士/博士保留的真实工程工具',
        '在大学里完整生活20天'
      ]
    },
    fitLabel: '匹配度检查',
    fitTitle: '这个夏令营..."适合你吗？"',
    fitYes: {
      title: '合适的人',
      items: [
        '喜欢实验、提问，并自己寻找答案',
        '不怕挑战，准备学习困难的新事物',
        '能与他人共处，具有团队合作精神',
        '看到酷炫的技术或先进的实验室会热血沸腾'
      ]
    },
    fitNo: {
      title: '不合适的人',
      items: [
        '只是想参加娱乐营结交朋友',
        '等着别人喂信息，不喜欢自己研究',
        '当代码崩溃或实验失败时容易放弃'
      ]
    },
    ctaText1: '2B-KMUTT 不仅仅是一个夏令营',
    ctaText2: '它是你能力的第一个证明',
    ctaButton: '查看第20届详情 →',
    ctaDisclaimer: '*注：此为2B-KMUTT第20届的示例信息'
  }
};
