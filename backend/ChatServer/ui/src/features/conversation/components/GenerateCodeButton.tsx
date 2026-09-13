import { Button } from "../../../components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { notify } from "../../../lib/toast";

import { useCreateConversation } from "../hooks/useCreateConversation";

const GenerateCodeButton = () => {
  const createConversation = useCreateConversation();

  const handleClick = () => {
    createConversation.mutate(undefined, {
      onSuccess: () => {
        notify.success("New code generated.");
      },

      onError: (error) => {
        notify.error(error.message);
      },
    });
  };

  return (
    <div className="generateCodeButton">
      <Button
        className="bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
        onClick={handleClick}
        variant="default"
        size={"lg"}
        disabled={createConversation.isPending}
      >
        {createConversation.isPending ? (
          <Loader2 className="animate-spin" data-icon="inline-end" />
        ) : (
          <Plus data-icon="inline-end" />
        )}
        Generate New Code
      </Button>
    </div>
  );
};

export default GenerateCodeButton;
