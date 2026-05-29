import { useState, useEffect } from 'react';
import axios from 'axios';
import { MapPin, IndianRupee } from 'lucide-react';

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewing: 'bg-blue-100 text-blue-700',
  accepted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
};

export default function MyApplications() {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/applications/my')
      .then(({ data }) => { setApps(data); setLoading(false); });
  }, []);

  if (loading) return <div className="text-center py-20 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Applications</h1>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {['pending','reviewing','accepted','rejected'].map((s) => (
          <div key={s} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className="text-xl font-bold text-gray-900">{apps.filter(a => a.status === s).length}</div>
            <div className="text-xs text-gray-500 capitalize">{s}</div>
          </div>
        ))}
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No applications yet</div>
      ) : (
        <div className="space-y-3">
          {apps.map((app) => (
            <div key={app._id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold text-gray-900">{app.job?.title}</h2>
                  <p className="text-sm text-gray-500">{app.job?.company}</p>
                  <div className="flex gap-3 mt-2 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={13} />{app.job?.location}</span>
                    <span className="flex items-center gap-1"><IndianRupee size={13} />{app.job?.salary?.min}–{app.job?.salary?.max}L</span>
                  </div>
                </div>
                <span className={`text-xs font-medium px-3 py-1 rounded-full capitalize ${statusStyles[app.status]}`}>
                  {app.status}
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-2">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}