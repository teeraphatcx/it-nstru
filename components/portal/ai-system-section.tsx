"use client";

import {
  Bot,
  BrainCircuit,
  Clock,
  Database,
  Maximize2,
  RefreshCw,
  Send,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSmartReply } from "./it-knowledge";
import type { ChatMessage } from "./types";

export function AiSystemSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      role: "bot",
      suggestions: [
        "หลักสูตร IT มีกี่หน่วยกิต?",
        "ค่าเทอมเท่าไหร่ และมีทุนไหม?",
        "จบแล้วทำงานอะไรได้บ้าง?",
        "เกณฑ์การรับสมัครนักศึกษาใหม่",
      ],
      text: "สวัสดีครับ! ผมคือ AI ผู้ช่วยประจำสาขาวิชาเทคโนโลยีสารสนเทศ มหาวิทยาลัยราชภัฏนครศรีธรรมราช ยินดีต้อนรับครับ 😊 มีข้อสงสัยเกี่ยวกับหลักสูตร ค่าเทอม การรับสมัคร หรือการเรียนต่อสายไอที สามารถถามผมได้เลยครับ!",
      timestamp: "ตอนนี้",
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [ratedMessages, setRatedMessages] = useState<Record<string, number>>(
    {}
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) {
      return;
    }

    const userMsgId = `user-${Date.now()}`;
    const userMessage: ChatMessage = {
      id: userMsgId,
      role: "user",
      text,
      timestamp: new Date().toLocaleTimeString("th-TH", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate smart thinking delay
    setTimeout(() => {
      const { reply, suggestions } = getSmartReply(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: "bot",
        suggestions,
        text: reply,
        timestamp: new Date().toLocaleTimeString("th-TH", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `reset-${Date.now()}`,
        role: "bot",
        suggestions: [
          "หลักสูตร IT มีกี่หน่วยกิต?",
          "ค่าเทอมเท่าไหร่ และมีทุนไหม?",
          "จบแล้วทำงานอะไรได้บ้าง?",
          "เกณฑ์การรับสมัครนักศึกษาใหม่",
        ],
        text: "รีเซ็ตการสนทนาเรียบร้อยครับ มีข้อมูลหลักสูตร IT หรือข้อสงสัยด้านใดให้ผมช่วยเหลือ ถามได้ทันทีเลยครับ 😊",
        timestamp: "ตอนนี้",
      },
    ]);
  };

  const handleRate = (messageId: string, stars: number) => {
    setRatedMessages((prev) => ({ ...prev, [messageId]: stars }));
  };

  return (
    <section
      className="py-16 md:py-24 bg-muted/30 border-y border-border/50 relative scroll-mt-12"
      id="ai-system"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-semibold mb-3">
            <Sparkles className="size-3 text-amber-400" />
            <span>AI SYSTEM SHOWCASE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            ทำความรู้จักระบบ AI ผู้ช่วยประจำหลักสูตร IT
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            นวัตกรรมปัญญาประดิษฐ์เพื่อการประชาสัมพันธ์หลักสูตรเทคโนโลยีสารสนเทศ
            มรภ.นครศรีธรรมราช พัฒนาเพื่อให้นักเรียน นักศึกษา และผู้ปกครอง ได้รับข้อมูลที่ถูกต้อง
            รวดเร็ว ตลอด 24 ชั่วโมง
          </p>
        </div>

        {/* 3 Core Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
          <div className="p-5 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-sm hover:border-blue-500/40 hover:-translate-y-1 transition-all duration-200">
            <div className="size-11 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4">
              <Clock className="size-5.5" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-1.5">
              ตอบคำถามอัตโนมัติ 24 ชม.
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              ไม่ว่าจะเป็นเรื่องค่าธรรมเนียม, คุณสมบัติผู้สมัคร, วิชาเอก หรือการฝึกงาน
              ระบบสามารถโต้ตอบได้ทันทีแบบเรียลไทม์
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-sm hover:border-indigo-500/40 hover:-translate-y-1 transition-all duration-200">
            <div className="size-11 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4">
              <BrainCircuit className="size-5.5" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-1.5">
              วิเคราะห์เจตนา (Intent NLP)
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              ระบบเข้าใจความต้องการที่แท้จริงจากภาษาพูดของคำถาม
              และดึงข้อมูลหลักสูตรที่เกี่ยวข้องมาตอบได้อย่างตรงประเด็น
            </p>
          </div>

          <div className="p-5 rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md shadow-sm hover:border-cyan-500/40 hover:-translate-y-1 transition-all duration-200">
            <div className="size-11 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4">
              <Database className="size-5.5" />
            </div>
            <h3 className="font-bold text-base text-foreground mb-1.5">
              ฐานข้อมูลหลักสูตร IT ที่ทันสมัย
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              เชื่อมโยงข้อมูลโครงสร้างหลักสูตร เกณฑ์การรับสมัคร และข้อมูลการศึกษาต่อ
              ของสาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช
            </p>
          </div>
        </div>

        {/* Live Interactive Chatbot Showcase Box */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-border/80 bg-card/90 backdrop-blur-2xl shadow-xl overflow-hidden">
          {/* Chat Window Top Bar */}
          <div className="px-5 py-3.5 bg-sidebar/80 border-b border-border/60 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="size-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm">
                  <Bot className="size-5.5" />
                </div>
                <span className="absolute bottom-0 right-0 size-3 rounded-full bg-emerald-500 ring-2 ring-background" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-foreground">
                    IT NSTRU Assistant
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    ออนไลน์ 24 ชม.
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  ผู้ช่วยปัญญาประดิษฐ์ สาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                className="size-8 rounded-lg border border-border/60 bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
                onClick={handleResetChat}
                title="ล้างการสนทนา"
                type="button"
              >
                <RefreshCw className="size-3.5" />
              </button>

              <Link
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-blue-500/10 hover:bg-blue-500/15 text-blue-600 dark:text-blue-400 text-xs font-medium transition-colors"
                href="/chat"
                title="เปิดโหมดห้องแชทเต็มจอ"
              >
                <Maximize2 className="size-3" />
                <span>โหมดเต็มจอ</span>
              </Link>
            </div>
          </div>

          {/* Messages Stream Area */}
          <div className="h-[360px] sm:h-[420px] overflow-y-auto p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                className={`flex gap-3 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
                key={msg.id}
              >
                {msg.role === "bot" && (
                  <div className="size-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                    <Bot className="size-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs shadow-sm"
                      : "bg-muted/70 text-foreground border border-border/60 rounded-tl-xs"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {/* Rating widget for bot responses */}
                  {msg.role === "bot" && (
                    <div className="mt-3 pt-2.5 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>ประเมินคำตอบ:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            className="p-0.5 hover:scale-110 transition-transform"
                            key={star}
                            onClick={() => handleRate(msg.id, star)}
                            type="button"
                          >
                            <Star
                              className={`size-3.5 ${
                                (ratedMessages[msg.id] ?? 0) >= star
                                  ? "text-amber-400 fill-amber-400"
                                  : "text-muted-foreground/40 hover:text-amber-400"
                              }`}
                            />
                          </button>
                        ))}
                        {ratedMessages[msg.id] && (
                          <span className="ml-1 text-[10px] text-emerald-500 font-medium">
                            ขอบคุณครับ!
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Follow-up suggestion pills */}
                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-3 pt-2 border-t border-border/40 flex flex-wrap gap-1.5">
                      {msg.suggestions.map((sug) => (
                        <button
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full border border-blue-500/30 bg-blue-500/5 hover:bg-blue-500/15 text-blue-600 dark:text-blue-400 transition-colors text-left"
                          key={sug}
                          onClick={() => handleSend(sug)}
                          type="button"
                        >
                          {sug}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="size-8 rounded-lg bg-foreground/10 text-foreground flex items-center justify-center shrink-0 mt-0.5">
                    <User className="size-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="size-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Bot className="size-4" />
                </div>
                <div className="rounded-2xl px-4 py-3 bg-muted/70 border border-border/60 rounded-tl-xs flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-blue-600 animate-bounce" />
                  <span className="size-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="size-2 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Bar */}
          <div className="px-4 py-2 border-t border-border/50 bg-sidebar/40 overflow-x-auto flex items-center gap-2 scrollbar-none">
            <span className="text-[11px] font-semibold text-muted-foreground shrink-0">
              💡 ตัวอย่างคำถาม:
            </span>
            <button
              className="text-xs px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 shrink-0 transition-colors font-medium"
              onClick={() => handleSend("อาจารย์ผู้สอนมีใครบ้าง?")}
              type="button"
            >
              👨‍🏫 อาจารย์ผู้สอนมีใครบ้าง?
            </button>
            <button
              className="text-xs px-3 py-1 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 transition-colors"
              onClick={() => handleSend("หลักสูตร IT มีกี่หน่วยกิต?")}
              type="button"
            >
              หลักสูตรกี่หน่วยกิต?
            </button>
            <button
              className="text-xs px-3 py-1 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 transition-colors"
              onClick={() => handleSend("ค่าเทอมเท่าไหร่ และมีทุนไหม?")}
              type="button"
            >
              ค่าเทอม (13,000 ฿)
            </button>
            <button
              className="text-xs px-3 py-1 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 transition-colors"
              onClick={() => handleSend("ปรัชญาของสาขาวิชา")}
              type="button"
            >
              ปรัชญาสาขา
            </button>
            <button
              className="text-xs px-3 py-1 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 transition-colors"
              onClick={() => handleSend("จบแล้วทำงานอะไรได้บ้าง?")}
              type="button"
            >
              จบไปทำงานอะไร?
            </button>
            <button
              className="text-xs px-3 py-1 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground hover:text-foreground shrink-0 transition-colors"
              onClick={() => handleSend("เกณฑ์การรับสมัครนักศึกษาใหม่")}
              type="button"
            >
              เกณฑ์การรับสมัคร
            </button>
          </div>

          {/* Chat Input Field */}
          <div className="p-3 sm:p-4 bg-sidebar/90 border-t border-border/60">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                className="flex-1 px-4 py-2.5 rounded-xl border border-border/80 bg-background text-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                onChange={(e) => setInput(e.target.value)}
                placeholder="พิมพ์คำถามเกี่ยวกับหลักสูตร IT มรภ.นครศรีธรรมราช..."
                type="text"
                value={input}
              />
              <button
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors shrink-0 shadow-sm"
                disabled={!input.trim() || isTyping}
                type="submit"
              >
                <span>ส่ง</span>
                <Send className="size-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
