"use client";

import {
  ArrowRight,
  BookOpen,
  Bot,
  Database,
  ExternalLink,
  MessageSquare,
  Newspaper,
  Plus,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type AdminStats = {
  knowledgeCount: number;
  newsCount: number;
  logsCount: number;
  dbPath: string;
};

type KnowledgeItem = {
  id: number;
  topic: string;
  keywords: string;
  response: string;
  updatedAt: string;
};

type ChatLogItem = {
  id: number;
  userQuestion: string;
  botAnswer: string;
  matchedTopic?: string;
  createdAt: string;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentKnowledge, setRecentKnowledge] = useState<KnowledgeItem[]>([]);
  const [recentLogs, setRecentLogs] = useState<ChatLogItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, knowRes, logsRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/knowledge"),
        fetch("/api/admin/logs?limit=5"),
      ]);

      if (statsRes.ok) setStats(await statsRes.json());
      if (knowRes.ok) {
        const list = await knowRes.json();
        setRecentKnowledge(list.slice(0, 5));
      }
      if (logsRes.ok) setRecentLogs(await logsRes.json());
    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 p-6 sm:p-8 text-white shadow-lg shadow-blue-500/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium border border-white/20">
            <ShieldCheck className="size-3.5" />
            <span>ระบบจัดการหลังบ้าน • สาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            ยินดีต้อนรับสู่ระบบหลังบ้าน (Admin Space)
          </h1>
          <p className="text-sm text-blue-100 max-w-xl">
            จัดการข้อมูลคลังความรู้ AI เพื่อตอบผู้ใช้งานหน้าบ้าน ข่าวสารประชาสัมพันธ์ และตรวจสอบประวัติการสอบถามผ่านฐานข้อมูล SQLite ในตัว
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={fetchData}
            disabled={loading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold backdrop-blur-md transition-colors"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>รีเฟรชข้อมูล</span>
          </button>
          <Link
            href="/"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-700 hover:bg-blue-50 text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            <span>เปิดดูหน้าบ้าน</span>
            <ExternalLink className="size-3.5" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Knowledge Base */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              คลังความรู้ AI (FAQ)
            </span>
            <div className="size-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <BookOpen className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {stats?.knowledgeCount ?? "-"}
            </span>
            <span className="text-xs text-slate-500">หัวข้อข้อมูล</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">พร้อมตอบอัตโนมัติ</span>
            <Link href="/admin/knowledge" className="text-blue-600 hover:underline flex items-center gap-1">
              จัดการ <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Card 2: News & Posts */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              ข่าวสาร & ประกาศ
            </span>
            <div className="size-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
              <Newspaper className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {stats?.newsCount ?? "-"}
            </span>
            <span className="text-xs text-slate-500">รายการข่าว</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500">แสดงผลบนหน้าบ้าน</span>
            <Link href="/admin/news" className="text-indigo-600 hover:underline flex items-center gap-1">
              จัดการ <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Card 3: Inquiries / Chat Logs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              บันทึกการถามตอบ AI
            </span>
            <div className="size-10 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 flex items-center justify-center">
              <MessageSquare className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {stats?.logsCount ?? "0"}
            </span>
            <span className="text-xs text-slate-500">ข้อความบันทึก</span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-500">จากการแชทหน้าบ้าน</span>
            <Link href="/admin/logs" className="text-cyan-600 hover:underline flex items-center gap-1">
              ดูประวัติ <ArrowRight className="size-3" />
            </Link>
          </div>
        </div>

        {/* Card 4: Database Status */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              สถานะฐานข้อมูล
            </span>
            <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <Database className="size-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              SQLite (Local)
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-emerald-600 font-semibold truncate max-w-[150px]" title={stats?.dbPath}>
              chatbot.sqlite
            </span>
            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Recent Knowledge Topics */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="size-5 text-blue-600" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                คลังความรู้ AI ล่าสุด
              </h2>
            </div>
            <Link
              href="/admin/knowledge"
              className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1"
            >
              ดูทั้งหมด <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentKnowledge.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                ยังไม่มีข้อมูลในคลังความรู้
              </div>
            ) : (
              recentKnowledge.map((item) => (
                <div key={item.id} className="py-3 flex items-start justify-between gap-4">
                  <div className="space-y-1 min-w-0">
                    <div className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate">
                      {item.topic}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                      {item.response}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">
                    ID #{item.id}
                  </span>
                </div>
              ))
            )}
          </div>

          <Link
            href="/admin/knowledge"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-blue-300 dark:border-blue-800 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs font-medium transition-colors"
          >
            <Plus className="size-4" />
            <span>เพิ่มหรือแก้ไขข้อมูลคลังความรู้ AI</span>
          </Link>
        </div>

        {/* Right Column: Recent Chat Logs */}
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-5 text-indigo-600" />
              <h2 className="font-bold text-base text-slate-900 dark:text-white">
                คำถามล่าสุดจากผู้ใช้งานหน้าบ้าน
              </h2>
            </div>
            <Link
              href="/admin/logs"
              className="text-xs font-medium text-indigo-600 hover:underline flex items-center gap-1"
            >
              ดูทั้งหมด <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentLogs.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400">
                ยังไม่มีประวัติคำถามจากหน้าบ้าน ลองพิมพ์คุยกับ AI Chatbot ที่หน้าแรกดูสิครับ!
              </div>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="py-3 space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      👤 {log.userQuestion}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(log.createdAt).toLocaleTimeString("th-TH", { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 pl-4">
                    🤖 {log.botAnswer}
                  </div>
                </div>
              ))
            )}
          </div>

          <Link
            href="/chat"
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium transition-colors"
          >
            <Bot className="size-4 text-blue-600" />
            <span>เปิดหน้าต่างทดสอบแชทกับ AI โดยตรง</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

