import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Plus, Trash2, Users } from 'lucide-react';
import API_URL from '../config';

const statusColors = {
  active: 'bg-green-100 text-green-700',
  paused: 'bg-yellow-100 text-yellow-700',
  closed: 'bg-red-100 text-red-700'
};

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = () => {
    axios.get(`${API_URL}/api/jobs/employer/myjobs`)
      .then(({ data }) => { setJobs(data); setLoading(false); });
  };

  useEffect(() => { fetchJobs(); }, []);

  const deleteJob = async (id) => {
    if (!window.confirm('Delete this job?')) return;
    try {
      await axios.delete(`${API_URL}/api/jobs/${id}`);
      toast.success('Job deleted');
      fetchJobs();
    } catch {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Employer Dashboard</h1>
        <Link to="/post-job" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-indigo-700 transition">
          <Plus size={16} /> Post New Job
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
          <div className="text-sm text-gray-500">Total Jobs</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{jobs.filter(j => j.status === 'active').length}</div>
          <div className="text-sm text-gray-500">Active</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{jobs.filter(j => j.status === 'paused').length}</div>
          <div className="text-sm text-gray-500">Paused</div>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-2xl divide-y divide-gray-100">
        {jobs.length === 0 ? (
          <div className="py-16 text-center text-gray-400">No jobs posted yet</div>
        ) : jobs.map((job) => (
          <div key={job._id} className="p-4 flex items-center gap-4">
            <div className="flex-1">
              <h2 className="font-semibold text-gray-900">{job.title}</h2>
              <p className="text-sm text-gray-500">{job.location} · {job.type}</p>
            </div>
            <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusColors[job.status]}`}>{job.status}</span>
            <Link to={`/employer/applicants/${job._id}`}
              className="flex items-center gap-1 text-sm text-indigo-600 hover:underline">
              <Users size={14} /> Applicants
            </Link>
            <button onClick={() => deleteJob(job._id)} className="text-red-400 hover:text-red-600">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}