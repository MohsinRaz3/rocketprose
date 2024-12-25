// import React from 'react';
// import { AuthCard } from '../components/AuthCard';
// import { Input } from '../components/Input';
// import { Button } from '../components/Button';
// import { UserPlus } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';


// export function Signup() {
//     const navigate = useNavigate();

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Add your signup logic here
//     navigate("/")
   
//   };

//   return (
//     <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4">
//       <div className="mb-8 flex items-center gap-3">
//         <UserPlus size={32} className="text-[#5B9BB2]" />
//         <h1 className="text-3xl font-bold text-[#5B9BB2]">Sign Up</h1>
//       </div>
      
//       <AuthCard>
//         <form className="space-y-6" onSubmit={handleSubmit}>
//           <Input
//             label="Full Name"
//             type="text"
//             placeholder="Enter your full name"
//             required
//           />
//           <Input
//             label="Email"
//             type="email"
//             placeholder="Enter your email"
//             required
//           />
//           <Input
//             label="Password"
//             type="password"
//             placeholder="Create a password"
//             required
//           />
//           <Input
//             label="Confirm Password"
//             type="password"
//             placeholder="Confirm your password"
//             required
//           />
          
//           <div className="pt-2">
//             <Button type="submit">Create Account</Button>
//           </div>
          
//           <p className="text-center text-gray-400">
//             Already have an account?{' '}
//             <button 
//               type="button"
//               onClick={() => navigate("/signin")} 
//               className="text-[#5B9BB2] hover:underline"
//             >
//               Sign in
//             </button>
//           </p>
//         </form>
//       </AuthCard>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { AuthCard } from '../components/AuthCard';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../config/supabase-client';
import { toast } from 'react-toastify';

export function Signup() {
  const navigate = useNavigate();

  // State to manage form inputs
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName, // Save the full name in user metadata
          },
        },
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        toast.success("Account created successfully! Please check your email for confirmation.");
        navigate("/signin");
      }
    } catch (err) {
      console.error(err);
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
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
            onChange={(e) => setFullName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Create a password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="pt-2">
            <Button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
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
