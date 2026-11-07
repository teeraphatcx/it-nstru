"use client";

import {
  ExternalLink,
  Facebook,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30 border-t border-border/50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admission Big CTA Card */}
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 p-8 sm:p-12 text-white shadow-2xl overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold mb-4">
              <Sparkles className="size-3.5 text-amber-300" />
              <span>เปิดรับสมัครนักศึกษาใหม่ ปีการศึกษา 2569</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              พร้อมเริ่มต้นเส้นทางสู่อาชีพสายไอทีแล้วหรือยัง?
            </h2>
            <p className="mt-3 text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl">
              สมัครเรียนสาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช ได้ทั้งรอบ TCAS
              และรอบรับตรง สมัครง่ายผ่านระบบออนไลน์ ไม่จำกัดแผนการเรียน
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://reg.nstru.ac.th"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-700 hover:bg-white/90 font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-150 active:scale-95"
              >
                <GraduationCap className="size-4.5" />
                <span>สมัครเรียนออนไลน์ (ระบบรับสมัคร)</span>
                <ExternalLink className="size-3.5" />
              </a>

              <a
                href="#ai-system"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white font-medium text-sm backdrop-blur-md transition-all duration-150"
              >
                <span>สอบถาม AI เพิ่มเติม</span>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Info & Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-2">
              CONTACT INFORMATION
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mb-4">
              ติดต่อสาขาวิชาเทคโนโลยีสารสนเทศ
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              หากมีข้อสงสัยเพิ่มเติมเกี่ยวกับการรับสมัคร ทุนการศึกษา หรือการโอนย้ายหน่วยกิต
              สามารถติดต่อคณาจารย์และเจ้าหน้าที่สาขาวิชาได้ตามช่องทางด้านล่าง
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                <MapPin className="size-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-foreground block">ที่ตั้งสาขาวิชา</span>
                  <span className="text-muted-foreground leading-relaxed block mt-0.5">
                    สาขาวิชาเทคโนโลยีสารสนเทศ คณะวิทยาศาสตร์และเทคโนโลยี
                    มหาวิทยาลัยราชภัฏนครศรีธรรมราช เลขที่ 1 หมู่ 4 ตำบลท่างิ้ว
                    อำเภอเมือง จังหวัดนครศรีธรรมราช 80280
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                <Phone className="size-5 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-foreground block">โทรศัพท์สอบถาม</span>
                  <span className="text-muted-foreground block mt-0.5">
                    075-377443 (สำนักงานคณะวิทยาศาสตร์และเทคโนโลยี)
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                <Facebook className="size-5 text-blue-500 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-foreground block">Facebook Fanpage</span>
                  <span className="text-muted-foreground block mt-0.5">
                    สาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm">
                <Globe className="size-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm">
                  <span className="font-bold text-foreground block">เว็บไซต์ข้อมูลสาขาวิชาทางการ</span>
                  <a
                    href="https://sct.nstru.ac.th/branch/view/4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline block mt-0.5"
                  >
                    https://sct.nstru.ac.th/branch/view/4 (คณะวิทย์ฯ มรภ.นครศรีธรรมราช)
                  </a>
                  <a
                    href="https://admis.nstru.ac.th/admis_nstru"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline block mt-1"
                  >
                    https://admis.nstru.ac.th/admis_nstru (ระบบรับสมัครนักศึกษาใหม่)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Map Card */}
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 h-full flex flex-col justify-between">
            <div className="rounded-xl overflow-hidden border border-border/50 h-[300px] sm:h-[350px] w-full relative bg-muted/40 flex items-center justify-center">
              <iframe
                title="NSTRU Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.8860718536835!2d99.89744477583606!3d8.487834791553597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30539c362f6b86cf%3A0xe5a363f8221b6ee0!2z4Lih4Lir4Liy4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lij4Liy4LiK4Lig4Lix4LiP4LiZ4LiE4Lij4Lio4Lij4Li14LiY4Lij4Lij4Lih4Lij4Liy4LiK!5e0!3m2!1sth!2sth!4v1700000000000!5m2!1sth!2sth"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground px-1">
              <span>มหาวิทยาลัยราชภัฏนครศรีธรรมราช (NSTRU)</span>
              <a
                href="https://maps.google.com/?q=Nakhon+Si+Thammarat+Rajabhat+University"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>เปิดใน Google Maps</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
