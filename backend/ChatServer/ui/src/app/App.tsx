import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppLayout from "../components/layout/AppLayout";
import { Toaster } from "../components/ui/toast";

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppLayout />
        <Toaster />
      </QueryClientProvider>
    </>
  );
};

export default App;
