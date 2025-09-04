import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.tsx';
import Login from './routes/Login';
import CreateAccount from './routes/CreateAccount';
import Dashboard from './routes/Dashboard';
import Workspace from './routes/Workspace';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import './index.css';

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <Login /> },
  { path: '/create-account', element: <CreateAccount /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/workspace', element: <Workspace /> },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ProjectProvider>
        <RouterProvider router={router} />
      </ProjectProvider>
    </AuthProvider>
  </StrictMode>
);
