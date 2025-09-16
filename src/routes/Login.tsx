import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Orb from '../components/Orb';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Invalid credentials.');
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred during sign in');
    }
  };

  return (
    <section id="login" className="relative min-h-screen bg-black">
      <Header />
      <div className="absolute inset-0">
        <Orb 
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black"></div>

      <div className="relative z-10 flex items-center justify-center px-6 pt-24 pb-12 min-h-screen">
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 rounded-2xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] text-white">
          <h1 className="text-2xl font-semibold mb-6">Sign in</h1>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/80 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50" 
                placeholder="Enter your email" 
              />
            </div>
            <div>
              <label className="block text-sm text-white/80 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50" 
                placeholder="Enter your password" 
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full group px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Continue'}
              {!isLoading && <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />}
            </button>
          </form>
          <p className="mt-4 text-sm text-white/60">Don't have an account? <a className="text-white hover:underline" href="/create-account">Create one</a></p>
        </div>
      </div>
    </section>
  );
};

export default Login;


