import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Signup from './pages/Signup';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/signup', element: <Signup /> },
      { path: '/login', element: <Login /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
