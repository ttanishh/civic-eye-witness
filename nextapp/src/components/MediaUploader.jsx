
'use client';

import { useState } from 'react';
import { Upload, X, ImagePlus, FilePlus, Mic, Video } from 'lucide-react';

export default function MediaUploader({ onUpload, maxFiles = 5 }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (files.length + selectedFiles.length > maxFiles) {
      alert(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    // In a real app, you'd upload these to storage here
    // For this demo, we'll just add them to the state
    setUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      const newFiles = selectedFiles.map(file => ({
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        name: file.name,
        type: file.type,
        url: URL.createObjectURL(file),
        size: file.size,
      }));
      
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      setUploading(false);
      
      if (onUpload) {
        onUpload(updatedFiles);
      }
    }, 1000);
  };

  const removeFile = (id) => {
    const updatedFiles = files.filter(file => file.id !== id);
    setFiles(updatedFiles);
    
    if (onUpload) {
      onUpload(updatedFiles);
    }
  };

  const getIconForFileType = (type) => {
    if (type.startsWith('image/')) return <ImagePlus className="h-5 w-5" />;
    if (type.startsWith('video/')) return <Video className="h-5 w-5" />;
    if (type.startsWith('audio/')) return <Mic className="h-5 w-5" />;
    return <FilePlus className="h-5 w-5" />;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">
          Upload Evidence
        </label>
        <span className="text-xs text-gray-500">
          {files.length}/{maxFiles} files
        </span>
      </div>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center">
          <Upload className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-1 text-sm text-gray-600">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500">
            Images, videos, documents (max {maxFiles})
          </p>
        </div>
        
        <input
          type="file"
          multiple
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
          disabled={uploading || files.length >= maxFiles}
        />
      </div>
      
      {uploading && (
        <div className="text-center">
          <div className="animate-spin h-5 w-5 border-2 border-civic-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-sm text-gray-600 mt-1">Uploading files...</p>
        </div>
      )}
      
      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map(file => (
            <li key={file.id} className="flex items-center justify-between py-2 px-3 bg-white rounded-md border border-gray-200">
              <div className="flex items-center space-x-3">
                {getIconForFileType(file.type)}
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(file.id)}
                className="text-gray-400 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
