import { create } from "zustand";
import type { ConversationStatusValues } from "../../conversation/types";

// types

interface AppStoreState {
  conversationCode: string | null;
  conversationStatus: ConversationStatusValues;
  participantCount: number;

  setConversationCode: (code: string) => void;
  resetConversationCode: () => void;

  setConversationStatus: (status: ConversationStatusValues) => void;
  resetConversationStatus: () => void;

  incrementParticipantCount: () => number;
  decrementParticipantCount: () => number;
}

export const useAppStore = create<AppStoreState>((set) => ({
  conversationCode: null,
  conversationStatus: "INACTIVE",
  participantCount: 0,

  setConversationCode: (code) =>
    set({
      conversationCode: code,
    }),

  resetConversationCode: () =>
    set({
      conversationCode: null,
    }),

  setConversationStatus: (status) =>
    set({
      conversationStatus: status,
    }),

  resetConversationStatus: () =>
    set({
      conversationStatus: "INACTIVE",
    }),

  incrementParticipantCount: () => {
    let newCount = 0;

    set((state) => {
      newCount = state.participantCount + 1;

      return {
        participantCount: newCount,
      };
    });

    return newCount;
  },

  decrementParticipantCount: () => {
    let newCount = 0;

    set((state) => {
      newCount = Math.max(0, state.participantCount - 1);

      return {
        participantCount: newCount,
      };
    });

    return newCount;
  },
}));
