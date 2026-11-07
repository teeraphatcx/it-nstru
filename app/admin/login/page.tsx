"use client";

import { ArrowLeft, Lock, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { guestRegex } from "@/lib/constants";

export default function AdminLoginPage() {
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isGuest = !session?.user || guestRegex.test(session?.user?.email ?? "");
  const isAdmin = Boolean(session?.user && !isGuest);

  useEffect(() => {
    if (isAdmin) {
      router.push("/admin");
    }
  }, [isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const u = username.trim();
    const p = password.trim();

    if (!u || !p) {
      toast.error("กรุณากรอกชื่อผู้ใช้และรหัสผ่าน");
      return;
    }

    const normU = u.toLowerCase();
    const isAllowedUser =
      normU === "itspace" ||
      normU === "itspace@nstru.ac.th" ||
      normU === "itspace@chatbot.local";
    const isAllowedPass = p === "ispace123456" || p === "itspace123456";

    if (!isAllowedUser || !isAllowedPass) {
      toast.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง! (อนุญาตเฉพาะแอดมิน itspace)");
      return;
    }

    setSubmitting(true);
    try {
      const res = await signIn("credentials", {
        email: u,
        password: p,
        redirect: false,
      });

      if (res?.error) {
        toast.error("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
        setSubmitting(false);
        return;
      }

      toast.success("เข้าสู่ระบบหลังบ้านสำเร็จ!");
      window.location.replace("/admin");
    } catch {
      toast.error("เกิดข้อผิดพลาดในการเชื่อมต่อ");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-600/20 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      {/* Back to Frontend Button */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-medium backdrop-blur-md transition-colors"
        >
          <ArrowLeft className="size-3.5" />
          <span>กลับไปหน้าบ้าน (เว็บไซต์)</span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-slate-800/90 border border-slate-700 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="size-16 rounded-2xl p-1 bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-xl shadow-blue-500/30 mx-auto overflow-hidden">
            <img
              src="/logo.jpg"
              alt="IT NSTRU"
              className="w-full h-full object-cover rounded-xl bg-white"
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            เข้าสู่ระบบหลังบ้าน (Admin)
          </h1>
          <p className="text-xs text-slate-400">
            ระบบบริหารจัดการคลังความรู้ AI • สาขา IT มรภ.นครศรีธรรมราช
          </p>
        </div>

        {/* Credentials Notice Box */}
        <div className="p-3.5 rounded-2xl bg-blue-950/60 border border-blue-800/50 text-xs text-blue-200 space-y-1">
          <div className="font-semibold flex items-center gap-1.5 text-blue-300">
            <Lock className="size-3.5" />
            <span>สิทธิ์เข้าใช้งานเฉพาะแอดมิน:</span>
          </div>
          <div className="text-[11px] text-blue-300/80">
            ชื่อผู้ใช้: <code className="bg-blue-900/80 px-1 py-0.5 rounded text-white font-mono">itspace</code>
            {" | "}
            รหัสผ่าน: <code className="bg-blue-900/80 px-1 py-0.5 rounded text-white font-mono">ispace123456</code>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              ชื่อผู้ใช้ (Username)
            </label>
            <input
              type="text"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="itspace"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              รหัสผ่าน (Password)
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-700 bg-slate-900/80 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-sans"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white text-sm font-semibold shadow-lg shadow-blue-500/25 transition-all duration-150 disabled:opacity-50 active:scale-98 mt-2 cursor-pointer flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="size-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                <span>กำลังเข้าสู่ระบบหลังบ้าน...</span>
              </>
            ) : (
              "เข้าสู่ระบบจัดการหลังบ้าน"
            )}
          </button>
        </form>

        <div className="pt-2 text-center">
          <span className="text-[11px] text-slate-500">
            ฐานข้อมูลระบบ: SQLite Local Database (chatbot.sqlite)
          </span>
        </div>
      </div>
    </div>
  );
}

