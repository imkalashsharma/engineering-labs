import ChatPanelHeader from "./ChatPanelHeader";

// types
import type { ChatPanelPresentationPropsInterface, User } from "../type";
import JoinConversationPanel from "./JoinConversationPanel";
import ChatView from "./ChatView";
import ChatInput from "./ChatInput";
import { useState } from "react";

const ChatPanel = () => {
  const user1: User = {
    name: "User 1",
    imgUrl: "/user1.png",
  };

  const user2: User = {
    name: "User 2",
    imgUrl: "/user2.png",
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-5/6 flex gap-3">
        <div className="w-1/2 rounded-md p-4">
          <ChatPanelPresentation user={user1.name} imgUrl={user1.imgUrl} />
        </div>

        <div className="w-1/2 rounded-md p-4">
          <ChatPanelPresentation user={user2.name} imgUrl={user2.imgUrl} />
        </div>
      </div>
    </div>
  );
};

const ChatPanelPresentation = ({
  user,
  imgUrl,
}: ChatPanelPresentationPropsInterface) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [joinState, setJoinState] = useState<boolean>(false);

  const disableJoin = () => {
    setJoinState(true);
  };

  const enableJoin = () => {
    setJoinState(false);
  };

  const putUserId = (userId: string | null) => {
    setUserId(userId);
  };

  return (
    <div className="chatPanel">
      <div className="chatPanel__header mb-5">
        <ChatPanelHeader
          imgUrl={imgUrl}
          joinState={{
            joinState: joinState,
            enableJoin: enableJoin,
            disableJoin: disableJoin,
          }}
          userState={{
            user: user,
            userId: userId,
            putUserId: putUserId,
          }}
        />
      </div>

      <div className="chatPanel__joinConversation mb-8">
        <JoinConversationPanel
          name={user}
          joinState={{
            joinState: joinState,
            enableJoin: enableJoin,
            disableJoin: disableJoin,
          }}
          userState={{
            user: user,
            userId: userId,
            putUserId: putUserId,
          }}
        />
      </div>

      <div className="chatPanel__chatView mb-6">
        <ChatView />
      </div>

      <div className="chatPanel__input">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPanel;
