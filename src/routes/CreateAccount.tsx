import React from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Orb from '../components/Orb';

const CreateAccount: React.FC = () => {
  return (
    <section id="create-account" className="relative min-h-screen bg-black">
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
        <h1 className="text-2xl font-semibold mb-6">Create account</h1>
        <form className="space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-1">Name</label>
            <input type="text" className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="Your name" />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Email</label>
            <input type="email" className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm text-white/80 mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30" placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full group px-4 py-2 rounded-lg bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 flex items-center justify-center gap-2">
            Create account
            <ArrowRight className="w-4 h-4 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>
        <p className="mt-4 text-sm text-white/60">Already have an account? <a className="text-white hover:underline" href="/login">Sign in</a></p>
        </div>
      </div>
    </section>
  );
};

export default CreateAccount;


