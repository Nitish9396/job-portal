import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Briefcase, Mail, Lock } from 'lucide-react';
import API_URL from '../config';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/login`, form);
      login(data);
      toast.success('Welcome back!');
      navigate(data.role === 'employer' ? '/employer/dashboard' : '/jobs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
    setLoading(false);
  };

  return (
    <div className="mesh-bg min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 gradient-btn rounded-2xl flex items-center justify-center mx-auto mb-4 glow">
            <Briefcase size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} required
                  placeholder="john@example.com"
                  className="input-dark w-full rounded-xl pl-10 pr-4 py-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input type="password" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })} required
                  placeholder="Your password"
                  className="input-dark w-full rounded-xl pl-10 pr-4 py-3 text-sm" />
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="gradient-btn w-full text-white font-semibold py-3 rounded-xl disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-purple-400 font-medium hover:text-purple-300">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}