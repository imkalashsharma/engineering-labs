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
  const statusConfig = {
    ACTIVE: {
      label: "Active",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
    },
    WAITING_FOR_USERS: {
      label: "Waiting for Users",
      color: "text-amber-600",
      bg: "bg-amber-50",
      border: "border-amber-200",
    },
    CLOSED: {
      label: "Closed",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    },
    INACTIVE: {
      label: "Inactive",
      color: "text-slate-500",
      bg: "bg-slate-50",
      border: "border-slate-200",
    },
  };

  const config = statusConfig[status];

  return (
    <div
      className={`conversationDetails flex items-center justify-center gap-2 rounded-full border px-3 py-1 ${config.bg} ${config.border}`}
    >
      <div className={`conversationDetails__dot ${config.color}`}>
        <CircleDot size={16} />
      </div>

      <span
        className={`conversationDetails__label text-sm font-medium ${config.color}`}
      >
        {config.label}
      </span>
    </div>
  );
};

export default ConversationStatus;
