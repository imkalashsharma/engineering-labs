import { ConversationControlPanel } from "../../features/conversation";
import { ConversationProvider } from "../../features/conversation/context/ConversationContext";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="app p-4">
      <div className="app__navbar mb-5">
        <Navbar />
      </div>

      <div className="app__conversation">
        <ConversationProvider>
          <ConversationControlPanel />
        </ConversationProvider>
      </div>
    </div>
  );
};

export default AppLayout;
