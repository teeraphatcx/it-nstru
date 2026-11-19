"use client";

import {
  ExternalLink,
  Facebook,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";

export function ActivitiesSection() {
  return (
    <section className="py-20 md:py-28 relative" id="activities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="at-caption text-[#00F0FF]">
              // SECTION 05 &bull; SOCIAL &amp; STUDENT ACTIVITIES
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white font-mono uppercase">
            กิจกรรมสาขาวิชาและภาพบรรยากาศ
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#A6A6A6] font-mono">
            ติดตามข่าวสาร กิจกรรมค่ายไอที การแข่งขันโครงงาน
            และบรรยากาศการเรียนการสอนจากเพจทางการ
          </p>
        </div>

        {/* Big Activity Banner Card */}
        <div className="at-card p-4 sm:p-6 mb-10 overflow-hidden border-white/20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-[5px] border border-white/40 bg-white/10 p-0.5 shrink-0">
                <img
                  alt="IT NSTRU"
                  className="w-full h-full object-contain rounded-full"
                  src="/logo.jpg"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-mono font-bold text-sm sm:text-base text-white">
                    เทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช
                  </h3>
                  <span className="at-caption text-[9px] px-1.5 py-0.5 rounded-[3px] bg-[#00F0FF]/15 text-[#00F0FF] border border-[#00F0FF]/30">
                    3.4K FOLLOWERS
                  </span>
                </div>
                <p className="text-xs text-[#A6A6A6] font-mono mt-0.5">
                  Official Facebook Community &bull; @ITNSTRU
                </p>
              </div>
            </div>

            <a
              className="at-btn text-xs py-2 px-4 group shrink-0"
              href="https://www.facebook.com/ITNSTRU"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Facebook className="size-4 text-[#00F0FF]" />
              <span>ติดตามเพจ Facebook</span>
              <ExternalLink className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>

          {/* Full Activity Banner */}
          <div className="rounded-[5px] overflow-hidden border border-white/10 relative group">
            <img
              alt="NSTRU Open House 2027"
              className="w-full h-auto object-cover group-hover:scale-102 transition-transform duration-500"
              src="/images/it-activity-banner.png"
            />
          </div>
        </div>

        {/* Mascot Cards & Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Mascot Boy Card */}
          <div className="at-card p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="size-36 sm:size-44 rounded-[5px] overflow-hidden border border-white/20 shrink-0 bg-[#050505] p-1">
              <img
                alt="IT NSTRU Programmer Mascot"
                className="w-full h-full object-cover rounded-[4px] hover:scale-105 transition-transform duration-300"
                src="/images/it-mascot-boy.png"
              />
            </div>
            <div className="flex flex-col justify-center text-center sm:text-left">
              <span className="at-caption text-[#00F0FF] mb-1">
                PROGRAMMING &amp; SYSTEMS
              </span>
              <h4 className="font-mono font-bold text-base text-white">
                เรียนรู้การเขียนโค้ดและพัฒนาแอป
              </h4>
              <p className="text-xs text-[#A6A6A6] mt-2 leading-relaxed">
                ฝึกทักษะ Full-stack Development, Mobile Apps, และ System
                Architecture ด้วยเครื่องมือที่ทันสมัย พร้อมส่งเสริมการแข่งขันระดับชาติ
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] border border-white/15 bg-white/5 text-white">
                  Python
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] border border-white/15 bg-white/5 text-white">
                  React / Next.js
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] border border-white/15 bg-white/5 text-white">
                  Flutter
                </span>
              </div>
            </div>
          </div>

          {/* Mascot Girl Card */}
          <div className="at-card p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="size-36 sm:size-44 rounded-[5px] overflow-hidden border border-white/20 shrink-0 bg-[#050505] p-1">
              <img
                alt="IT NSTRU Cloud & Network Mascot"
                className="w-full h-full object-cover rounded-[4px] hover:scale-105 transition-transform duration-300"
                src="/images/it-mascot-girl.png"
              />
            </div>
            <div className="flex flex-col justify-center text-center sm:text-left">
              <span className="at-caption text-[#00F0FF] mb-1">
                CLOUD &amp; DIGITAL MEDIA
              </span>
              <h4 className="font-mono font-bold text-base text-white">
                ระบบคลาวด์ สื่อดิจิทัล และ IoT
              </h4>
              <p className="text-xs text-[#A6A6A6] mt-2 leading-relaxed">
                ห้องปฏิบัติการคอมพิวเตอร์และเครือข่ายสารสนเทศที่เพียบพร้อม เรียนรู้ Cloud
                Computing, Cyber Security, และการสร้างสรรค์สื่อดิจิทัล
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5 justify-center sm:justify-start">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] border border-white/15 bg-white/5 text-white">
                  Cloud AWS/GCP
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] border border-white/15 bg-white/5 text-white">
                  Cyber Security
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-[3px] border border-white/15 bg-white/5 text-white">
                  Digital Media
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Official Contact Details from Facebook Page */}
        <div className="at-card p-5 sm:p-6 border-[#00F0FF]/30">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-[5px] border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-[#00F0FF]">
                <MapPin className="size-4" />
              </div>
              <div>
                <div className="at-caption text-[9px] text-[#A6A6A6]">
                  ที่ตั้งสำนักงานสาขา
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  ชั้น 5 อาคาร 30 คณะวิทย์ฯ
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-9 rounded-[5px] border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-white">
                <Phone className="size-4" />
              </div>
              <div>
                <div className="at-caption text-[9px] text-[#A6A6A6]">
                  เบอร์โทรศัพท์ประสานงาน
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  094 692 4415
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-9 rounded-[5px] border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-[#00F0FF]">
                <MessageCircle className="size-4" />
              </div>
              <div>
                <div className="at-caption text-[9px] text-[#A6A6A6]">
                  LINE ID ประสานงาน
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  sunisa
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="size-9 rounded-[5px] border border-white/20 bg-white/5 flex items-center justify-center shrink-0 text-white">
                <Users className="size-4" />
              </div>
              <div>
                <div className="at-caption text-[9px] text-[#A6A6A6]">
                  อีเมลทางการ
                </div>
                <div className="text-xs font-mono font-bold text-white">
                  it@nstru.ac.th
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
