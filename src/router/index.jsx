import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { appRoutes } from './routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: appRoutes,
  },
]);
