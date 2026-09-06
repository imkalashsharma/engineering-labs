import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { notify } from "../../../lib/toast";

import { useCreateConversation } from "../hooks/useCreateConversation";

const GenerateCodeButton = () => {
  const createConversation = useCreateConversation();

  const handleClick = () => {
    try {
      createConversation.mutate();

      notify.success("New code generated.");
    } catch (e) {
      console.error(e);
    }
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
        <Plus data-icon="inline-end" />
        Generate New Code
      </Button>
    </div>
  );
};

export default GenerateCodeButton;
