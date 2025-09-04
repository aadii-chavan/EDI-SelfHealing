import React from 'react';
import { Upload, Search, Wrench, Rocket } from 'lucide-react';
import GradualBlur from './GradualBlur';

const steps = [
  {
    icon: Upload,
    title: 'Upload Project',
    description: 'Simply drag and drop your codebase or connect your repository. We support all major languages and frameworks.'
  },
  {
    icon: Search,
    title: 'Scan & Detect Issues',
    description: 'Our AI analyzes your code for bugs, security vulnerabilities, outdated dependencies, and compatibility issues.'
  },
  {
    icon: Wrench,
    title: 'Auto-Fix',
    description: 'Advanced algorithms automatically patch vulnerabilities, update dependencies, and fix common coding issues.'
  },
  {
    icon: Rocket,
    title: 'Run & Deploy',
    description: 'Your healed project runs in isolated cloud environments with optimized performance and security.'
  }
];

const HowItWorks = () => {
  return (
    <section className="relative bg-black overflow-hidden" style={{ position: 'relative' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6">
            How It <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From broken code to production-ready in minutes. Our platform handles the complexity so you can focus on building.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="bg-white/5 backdrop-blur-lg ring-1 ring-white/10 rounded-2xl p-8 hover:ring-white/20 transition-all duration-300 hover:bg-white/10">
                <div className="bg-gradient-to-br from-white/10 to-white/5 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-white/80" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-white/70 leading-relaxed">{step.description}</p>
                
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-sm ring-1 ring-white/20">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradual blur overlay at bottom to blend into next section */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        style={{ pointerEvents: 'none' }}
      />
      {/* Optional top fade-in for the section */}
      <GradualBlur
        target="parent"
        position="top"
        height="6rem"
        strength={2}
        divCount={5}
        curve="bezier"
        exponential={true}
        opacity={1}
        style={{ pointerEvents: 'none' }}
      />
    </section>
  );
};

export default HowItWorks;