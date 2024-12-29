import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

export function FileUpload() {
  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files: File[]) => {
    const validTypes = ['audio/mp3', 'audio/wav', 'audio/m4a', 'audio/mpeg'];
    const validFiles = files.filter(file => validTypes.includes(file.type));
    
    if (validFiles.length !== files.length) {
      alert('Some files were rejected. Please upload only MP3, WAV, or M4A files.');
    }

    // Handle valid files here
  };

  return (
    <div
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
    >
      <Upload className="mx-auto h-12 w-12 text-gray-400" />
      <p className="mt-2 text-sm text-gray-600">
        Drag and drop your audio files here, or
        <label className="mx-1 text-blue-500 hover:text-blue-600 cursor-pointer">
          browse
          <input
            type="file"
            className="hidden"
            accept=".mp3,.wav,.m4a"
            multiple
            onChange={(e) => handleFiles(Array.from(e.target.files || []))}
          />
        </label>
      </p>
      {/* <p className="text-xs text-gray-500 mt-1">
        Supports MP3, WAV, M4A (max 500MB)
      </p> */}
    </div>
  );
}