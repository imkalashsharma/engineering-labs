import { Button } from "../../../components/ui/button";
import { Plus } from "lucide-react";
import { notify } from "../../../lib/toast";

const GenerateCodeButton = () => {
  const handleClick = () => {
    notify.success("New code generated.");
  };

  return (
    <div className="generateCodeButton">
      <Button
        className="bg-blue-400 hover:bg-blue-500 text-white cursor-pointer"
        onClick={handleClick}
        variant="default"
        size={"lg"}
      >
        <Plus data-icon="inline-end" />
        Generate New Code
      </Button>
    </div>
  );
};

export default GenerateCodeButton;
