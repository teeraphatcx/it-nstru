"use client";

import {
  BookOpen,
  Check,
  Edit2,
  Plus,
  RefreshCw,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

type KnowledgeItem = {
  id: number;
  topic: string;
  keywords: string;
  response: string;
  followUps: string;
  updatedAt: string;
};

export default function AdminKnowledgePage() {
  const [items, setItems] = useState<KnowledgeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<KnowledgeItem | null>(null);

  // Form State
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [response, setResponse] = useState("");
  const [followUps, setFollowUps] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchKnowledge = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/knowledge");
      if (res.ok) {
        setItems(await res.json());
      } else {
        toast.error("ไม่สามารถดึงข้อมูลคลังความรู้ได้");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKnowledge();
  }, [fetchKnowledge]);

  const openAddModal = () => {
    setEditingItem(null);
    setTopic("");
    setKeywords("");
    setResponse("");
    setFollowUps("");
    setModalOpen(true);
  };

  const openEditModal = (item: KnowledgeItem) => {
    setEditingItem(item);
    setTopic(item.topic);
    try {
      const parsedKw = JSON.parse(item.keywords);
      setKeywords(
        Array.isArray(parsedKw) ? parsedKw.join(", ") : item.keywords
      );
    } catch {
      setKeywords(item.keywords);
    }
    setResponse(item.response);
    try {
      const parsedFu = JSON.parse(item.followUps);
      setFollowUps(
        Array.isArray(parsedFu) ? parsedFu.join(", ") : item.followUps
      );
    } catch {
      setFollowUps(item.followUps);
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim() || !response.trim()) {
      toast.error("กรุณากรอกหัวข้อและคำตอบให้ครบถ้วน");
      return;
    }

    setSubmitting(true);
    try {
      const kwArray = keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean);
      const fuArray = followUps
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      if (editingItem) {
        // Update
        const res = await fetch("/api/admin/knowledge", {
          body: JSON.stringify({
            followUps: fuArray,
            id: editingItem.id,
            keywords: kwArray,
            response: response.trim(),
            topic: topic.trim(),
          }),
          headers: { "Content-Type": "application/json" },
          method: "PUT",
        });

        if (res.ok) {
          toast.success("บันทึกการแก้ไขเรียบร้อยแล้ว");
          setModalOpen(false);
          fetchKnowledge();
        } else {
          toast.error("เกิดข้อผิดพลาดในการแก้ไข");
        }
      } else {
        // Create
        const res = await fetch("/api/admin/knowledge", {
          body: JSON.stringify({
            followUps: fuArray,
            keywords: kwArray,
            response: response.trim(),
            topic: topic.trim(),
          }),
          headers: { "Content-Type": "application/json" },
          method: "POST",
        });

        if (res.ok) {
          toast.success("เพิ่มข้อมูลลงคลังความรู้ SQLite สำเร็จ!");
          setModalOpen(false);
          fetchKnowledge();
        } else {
          toast.error("เกิดข้อผิดพลาดในการเพิ่มข้อมูล");
        }
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number, itemTopic: string) => {
    if (!confirm(`คุณต้องการลบหัวข้อ "${itemTopic}" หรือไม่?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/knowledge?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("ลบข้อมูลเรียบร้อยแล้ว");
        setItems((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error("ไม่สามารถลบข้อมูลได้");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการลบ");
    }
  };

  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase().trim();
    if (!q) {
      return true;
    }
    return (
      item.topic.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q) ||
      item.response.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="size-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              จัดการคลังความรู้ AI (AI Knowledge Base)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            เพิ่ม แก้ไข และลบคำถาม-คำตอบที่ระบบ AI
            ผู้ช่วยหน้าบ้านจะนำไปใช้วิเคราะห์และตอบอัตโนมัติ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors"
            disabled={loading}
            onClick={fetchKnowledge}
            title="รีเฟรชข้อมูล"
            type="button"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95"
            onClick={openAddModal}
            type="button"
          >
            <Plus className="size-4" />
            <span>เพิ่มหัวข้อใหม่</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
        <Search className="size-4 text-slate-400 ml-2" />
        <input
          className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาตามชื่อหัวข้อ, คีย์เวิร์ด, หรือคำตอบ..."
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

      {/* Knowledge Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase tracking-wider font-semibold">
                <th className="py-3 px-4 w-12 text-center">ID</th>
                <th className="py-3 px-4 w-60">ชื่อหัวข้อ (Topic)</th>
                <th className="py-3 px-4 w-64">คำค้นหาที่จับคู่ (Keywords)</th>
                <th className="py-3 px-4">คำตอบที่ AI ใช้ตอบ (Response)</th>
                <th className="py-3 px-4 w-28 text-center">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td className="py-12 text-center text-slate-400" colSpan={5}>
                    <RefreshCw className="size-5 animate-spin mx-auto mb-2 text-blue-500" />
                    กำลังโหลดข้อมูลคลังความรู้จาก SQLite...
                  </td>
                </tr>
              ) : filteredItems.length === 0 ? (
                <tr>
                  <td className="py-12 text-center text-slate-400" colSpan={5}>
                    ไม่พบข้อมูลที่ตรงกับคำค้นหา
                  </td>
                </tr>
              ) : (
                filteredItems.map((item) => {
                  let parsedKeywords: string[] = [];
                  try {
                    parsedKeywords = JSON.parse(item.keywords);
                  } catch {
                    parsedKeywords = item.keywords.split(",");
                  }

                  return (
                    <tr
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors"
                      key={item.id}
                    >
                      <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-400">
                        #{item.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-100">
                        {item.topic}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {parsedKeywords.slice(0, 5).map((kw) => (
                            <span
                              className="px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] border border-blue-100 dark:border-blue-900/40"
                              key={`${item.id}-${kw}`}
                            >
                              {kw}
                            </span>
                          ))}
                          {parsedKeywords.length > 5 && (
                            <span className="text-[10px] text-slate-400">
                              +{parsedKeywords.length - 5}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        <p className="line-clamp-2 leading-relaxed">
                          {item.response}
                        </p>
                      </td>
                      <td className="py-3 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                            onClick={() => openEditModal(item)}
                            title="แก้ไข"
                            type="button"
                          >
                            <Edit2 className="size-3.5" />
                          </button>
                          <button
                            className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                            onClick={() => handleDelete(item.id, item.topic)}
                            title="ลบ"
                            type="button"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Dialog for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {editingItem
                    ? "แก้ไขหัวข้อคลังความรู้ AI"
                    : "เพิ่มหัวข้อคลังความรู้ AI ใหม่"}
                </h3>
              </div>
              <button
                className="text-slate-400 hover:text-slate-600 p-1"
                onClick={() => setModalOpen(false)}
                type="button"
              >
                <X className="size-5" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="knowledge-topic"
                >
                  ชื่อหัวข้อ (Topic Name) *
                </label>
                <input
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="knowledge-topic"
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="เช่น ค่าธรรมเนียมการศึกษา หรือ คุณสมบัติการรับสมัคร"
                  required
                  type="text"
                  value={topic}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="knowledge-keywords"
                >
                  คำค้นหาที่จับคู่ (Keywords - คั่นด้วยเครื่องหมายจุลภาค ,)
                </label>
                <input
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="knowledge-keywords"
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="เช่น ค่าเทอม, ค่าใช้จ่าย, กี่บาท, กู้กยศ, ทุน"
                  type="text"
                  value={keywords}
                />
                <span className="text-[10px] text-slate-400">
                  เมื่อผู้ใช้พิมพ์ข้อความที่มีคำเหล่านี้ AI จะดึงคำตอบนี้ไปตอบทันที
                </span>
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="knowledge-response"
                >
                  คำตอบที่ AI จะแสดงให้ผู้ใช้งาน (Response) *
                </label>
                <textarea
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
                  id="knowledge-response"
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="ระบุคำตอบที่ต้องการให้ AI ตอบผู้ใช้งานอย่างละเอียด..."
                  required
                  rows={6}
                  value={response}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  className="text-xs font-semibold text-slate-700 dark:text-slate-300"
                  htmlFor="knowledge-follow-ups"
                >
                  ปุ่มคำถามแนะนำต่อเนื่อง (Follow-up Suggestions - คั่นด้วย ,)
                </label>
                <input
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="knowledge-follow-ups"
                  onChange={(e) => setFollowUps(e.target.value)}
                  placeholder="เช่น คุณสมบัติการรับสมัคร?, อาจารย์มีใครบ้าง?, ค่าเทอมเท่าไหร่?"
                  type="text"
                  value={followUps}
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                  onClick={() => setModalOpen(false)}
                  type="button"
                >
                  ยกเลิก
                </button>
                <button
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all disabled:opacity-50"
                  disabled={submitting}
                  type="submit"
                >
                  <Check className="size-4" />
                  <span>{submitting ? "กำลังบันทึก..." : "บันทึกลง SQLite"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
