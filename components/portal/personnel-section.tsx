"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  BookOpen,
  ExternalLink,
  GraduationCap,
  Mail,
  Maximize2,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import type { FacultyMember } from "./types";

// Raw type from API or SQLite (specialty is JSON string)
export type FacultyApiItem = {
  id: number;
  name: string;
  rank: string;
  position: string;
  degree: string;
  specialty: string;
  email: string;
  image: string;
  portfolio: string;
  scholar: string;
  gender: string;
  sortOrder: number;
};

// Default fallback faculty list for instant 0ms rendering
export const fallbackFacultyList: FacultyMember[] = [
  // --- อาจารย์ผู้หญิง (Ladies First) ---
  {
    name: "ผศ.ดร.สุนิษา คิดใจเดียว",
    rank: "ผู้ช่วยศาสตราจารย์ ดร.",
    position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
    degree: "ปร.ด. (เทคโนโลยีสารสนเทศ)",
    specialty: ["การสร้างสื่อมัลติมีเดีย", "ระบบสารสนเทศ", "การวิเคราะห์ข้อมูล"],
    email: "sunisa_kid@nstru.ac.th",
    image: "https://sct.nstru.ac.th/storage/picturelooking/p63.jpg",
    portfolio:
      "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/2529",
    scholar: "https://scholar.google.com/citations?hl=th&user=2T1uC10AAAAJ",
  },
  {
    name: "ผศ.ดร.โสภี แก้วชะฎา",
    rank: "ผู้ช่วยศาสตราจารย์ ดร.",
    position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
    degree: "ปร.ด. (เทคโนโลยีสารสนเทศ)",
    specialty: [
      "การเขียนโปรแกรม",
      "ระบบสารสนเทศ",
      "การวิเคราะห์ข้อมูล",
      "ระบบฐานข้อมูล",
    ],
    email: "sopee_kae@nstru.ac.th",
    image: "https://sct.nstru.ac.th/storage/picturelooking/p68.jpg",
    portfolio:
      "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/2625",
    scholar: "https://scholar.google.com/citations?hl=th&user=g23W0GAAAAAJ",
  },
  {
    name: "ผศ.แสงจันทร์ เรืองอ่อน",
    rank: "ผู้ช่วยศาสตราจารย์",
    position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
    degree: "วท.ม. (เทคโนโลยีสารสนเทศ)",
    specialty: [
      "การพัฒนาเว็บแอปพลิเคชัน",
      "การวิเคราะห์และออกแบบระบบ",
      "เทคโนโลยีสารสนเทศ",
    ],
    email: "sangjun_rua@nstru.ac.th",
    image: "https://sct.nstru.ac.th/storage/picturelooking/p27.jpg",
    portfolio:
      "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/693",
    scholar: "https://scholar.google.com/citations?user=RVmF4q4AAAAJ&hl=th",
  },
  // --- อาจารย์ผู้ชาย ---
  {
    name: "ผศ.ไพโรจน์ เสนา",
    rank: "ผู้ช่วยศาสตราจารย์",
    position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
    degree: "วท.ม. (เทคโนโลยีสารสนเทศ)",
    specialty: [
      "เทคโนโลยีสารสนเทศและการสื่อสาร",
      "อินเทอร์เน็ตของสรรพสิ่ง (IoT)",
      "การวิเคราะห์ข้อมูล",
    ],
    email: "pairot_sen@nstru.ac.th",
    image: "https://sct.nstru.ac.th/storage/picturelooking/p11.jpg",
    portfolio:
      "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/2134",
    scholar: "https://scholar.google.com/citations?user=Q7WbPncAAAAJ&hl=th",
  },
  {
    name: "ผศ.ดร.วิชิต สุขทร",
    rank: "ผู้ช่วยศาสตราจารย์ ดร.",
    position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
    degree: "ปร.ด. (วิทยาการคอมพิวเตอร์และสารสนเทศ)",
    specialty: ["ระบบสารสนเทศ", "เทคโนโลยีสารสนเทศ", "ระบบเครือข่ายคอมพิวเตอร์"],
    email: "wichit_soo@nstru.ac.th",
    image: "https://sct.nstru.ac.th/storage/picturelooking/p16.jpg",
    portfolio:
      "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/671",
    scholar: "https://scholar.google.com/citations?user=PoU1vMIAAAAJ&hl=en",
  },
  {
    name: "ผศ.ดร.สมพร เรืองอ่อน",
    rank: "ผู้ช่วยศาสตราจารย์ ดร.",
    position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
    degree: "ปร.ด. (เทคโนโลยีสารสนเทศ)",
    specialty: [
      "การพัฒนาระบบสารสนเทศ",
      "การบริหารจัดการข้อมูล",
      "การพัฒนาแผนยุทธศาสตร์",
      "การประกันคุณภาพการศึกษา",
    ],
    email: "somporn_rua@nstru.ac.th",
    image: "https://sct.nstru.ac.th/storage/picturelooking/p20.jpg",
    portfolio:
      "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/683",
    scholar: "https://scholar.google.com/citations?user=g68mFkgAAAAJ&hl=en",
  },
  {
    name: "ดร.ปฐมพงษ์ ฉับพลัน",
    rank: "อาจารย์ ดร.",
    position: "อาจารย์ประจำหลักสูตรเทคโนโลยีสารสนเทศ",
    degree: "ปร.ด. (เทคโนโลยีสารสนเทศ)",
    specialty: [
      "เทคโนโลยีสารสนเทศ",
      "ระบบสารสนเทศทางภูมิศาสตร์ (GIS)",
      "การวิเคราะห์เชิงพื้นที่",
    ],
    email: "patompong_cha@nstru.ac.th",
    image: "https://sct.nstru.ac.th/storage/picturelooking/p48.jpg",
    portfolio:
      "https://race.nstru.ac.th/home_ex/e-portfolio/index.php/Search/personal/2318",
    scholar: "https://scholar.google.com/citations?hl=th&user=L42LE20AAAAJ",
  },
  // --- บุคลากรสายสนับสนุน ---
  {
    name: "นายนนทพันธ์ วุฒิมานพ",
    rank: "บุคลากรสายสนับสนุน",
    position: "เจ้าหน้าที่ประจำสาขาวิชาเทคโนโลยีสารสนเทศ",
    degree: "วท.บ. (เทคโนโลยีสารสนเทศ)",
    specialty: ["งานสนับสนุนห้องปฏิบัติการ", "ระบบเครือข่ายและบริการคอมพิวเตอร์"],
    email: "nantapol_wut@nstru.ac.th",
    image: "https://sct.nstru.ac.th/storage/picturelooking/p104.jpg",
  },
];

