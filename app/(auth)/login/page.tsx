"use client";

import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";

import { AuthForm } from "@/components/chat/auth-form";
import { SubmitButton } from "@/components/chat/submit-button";
import { toast } from "@/components/chat/toast";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  const { update: updateSession } = useSession();

  const handleSubmit = async (formData: FormData) => {
    if (isSubmitting || isSuccessful) {
      return;
    }

    const rawEmail = String(formData.get("email") ?? "").trim();
    const rawPassword = String(formData.get("password") ?? "").trim();

    setEmail(rawEmail);

    if (!rawEmail || !rawPassword) {
      toast({
        description: "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน",
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await signIn("credentials", {
        email: rawEmail,
        password: rawPassword,
        redirect: false,
      });

      if (res?.error) {
        toast({
          description: "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลอีกครั้ง",
          type: "error",
        });
        setIsSubmitting(false);
        return;
      }

      setIsSuccessful(true);
      toast({
        description: "เข้าสู่ระบบสำเร็จในฐานะผู้ดูแลระบบ (Admin)!",
        type: "success",
      });

      await updateSession();
      router.refresh();

      // นำทางกลับหน้าแรกหรือหน้าระบบ
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    } catch {
      toast({
        description: "เกิดข้อผิดพลาดในการเชื่อมต่อ กรุณาลองใหม่อีกครั้ง",
        type: "error",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          เข้าสู่ระบบผู้ดูแลระบบ
        </h1>
        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-600 border border-blue-500/20">
          <ShieldCheck className="size-3.5 text-blue-600" />
          Admin Only
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        สาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช
      </p>

      <div className="mt-2 rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 text-xs text-blue-700 dark:text-blue-300">
        🔒 สำหรับผู้ดูแลระบบเท่านั้น เข้าสู่ระบบด้วยชื่อผู้ใช้{" "}
        <code className="font-semibold bg-white/80 dark:bg-slate-900 px-1 py-0.5 rounded text-blue-600 dark:text-blue-300">
          itspace
        </code>
      </div>

      <AuthForm
        action={handleSubmit}
        defaultEmail={email}
        label="ชื่อผู้ใช้ (Username)"
        placeholder="itspace"
      >
        <SubmitButton isSuccessful={isSuccessful}>
          {isSubmitting ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </SubmitButton>
        <p className="text-center text-xs text-muted-foreground pt-1">
          ระบบสงวนสิทธิ์การเข้าใช้งานเฉพาะผู้ดูแลระบบ (Admin) เท่านั้น
        </p>
      </AuthForm>
    </>
  );
}
