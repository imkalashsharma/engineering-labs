export interface ChatPanelHeaderPropsInterface {
  username: string;
  imgUrl: string;
}

export interface ChatPanelPresentationPropsInterface {
  user: string;
  imgUrl: string;
}

export type User = {
  name: string;
  imgUrl: string;
};

export interface ChatMessage {
  messageId: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
}
