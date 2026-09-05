import { useContext } from "react";
import { ConversationContext } from "../context/ConversationContext";
import type { ConversationContextValue } from "../types";

const useConversation = () => {
  const context: ConversationContextValue | null =
    useContext(ConversationContext);

  if (!context)
    throw new Error(
      "useConversation must be used within ConversationProvider.",
    );

  return context;
};

export default useConversation;
