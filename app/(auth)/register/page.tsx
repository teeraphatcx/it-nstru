"use client";

import { ArrowRight, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-5 py-4">
      <div className="flex items-center gap-2">
        <ShieldAlert className="size-6 text-amber-500" />
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          ปิดรับการลงทะเบียน
        </h1>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        ระบบปัญญาประดิษฐ์เพื่อการประชาสัมพันธ์ สาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช
        เปิดให้เฉพาะผู้ดูแลระบบ (Admin) เข้าสู่ระบบเท่านั้น ไม่อนุญาตให้บุคคลทั่วไปลงทะเบียน
      </p>

      <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4 text-xs text-amber-700 dark:text-amber-400">
        หากท่านเป็นผู้ดูแลระบบ กรุณาเข้าสู่ระบบด้วยชื่อผู้ใช้บัญชีผู้ดูแลระบบ (Admin)
      </div>

      <Link
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-150"
        href="/login"
      >
        <span>ไปที่หน้าเข้าสู่ระบบ (Admin Login)</span>
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
