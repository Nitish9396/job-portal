import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', company: '', location: '', type: 'Full-time',
    salary: { min: '', max: '' }, description: '', skills: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === 'min' || e.target.name === 'max') {
      setForm({ ...form, salary: { ...form.salary, [e.target.name]: e.target.value } });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/jobs', form);
      toast.success('Job posted successfully!');
      navigate('/employer/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    }
    setLoading(false);
  };

  const inputClass = "w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Job Title *</label>
              <input name="title" value={form.title} onChange={handleChange} required placeholder="e.g. Frontend Engineer" className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Company *</label>
              <input name="company" value={form.company} onChange={handleChange} required className={inputClass} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Location *</label>
              <input name="location" value={form.location} onChange={handleChange} required placeholder="City or Remote" className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Job Type</label>
              <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Min Salary (LPA)</label>
              <input name="min" type="number" value={form.salary.min} onChange={handleChange} placeholder="10" className={inputClass} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Max Salary (LPA)</label>
              <input name="max" type="number" value={form.salary.max} onChange={handleChange} placeholder="25" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Required Skills</label>
            <input name="skills" value={form.skills} onChange={handleChange} placeholder="React, Node.js, MongoDB (comma separated)" className={inputClass} />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">Job Description *</label>
            <textarea name="description" value={form.description} onChange={handleChange} required rows={5}
              placeholder="Describe the role, responsibilities, and requirements..."
              className={`${inputClass} resize-none`} />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60">
            {loading ? 'Posting...' : 'Post Job'}
          </button>
        </form>
      </div>
    </div>
  );
}