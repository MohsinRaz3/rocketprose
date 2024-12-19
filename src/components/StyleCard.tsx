import React from 'react';
import { TranscriptStyleOption } from '../types/transcript';
import { Check } from 'lucide-react';

interface StyleCardProps {
  style: TranscriptStyleOption;
  isSelected: boolean;
  onClick: () => void;
}

export function StyleCard({ style, isSelected, onClick }: StyleCardProps) {
  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col cursor-pointer rounded-lg border p-4 hover:bg-gray-50 transition-all ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{style.label}</h3>
        <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
          isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
        }`}>
          {isSelected && <Check size={12} className="text-white" />}
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-2">{style.description}</p>
      <div className="mt-auto">
        <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
          Example: {style.example}
        </div>
      </div>
    </div>
  );
}