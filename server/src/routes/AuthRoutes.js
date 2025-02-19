const express = require('express');
const fs = require('fs'); // Add this import
const AuthRouter = express.Router();
const {
  registerClient,
  registerNGO,
  login,
  logout,
} = require('../controllers/ClientAuthControllers');
const upload = require('../middleware/multer');

// Separate upload configurations for client and NGO
const clientUploadFields = upload.fields([
  { name: 'cv', maxCount: 1 },
  { name: 'portfolio', maxCount: 1 },
  { name: 'recommendationLetters', maxCount: 5 },
  { name: 'otherDocuments', maxCount: 5 },
]);

const ngoUploadFields = upload.fields([
  { name: 'orgProfile', maxCount: 1 },
  { name: 'reports', maxCount: 5 },
  { name: 'brochures', maxCount: 5 },
  { name: 'projects', maxCount: 5 },
]);

AuthRouter.post('/register/client', clientUploadFields, registerClient);
AuthRouter.post('/register/ngo', ngoUploadFields, registerNGO);
AuthRouter.post('/login', login);
AuthRouter.post('/logout', logout);

module.exports = AuthRouter;
