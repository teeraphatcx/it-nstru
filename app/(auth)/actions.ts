"use server";

import { z } from "zod";

import { signIn } from "./auth";

const authFormSchema = z.object({
  email: z.string().min(1, "กรุณากรอกชื่อผู้ใช้"),
  password: z.string().min(1, "กรุณากรอกรหัสผ่าน"),
});

export type LoginActionState = {
  status: "idle" | "in_progress" | "success" | "failed" | "invalid_data";
};

export const login = async (
  _: LoginActionState,
  formData: FormData
): Promise<LoginActionState> => {
  try {
    const validatedData = authFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const email = validatedData.email.trim();
    const password = validatedData.password.trim();

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { status: "success" };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { status: "invalid_data" };
    }

    return { status: "failed" };
  }
};

export type RegisterActionState = {
  status:
    | "idle"
    | "in_progress"
    | "success"
    | "failed"
    | "user_exists"
    | "invalid_data";
};

export const register = async (
  _: RegisterActionState,
  _formData: FormData
): Promise<RegisterActionState> => {
  // ระบบปิดรับการลงทะเบียนบุคคลทั่วไป อนุญาตเฉพาะแอดมินเท่านั้น
  return { status: "failed" };
};
