import { ChatPanel } from "../../features/chat";
import { ConversationControlPanel } from "../../features/conversation";
import Footer from "./Footer";
import Navbar from "./Navbar";

const AppLayout = () => {
  return (
    <div className="app min-h-screen bg-slate-100 text-slate-900 p-4">
      <div className="app__navbar mb-5">
        <Navbar />
      </div>

      <div className="mb-8">
        <div className="app__conversation mb-8">
          <ConversationControlPanel />
        </div>

        <div className="app__chatPanel">
          <ChatPanel />
        </div>
      </div>

      <div className="app__footer mb-10">
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
