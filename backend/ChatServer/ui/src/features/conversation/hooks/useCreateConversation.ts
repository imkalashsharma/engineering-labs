import { useMutation } from "@tanstack/react-query";

import { createConversation } from "../api/conversationApi";
import { useConversationStore } from "../store/conversationStore";

export function useCreateConversation() {
  const setConversationCode = useConversationStore(
    (state) => state.setConversationCode,
  );

  return useMutation({
    mutationFn: createConversation,

    onSuccess: (data) => {
      console.log("POST: create conversation action", data);

      setConversationCode(data.conversationCode);
    },
  });
}
