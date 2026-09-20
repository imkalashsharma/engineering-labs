import { Book } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="howItWorks">
      <div className="howItWorks__header flex gap-2 mb-3">
        <div className="howItWorks__header__img">
          <Book />
        </div>

        <div className="howItWorks__text font-medium">How it works</div>
      </div>

      <div className="howItWorks__details text-sm">
        <p>1. Share the conversation code</p>
        <p>2. Both users click join</p>
        <p>3. Start chatting in real-time</p>
      </div>
    </div>
  );
};

export default HowItWorks;
