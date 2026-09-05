import { AudioLinesOff } from "lucide-react";
import { Button } from "../../../components/ui/button";

// types
import type { ChatPanelHeaderPropsInterface } from "../type";

const ChatPanelHeader = ({ user, imgUrl }: ChatPanelHeaderPropsInterface) => {
  return (
    <div className="chatPanelHeader flex justify-between items-center">
      <div className="chatPanelHeader__user flex gap-5">
        <div className="chatPanelHeader__user__thumbnail flex flex-col items-center justify-center">
          <img className="w-10 h-10" src={imgUrl} alt={`${user} image`} />
        </div>

        <div className="chatPanelHeader__user__info">
          <div className="chatPanelHeader__user__info__name mb-1 font-semibold">
            {user}
          </div>

          <div className="chatPanelHeader__user__info__details text-sm">
            Simulated Client
          </div>
        </div>
      </div>

      <div className="chatPanelHeader__leave">
        <Button className="cursor-pointer" variant={"destructive"}>
          <AudioLinesOff data-icon="inline-start" /> Leave
        </Button>
      </div>
    </div>
  );
};

export default ChatPanelHeader;
