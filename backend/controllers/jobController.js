const Job = require('../models/Job');

const getJobs = async (req, res) => {
  try {
    const { search, location, type } = req.query;
    let query = { status: 'active' };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { skills: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    if (location) query.location = { $regex: location, $options: 'i' };
    if (type) query.type = type;
    const jobs = await Job.find(query).populate('postedBy', 'name company').sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name company email');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createJob = async (req, res) => {
  try {
    const { title, company, location, type, salary, description, skills } = req.body;
    const job = await Job.create({
      title, company, location, type, salary, description,
      skills: skills ? skills.split(',').map(s => s.trim()) : [],
      postedBy: req.user._id,
    });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    Object.assign(job, req.body);
    if (req.body.skills) job.skills = req.body.skills.split(',').map(s => s.trim());
    await job.save();
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.postedBy.toString() !== req.user._id.toString())
      return res.status(403).json({ message: 'Not authorized' });
    await job.deleteOne();
    res.json({ message: 'Job removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob, getMyJobs };