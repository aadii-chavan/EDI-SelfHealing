import React from 'react';
import { Terminal, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

const Demo = () => {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            See It In <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Action</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Watch as our platform transforms broken code into production-ready applications.
          </p>
        </div>
        
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Terminal className="w-6 h-6 text-green-400" />
            <span className="text-green-400 font-mono text-lg">Self-Healing Console</span>
          </div>
          
          <div className="bg-black/50 rounded-lg p-6 font-mono text-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">✓</span>
              <span className="text-gray-300">Project uploaded: my-react-app.zip</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
              <span className="text-blue-400">Scanning codebase...</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-yellow-400">Found 12 vulnerabilities, 5 dependency conflicts</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
              <span className="text-purple-400">Applying fixes...</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Updated 8 packages to latest secure versions</span>
            </div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Patched security vulnerabilities</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-green-400">Dev server running at https://your-app.cloud</span>
            </div>
            <div className="border-t border-gray-600 pt-4">
              <span className="text-green-400 font-semibold">✨ Your project is now production-ready!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;