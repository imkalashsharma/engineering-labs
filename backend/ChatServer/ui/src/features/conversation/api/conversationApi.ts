import { api } from "../../../lib/axios";

export interface CreateConversationResponse {
  conversationCode: string;
}

// POST: create new conversation code
export async function createConversation(): Promise<CreateConversationResponse> {
  const response = await api.post<CreateConversationResponse>(
    "/conversations/create",
  );

  return response.data;
}
