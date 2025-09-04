import React from 'react';
import { Upload, Search, Wrench, Rocket } from 'lucide-react';

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
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How It <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From broken code to production-ready in minutes. Our platform handles the complexity so you can focus on building.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:bg-gray-800/70">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-blue-400" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed">{step.description}</p>
                
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;