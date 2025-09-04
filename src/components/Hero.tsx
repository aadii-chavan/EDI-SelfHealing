import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import Squares from './Squares';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <Squares 
          speed={0.5}
          squareSize={40}
          direction='diagonal'
          borderColor='#ffffff33'
          hoverFillColor='#222'
        />
      </div>
      {/* Bottom fade to blend into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed"></div>
      
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white/90 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">
            Self-Healing
          </span>
          <br />
          Software for Developers
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Upload your project. Let the cloud find and fix bugs, vulnerabilities, 
          and broken dependencies—automatically.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-500/25">
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="group border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:border-blue-400 hover:bg-blue-400/10 transition-all duration-300 flex items-center gap-2">
            <Play className="w-5 h-5" />
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;