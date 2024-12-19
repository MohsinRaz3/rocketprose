import React from 'react';
import { Mic, Upload, FileText } from 'lucide-react';

interface Props {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-accent-300/0 via-accent-300/50 to-accent-300/0">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-accent-600/0 via-accent-600/80 to-accent-600/0 bg-clip-text text-transparent">
            Transform Your Audio
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            Professional audio transcription powered by AI. Record or upload audio and get accurate transcriptions in your preferred style.
          </p>
          <button
            onClick={onGetStarted}
            className="bg-accent-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-600 transition-colors"
          >
            Get Started
          </button>
        </div>

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
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="text-accent-500 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}