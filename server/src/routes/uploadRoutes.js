// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const {
  handleFileUpload,
  getUploads,
  deleteUpload,
} = require('../controllers/uploadController');

const uploadFields = upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 },
]);

router.post('/uploads', uploadFields, handleFileUpload);
router.get('/uploads', getUploads);
router.delete('/uploads/:id', deleteUpload);

module.exports = router;
