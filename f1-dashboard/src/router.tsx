import { createBrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DriverProfile from './pages/DriverProfile';
import TeamPage from './pages/TeamPage';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/driver/:driverNumber',
    element: <DriverProfile />,
  },
  {
    path: '/team/:teamName',
    element: <TeamPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
