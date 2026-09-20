import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "../Header";
import UrlShortener from "../UrlShortener";

// app component
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app p-5 bg-neutral-100 h-dvh">
        <div className="app__header mb-8">
          <Header />
        </div>

        <div className="app__urlInput">
          <UrlShortener />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
