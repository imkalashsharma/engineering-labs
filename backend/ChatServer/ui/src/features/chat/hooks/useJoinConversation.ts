import { useMutation } from "@tanstack/react-query";
import {
  joinConversation,
  type JoinConversationResponse,
} from "../api/chatApi";
import { useConversationStatusStore } from "../../conversation/store/conversationStore";

export function useJoinConversation() {
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

      setConversationStatus(data.status);
    },
  });
}
