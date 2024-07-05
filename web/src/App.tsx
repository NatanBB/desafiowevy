import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { Main } from './pages/main';
import { ProtectedRoute } from './utils/protectedRoute';
import { NotFound } from './pages/404';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute children={<Main />} />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/404",
      element: <NotFound />
    },
    {
      path: "*",
      element: <Navigate to={"/404"} />
    }
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
