import { useMutation } from "@tanstack/react-query";

import { createConversation } from "../api/conversationApi";
import {
  useConversationStatusStore,
  useConversationStore,
} from "../store/conversationStore";

export function useCreateConversation() {
  const setConversationCode = useConversationStore(
    (state) => state.setConversationCode,
  );

  const setConversationStatus = useConversationStatusStore(
    (state) => state.setConversationStatus,
  );

  return useMutation({
    mutationFn: createConversation,

    onSuccess: (data) => {
      console.log("POST: create conversation action", data);

      setConversationCode(data.conversationCode);
      setConversationStatus("WAITING_FOR_USERS");
    },
  });
}
