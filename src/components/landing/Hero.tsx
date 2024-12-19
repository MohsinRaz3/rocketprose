import React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}
import { useNavigate } from 'react-router-dom';


export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="text-center relative z-10">
      <div className="mb-12">
        <h1 className="text-6xl font-bold text-[#5B9BB2] mb-6 tracking-tight">
          RocketProse
        </h1>
        <p className="text-xl text-[#5B9BB2] mb-12 max-w-2xl mx-auto leading-relaxed">
          Professional audio transcription powered by AI. Record or upload audio and get
          accurate transcriptions in your preferred style.
        </p>
      </div>
      
      <button
        onClick={()=>navigate("/transcription")}
        className="bg-[#5B9BB2] text-white px-8 py-4 rounded-xl text-lg font-semibold
                 hover:bg-[#337B97] transition-all transform hover:scale-105
                 shadow-lg"
      >
        Get Started
      </button>
    </div>
  );
}