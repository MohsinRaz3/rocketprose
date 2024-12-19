import React from 'react';
import { Mic, Upload, FileText } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export function Features() {
  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      <FeatureCard
        icon={<Mic className="w-8 h-8" />}
        title="Record Audio"
        description="Record high-quality audio directly from your browser with our easy-to-use interface."
      />
      <FeatureCard
        icon={<Upload className="w-8 h-8" />}
        title="Upload Files"
        description="Upload existing audio files in MP3, WAV, or M4A format for instant transcription."
      />
      <FeatureCard
        icon={<FileText className="w-8 h-8" />}
        title="Multiple Styles"
        description="Choose from various output styles including professional, academic, creative, and social media formats."
      />
    </div>
  );
}