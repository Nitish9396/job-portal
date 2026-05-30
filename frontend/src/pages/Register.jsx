import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Briefcase, Mail, Lock, User, Building2 } from 'lucide-react';
import API_URL from '../config';

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'seeker', company: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/register`, form);
      login(data);
      toast.success('Account created!');
      navigate(data.role === 'employer' ? '/employer/dashboard' : '/jobs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  };

  return (
    <div className="mesh-bg min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 gradient-btn rounded-2xl flex items-center justify-center mx-auto mb-4 glow">
            <Briefcase size={24} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">Create Account</h1>
          <p className="text-gray-400 mt-2">Join thousands of job seekers and employers</p>
        </div>

        <div className="glass-card rounded-3xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Full Name</label>
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input name="name" value={form.name} onChange={handleChange} required
                  placeholder="John Doe"
                  className="input-dark w-full rounded-xl pl-10 pr-4 py-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input name="email" type="email" value={form.email} onChange={handleChange} required
                  placeholder="john@example.com"
                  className="input-dark w-full rounded-xl pl-10 pr-4 py-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input name="password" type="password" value={form.password} onChange={handleChange} required
                  placeholder="Min 6 characters"
                  className="input-dark w-full rounded-xl pl-10 pr-4 py-3 text-sm" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-300 block mb-2">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {['seeker', 'employer'].map((role) => (
                  <button type="button" key={role} onClick={() => setForm({ ...form, role })}
                    className={`py-3 rounded-xl text-sm font-medium capitalize transition border
                      ${form.role === role
                        ? 'gradient-btn text-white border-transparent'
                        : 'glass text-gray-400 border-white/10 hover:border-purple-500/50'
                      }`}>
                    {role === 'seeker' ? '👤 Job Seeker' : '🏢 Employer'}
                  </button>
                ))}
              </div>
            </div>

            {form.role === 'employer' && (
              <div>
                <label className="text-sm font-medium text-gray-300 block mb-2">Company Name</label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input name="company" value={form.company} onChange={handleChange}
                    placeholder="Acme Inc."
                    className="input-dark w-full rounded-xl pl-10 pr-4 py-3 text-sm" />
                </div>
              </div>
            )}

            <button type="submit" disabled={loading}
              className="gradient-btn w-full text-white font-semibold py-3 rounded-xl disabled:opacity-60 mt-2">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-purple-400 font-medium hover:text-purple-300">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}