import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient();

// Crear un persister para localStorage
const localStoragePersister = createSyncStoragePersister({
  storage: window.localStorage, // Puedes usar sessionStorage si lo prefieres
});

// Configurar la persistencia de React Query
persistQueryClient({
  queryClient,
  persister: localStoragePersister,
  maxAge: 1000 * 60 * 60 * 24, // Tiempo máximo para mantener los datos en caché (en milisegundos)
  buster: "my-persist-version",
});

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
