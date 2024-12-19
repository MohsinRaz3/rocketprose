import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface SignupProps {
  onSuccess: () => void;
}

export function Signup({ onSuccess }: SignupProps) {
    const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your signup logic here
    navigate("/")
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4">
      <div className="mb-8 flex items-center gap-3">
        <UserPlus size={32} className="text-[#5B9BB2]" />
        <h1 className="text-3xl font-bold text-[#5B9BB2]">Sign Up</h1>
      </div>
      
      <AuthCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            required
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            required
          />
          
          <div className="pt-2">
            <Button type="submit">Create Account</Button>
          </div>
          
          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate("/signin")} 
              className="text-[#5B9BB2] hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </AuthCard>
    </div>
  );
}