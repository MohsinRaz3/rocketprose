import React from 'react';
import { Hero } from '../components/landing/Hero';
import { Features } from '../components/landing/Features';
import { Background } from '../components/landing/Background';
import { Header } from '../components/layout/Layout.tsx';

interface Props {
  onGetStarted: () => void;
  handleSignUp: () => void;
}

export function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden selection-accent">
      <Header />
      <Background />
      <div className="max-w-4xl mx-auto px-4 pt-32 pb-20">
        <Hero  />
        <Features />
      </div>
    </div>
  );
}