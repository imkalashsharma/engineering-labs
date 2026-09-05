import { ChatPanel } from "../../features/chat";
import { ConversationControlPanel } from "../../features/conversation";
import { ConversationProvider } from "../../features/conversation/context/ConversationContext";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="app p-4">
      <div className="app__navbar mb-5">
        <Navbar />
      </div>

      <div className="mb-8">
        <ConversationProvider>
          <div className="app__conversation mb-8">
            <ConversationControlPanel />
          </div>

          <div className="app__chatPanel">
            <ChatPanel />
          </div>
        </ConversationProvider>
      </div>

      <div className="app__footer">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
