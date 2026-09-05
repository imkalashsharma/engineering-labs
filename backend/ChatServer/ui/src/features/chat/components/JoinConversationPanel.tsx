import { AudioLines } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";

const JoinConversationPanel = ({ name }: { name: string }) => {
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

          <Input id="code" placeholder="Enter code" />
        </Field>
      </div>

      <div className="joinConversationPanel__joinButton">
        <Button
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
