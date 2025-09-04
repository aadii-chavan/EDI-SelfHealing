import React, { useState } from 'react';
import { ArrowLeft, Menu, X, Settings, HelpCircle, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';

const WorkspaceHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { currentProject } = useProject();

  const handleReturnToDashboard = () => {
    navigate('/dashboard');
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900/95 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between h-14 px-4">
        {/* Left Section - Logo and Project Info */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2">
            <img src="/assets/grok.jpeg" alt="CodeMedic logo" className="w-6 h-6 rounded" />
            <span className="text-lg font-bold text-white">CodeMedic</span>
          </a>
          
          {currentProject && (
            <>
              <div className="w-px h-6 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <span className="text-white/60 text-sm">{currentProject.owner}</span>
                <span className="text-white/40">/</span>
                <span className="text-white/90 text-sm font-medium">{currentProject.name}</span>
              </div>
            </>
          )}
        </div>

        {/* Right Section - User Menu */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-sm text-white/80">
            <User className="w-4 h-4" />
            <span>{user?.name}</span>
          </div>
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/80 hover:text-white relative"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" 
            onClick={() => setIsMenuOpen(false)}
          ></div>
          
          {/* Menu */}
          <div className="absolute top-full right-4 w-64 bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="text-white/90 font-medium">{user?.name}</div>
                  <div className="text-white/60 text-sm">{user?.email}</div>
                </div>
              </div>
            </div>

            <div className="py-2">
              <button
                onClick={handleReturnToDashboard}
                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </button>
              
              <button
                onClick={() => {/* Handle settings */}}
                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <Settings className="w-4 h-4" />
                <span>Workspace Settings</span>
              </button>
              
              <button
                onClick={() => {/* Handle help */}}
                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors text-white/80 hover:text-white"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help & Support</span>
              </button>
            </div>

            <div className="border-t border-white/10 py-2">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-white/10 transition-colors text-red-400 hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default WorkspaceHeader;
