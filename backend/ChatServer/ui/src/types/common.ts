export interface AppStoreState {
  conversationCode: string | null;
  setConversationCode: (code: string) => void;
  resetConversationCode: () => void;

  conversationStatus: ConversationStatusValues;
  setConversationStatus: (status: ConversationStatusValues) => void;
  resetConversationStatus: () => void;

  participantCount: number;
  incrementParticipantCount: () => number;
  decrementParticipantCount: () => number;
}
