import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import Orb from './Orb';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Orb background */}
      <div className="absolute inset-0">
        <Orb 
          hoverIntensity={0.5}
          rotateOnHover={true}
          hue={0}
          forceHoverState={false}
        />
      </div>
      {/* Bottom fade to blend into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black"></div>
      
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/80 text-sm mb-6 backdrop-blur-sm">
          <span className="inline-block w-2 h-2 rounded-full bg-white/70"></span>
          <span>Crafting Unique Brand Identities</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight leading-[0.95] mb-6">
          Branding that you
          <br />
          <span className="inline-block">need Indeed</span>
        </h1>

        <p className="text-base md:text-lg lg:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
          Elevate your brand with custom identity and package design. Showcase your
          story through bold visuals and strategic design solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button className="group px-6 py-3 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 flex items-center gap-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            Book a Free Call
            <ArrowRight className="w-5 h-5 opacity-80 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button className="group px-6 py-3 rounded-full text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors duration-200 flex items-center gap-2">
            See Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;