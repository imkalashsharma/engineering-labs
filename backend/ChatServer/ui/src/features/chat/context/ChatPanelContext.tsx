import { Client } from "@stomp/stompjs";
import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

interface ChatPanelContextValue {
  userId: string | null;
  setUserId: (userId: string | null) => void;

  conversationId: string | null;
  setConversationId: (conversationId: string | null) => void;

  client: RefObject<Client | null>;

  joinState: boolean;
  setJoinState: (state: boolean) => void;
}

const ChatPanelContext = createContext<ChatPanelContextValue | null>(null);

export function ChatPanelProvider({ children }: { children: ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [joinState, setJoinState] = useState<boolean>(false);

  const client = useRef<Client | null>(null);

  return (
    <ChatPanelContext.Provider
      value={{
        userId,
        setUserId,

        conversationId,
        setConversationId,

        client,

        joinState,
        setJoinState,
      }}
    >
      {children}
    </ChatPanelContext.Provider>
  );
}

export const useChatPanel = () => {
  const context = useContext(ChatPanelContext);

  if (!context)
    throw new Error("useChatPanel must be used inside ChatPanelProvider.");

  return context;
};
