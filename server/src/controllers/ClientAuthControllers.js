const ClientUser = require('../models/ClientUser');
const NGOUser = require('../models/NGOUser');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');

const generateToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// Helper function for file uploads
const handleFileUpload = async (file, folder, resource_type = 'raw') => {
  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      resource_type,
    });
    return {
      url: result.secure_url,
      cloudinaryId: result.public_id,
    };
  } catch (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  } finally {
    // Clean up temp file
    try {
      fs.unlinkSync(file.path);
    } catch (err) {
      console.error('Error cleaning up temp file:', err);
    }
  }
};

// Helper function for multiple file uploads
const handleMultipleUploads = async (files, folder) => {
  const uploads = [];
  for (const file of files) {
    try {
      const upload = await handleFileUpload(file, folder);
      uploads.push(upload);
    } catch (error) {
      throw new Error(`Error uploading files: ${error.message}`);
    }
  }
  return uploads;
};

const registerClient = async (req, res) => {
  try {
    const {
      fullName,
      dateOfBirth,
      gender,
      nationality,
      country,
      city,
      email,
      password,
      phone,
      linkedIn,
      educationLevel,
      occupation,
      institution,
      languages,
      fieldsOfInterest,
      otherFieldOfInterest,
      opportunityTypes,
      otherOpportunityType,
      careerGoals,
      availability,
    } = req.body;

    // Check if user exists
    const userExists = await ClientUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Handle file uploads
    let uploads = {};

    try {
      if (req.files?.cv) {
        uploads.cv = await handleFileUpload(req.files.cv[0], 'documents');
      }

      if (req.files?.portfolio) {
        uploads.portfolio = await handleFileUpload(
          req.files.portfolio[0],
          'documents'
        );
      }

      if (req.files?.recommendationLetters) {
        uploads.recommendationLetters = await handleMultipleUploads(
          req.files.recommendationLetters,
          'documents'
        );
      }

      if (req.files?.otherDocuments) {
        uploads.otherDocuments = await handleMultipleUploads(
          req.files.otherDocuments,
          'documents'
        );
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error uploading files',
        error: error.message,
      });
    }

    const user = await ClientUser.create({
      fullName,
      dateOfBirth,
      gender,
      nationality,
      country,
      city,
      email,
      password,
      phone,
      linkedIn,
      educationLevel,
      occupation,
      institution,
      languages,
      fieldsOfInterest,
      otherFieldOfInterest,
      opportunityTypes,
      otherOpportunityType,
      careerGoals,
      availability,
      ...uploads,
      isVerified: true,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message,
    });
  }
};

const registerNGO = async (req, res) => {
  try {
    const {
      orgName,
      orgType,
      otherOrgType,
      establishmentYear,
      country,
      city,
      website,
      email,
      password,
      phone,
      socialMedia,
      representative,
      expertise,
      otherExpertise,
      missionStatement,
      keyPrograms,
      collaborationInterests,
      fundingPrograms,
    } = req.body;

    // Check if user exists in either collection
    const userExists = await Promise.all([
      ClientUser.findOne({ email }),
      NGOUser.findOne({ email }),
    ]);

    if (userExists[0] || userExists[1]) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Handle file uploads
    let uploads = {};

    try {
      if (req.files?.orgProfile) {
        uploads.orgProfile = await handleFileUpload(
          req.files.orgProfile[0],
          'organizations'
        );
      }

      if (req.files?.reports) {
        uploads.reports = await handleMultipleUploads(
          req.files.reports,
          'organizations/reports'
        );
      }

      if (req.files?.brochures) {
        uploads.brochures = await handleMultipleUploads(
          req.files.brochures,
          'organizations/brochures'
        );
      }

      if (req.files?.projects) {
        uploads.projects = await handleMultipleUploads(
          req.files.projects,
          'organizations/projects'
        );
      }
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: 'Error uploading files',
        error: error.message,
      });
    }

    const ngo = await NGOUser.create({
      orgName,
      orgType,
      otherOrgType,
      establishmentYear,
      country,
      city,
      website,
      email,
      password,
      phone,
      socialMedia,
      representative,
      expertise,
      otherExpertise,
      missionStatement,
      keyPrograms,
      collaborationInterests,
      fundingPrograms,
      ...uploads,
      isVerified: true,
    });

    const token = generateToken(ngo._id);

    res.status(201).json({
      success: true,
      message: 'Registration successful.',
      token,
      user: {
        _id: ngo._id,
        orgName: ngo.orgName,
        email: ngo.email,
        isVerified: ngo.isVerified,
        type: 'ngo',
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering organization',
      error: error.message,
    });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check both collections for the user
    const [clientUser, ngoUser] = await Promise.all([
      ClientUser.findOne({ email }),
      NGOUser.findOne({ email }),
    ]);

    const user = clientUser || ngoUser;
    const userType = clientUser ? 'client' : 'ngo';

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        email: user.email,
        name: userType === 'client' ? user.fullName : user.orgName,
        type: userType,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    // Clear the token cookie if you're using cookies
    res.clearCookie('token');

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Error during logout',
      error: error.message,
    });
  }
};

module.exports = {
  registerClient,
  registerNGO,
  login,
  logout,
};
