"use client";

import {
  BookOpen,
  Briefcase,
  ChevronRight,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden"
      id="hero"
    >
      {/* White bg with subtle IT dot-grid pattern */}
      <div
        className="absolute inset-0 -z-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.45 0.19 255 / 0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Top blue gradient banner strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400 -z-10" />
      {/* Soft blue glow centre */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-500/12 via-indigo-500/10 to-cyan-400/12 blur-[130px] -z-10 rounded-full pointer-events-none" />
      {/* Right corner accent */}
      <div className="absolute top-0 right-0 w-[380px] h-[380px] bg-blue-600/8 blur-[110px] -z-10 rounded-full pointer-events-none" />
      {/* Bottom left accent */}
      <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-indigo-500/8 blur-[90px] -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Official Department Logo */}
          <div className="mb-5 relative group">
            <div className="size-20 sm:size-24 rounded-3xl p-1 bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full rounded-[22px] overflow-hidden bg-white flex items-center justify-center p-1">
                <img
                  alt="สาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช"
                  className="w-full h-full object-cover rounded-[18px]"
                  src="/logo.jpg"
                />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-blue-600 dark:text-blue-400 text-xs sm:text-[13px] font-medium mb-6 shadow-sm hover:bg-blue-500/15 transition-colors">
            <Sparkles className="size-3.5 animate-pulse text-amber-400" />
            <span>นวัตกรรม AI ผู้ช่วยประชาสัมพันธ์หลักสูตร IT มรภ.นครศรีธรรมราช</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.18] sm:leading-[1.15]">
            ระบบปัญญาประดิษฐ์เพื่อการประชาสัมพันธ์
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 bg-clip-text text-transparent">
              สาขาวิชาเทคโนโลยีสารสนเทศ
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 text-base sm:text-xl font-medium text-foreground/80">
            มหาวิทยาลัยราชภัฏนครศรีธรรมราช (Nakhon Si Thammarat Rajabhat University)
          </p>

          {/* Description */}
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            ยินดีต้อนรับสู่เว็บแอปพลิเคชันระบบปัญญาประดิษฐ์เพื่อนำเสนอคำตอบการประชาสัมพันธ์หลักสูตร
            ที่จะช่วยตอบทุกข้อสงสัยของคุณเกี่ยวกับการศึกษาต่อในสาขาเทคโนโลยีสารสนเทศ
            การรับสมัคร ทุนการศึกษา การฝึกงาน และสายงานไอที ตลอด 24 ชั่วโมง
          </p>

          {/* CTA Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 group"
              href="#curriculum"
            >
              <BookOpen className="size-4.5 group-hover:scale-110 transition-transform" />
              <span>โครงสร้างหลักสูตร (126 นก.)</span>
              <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-border/70 bg-card/60 backdrop-blur-md hover:bg-muted/70 text-foreground font-medium text-sm transition-all duration-200"
              href="#contact"
            >
              <GraduationCap className="size-4 text-blue-500" />
              <span>ข้อมูลการรับสมัคร</span>
            </a>
          </div>

          {/* Highlights / Stats Grid */}
          <div className="mt-14 w-full grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-left">
            <div className="p-4 rounded-2xl border border-blue-200 border-l-4 border-l-blue-500 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 shadow-sm">
              <div className="size-9 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-3">
                <GraduationCap className="size-5" />
              </div>
              <div className="font-bold text-lg sm:text-xl text-slate-800">
                วท.บ. 4 ปี
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                วิทยาศาสตรบัณฑิต (เทคโนโลยีสารสนเทศ)
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-indigo-200 border-l-4 border-l-indigo-500 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 shadow-sm">
              <div className="size-9 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-3">
                <BookOpen className="size-5" />
              </div>
              <div className="font-bold text-lg sm:text-xl text-slate-800">
                126 หน่วยกิต
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                หลักสูตรปรับปรุงใหม่ เน้นปฏิบัติการจริง
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-cyan-200 border-l-4 border-l-cyan-500 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 shadow-sm">
              <div className="size-9 rounded-lg bg-cyan-100 text-cyan-600 flex items-center justify-center mb-3">
                <Briefcase className="size-5" />
              </div>
              <div className="font-bold text-lg sm:text-xl text-slate-800">
                สหกิจ 540 ชม.
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                ปฏิบัติงานจริงในองค์กรดิจิทัลชั้นนำ
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-emerald-200 border-l-4 border-l-emerald-500 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200 shadow-sm">
              <div className="size-9 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="size-5" />
              </div>
              <div className="font-bold text-lg sm:text-xl text-slate-800">
                กยศ. / กรอ. 100%
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                กู้ยืมค่าเล่าเรียนได้ตลอดหลักสูตร
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
