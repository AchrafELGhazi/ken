const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const ngoUserSchema = new mongoose.Schema({
  // Basic Information
  orgName: {
    type: String,
    required: true,
    trim: true,
  },
  orgType: {
    type: String,
    required: true,
    enum: [
      'University',
      'NGO/Non-Profit',
      'Research Center',
      'Government Body',
      'Private Company',
      'Public Institution',
      'Other',
    ],
  },
  otherOrgType: {
    type: String,
  },
  establishmentYear: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    required: true,
  },

  // Social Media
  socialMedia: {
    linkedin: String,
    twitter: String,
    facebook: String,
  },

  // Representative
  representative: {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },

  // Focus Areas
  expertise: [
    {
      type: String,
    },
  ],
  otherExpertise: String,
  missionStatement: {
    type: String,
    required: true,
  },
  keyPrograms: [
    {
      type: String,
    },
  ],
  collaborationInterests: [
    {
      type: String,
    },
  ],
  fundingPrograms: String,

  // Documents
  orgProfile: {
    url: String,
    cloudinaryId: String,
  },
  reports: [
    {
      url: String,
      cloudinaryId: String,
    },
  ],
  brochures: [
    {
      url: String,
      cloudinaryId: String,
    },
  ],
  projects: [
    {
      url: String,
      cloudinaryId: String,
    },
  ],

  // Account status
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
ngoUserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
ngoUserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('NGOUser', ngoUserSchema);
