import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "./components/ThemeProvider";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <RouterProvider router={routes} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
