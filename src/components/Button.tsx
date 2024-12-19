import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ children, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-full py-3 px-4 rounded-lg font-medium transition-colors duration-200 ${
        variant === 'primary'
          ? 'bg-[#5B9BB2] hover:bg-[#4A8A9E] text-white'
          : 'bg-[#2A2A2A] hover:bg-[#333333] text-[#5B9BB2]'
      }`}
    >
      {children}
    </button>
  );
}