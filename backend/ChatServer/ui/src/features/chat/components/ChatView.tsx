import { Bubble, BubbleContent } from "../../../components/ui/bubble";
import { Message, MessageContent } from "../../../components/ui/message";
import { useChatPanel } from "../context/ChatPanelContext";

const ChatView = () => {
  const { userId, messages } = useChatPanel();

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getDateLabel = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const messageDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    );

    const diffInDays =
      (today.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays === 0) {
      return "Today";
    }

    if (diffInDays === 1) {
      return "Yesterday";
    }

    return date.toLocaleDateString([], {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  return (
    <div className="chatView h-100 overflow-y-auto rounded-xl border border-slate-300 bg-slate-200/70 p-3 shadow-sm">
      {messages.map((msg, index) => {
        const currentDate = getDateLabel(msg.timestamp);

        const previousDate =
          index > 0 ? getDateLabel(messages[index - 1].timestamp) : null;

        const showDateSeparator = currentDate !== previousDate;

        return (
          <div key={msg.messageId}>
            {showDateSeparator && (
              <div className="flex justify-center my-4">
                <span className="bg-white/80 text-slate-500 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {currentDate}
                </span>
              </div>
            )}

            <div className="my-2">
              <Message align={msg.senderId === userId ? "end" : "start"}>
                <MessageContent>
                  <Bubble
                    variant={msg.senderId === userId ? "default" : "secondary"}
                  >
                    <BubbleContent>
                      <div className="flex items-end gap-2">
                        <span>{msg.content}</span>

                        <span className="text-[10px] opacity-60 whitespace-nowrap">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                    </BubbleContent>
                  </Bubble>
                </MessageContent>
              </Message>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ChatView;
