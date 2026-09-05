import ChatPanelHeader from "./ChatPanelHeader";

// types
import type { ChatPanelPresentationPropsInterface, User } from "../type";
import JoinConversationPanel from "./JoinConversationPanel";

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
  return (
    <div className="chatPanel">
      <div className="chatPanel__header mb-5">
        <ChatPanelHeader user={user} imgUrl={imgUrl} />
      </div>

      <div className="chatPanel__joinConversation">
        <JoinConversationPanel name={user} />
      </div>

      <div className="chatPanel__chatView"></div>

      <div className="chatPanel__input"></div>
    </div>
  );
};

export default ChatPanel;
