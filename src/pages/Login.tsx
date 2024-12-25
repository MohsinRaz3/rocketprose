import { AuthCard } from '../components/AuthCard';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { LogIn, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabaseClient } from '../config/supabase-client';
import { Session } from '@supabase/supabase-js';

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get current session
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth state changes
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setEmail('');
      setPassword('');
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4">
      {!session ? (
        <>
          <div className="mb-8 flex items-center gap-3">
            <LogIn size={32} className="text-[#5B9BB2]" />
            <h1 className="text-3xl font-bold text-[#5B9BB2]">Login</h1>
          </div>

          <AuthCard>
            <form className="space-y-6" onSubmit={handleLogin}>
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
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="pt-2">
                <Button type="submit">Sign In</Button>
              </div>

              <p className="text-center text-gray-400">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-[#5B9BB2] hover:underline"
                >
                  Sign up
                </button>
              </p>
            </form>
          </AuthCard>
        </>
      ) : (
        <>
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center px-4">
          <p className='text-[#5B9BB2]'>Welcome back, {session.user.email}</p>
          <Button className="text-[#5B9BB2] hover:underline" onClick={handleLogout}>Logout</Button>
          </div>
        </>
      )}
    </div>
  );
}
