"use client";

import {
  BookOpen,
  Bot,
  ExternalLink,
  Globe,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Newspaper,
  Palette,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { guestRegex } from "@/lib/constants";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isGuest = !session?.user || guestRegex.test(session?.user?.email ?? "");
  const isAdmin = Boolean(session?.user && !isGuest);

  // If on login page, render without sidebar shell
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && status === "unauthenticated") {
      router.push("/admin/login");
    }
  }, [isLoginPage, status, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    {
      active: pathname === "/admin",
      href: "/admin",
      icon: LayoutDashboard,
      title: "ภาพรวมหลังบ้าน",
    },
    {
      active: pathname === "/admin/knowledge",
      href: "/admin/knowledge",
      icon: BookOpen,
      title: "จัดการคลังความรู้ AI",
    },
    {
      active: pathname === "/admin/news",
      href: "/admin/news",
      icon: Newspaper,
      title: "จัดการข่าวสาร & ประกาศ",
    },
    {
      active: pathname === "/admin/faculty",
      href: "/admin/faculty",
      icon: Users,
      title: "จัดการคณาจารย์",
    },
    {
      active: pathname === "/admin/theme",
      href: "/admin/theme",
      icon: Palette,
      title: "ธีมเทศกาลหน้าแรก",
    },
    {
      active: pathname === "/admin/logs",
      href: "/admin/logs",
      icon: MessageSquare,
      title: "ประวัติการถาม AI (Logs)",
    },
    {
      active: pathname.startsWith("/chat"),
      href: "/chat",
      icon: Bot,
      title: "ทดสอบสนทนา AI Live",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row text-slate-800 dark:text-slate-100">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0 select-none">
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <Link className="flex items-center gap-2.5 group" href="/admin">
            <div className="size-9 rounded-xl overflow-hidden p-[1px] bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-md shadow-blue-500/20 shrink-0">
              <img
                alt="IT Logo"
                className="w-full h-full object-cover rounded-[10px] bg-white"
                src="/logo.jpg"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm tracking-tight leading-none group-hover:text-blue-600 transition-colors">
                IT Backoffice
              </span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-1">
                ระบบจัดการหลังบ้าน
              </span>
            </div>
          </Link>
        </div>

        {/* Admin Profile Box */}
        <div className="p-4 mx-3 my-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center gap-3">
          <div className="size-9 rounded-lg overflow-hidden shrink-0 border border-blue-200 dark:border-blue-800 shadow-xs">
            <img
              alt="Admin"
              className="w-full h-full object-cover"
              src="/logo.jpg"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold text-blue-900 dark:text-blue-200 truncate">
              {session?.user?.name || "ผู้ดูแลระบบ"}
            </span>
            <span className="text-[11px] text-blue-700 dark:text-blue-400">
              itspace (Admin)
            </span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1.5">
            เมนูจัดการระบบ
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 active:scale-98 cursor-pointer ${
                  item.active
                    ? "bg-blue-600 text-white shadow-sm shadow-blue-500/30 font-semibold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                <Icon
                  className={`size-4 ${item.active ? "text-white" : "text-slate-400"}`}
                />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1">
          <Link
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            href="/"
            target="_blank"
          >
            <span className="flex items-center gap-2">
              <Globe className="size-4 text-emerald-500" />
              <span>ดูหน้าบ้าน (เว็บไซต์)</span>
            </span>
            <ExternalLink className="size-3.5 opacity-60" />
          </Link>

          <button
            className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            onClick={() => signOut({ redirectTo: "/" })}
            type="button"
          >
            <LogOut className="size-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                SQLite Online
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                chatbot.sqlite
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors"
              href="/"
              target="_blank"
            >
              <Globe className="size-3.5 text-blue-500" />
              <span>หน้าบ้าน</span>
              <ExternalLink className="size-3 opacity-60" />
            </Link>

            <button
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg border border-rose-200 dark:border-rose-900/40 transition-colors"
              onClick={() => signOut({ redirectTo: "/" })}
              type="button"
            >
              <LogOut className="size-3.5" />
              <span className="hidden sm:inline">ออกจากระบบ</span>
            </button>
          </div>
        </header>

        {/* Mobile Nav Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={true}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-blue-600 text-white font-semibold"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  <Icon className="size-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Toaster position="top-center" theme="system" />
          {children}
        </main>
      </div>
    </div>
  );
}
