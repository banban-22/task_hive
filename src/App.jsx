import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Todo from './pages/Todo';
import Kanban from './pages/Kanban';
import Calendar from './pages/Calendar';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Navigate replace to="kanban" /> },
      // { path: '/dashboard', element: <Dashboard /> },
      { path: '/todo', element: <Todo /> },
      { path: '/kanban', element: <Kanban /> },
      // { path: '/calendar', element: <Calendar /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
