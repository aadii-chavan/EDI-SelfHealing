import React from 'react';
import { useInView } from '../hooks/useInView';
import { Terminal, CheckCircle, AlertTriangle, RefreshCw, GitBranch } from 'lucide-react';
import Threads from './Threads';

const AnimatedDemoCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({ threshold: 0.15, once: true });
  return (
    <div
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(28px) scale(0.96)',
        filter: inView ? 'blur(0px)' : 'blur(8px)',
        transition: 'opacity 700ms ease, transform 700ms ease, filter 700ms ease'
      }}
    >
      {children}
    </div>
  );
};

const Demo = () => {
  const steps = [
    { icon: RefreshCw, text: 'Analyzing codebase…', color: 'text-sky-300', iconClass: 'text-sky-400', spin: true },
    { icon: AlertTriangle, text: 'Detected 12 vulnerabilities, 5 dependency conflicts', color: 'text-amber-300', iconClass: 'text-amber-400' },
    { icon: RefreshCw, text: 'Applying automated fixes…', color: 'text-fuchsia-300', iconClass: 'text-fuchsia-400', spin: true },
    { icon: CheckCircle, text: 'Updated 8 packages → latest secure versions', color: 'text-emerald-300', iconClass: 'text-emerald-400' },
    { icon: CheckCircle, text: 'Patched all known vulnerabilities', color: 'text-emerald-300', iconClass: 'text-emerald-400' },
    { icon: CheckCircle, text: 'All tests passed ✓', color: 'text-emerald-300', iconClass: 'text-emerald-400' },
    { icon: CheckCircle, text: 'Dev server running at https://your-app.cloud', color: 'text-emerald-300', iconClass: 'text-emerald-400' }
  ];

  const [visibleCount, setVisibleCount] = React.useState(0);

  React.useEffect(() => {
    if (visibleCount >= steps.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 900);
    return () => clearTimeout(t);
  }, [visibleCount, steps.length]);

  return (
    <section id="demo" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See It In <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch as our platform transforms broken code into production-ready applications.
          </p>
        </div>
        
          <section 
          className="relative rounded-2xl w-full min-h-[600px]"
        >
          {/* Threads background */}
          <div className="absolute inset-0 z-0 opacity-30">
            <Threads 
              color={[0.2, 1.0, 0.6]} 
              amplitude={1.5} 
              distance={0.3} 
              enableMouseInteraction={true} 
            />
          </div>

          {/* Spotlight overlay removed for demo card */}

          {/* Card wrapper (navbar-style glass) with terminal inside */}
          <AnimatedDemoCard>
            <div
              className="relative h-full min-h-[320px] w-full text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors duration-200 rounded-2xl p-0 overflow-hidden will-change-transform"
              onMouseMove={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              const rect = target.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const percentX = x / rect.width - 0.5;
              const percentY = y / rect.height - 0.5;
              const maxTilt = 6;
              const rotY = percentX * maxTilt;
              const rotX = -percentY * maxTilt;
              target.style.setProperty('--rx', `${rotX}deg`);
              target.style.setProperty('--ry', `${rotY}deg`);
            }}
              onMouseLeave={(e) => {
              const target = e.currentTarget as HTMLDivElement;
              target.style.removeProperty('--rx');
              target.style.removeProperty('--ry');
            }}
              style={{
              transform:
                'perspective(1000px) rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))',
              transition: 'transform 120ms ease'
            }}
            >
            {/* Terminal window */}
            <div className="relative bg-transparent rounded-xl overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-green-500/80"></span>
              </div>
              <div className="flex items-center gap-2 text-white/90 font-mono text-xs">
                <Terminal className="w-4 h-4" />
                self-healing — zsh
              </div>
              <div className="w-14" />
            </div>

            {/* Terminal body */}
            <div className="p-5 md:p-6 font-mono text-[13px] leading-6 text-white">
              {/* Prompt 1 */}
              <div className="flex flex-wrap items-center gap-x-2">
                <span className="text-emerald-400">adi@codemedic</span>
                <span className="text-white/70">on</span>
                <span className="text-blue-400">~/projects/my-react-app</span>
                <span className="text-white/70">via</span>
                <span className="text-fuchsia-400 inline-flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" />main</span>
                <span className="text-cyan-300">▸</span>
                <span className="text-white">edirm scan --apply-fixes</span>
              </div>
              <div className="mt-1 text-white/90">Uploading project archive: <span className="text-white">my-react-app.zip</span>…</div>

              {/* Output (progressively revealed) */}
              <div className="mt-4 space-y-2">
                {steps.slice(0, visibleCount).map((s, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <s.icon className={`w-4 h-4 ${s.iconClass} ${s.spin ? 'animate-spin' : ''}`} />
                    <span className={s.color}>{s.text}</span>
                  </div>
                ))}
              </div>

              {/* Prompt 2 */}
              <div className="mt-6 flex flex-wrap items-center gap-x-2">
                <span className="text-emerald-400">adi@codemedic</span>
                <span className="text-white/70">on</span>
                <span className="text-blue-400">~/projects/my-react-app</span>
                <span className="text-white/70">via</span>
                <span className="text-fuchsia-400 inline-flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" />main</span>
                <span className="text-cyan-300">▸</span>
                <span className="text-white">open https://your-app.cloud</span>
                {visibleCount < steps.length ? (
                  <span className="ml-2 inline-block w-2 h-4 bg-white/40 rounded-[1px]"></span>
                ) : (
                  <span className="ml-2 inline-block w-2 h-4 bg-white/70 animate-pulse rounded-[1px]"></span>
                )}
              </div>

              <div className="mt-4 border-t border-white/10 pt-4 text-emerald-300">
                ✨ Your project is now production-ready!
              </div>
            </div>
            </div>
            </div>
          </AnimatedDemoCard>
        </section>
      </div>
    </section>
  );
};

export default Demo;