require('dotenv').config();
const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  // Verify required environment variables
  if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
    throw new Error(
      'Email configuration is missing. Please check your environment variables.'
    );
  }

  return nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
      rejectUnauthorized: false, // Add this for development
    },
  });
};

const sendVerificationEmail = async (email, token) => {
  if (!process.env.FRONTEND_URL) {
    throw new Error('FRONTEND_URL is not configured in environment variables');
  }

  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${token}`;

  const mailOptions = {
    from: {
      name: process.env.EMAIL_FROM_NAME || 'Your App Name',
      address: process.env.EMAIL_USERNAME,
    },
    to: email,
    subject: 'Verify Your Email',
    html: `
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
        <h2 style="color: #333; text-align: center;">Welcome to Our Platform!</h2>
        <p style="color: #666; font-size: 16px; line-height: 1.5;">
          Thank you for registering. Please verify your email address by clicking the button below:
        </p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #4F46E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verify Email
          </a>
        </div>
        <p style="color: #666; font-size: 14px;">
          If the button doesn't work, you can also click this link:
          <a href="${verificationUrl}">${verificationUrl}</a>
        </p>
        <p style="color: #666; font-size: 14px;">
          This link will expire in 24 hours.
        </p>
      </div>
    `,
  };

  try {
    const transporter = createTransporter();

    // Verify connection configuration
    await transporter.verify();

    // Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent successfully:', info.messageId);
    return info;
  } catch (error) {
    console.error('Detailed email error:', {
      error: error.message,
      code: error.code,
      command: error.command,
      response: error.response,
    });
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};

module.exports = {
  sendVerificationEmail,
};
