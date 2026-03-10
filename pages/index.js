import { useState, useRef, useEffect } from "react";
import Head from "next/head";

const SUGGESTED = [
  "창업기업등 사업비 비목 종류는?",
  "외주용역비 계약 불가 업체 조건은?",
  "이의신청 기간과 방법은?",
  "참여제한 최대 기간은?",
  "성공환원금 감면 조건은?",
  "인건비 지급 불가 대상은?",
];

export default function Home() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "안녕하세요! 저는 「중소기업창업 지원사업 통합관리지침」(2025.12.23 개정) 전문 AI입니다.\n\n지침 전체 내용을 기반으로 답변드립니다. 사업비 비목, 참여제한, 협약 절차, 제재·환수, 이의신청 등 궁금하신 사항을 편하게 물어보세요! 📋",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    const userMsg = { role: "user", content: msg };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "응답을 받지 못했습니다." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "오류가 발생했습니다. 잠시 후 다시 시도해 주세요." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <Head>
        <title>창업지원사업 통합관리지침 AI</title>
        <meta name="description" content="중소기업창업 지원사업 통합관리지침 2025 전문 AI 챗봇" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={styles.page}>
        {/* Header */}
        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.logo}>📋</div>
            <div>
              <div style={styles.headerTitle}>창업지원사업 통합관리지침 AI</div>
              <div style={styles.headerSub}>중소벤처기업부 · 2025.12.23 개정 전문 반영</div>
            </div>
            <div style={styles.badge}>
              <div style={styles.dot} />
              온라인
            </div>
          </div>
        </header>

        {/* Chat */}
        <div style={styles.chatWrap}>
          {/* Messages */}
          <div style={styles.messageList}>
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  ...styles.msgRow,
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                {msg.role === "assistant" && <div style={styles.avatarAI}>🤖</div>}
                <div
                  style={
                    msg.role === "user" ? styles.bubbleUser : styles.bubbleAI
                  }
                >
                  {msg.content}
                </div>
                {msg.role === "user" && <div style={styles.avatarUser}>👤</div>}
              </div>
            ))}

            {loading && (
              <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
                <div style={styles.avatarAI}>🤖</div>
                <div style={styles.typingBubble}>
                  <span style={{ ...styles.dot2, animationDelay: "0s" }} />
                  <span style={{ ...styles.dot2, animationDelay: "0.2s" }} />
                  <span style={{ ...styles.dot2, animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested questions */}
          {messages.length <= 1 && (
            <div style={styles.suggestWrap}>
              {SUGGESTED.map((q, i) => (
                <button key={i} style={styles.suggestBtn} onClick={() => sendMessage(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={styles.inputArea}>
            <div style={styles.inputBox}>
              <textarea
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                }}
                onKeyDown={handleKeyDown}
                placeholder="지침에 대해 궁금한 점을 물어보세요... (Enter: 전송, Shift+Enter: 줄바꿈)"
                disabled={loading}
                rows={1}
                style={styles.textarea}
              />
              <button
                onClick={() => sendMessage()}
                disabled={loading || !input.trim()}
                style={{
                  ...styles.sendBtn,
                  background:
                    input.trim() && !loading
                      ? "linear-gradient(135deg, #1a6af5, #1d4ed8)"
                      : "rgba(255,255,255,0.08)",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                }}
              >
                {loading ? "⏳" : "➤"}
              </button>
            </div>
            <p style={styles.footer}>
              중소기업창업 지원사업 통합관리지침 전체 내용 기반 · 2025년 12월 23일 개정
            </p>
          </div>
        </div>

        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: #0a1628; }
          @keyframes bounce {
            0%, 60%, 100% { transform: translateY(0); }
            30% { transform: translateY(-5px); }
          }
          textarea:focus { outline: none; }
          textarea::placeholder { color: rgba(255,255,255,0.3); }
          button:hover { opacity: 0.9; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
        `}</style>
      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a1628 0%, #0d2141 50%, #0a1628 100%)",
    fontFamily: "'Noto Sans KR', 'Apple SD Gothic Neo', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
  },
  header: {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    backdropFilter: "blur(20px)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    padding: "14px 24px",
  },
  headerInner: {
    maxWidth: 760,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 40, height: 40,
    background: "linear-gradient(135deg, #1a6af5, #0ea5e9)",
    borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18, flexShrink: 0,
    boxShadow: "0 4px 14px rgba(26,106,245,0.4)",
  },
  headerTitle: { fontWeight: 700, fontSize: 15, letterSpacing: "-0.3px" },
  headerSub: { color: "rgba(255,255,255,0.45)", fontSize: 12, marginTop: 2 },
  badge: {
    marginLeft: "auto",
    background: "rgba(16,185,129,0.15)",
    border: "1px solid rgba(16,185,129,0.3)",
    borderRadius: 20,
    padding: "4px 12px",
    color: "#10b981",
    fontSize: 12, fontWeight: 600,
    display: "flex", alignItems: "center", gap: 6,
    flexShrink: 0,
  },
  dot: {
    width: 6, height: 6, borderRadius: "50%",
    background: "#10b981", boxShadow: "0 0 6px #10b981",
  },
  chatWrap: {
    flex: 1, width: "100%", maxWidth: 760,
    display: "flex", flexDirection: "column",
    height: "calc(100vh - 70px)",
  },
  messageList: {
    flex: 1, overflowY: "auto",
    padding: "24px 20px",
    display: "flex", flexDirection: "column", gap: 16,
  },
  msgRow: {
    display: "flex", alignItems: "flex-start", gap: 10,
  },
  avatarAI: {
    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
    background: "linear-gradient(135deg, #1a6af5, #0ea5e9)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 14, boxShadow: "0 2px 8px rgba(26,106,245,0.3)",
  },
  avatarUser: {
    width: 32, height: 32, borderRadius: 8, flexShrink: 0,
    background: "rgba(255,255,255,0.1)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 14,
  },
  bubbleUser: {
    maxWidth: "78%",
    padding: "12px 16px",
    borderRadius: "18px 18px 4px 18px",
    background: "linear-gradient(135deg, #1a6af5, #1d4ed8)",
    color: "#fff", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap",
    boxShadow: "0 4px 14px rgba(26,106,245,0.3)",
  },
  bubbleAI: {
    maxWidth: "78%",
    padding: "12px 16px",
    borderRadius: "18px 18px 18px 4px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#fff", fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap",
  },
  typingBubble: {
    padding: "12px 16px",
    borderRadius: "18px 18px 18px 4px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.08)",
    display: "flex", gap: 6, alignItems: "center",
  },
  dot2: {
    display: "inline-block",
    width: 7, height: 7, borderRadius: "50%",
    background: "#1a6af5",
    animation: "bounce 1.2s ease-in-out infinite",
  },
  suggestWrap: {
    padding: "0 20px 12px",
    display: "flex", flexWrap: "wrap", gap: 8,
  },
  suggestBtn: {
    padding: "7px 14px",
    background: "rgba(26,106,245,0.12)",
    border: "1px solid rgba(26,106,245,0.25)",
    borderRadius: 20,
    color: "#93c5fd", fontSize: 13, cursor: "pointer",
    fontFamily: "'Noto Sans KR', sans-serif",
  },
  inputArea: {
    padding: "12px 20px 20px",
    background: "rgba(0,0,0,0.2)",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  inputBox: {
    display: "flex", gap: 10,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 16, padding: "10px 14px",
    alignItems: "flex-end",
  },
  textarea: {
    flex: 1, background: "transparent", border: "none",
    color: "#fff", fontSize: 14, lineHeight: 1.6,
    resize: "none", fontFamily: "'Noto Sans KR', sans-serif",
    maxHeight: 120, overflowY: "auto",
  },
  sendBtn: {
    width: 36, height: 36, borderRadius: 10,
    border: "none", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 16, flexShrink: 0,
    transition: "all 0.2s",
  },
  footer: {
    textAlign: "center",
    color: "rgba(255,255,255,0.2)",
    fontSize: 11, marginTop: 8,
  },
};
