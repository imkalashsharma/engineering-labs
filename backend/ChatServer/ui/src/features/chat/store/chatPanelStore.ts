import { create } from "zustand";

interface ChatPanelState {
  participantCount: number;
  incrementParticipantCount: () => number;
  decrementParticipantCount: () => number;
}

export const useChatPanelStore = create<ChatPanelState>((set) => ({
  participantCount: 0,

  incrementParticipantCount: () => {
    let newCount = 0;

    set((state) => {
      newCount = Math.max(0, state.participantCount + 1);

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
