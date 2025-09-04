import React from 'react';
import { Menu, X, Cpu } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-2">
        <div className="flex items-center justify-between h-16 w-full px-6 rounded-full bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">HealCode</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
            <a href="#docs" className="text-white/80 hover:text-white transition-colors">Docs</a>
          </nav>
          
          <div className="hidden md:flex items-center gap-4">
            <button className="text-white/80 hover:text-white transition-colors">Sign In</button>
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
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <div className="w-full px-6 py-4 rounded-2xl bg-white/10 text-white border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            <nav className="flex flex-col gap-4 w-full">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
              <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Pricing</a>
              <a href="#docs" className="text-white/80 hover:text-white transition-colors">Docs</a>
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <button className="text-white/80 hover:text-white transition-colors text-left">Sign In</button>
                <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg font-semibold w-full">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 

export default Header;