"use client";

import {
  Code,
  Compass,
  Database,
  ExternalLink,
  Globe,
  Laptop,
  Layers,
  LineChart,
  Network,
  Palette,
  Server,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import type { CareerItem } from "./types";

export function CareersSection() {
  const careers: CareerItem[] = [
    {
      title: "นักเขียนโปรแกรม",
      titleEn: "Programmer / Software Developer",
      description:
        "เขียนโปรแกรมและพัฒนาซอฟต์แวร์ประยุกต์ตามความต้องการขององค์กร ทั้งแอปพลิเคชันบนเดสก์ท็อป เว็บ และโมบาย",
      skills: ["Java", "Python", "C# / .NET", "Algorithms", "Git"],
      icon: "code",
      highlight: "ต้องการสูงมาก",
    },
    {
      title: "นักวิชาการเทคโนโลยีสารสนเทศ",
      titleEn: "Information Technology Specialist",
      description:
        "วิเคราะห์ วางแผน บริหารจัดการ และให้คำปรึกษาการประยุกต์ใช้เทคโนโลยีดิจิทัลในหน่วยงานภาครัฐและเอกชน",
      skills: ["IT Management", "ITIL", "System Evaluation", "Digital Governance"],
      icon: "laptop",
      highlight: "รองรับทั้งรัฐและเอกชน",
    },
    {
      title: "นักวิเคราะห์และออกแบบระบบ",
      titleEn: "System Analyst & Designer (SA)",
      description:
        "ศึกษาและวิเคราะห์กระบวนการทำงาน ออกแบบสถาปัตยกรรมระบบสารสนเทศ และแปลงความต้องการของผู้ใช้สู่ระบบจริง",
      skills: ["UML / BPMN", "System Design", "Agile/Scrum", "Business Flow"],
      icon: "layers",
      highlight: "ค่าตอบแทนสูง",
    },
    {
      title: "นักพัฒนาระบบสารสนเทศ",
      titleEn: "Information System Developer",
      description:
        "พัฒนาระบบสารสนเทศองค์กร (ERP, CRM, MIS) เชื่อมโยงฐานข้อมูลขนาดใหญ่เพื่อรองรับการดำเนินงานทางธุรกิจ",
      skills: ["Database Management", "SQL/NoSQL", "Enterprise Architecture", "API Integration"],
      icon: "database",
      highlight: "สำคัญต่อองค์กร",
    },
    {
      title: "นักพัฒนาเว็บไซต์และผู้ดูแลเว็บไซต์",
      titleEn: "Web Developer & Webmaster",
      description:
        "สร้างสรรค์และพัฒนาเว็บไซต์ทั้ง Front-end และ Back-end รวมถึงดูแลความมั่นคงปลอดภัยและประสิทธิภาพของเว็บ",
      skills: ["HTML5/CSS3", "JavaScript/TypeScript", "React/Next.js", "SEO", "Web Security"],
      icon: "globe",
      highlight: "รับงานอิสระได้",
    },
    {
      title: "ผู้บริหารระบบเครือข่ายสารสนเทศ",
      titleEn: "Network & Infrastructure Administrator",
      description:
        "ออกแบบ ติดตั้ง กำหนดค่า และเฝ้าระวังระบบเครือข่ายคอมพิวเตอร์และเซิร์ฟเวอร์ ให้มีความเสถียรและปลอดภัยสูงสุด",
      skills: ["Network Security", "Cisco/MikroTik", "Linux Server", "Firewall", "Cloud"],
      icon: "network",
      highlight: "เสาหลักขององค์กร",
    },
    {
      title: "นักดิจิทัลคอนเทนต์และสื่อ",
      titleEn: "Digital Content & Media Creator",
      description:
        "ผลิตสื่อมัลติมีเดีย คอนเทนต์ดิจิทัล กราฟิก และออกแบบประสบการณ์ผู้ใช้ (UI/UX) สำหรับแพลตฟอร์มออนไลน์",
      skills: ["UI/UX Design", "Figma", "Digital Marketing", "Motion Graphic", "Content Strategy"],
      icon: "palette",
      highlight: "สายงานสร้างสรรค์",
    },
    {
      title: "นักประกอบการดิจิทัล",
      titleEn: "Digital Tech Entrepreneur",
      description:
        "สร้างธุรกิจนวัตกรรมเทคโนโลยีของตนเอง สตาร์ทอัพ หรือรับงานที่ปรึกษาและพัฒนาซอฟต์แวร์อิสระ (Tech Freelancer)",
      skills: ["Startup Mindset", "Product Development", "E-Commerce", "Tech Innovation"],
      icon: "trending",
      highlight: "สร้างธุรกิจของตนเอง",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "code":
        return <Code className="size-5.5 text-blue-500" />;
      case "laptop":
        return <Laptop className="size-5.5 text-indigo-500" />;
      case "layers":
        return <Layers className="size-5.5 text-cyan-500" />;
      case "database":
        return <Database className="size-5.5 text-amber-500" />;
      case "globe":
        return <Globe className="size-5.5 text-emerald-500" />;
      case "network":
        return <Network className="size-5.5 text-purple-500" />;
      case "palette":
        return <Palette className="size-5.5 text-pink-500" />;
      default:
        return <TrendingUp className="size-5.5 text-blue-600" />;
    }
  };

  return (
    <section id="careers" className="py-16 md:py-24 bg-muted/20 border-t border-border/50 scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <TrendingUp className="size-3 text-blue-500" />
            <span>CAREER PATHWAYS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            แนวทางการประกอบอาชีพ
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            สายอาชีพที่รองรับบัณฑิตสาขาวิชาเทคโนโลยีสารสนเทศ คณะวิทยาศาสตร์และเทคโนโลยี
            มหาวิทยาลัยราชภัฏนครศรีธรรมราช ตามข้อมูลโครงสร้างหลักสูตรทางการ
          </p>
        </div>

        {/* 8 Official Career Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {careers.map((career) => (
            <div
              key={career.titleEn}
              className="p-5 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-sm hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="size-10 rounded-xl bg-muted/80 flex items-center justify-center">
                    {getIcon(career.icon)}
                  </div>
                  {career.highlight && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      {career.highlight}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-foreground mb-0.5">
                  {career.title}
                </h3>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium block mb-2.5">
                  {career.titleEn}
                </span>

                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {career.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1">
                  {career.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-muted/80 text-muted-foreground border border-border/40"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