export function parseSpecialty(raw: string | string[]): string[] {
  if (Array.isArray(raw)) return raw;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : raw.split(",").map((s) => s.trim());
  } catch {
    return raw ? raw.split(",").map((s) => s.trim()) : [];
  }
}

export function apiToFacultyMember(item: FacultyApiItem): FacultyMember {
  return {
    name: item.name,
    rank: item.rank,
    position: item.position,
    degree: item.degree || undefined,
    specialty: parseSpecialty(item.specialty),
    email: item.email,
    image: item.image,
    portfolio: item.portfolio || undefined,
    scholar: item.scholar || undefined,
  };
}

export function PersonnelSection({
  initialFaculty,
}: {
  initialFaculty?: FacultyMember[];
}) {
  const [mounted, setMounted] = useState(false);
  // Initialize with initialFaculty or fallback instantly - NO SPINNER DELAY!
  const [facultyList, setFacultyList] = useState<FacultyMember[]>(() => {
    if (initialFaculty && initialFaculty.length > 0) {
      return initialFaculty;
    }
    return fallbackFacultyList;
  });
  const [selectedMember, setSelectedMember] = useState<FacultyMember | null>(
    null
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock background scroll and listen to Escape key when modal is open
  useEffect(() => {
    if (!selectedMember) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
    };
    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedMember]);

  // Background revalidation: keep in sync with SQLite silently without blocking UI
  useEffect(() => {
    fetch("/api/portal/faculty")
      .then((res) => {
        if (!res.ok) throw new Error("fetch failed");
        return res.json() as Promise<FacultyApiItem[]>;
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFacultyList(data.map(apiToFacultyMember));
        }
      })
      .catch(() => {
        // Silently use current data on failure
      });
  }, []);

  return (
    <section
      id="personnel"
      className="py-16 md:py-24 scroll-mt-12 bg-muted/20 border-t border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <Users className="size-3 text-blue-500" />
            <span>FACULTY &amp; PERSONNEL</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            คณาจารย์ประจำสาขาวิชาเทคโนโลยีสารสนเทศ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            คณาจารย์ผู้ทรงคุณวุฒิ คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏนครศรีธรรมราช
            เชื่อมโยงข้อมูลจริงจากระบบฐานข้อมูลคณะฯ{" "}
            <a
              href="https://sct.nstru.ac.th/branch/view/4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1"
            >
              <span>(sct.nstru.ac.th)</span>
              <ExternalLink className="size-3" />
            </a>
          </p>
          <p className="mt-1 text-xs text-blue-600/80 dark:text-blue-400/80 font-medium">
            💡 คลิกที่การ์ดของอาจารย์แต่ละท่านเพื่อดูข้อมูลและผลงานวิจัยฉบับเต็ม
          </p>
        </div>

        {/* Faculty Grid - Always rendered instantly */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyList.map((member) => (
            <div
              key={member.email || member.name}
              role="button"
              tabIndex={0}
              className="p-5 rounded-2xl border border-border/60 bg-card/80 backdrop-blur-md shadow-sm hover:border-blue-500 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between group cursor-pointer relative select-none"
              onClick={() => setSelectedMember(member)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedMember(member);
                }
              }}
            >
              <div>
                {/* Photo container */}
                <div className="relative size-28 sm:size-32 rounded-2xl overflow-hidden mx-auto mb-4 border-2 border-border/70 group-hover:border-blue-500 group-hover:shadow-md transition-all duration-300 bg-muted/40">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://sct.nstru.ac.th/img/logonstru.png";
                    }}
                  />
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-1.5 rounded-full bg-white/90 dark:bg-black/80 text-blue-600 shadow-md">
                      <Maximize2 className="size-4" />
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 inline-block mb-1.5">
                    {member.rank}
                  </span>
                  <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug group-hover:text-blue-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {member.position}
                  </p>
                </div>

                {/* Email */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground/80 mb-3 hover:text-foreground transition-colors">
                  <Mail className="size-3 text-blue-500" />
                  <a
                    href={`mailto:${member.email}`}
                    className="truncate hover:underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {member.email}
                  </a>
                </div>

                {/* Specialties */}
                <div className="border-t border-border/50 pt-2.5 mb-3">
                  <span className="text-[10px] font-semibold text-muted-foreground block mb-1">
                    ความเชี่ยวชาญ:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {member.specialty.map((item) => (
                      <span
                        key={item}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground border border-border/40"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Click hint & Action Links */}
              <div>
                <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[11px]">
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <Maximize2 className="size-3" />
                    <span>คลิกเพื่อดูประวัติ</span>
                  </span>

                  {(member.portfolio || member.scholar) && (
                    <div className="flex items-center gap-1.5">
                      {member.portfolio && (
                        <a
                          href={member.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          title="E-Portfolio"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <BookOpen className="size-3" />
                        </a>
                      )}
                      {member.scholar && (
                        <a
                          href={member.scholar}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-md text-blue-600 hover:bg-blue-500/10 transition-colors"
                          title="ผลงานวิจัย"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GraduationCap className="size-3.5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Detail Modal (Rendered via Portal at document.body for 100% overlay) */}
      {mounted &&
        selectedMember &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedMember(null)}
          >
            <div
              className="relative w-full max-w-lg rounded-3xl border border-border/70 bg-card text-card-foreground shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                type="button"
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-muted/60 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shadow-sm"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>

              {/* Large photo */}
              <div className="flex justify-center mb-5">
                <div className="relative size-40 sm:size-48 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-xl bg-muted/40 p-1 bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-cyan-500/20">
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="w-full h-full object-cover object-top rounded-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://sct.nstru.ac.th/img/logonstru.png";
                    }}
                  />
                </div>
              </div>

              {/* Name */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-foreground text-center leading-snug">
                {selectedMember.name}
              </h3>

              {/* Rank badge */}
              <div className="flex justify-center mt-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  {selectedMember.rank}
                </span>
              </div>

              {/* Position */}
              <p className="text-sm font-medium text-muted-foreground text-center mt-2">
                {selectedMember.position}
              </p>

              {/* Degree */}
              {selectedMember.degree && (
                <div className="flex items-center justify-center gap-1.5 mt-2">
                  <GraduationCap className="size-4 text-blue-500" />
                  <span className="text-xs sm:text-sm text-foreground/80 font-medium">
                    {selectedMember.degree}
                  </span>
                </div>
              )}

              {/* Specialties */}
              <div className="border-t border-border/50 mt-5 pt-4">
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Sparkles className="size-4 text-blue-500" />
                  <span className="text-xs font-bold text-foreground">
                    ความเชี่ยวชาญ / สาขาวิจัย
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedMember.specialty.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-300 font-medium border border-blue-500/20"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="border-t border-border/50 mt-4 pt-4">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Mail className="size-4 text-blue-500" />
                  <a
                    href={`mailto:${selectedMember.email}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    {selectedMember.email}
                  </a>
                </div>
              </div>

              {/* Portfolio & Scholar buttons */}
              {(selectedMember.portfolio || selectedMember.scholar) && (
                <div className="border-t border-border/50 mt-5 pt-4 flex flex-wrap items-center justify-center gap-3">
                  {selectedMember.portfolio && (
                    <a
                      href={selectedMember.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border/70 bg-card hover:bg-muted text-foreground transition-all text-xs sm:text-sm font-medium shadow-sm hover:shadow"
                    >
                      <BookOpen className="size-4 text-blue-500" />
                      <span>E-Portfolio มหาวิทยาลัย</span>
                      <ExternalLink className="size-3.5 opacity-60" />
                    </a>
                  )}

                  {selectedMember.scholar && (
                    <a
                      href={selectedMember.scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-blue-500/30 bg-blue-600 hover:bg-blue-700 text-white transition-all text-xs sm:text-sm font-medium shadow-md shadow-blue-500/20"
                    >
                      <GraduationCap className="size-4" />
                      <span>ผลงานวิจัย (Google Scholar)</span>
                      <ExternalLink className="size-3.5 opacity-80" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}
