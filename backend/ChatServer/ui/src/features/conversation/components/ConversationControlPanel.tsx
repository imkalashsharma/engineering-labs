import { IconMessage } from "@tabler/icons-react";
import ConversationCode from "./ConversationCode";
import { useState } from "react";
import GenerateCodeButton from "./GenerateCodeButton";
import ConversationStatus from "./ConversationStatus";
import HowItWorks from "./HowItWorks";

const ConversationControlPanel = () => {
  const [conversationCode, setConversationCode] = useState<string>("hi tehre");

  return (
    <div className="flex items-center justify-center">
      <div className="conversationControlPanel flex items-center justify-around w-5/6 bg-neutral-100 shadow-lg rounded-md p-4">
        <div className="conversation__header">
          <ConversationHeader />
        </div>

        <div className="conversation__code">
          <ConversationCode code={conversationCode} />
        </div>

        <div className="conversation__generateCode flex items-center justify-center">
          <GenerateCodeButton />
        </div>

        <div className="conversation__status">
          <ConversationStatus />
        </div>

        <div className="conversation__howItWorks">
          <HowItWorks />
        </div>
      </div>
    </div>
  );
};

const ConversationHeader = () => {
  return (
    <div className="conversationHeader flex gap-5">
      <div className="conversationHeader__icon flex items-center">
        <IconMessage size={45} />
      </div>

      <div className="conversationHeader__info">
        <div className="conversationHeader__info__heading text-sm mb-3">
          Conversation
        </div>

        <div className="conversationHeader__info__subheading text-xl font-semibold">
          Start a New Conversation
        </div>
      </div>
    </div>
  );
};

export default ConversationControlPanel;
