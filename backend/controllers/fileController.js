const FileModel = require('../models/File');
const multer = require('multer');

const path = require('path');
const File = require('../models/File');
const mongoose = require('mongoose');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only PDF and JPG/PNG are allowed.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

exports.upload = upload.single('file');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const newFile = new File({
      userId: req.user._id,
      fileName: req.file.originalname,
      fileType: req.file.mimetype,
      fileSize: req.file.size,
      filePath: req.file.path,
    });

    await newFile.save();

    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({ userId: req.user._id });
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFileById = async (req, res) => {
  try {
    console.log('getFileById called with ID:', req.params.id);
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      console.log('Invalid file ID:', req.params.id);
      return res.status(400).json({ message: 'Invalid file ID' });
    }
    const file = await File.findById(req.params.id);
    if (!file) {
      console.log('File not found for ID:', req.params.id);
      return res.status(404).json({ message: 'File not found' });
    }
    const resolvedPath = path.resolve(file.filePath);
    console.log('Resolved file path:', resolvedPath);
    res.sendFile(resolvedPath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).json({ message: 'Error sending file', error: err.message });
      } else {
        console.log('File sent successfully:', resolvedPath);
      }
    });
  } catch (error) {
    console.error('Unexpected error in getFileById:', error);
    res.status(500).json({ message: error.message });
  }
};