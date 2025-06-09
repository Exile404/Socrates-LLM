// components/ChatPage.tsx
"use client";
import { useState } from "react";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import axios from "axios";

type ChatEntry = {
  sender: "user" | "bot";
  message: string;
  category?: string;
  timestamp: Date;
};

export default function ChatPage() {
  const [history, setHistory] = useState<ChatEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (msg: string) => {
    const userEntry: ChatEntry = { sender: "user", message: msg, timestamp: new Date() };
    setHistory((h) => [...h, userEntry]);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/api/dialogue", { message: msg });
      setHistory((h) => [
        ...h.slice(0, -1),
        { ...userEntry, category: res.data.category },
        { sender: "bot", message: res.data.response, timestamp: new Date() },
      ]);
    } catch {
      setHistory((h) => [
        ...h,
        { sender: "bot", message: "[Error] Server unreachable.", timestamp: new Date() },
      ]);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto my-8 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Socratic Dialogue AI</h1>
      <div className="flex-1 overflow-y-auto bg-muted rounded-xl p-4 shadow mb-4">
        {history.length === 0 && (
          <div className="text-muted-foreground">Start a conversation!</div>
        )}
        {history.map((entry, idx) => (
          <ChatMessage key={idx} {...entry} />
        ))}
      </div>
      <ChatInput onSend={sendMessage} loading={loading} />
      <footer className="text-center text-xs text-muted-foreground mt-2">
        Powered by Gemini, FastAPI & shadcn/ui
      </footer>
    </main>
  );
}
