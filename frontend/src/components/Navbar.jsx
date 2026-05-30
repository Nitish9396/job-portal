import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, LogOut, User, Bookmark, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
            <Briefcase size={16} className="text-white" />
          </div>
          <span className="gradient-text">JobPortal</span>
        </Link>

        <div className="hidden md:flex items-center gap-5">
          <Link to="/jobs" className="text-gray-400 hover:text-white text-sm font-medium transition">
            Browse Jobs
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="text-gray-400 hover:text-white text-sm font-medium transition">
                Login
              </Link>
              <Link to="/register" className="gradient-btn text-white px-4 py-2 rounded-lg text-sm font-medium">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              {user.role === 'employer' ? (
                <>
                  <Link to="/post-job" className="text-gray-400 hover:text-white text-sm font-medium transition">Post Job</Link>
                  <Link to="/employer/dashboard" className="text-gray-400 hover:text-white text-sm font-medium transition">Dashboard</Link>
                </>
              ) : (
                <>
                  <Link to="/my-applications" className="text-gray-400 hover:text-white text-sm font-medium transition">Applications</Link>
                  <Link to="/saved-jobs" className="text-gray-400 hover:text-white text-sm font-medium transition flex items-center gap-1">
                    <Bookmark size={14} /> Saved
                  </Link>
                </>
              )}
              <Link to="/profile" className="flex items-center gap-2 glass px-3 py-1.5 rounded-full text-sm text-gray-300 hover:text-white transition">
                <div className="w-6 h-6 rounded-full gradient-btn flex items-center justify-center text-xs font-bold text-white">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                {user.name}
              </Link>
              <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition">
                <LogOut size={15} />
              </button>
            </>
          )}
        </div>

        <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass border-t border-white/10 px-4 py-4 flex flex-col gap-3">
          <Link to="/jobs" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm">Browse Jobs</Link>
          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm">Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="gradient-btn text-white px-4 py-2 rounded-lg text-sm text-center">Sign Up</Link>
            </>
          ) : (
            <>
              {user.role === 'employer' ? (
                <>
                  <Link to="/post-job" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm">Post Job</Link>
                  <Link to="/employer/dashboard" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm">Dashboard</Link>
                </>
              ) : (
                <>
                  <Link to="/my-applications" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm">Applications</Link>
                  <Link to="/saved-jobs" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm">Saved Jobs</Link>
                </>
              )}
              <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white text-sm">Profile</Link>
              <button onClick={handleLogout} className="text-red-400 text-sm text-left">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}