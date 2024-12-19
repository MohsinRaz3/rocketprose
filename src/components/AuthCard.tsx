import React from 'react';

interface AuthCardProps {
  children: React.ReactNode;
}

export function AuthCard({ children }: AuthCardProps) {
  return (
    <div className="w-full max-w-md bg-[#232323] p-8 rounded-lg shadow-xl">
      {children}
    </div>
  );
}