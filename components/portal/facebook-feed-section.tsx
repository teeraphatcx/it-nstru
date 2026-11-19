"use client";

import {
  Bell,
  CheckCircle2,
  Clock,
  Code2,
  ExternalLink,
  Facebook,
  Heart,
  Layers,
  MessageCircle,
  RefreshCw,
  Share2,
  Sparkles,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import type { FacebookPost } from "@/app/api/facebook/feed/route";

export function FacebookFeedSection() {
  const [activeTab, setActiveTab] = useState<"live" | "cards">("live");
  const [posts, setPosts] = useState<FacebookPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>("เมื่อสักครู่");
  const [showConfigGuide, setShowConfigGuide] = useState<boolean>(false);

  const fetchPosts = useCallback(async (showRefreshAnimation = false) => {
    if (showRefreshAnimation) {
      setIsRefreshing(true);
    }
    try {
      const res = await fetch("/api/facebook/feed");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts || []);
        const now = new Date();
        setLastUpdated(
          `${now.toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })} น.`
        );
      }
    } catch (err) {
      console.error("Failed to load Facebook feed:", err);
    } finally {
      setIsLoading(false);
      if (showRefreshAnimation) {
        setTimeout(() => setIsRefreshing(false), 600);
      }
    }
  }, []);

  useEffect(() => {
    if (activeTab !== "cards") {
      return;
    }

    fetchPosts();
    const interval = setInterval(
      () => {
        fetchPosts();
      },
      3 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, [activeTab, fetchPosts]);

  const formatThaiDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("th-TH", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <section
      className="py-20 md:py-28 relative bg-gradient-to-b from-background via-blue-50/30 to-background dark:via-blue-950/10 border-t border-border/40"
      id="facebook"
    >
      {/* Decorative blurred background shapes */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 blur-3xl -z-10 pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-indigo-500/5 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          {/* Badge with live pulse */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-4 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Facebook className="size-3.5 fill-blue-600 dark:fill-blue-400" />
            <span>FACEBOOK LIVE FEED &bull; อัปเดตสดจากเพจทางการ</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            ข่าวสารและกิจกรรมล่าสุดจากเพจ IT NSTRU
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            เชื่อมต่อข้อมูลตรงกับ Facebook Fanpage สาขาวิชาเทคโนโลยีสารสนเทศ{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              @ITNSTRU
            </span>{" "}
            อัปเดตข้อมูลอัตโนมัติทุกครั้งที่มีการโพสต์ข่าว กิจกรรม และประกาศรับสมัคร
          </p>
        </div>

        {/* Action & Status Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-card border border-border/70 shadow-sm mb-8">
          {/* Tab Selector */}
          <div className="flex items-center p-1 rounded-xl bg-muted/80 border border-border/50 w-full sm:w-auto">
            <button
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "live"
                  ? "bg-white dark:bg-card text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("live")}
              type="button"
            >
              <Facebook className="size-4" />
              <span>ฟีดสดทางการ (Live Feed)</span>
            </button>
            <button
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeTab === "cards"
                  ? "bg-white dark:bg-card text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setActiveTab("cards")}
              type="button"
            >
              <Layers className="size-4" />
              <span>การ์ดข่าวสารระบบ (News Grid)</span>
            </button>
          </div>

          {/* Right info & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            {/* Sync status */}
            <div className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock className="size-3.5 text-blue-500" />
              <span>อัปเดตล่าสุด: {lastUpdated}</span>
            </div>

            {/* Refresh Button */}
            <button
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-foreground hover:bg-muted/80 rounded-xl border border-border/80 transition-all active:scale-95 disabled:opacity-50"
              disabled={isRefreshing}
              onClick={() => fetchPosts(true)}
              title="ซิงค์ข้อมูลใหม่ทันที"
              type="button"
            >
              <RefreshCw
                className={`size-3.5 text-blue-600 dark:text-blue-400 ${
                  isRefreshing ? "animate-spin" : ""
                }`}
              />
              <span>{isRefreshing ? "กำลังซิงค์..." : "ซิงค์ข้อมูลล่าสุด"}</span>
            </button>

            {/* Direct Facebook Link */}
            <a
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-xl shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              href="https://www.facebook.com/ITNSTRU"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Facebook className="size-3.5 fill-current" />
              <span>ไปยังเพจ Facebook</span>
              <ExternalLink className="size-3" />
            </a>
          </div>
        </div>

        {/* TAB 1: Live Facebook Feed */}
        {activeTab === "live" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Facebook Page Plugin Live Embed */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
              <div className="w-full bg-card rounded-2xl border border-blue-200/80 dark:border-blue-900/40 p-4 sm:p-6 shadow-lg shadow-blue-500/5">
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/70">
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-600/20">
                      <Facebook className="size-5 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-foreground">
                          เทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช
                        </h3>
                        <CheckCircle2 className="size-4 text-blue-500 shrink-0 fill-blue-500/10" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        @ITNSTRU &bull; อัปเดตสดจากเซิร์ฟเวอร์ Facebook
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-semibold border border-emerald-500/20">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live Sync
                  </span>
                </div>

                {/* Embedded Live Iframe with fallback */}
                <div className="w-full flex justify-center bg-muted/30 rounded-xl p-2 sm:p-4 overflow-hidden border border-border/40">
                  <iframe
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen={true}
                    className="rounded-lg shadow-sm w-full max-w-[500px]"
                    frameBorder="0"
                    height="700"
                    loading="lazy"
                    scrolling="no"
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FITNSTRU&tabs=timeline&width=500&height=700&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                    style={{
                      border: "none",
                      maxWidth: "100%",
                      overflow: "hidden",
                    }}
                    title="IT NSTRU Facebook Live Feed"
                    width="500"
                  />
                </div>

                {/* Bottom sync note */}
                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="size-3.5 text-amber-500" />
                    ฟีดสดนี้จะแสดงโพสต์ใหม่ของเพจทันทีโดยไม่ต้องรีโหลดหน้าเว็บ
                  </span>
                  <a
                    className="text-blue-600 dark:text-blue-400 font-medium hover:underline inline-flex items-center gap-1"
                    href="https://www.facebook.com/ITNSTRU"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    ดูบนแอป Facebook <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right: Channel Profile & Highlights */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
              {/* Channel Info Card */}
              <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-full pointer-events-none" />
                <div className="flex items-center gap-4 mb-5">
                  <div className="size-14 rounded-2xl overflow-hidden border-2 border-blue-500/30 p-0.5 bg-background shadow-md">
                    <img
                      alt="IT NSTRU"
                      className="w-full h-full object-contain rounded-xl"
                      src="/logo.jpg"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm sm:text-base leading-snug">
                      สาขาวิชาเทคโนโลยีสารสนเทศ
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      มรภ.นครศรีธรรมราช (NSTRU)
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="inline-flex text-[11px] font-semibold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        ผู้ติดตาม 3,400+ คน
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-muted-foreground pt-4 border-t border-border/60">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>ประชาสัมพันธ์กิจกรรมสาขา ข่าวนักศึกษา และผลงานนวัตกรรม</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>แจ้งเตือนกำหนดการรับสมัครนักศึกษาใหม่ และการสอบสัมภาษณ์</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="size-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>
                      ตอบคำถามและให้คำปรึกษาผ่านช่องทาง Facebook Messenger
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  <a
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/40 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold text-xs transition-colors"
                    href="https://www.facebook.com/ITNSTRU"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <Facebook className="size-4 fill-current" />
                    <span>กดถูกใจและติดตามเพจ @ITNSTRU</span>
                  </a>
                </div>
              </div>

              {/* Real-time Sync Explainer Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-500/15">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="size-8 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Bell className="size-4 text-white" />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base">
                    ระบบซิงค์ข้อมูลอัตโนมัติทำงานอย่างไร?
                  </h4>
                </div>
                <p className="text-xs text-blue-100 leading-relaxed mb-4">
                  เว็บไซต์นี้เชื่อมโยงกับ Facebook Platform ของเพจ IT NSTRU โดยตรง
                  เมื่อเพจมีการเผยแพร่โพสต์ใหม่ ระบบจะดึงข้อมูลมาแสดงผลในหน้าเว็บทันที:
                </p>
                <div className="space-y-2.5 text-xs text-white/90">
                  <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                      1
                    </span>
                    <span>แอดมินโพสต์ข่าวบน Facebook Page</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                      2
                    </span>
                    <span>ฟีดสดบนเว็บอัปเดตโพสต์ใหม่ขึ้นบนสุดอัตโนมัติ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="size-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                      3
                    </span>
                    <span>ผู้เยี่ยมชมสามารถกดไลก์ แชร์ และคอมเมนต์ได้ทันที</span>
                  </div>
                </div>
              </div>

              {/* Developer / Webhook settings toggle */}
              <div className="p-4 rounded-2xl bg-card border border-border/80">
                <button
                  className="w-full flex items-center justify-between text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowConfigGuide(!showConfigGuide)}
                  type="button"
                >
                  <span className="flex items-center gap-2">
                    <Code2 className="size-4 text-blue-600 dark:text-blue-400" />
                    การตั้งค่า Facebook Graph API &amp; Webhook
                  </span>
                  <span>{showConfigGuide ? "ซ่อน ▲" : "แสดง ▼"}</span>
                </button>

                {showConfigGuide && (
                  <div className="mt-3 pt-3 border-t border-border/60 text-[11px] text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      หากผู้ดูแลระบบต้องการเชื่อมต่อผ่าน <strong>Meta Graph API</strong>{" "}
                      เพื่อดึงข้อมูลแบบ JSON ลงฐานข้อมูล สามารถระบุในไฟล์{" "}
                      <code className="px-1 py-0.5 rounded bg-muted font-mono text-[10px]">
                        .env
                      </code>
                      :
                    </p>
                    <pre className="p-2.5 rounded-lg bg-muted font-mono text-[10px] overflow-x-auto text-foreground">
                      FACEBOOK_PAGE_ID=ITNSTRU{"\n"}
                      FACEBOOK_PAGE_ACCESS_TOKEN=your_token_here{"\n"}
                      FACEBOOK_VERIFY_TOKEN=itnstru_webhook_secret
                    </pre>
                    <p>
                      Webhook URL Endpoint:{" "}
                      <code className="px-1 py-0.5 rounded bg-muted font-mono text-[10px]">
                        /api/facebook/webhook
                      </code>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: News Cards Grid */}
        {activeTab === "cards" && (
          <div>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    className="p-4 rounded-2xl bg-card border border-border/60 animate-pulse space-y-3"
                    key={i}
                  >
                    <div className="h-44 bg-muted rounded-xl" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-4/5" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {posts.map((post) => (
                  <article
                    className="group flex flex-col justify-between rounded-2xl bg-card border border-border/70 hover:border-blue-500/40 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                    key={post.id}
                  >
                    {/* Image thumbnail with category badge */}
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      {post.full_picture ? (
                        <img
                          alt={post.category || "IT NSTRU Post"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          src={post.full_picture}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-blue-600/10 text-blue-600">
                          <Facebook className="size-10 opacity-40" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-md">
                          {post.category || "ข่าวสารสาขา"}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="size-7 rounded-full bg-white/90 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center text-blue-600 shadow-sm">
                          <Facebook className="size-3.5 fill-current" />
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground mb-2">
                          <Clock className="size-3" />
                          <time dateTime={post.created_time}>
                            {formatThaiDate(post.created_time)}
                          </time>
                        </div>

                        <p className="text-xs sm:text-[13px] text-foreground font-medium line-clamp-4 leading-relaxed mb-4">
                          {post.message}
                        </p>
                      </div>

                      {/* Footer interaction stats & link */}
                      <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1 text-[11px] hover:text-rose-500 transition-colors">
                            <Heart className="size-3.5 text-rose-500 fill-rose-500/20" />
                            {post.likes_count ?? 120}
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <MessageCircle className="size-3.5" />
                            {post.comments_count ?? 18}
                          </span>
                          <span className="flex items-center gap-1 text-[11px]">
                            <Share2 className="size-3.5" />
                            {post.shares_count ?? 25}
                          </span>
                        </div>

                        <a
                          className="font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 inline-flex items-center gap-1 text-[11px] group/link"
                          href={post.permalink_url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <span>ดูโพสต์</span>
                          <ExternalLink className="size-3 group-hover/link:translate-x-0.5 transition-transform" />
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
