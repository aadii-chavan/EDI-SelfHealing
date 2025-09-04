import React from 'react';
import { useInView } from '../hooks/useInView';
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
    <section id="how-it-works" className="relative bg-black" style={{ position: 'relative' }}>
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white/90 mb-6">
            How It <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            From broken code to production-ready in minutes. Our platform handles the complexity so you can focus on building.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {steps.map((step, index) => {
            const { ref, inView } = useInView({ threshold: 0.2, once: true });
            const direction = index % 2 === 0 ? 1 : -1; // alternate slight horizontal offset
            return (
              <div
                ref={ref as unknown as React.RefObject<HTMLDivElement>}
                key={index}
                className="group relative h-full"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView
                    ? 'none'
                    : `translateY(20px) translateX(${direction * 10}px) rotateX(6deg)`,
                  filter: inView ? 'blur(0px)' : 'blur(4px)',
                  transition:
                    'opacity 600ms ease, transform 700ms cubic-bezier(0.2, 0.6, 0.2, 1), filter 600ms ease',
                  transitionDelay: `${index * 90}ms`
                }}
                onMouseMove={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  const rect = target.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  target.style.setProperty('--x', `${x}px`);
                  target.style.setProperty('--y', `${y}px`);
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.removeProperty('--x');
                  target.style.removeProperty('--y');
                }}
              >
                {/* Spotlight hover overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(240px circle at var(--x, -100px) var(--y, -100px), rgba(255,255,255,0.10), transparent 60%)'
                  }}
                />

                <div className="relative h-full min-h-[300px] flex flex-col items-center text-center bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-8 hover:ring-white/20 transition-all duration-300 hover:bg-white/10">

                  <div className="bg-gradient-to-br from-white/10 to-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300 mb-5">
                    <step.icon className="w-8 h-8 text-white/85" />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-3">{step.title}</h3>
                  <p className="text-white/70 leading-relaxed text-base">
                    {step.description}
                  </p>

                  <div className="mt-auto w-full">
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    <div className="mt-4 text-white/50 text-sm">
                      Step {index + 1} of {steps.length}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* simplified: removed blur overlays */}
    </section>
  );
};

export default HowItWorks;