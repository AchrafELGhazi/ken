import React, {
  useState,
  useEffect,
  DragEvent,
  ChangeEvent,
  FormEvent,
} from 'react';
import { Trash2, File, Image, Download, Upload } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface UploadedFile {
  _id: string;
  fileName: string;
  fileType: string;
  cloudinaryUrl: string;
  cloudinaryId: string;
  size: number;
  uploadedAt: string;
}

interface FilePreview {
  url: string;
  type: string;
}

type AllowedFileTypes =
  | 'image/jpeg'
  | 'image/png'
  | 'image/gif'
  | 'application/pdf'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'text/plain';

const FileUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<FilePreview | null>(null);
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [downloading, setDownloading] = useState<string>('');

  useEffect(() => {
    fetchUploads();
  }, []);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          setPreview({
            url: result,
            type: file.type,
          });
        }
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    return () => setPreview(null);
  }, [file]);

  const fetchUploads = async (): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8000/api/uploads');
      if (!response.ok) throw new Error('Failed to fetch uploads');

      const data = await response.json();
      if (data.success) {
        setUploads(data.data);
      }
    } catch (error) {
      console.error('Error fetching uploads:', error);
      setError('Failed to fetch uploads');
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      validateAndSetFile(selectedFile);
    }
  };

  const isValidFileType = (fileType: string): fileType is AllowedFileTypes => {
    const allowedTypes = [
      'image/',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ];
    return allowedTypes.some(type => fileType.startsWith(type));
  };

  const validateAndSetFile = (selectedFile: File): void => {
    const MAX_SIZE = 15 * 1024 * 1024; // 15MB

    if (selectedFile.size > MAX_SIZE) {
      setError('File size must be less than 15MB');
      return;
    }

    if (!isValidFileType(selectedFile.type)) {
      setError(
        'Invalid file type. Please upload an image, PDF, DOC, DOCX, or TXT file.'
      );
      return;
    }

    setFile(selectedFile);
    setError('');
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      validateAndSetFile(droppedFile);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/uploads', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setFile(null);
        setPreview(null);
        await fetchUploads();
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error(data.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:8000/api/uploads/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete file');
      }

      await fetchUploads();
    } catch (error) {
      console.error('Delete error:', error);
      setError('Failed to delete file');
    }
  };

  const handleDownload = async (
    fileUrl: string,
    fileName: string
  ): Promise<void> => {
    try {
      setDownloading(fileName);
      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error('Failed to download file');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download error:', error);
      setError('Failed to download file');
    } finally {
      setDownloading('');
    }
  };

  const formatFileSize = (bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  const getFileIcon = (fileType: string): React.ReactElement => {
    return fileType.startsWith('image/') ? (
      <Image className='w-6 h-6' />
    ) : (
      <File className='w-6 h-6' />
    );
  };

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 bg-gray-50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type='file'
            onChange={handleFileChange}
            accept='image/*,.pdf,.doc,.docx,.txt'
            className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
          />

          <div className='text-center'>
            <div className='mb-4 flex justify-center'>
              {file ? (
                getFileIcon(file.type)
              ) : (
                <Upload className='w-8 h-8 text-gray-500' />
              )}
            </div>
            <p className='text-gray-600 mb-2'>
              {file
                ? file.name
                : 'Drag and drop your file here or click to select'}
            </p>
            <p className='text-sm text-gray-500'>
              Supported formats: Images, PDF, DOC, DOCX, TXT (Max 15MB)
            </p>
          </div>
        </div>

        {preview && (
          <div className='mt-4'>
            <p className='text-sm text-gray-500 mb-2'>Preview:</p>
            <img
              src={preview.url}
              alt='File preview'
              className='max-w-xs max-h-48 object-contain border rounded'
            />
          </div>
        )}

        {error && (
          <Alert variant='destructive'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <button
          type='submit'
          disabled={loading || !file}
          className='w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
        >
          {loading ? 'Uploading...' : 'Upload File'}
        </button>
      </form>

      <div className='mt-8 space-y-4'>
        <h2 className='text-xl font-semibold mb-4'>Uploaded Files</h2>
        {uploads.map(upload => (
          <div
            key={upload._id}
            className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
          >
            <div className='flex items-center space-x-4'>
              {getFileIcon(upload.fileType)}
              <div>
                <span className='font-medium'>{upload.fileName}</span>
                <div className='text-sm text-gray-500'>
                  {formatFileSize(upload.size)} •{' '}
                  {new Date(upload.uploadedAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className='flex items-center space-x-2'>
              <button
                onClick={() =>
                  handleDownload(upload.cloudinaryUrl, upload.fileName)
                }
                disabled={downloading === upload.fileName}
                className='p-2 text-blue-500 hover:text-blue-700 transition-colors disabled:text-gray-400'
                aria-label='Download file'
              >
                <Download className='w-5 h-5' />
              </button>
              <button
                onClick={() => handleDelete(upload._id)}
                className='p-2 text-red-500 hover:text-red-700 transition-colors'
                aria-label='Delete file'
              >
                <Trash2 className='w-5 h-5' />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
