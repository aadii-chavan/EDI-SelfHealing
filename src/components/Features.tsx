import React from 'react';
import { Shield, Cloud, Zap, Server, Lock, RefreshCw } from 'lucide-react';

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
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Powerful <span className="bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Built for modern development teams who need reliability, security, and speed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:bg-gray-900/70">
              <div className="bg-gradient-to-br from-purple-500/20 to-green-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:from-purple-500/30 group-hover:to-green-500/30 transition-all duration-300">
                <feature.icon className="w-7 h-7 text-purple-400" />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;