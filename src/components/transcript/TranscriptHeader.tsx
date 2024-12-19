import React from 'react';
import { Download } from 'lucide-react';

interface TranscriptHeaderProps {
  onDownload: () => void;
  showDownload: boolean;
}

export function TranscriptHeader({ onDownload, showDownload }: TranscriptHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold">Transcript</h2>
      {showDownload && (
        <button
          onClick={onDownload}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download size={20} />
          <span>Download</span>
        </button>
      )}
    </div>
  );
}