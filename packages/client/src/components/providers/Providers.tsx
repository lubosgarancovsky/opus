'use client';
import React, { useRef } from 'react';
import { store } from '@/store';
import { Provider } from 'react-redux';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProvidersProps {
  children: React.ReactNode;
  session: any;
}

export const Providers: React.FC<ProvidersProps> = ({ children, session }) => {
  const queryClient = useRef(new QueryClient());
  return (
    <QueryClientProvider client={queryClient.current}>
      <SessionProvider session={session}>
        <Provider store={store}>{children}</Provider>
      </SessionProvider>
    </QueryClientProvider>
  );
};
