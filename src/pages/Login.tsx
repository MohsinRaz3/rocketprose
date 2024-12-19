import React from 'react';
import { AuthCard } from '../components/AuthCard';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onSuccess: () => void;
}

export function Login({ onSuccess }: LoginProps) {
    const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your login logic here
    onSuccess();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4">
      <div className="mb-8 flex items-center gap-3">
        <LogIn size={32} className="text-[#5B9BB2]" />
        <h1 className="text-3xl font-bold text-[#5B9BB2]">Login</h1>
      </div>
      
      <AuthCard>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            required
          />
          
          <div className="pt-2">
            <Button type="submit">Sign In</Button>
          </div>
          
          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <button 
              type="button"
              onClick={() => navigate("/signup")} 
              className="text-[#5B9BB2] hover:underline"
            >
              Sign up
            </button>
          </p>
        </form>
      </AuthCard>
    </div>
  );
}