import { tmpdir } from "node:os";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

// Path to SQLite database file
const DB_PATH =
  process.env.SQLITE_DB_PATH ||
  path.join(process.env.NETLIFY ? tmpdir() : process.cwd(), "chatbot.sqlite");

let _db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!_db) {
    _db = new DatabaseSync(DB_PATH);
    initTables(_db);
  }
  return _db;
}

export type KnowledgeItem = {
  id: number;
  topic: string;
  keywords: string; // JSON array of string
  response: string;
  followUps: string; // JSON array of string
  updatedAt: string;
};

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  linkUrl?: string;
};

export type ChatLogItem = {
  id: number;
  userQuestion: string;
  botAnswer: string;
  matchedTopic?: string;
  createdAt: string;
};

export type FacultyItem = {
  id: number;
  name: string;
  rank: string;
  position: string;
  degree: string;
  specialty: string; // JSON array of string
  email: string;
  image: string;
  portfolio: string;
  scholar: string;
  gender: string; // 'female' | 'male' | 'other'
  sortOrder: number;
};

function initTables(db: DatabaseSync) {
  // 1. Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'admin',
      createdAt TEXT NOT NULL
    )
  `);

  // 2. AI Knowledge Base table
  db.exec(`
    CREATE TABLE IF NOT EXISTS knowledge_base (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic TEXT NOT NULL,
      keywords TEXT NOT NULL,
      response TEXT NOT NULL,
      followUps TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  // 3. News & Announcements table
  db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'ทั่วไป',
      date TEXT NOT NULL,
      author TEXT NOT NULL DEFAULT 'Admin IT',
      linkUrl TEXT
    )
  `);

  // 4. Chat Logs table
  db.exec(`
    CREATE TABLE IF NOT EXISTS chat_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userQuestion TEXT NOT NULL,
      botAnswer TEXT NOT NULL,
      matchedTopic TEXT,
      createdAt TEXT NOT NULL
    )
  `);

  // 5. Faculty table
  db.exec(`
    CREATE TABLE IF NOT EXISTS faculty (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      rank TEXT NOT NULL,
      position TEXT NOT NULL DEFAULT 'อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ',
      degree TEXT NOT NULL DEFAULT '',
      specialty TEXT NOT NULL DEFAULT '[]',
      email TEXT NOT NULL,
      image TEXT NOT NULL DEFAULT '',
      portfolio TEXT NOT NULL DEFAULT '',
      scholar TEXT NOT NULL DEFAULT '',
      gender TEXT NOT NULL DEFAULT 'male',
      sortOrder INTEGER NOT NULL DEFAULT 0
    )
  `);

  // Seed default knowledge base if empty
  const countKnowledge = db
    .prepare("SELECT count(*) as count FROM knowledge_base")
    .get() as { count: number };
  if (!countKnowledge || countKnowledge.count === 0) {
    seedInitialKnowledge(db);
  }

  // Seed sample news if empty
  const countNews = db.prepare("SELECT count(*) as count FROM news").get() as {
    count: number;
  };
  if (!countNews || countNews.count === 0) {
    seedInitialNews(db);
  }

  // Seed faculty if empty
  const countFaculty = db
    .prepare("SELECT count(*) as count FROM faculty")
    .get() as { count: number };
  if (!countFaculty || countFaculty.count === 0) {
    seedInitialFaculty(db);
  }

  // 6. Site settings (festival theme, etc.)
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  const festivalTheme = db
    .prepare("SELECT value FROM site_settings WHERE key = ?")
    .get("festivalTheme") as { value: string } | undefined;
  if (!festivalTheme) {
    db.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?)").run(
      "festivalTheme",
      "none"
    );
  }
}

function seedInitialKnowledge(db: DatabaseSync) {
  const defaultTopics = [
    {
      followUps: [
        "โครงสร้างหลักสูตร (126 นก.)",
        "อาจารย์ผู้สอนมีใครบ้าง?",
        "จบแล้วทำงานอะไรได้บ้าง?",
      ],
      keywords: ["ปรัชญา", "วิสัยทัศน์", "เป้าหมาย", "จุดเด่น"],
      response: `ปรัชญาของสาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช:\n\n✨ "ก้าวทันเทคโนโลยีสมัยใหม่ ต่อยอดความรู้ เพื่อการใช้ประโยชน์ และตอบโจทย์การพัฒนาท้องถิ่น"\n\nหลักสูตรมุ่งเน้นสร้างบัณฑิตที่มีทักษะปฏิบัติจริงในสายงานไอที พร้อมรับมือกับการเปลี่ยนแปลงทางเทคโนโลยี และสามารถนำความรู้ไปพัฒนาท้องถิ่นและขับเคลื่อนองค์กรได้อย่างยั่งยืนครับ`,
      topic: "ปรัชญาและวิสัยทัศน์สาขาวิชา",
    },
    {
      followUps: ["ค่าเทอมเท่าไหร่?", "คุณสมบัติการรับสมัคร", "คณาจารย์ผู้สอน"],
      keywords: [
        "หลักสูตร",
        "เรียนอะไร",
        "โครงสร้าง",
        "หน่วยกิต",
        "กี่ปี",
        "วุฒิ",
        "curriculum",
        "มคอ",
        "มคอ.2",
      ],
      response:
        "ข้อมูลหลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ (วท.บ. 4 ปี) มรภ.นครศรีธรรมราช:\n\n• วุฒิการศึกษา: วิทยาศาสตรบัณฑิต (เทคโนโลยีสารสนเทศ) / Bachelor of Science Program in Information Technology\n• จำนวนหน่วยกิต: หน่วยกิตรวมตลอดหลักสูตรไม่น้อยกว่า 126 หน่วยกิต\n• การปรับปรุงหลักสูตร: พ.ศ. 2560, 2565 และ พ.ศ. 2569 (มคอ.2)\n\nโครงสร้างหลักสูตร 126 หน่วยกิต:\n1. หมวดวิชาศึกษาทั่วไป: 30 หน่วยกิต\n2. หมวดวิชาเฉพาะด้าน IT: 90 หน่วยกิต (วิชาบังคับพื้นฐาน, วิชาเลือกเฉพาะทาง, สหกิจศึกษา/ฝึกประสบการณ์วิชาชีพ)\n3. หมวดวิชาเลือกเสรี: 6 หน่วยกิต\n\nจัดการเรียนการสอนแบบมุ่งเน้นผลลัพธ์ (Outcome-Based Education: OBE) เน้นปฏิบัติจริงในห้องแล็บที่ทันสมัยครับ",
      topic: "โครงสร้างหลักสูตร 126 หน่วยกิต",
    },
    {
      followUps: ["คุณสมบัติการรับสมัคร", "อาจารย์ผู้สอนมีใครบ้าง?", "สมัครเรียนได้อย่างไร?"],
      keywords: [
        "ค่าเทอม",
        "ค่าใช้จ่าย",
        "ค่าธรรมเนียม",
        "ราคา",
        "กี่บาท",
        "กู้",
        "กยศ",
        "กรอ",
        "ทุน",
      ],
      response:
        "ประมาณการค่าใช้จ่าย สาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช:\n\n💰 ค่าธรรมเนียมการศึกษา (ภาคปกติ): 13,000 บาท ต่อภาคการศึกษา (เหมาจ่าย)\nครอบคลุมค่าบำรุงการศึกษา, การใช้ห้องปฏิบัติการคอมพิวเตอร์, ระบบเครือข่ายอินเทอร์เน็ต และซอฟต์แวร์ลิขสิทธิ์ทั้งหมด\n\n✨ สิทธิประโยชน์ & ทุนการศึกษา:\n• สามารถยื่นกู้ยืมกองทุนเงินให้กู้ยืมเพื่อการศึกษา (กยศ. / กรอ.) ได้ 100% เต็มจำนวน\n• มีทุนการศึกษาจากมหาวิทยาลัยและคณะวิทยาศาสตร์และเทคโนโลยีสำหรับนักศึกษาเรียนดีและขาดแคลนทุนทรัพย์",
      topic: "ค่าธรรมเนียมและทุนการศึกษา",
    },
    {
      followUps: ["ค่าเทอมเท่าไหร่?", "คณาจารย์ผู้สอนมีใครบ้าง?", "จบไปทำงานอะไร?"],
      keywords: [
        "สมัคร",
        "รับสมัคร",
        "เกณฑ์",
        "คุณสมบัติ",
        "ม.6",
        "ปวช",
        "กศน",
        "เข้าศึกษา",
        "tcas",
        "โควตา",
        "คณิต",
      ],
      response:
        "คุณสมบัติของผู้เข้าศึกษาต่อ สาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช:\n\n🎓 คุณสมบัติผู้สมัคร:\n• สำเร็จการศึกษาระดับมัธยมศึกษาตอนปลาย (ม.6) เรียนกลุ่มสาระการเรียนรู้คณิตศาสตร์ไม่น้อยกว่า 6 หน่วยกิต\n• หรือสำเร็จการศึกษาระดับประกาศนียบัตรวิชาชีพ (ปวช.) / กศน. / เทียบเท่า\n\n💡 มีโครงการเตรียมความพร้อมและปรับพื้นฐานการเขียนโปรแกรมฟรีสำหรับน้องๆ ปี 1 ก่อนเปิดเทอม!\n\n📝 สมัครเรียนออนไลน์: https://admis.nstru.ac.th\n🌐 เว็บไซต์คณะวิทยาศาสตร์ฯ: https://sct.nstru.ac.th",
      topic: "เกณฑ์คุณสมบัติและการรับสมัคร",
    },
    {
      followUps: ["หลักสูตร 126 หน่วยกิต", "ค่าเทอมเท่าไหร่?", "ติดต่ออาจารย์ได้ที่ไหน?"],
      keywords: [
        "อาจารย์",
        "ผู้สอน",
        "บุคลากร",
        "คณาจารย์",
        "ดร.",
        "ผศ",
        "ไพโรจน์",
        "วิชิต",
        "สมพร",
        "แสงจันทร์",
        "ปฐมพงษ์",
        "สุนิษา",
        "โสภี",
        "นนทพันธ์",
      ],
      response:
        "คณาจารย์ประจำสาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช:\n\n1. ผศ.ไพโรจน์ เสนา - ประธานสาขาวิชา (IoT & Data Analytics)\n2. ผศ.ดร.วิชิต สุขทร - ระบบสารสนเทศและเน็ตเวิร์ก\n3. ผศ.ดร.สมพร เรืองอ่อน - พัฒนาระบบสารสนเทศและฐานข้อมูล\n4. อ.ดร.แสงจันทร์ สุขสีทอง - นวัตกรรมดิจิทัลและการเรียนรู้\n5. อ.ปฐมพงษ์ คงเมือง - การพัฒนาเว็บและโมบายแอปพลิเคชัน\n6. อ.สุนิษา โสภี - มัลติมีเดียและประสบการณ์ผู้ใช้ (UX/UI)\n7. อ.นนทพันธ์ ทวีโชติรัศมิ์ - การจัดการข้อมูลและการเขียนโปรแกรม",
      topic: "คณาจารย์ประจำสาขาวิชา",
    },
    {
      followUps: ["หลักสูตรเรียนอะไรบ้าง?", "มีฝึกงานไหม?", "ค่าเทอมเท่าไหร่?"],
      keywords: [
        "อาชีพ",
        "ทำงาน",
        "จบแล้ว",
        "สายงาน",
        "เงินเดือน",
        "ตำแหน่ง",
        "ตกงานไหม",
        "ตลาดงาน",
      ],
      response:
        "เส้นทางอาชีพสำหรับบัณฑิตสาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช:\n\n💻 นักพัฒนาซอฟต์แวร์และแอปพลิเคชัน (Full-Stack / Mobile Developer)\n🌐 ผู้ดูแลและบริหารระบบเครือข่ายและความปลอดภัย (Network & System Admin)\n📊 นักวิเคราะห์ข้อมูลและธุรกิจ (Data Analyst / Business Analyst)\n🎨 นักออกแบบและพัฒนาประสบการณ์ผู้ใช้ (UX/UI Designer & Front-End)\n☁️ ผู้เชี่ยวชาญระบบคลาวด์และ DevOps (Cloud Specialist)\n💼 เจ้าหน้าที่เทคโนโลยีสารสนเทศในหน่วยงานรัฐและเอกชน",
      topic: "เส้นทางอาชีพและโอกาสงาน",
    },
    {
      followUps: [
        "คุณสมบัติการรับสมัคร",
        "จบแล้วทำงานอะไรได้บ้าง?",
        "ติดต่อสอบถามเพิ่มเติม",
      ],
      keywords: ["ฝึกงาน", "สหกิจ", "บริษัท", "ฝึกประสบการณ์", "ทำงานจริง", "กี่เดือน"],
      response:
        "การฝึกประสบการณ์วิชาชีพและสหกิจศึกษา สาขา IT มรภ.นครศรีธรรมราช:\n\n🏢 1. การฝึกประสบการณ์วิชาชีพ: ฝึกงานในสถานประกอบการจริงทั้งในจังหวัดและต่างจังหวัด ไม่น้อยกว่า 400 ชั่วโมง\n🚀 2. โครงการสหกิจศึกษา (Cooperative Education): ปฏิบัติงานจริงเต็มเวลา 1 ภาคเรียน (4 เดือน) ในบริษัทเทคโนโลยีชั้นนำ เพื่อเตรียมความพร้อมสู่การทำงานจริงทันทีหลังเรียนจบ",
      topic: "การฝึกงานและสหกิจศึกษา",
    },
    {
      followUps: ["ข้อมูลการรับสมัคร", "คณาจารย์ผู้สอน", "หลักสูตร 126 หน่วยกิต"],
      keywords: [
        "ติดต่อ",
        "เบอร์",
        "โทร",
        "เพจ",
        "facebook",
        "ที่อยู่",
        "แผนที่",
        "ตึก",
        "อาคาร",
        "ห้องพัก",
      ],
      response:
        "ช่องทางการติดต่อสาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช:\n\n📍 สถานที่: สาขาวิชาเทคโนโลยีสารสนเทศ คณะวิทยาศาสตร์และเทคโนโลยี อาคาร 30 มหาวิทยาลัยราชภัฏนครศรีธรรมราช ต.ท่างิ้ว อ.เมือง จ.นครศรีธรรมราช 80280\n📞 โทรศัพท์: 075-809880\n🌐 Facebook Page: https://www.facebook.com/ITNSTRU\n✉️ Email: itnstru@nstru.ac.th",
      topic: "ช่องทางการติดต่อสาขาวิชา",
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO knowledge_base (topic, keywords, response, followUps, updatedAt)
    VALUES (?, ?, ?, ?, ?)
  `);

  const now = new Date().toISOString();
  for (const item of defaultTopics) {
    stmt.run(
      item.topic,
      JSON.stringify(item.keywords),
      item.response,
      JSON.stringify(item.followUps),
      now
    );
  }
}

