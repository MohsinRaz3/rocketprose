import React from 'react';
import { TranscriptHeader } from './TranscriptHeader';
import { TranscriptPreview } from './TranscriptPreview';

interface TranscriptSectionProps {
  status: 'idle' | 'processing' | 'completed' | 'error';
  text: string;
  error?: string;
  onDownload: () => void;
}

export function TranscriptSection({ status, text, error, onDownload }: TranscriptSectionProps) {
  if (status === 'idle') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <TranscriptHeader 
        onDownload={onDownload} 
        showDownload={status === 'completed'} 
      />
      <TranscriptPreview 
        text={text} 
        status={status} 
        error={error} 
      />
    </div>
  );
}