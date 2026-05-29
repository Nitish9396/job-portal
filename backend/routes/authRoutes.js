const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, uploadResume, saveJob, getSavedJobs } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${req.user._id}-${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage, fileFilter: (req, file, cb) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDF files allowed'));
}});

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/upload-resume', protect, upload.single('resume'), uploadResume);
router.post('/save-job/:jobId', protect, saveJob);
router.get('/saved-jobs', protect, getSavedJobs);

module.exports = router;