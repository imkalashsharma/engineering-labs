import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { SendHorizontal } from "lucide-react";

const ChatInput = () => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  return (
    <div className="chatInput w-full flex items-center justify-between">
      <div className="chatInput__input w-5/6">
        <Input
          placeholder="Your message ..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
      </div>

      <div className="chatInput__sendButton w-1/6 flex justify-end">
        <Button
          variant={"outline"}
          className="bg-blue-200 hover:bg-blue-300 text-blue-900 hover:text-blue-900 cursor-pointer"
        >
          <SendHorizontal /> Send
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
