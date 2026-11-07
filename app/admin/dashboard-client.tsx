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
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type AdminStats = {
  knowledgeCount: number;
  newsCount: number;
  logsCount: number;
  facultyCount?: number;
  dbPath: string;
};

export type KnowledgeItem = {
  id: number;
  topic: string;
  keywords: string;
  response: string;
  updatedAt: string;
};

export type ChatLogItem = {
  id: number;
  userQuestion: string;
  botAnswer: string;
  matchedTopic?: string;
  createdAt: string;
};

export function AdminDashboardClient({
  initialStats,
  initialKnowledge,
  initialLogs,
}: {
  initialStats: AdminStats;
  initialKnowledge: KnowledgeItem[];
  initialLogs: ChatLogItem[];
}) {
  const [stats, setStats] = useState<AdminStats>(initialStats);
  const [recentKnowledge, setRecentKnowledge] =
    useState<KnowledgeItem[]>(initialKnowledge);
  const [recentLogs, setRecentLogs] = useState<ChatLogItem[]>(initialLogs);
  const [loading, setLoading] = useState(false);

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
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold backdrop-blur-md transition-colors cursor-pointer"
          >
            <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>รีเฟรชข้อมูล</span>
          </button>
          <Link
            href="/admin/knowledge"
            prefetch={true}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 text-xs font-semibold shadow-md transition-all active:scale-95"
          >
            <Plus className="size-3.5" />
            <span>เพิ่มคลังความรู้ใหม่</span>
          </Link>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Knowledge Topics */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              หัวข้อคลังความรู้ AI
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {stats.knowledgeCount}
            </div>
            <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              พร้อมตอบคำถามอัตโนมัติ
            </span>
          </div>
          <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
            <BookOpen className="size-6" />
          </div>
        </div>

        {/* Card 2: Faculty */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              คณาจารย์ & บุคลากร
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {stats.facultyCount ?? 8}
            </div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              ข้อมูลแสดงหน้าบ้าน
            </span>
          </div>
          <div className="size-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 flex items-center justify-center">
            <Users className="size-6" />
          </div>
        </div>

        {/* Card 3: News Items */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              ข่าวสาร & ประชาสัมพันธ์
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {stats.newsCount}
            </div>
            <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium">
              โพสต์ข่าวที่เผยแพร่
            </span>
          </div>
          <div className="size-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 flex items-center justify-center">
            <Newspaper className="size-6" />
          </div>
        </div>

        {/* Card 4: Chat Logs */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              ประวัติการถาม AI ทั้งหมด
            </span>
            <div className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-100 mt-1">
              {stats.logsCount}
            </div>
            <span className="text-[11px] text-purple-600 dark:text-purple-400 font-medium">
              การสนทนาจากหน้าบ้าน
            </span>
          </div>
          <div className="size-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
            <MessageSquare className="size-6" />
          </div>
        </div>
      </div>

      {/* Grid: Recent Knowledge & Real-time Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Box 1: Recent Knowledge Topics */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4.5 text-blue-600" />
              <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                หัวข้อคลังความรู้ AI ล่าสุด
              </h3>
            </div>
            <Link
              href="/admin/knowledge"
              prefetch={true}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1"
            >
              <span>ดูทั้งหมด</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentKnowledge.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                ยังไม่มีข้อมูลคลังความรู้
              </p>
            ) : (
              recentKnowledge.map((item) => {
                let kw: string[] = [];
                try {
                  kw = JSON.parse(item.keywords);
                } catch {
                  kw = item.keywords.split(",");
                }

                return (
                  <div key={item.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-200">
                        {item.topic}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        #{item.id}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {kw.slice(0, 4).map((k, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Box 2: Recent User Inquiries */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="size-4.5 text-purple-600" />
              <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                ประวัติคำถามจากหน้าบ้าน (ล่าสุด)
              </h3>
            </div>
            <Link
              href="/admin/logs"
              prefetch={true}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 dark:text-purple-400 flex items-center gap-1"
            >
              <span>ดูทั้งหมด</span>
              <ArrowRight className="size-3" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentLogs.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                ยังไม่มีประวัติการถามตอบจากผู้ใช้งาน
              </p>
            ) : (
              recentLogs.map((log) => (
                <div key={log.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 truncate max-w-[280px]">
                      &ldquo;{log.userQuestion}&rdquo;
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-medium">
                      {log.matchedTopic || "หัวข้อทั่วไป"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {log.botAnswer}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

