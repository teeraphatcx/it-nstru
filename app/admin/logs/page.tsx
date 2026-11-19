"use client";

import { Clock, MessageSquare, RefreshCw, Search, User, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type ChatLogItem = {
  id: number;
  userQuestion: string;
  botAnswer: string;
  matchedTopic?: string;
  createdAt: string;
};

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<ChatLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/logs?limit=100");
      if (res.ok) {
        setLogs(await res.json());
      }
    } catch {
      toast.error("ไม่สามารถโหลดประวัติการสนทนาได้");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const filteredLogs = logs.filter((log) => {
    const q = search.toLowerCase().trim();
    if (!q) {
      return true;
    }
    return (
      log.userQuestion.toLowerCase().includes(q) ||
      log.botAnswer.toLowerCase().includes(q) ||
      log.matchedTopic?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <MessageSquare className="size-6 text-cyan-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              ประวัติการสนทนา AI (AI Chat Logs)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            ดูคำถามจริงที่ผู้เยี่ยมชมสอบถามเข้ามาที่แชทบอทหน้าบ้าน
            เพื่อนำไปปรับปรุงคลังความรู้เพิ่มเติม
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 transition-colors"
          disabled={loading}
          onClick={fetchLogs}
          type="button"
        >
          <RefreshCw className={`size-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>รีเฟรชประวัติ</span>
        </button>
      </div>

      {/* Search */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
        <Search className="size-4 text-slate-400 ml-2" />
        <input
          className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาข้อความคำถาม หรือคำตอบ..."
          type="text"
          value={search}
        />
        {search && (
          <button
            className="p-1 text-slate-400 hover:text-slate-600"
            onClick={() => setSearch("")}
            type="button"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Logs List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm divide-y divide-slate-100 dark:divide-slate-800">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-400">
            <RefreshCw className="size-5 animate-spin mx-auto mb-2 text-cyan-500" />
            กำลังโหลดบันทึกการสนทนา...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-400">
            {logs.length === 0
              ? "ยังไม่มีประวัติการสนทนาบันทึกไว้ในระบบ"
              : "ไม่พบข้อความที่ตรงกับการค้นหา"}
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              className="p-4 sm:p-5 space-y-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
              key={log.id}
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-semibold px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px]">
                    {log.matchedTopic || "คำถามทั่วไป"}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    Log #{log.id}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="size-3" />
                  <span>
                    {new Date(log.createdAt).toLocaleString("th-TH", {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </div>

              {/* User Question */}
              <div className="flex items-start gap-2.5">
                <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-600 dark:text-slate-300">
                  <User className="size-3.5" />
                </div>
                <div className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                  {log.userQuestion}
                </div>
              </div>

              {/* Bot Answer */}
              <div className="flex items-start gap-2.5 pl-4 sm:pl-8">
                <div className="text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60 w-full whitespace-pre-line leading-relaxed">
                  {log.botAnswer}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
