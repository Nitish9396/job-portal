import { Link } from 'react-router-dom';
import { Search, Briefcase, Users, Building2, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="mesh-bg min-h-screen">

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-16 text-center relative">
        <div className="float inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-purple-300 mb-8 border border-purple-500/30">
          <Sparkles size={14} />
          <span>The #1 Job Portal in India</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Find Your
          <span className="gradient-text block">Dream Career</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Connect with top companies and discover opportunities that match your skills and ambitions
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
          <Link to="/jobs" className="gradient-btn text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 justify-center">
            <Search size={18} /> Browse Jobs
          </Link>
          <Link to="/register" className="glass text-white px-8 py-3.5 rounded-xl font-semibold flex items-center gap-2 justify-center hover:bg-white/10 transition border border-white/10">
            Get Started <ArrowRight size={18} />
          </Link>
        </div>

        {/* Floating 3D Cards */}
        <div className="flex justify-center gap-4 flex-wrap mb-16">
          {[
            { icon: '💻', title: 'Frontend Dev', company: 'Google', salary: '₹28L' },
            { icon: '🎨', title: 'UI Designer', company: 'Adobe', salary: '₹22L' },
            { icon: '⚙️', title: 'Backend Dev', company: 'Flipkart', salary: '₹25L' },
          ].map((job, i) => (
            <div key={i} className={`glass-card rounded-2xl p-4 w-48 text-left ${i === 1 ? 'float' : i === 0 ? 'float-delay' : 'float'}`}
              style={{ animationDelay: `${i * 0.8}s` }}>
              <div className="text-2xl mb-2">{job.icon}</div>
              <div className="text-sm font-semibold text-white">{job.title}</div>
              <div className="text-xs text-gray-400">{job.company}</div>
              <div className="text-xs text-purple-400 font-medium mt-2">{job.salary}/yr</div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-16">
          {[
            { icon: Briefcase, value: '12,400+', label: 'Active Jobs' },
            { icon: Building2, value: '3,200+', label: 'Companies' },
            { icon: Users, value: '89K+', label: 'Candidates' },
          ].map(({ icon: Icon, value, label }) => (
            <div key={label} className="glass-card rounded-2xl p-4 text-center">
              <Icon size={20} className="mx-auto mb-2 text-purple-400" />
              <div className="text-xl font-bold gradient-text">{value}</div>
              <div className="text-xs text-gray-500">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose <span className="gradient-text">JobPortal?</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: 'Fast Applications', desc: 'Apply to jobs in seconds with your saved profile and resume', color: 'text-yellow-400' },
            { icon: Shield, title: 'Verified Companies', desc: 'All companies are verified to ensure safe and legitimate opportunities', color: 'text-green-400' },
            { icon: Sparkles, title: 'Smart Matching', desc: 'Get matched with jobs that fit your skills and experience level', color: 'text-purple-400' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="glass-card rounded-2xl p-6">
              <div className={`${color} mb-4`}><Icon size={28} /></div>
              <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <div className="glass-card rounded-3xl p-12 glow">
          <h2 className="text-3xl font-bold text-white mb-4">Are You Hiring?</h2>
          <p className="text-gray-400 mb-8">Post jobs and find the best talent in minutes. Free to get started.</p>
          <Link to="/register" className="gradient-btn text-white px-8 py-3.5 rounded-xl font-semibold inline-flex items-center gap-2">
            Post a Job for Free <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}