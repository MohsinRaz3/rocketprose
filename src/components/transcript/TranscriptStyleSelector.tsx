import React from 'react';
import { TranscriptStyle } from '../../types/transcript';
import { transcriptStyles } from '../../data/transcriptStyles';
import { StyleCard } from './StyleCard';

interface Props {
  value: TranscriptStyle;
  onChange: (style: TranscriptStyle) => void;
}

export function TranscriptStyleSelector({ value, onChange }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">Output Format</label>
        <span className="text-xs text-gray-500">Select how you want your audio transformed</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {transcriptStyles.map((style) => (
          <StyleCard
            key={style.label}
            style={style}
            isSelected={value === style.label}
            onClick={() => onChange(style.label)}
          />
        ))}
      </div>
    </div>
  );
}