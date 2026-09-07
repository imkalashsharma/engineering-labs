import { useMutation } from "@tanstack/react-query";
import {
  joinConversation,
  leaveConversation,
  type JoinConversationResponse,
} from "../api/chatApi";
import { useAppStore } from "../../shared/store/AppStore";
import { createStompClient } from "../websocket/stompClient";
import type { Client } from "@stomp/stompjs";

export function useJoinConversation() {
  const incrementParticipantCount = useAppStore(
    (state) => state.incrementParticipantCount,
  );

  const setConversationStatus = useAppStore(
    (state) => state.setConversationStatus,
  );

  return useMutation({
    mutationFn: ({
      username,
      conversationCode,
    }: {
      username: string;
      conversationCode: string;
    }) => joinConversation(username, conversationCode.trim()),

    onSuccess: (data: JoinConversationResponse) => {
      console.log(`POST: Join conversation action`, data);

      // set conversation status
      const newCount = incrementParticipantCount();

      console.log(`New participant count: ${newCount}`);

      if (newCount === 2) setConversationStatus("ACTIVE");
      else if (newCount == 1) setConversationStatus("WAITING_FOR_USERS");
    },
  });
}

export function useLeaveConversation(
  setUserId: (userId: string | null) => void,
) {
  const decrementParticipantCount = useAppStore(
    (state) => state.decrementParticipantCount,
  );

  const setConversationStatus = useAppStore(
    (state) => state.setConversationStatus,
  );

  return useMutation({
    mutationFn: ({
      conversationCode,
      userId,
    }: {
      conversationCode: string;
      userId: string;
    }) => leaveConversation(conversationCode, userId),

    onSuccess: () => {
      console.log("DELETE: User left conversation");

      setUserId(null);

      // set conversation status
      const newCount: number = decrementParticipantCount();

      console.log(`New participant count: ${newCount}`);

      if (newCount === 1) setConversationStatus("WAITING_FOR_USERS");
      else if (newCount === 0) setConversationStatus("INACTIVE");
    },
  });
}

// function to connect chat
export const connectToChat = (conversationId: string, userId: string) => {
  const stompClient = createStompClient();

  stompClient.onConnect = () => {
    console.log("Connected as:", userId);

    stompClient.subscribe(
      `/topic/conversations/${conversationId}`,
      (message) => {
        const event = JSON.parse(message.body);

        console.log("Received message:", event);
      },
    );
  };

  stompClient.activate();

  return stompClient;
};

// function to send message
export const sendMessage = (
  client: Client | null,
  conversationId: string,
  userId: string,
  content: string,
) => {
  if (!client?.connected) {
    console.log("WebSocket is not connected");
    return;
  }

  client.publish({
    destination: `/app/conversations/${conversationId}/messages`,
    body: JSON.stringify({
      conversationId,
      senderId: userId,
      content,
    }),
  });
};
