"use client";

import { Check, Palette, RefreshCw, Sparkles } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { FestivalOverlay } from "@/components/portal/festival-overlay";
import {
  FESTIVAL_THEMES,
  type FestivalTheme,
  type FestivalThemeId,
  isFestivalThemeId,
} from "@/lib/festival-themes";

function FestivalThemeCard({
  isActive,
  onSelect,
  theme,
}: {
  isActive: boolean;
  onSelect: (id: FestivalThemeId) => void;
  theme: FestivalTheme;
}) {
  const handleClick = useCallback(() => {
    onSelect(theme.id);
  }, [onSelect, theme.id]);

  return (
    <button
      className={`text-left rounded-xl border p-3 transition-all ${
        isActive
          ? "border-violet-500 bg-violet-50 dark:bg-violet-950/40 shadow-sm"
          : "border-slate-200 dark:border-slate-800 hover:border-violet-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
      }`}
      onClick={handleClick}
      type="button"
    >
      <div className="flex items-start justify-between gap-2">
        <span aria-hidden="true" className="text-xl">
          {theme.emoji}
        </span>
        {isActive ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-violet-700 dark:text-violet-300">
            <Check className="size-3" />
            ที่เลือก
          </span>
        ) : null}
      </div>
      <div className="mt-2 font-semibold text-xs text-slate-900 dark:text-white">
        {theme.nameTh}
      </div>
      <div className="text-[11px] text-slate-500 mt-0.5">
        {theme.description}
      </div>
    </button>
  );
}

export default function AdminThemePage() {
  const [selected, setSelected] = useState<FestivalThemeId>("none");
  const [saved, setSaved] = useState<FestivalThemeId>("none");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchTheme = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/settings");
      if (!res.ok) {
        toast.error("ไม่สามารถโหลดธีมเทศกาลได้");
        return;
      }
      const data = await res.json();
      if (isFestivalThemeId(data.festivalTheme)) {
        setSelected(data.festivalTheme);
        setSaved(data.festivalTheme);
      }
    } catch {
      toast.error("เกิดข้อผิดพลาดในการโหลดธีม");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const loadTheme = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) {
          toast.error("ไม่สามารถโหลดธีมเทศกาลได้");
          return;
        }
        const data = await res.json();
        if (!cancelled && isFestivalThemeId(data.festivalTheme)) {
          setSelected(data.festivalTheme);
          setSaved(data.festivalTheme);
        }
      } catch {
        toast.error("เกิดข้อผิดพลาดในการโหลดธีม");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTheme();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        body: JSON.stringify({ festivalTheme: selected }),
        headers: { "Content-Type": "application/json" },
        method: "PUT",
      });

      if (!res.ok) {
        toast.error("บันทึกธีมไม่สำเร็จ");
        return;
      }

      setSaved(selected);
      toast.success("บันทึกธีมเทศกาลแล้ว แสดงผลที่หน้าแรกของเว็บ");
    } catch {
      toast.error("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setSaving(false);
    }
  };

  const current = FESTIVAL_THEMES.find((theme) => theme.id === selected);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-500 p-6 sm:p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-xs font-medium border border-white/20">
              <Palette className="size-3.5" />
              <span>ธีมเทศกาลหน้าแรก</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              กำหนดอนิเมชันตามเทศกาล
            </h1>
            <p className="text-sm text-violet-50 max-w-2xl">
              เลือกธีมเทศกาลเพื่อแสดงอนิเมชันบนหน้าแรกของเว็บเท่านั้น
              เมื่อผู้เยี่ยมชมเปิดเว็บจะเห็นหน้าแรกพร้อมเอฟเฟกต์ที่เลือก
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold"
              disabled={loading}
              onClick={fetchTheme}
              type="button"
            >
              <RefreshCw
                className={`size-3.5 ${loading ? "animate-spin" : ""}`}
              />
              รีเฟรช
            </button>
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-violet-700 hover:bg-violet-50 text-xs font-semibold shadow-md disabled:opacity-60"
              disabled={saving || selected === saved}
              onClick={handleSave}
              type="button"
            >
              <Check className="size-3.5" />
              {saving ? "กำลังบันทึก..." : "บันทึกธีม"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="size-4 text-violet-600" />
            <h2 className="font-bold text-sm">เลือกเทศกาลทั้งหมด</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {FESTIVAL_THEMES.map((theme) => (
              <FestivalThemeCard
                isActive={selected === theme.id}
                key={theme.id}
                onSelect={setSelected}
                theme={theme}
              />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="font-bold text-sm mb-2">ตัวอย่างอนิเมชัน</h2>
            <p className="text-xs text-slate-500 mb-3">
              {current?.nameTh} • แสดงเฉพาะหน้าแรกของเว็บ
            </p>
            <div className="relative h-56 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-100 dark:from-slate-800 dark:to-slate-950">
              <FestivalOverlay compact previewId={selected} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="rounded-xl bg-white/85 dark:bg-slate-900/85 backdrop-blur px-4 py-3 text-center shadow-sm">
                  <div className="text-2xl">{current?.emoji}</div>
                  <div className="text-xs font-semibold mt-1">
                    {current?.nameTh}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
