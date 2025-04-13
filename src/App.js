
import { Routes, Route } from 'react-router-dom';
import Footer from './components/common/Footer';

import ProtectedRoute from './components/common/ProtectedRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateTaskPage from './pages/CreateTaskPage';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';
import BrowseTasks from './pages/BrowseTasks';
import Topbar from './components/common/Topbar';
import TaskDetail from "./pages/TaskDetailsPage";
import PersonalDetails from './pages/PersonalDetails';
import SubmitTaskForm from './pages/SubmitForm';
import MyTasksPage from './pages/MyTasksPage';
import ReviewApplications from './pages/ReviewApplications';


function App() {
  return (
    <div className="App">
      <Topbar/>

      <div className="main-content d-flex">
        <div className="content p-3 w-100">
          <Routes>
            <Route path="/" element={<Home />} />
         
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route path="/profile" element={<PersonalDetails />} />
            <Route path="/create-task" element={<ProtectedRoute><CreateTaskPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute role="admin"><AdminPanel /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
            <Route path="/browse-tasks" element={<BrowseTasks />} />
            <Route path="/task/:id" element={<TaskDetail />} />
            <Route path="/submit-task/:taskId" element={<SubmitTaskForm />} />
            <Route path="/my-tasks" element={<MyTasksPage />} />
            <Route path="/task/:id/applications" element={<ReviewApplications />} />


            


          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
