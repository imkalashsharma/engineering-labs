import { AudioLines } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { useJoinConversation } from "../hooks/useJoinConversation";
import { useState } from "react";

const JoinConversationPanel = ({ name }: { name: string }) => {
  const joinConversation = useJoinConversation();

  const [code, setCode] = useState<string>("");
  const [disableJoin, setDisableJoin] = useState<boolean>(false);

  const handleJoinConversation = () => {
    try {
      if (code.length == 0)
        throw new Error("Conversation code cannot be empty");

      joinConversation.mutate({ username: name, conversationCode: code });

      setDisableJoin(true);
    } catch (e) {
      console.log("Failed to join conversation", e);

      setDisableJoin(false);
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
            onChange={(e) => setCode(e.target.value)}
            id="code"
            placeholder="Enter code"
          />
        </Field>
      </div>

      <div className="joinConversationPanel__joinButton">
        <Button
          disabled={disableJoin}
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
