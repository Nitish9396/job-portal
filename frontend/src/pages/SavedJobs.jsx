import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MapPin, IndianRupee, Bookmark } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/saved-jobs')
      .then(({ data }) => { setJobs(data); setLoading(false); });
  }, []);

  const unsave = async (jobId) => {
    try {
      await axios.post(`http://localhost:5000/api/auth/save-job/${jobId}`);
      setJobs(jobs.filter(j => j._id !== jobId));
      toast.success('Job removed from saved');
    } catch {
      toast.error('Failed to remove');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Saved Jobs</h1>

      {jobs.length === 0 ? (
        <div className="text-center py-20">
          <Bookmark size={40} className="mx-auto mb-3 text-gray-300" />
          <p className="text-gray-400">No saved jobs yet</p>
          <Link to="/jobs" className="text-indigo-600 text-sm hover:underline mt-2 block">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Link to={`/jobs/${job._id}`} className="font-semibold text-gray-900 hover:text-indigo-600">
                    {job.title}
                  </Link>
                  <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                  <div className="flex gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={13} />{job.location}</span>
                    <span className="flex items-center gap-1"><IndianRupee size={13} />{job.salary?.min}–{job.salary?.max}L</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills?.slice(0, 3).map(s => (
                      <span key={s} className="bg-gray-100 text-gray-600 text-xs px-2.5 py-1 rounded-full">{s}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => unsave(job._id)}
                  className="text-indigo-600 hover:text-red-500 transition">
                  <Bookmark size={20} fill="currentColor" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}