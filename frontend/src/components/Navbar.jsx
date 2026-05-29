import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LogOut, User, Bookmark } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-indigo-600 text-xl">
          <Briefcase size={24} />
          JobPortal
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/jobs" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
            Browse Jobs
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                Login
              </Link>
              <Link to="/register" className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {user.role === 'employer' ? (
                <>
                  <Link to="/post-job" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                    Post Job
                  </Link>
                  <Link to="/employer/dashboard" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                    Dashboard
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/my-applications" className="text-gray-600 hover:text-indigo-600 text-sm font-medium">
                    Applications
                  </Link>
                  <Link to="/saved-jobs" className="text-gray-600 hover:text-indigo-600 text-sm font-medium flex items-center gap-1">
                    <Bookmark size={15} /> Saved
                  </Link>
                </>
              )}
              <Link to="/profile" className="flex items-center gap-2 text-sm text-gray-700 hover:text-indigo-600">
                <User size={16} />
                {user.name}
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-600">
                <LogOut size={16} /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}