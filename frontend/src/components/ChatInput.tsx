"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { useState } from "react";

type Props = {
  onSend: (message: string) => void;
  loading: boolean;
};

export const ChatInput = ({ onSend, loading }: Props) => {
  const [input, setInput] = useState("");
  return (
    <form
      className="flex gap-2 p-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (input.trim()) {
          onSend(input.trim());
          setInput("");
        }
      }}
    >
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
        placeholder="Type your question..."
        className="flex-1"
      />
      <Button type="submit" disabled={loading || !input.trim()} variant="default">
        <Send className="w-4 h-4" />
      </Button>
    </form>
  );
};
