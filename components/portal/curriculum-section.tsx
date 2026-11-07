"use client";

import {
  Award,
  BookOpen,
  CheckCircle2,
  Cloud,
  Code,
  Cpu,
  Database,
  ExternalLink,
  GraduationCap,
  Layers,
  Quote,
  Shield,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import type { CurriculumTab } from "./types";

export function CurriculumSection() {
  const [activeTab, setActiveTab] = useState<CurriculumTab>("credits");

  return (
    <section id="curriculum" className="py-16 md:py-24 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-3">
            <BookOpen className="size-3 text-indigo-500" />
            <span>OFFICIAL CURRICULUM</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาเทคโนโลยีสารสนเทศ
          </h2>
          <p className="mt-1 font-medium text-xs sm:text-sm text-blue-600 dark:text-blue-400">
            Bachelor of Science Program in Information Technology (วท.บ. 4 ปี)
          </p>
        </div>

        {/* Philosophy Card from sct.nstru.ac.th */}
        <div className="max-w-3xl mx-auto mb-10 p-5 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/5 via-indigo-500/10 to-cyan-500/5 backdrop-blur-md shadow-sm text-center relative overflow-hidden">
          <Quote className="size-8 text-blue-500/20 absolute -top-1 left-3 rotate-180 pointer-events-none" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            ปรัชญาของสาขาวิชาเทคโนโลยีสารสนเทศ
          </span>
          <p className="font-semibold text-sm sm:text-base text-foreground leading-relaxed">
            &ldquo;ก้าวทันเทคโนโลยีสมัยใหม่ ต่อยอดความรู้ เพื่อการใช้ประโยชน์ และตอบโจทย์การพัฒนาท้องถิ่น&rdquo;
          </p>
          <span className="text-[11px] text-muted-foreground mt-1.5 block">
            คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏนครศรีธรรมราช
          </span>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveTab("credits")}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 ${
              activeTab === "credits"
                ? "bg-blue-600 text-white shadow-md"
                : "border border-border/60 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Layers className="size-4" />
            <span>โครงสร้างหน่วยกิต (126 นก.)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tracks")}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 ${
              activeTab === "tracks"
                ? "bg-blue-600 text-white shadow-md"
                : "border border-border/60 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Cpu className="size-4" />
            <span>กลุ่มวิชาเด่นและ มคอ.2</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("admissions")}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 ${
              activeTab === "admissions"
                ? "bg-blue-600 text-white shadow-md"
                : "border border-border/60 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <GraduationCap className="size-4" />
            <span>คุณสมบัติ & การรับสมัคร</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("fees")}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-150 flex items-center gap-2 ${
              activeTab === "fees"
                ? "bg-blue-600 text-white shadow-md"
                : "border border-border/60 bg-card/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <Award className="size-4" />
            <span>ค่าเทอม (13,000 ฿) & ทุน</span>
          </button>
        </div>

        {/* Tab 1: Credits Structure */}
        {activeTab === "credits" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {/* Box 1 */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-blue-600 dark:text-blue-400">
                  หมวดที่ 1
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600">
                  30 หน่วยกิต
                </span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">
                หมวดวิชาศึกษาทั่วไป
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                พัฒนาทักษะการเรียนรู้ตลอดชีวิต ภาษาและการสื่อสาร สหวิทยาการเพื่อพัฒนาท้องถิ่น
                และทักษะดิจิทัลเพื่อการดำรงชีวิตในสังคมยุคใหม่
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border/50 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-blue-500 shrink-0" />
                  <span>ภาษาไทยและภาษาอังกฤษเพื่อการสื่อสาร</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-blue-500 shrink-0" />
                  <span>วิศวกรสังคมและการพัฒนาท้องถิ่น</span>
                </li>
              </ul>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-2xl border-2 border-blue-500/40 bg-card/80 backdrop-blur-md shadow-md relative">
              <div className="absolute -top-3 right-6 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] font-bold shadow-sm">
                วิชาแกนหลัก
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-indigo-600 dark:text-indigo-400">
                  หมวดที่ 2
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-600">
                  90 หน่วยกิต
                </span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">
                หมวดวิชาเฉพาะด้าน IT
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                วิชาบังคับพื้นฐานและทฤษฎีเข้มข้น กลุ่มวิชาเลือกเฉพาะทาง และการฝึกประสบการณ์วิชาชีพ/สหกิจศึกษา
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border/50 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-indigo-500 shrink-0" />
                  <span>กลุ่มวิชาบังคับ (การเขียนโปรแกรม, ฐานข้อมูล, เครือข่าย)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-indigo-500 shrink-0" />
                  <span>กลุ่มวิชาเลือกเฉพาะทางด้าน IT</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-indigo-500 shrink-0" />
                  <span>ฝึกประสบการณ์วิชาชีพ/สหกิจศึกษาในองค์กรจริง</span>
                </li>
              </ul>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-sm text-cyan-600 dark:text-cyan-400">
                  หมวดที่ 3
                </span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-600">
                  6 หน่วยกิต
                </span>
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">
                หมวดวิชาเลือกเสรี
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                เปิดโอกาสให้นักศึกษาได้เลือกลงรายวิชาใดๆ ที่เปิดสอนใน มรภ.นครศรีธรรมราช
                ตามความถนัด เพื่อต่อยอดทักษะเสริมในอนาคต
              </p>
              <ul className="space-y-2 text-xs text-muted-foreground border-t border-border/50 pt-3">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-cyan-500 shrink-0" />
                  <span>เลือกเรียนข้ามสาขาวิชาได้อย่างอิสระ</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-3.5 text-cyan-500 shrink-0" />
                  <span>เสริมความรู้ด้านธุรกิจ การตลาด หรือภาษา</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Tracks & TQF (มคอ.2) */}
        {activeTab === "tracks" && (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm hover:border-blue-500/40 transition-colors">
                <div className="size-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                  <Code className="size-5" />
                </div>
                <h4 className="font-bold text-base text-foreground mb-1">
                  การเขียนโปรแกรมและการพัฒนาระบบ
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                  รากฐานการพัฒนาซอฟต์แวร์ด้วยภาษาโปรแกรมมิ่งยุคใหม่, โครงสร้างข้อมูล, การพัฒนาเว็บและโมบายแอปพลิเคชัน
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">Web Dev</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">Mobile App</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">OOP</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm hover:border-indigo-500/40 transition-colors">
                <div className="size-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                  <Database className="size-5" />
                </div>
                <h4 className="font-bold text-base text-foreground mb-1">
                  การบริหารจัดการข้อมูลและการวิเคราะห์
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                  ระบบฐานข้อมูลเชิงสัมพันธ์และ NoSQL, การวิเคราะห์ข้อมูลเพื่อการตัดสินใจ และระบบสารสนเทศเพื่อการจัดการ (MIS)
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">SQL/NoSQL</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">Data Analytics</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">MIS</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm hover:border-emerald-500/40 transition-colors">
                <div className="size-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
                  <Cloud className="size-5" />
                </div>
                <h4 className="font-bold text-base text-foreground mb-1">
                  เครือข่ายและระบบสารสนเทศคลาวด์
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 leading-relaxed">
                  การบริหารจัดการเครือข่ายคอมพิวเตอร์ ระบบคลาวด์ สถาปัตยกรรมเซิร์ฟเวอร์ และการเชื่อมต่ออุปกรณ์ IoT
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">Cloud System</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">Networking</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground">IoT</span>
                </div>
              </div>
            </div>

            {/* Official Curriculum Revisions (มคอ.2) info from official site */}
            <div className="p-6 rounded-2xl border border-border/70 bg-card/80 backdrop-blur-md shadow-sm">
              <h4 className="font-bold text-sm sm:text-base text-foreground mb-3 flex items-center gap-2">
                <BookOpen className="size-4.5 text-blue-600" />
                รายละเอียดหลักสูตรเพิ่มเติม (มคอ.2)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl border border-border/60 bg-muted/40">
                  <span className="font-bold text-foreground block">หลักสูตรปรับปรุง พ.ศ. 2560</span>
                  <span className="text-muted-foreground">มคอ.2 วท.บ. (เทคโนโลยีสารสนเทศ)</span>
                </div>
                <div className="p-3 rounded-xl border border-border/60 bg-muted/40">
                  <span className="font-bold text-foreground block">หลักสูตรปรับปรุง พ.ศ. 2565</span>
                  <span className="text-muted-foreground">มคอ.2 วท.บ. (เทคโนโลยีสารสนเทศ)</span>
                </div>
                <div className="p-3 rounded-xl border-2 border-blue-500/40 bg-blue-500/5">
                  <span className="font-bold text-blue-600 dark:text-blue-400 block">หลักสูตรปรับปรุง พ.ศ. 2569</span>
                  <span className="text-muted-foreground">มคอ.2 ล่าสุด รองรับเทคโนโลยียุคใหม่</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Admissions (Official Criteria) */}
        {activeTab === "admissions" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
              <h3 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                <GraduationCap className="size-5 text-blue-600" />
                คุณสมบัติของผู้เข้าศึกษา (ข้อมูลจากคณะวิทยาศาสตร์และเทคโนโลยี)
              </h3>
              <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 text-sm mb-4">
                <span className="font-bold text-blue-700 dark:text-blue-300 block mb-1">
                  เกณฑ์การรับเข้าศึกษา:
                </span>
                <p className="text-foreground leading-relaxed">
                  สำเร็จการศึกษาระดับมัธยมศึกษาตอนปลาย (ม.6) โดยเรียนกลุ่มสาระการเรียนรู้คณิตศาสตร์ไม่น้อยกว่า 6 หน่วยกิต หรือสำเร็จการศึกษาระดับ ปวช. / กศน. / เทียบเท่า
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>รับผู้สมัครทุกสายการเรียน (ทั้งวิทย์-คณิต, ศิลป์-คำนวณ, ศิลป์-ภาษา หรือเทียบเท่า)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>มีโครงการปรับพื้นฐานความรู้ด้านการเขียนโปรแกรมและคณิตศาสตร์ให้ฟรี</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                  <span>สมัครได้ทั้งในระบบ TCAS และรอบรับตรงของมหาวิทยาลัยราชภัฏนครศรีธรรมราช</span>
                </li>
              </ul>

              <div className="mt-6 pt-4 border-t border-border/50 flex flex-wrap gap-3">
                <a
                  href="https://admis.nstru.ac.th/admis_nstru"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-colors"
                >
                  <GraduationCap className="size-4" />
                  <span>สมัครเรียนออนไลน์ (admis.nstru.ac.th)</span>
                  <ExternalLink className="size-3.5" />
                </a>

                <a
                  href="https://sct.nstru.ac.th/branch/view/4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/70 hover:bg-muted text-foreground text-xs sm:text-sm transition-colors"
                >
                  <span>ดูหน้าเว็บสาขาทางการ (sct.nstru.ac.th)</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Fees (Official Fee 13,000 THB) */}
        {activeTab === "fees" && (
          <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md shadow-sm">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                  ประมาณการค่าใช้จ่ายต่อภาคการศึกษา
                </span>
                <div className="flex items-baseline gap-2 mt-2 mb-1">
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                    13,000 ฿
                  </h3>
                  <span className="text-xs text-muted-foreground">/ ภาคการศึกษา (ภาคปกติ)</span>
                </div>
                <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  ค่าธรรมเนียมการศึกษาแบบเหมาจ่าย ครอบคลุมการใช้ห้องปฏิบัติการคอมพิวเตอร์ ระบบเครือข่ายอินเทอร์เน็ต และซอฟต์แวร์ลิขสิทธิ์ทั้งหมด
                </p>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 block mt-3 font-medium">
                  * ข้อมูลอาจมีการเปลี่ยนแปลง โปรดดูประกาศของมหาวิทยาลัยอีกครั้ง
                </span>
              </div>

              <div className="p-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 backdrop-blur-md shadow-sm">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  ทุนการศึกษาและเงินกู้ยืม
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-2 mb-1">
                  กู้ยืม กยศ. / กรอ.
                </h3>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                  กู้ได้เต็มจำนวน 100%
                </span>
                <p className="mt-4 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  นักศึกษาสาขาเทคโนโลยีสารสนเทศสามารถยื่นกู้ยืมกองทุน กยศ. หรือ กรอ. ได้ตลอดหลักสูตร 4 ปี รวมถึงมีสิทธิ์ได้รับค่าครองชีพรายเดือนตามเกณฑ์
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
