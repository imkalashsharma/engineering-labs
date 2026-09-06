import { AudioLinesOff } from "lucide-react";
import { Button } from "../../../components/ui/button";

// types
import type { ChatPanelHeaderPropsInterface } from "../type";
import { useLeaveConversation } from "../hooks/useChat";
import { useConversationStore } from "../../conversation/store/conversationStore";

const ChatPanelHeader = ({
  userState,
  imgUrl,
  joinState,
}: ChatPanelHeaderPropsInterface) => {
  const conversationCode = useConversationStore(
    (state) => state.conversationCode,
  );

  const leaveConversation = useLeaveConversation(userState.putUserId);

  const handleLeave = () => {
    try {
      if (!conversationCode)
        throw new Error("Conversation code cannot be empty.");

      if (!userState.userId) throw new Error("User Id cannot be empty.");

      leaveConversation.mutate({
        conversationCode: conversationCode,
        userId: userState.userId,
      });

      joinState.enableJoin();
    } catch (e) {
      console.error(`Failed to leave conversation`, e);
    }
  };

  return (
    <div className="chatPanelHeader flex justify-between items-center">
      <div className="chatPanelHeader__user flex gap-5">
        <div className="chatPanelHeader__user__thumbnail flex flex-col items-center justify-center">
          <img
            className="w-10 h-10"
            src={imgUrl}
            alt={`${userState.user} image`}
          />
        </div>

        <div className="chatPanelHeader__user__info">
          <div className="chatPanelHeader__user__info__name mb-1 font-semibold">
            {userState.user}
          </div>

          <div className="chatPanelHeader__user__info__details text-sm">
            Simulated Client
          </div>
        </div>
      </div>

      <div className="chatPanelHeader__leave">
        <Button
          disabled={!joinState.joinState}
          onClick={handleLeave}
          className="cursor-pointer"
          variant={"destructive"}
        >
          <AudioLinesOff data-icon="inline-start" /> Leave
        </Button>
      </div>
    </div>
  );
};

export default ChatPanelHeader;
