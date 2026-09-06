import { useMutation } from "@tanstack/react-query";
import {
  joinConversation,
  leaveConversation,
  type JoinConversationResponse,
} from "../api/chatApi";
import { useConversationStatusStore } from "../../conversation/store/conversationStore";
import { useChatPanelStore } from "../store/chatPanelStore";

export function useJoinConversation(setUserId: (userId: string) => void) {
  const incrementParticipantCount = useChatPanelStore(
    (state) => state.incrementParticipantCount,
  );

  const setConversationStatus = useConversationStatusStore(
    (state) => state.setConversationStatus,
  );

  return useMutation({
    mutationFn: ({
      username,
      conversationCode,
    }: {
      username: string;
      conversationCode: string;
    }) => joinConversation(username, conversationCode),

    onSuccess: (data: JoinConversationResponse) => {
      console.log(`POST: Join conversation action`, data);

      // set user id
      setUserId(data.userId);

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
  const decrementParticipantCount = useChatPanelStore(
    (state) => state.decrementParticipantCount,
  );

  const setConversationStatus = useConversationStatusStore(
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
