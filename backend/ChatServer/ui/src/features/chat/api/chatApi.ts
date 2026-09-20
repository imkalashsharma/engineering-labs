import { api } from "../../../lib/axios";
import type { ConversationStatusValues } from "../../conversation/types";

export interface JoinConversationResponse {
  conversationId: string;
  userId: string;
  status: ConversationStatusValues;
}

export async function joinConversation(
  username: string,
  conversationCode: string,
) {
  const response = await api.post<JoinConversationResponse>(
    `/conversations/${conversationCode}/join`,
    {
      username,
    },
  );

  return response.data;
}

export async function leaveConversation(
  conversationCode: string,
  userId: string,
) {
  await api.delete(`/conversations/${conversationCode}/participants/${userId}`);
}

export async function getMessageHistory(conversationCode: string) {
  const response = await api.get(`/conversations/${conversationCode}/messages`);

  console.log(
    `Messages retrieved for conversation code: ${conversationCode}`,
    response.data,
  );

  return response.data;
}
