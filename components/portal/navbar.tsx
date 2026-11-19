"use client";

import {
  LogOut,
  Menu,
  MessageSquare,
  Moon,
  ShieldCheck,
  Sun,
  X,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { guestRegex } from "@/lib/constants";

export function PortalNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = useSession();

  const isGuest = !session?.user || guestRegex.test(session?.user?.email ?? "");
  const isAdmin = Boolean(session?.user && !isGuest);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks: { href: string; label: string; badge?: string }[] = [
    { href: "#hero", label: "หน้าแรก" },
    { href: "#facebook", label: "ข่าวสาร & เพจ" },
    { href: "#curriculum", label: "หลักสูตร IT" },
    { href: "#careers", label: "เส้นทางอาชีพ" },
    { href: "#personnel", label: "คณาจารย์" },
    { href: "#contact", label: "ติดต่อเรา" },
  ];

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-blue-100 shadow-md shadow-blue-500/5 py-2.5"
          : "bg-white/90 backdrop-blur-sm border-b border-blue-100/60 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link className="flex items-center gap-3 group shrink-0" href="#hero">
            <div className="size-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-md group-hover:scale-105 transition-transform duration-200 overflow-hidden shrink-0">
              <img
                alt="IT NSTRU Logo"
                className="w-full h-full object-cover rounded-[9.5px] bg-white"
                src="/logo.jpg"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm sm:text-base tracking-tight text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  เทคโนโลยีสารสนเทศ
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  IT NSTRU
                </span>
              </div>
              <span className="text-[11px] text-muted-foreground hidden sm:inline">
                มหาวิทยาลัยราชภัฏนครศรีธรรมราช
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                className="px-3 py-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 rounded-lg transition-all duration-150 flex items-center gap-1.5"
                href={link.href}
                key={link.href}
              >
                {link.label}
                {link.badge && (
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-gradient-to-r from-blue-600 to-indigo-600 text-white animate-pulse">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            {mounted && (
              <button
                aria-label="สลับธีม"
                className="size-9 rounded-lg border border-border/60 bg-card/60 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                onClick={toggleTheme}
                type="button"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="size-4 text-amber-400" />
                ) : (
                  <Moon className="size-4 text-blue-500" />
                )}
              </button>
            )}

            {/* Admin or Login Link */}
            {isAdmin ? (
              <div className="hidden sm:flex items-center gap-2">
                <a
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-sm shadow-blue-500/20 transition-all active:scale-95 cursor-pointer"
                  href="/admin"
                >
                  <ShieldCheck className="size-3.5" />
                  <span>ระบบจัดการหลังบ้าน</span>
                </a>
                <Link
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-800 transition-colors"
                  href="/chat"
                  prefetch={true}
                >
                  <MessageSquare className="size-3.5 text-blue-500" />
                  <span>แชท AI</span>
                </Link>
                <div className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900/50">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>แอดมิน itspace</span>
                </div>
                <button
                  className="size-9 rounded-lg border border-border/60 bg-card/60 flex items-center justify-center text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                  onClick={() => signOut({ redirectTo: "/" })}
                  title="ออกจากระบบ"
                  type="button"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            ) : (
              <a
                className="hidden sm:inline-flex items-center gap-1.5 justify-center px-3.5 py-1.5 text-[13px] font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg border border-blue-200 dark:border-blue-900/60 transition-all active:scale-95 shadow-xs cursor-pointer"
                href="/admin/login"
              >
                <ShieldCheck className="size-3.5 text-blue-600" />
                <span>เข้าสู่ระบบแอดมิน (หลังบ้าน)</span>
              </a>
            )}

            {/* Mobile Hamburger Button */}
            <button
              aria-label="Toggle menu"
              className="lg:hidden size-9 rounded-lg border border-border/60 bg-card/60 flex items-center justify-center text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
            >
              {mobileMenuOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-border/60 bg-background/95 backdrop-blur-2xl px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                className="px-3.5 py-2.5 text-sm font-medium text-foreground hover:bg-muted rounded-lg flex items-center justify-between"
                href={link.href}
                key={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-border/60 flex flex-col gap-2">
              {isAdmin ? (
                <>
                  <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-900/50">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="size-4 text-blue-600" />
                      สถานะ: แอดมิน (itspace)
                    </span>
                  </div>
                  <a
                    className="w-full text-center py-2 text-sm font-medium bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white rounded-lg shadow-sm active:scale-98"
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    เข้าสู่ระบบจัดการหลังบ้าน (Admin)
                  </a>
                  <a
                    className="w-full text-center py-2 text-sm font-medium border border-border text-foreground hover:bg-muted rounded-lg active:scale-98"
                    href="/chat"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    ระบบแชท AI Live
                  </a>
                  <button
                    className="w-full text-center py-2 text-sm font-medium border border-red-200 dark:border-red-900/40 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut({ redirectTo: "/" });
                    }}
                    type="button"
                  >
                    ออกจากระบบ
                  </button>
                </>
              ) : (
                <a
                  className="w-full text-center py-2 text-sm font-medium border border-blue-200 dark:border-blue-900/50 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-100 flex items-center justify-center gap-1.5 active:scale-98 cursor-pointer"
                  href="/admin/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <ShieldCheck className="size-4 text-blue-600" />
                  <span>เข้าสู่ระบบแอดมิน (หลังบ้าน)</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
