import { AudioLines, Loader2 } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Field, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import { connectToChat, useJoinConversation } from "../hooks/useChat";
import { useState } from "react";
import { useChatPanel } from "../context/ChatPanelContext";
import { getMessageHistory } from "../api/chatApi";
import type { ChatMessage } from "../type";
import { notify } from "../../../lib/toast";

const JoinConversationPanel = ({ username }: { username: string }) => {
  // states
  const [code, setCode] = useState<string>("");

  const chatPanel = useChatPanel();
  const joinConversation = useJoinConversation();

  const handleJoinConversation = () => {
    if (!code.trim()) {
      notify.error("Please enter a conversation code.");
      return;
    }

    chatPanel.setConversationCode(code.trim()); // set code for panel

    joinConversation.mutate(
      { username, conversationCode: code.trim() },
      {
        onSuccess: async (data) => {
          chatPanel.setUserId(data.userId);
          chatPanel.setConversationId(data.conversationId);

          // connect to websocket
          const client = connectToChat(
            data.conversationId,
            data.userId,
            chatPanel.setMessages,
          );

          chatPanel.client.current = client;

          // fetch message history
          try {
            const history: ChatMessage[] = await getMessageHistory(code.trim());

            chatPanel.setMessages((currentMessages) => [
              ...history,
              ...currentMessages,
            ]);
          } catch (error) {
            console.error("Failed to fetch message history", error);
          }

          chatPanel.setJoinState(true); // disable
          notify.success("Successfully joined the conversation!");
        },

        onError: (error) => {
          console.error("Failed to join conversation", error);

          chatPanel.setJoinState(false);

          notify.error(
            "Failed to join the conversation. Please check the code and try again.",
          );
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
            autoComplete="off"
          />
        </Field>
      </div>

      <div className="joinConversationPanel__joinButton">
        <Button
          disabled={chatPanel.joinState}
          onClick={handleJoinConversation}
          className="    bg-emerald-100
    text-emerald-700
    hover:bg-emerald-200
    border border-emerald-200 cursor-pointer"
          variant={"outline"}
          size={"lg"}
          aria-label="Join Conversation button"
        >
          {joinConversation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <AudioLines /> Join
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default JoinConversationPanel;
