# Information Technology Website

<a href="https://your-website-url.com">
  <img alt="Information Technology" src="public/images/it-logo.png">
  <h1 align="center">Information Technology</h1>
</a>

<p align="center">
  เว็บไซต์ประชาสัมพันธ์สาขาวิชาเทคโนโลยีสารสนเทศ (Information Technology)
  มุ่งนำเสนอข้อมูลหลักสูตร ข่าวสาร กิจกรรม ผลงานนักศึกษา และข้อมูลที่เกี่ยวข้องกับสาขาวิชา
  เพื่อเป็นศูนย์กลางข้อมูลสำหรับนักศึกษา บุคลากร ศิษย์เก่า และผู้ที่สนใจเข้าศึกษาต่อ
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#website-modules"><strong>Website Modules</strong></a> ·
  <a href="#technology-stack"><strong>Technology Stack</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#running-locally"><strong>Running Locally</strong></a>
</p>

---

## Features

- **Modern Website**
  - ออกแบบเว็บไซต์ให้มีความทันสมัย สวยงาม และรองรับทุกขนาดหน้าจอ
  - ใช้งานง่าย รองรับทั้งคอมพิวเตอร์ แท็บเล็ต และโทรศัพท์มือถือ
  - แสดงผลข้อมูลอย่างเป็นระเบียบและเข้าถึงง่าย

- **Information Management**
  - จัดการข้อมูลประชาสัมพันธ์ของสาขาวิชา
  - เพิ่ม แก้ไข และลบข่าวสารและประกาศ
  - จัดการรูปภาพและเนื้อหาบนเว็บไซต์

- **Responsive Design**
  - รองรับการแสดงผลแบบ Responsive
  - ใช้งานได้บนทุกอุปกรณ์

## Website Modules

### 1. หน้าแรก (Home)
- แนะนำสาขาวิชาเทคโนโลยีสารสนเทศ
- ภาพประชาสัมพันธ์และแบนเนอร์
- ข่าวสารและประกาศล่าสุด
- กิจกรรมเด่นของสาขา

### 2. เกี่ยวกับสาขา (About Us)
- ประวัติความเป็นมาของสาขาวิชา
- วิสัยทัศน์และพันธกิจ
- จุดเด่นของสาขาวิชา
- ข้อมูลการติดต่อ

### 3. หลักสูตร (Curriculum)
- ข้อมูลหลักสูตรที่เปิดสอน
- รายละเอียดแผนการศึกษา
- โครงสร้างหลักสูตร
- แนวทางการประกอบอาชีพหลังสำเร็จการศึกษา

### 4. บุคลากร (Our Staff)
- ข้อมูลอาจารย์ประจำสาขา
- ประวัติและคุณวุฒิการศึกษา
- ความเชี่ยวชาญและผลงานทางวิชาการ

### 5. ข่าวสารและกิจกรรม (News & Activities)
- ข่าวประชาสัมพันธ์
- กิจกรรมของสาขาวิชา
- กิจกรรมของนักศึกษา
- ภาพบรรยากาศกิจกรรม

### 6. ผลงานนักศึกษา (Student Projects)
- ผลงานโครงงานนักศึกษา
- ผลงานด้านเทคโนโลยีและนวัตกรรม
- ผลงานการแข่งขันและรางวัล

### 7. รับสมัครนักศึกษา (Admissions)
- ข้อมูลการรับสมัคร
- คุณสมบัติผู้สมัคร
- ขั้นตอนการสมัคร
- ช่องทางการสมัครเข้าศึกษา

### 8. ติดต่อเรา (Contact Us)
- ที่ตั้งสาขาวิชา
- ช่องทางติดต่อ
- Facebook และ Social Media
- แผนที่ตั้งมหาวิทยาลัย

## Technology Stack

- **Next.js** - React Framework สำหรับพัฒนาเว็บไซต์
- **TypeScript** - เพิ่มความปลอดภัยและความถูกต้องของโค้ด
- **Tailwind CSS** - จัดการรูปแบบและออกแบบส่วนติดต่อผู้ใช้
- **shadcn/ui** - ชุด UI Components สำหรับสร้างเว็บไซต์
- **Radix UI** - Component Primitives ที่รองรับ Accessibility
- **Lucide React** - ไอคอนสำหรับเว็บไซต์

## Installation

ติดตั้งโปรเจกต์และ Dependencies ที่จำเป็น

```bash
pnpm install
```

## Running Locally

เริ่มต้นใช้งานเว็บไซต์ในเครื่อง Local Development

```bash
pnpm dev
```

เปิดเว็บไซต์ผ่าน Browser ที่

```text
http://localhost:3000
```

## Build for Production

ตรวจสอบและสร้างเว็บไซต์สำหรับใช้งานจริง

```bash
pnpm build
```

จากนั้นสามารถเริ่มต้นใช้งาน Production Server ด้วยคำสั่ง

```bash
pnpm start
```

## Deploy on Render

- ตั้งค่า `AUTH_SECRET`, `ADMIN_USERNAME` และ `ADMIN_PASSWORD` ใน Environment ของ Render
  โดยไม่เก็บค่าเหล่านี้ใน source code
- เพิ่ม Persistent Disk แล้วกำหนด mount path เป็น `/var/data`
- กำหนด `SQLITE_DB_PATH` เป็น `/var/data/chatbot.sqlite` เพื่อให้ข้อมูล SQLite อยู่บน disk
  และไม่หายเมื่อ service restart หรือ deploy ใหม่
- กำหนด build command เป็น `pnpm install --frozen-lockfile && pnpm build`
  และ start command เป็น `pnpm start`

## Project Objective

พัฒนาเว็บไซต์ประชาสัมพันธ์สาขาวิชาเทคโนโลยีสารสนเทศ เพื่อเป็นศูนย์กลางในการเผยแพร่ข้อมูลข่าวสาร หลักสูตร กิจกรรม ผลงานนักศึกษา และข้อมูลการรับสมัคร ช่วยให้ผู้ใช้งานสามารถเข้าถึงข้อมูลของสาขาวิชาได้อย่างสะดวก รวดเร็ว และมีประสิทธิภาพ

---

<p align="center">
  <strong>Information Technology</strong><br>
  เว็บไซต์ประชาสัมพันธ์สาขาวิชาเทคโนโลยีสารสนเทศ<br>
  คณะวิทยาศาสตร์และเทคโนโลยี<br>
  มหาวิทยาลัยราชภัฏนครศรีธรรมราช
</p>