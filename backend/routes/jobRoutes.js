const express = require('express');
const router = express.Router();
const { getJobs, getJobById, createJob, updateJob, deleteJob, getMyJobs } = require('../controllers/jobController');
const { protect, employerOnly } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.get('/employer/myjobs', protect, employerOnly, getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, employerOnly, createJob);
router.put('/:id', protect, employerOnly, updateJob);
router.delete('/:id', protect, employerOnly, deleteJob);

module.exports = router;