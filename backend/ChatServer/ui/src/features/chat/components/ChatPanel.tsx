import ChatPanelHeader from "./ChatPanelHeader";

import JoinConversationPanel from "./JoinConversationPanel";
import ChatView from "./ChatView";
import ChatInput from "./ChatInput";
import { ChatPanelProvider } from "../context/ChatPanelContext";

// types
import type { ChatPanelPresentationPropsInterface, User } from "../type";
import ObservabilityAccordion from "../../observability/components/ObservabilityAccordion";

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
          <ChatPanelProvider>
            <ChatPanelPresentation user={user1.name} imgUrl={user1.imgUrl} />
          </ChatPanelProvider>
        </div>

        <div className="w-1/2 rounded-md p-4">
          <ChatPanelProvider>
            <ChatPanelPresentation user={user2.name} imgUrl={user2.imgUrl} />
          </ChatPanelProvider>
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
    <div className="chatPanel rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
      <div className="chatPanel__header mb-5">
        <ChatPanelHeader username={user} imgUrl={imgUrl} />
      </div>

      <div className="chatPanel__joinConversation mb-8">
        <JoinConversationPanel username={user} />
      </div>

      <div className="chatPanel__chatView mb-6">
        <ChatView />
      </div>

      <div className="chatPanel__input mb-8">
        <ChatInput />
      </div>

      <div className="chatPanel__observability">
        <ObservabilityAccordion />
      </div>
    </div>
  );
};

export default ChatPanel;
