import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { notify } from "../../../lib/toast";
import useConversation from "../hooks/useConversation";

import type { Conversation } from "../types";

const GenerateCodeButton = () => {
  const { setConversation } = useConversation();

  const handleClick = () => {
    try {
      // make api call here
      const code = "ISWQAS";

      const conversation: Conversation = {
        conversationCode: code,
        status: "WAITING_FOR_USERS",
        participantCount: 0,
      };

      // save conversation
      setConversation(conversation);

      notify.success("New code generated.");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="generateCodeButton">
      <Button
        className="bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
        onClick={handleClick}
        variant="default"
        size={"lg"}
      >
        <Plus data-icon="inline-end" />
        Generate New Code
      </Button>
    </div>
  );
};

export default GenerateCodeButton;
