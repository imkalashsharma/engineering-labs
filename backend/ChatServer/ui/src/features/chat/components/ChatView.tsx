import { Bubble, BubbleContent } from "../../../components/ui/bubble";
import { Message, MessageContent } from "../../../components/ui/message";
import { useChatPanel } from "../context/ChatPanelContext";

const ChatView = () => {
  const { userId, messages } = useChatPanel();

  return (
    <div className="chatView bg-slate-200 rounded-md shadow-md h-100 overflow-y-auto p-2">
      {messages.map((msg) => (
        <div className="my-2">
          <Message
            key={msg.messageId}
            align={msg.senderId === userId ? "end" : "start"}
          >
            <MessageContent>
              <Bubble
                variant={msg.senderId === userId ? "default" : "secondary"}
              >
                <BubbleContent>{msg.content}</BubbleContent>
              </Bubble>
            </MessageContent>
          </Message>
        </div>
      ))}
    </div>
  );
};

export default ChatView;
