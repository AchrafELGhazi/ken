// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Common document type
interface Document {
  url: string;
  cloudinaryId: string;
}

// Client user interface
interface ClientUser {
  _id: string;
  type: 'client';
  // Personal Data
  fullName: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Prefer not to say';
  nationality: string;
  country: string;
  city: string;
  email: string;
  phone: string;
  linkedIn?: string;
  educationLevel: 'High School' | "Bachelor's" | "Master's" | 'PhD' | 'Other';
  occupation: 'Student' | 'Professional' | 'Entrepreneur' | 'Other';
  institution?: string;
  languages: string;

  // Interests & Passion
  fieldsOfInterest: string[];
  otherFieldOfInterest?: string;
  opportunityTypes: string[];
  otherOpportunityType?: string;
  careerGoals: string;
  availability: Array<'Full-time' | 'Part-time' | 'Remote' | 'Hybrid'>;

  // Documents
  cv?: Document;
  portfolio?: Document;
  recommendationLetters?: Document[];
  otherDocuments?: Document[];

  // Account status
  isVerified: boolean;
  createdAt: Date;
}

// NGO user interface
interface NGOUser {
  _id: string;
  type: 'ngo';
  // Basic Information
  orgName: string;
  orgType:
    | 'University'
    | 'NGO/Non-Profit'
    | 'Research Center'
    | 'Government Body'
    | 'Private Company'
    | 'Public Institution'
    | 'Other';
  otherOrgType?: string;
  establishmentYear: string;
  country: string;
  city: string;
  website: string;
  email: string;
  phone: string;

  // Social Media
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };

  // Representative
  representative: {
    name: string;
    role: string;
    email: string;
    phone: string;
  };

  // Focus Areas
  expertise: string[];
  otherExpertise?: string;
  missionStatement: string;
  keyPrograms: string[];
  collaborationInterests: string[];
  fundingPrograms?: string;

  // Documents
  orgProfile?: Document;
  reports?: Document[];
  brochures?: Document[];
  projects?: Document[];

  // Account status
  isVerified: boolean;
  createdAt: Date;
}

type User = ClientUser | NGOUser;

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  login: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData: User, token: string) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Type guard functions
export const isClientUser = (user: User): user is ClientUser => {
  return user.type === 'client';
};

export const isNGOUser = (user: User): user is NGOUser => {
  return user.type === 'ngo';
};
