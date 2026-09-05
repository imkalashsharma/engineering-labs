import { CircleDot } from "lucide-react";
import useConversation from "../hooks/useConversation";

import type { ConversationStatus } from "../types";

const ConversationStatus = () => {
  const { conversation } = useConversation();

  return (
    <div className="conversationStatus">
      <div className="conversationStatus__header text-sm font-medium mb-3">
        Status
      </div>

      {conversation ? (
        <ConversationDetails status={conversation.status} />
      ) : (
        <>No conversation</>
      )}
    </div>
  );
};

const ConversationDetails = ({ status }: { status: ConversationStatus }) => {
  return (
    <div className="conversationDetails flex items-center justify-center gap-2">
      <div
        className={`conversationDetails__dot ${status === "ACTIVE" ? "text-green-500" : status === "WAITING_FOR_USERS" ? "text-amber-500" : "text-red-500"}`}
      >
        <CircleDot size={20} />
      </div>

      <div
        className={`conversationDetails__label text-sm font-medium ${status === "ACTIVE" ? "text-green-500" : status === "WAITING_FOR_USERS" ? "text-amber-500" : "text-red-500"}`}
      >
        {status === "WAITING_FOR_USERS" && <p>Waiting for Users</p>}

        {status === "CLOSED" && <p>Closed</p>}

        {status === "ACTIVE" && <p>Active</p>}
      </div>
    </div>
  );
};

export default ConversationStatus;
