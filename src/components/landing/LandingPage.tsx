import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { Background } from './Background';

interface Props {
  onGetStarted: () => void;
}

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden selection-accent">
      <Background />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Hero  />
        <Features />
      </div>
    </div>
  );
}