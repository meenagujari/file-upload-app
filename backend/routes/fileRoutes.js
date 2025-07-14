const express = require('express');
const { protect } = require('../middlewares/auth');
const { upload, uploadFile, getFiles, getFileById } = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', protect, upload, uploadFile);
router.get('/', protect, getFiles);
router.get('/:id', protect, getFileById);

module.exports = router;