function seedInitialNews(db: DatabaseSync) {
  const defaultNews = [
    {
      author: "Admin IT",
      category: "รับสมัคร",
      content:
        "สาขาวิชาเทคโนโลยีสารสนเทศ คณะวิทยาศาสตร์และเทคโนโลยี มรภ.นครศรีธรรมราช เปิดรับสมัครนักศึกษาใหม่ประจำปีการศึกษา สมัครออนไลน์ได้แล้ววันนี้",
      date: "2026-10-28",
      linkUrl: "https://admis.nstru.ac.th",
      title: "เปิดรับสมัครนักศึกษาใหม่ สาขาวิชาเทคโนโลยีสารสนเทศ รอบโควตาและ TCAS",
    },
    {
      author: "Admin IT",
      category: "กิจกรรม",
      content:
        "จัดกิจกรรมพัฒนาทักษะการประยุกต์ใช้ AI ในการทำงานจริง ณ ห้องปฏิบัติการคอมพิวเตอร์ อาคาร 30 มรภ.นครศรีธรรมราช",
      date: "2026-10-25",
      linkUrl: "https://www.facebook.com/ITNSTRU",
      title:
        "โครงการอบรมเพิ่มทักษะ Artificial Intelligence และ Data Analytics สำหรับนักศึกษา",
    },
    {
      author: "Admin IT",
      category: "ผลงาน",
      content:
        "ขอแสดงความยินดีกับตัวแทนนักศึกษาสาขา IT คว้ารางวัลจากการนำเสนอโครงงานนวัตกรรมแอปพลิเคชันเพื่อชุมชนท้องถิ่น",
      date: "2026-10-20",
      linkUrl: "https://www.facebook.com/ITNSTRU",
      title: "ยินดีกับนักศึกษา IT NSTRU ได้รับรางวัลการประกวดนวัตกรรมดิจิทัลระดับอุดมศึกษา",
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO news (title, content, category, date, author, linkUrl)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const n of defaultNews) {
    stmt.run(n.title, n.content, n.category, n.date, n.author, n.linkUrl);
  }
}

function seedInitialFaculty(db: DatabaseSync) {
  const defaultFaculty = [
    {
      degree: "ปร.ด. (เทคโนโลยีสารสนเทศ)",
      email: "sunisa_kid@nstru.ac.th",
      gender: "female",
      image: "https://sct.nstru.ac.th/storage/picturelooking/p63.jpg",
      name: "ผศ.ดร.สุนิษา คิดใจเดียว",
      portfolio:
        "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/2529",
      position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
      rank: "ผู้ช่วยศาสตราจารย์ ดร.",
      scholar: "https://scholar.google.com/citations?hl=th&user=2T1uC10AAAAJ",
      sortOrder: 0,
      specialty: JSON.stringify([
        "การสร้างสื่อมัลติมีเดีย",
        "ระบบสารสนเทศ",
        "การวิเคราะห์ข้อมูล",
      ]),
    },
    {
      degree: "ปร.ด. (เทคโนโลยีสารสนเทศ)",
      email: "sopee_kae@nstru.ac.th",
      gender: "female",
      image: "https://sct.nstru.ac.th/storage/picturelooking/p68.jpg",
      name: "ผศ.ดร.โสภี แก้วชะฎา",
      portfolio:
        "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/2625",
      position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
      rank: "ผู้ช่วยศาสตราจารย์ ดร.",
      scholar: "https://scholar.google.com/citations?hl=th&user=g23W0GAAAAAJ",
      sortOrder: 1,
      specialty: JSON.stringify([
        "การเขียนโปรแกรม",
        "ระบบสารสนเทศ",
        "การวิเคราะห์ข้อมูล",
        "ระบบฐานข้อมูล",
      ]),
    },
    {
      degree: "วท.ม. (เทคโนโลยีสารสนเทศ)",
      email: "sangjun_rua@nstru.ac.th",
      gender: "female",
      image: "https://sct.nstru.ac.th/storage/picturelooking/p27.jpg",
      name: "ผศ.แสงจันทร์ เรืองอ่อน",
      portfolio:
        "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/693",
      position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
      rank: "ผู้ช่วยศาสตราจารย์",
      scholar: "https://scholar.google.com/citations?user=RVmF4q4AAAAJ&hl=th",
      sortOrder: 2,
      specialty: JSON.stringify([
        "การพัฒนาเว็บแอปพลิเคชัน",
        "การวิเคราะห์และออกแบบระบบ",
        "เทคโนโลยีสารสนเทศ",
      ]),
    },
    {
      degree: "วท.ม. (เทคโนโลยีสารสนเทศ)",
      email: "pairot_sen@nstru.ac.th",
      gender: "male",
      image: "https://sct.nstru.ac.th/storage/picturelooking/p11.jpg",
      name: "ผศ.ไพโรจน์ เสนา",
      portfolio:
        "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/2134",
      position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
      rank: "ผู้ช่วยศาสตราจารย์",
      scholar: "https://scholar.google.com/citations?user=Q7WbPncAAAAJ&hl=th",
      sortOrder: 3,
      specialty: JSON.stringify([
        "เทคโนโลยีสารสนเทศและการสื่อสาร",
        "อินเทอร์เน็ตของสรรพสิ่ง (IoT)",
        "การวิเคราะห์ข้อมูล",
      ]),
    },
    {
      degree: "ปร.ด. (วิทยาการคอมพิวเตอร์และสารสนเทศ)",
      email: "wichit_soo@nstru.ac.th",
      gender: "male",
      image: "https://sct.nstru.ac.th/storage/picturelooking/p16.jpg",
      name: "ผศ.ดร.วิชิต สุขทร",
      portfolio:
        "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/671",
      position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
      rank: "ผู้ช่วยศาสตราจารย์ ดร.",
      scholar: "https://scholar.google.com/citations?user=PoU1vMIAAAAJ&hl=en",
      sortOrder: 4,
      specialty: JSON.stringify([
        "ระบบสารสนเทศ",
        "เทคโนโลยีสารสนเทศ",
        "ระบบเครือข่ายคอมพิวเตอร์",
      ]),
    },
    {
      degree: "ปร.ด. (เทคโนโลยีสารสนเทศ)",
      email: "somporn_rua@nstru.ac.th",
      gender: "male",
      image: "https://sct.nstru.ac.th/storage/picturelooking/p20.jpg",
      name: "ผศ.ดร.สมพร เรืองอ่อน",
      portfolio:
        "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/683",
      position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
      rank: "ผู้ช่วยศาสตราจารย์ ดร.",
      scholar: "https://scholar.google.com/citations?user=g68mFkgAAAAJ&hl=en",
      sortOrder: 5,
      specialty: JSON.stringify([
        "การพัฒนาระบบสารสนเทศ",
        "การบริหารจัดการข้อมูล",
        "การพัฒนาแผนยุทธศาสตร์",
        "การประกันคุณภาพการศึกษา",
      ]),
    },
    {
      degree: "ปร.ด. (เทคโนโลยีสารสนเทศ)",
      email: "patompong_cha@nstru.ac.th",
      gender: "male",
      image: "https://sct.nstru.ac.th/storage/picturelooking/p48.jpg",
      name: "ดร.ปฐมพงษ์ ฉับพลัน",
      portfolio:
        "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/2318",
      position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
      rank: "อาจารย์ ดร.",
      scholar: "https://scholar.google.com/citations?hl=th&user=L42LE20AAAAJ",
      sortOrder: 6,
      specialty: JSON.stringify([
        "เทคโนโลยีสารสนเทศ",
        "ระบบสารสนเทศทางภูมิศาสตร์ (GIS)",
        "การวิเคราะห์เชิงพื้นที่",
      ]),
    },
    {
      degree: "วท.บ. (เทคโนโลยีสารสนเทศ)",
      email: "nantapol_wut@nstru.ac.th",
      gender: "male",
      image: "https://sct.nstru.ac.th/storage/picturelooking/p104.jpg",
      name: "นายนนทพันธ์ วุฒิมานพ",
      portfolio: "",
      position: "เจ้าหน้าที่ประจำสาขาวิชาเทคโนโลยีสารสนเทศ",
      rank: "บุคลากรสายสนับสนุน",
      scholar: "",
      sortOrder: 7,
      specialty: JSON.stringify([
        "งานสนับสนุนห้องปฏิบัติการ",
        "ระบบเครือข่ายและบริการคอมพิวเตอร์",
      ]),
    },
  ];

  const stmt = db.prepare(`
    INSERT INTO faculty (name, rank, position, degree, specialty, email, image, portfolio, scholar, gender, sortOrder)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const f of defaultFaculty) {
    stmt.run(
      f.name,
      f.rank,
      f.position,
      f.degree,
      f.specialty,
      f.email,
      f.image,
      f.portfolio,
      f.scholar,
      f.gender,
      f.sortOrder
    );
  }
}

// --------------------------------------------------------------------------
// Knowledge CRUD Functions
// --------------------------------------------------------------------------
export function getAllKnowledge(): KnowledgeItem[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM knowledge_base ORDER BY id DESC")
    .all() as unknown as KnowledgeItem[];
}

export function getKnowledgeById(id: number): KnowledgeItem | undefined {
  const db = getDb();
  return db
    .prepare("SELECT * FROM knowledge_base WHERE id = ?")
    .get(id) as unknown as KnowledgeItem;
}

export function createKnowledge(
  topic: string,
  keywords: string[],
  response: string,
  followUps: string[]
): KnowledgeItem {
  const db = getDb();
  const now = new Date().toISOString();
  const result = db
    .prepare(`
    INSERT INTO knowledge_base (topic, keywords, response, followUps, updatedAt)
    VALUES (?, ?, ?, ?, ?)
  `)
    .run(
      topic,
      JSON.stringify(keywords),
      response,
      JSON.stringify(followUps),
      now
    );

  const knowledge = getKnowledgeById(Number(result.lastInsertRowid));
  if (!knowledge) {
    throw new Error("Failed to create knowledge item");
  }
  return knowledge;
}

export function updateKnowledge(
  id: number,
  topic: string,
  keywords: string[],
  response: string,
  followUps: string[]
): boolean {
  const db = getDb();
  const now = new Date().toISOString();
  const result = db
    .prepare(`
    UPDATE knowledge_base
    SET topic = ?, keywords = ?, response = ?, followUps = ?, updatedAt = ?
    WHERE id = ?
  `)
    .run(
      topic,
      JSON.stringify(keywords),
      response,
      JSON.stringify(followUps),
      now,
      id
    );

  return Number(result.changes) > 0;
}

export function deleteKnowledge(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM knowledge_base WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}

// --------------------------------------------------------------------------
// News CRUD Functions
// --------------------------------------------------------------------------
export function getAllNews(): NewsItem[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM news ORDER BY id DESC")
    .all() as unknown as NewsItem[];
}

export function createNews(
  title: string,
  content: string,
  category: string,
  linkUrl?: string
): NewsItem {
  const db = getDb();
  const [date] = new Date().toISOString().split("T");
  const result = db
    .prepare(`
    INSERT INTO news (title, content, category, date, author, linkUrl)
    VALUES (?, ?, ?, ?, ?, ?)
  `)
    .run(title, content, category, date, "Admin IT", linkUrl || "");

  return db
    .prepare("SELECT * FROM news WHERE id = ?")
    .get(Number(result.lastInsertRowid)) as unknown as NewsItem;
}

export function deleteNews(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM news WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}

// --------------------------------------------------------------------------
// Chat Logs & Smart Search in SQLite
// --------------------------------------------------------------------------
export function getChatLogs(limit = 50): ChatLogItem[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM chat_logs ORDER BY id DESC LIMIT ?")
    .all(limit) as unknown as ChatLogItem[];
}

export function logChatMessage(
  userQuestion: string,
  botAnswer: string,
  matchedTopic?: string
) {
  const db = getDb();
  db.prepare(`
    INSERT INTO chat_logs (userQuestion, botAnswer, matchedTopic, createdAt)
    VALUES (?, ?, ?, ?)
  `).run(userQuestion, botAnswer, matchedTopic || "", new Date().toISOString());
}

export function searchSmartReply(query: string): {
  reply: string;
  suggestions: string[];
  topicName?: string;
} {
  const _db = getDb();
  const normalizedQuery = query.toLowerCase().trim();
  const items = getAllKnowledge();

  let bestMatch: KnowledgeItem | null = null;
  let maxScore = 0;

  for (const item of items) {
    let score = 0;
    let keywords: string[] = [];
    try {
      keywords = JSON.parse(item.keywords);
    } catch {
      keywords = item.keywords.split(",").map((k) => k.trim());
    }

    for (const kw of keywords) {
      const lowerKw = kw.toLowerCase().trim();
      if (lowerKw && normalizedQuery.includes(lowerKw)) {
        score += lowerKw.length;
      }
    }

    if (item.topic && normalizedQuery.includes(item.topic.toLowerCase())) {
      score += 15;
    }

    if (score > maxScore) {
      maxScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && maxScore > 0) {
    let followUps: string[] = [];
    try {
      followUps = JSON.parse(bestMatch.followUps);
    } catch {
      followUps = [];
    }

    // Log this query
    logChatMessage(query, bestMatch.response, bestMatch.topic);

    return {
      reply: bestMatch.response,
      suggestions:
        followUps.length > 0
          ? followUps
          : ["หลักสูตรกี่หน่วยกิต?", "ค่าเทอมเท่าไหร่?", "สมัครเรียนอย่างไร?"],
      topicName: bestMatch.topic,
    };
  }

  // Fallback response if no match
  const fallback =
    "ขอบคุณที่สอบถามครับ! สำหรับคำถามนี้ คุณสามารถติดต่อสอบถามโดยตรงกับทางสาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช ได้ทาง:\n\n• เพจเฟซบุ๊ก: https://www.facebook.com/ITNSTRU\n• เบอร์โทรศัพท์: 075-809880\n• หรือเลือกดูหัวข้อข้อมูลแนะนำด้านล่างนี้ได้เลยครับ 👇";

  logChatMessage(query, fallback, "ไม่ตรงหัวข้อ");

  return {
    reply: fallback,
    suggestions: [
      "หลักสูตรกี่หน่วยกิต?",
      "ค่าเทอมเท่าไหร่?",
      "สมัครเรียนอย่างไร?",
      "คณาจารย์ผู้สอน",
    ],
    topicName: undefined,
  };
}

// --------------------------------------------------------------------------
// Faculty CRUD Functions
// --------------------------------------------------------------------------
export function getAllFaculty(): FacultyItem[] {
  const db = getDb();
  return db
    .prepare("SELECT * FROM faculty ORDER BY sortOrder ASC, id ASC")
    .all() as unknown as FacultyItem[];
}

export function getFacultyById(id: number): FacultyItem | undefined {
  const db = getDb();
  return db
    .prepare("SELECT * FROM faculty WHERE id = ?")
    .get(id) as unknown as FacultyItem;
}

export function createFaculty(data: Omit<FacultyItem, "id">): FacultyItem {
  const db = getDb();
  const result = db
    .prepare(
      `INSERT INTO faculty (name, rank, position, degree, specialty, email, image, portfolio, scholar, gender, sortOrder)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      data.name,
      data.rank,
      data.position,
      data.degree,
      data.specialty,
      data.email,
      data.image,
      data.portfolio,
      data.scholar,
      data.gender,
      data.sortOrder
    );
  const faculty = getFacultyById(Number(result.lastInsertRowid));
  if (!faculty) {
    throw new Error("Failed to create faculty item");
  }
  return faculty;
}

export function updateFaculty(
  id: number,
  data: Partial<Omit<FacultyItem, "id">>
): boolean {
  const db = getDb();
  const current = getFacultyById(id);
  if (!current) {
    return false;
  }
  const result = db
    .prepare(
      `UPDATE faculty
       SET name=?, rank=?, position=?, degree=?, specialty=?, email=?, image=?, portfolio=?, scholar=?, gender=?, sortOrder=?
       WHERE id=?`
    )
    .run(
      data.name ?? current.name,
      data.rank ?? current.rank,
      data.position ?? current.position,
      data.degree ?? current.degree,
      data.specialty ?? current.specialty,
      data.email ?? current.email,
      data.image ?? current.image,
      data.portfolio ?? current.portfolio,
      data.scholar ?? current.scholar,
      data.gender ?? current.gender,
      data.sortOrder ?? current.sortOrder,
      id
    );
  return Number(result.changes) > 0;
}

export function deleteFaculty(id: number): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM faculty WHERE id = ?").run(id);
  return Number(result.changes) > 0;
}

// --------------------------------------------------------------------------
// Admin Stats Summary
// --------------------------------------------------------------------------
export function getAdminStats() {
  const db = getDb();
  const knowledgeCount = (
    db.prepare("SELECT count(*) as count FROM knowledge_base").get() as {
      count: number;
    }
  ).count;
  const newsCount = (
    db.prepare("SELECT count(*) as count FROM news").get() as { count: number }
  ).count;
  const logsCount = (
    db.prepare("SELECT count(*) as count FROM chat_logs").get() as {
      count: number;
    }
  ).count;

  return {
    dbPath: DB_PATH,
    knowledgeCount,
    logsCount,
    newsCount,
  };
}

export function getSiteSetting(key: string): string | null {
  const db = getDb();
  const row = db
    .prepare("SELECT value FROM site_settings WHERE key = ?")
    .get(key) as { value: string } | undefined;
  return row?.value ?? null;
}

export function setSiteSetting(key: string, value: string) {
  const db = getDb();
  db.prepare(`
    INSERT INTO site_settings (key, value)
    VALUES (?, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value
  `).run(key, value);
}

export function getFestivalThemeSetting(): string {
  return getSiteSetting("festivalTheme") ?? "none";
}
