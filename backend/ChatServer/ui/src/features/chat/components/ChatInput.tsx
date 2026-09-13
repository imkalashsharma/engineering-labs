import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { SendHorizontal } from "lucide-react";
import { sendMessage } from "../hooks/useChat";
import { useChatPanel } from "../context/ChatPanelContext";

const ChatInput = () => {
  const [content, setContent] = useState<string>("");

  const chatPanel = useChatPanel();

  const handleSendMessage = () => {
    if (!content.trim()) return;

    if (!chatPanel.conversationId) {
      throw new Error("Conversation Id cannot be empty.");
    }

    if (!chatPanel.userId) {
      throw new Error("User Id cannot be empty.");
    }

    sendMessage(
      chatPanel.client.current,
      chatPanel.conversationId,
      chatPanel.userId,
      content,
    );

    setContent("");
  };

  return (
    <div className="chatInput flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="chatInput__input flex-1">
        <Input
          placeholder="Your message ..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
          className="h-10 border-slate-200 bg-slate-50 focus-visible:ring-blue-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
      </div>

      <div className="chatInput__sendButton">
        <Button
          onClick={handleSendMessage}
          disabled={!content.trim()}
          className="
            h-10
            bg-blue-600
            text-white
            shadow-sm
            hover:bg-blue-700
            disabled:cursor-not-allowed
            disabled:bg-slate-200
            disabled:text-slate-400
          "
        >
          <SendHorizontal className="mr-2 h-4 w-4" />
          Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
