import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import TaskDetailsPage from './pages/TaskDetailsPage';
import CreateTaskPage from './pages/CreateTaskPage';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import RoleSelector from './components/auth/RoleSelector';

const routes = [
  { path: '/', element: <Home /> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/select-role', element: <RoleSelector /> },
  { path: '/dashboard', element: <Dashboard />, protected: true },
  { path: '/task/:taskId', element: <TaskDetailsPage />, protected: true },
  { path: '/create-task', element: <CreateTaskPage />, protected: true },
  { path: '/admin', element: <AdminPanel />, protected: true, role: 'admin' },
  { path: '*', element: <NotFound /> },
];

export default routes;
