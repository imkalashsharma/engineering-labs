import { AudioLinesOff, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";

// types
import type { ChatPanelHeaderPropsInterface } from "../type";
import { useLeaveConversation } from "../hooks/useChat";
import { useChatPanel } from "../context/ChatPanelContext";
import { notify } from "../../../lib/toast";

const ChatPanelHeader = ({
  username,
  imgUrl,
}: ChatPanelHeaderPropsInterface) => {
  const chatPanel = useChatPanel();

  const leaveConversation = useLeaveConversation(chatPanel.setUserId);

  const handleLeave = () => {
    const client = chatPanel.client.current;

    if (client) {
      client.deactivate();
      chatPanel.client.current = null;
    }

    if (!chatPanel.conversationCode)
      throw new Error("Conversation code cannot be empty.");

    if (!chatPanel.userId) throw new Error("User Id cannot be empty.");

    leaveConversation.mutate(
      {
        conversationCode: chatPanel.conversationCode,
        userId: chatPanel.userId,
      },
      {
        onSuccess: () => {
          chatPanel.setConversationId(null);
          chatPanel.setConversationCode(null);
          chatPanel.setUserId(null);
          chatPanel.setMessages([]);
          chatPanel.setJoinState(false);

          chatPanel.setJoinState(false); // enable join
          chatPanel.setMessages([]); // clear chats

          notify.success("Successfully left the conversation.");
        },

        onError: (error) => {
          console.error("Failed to leave conversation", error);

          notify.error(
            "Failed to leave the conversation. Please try again later.",
          );
        },
      },
    );
  };

  return (
    <div className="chatPanelHeader flex justify-between items-center">
      <div className="chatPanelHeader__user flex gap-5">
        <div className="chatPanelHeader__user__thumbnail flex flex-col items-center justify-center">
          <img
            className="w-10 h-10"
            src={imgUrl}
            alt={`${chatPanel.userId} image`}
          />
        </div>

        <div className="chatPanelHeader__user__info">
          <div className="chatPanelHeader__user__info__name mb-1">
            <span className="font-semibold">{username}</span>

            {chatPanel.joinState && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Connected
              </span>
            )}
          </div>

          <div className="chatPanelHeader__user__info__details text-sm mt-2">
            Simulated Client
          </div>
        </div>
      </div>

      <div className="chatPanelHeader__leave">
        <Button
          disabled={!chatPanel.joinState}
          onClick={handleLeave}
          className="bg-red-50
  text-red-600
  hover:bg-red-100
  border border-red-100 cursor-pointer"
        >
          {leaveConversation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <AudioLinesOff data-icon="inline-start" /> Leave
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ChatPanelHeader;
