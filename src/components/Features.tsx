import React from 'react';
import { Shield, Cloud, Zap, Server, Lock, RefreshCw } from 'lucide-react';
import Galaxy from './Galaxy';

const features = [
  {
    icon: Cloud,
    title: 'Cloud-Based Scanning',
    description: 'Powerful cloud infrastructure analyzes your entire codebase in parallel for maximum speed and accuracy.'
  },
  {
    icon: Shield,
    title: 'Security-First',
    description: 'Advanced vulnerability detection and automated patching keeps your code secure from day one.'
  },
  {
    icon: RefreshCw,
    title: 'Automatic Dependency Resolution',
    description: 'Smart package management resolves version conflicts and updates dependencies safely.'
  },
  {
    icon: Server,
    title: 'Fast Isolated Dev Servers',
    description: 'Spin up secure, isolated development environments in seconds with optimized performance.'
  },
  {
    icon: Lock,
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and isolated containers ensure your code remains private and secure.'
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Distributed processing and intelligent caching deliver results in minutes, not hours.'
  }
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-black relative overflow-hidden">
      {/* Galaxy background */}
      <div className="absolute inset-0 pointer-events-none opacity-80">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.2}
          glowIntensity={0.18}
          saturation={0.5}
          hueShift={240}
          twinkleIntensity={0.2}
          rotationSpeed={0.06}
        />
      </div>
      {/* Top/Bottom fades to blend with adjacent sections */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black to-transparent"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6">
            Powerful <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Built for modern development teams who need reliability, security, and speed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white/5 backdrop-blur-lg ring-1 ring-white/10 rounded-2xl p-8 hover:ring-white/20 transition-all duration-300 hover:bg-white/10">
              <div className="bg-gradient-to-br from-white/10 to-white/5 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-white/80" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/70 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;