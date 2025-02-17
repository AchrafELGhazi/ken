// models/Upload.js
const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  fileName: String,
  fileType: String,
  cloudinaryUrl: String,
  cloudinaryId: String,
  size: Number,
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Upload', uploadSchema);
