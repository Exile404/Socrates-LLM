import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, Bot } from "lucide-react";
import { format } from "date-fns";

type ChatMessageProps = {
  sender: "user" | "bot";
  message: string;
  category?: string;
  timestamp: Date;
};

export const ChatMessage = ({
  sender,
  message,
  category,
  timestamp,
}: ChatMessageProps) => (
  <div className={`flex ${sender === "user" ? "justify-end" : "justify-start"} my-2`}>
    <Card className={`max-w-xl w-full ${sender === "user" ? "bg-primary/10" : "bg-background"}`}>
      <CardContent className="flex flex-col gap-1 p-4">
        <div className="flex items-center gap-2">
          {sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
          <span className="text-xs text-muted-foreground">
            {format(timestamp, "HH:mm:ss")}
          </span>
          {category && sender === "user" && (
            <Badge variant="outline" className="ml-auto">{category}</Badge>
          )}
        </div>
        <span className="whitespace-pre-line">{message}</span>
      </CardContent>
    </Card>
  </div>
);
