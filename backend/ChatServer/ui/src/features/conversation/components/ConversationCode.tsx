import { Copy } from "lucide-react";
import { Button } from "../../../components/ui/button";

import type { ConversationCodeInterface } from "../types";

const ConversationCode = ({ code }: ConversationCodeInterface) => {
  return (
    <div className="conversationCode flex flex-col items-center">
      <div className="conversationCode__header text-sm mb-3">
        Conversation Code
      </div>

      <div className="conversationCode__input flex items-center gap-2 w-full">
        <div className="conversationCode__input__text py-1 px-2 rounded-sm text-xl w-4/5 bg-blue-100 text-center">
          {code}
        </div>

        <div className="conversationCode__input__copy w-1/5">
          <Button
            className="cursor-pointer"
            variant="ghost"
            size="icon"
            onClick={() => navigator.clipboard.writeText(code)}
          >
            <Copy />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationCode;
