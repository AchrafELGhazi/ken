const cloudinary = require('../utils/cloudinary');
const Upload = require('../models/Upload');
const fs = require('fs');

const handleFileUpload = async (req, res) => {
  try {
    const uploadResults = [];

    if (req.files?.file) {
      const file = req.files.file[0];
      const isImage = file.mimetype.startsWith('image/');

      // Set the correct resource_type based on file type
      const resourceType = isImage ? 'image' : 'raw';

      const uploadOptions = {
        folder: isImage ? 'images' : 'documents',
        resource_type: resourceType,
      };

      const fileResult = await cloudinary.uploader.upload(
        file.path,
        uploadOptions
      );
      console.log('Cloudinary response:', fileResult);

      const uploadDoc = await Upload.create({
        fileName: file.originalname,
        fileType: file.mimetype,
        cloudinaryUrl: fileResult.secure_url,
        cloudinaryId: fileResult.public_id,
        size: file.size,
      });

      uploadResults.push({
        ...uploadDoc.toObject(),
      });

      fs.unlinkSync(file.path);    console.log('Saved document:', uploadDoc);

    }

    res.status(200).json({
      success: true,
      message: 'Files uploaded successfully',
      data: uploadResults,
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading files',
      error: error.message,
    });
  }
};

const getUploads = async (req, res) => {
  try {
    const uploads = await Upload.find().sort({ uploadedAt: -1 });
    res.status(200).json({
      success: true,
      data: uploads,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching uploads',
      error: error.message,
    });
  }
};

const deleteUpload = async (req, res) => {
  try {
    const { id } = req.params;
    const upload = await Upload.findById(id);

    if (!upload) {
      return res.status(404).json({
        success: false,
        message: 'Upload not found',
      });
    }

    // Delete from Cloudinary with correct resource type
    const resourceType = upload.fileType.startsWith('image/') ? 'image' : 'raw';
    await cloudinary.uploader.destroy(upload.cloudinaryId, {
      resource_type: resourceType,
    });

    // Delete from MongoDB
    await upload.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Upload deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting upload',
      error: error.message,
    });
  }
};

module.exports = { handleFileUpload, getUploads, deleteUpload };
