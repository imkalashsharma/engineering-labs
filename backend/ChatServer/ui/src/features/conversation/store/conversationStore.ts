import { create } from "zustand";
import type { ConversationStatusValues } from "../types";

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

interface ConversationStatusState {
  conversationStatus: ConversationStatusValues;
  setConversationStatus: (status: ConversationStatusValues) => void;
  reset: () => void;
}

export const useConversationStatusStore = create<ConversationStatusState>(
  (set) => ({
    conversationStatus: "INACTIVE",

    setConversationStatus: (status) => {
      set({
        conversationStatus: status,
      });
    },

    reset: () => {
      set({
        conversationStatus: "INACTIVE",
      });
    },
  }),
);
