
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
import CreatorSubmissions from "./pages/CreatorSubmissions"; 
import AllTasks from "./pages/AllTasks";
import AllSubmissions from "./pages/AllSubmissions";
import MySubmissions from "./pages/MySubmissions";
import SavedTasks from "./pages/SavedTasks";
import CategoryTasksPage from "./pages/CategoryTasksPage"; // adjust path accordingly
import SkillTasksPage from './pages/SkillsTasks';
import AdminCategoryManager from "./components/admin/CreatorManager"; // adjust path if needed
import SubcategoryManager from "./components/admin/SubCategoryManager";

           




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
            {/* <Route path="/task/:id/applications" element={<ReviewApplications />} /> */}
            <Route path="/tasks/:taskId/review-applications" element={<ReviewApplications />} />
            <Route path="/creator-submissions" element={<CreatorSubmissions />} />
            <Route path="/all-tasks" element={<AllTasks />} />
            <Route path="/all-submissions" element={<AllSubmissions />} />
            <Route path="/submissions" element={<MySubmissions />} />
            <Route path="/saved-tasks" element={<SavedTasks />} />
            <Route path="/category/:categoryName" element={<CategoryTasksPage />} />
            
            

            <Route path="/tasks/skills/:skill" element={<SkillTasksPage />} />
            <Route path="/admin/categories" element={<AdminCategoryManager />} />
            <Route path="/admin/subcategories" element={<SubcategoryManager />} />


          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
