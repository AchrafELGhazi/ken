const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const clientUserSchema = new mongoose.Schema({
  // Personal Data
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Prefer not to say'],
    required: true,
  },
  nationality: {
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
  linkedIn: {
    type: String,
  },
  educationLevel: {
    type: String,
    enum: ['High School', "Bachelor's", "Master's", 'PhD', 'Other'],
    required: true,
  },
  occupation: {
    type: String,
    enum: ['Student', 'Professional', 'Entrepreneur', 'Other'],
    required: true,
  },
  institution: {
    type: String,
  },
  languages: {
    type: String,
    required: true,
  },

  // Interests & Passion
  fieldsOfInterest: [
    {
      type: String,
    },
  ],
  otherFieldOfInterest: {
    type: String,
  },
  opportunityTypes: [
    {
      type: String,
    },
  ],
  otherOpportunityType: {
    type: String,
  },
  careerGoals: {
    type: String,
    required: true,
  },
  availability: [
    {
      type: String,
      enum: ['Full-time', 'Part-time', 'Remote', 'Hybrid'],
    },
  ],

  // Documents
  cv: {
    url: {
      type: String,
    },
    cloudinaryId: {
      type: String,
    },
  },
  portfolio: {
    url: String,
    cloudinaryId: String,
  },
  recommendationLetters: [
    {
      url: String,
      cloudinaryId: String,
    },
  ],
  otherDocuments: [
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
  subscriptionStatus: {
    type: String,
    enum: ['freemium', 'premium'],
    default: 'freemium',
  },
  verificationToken: String,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password before saving
clientUserSchema.pre('save', async function (next) {
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
clientUserSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model('ClientUser', clientUserSchema);
