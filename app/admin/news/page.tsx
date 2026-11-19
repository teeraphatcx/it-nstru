"use client";

import {
  ExternalLink,
  Newspaper,
  Plus,
  RefreshCw,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type NewsItem = {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
  author: string;
  linkUrl?: string;
};

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("ข่าวสาร");
  const [linkUrl, setLinkUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/news");
      if (res.ok) {
        setNews(await res.json());
      }
    } catch {
      toast.error("ไม่สามารถโหลดข่าวสารได้");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("กรุณากรอกหัวข้อและเนื้อหาข่าว");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/news", {
        body: JSON.stringify({
          category,
          content: content.trim(),
          linkUrl: linkUrl.trim(),
          title: title.trim(),
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (res.ok) {
        toast.success("เพิ่มข่าวสารลงฐานข้อมูลเรียบร้อยแล้ว");
        setTitle("");
        setContent("");
        setLinkUrl("");
        setModalOpen(false);
        fetchNews();
      } else {
        toast.error("เกิดข้อผิดพลาดในการบันทึกข่าวสาร");
      }
    } catch {
      toast.error("ไม่สามารถเชื่อมต่อระบบได้");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, itemTitle: string) => {
    if (!confirm(`คุณต้องการลบข่าว "${itemTitle}" หรือไม่?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/news?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("ลบข่าวสารเรียบร้อยแล้ว");
        setNews((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error("ไม่สามารถลบข่าวสารได้");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการลบ");
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Newspaper className="size-6 text-indigo-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              จัดการข่าวสาร & ประกาศ (News & Announcements)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            เพิ่มและจัดการข่าวสาร กิจกรรม และประกาศสำคัญที่จะนำไปแสดงบนหน้าบ้าน
          </p>
        </div>

        <button
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all active:scale-95"
          onClick={() => setModalOpen(true)}
          type="button"
        >
          <Plus className="size-4" />
          <span>เพิ่มข่าวใหม่</span>
        </button>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-xs text-slate-400">
            <RefreshCw className="size-5 animate-spin mx-auto mb-2 text-indigo-500" />
            กำลังโหลดข้อมูลข่าวสาร...
          </div>
        ) : news.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-slate-400">
            ยังไม่มีข่าวสารในระบบ
          </div>
        ) : (
          news.map((item) => (
            <div
              className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between gap-4 hover:shadow-md transition-shadow"
              key={item.id}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/40">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {item.date}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {item.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                {item.linkUrl ? (
                  <a
                    className="text-xs font-medium text-indigo-600 hover:underline flex items-center gap-1"
                    href={item.linkUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span>ลิงก์อ่านต่อ</span>
                    <ExternalLink className="size-3" />
                  </a>
                ) : (
                  <span className="text-[11px] text-slate-400">
                    โพสต์โดย {item.author}
                  </span>
                )}
                <button
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  onClick={() => handleDelete(item.id, item.title)}
                  title="ลบข่าว"
                  type="button"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add News Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                เพิ่มข่าวสารและประกาศใหม่
              </h3>
              <button
                className="text-slate-400 hover:text-slate-600 p-1"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                <X className="size-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1">
                <label
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="news-title"
                >
                  หัวข้อข่าวสาร *
                </label>
                <input
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="news-title"
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="เช่น เปิดรับสมัครนักศึกษาใหม่ รอบ TCAS"
                  required
                  type="text"
                  value={title}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    htmlFor="news-category"
                  >
                    หมวดหมู่
                  </label>
                  <select
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="news-category"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option value="รับสมัคร">รับสมัคร</option>
                    <option value="กิจกรรม">กิจกรรม</option>
                    <option value="ผลงาน">ผลงาน</option>
                    <option value="ทั่วไป">ทั่วไป</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label
                    className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                    htmlFor="news-link"
                  >
                    ลิงก์ภายนอก (ถ้ามี)
                  </label>
                  <input
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    id="news-link"
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="https://..."
                    type="url"
                    value={linkUrl}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="news-content"
                >
                  เนื้อหาข่าวสาร *
                </label>
                <textarea
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  id="news-content"
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="รายละเอียดข่าวสารหรือประกาศ..."
                  required
                  rows={4}
                  value={content}
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                  onClick={() => setModalOpen(false)}
                  type="button"
                >
                  ยกเลิก
                </button>
                <button
                  className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md disabled:opacity-50"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? "กำลังบันทึก..." : "บันทึกข่าวสาร"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
