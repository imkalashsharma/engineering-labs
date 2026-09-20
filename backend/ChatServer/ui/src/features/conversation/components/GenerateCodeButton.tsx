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
        className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm cursor-pointer"
        onClick={handleClick}
        variant="default"
        size={"lg"}
        disabled={createConversation.isPending}
      >
        {createConversation.isPending ? (
          <Loader2
            className="mr-2 h-4 w-4 animate-spin"
            data-icon="inline-end"
          />
        ) : (
          <Plus className="mr-2 h-4 w-4" data-icon="inline-end" />
        )}
        Generate New Code
      </Button>
    </div>
  );
};

export default GenerateCodeButton;
