import { AudioLines } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { useJoinConversation } from "../hooks/useChat";
import { useState } from "react";
import type { JoinStateType, UserStateType } from "../type";

const JoinConversationPanel = ({
  name,
  joinState,
  userState,
}: {
  name: string;
  joinState: JoinStateType;
  userState: UserStateType;
}) => {
  // states
  const [code, setCode] = useState<string>("");

  const joinConversation = useJoinConversation(userState.putUserId);

  const handleJoinConversation = () => {
    try {
      if (code.length == 0)
        throw new Error("Conversation code cannot be empty");

      joinConversation.mutate({ username: name, conversationCode: code });

      joinState.disableJoin();
    } catch (e) {
      console.log("Failed to join conversation", e);

      joinState.enableJoin();
    }
  };

  return (
    <div className="joinConversationPanel w-full flex items-end justify-between">
      <div className="joinConversationPanel__name">
        <Field>
          <FieldLabel htmlFor="name">Your Name</FieldLabel>

          <Input id="name" value={name} disabled={true} />
        </Field>
      </div>

      <div className="joinConversationPanel__code">
        <Field>
          <FieldLabel htmlFor="code">Conversation Code</FieldLabel>

          <Input
            disabled={joinState.joinState}
            onChange={(e) => setCode(e.target.value)}
            id="code"
            placeholder="Enter code"
          />
        </Field>
      </div>

      <div className="joinConversationPanel__joinButton">
        <Button
          disabled={joinState.joinState}
          onClick={handleJoinConversation}
          className="bg-green-200 hover:bg-green-300 text-green-900 cursor-pointer"
          variant={"outline"}
          size={"lg"}
        >
          <AudioLines /> Join
        </Button>
      </div>
    </div>
  );
};

export default JoinConversationPanel;
