import { IconMessage } from "@tabler/icons-react";
import ConversationCode from "./ConversationCode";
import GenerateCodeButton from "./GenerateCodeButton";
import ConversationStatus from "./ConversationStatus";
import HowItWorks from "./HowItWorks";

const ConversationControlPanel = () => {
  return (
    <div className="flex w-full justify-center">
      <div
        className="
          conversationControlPanel
          flex
          w-5/6
          items-center
          gap-8
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-6
          py-4
          shadow-sm
     "
      >
        <div className="conversation__header flex-1">
          <ConversationHeader />
        </div>

        <div className="conversation__code shrink-0">
          <ConversationCode />
        </div>

        <div className="conversation__generateCode shrink-0">
          <GenerateCodeButton />
        </div>

        <div className="conversation__status shrink-0">
          <ConversationStatus />
        </div>

        <div
          className="
        conversation__howItWorks
        shrink-0
        border-l
        border-slate-200
        pl-8
      "
        >
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
