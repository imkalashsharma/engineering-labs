import { useMutation } from "@tanstack/react-query";

import { createConversation } from "../api/conversationApi";
import { useAppStore } from "../../shared/store/AppStore";

export function useCreateConversation() {
  const setConversationCode = useAppStore((state) => state.setConversationCode);

  const setConversationStatus = useAppStore(
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
