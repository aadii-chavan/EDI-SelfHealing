import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';
import WorkspaceHeader from '../components/WorkspaceHeader';
import FileExplorer from '../components/FileExplorer';
import CodeEditor from '../components/CodeEditor';
import { Github, Upload, Settings, Terminal, Search, GitBranch } from 'lucide-react';

const Workspace: React.FC = () => {
  const { user } = useAuth();
  const { currentProject } = useProject();

  // Redirect if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if no project is loaded
  if (!currentProject) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Workspace Header */}
      <WorkspaceHeader />
      
      {/* Main Workspace */}
      <div className="flex-1 flex pt-14">
        {/* Sidebar */}
        <div className="w-16 bg-gray-900/70 border-r border-white/5 flex flex-col items-center py-4 gap-2">
          {/* Activity Bar */}
          <button className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-500/30 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <GitBranch className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <Terminal className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-lg hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* File Explorer */}
        <FileExplorer />

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Editor Tabs */}
          <div className="bg-gray-800/30 border-b border-white/10 px-4 py-1">
            <div className="flex items-center gap-1 text-xs text-white/60">
              <span>Welcome</span>
              <span className="mx-2">•</span>
              <span>{currentProject.name}</span>
            </div>
          </div>

          {/* Code Editor */}
          <CodeEditor />
        </div>

        {/* Right Panel (Optional - for AI analysis, errors, etc.) */}
        <div className="w-80 bg-gray-900/50 border-l border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-white/90 font-medium text-sm mb-3">AI Analysis</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <span className="text-green-300 text-xs font-medium">READY</span>
                </div>
                <p className="text-green-200 text-xs">Project imported successfully</p>
              </div>
              
              <div className="p-3 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-blue-300 text-xs font-medium">SCANNING</span>
                </div>
                <p className="text-blue-200 text-xs">Analyzing code for potential issues...</p>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-white/10">
            <h4 className="text-white/80 text-sm mb-2">Project Stats</h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-white/60">
                <span>Files</span>
                <span>{countFiles(currentProject.files)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Folders</span>
                <span>{countFolders(currentProject.files)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Language</span>
                <span>{detectMainLanguage(currentProject.files)}</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-4">
            <h4 className="text-white/80 text-sm mb-2">Quick Actions</h4>
            <div className="space-y-2">
              <button className="w-full p-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs hover:bg-blue-500/30 transition-colors flex items-center gap-2">
                <Upload className="w-3 h-3" />
                Run Analysis
              </button>
              <button className="w-full p-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-xs hover:bg-green-500/30 transition-colors flex items-center gap-2">
                <Github className="w-3 h-3" />
                View on GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions
const countFiles = (files: any[]): number => {
  let count = 0;
  const traverse = (items: any[]) => {
    items.forEach(item => {
      if (item.type === 'file') {
        count++;
      } else if (item.children) {
        traverse(item.children);
      }
    });
  };
  traverse(files);
  return count;
};

const countFolders = (files: any[]): number => {
  let count = 0;
  const traverse = (items: any[]) => {
    items.forEach(item => {
      if (item.type === 'folder') {
        count++;
        if (item.children) {
          traverse(item.children);
        }
      }
    });
  };
  traverse(files);
  return count;
};

const detectMainLanguage = (files: any[]): string => {
  const extensions: { [key: string]: number } = {};
  
  const traverse = (items: any[]) => {
    items.forEach(item => {
      if (item.type === 'file') {
        const ext = item.name.split('.').pop()?.toLowerCase();
        if (ext) {
          extensions[ext] = (extensions[ext] || 0) + 1;
        }
      } else if (item.children) {
        traverse(item.children);
      }
    });
  };
  
  traverse(files);
  
  // Find most common extension
  const most = Object.entries(extensions).sort(([,a], [,b]) => b - a)[0];
  return most ? most[0].toUpperCase() : 'Unknown';
};

export default Workspace;
