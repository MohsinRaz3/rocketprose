import React from 'react';

export function Logo() {
  return (
    <div className="flex items-center justify-center mb-8">
      <img 
        src="/rocket-tools-logo.png" 
        alt="Rocket Tools"
        className="h-16 w-auto"
      />
    </div>
  );
}