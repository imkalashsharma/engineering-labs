import { useChatPanel } from "../context/ChatPanelContext";

const ChatView = () => {
  const { messages } = useChatPanel();

  return (
    <div className="chatView bg-neutral-300 rounded-md shadow-md h-100 overflow-y-auto p-2">
      {messages.map((msg) => (
        <div key={msg.messageId}>{msg.content}</div>
      ))}
    </div>
  );
};

export default ChatView;
