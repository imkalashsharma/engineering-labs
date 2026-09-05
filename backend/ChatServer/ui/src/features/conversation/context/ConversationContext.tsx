import { createContext, useState, type ReactNode } from "react";
import type { Conversation, ConversationContextValue } from "../types";

// creating context
export const ConversationContext =
  createContext<ConversationContextValue | null>(null);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  return (
    <ConversationContext.Provider
      value={{
        conversation: conversation,
        setConversation: setConversation,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}
