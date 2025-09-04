import React from 'react';
import { Menu, X, Cpu } from 'lucide-react';
import GlassSurface from './GlassSurface';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <GlassSurface 
          width="100%"
          height={64}
          borderRadius={9999}
          brightness={55}
          opacity={0.88}
          displace={6}
          distortionScale={-120}
          greenOffset={8}
          blueOffset={16}
          backgroundOpacity={0.08}
          saturation={1.2}
          mixBlendMode="screen"
          className="w-full"
        >
        <div className="flex items-center justify-between h-16 w-full px-4">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">HealCode</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-300 hover:text-white transition-colors">Sign In</button>
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
              Get Started
            </button>
          </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        </GlassSurface>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <GlassSurface 
            width="100%" 
            height="auto" 
            borderRadius={9999}
            brightness={55}
            opacity={0.92}
            displace={8}
            distortionScale={-130}
            greenOffset={10}
            blueOffset={20}
            backgroundOpacity={0.08}
            saturation={1.2}
            mixBlendMode="screen"
            className="w-full"
          >
          <nav className="flex flex-col gap-4 w-full px-4 py-4">
            <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-800/60">
              <button className="text-gray-300 hover:text-white transition-colors text-left">Sign In</button>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold w-full">
                Get Started
              </button>
            </div>
          </nav>
          </GlassSurface>
        </div>
      )}
    </header>
  );
};

export default Header;