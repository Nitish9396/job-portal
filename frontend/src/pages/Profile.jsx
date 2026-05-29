import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { User, Mail, Building2, Shield, Upload, FileText } from 'lucide-react';

export default function Profile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    company: user?.company || '',
    password: '',
    confirmPassword: '',
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleResumeUpload = async () => {
    if (!resumeFile) { toast.error('Please select a file'); return; }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('resume', resumeFile);
      const { data } = await axios.post('http://localhost:5000/api/auth/upload-resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      login({ ...user, resume: data.resume });
      toast.success('Resume uploaded!');
      setResumeFile(null);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    }
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const updateData = { name: form.name, company: form.company };
      if (form.password) updateData.password = form.password;
      const { data } = await axios.put('http://localhost:5000/api/auth/profile', updateData);
      login({ ...user, ...data });
      toast.success('Profile updated!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
    setLoading(false);
  };

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <span className="text-2xl font-bold text-indigo-600">
              {user?.name?.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-gray-900 text-lg">{user?.name}</h2>
            <p className="text-sm text-gray-500">{user?.email}</p>
            <span className="inline-block mt-1 bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              <User size={14} className="inline mr-1" />Full Name
            </label>
            <input name="name" value={form.name} onChange={handleChange} className={inputClass} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              <Mail size={14} className="inline mr-1" />Email
            </label>
            <input name="email" value={form.email} disabled
              className={`${inputClass} bg-gray-50 cursor-not-allowed`} />
            <p className="text-xs text-gray-400 mt-1">Email cannot be changed</p>
          </div>

          {user?.role === 'employer' && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                <Building2 size={14} className="inline mr-1" />Company Name
              </label>
              <input name="company" value={form.company} onChange={handleChange} className={inputClass} />
            </div>
          )}

          <hr className="border-gray-100" />
          <p className="text-sm font-medium text-gray-700">
            <Shield size={14} className="inline mr-1" />Change Password
          </p>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">New Password</label>
            <input name="password" type="password" value={form.password}
              onChange={handleChange} placeholder="Leave blank to keep current"
              className={inputClass} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Confirm Password</label>
            <input name="confirmPassword" type="password" value={form.confirmPassword}
              onChange={handleChange} placeholder="Repeat new password"
              className={inputClass} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>

      {/* Resume Upload — only for job seekers */}
      {user?.role === 'seeker' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="font-semibold text-gray-900 mb-4">
            <FileText size={16} className="inline mr-1" />Resume
          </h2>

          {user?.resume && (
            <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-xl mb-4 text-sm">
              <FileText size={16} />
              <span>Resume uploaded</span>
              <a href={`http://localhost:5000/${user.resume}`} target="_blank" rel="noreferrer"
                className="ml-auto underline text-indigo-600">View</a>
            </div>
          )}

          <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center mb-4">
            <Upload size={24} className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500 mb-3">Upload your resume (PDF only)</p>
            <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])}
              className="text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 file:text-sm file:font-medium" />
          </div>

          {resumeFile && (
            <p className="text-sm text-gray-600 mb-3">Selected: {resumeFile.name}</p>
          )}

          <button onClick={handleResumeUpload} disabled={uploading || !resumeFile}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60">
            {uploading ? 'Uploading...' : 'Upload Resume'}
          </button>
        </div>
      )}
    </div>
  );
}