import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, Clock, IndianRupee, Search, Bookmark } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const typeColors = {
  'Full-time': 'bg-green-100 text-green-700',
  'Part-time': 'bg-blue-100 text-blue-700',
  'Contract': 'bg-amber-100 text-amber-700',
  'Internship': 'bg-purple-100 text-purple-700',
};

export default function Jobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [minSalary, setMinSalary] = useState('');
  const [savedIds, setSavedIds] = useState([]);
  const [page, setPage] = useState(1);
  const jobsPerPage = 5;

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:5000/api/jobs', {
        params: { search, type, location },
      });
      let filtered = data;
      if (minSalary) filtered = filtered.filter(j => j.salary?.min >= Number(minSalary));
      setJobs(filtered);
      setPage(1);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
    if (user?.role === 'seeker') {
      axios.get('http://localhost:5000/api/auth/saved-jobs')
        .then(({ data }) => setSavedIds(data.map(j => j._id)));
    }
  }, []);

  const toggleSave = async (jobId) => {
    if (!user) { toast.error('Please login to save jobs'); return; }
    try {
      const { data } = await axios.post(`http://localhost:5000/api/auth/save-job/${jobId}`);
      setSavedIds(prev => data.saved ? [...prev, jobId] : prev.filter(id => id !== jobId));
      toast.success(data.message);
    } catch {
      toast.error('Failed to save job');
    }
  };

  const paginatedJobs = jobs.slice((page - 1) * jobsPerPage, page * jobsPerPage);
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Browse Jobs</h1>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 flex-1 min-w-[180px]">
            <Search size={16} className="text-gray-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Job title, skill, company..."
              className="flex-1 text-sm focus:outline-none" />
          </div>
          <select value={type} onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none">
            <option value="">All Types</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
          <input value={location} onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none w-32" />
          <input value={minSalary} onChange={(e) => setMinSalary(e.target.value)}
            placeholder="Min Salary (L)"
            type="number"
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none w-36" />
          <button onClick={fetchJobs}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition">
            Search
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4">{jobs.length} jobs found</p>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Loading...</div>
      ) : paginatedJobs.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No jobs found</div>
      ) : (
        <>
          <div className="space-y-3">
            {paginatedJobs.map((job) => (
              <div key={job._id} className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-300 hover:shadow-sm transition">
                <div className="flex items-start justify-between gap-4">
                  <Link to={`/jobs/${job._id}`} className="flex-1">
                    <h2 className="text-base font-semibold text-gray-900 hover:text-indigo-600">{job.title}</h2>
                    <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                      <span className="flex items-center gap-1"><IndianRupee size={14} />{job.salary.min}–{job.salary.max}L/yr</span>
                      <span className="flex items-center gap-1"><Clock size={14} />{new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {job.skills.slice(0, 4).map((s) => (
                        <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
                  </Link>
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${typeColors[job.type] || 'bg-gray-100 text-gray-600'}`}>
                      {job.type}
                    </span>
                    {user?.role === 'seeker' && (
                      <button onClick={() => toggleSave(job._id)}
                        className={`transition ${savedIds.includes(job._id) ? 'text-indigo-600' : 'text-gray-300 hover:text-indigo-400'}`}>
                        <Bookmark size={20} fill={savedIds.includes(job._id) ? 'currentColor' : 'none'} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40 hover:border-indigo-400 transition">
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition
                    ${page === p ? 'bg-indigo-600 text-white' : 'border border-gray-300 hover:border-indigo-400'}`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm disabled:opacity-40 hover:border-indigo-400 transition">
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}