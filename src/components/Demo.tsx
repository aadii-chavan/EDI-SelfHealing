import React from 'react';
import { useInView } from '../hooks/useInView';
import { Terminal, CheckCircle, AlertTriangle, RefreshCw, GitBranch } from 'lucide-react';
import Threads from './Threads';

const AnimatedDemoCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({ threshold: 0.15, once: true });
  return (
    <div
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
      className="will-change-transform"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' : 'translate3d(0, 28px, 0) scale3d(0.96, 0.96, 1)',
        transition: 'opacity 600ms cubic-bezier(0.4, 0, 0.2, 1), transform 600ms cubic-bezier(0.4, 0, 0.2, 1)'
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

  const cardRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const rafId = React.useRef<number>();
  const [userInput, setUserInput] = React.useState('');
  const [isFocused, setIsFocused] = React.useState(false);

  // Ultra-smooth mouse handler with enhanced RAF throttling
  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || rafId.current) return;
    
    rafId.current = requestAnimationFrame(() => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const percentX = (x / rect.width - 0.5) * 0.6; // Even more subtle
      const percentY = (y / rect.height - 0.5) * 0.6;
      const maxTilt = 3; // Reduced for ultra-smooth feel
      const rotY = percentX * maxTilt;
      const rotX = -percentY * maxTilt;
      
      // Use smoother easing with CSS transitions
      cardRef.current.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translate3d(0, 0, 0)`;
      rafId.current = undefined;
    });
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
  }, []);

  // Handle terminal input
  const handleTerminalClick = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  }, []);

  const handleInputFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = React.useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Could add command processing logic here
      setUserInput('');
    }
  }, []);

  // Cleanup RAF on unmount
  React.useEffect(() => {
    return () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

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
              color={[1.0, 1.0, 1.0]} 
              amplitude={1.5} 
              distance={0.3} 
              enableMouseInteraction={true} 
            />
          </div>

          {/* Spotlight overlay removed for demo card */}

          {/* Card wrapper (navbar-style glass) with terminal inside */}
          <AnimatedDemoCard>
            <div
              ref={cardRef}
              className="relative h-full min-h-[320px] w-full text-white/90 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-colors duration-300 rounded-2xl p-0 overflow-hidden will-change-transform transform-gpu cursor-text"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={handleTerminalClick}
              style={{
                transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)',
                transition: 'transform 150ms cubic-bezier(0.25, 0.46, 0.45, 0.94), border-color 300ms ease'
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

              {/* Output (all commands visible immediately) */}
              <div className="mt-4 space-y-2">
                {steps.map((s, i) => (
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
              </div>

              {/* Interactive terminal input */}
              <div className="mt-4 flex flex-wrap items-center gap-x-2">
                <span className="text-emerald-400">adi@codemedic</span>
                <span className="text-white/70">on</span>
                <span className="text-blue-400">~/projects/my-react-app</span>
                <span className="text-white/70">via</span>
                <span className="text-fuchsia-400 inline-flex items-center gap-1"><GitBranch className="w-3.5 h-3.5" />main</span>
                <span className="text-cyan-300">▸</span>
                <div className="relative flex-1 min-w-0">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    className="bg-transparent border-none outline-none text-white font-mono text-[13px] leading-6 w-full min-w-0 placeholder-white/40"
                    placeholder="Type a command..."
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {!isFocused && userInput === '' && (
                    <span className="absolute left-0 top-0 inline-block w-2 h-4 bg-white/70 animate-pulse rounded-[1px] pointer-events-none"></span>
                  )}
                </div>
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