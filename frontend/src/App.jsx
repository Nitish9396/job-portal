import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import PostJob from './pages/PostJob';
import MyApplications from './pages/MyApplications';
import EmployerDashboard from './pages/EmployerDashboard';
import Profile from './pages/Profile';
import Applicants from './pages/Applicants';
import SavedJobs from './pages/SavedJobs';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/:id" element={<JobDetail />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/applicants/:jobId" element={<Applicants />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-jobs" element={<SavedJobs />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}