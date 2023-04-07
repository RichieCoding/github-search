import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from  './components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import  { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import Home from './components/Home'
import UserCard from './components/UserCard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Home /></Layout>
  },
  {
    path: '/users/:id',
    element: <Layout><UserCard /></Layout>
  }
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);

