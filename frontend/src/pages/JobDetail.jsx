import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { MapPin, IndianRupee, Calendar } from 'lucide-react';
import API_URL from '../config';

export default function JobDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applying, setApplying] = useState(false);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    axios.get(`${API_URL}/api/jobs/${id}`).then(({ data }) => setJob(data));
  }, [id]);

  const handleApply = async () => {
    if (!user) { navigate('/login'); return; }
    setApplying(true);
    try {
      await axios.post(`${API_URL}/api/applications/${id}`, { coverLetter });
      setApplied(true);
      toast.success('Application submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply');
    }
    setApplying(false);
  };

  if (!job) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
            <p className="text-indigo-600 font-medium mt-1">{job.company}</p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">{job.type}</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600"><MapPin size={16} className="text-indigo-500" />{job.location}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600"><IndianRupee size={16} className="text-indigo-500" />{job.salary.min}–{job.salary.max}L/yr</div>
          <div className="flex items-center gap-2 text-sm text-gray-600"><Calendar size={16} className="text-indigo-500" />{new Date(job.createdAt).toLocaleDateString()}</div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {job.skills.map((s) => (
            <span key={s} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">{s}</span>
          ))}
        </div>
        <h2 className="text-base font-semibold text-gray-900 mb-2">Job Description</h2>
        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
      </div>

      {user?.role === 'seeker' && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-3">Apply for this Job</h2>
          {applied ? (
            <div className="bg-green-50 text-green-700 p-4 rounded-xl text-sm font-medium">
              ✓ Application submitted successfully!
            </div>
          ) : (
            <>
              <textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)}
                placeholder="Write a short cover letter (optional)..."
                rows={4}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3" />
              <button onClick={handleApply} disabled={applying}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-60">
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}