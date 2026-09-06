import { CircleDot } from "lucide-react";

import type { ConversationStatusValues } from "../types";
import { useAppStore } from "../../shared/store/AppStore";

const ConversationStatus = () => {
  const conversationStatus: ConversationStatusValues = useAppStore(
    (state) => state.conversationStatus,
  );

  return (
    <div className="conversationStatus">
      <div className="conversationStatus__header text-sm font-medium mb-3">
        Status
      </div>

      <ConversationDetails status={conversationStatus} />
    </div>
  );
};

const ConversationDetails = ({
  status,
}: {
  status: ConversationStatusValues;
}) => {
  return (
    <div className="conversationDetails flex items-center justify-center gap-2">
      <div
        className={`conversationDetails__dot ${status === "ACTIVE" ? "text-green-500" : status === "WAITING_FOR_USERS" ? "text-amber-500" : status === "CLOSED" ? "text-red-500" : "text-zinc-500"}`}
      >
        <CircleDot size={20} />
      </div>

      <div
        className={`conversationDetails__label text-sm font-medium ${status === "ACTIVE" ? "text-green-500" : status === "WAITING_FOR_USERS" ? "text-amber-500" : status === "CLOSED" ? "text-red-500" : "text-zinc-500"}`}
      >
        {status === "WAITING_FOR_USERS" && <p>Waiting for Users</p>}

        {status === "CLOSED" && <p>Closed</p>}

        {status === "ACTIVE" && <p>Active</p>}

        {status === "INACTIVE" && <p>Inactive</p>}
      </div>
    </div>
  );
};

export default ConversationStatus;
