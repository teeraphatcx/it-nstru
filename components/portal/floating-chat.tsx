"use client";

import { Bot, Maximize2, RefreshCw, Send, X } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSmartReply } from "./it-knowledge";
import type { ChatMessage } from "./types";

export function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "f-1",
      role: "bot",
      suggestions: ["หลักสูตรกี่หน่วยกิต?", "ค่าเทอมเท่าไหร่?", "จบแล้วทำงานอะไร?"],
      text: "สวัสดีครับ! ผมคือ AI ผู้ช่วยหลักสูตรเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช มีคำถามเกี่ยวกับหลักสูตร ถามผมได้เลยครับ 😊",
      timestamp: "ตอนนี้",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, scrollToBottom]);

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text || isTyping) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
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

    try {
      const res = await fetch("/api/portal/smart-reply", {
        body: JSON.stringify({ message: text }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (res.ok) {
        const data = await res.json();
        const botMessage: ChatMessage = {
          id: `b-${Date.now()}`,
          role: "bot",
          suggestions: data.suggestions,
          text: data.reply,
          timestamp: new Date().toLocaleTimeString("th-TH", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
        return;
      }
    } catch (e) {
      console.warn("Using local smart-reply fallback", e);
    }

    setTimeout(() => {
      const { reply, suggestions } = getSmartReply(text);
      const botMessage: ChatMessage = {
        id: `b-${Date.now()}`,
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
    }, 400);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `f-${Date.now()}`,
        role: "bot",
        suggestions: ["หลักสูตรกี่หน่วยกิต?", "ค่าเทอมเท่าไหร่?", "จบแล้วทำงานอะไร?"],
        text: "รีเซ็ตการสนทนาเรียบร้อยครับ สอบถามข้อมูลหลักสูตร IT มรภ.นครศรีธรรมราช ได้เลยครับ!",
        timestamp: "ตอนนี้",
      },
    ]);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Chat Popup Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-[380px] h-[500px] rounded-2xl border border-border/80 bg-card/95 backdrop-blur-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="size-8 rounded-lg bg-white p-0.5 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                <img
                  alt="IT NSTRU"
                  className="w-full h-full object-cover rounded-md"
                  src="/logo.jpg"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-bold text-xs sm:text-sm">
                  IT NSTRU Chatbot
                </span>
                <span className="text-[10px] text-white/80">
                  ออนไลน์พร้อมตอบ 24 ชม.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                className="size-7 rounded-md hover:bg-white/20 flex items-center justify-center transition-colors"
                onClick={handleReset}
                title="ล้างข้อความ"
                type="button"
              >
                <RefreshCw className="size-3.5" />
              </button>
              <Link
                className="size-7 rounded-md hover:bg-white/20 flex items-center justify-center transition-colors"
                href="/chat"
                title="ขยายสู่หน้าจอเต็ม"
              >
                <Maximize2 className="size-3.5" />
              </Link>
              <button
                className="size-7 rounded-md hover:bg-white/20 flex items-center justify-center transition-colors"
                onClick={() => setIsOpen(false)}
                title="ปิดหน้าต่าง"
                type="button"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs leading-relaxed">
            {messages.map((msg) => (
              <div
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
                key={msg.id}
              >
                {msg.role === "bot" && (
                  <div className="size-6 rounded-md overflow-hidden shrink-0 mt-0.5 border border-border/40 shadow-xs">
                    <img
                      alt="IT Bot"
                      className="w-full h-full object-cover"
                      src="/logo.jpg"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-xl p-3 ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-xs"
                      : "bg-muted/80 text-foreground border border-border/50 rounded-tl-xs"
                  }`}
                >
                  <div className="whitespace-pre-line">{msg.text}</div>

                  {msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border/40 flex flex-wrap gap-1">
                      {msg.suggestions.map((sug) => (
                        <button
                          className="text-[10px] px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 text-left"
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
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center">
                <div className="size-6 rounded-md bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="size-3.5" />
                </div>
                <div className="rounded-xl px-3 py-2 bg-muted/80 border border-border/50 rounded-tl-xs flex gap-1">
                  <span className="size-1.5 rounded-full bg-blue-600 animate-bounce" />
                  <span className="size-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="size-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reply Bar */}
          <div className="px-3 py-1.5 border-t border-border/40 bg-sidebar/40 flex items-center gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            <button
              className="px-2 py-0.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 shrink-0 font-medium"
              onClick={() => handleSend("อาจารย์ผู้สอนมีใครบ้าง?")}
              type="button"
            >
              👨‍🏫 อาจารย์
            </button>
            <button
              className="px-2 py-0.5 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground shrink-0"
              onClick={() => handleSend("หลักสูตรกี่หน่วยกิต?")}
              type="button"
            >
              หน่วยกิต (126 นก.)
            </button>
            <button
              className="px-2 py-0.5 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground shrink-0"
              onClick={() => handleSend("ค่าเทอมเท่าไหร่?")}
              type="button"
            >
              ค่าเทอม (13,000 ฿)
            </button>
            <button
              className="px-2 py-0.5 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground shrink-0"
              onClick={() => handleSend("ปรัชญาของสาขาวิชา")}
              type="button"
            >
              ปรัชญา
            </button>
            <button
              className="px-2 py-0.5 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground shrink-0"
              onClick={() => handleSend("จบแล้วทำงานอะไร?")}
              type="button"
            >
              อาชีพ
            </button>
            <button
              className="px-2 py-0.5 rounded-full border border-border/60 bg-card/60 hover:bg-muted text-muted-foreground shrink-0"
              onClick={() => handleSend("เกณฑ์รับสมัคร")}
              type="button"
            >
              รับสมัคร
            </button>
          </div>

          {/* Input Box */}
          <div className="p-2.5 bg-sidebar/80 border-t border-border/60">
            <form
              className="flex items-center gap-1.5"
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
            >
              <input
                className="flex-1 px-3 py-1.5 rounded-lg border border-border/80 bg-background text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setInput(e.target.value)}
                placeholder="ถามข้อมูลหลักสูตร IT..."
                type="text"
                value={input}
              />
              <button
                className="size-8 rounded-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shrink-0 disabled:opacity-40"
                disabled={!input.trim() || isTyping}
                type="submit"
              >
                <Send className="size-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Action Button (FAB) */}
      <div className="relative group flex items-center justify-end">
        {!isOpen && (
          <div className="hidden sm:block absolute right-16 px-3 py-1.5 rounded-xl border border-border/70 bg-card/90 backdrop-blur-md shadow-lg text-xs font-medium text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            มีคำถามเกี่ยวกับหลักสูตร? ถาม AI ได้เลย! 😊
          </div>
        )}

        <button
          aria-label="เปิดแชทกับ AI"
          className="size-13 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 relative"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
        >
          {/* Subtle pulse ring */}
          <span className="absolute -inset-1 rounded-full bg-blue-500/30 animate-ping -z-10" />

          {isOpen ? (
            <X className="size-6" />
          ) : (
            <div className="size-8 rounded-full overflow-hidden border-2 border-white/80 shadow-md">
              <img
                alt="IT NSTRU Chatbot"
                className="w-full h-full object-cover"
                src="/logo.jpg"
              />
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
