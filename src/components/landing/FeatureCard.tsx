import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow border border-white/20">
      <div className="text-[#5B9BB2] mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-[#5B9BB2]">{title}</h3>
      <p className="text-[#5B9BB2]/90">{description}</p>
    </div>
  );
}