return (
    <div className="mesh-bg min-h-screen">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold gradient-text mb-6">Browse Jobs</h1>

        <div className="glass-card rounded-2xl p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 input-dark rounded-xl px-3 py-2 flex-1 min-w-[180px]">
              <Search size={16} className="text-gray-500" />
              <input value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, skill, company..."
                className="flex-1 text-sm focus:outline-none bg-transparent text-gray-300 placeholder-gray-600" />
            </div>
            <select value={type} onChange={(e) => setType(e.target.value)}
              className="input-dark rounded-xl px-3 py-2 text-sm">
              <option value="" className="bg-gray-900">All Types</option>
              <option className="bg-gray-900">Full-time</option>
              <option className="bg-gray-900">Part-time</option>
              <option className="bg-gray-900">Contract</option>
              <option className="bg-gray-900">Internship</option>
            </select>
            <input value={location} onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="input-dark rounded-xl px-3 py-2 text-sm w-32" />
            <input value={minSalary} onChange={(e) => setMinSalary(e.target.value)}
              placeholder="Min Salary (L)" type="number"
              className="input-dark rounded-xl px-3 py-2 text-sm w-36" />
            <button onClick={fetchJobs} className="gradient-btn text-white px-5 py-2 rounded-xl text-sm font-medium">
              Search
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4">{jobs.length} jobs found</p>

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading...</div>
        ) : paginatedJobs.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No jobs found</div>
        ) : (
          <>
            <div className="space-y-3">
              {paginatedJobs.map((job) => (
                <div key={job._id} className="glass-card rounded-2xl p-5">
                  <div className="flex items-start justify-between gap-4">
                    <Link to={`/jobs/${job._id}`} className="flex-1">
                      <h2 className="text-base font-semibold text-white hover:text-purple-300 transition">{job.title}</h2>
                      <p className="text-sm text-gray-400 mt-0.5">{job.company}</p>
                      <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
                        <span className="flex items-center gap-1"><IndianRupee size={14} />{job.salary.min}–{job.salary.max}L/yr</span>
                        <span className="flex items-center gap-1"><Clock size={14} />{new Date(job.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {job.skills.slice(0, 4).map((s) => (
                          <span key={s} className="glass text-purple-300 text-xs px-2.5 py-1 rounded-full border border-purple-500/20">{s}</span>
                        ))}
                      </div>
                    </Link>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {job.type}
                      </span>
                      {user?.role === 'seeker' && (
                        <button onClick={() => toggleSave(job._id)}
                          className={`transition ${savedIds.includes(job._id) ? 'text-purple-400' : 'text-gray-600 hover:text-purple-400'}`}>
                          <Bookmark size={20} fill={savedIds.includes(job._id) ? 'currentColor' : 'none'} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="px-4 py-2 glass rounded-xl text-sm text-gray-400 disabled:opacity-30 hover:text-white transition">
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-medium transition
                      ${page === p ? 'gradient-btn text-white' : 'glass text-gray-400 hover:text-white'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="px-4 py-2 glass rounded-xl text-sm text-gray-400 disabled:opacity-30 hover:text-white transition">
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );