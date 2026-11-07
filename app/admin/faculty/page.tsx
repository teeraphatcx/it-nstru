"use client";

import {
  Check,
  Edit2,
  Plus,
  RefreshCw,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type FacultyItem = {
  id: number;
  name: string;
  rank: string;
  position: string;
  degree: string;
  specialty: string; // JSON array string
  email: string;
  image: string;
  portfolio: string;
  scholar: string;
  gender: string;
  sortOrder: number;
};

export default function AdminFacultyPage() {
  const [items, setItems] = useState<FacultyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FacultyItem | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [rank, setRank] = useState("");
  const [position, setPosition] = useState("");
  const [degree, setDegree] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [scholar, setScholar] = useState("");
  const [gender, setGender] = useState("male");
  const [sortOrder, setSortOrder] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchFaculty = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/faculty");
      if (res.ok) {
        setItems(await res.json());
      } else {
        toast.error("ไม่สามารถดึงข้อมูลคณาจารย์ได้");
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการโหลดข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaculty();
  }, []);

  const openAddModal = () => {
    setEditingItem(null);
    setName("");
    setRank("");
    setPosition("");
    setDegree("");
    setSpecialty("");
    setEmail("");
    setImage("");
    setPortfolio("");
    setScholar("");
    setGender("male");
    setSortOrder(0);
    setModalOpen(true);
  };

  const openEditModal = (item: FacultyItem) => {
    setEditingItem(item);
    setName(item.name);
    setRank(item.rank);
    setPosition(item.position);
    setDegree(item.degree);
    try {
      const parsed = JSON.parse(item.specialty);
      setSpecialty(Array.isArray(parsed) ? parsed.join(", ") : item.specialty);
    } catch {
      setSpecialty(item.specialty);
    }
    setEmail(item.email);
    setImage(item.image);
    setPortfolio(item.portfolio);
    setScholar(item.scholar);
    setGender(item.gender || "male");
    setSortOrder(item.sortOrder ?? 0);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("กรุณากรอกชื่อให้ครบถ้วน");
      return;
    }

    setSubmitting(true);
    try {
      const specialtyArray = specialty
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        name: name.trim(),
        rank: rank.trim(),
        position: position.trim(),
        degree: degree.trim(),
        specialty: specialtyArray,
        email: email.trim(),
        image: image.trim(),
        portfolio: portfolio.trim(),
        scholar: scholar.trim(),
        gender,
        sortOrder,
      };

      if (editingItem) {
        // Update
        const res = await fetch("/api/admin/faculty", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingItem.id, ...payload }),
        });

        if (res.ok) {
          toast.success("บันทึกการแก้ไขเรียบร้อยแล้ว");
          setModalOpen(false);
          fetchFaculty();
        } else {
          toast.error("เกิดข้อผิดพลาดในการแก้ไข");
        }
      } else {
        // Create
        const res = await fetch("/api/admin/faculty", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          toast.success("เพิ่มข้อมูลคณาจารย์สำเร็จ!");
          setModalOpen(false);
          fetchFaculty();
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

  const handleDelete = async (id: number, itemName: string) => {
    if (!confirm(`คุณต้องการลบ "${itemName}" หรือไม่?`)) return;

    try {
      const res = await fetch(`/api/admin/faculty?id=${id}`, {
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

  const parseSpecialty = (raw: string): string[] => {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : raw.split(",").map((s) => s.trim());
    } catch {
      return raw ? raw.split(",").map((s) => s.trim()) : [];
    }
  };

  const filteredItems = items.filter((item) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.rank.toLowerCase().includes(q) ||
      item.position.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.specialty.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="size-6 text-blue-600" />
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              จัดการคณาจารย์และบุคลากร (Faculty Management)
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            เพิ่ม แก้ไข และลบข้อมูลคณาจารย์และบุคลากรในภาควิชา
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={fetchFaculty}
            disabled={loading}
            className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-colors"
            title="รีเฟรชข้อมูล"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-95"
          >
            <Plus className="size-4" />
            <span>เพิ่มบุคลากรใหม่</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-2">
        <Search className="size-4 text-slate-400 ml-2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ค้นหาตามชื่อ, ตำแหน่ง, ยศ, อีเมล, หรือความเชี่ยวชาญ..."
          className="w-full bg-transparent text-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none"
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="p-1 text-slate-400 hover:text-slate-600"
          >
            <X className="size-3.5" />
          </button>
        )}
      </div>

      {/* Faculty Card Grid */}
      <div>
        {loading ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm py-12 text-center text-slate-400">
            <RefreshCw className="size-5 animate-spin mx-auto mb-2 text-blue-500" />
            กำลังโหลดข้อมูลคณาจารย์...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm py-12 text-center text-slate-400 text-xs">
            ไม่พบข้อมูลที่ตรงกับคำค้นหา
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredItems.map((item) => {
              const specialties = parseSpecialty(item.specialty);
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
                >
                  {/* Photo & Name */}
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-12 rounded-full object-cover border-2 border-slate-100 dark:border-slate-800"
                        />
                      ) : (
                        <div className="size-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                          <Users className="size-5 text-slate-400" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[10px] font-semibold border border-blue-100 dark:border-blue-900/40">
                        {item.rank || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Position & Email */}
                  <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                    {item.position && (
                      <p className="truncate">
                        <span className="font-medium text-slate-500 dark:text-slate-400">ตำแหน่ง:</span>{" "}
                        {item.position}
                      </p>
                    )}
                    {item.email && (
                      <p className="truncate">
                        <span className="font-medium text-slate-500 dark:text-slate-400">อีเมล:</span>{" "}
                        {item.email}
                      </p>
                    )}
                  </div>

                  {/* Specialty Tags */}
                  {specialties.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {specialties.slice(0, 4).map((tag, i) => (
                        <span
                          key={i}
                          className="px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[10px] border border-emerald-100 dark:border-emerald-900/40"
                        >
                          {tag}
                        </span>
                      ))}
                      {specialties.length > 4 && (
                        <span className="text-[10px] text-slate-400">
                          +{specialties.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-1 pt-2 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                      title="แก้ไข"
                    >
                      <Edit2 className="size-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item.id, item.name)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                      title="ลบ"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal Dialog for Add / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Users className="size-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {editingItem ? "แก้ไขข้อมูลบุคลากร" : "เพิ่มบุคลากรใหม่"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row: Name & Rank */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    ชื่อ-นามสกุล (Name) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="เช่น ผศ.ดร.สมชาย ใจดี"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    ตำแหน่งวิชาการ (Rank)
                  </label>
                  <input
                    type="text"
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                    placeholder="เช่น ผู้ช่วยศาสตราจารย์, รองศาสตราจารย์"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row: Position & Degree */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    ตำแหน่งบริหาร (Position)
                  </label>
                  <input
                    type="text"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="เช่น หัวหน้าภาควิชา, รองคณบดี"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    วุฒิการศึกษา (Degree)
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="เช่น Ph.D. Computer Science"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Specialty */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  ความเชี่ยวชาญ (Specialty - คั่นด้วยเครื่องหมายจุลภาค ,)
                </label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  placeholder="เช่น Machine Learning, Data Science, AI"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-[10px] text-slate-400">
                  ระบุความเชี่ยวชาญหลายรายการโดยคั่นด้วยเครื่องหมาย ,
                </span>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  อีเมล (Email)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="เช่น somchai@example.ac.th"
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Row: Image URL & Portfolio URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    URL รูปภาพ (Image URL)
                  </label>
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    placeholder="https://example.com/portfolio"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Row: Scholar URL & Gender & Sort Order */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Google Scholar URL
                  </label>
                  <input
                    type="url"
                    value={scholar}
                    onChange={(e) => setScholar(e.target.value)}
                    placeholder="https://scholar.google.com/..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    เพศ (Gender)
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="male">ชาย (Male)</option>
                    <option value="female">หญิง (Female)</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    ลำดับการแสดง (Sort Order)
                  </label>
                  <input
                    type="number"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(Number(e.target.value))}
                    placeholder="0"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all disabled:opacity-50"
                >
                  <Check className="size-4" />
                  <span>{submitting ? "กำลังบันทึก..." : "บันทึก"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
