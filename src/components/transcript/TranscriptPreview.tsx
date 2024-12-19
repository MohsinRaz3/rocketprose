import React from 'react';

interface TranscriptPreviewProps {
  text: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  error?: string;
}

export function TranscriptPreview({ text, status, error }: TranscriptPreviewProps) {
  if (status === 'processing') {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        <span className="ml-3 text-gray-600">Processing transcription...</span>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg">
        {error}
      </div>
    );
  }

  if (status === 'completed') {
    return (
      <div className="prose max-w-none">
        <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-lg">
          {text}
        </pre>
      </div>
    );
  }

  return null;
}