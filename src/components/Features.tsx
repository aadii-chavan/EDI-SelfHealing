import React from 'react';
import { useInView } from '../hooks/useInView';
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
          {features.map((feature, index) => {
            const { ref, inView } = useInView({ threshold: 0.1, once: true });
            return (
              <div
                ref={ref as unknown as React.RefObject<HTMLDivElement>}
                key={index}
                className="group relative h-full"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0px)' : 'translateY(32px)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${index * 150}ms`
                }}
                onMouseMove={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  const rect = target.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  target.style.setProperty('--x', `${x}px`);
                  target.style.setProperty('--y', `${y}px`);
                  const percentX = x / rect.width - 0.5;
                  const percentY = y / rect.height - 0.5;
                  const maxTilt = 8;
                  const rotY = percentX * maxTilt;
                  const rotX = -percentY * maxTilt;
                  target.style.setProperty('--rx', `${rotX}deg`);
                  target.style.setProperty('--ry', `${rotY}deg`);
                }}
                onMouseLeave={(e) => {
                  const target = e.currentTarget as HTMLDivElement;
                  target.style.removeProperty('--x');
                  target.style.removeProperty('--y');
                  target.style.removeProperty('--rx');
                  target.style.removeProperty('--ry');
                }}
              >
                {/* Background glow behind the card */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -inset-2 rounded-3xl -z-10 opacity-30 group-hover:opacity-60 blur-2xl transition-opacity duration-300"
                  style={{
                    background:
                      'radial-gradient(120px 120px at 20% 20%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(140px 140px at 80% 30%, rgba(168,85,247,0.32), transparent 65%), radial-gradient(160px 160px at 50% 80%, rgba(236,72,153,0.28), transparent 70%)'
                  }}
                />
                {/* Colorful spotlight hover overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
                  style={{
                    background:
                      'radial-gradient(240px circle at var(--x, -100px) var(--y, -100px), rgba(99,102,241,0.18), rgba(168,85,247,0.14) 40%, rgba(236,72,153,0.12) 60%, transparent 70%)'
                  }}
                />

                <div className="relative z-10 h-full min-h-[280px] flex flex-col items-center text-center bg-white/5 backdrop-blur-md ring-1 ring-white/10 rounded-2xl p-8 hover:ring-white/20 transition-all duration-300 hover:bg-white/10 will-change-transform"
                  style={{
                    transform:
                      'perspective(900px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
                    transition: 'transform 120ms ease, box-shadow 200ms ease'
                  }}
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:from-white/20 group-hover:to-white/10 transition-all duration-300 mb-5">
                    <feature.icon className="w-8 h-8 text-white/85" />
                  </div>

                  <h3 className="text-2xl font-semibold tracking-tight text-white mb-3">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed text-base">
                    {feature.description}
                  </p>

                  <div className="mt-auto w-full">
                    <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;