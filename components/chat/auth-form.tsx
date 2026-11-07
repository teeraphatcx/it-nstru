import Form from "next/form";

import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function AuthForm({
  action,
  children,
  defaultEmail = "",
  label = "ชื่อผู้ใช้ (Username)",
  placeholder = "itspace",
}: {
  action: NonNullable<
    string | ((formData: FormData) => void | Promise<void>) | undefined
  >;
  children: React.ReactNode;
  defaultEmail?: string;
  label?: string;
  placeholder?: string;
}) {
  return (
    <Form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label className="font-normal text-muted-foreground" htmlFor="email">
          {label}
        </Label>
        <Input
          autoComplete="username"
          autoFocus
          className="h-10 rounded-lg border-border/50 bg-muted/50 text-sm transition-colors focus:border-foreground/20 focus:bg-muted"
          defaultValue={defaultEmail}
          id="email"
          name="email"
          placeholder={placeholder}
          required
          type="text"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label className="font-normal text-muted-foreground" htmlFor="password">
          รหัสผ่าน (Password)
        </Label>
        <Input
          autoComplete="current-password"
          className="h-10 rounded-lg border-border/50 bg-muted/50 text-sm transition-colors focus:border-foreground/20 focus:bg-muted"
          id="password"
          name="password"
          placeholder="••••••••"
          required
          type="password"
        />
      </div>

      {children}
    </Form>
  );
}
