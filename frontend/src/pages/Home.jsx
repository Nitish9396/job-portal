import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, Building2 } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Dream Job Today</h1>
          <p className="text-indigo-200 text-lg mb-8">Thousands of opportunities from top companies across India</p>
          <Link to="/jobs" className="inline-flex items-center gap-2 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition">
            <Search size={20} /> Browse All Jobs
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow border border-gray-100 grid grid-cols-3 divide-x divide-gray-100">
          {[
            { icon: Briefcase, label: 'Active Jobs', value: '12,400+' },
            { icon: Building2, label: 'Companies', value: '3,200+' },
            { icon: Users, label: 'Candidates', value: '89,000+' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="py-6 text-center">
              <Icon className="mx-auto mb-2 text-indigo-500" size={24} />
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Are you hiring?</h2>
        <p className="text-gray-500 mb-6">Post your jobs and find the best talent in minutes</p>
        <Link to="/register" className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition">
          Post a Job for Free
        </Link>
      </div>
    </div>
  );
}