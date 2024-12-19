import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, ...props }: InputProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-200">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B9BB2] focus:border-transparent text-white placeholder-gray-500"
      />
    </div>
  );
}