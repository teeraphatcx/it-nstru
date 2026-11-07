"use client";

import { ArrowUp, Laptop, Sparkles } from "lucide-react";
import Link from "next/link";

export function PortalFooter() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/60 bg-sidebar/60 backdrop-blur-xl py-12 text-muted-foreground text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-sm overflow-hidden shrink-0">
              <img
                src="/logo.jpg"
                alt="IT NSTRU"
                className="w-full h-full object-cover rounded-[9.5px] bg-white"
              />
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">
                สาขาวิชาเทคโนโลยีสารสนเทศ
              </div>
              <div className="text-[11px] text-muted-foreground">
                คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏนครศรีธรรมราช
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[13px]">
            <a href="#hero" className="hover:text-foreground transition-colors">
              หน้าแรก
            </a>
            <a href="#ai-system" className="hover:text-foreground transition-colors">
              ระบบ AI
            </a>
            <a href="#curriculum" className="hover:text-foreground transition-colors">
              หลักสูตร IT
            </a>
            <a href="#careers" className="hover:text-foreground transition-colors">
              เส้นทางอาชีพ
            </a>
            <a href="#personnel" className="hover:text-foreground transition-colors">
              คณาจารย์
            </a>
            <a href="#contact" className="hover:text-foreground transition-colors">
              ติดต่อเรา
            </a>
            <Link href="/chat" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
              ห้องแชทเต็มจอ
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="size-9 rounded-xl border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
            title="กลับขึ้นด้านบน"
          >
            <ArrowUp className="size-4" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            © 2026 สาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground/70">
            <span>ขับเคลื่อนด้วยระบบปัญญาประดิษฐ์เพื่อการประชาสัมพันธ์หลักสูตร</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
