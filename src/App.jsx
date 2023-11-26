import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';
import Todo from './pages/Todo';
import Kanban from './pages/Kanban';
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Navigate replace to="kanban" /> },
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
