"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  type Persister,
  PersistQueryClientProvider,
} from "@tanstack/react-query-persist-client";
import { useEffect, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [persister, setPersister] = useState<Persister | null>(null);

  useEffect(() => {
    const createPersister = async () => {
      const { createSyncStoragePersister } = await import(
        "@tanstack/query-sync-storage-persister"
      );
      const newPersister = createSyncStoragePersister({
        storage: window.localStorage,
      });
      setPersister(newPersister);
    };
    createPersister();
  }, []);

  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </PersistQueryClientProvider>
  );
};
