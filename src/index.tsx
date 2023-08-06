import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { RecoilRoot } from "recoil";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
