import { create } from "zustand";

interface ConversationState {
  conversationCode: string | null;

  setConversationCode: (code: string) => void;

  reset: () => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
  conversationCode: null,

  setConversationCode: (code) => {
    set({
      conversationCode: code,
    });
  },

  reset: () => {
    set({
      conversationCode: null,
    });
  },
}));
