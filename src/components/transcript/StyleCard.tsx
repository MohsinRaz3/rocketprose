import React from 'react';
import { TranscriptStyleOption } from '../../types/transcript';
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
      className={`relative flex flex-col cursor-pointer rounded-lg border p-4 
        bg-white/10 backdrop-blur border-white/20 hover:bg-white/20 transition-all ${
        isSelected ? 'border-rocket-400 bg-rocket-400/10' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-white">{style.label}</h3>
        <div className={`h-5 w-5 rounded-full border flex items-center justify-center ${
          isSelected ? 'border-rocket-400 bg-rocket-400' : 'border-white/40'
        }`}>
          {isSelected && <Check size={12} className="text-white" />}
        </div>
      </div>
      <p className="text-sm text-white/80 mb-2">{style.description}</p>
      <div className="mt-auto">
        <div className="text-xs text-white/70 bg-black/20 p-2 rounded">
          {style.example}
        </div>
      </div>
    </div>
  );
}