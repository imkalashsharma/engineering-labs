import { AudioLines } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { connectToChat, useJoinConversation } from "../hooks/useChat";
import { useState } from "react";
import { useChatPanel } from "../context/ChatPanelContext";

const JoinConversationPanel = ({ username }: { username: string }) => {
  // states
  const [code, setCode] = useState<string>("");

  const chatPanel = useChatPanel();
  const joinConversation = useJoinConversation();

  const handleJoinConversation = () => {
    if (!code.trim()) return;

    chatPanel.setJoinState(true); // disable
    joinConversation.mutate(
      { username, conversationCode: code.trim() },
      {
        onSuccess: (data) => {
          chatPanel.setUserId(data.userId);
          chatPanel.setConversationId(data.conversationId);

          // connect to websocket
          const client = connectToChat(data.conversationId, data.userId);
          chatPanel.client.current = client;
        },

        onError: (error) => {
          console.error("Failed to join conversation", error);

          chatPanel.setJoinState(false);
        },
      },
    );
  };

  return (
    <div className="joinConversationPanel w-full flex items-end justify-between">
      <div className="joinConversationPanel__name">
        <Field>
          <FieldLabel htmlFor="name">Your Name</FieldLabel>

          <Input id="name" value={username} disabled={true} />
        </Field>
      </div>

      <div className="joinConversationPanel__code">
        <Field>
          <FieldLabel htmlFor="code">Conversation Code</FieldLabel>

          <Input
            disabled={chatPanel.joinState}
            onChange={(e) => setCode(e.target.value)}
            id="code"
            placeholder="Enter code"
          />
        </Field>
      </div>

      <div className="joinConversationPanel__joinButton">
        <Button
          disabled={chatPanel.joinState}
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
