import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { SendHorizontal } from "lucide-react";
import { sendMessage } from "../hooks/useChat";
import { useChatPanel } from "../context/ChatPanelContext";

const ChatInput = () => {
  const [content, setContent] = useState<string | undefined>("");

  const chatPanel = useChatPanel();

  const handleSendMessage = () => {
    if (!content) return;

    if (!chatPanel.conversationId)
      throw new Error("Conversation Id cannot be empty.");

    if (!chatPanel.userId) throw new Error("User Id cannot be empty.");

    // send message
    sendMessage(
      chatPanel.client.current,
      chatPanel.conversationId,
      chatPanel.userId,
      content,
    );

    setContent(""); // clear input field
  };

  return (
    <div className="chatInput w-full flex items-center justify-between">
      <div className="chatInput__input w-5/6">
        <Input
          placeholder="Your message ..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
      </div>

      <div className="chatInput__sendButton w-1/6 flex justify-end">
        <Button
          variant={"outline"}
          onClick={handleSendMessage}
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 hover:text-blue-900 cursor-pointer"
        >
          <SendHorizontal /> Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
