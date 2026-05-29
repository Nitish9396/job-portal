import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ArrowLeft, FileText, Mail } from 'lucide-react';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewing: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function Applicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appRes, jobRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/applications/job/${jobId}`),
          axios.get(`http://localhost:5000/api/jobs/${jobId}`),
        ]);
        setApplications(appRes.data);
        setJobTitle(jobRes.data.title);
      } catch (err) {
        toast.error('Failed to load applicants');
      }
      setLoading(false);
    };
    fetchData();
  }, [jobId]);

  const updateStatus = async (appId, status) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/applications/${appId}/status`,
        { status }
      );
      setApplications(applications.map(a => a._id === appId ? { ...a, status: data.status } : a));
      toast.success(`Status updated to ${status}`);
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/employer/dashboard" className="flex items-center gap-2 text-sm text-indigo-600 mb-6 hover:underline">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <h1 className="text-2xl font-bold text-gray-900 mb-1">Applicants</h1>
      <p className="text-gray-500 text-sm mb-6">{jobTitle} — {applications.length} applicant{applications.length !== 1 ? 's' : ''}</p>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {['pending', 'reviewing', 'accepted', 'rejected'].map((s) => (
          <div key={s} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className={`text-xl font-bold ${s === 'accepted' ? 'text-green-600' : s === 'rejected' ? 'text-red-500' : s === 'reviewing' ? 'text-blue-600' : 'text-yellow-600'}`}>
              {applications.filter(a => a.status === s).length}
            </div>
            <div className="text-xs text-gray-500 capitalize">{s}</div>
          </div>
        ))}
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No applicants yet</div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <div key={app._id} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center font-bold text-indigo-600">
                    {app.applicant?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-semibold text-gray-900">{app.applicant?.name}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <Mail size={12} />{app.applicant?.email}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusStyles[app.status]}`}>
                  {app.status}
                </span>
              </div>

              {app.coverLetter && (
                <div className="bg-gray-50 rounded-xl p-3 mb-3">
                  <p className="text-xs font-medium text-gray-500 mb-1">Cover Letter</p>
                  <p className="text-sm text-gray-700">{app.coverLetter}</p>
                </div>
              )}

              {app.applicant?.resume && (
                <a href={`http://localhost:5000/${app.applicant.resume}`} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-3">
                  <FileText size={14} /> View Resume
                </a>
              )}

              <div className="flex gap-2 flex-wrap">
                {['pending', 'reviewing', 'accepted', 'rejected'].map((s) => (
                  <button key={s} onClick={() => updateStatus(app._id, s)}
                    disabled={app.status === s}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition capitalize
                      ${app.status === s
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white border border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600'
                      }`}>
                    {s}
                  </button>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-2">
                Applied {new Date(app.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}