import React from 'react';
import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader/SearchHeader';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { YoutubeApiProvider } from './context/YoutubeApiContext';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <React.Fragment>
      <SearchHeader />
      <YoutubeApiProvider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </React.Fragment>
  );
}
