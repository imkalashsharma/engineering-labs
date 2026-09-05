export interface ConversationCodeInterface {
  code: string;
}

export type ConversationStatus = "WAITING_FOR_USERS" | "ACTIVE" | "CLOSED";

export interface Conversation {
  conversationCode: string;
  status: ConversationStatus;
  participantCount: number;
}

export interface ConversationContextValue {
  conversation: Conversation | null;
  setConversation: (conversation: Conversation | null) => void;
}
