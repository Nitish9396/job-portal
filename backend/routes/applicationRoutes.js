const express = require('express');
const router = express.Router();
const { applyToJob, getMyApplications, getJobApplications, updateApplicationStatus } = require('../controllers/applicationController');
const { protect, employerOnly } = require('../middleware/authMiddleware');

router.post('/:jobId', protect, applyToJob);
router.get('/my', protect, getMyApplications);
router.get('/job/:jobId', protect, employerOnly, getJobApplications);
router.put('/:id/status', protect, employerOnly, updateApplicationStatus);

module.exports = router;