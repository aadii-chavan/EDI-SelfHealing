import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 animate-pulse"></div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <Sparkles className="w-12 h-12 text-yellow-400" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
          Try Self-Healing Development Today
        </h2>
        
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          Join the future of software development. Let AI handle the bugs, vulnerabilities, 
          and compatibility issues while you focus on innovation.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-white text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center gap-2 shadow-xl">
            Start Free Trial
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="border-2 border-white/20 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:border-white hover:bg-white/10 transition-all duration-300">
            Schedule Demo
          </button>
        </div>
        
        <p className="text-gray-400 text-sm mt-8">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  );
};

export default CallToAction;