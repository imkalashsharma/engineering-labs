import { Copy } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { useAppStore } from "../../shared/store/AppStore";

const ConversationCode = () => {
  const conversationCode = useAppStore((state) => state.conversationCode);

  const handleCopy = async () => {
    if (!conversationCode) return;

    await navigator.clipboard.writeText(conversationCode);
  };

  return (
    <div className="conversationCode flex flex-col items-start gap-2">
      <div className="conversationCode__header text-sm font-medium text-slate-700">
        Conversation Code
      </div>

      <div className="conversationCode__input flex items-center gap-1">
        <div
          className="
            inline-flex
            h-10
            items-center
            rounded-lg
            border
            border-blue-200
            bg-blue-50
            px-4
            font-mono
            text-sm
            font-semibold
            tracking-[0.2em]
            text-blue-700
          "
        >
          {conversationCode || "------"}
        </div>

        <Button
          variant="ghost"
          size="icon"
          disabled={!conversationCode}
          onClick={handleCopy}
          className="
            h-9
            w-9
            cursor-pointer
            text-slate-500
            hover:bg-slate-100
            hover:text-slate-900
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
          aria-label="Copy conversation code"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ConversationCode;
