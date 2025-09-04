import React, { useState, useEffect } from 'react';
import { Loader2, FileText, AlertCircle } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

const CodeEditor: React.FC = () => {
  const { activeFile, getFileContent } = useProject();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeFile && activeFile.type === 'file') {
      loadFileContent();
    } else {
      setContent('');
      setError(null);
    }
  }, [activeFile]);

  const loadFileContent = async () => {
    if (!activeFile) return;

    setIsLoading(true);
    setError(null);

    try {
      const fileContent = await getFileContent(activeFile.path);
      setContent(fileContent);
    } catch (err) {
      setError('Failed to load file content');
      setContent('');
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageFromFileName = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    switch (ext) {
      case 'js':
      case 'jsx':
        return 'javascript';
      case 'ts':
      case 'tsx':
        return 'typescript';
      case 'html':
        return 'html';
      case 'css':
      case 'scss':
      case 'sass':
        return 'css';
      case 'json':
        return 'json';
      case 'md':
        return 'markdown';
      case 'py':
        return 'python';
      case 'java':
        return 'java';
      case 'cpp':
      case 'c':
        return 'cpp';
      case 'go':
        return 'go';
      case 'rs':
        return 'rust';
      case 'php':
        return 'php';
      case 'rb':
        return 'ruby';
      case 'xml':
        return 'xml';
      case 'yml':
      case 'yaml':
        return 'yaml';
      default:
        return 'text';
    }
  };

  if (!activeFile) {
    return (
      <div className="flex-1 bg-gray-900/30 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-white/60 text-lg mb-2">No file selected</h3>
          <p className="text-white/40 text-sm">Select a file from the explorer to view its contents</p>
        </div>
      </div>
    );
  }

  if (activeFile.type === 'folder') {
    return (
      <div className="flex-1 bg-gray-900/30 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-white/60 text-lg mb-2">Folder selected</h3>
          <p className="text-white/40 text-sm">Select a file to view its contents</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-900/30 flex flex-col">
      {/* Tab Bar */}
      <div className="bg-gray-800/50 border-b border-white/10 px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="ml-4 flex items-center gap-2">
            <span className="text-xs">
              {activeFile.name.split('.').pop()?.toLowerCase() === 'js' ? '🟨' :
               activeFile.name.split('.').pop()?.toLowerCase() === 'ts' ? '🔷' :
               activeFile.name.split('.').pop()?.toLowerCase() === 'html' ? '🟧' :
               activeFile.name.split('.').pop()?.toLowerCase() === 'css' ? '🎨' :
               activeFile.name.split('.').pop()?.toLowerCase() === 'json' ? '📄' :
               activeFile.name.split('.').pop()?.toLowerCase() === 'md' ? '📝' : '📄'}
            </span>
            <span className="text-white/90 text-sm font-medium">{activeFile.name}</span>
            <span className="text-white/40 text-xs">({getLanguageFromFileName(activeFile.name)})</span>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 relative">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-white/60">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading file...</span>
            </div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 text-red-400">
              <AlertCircle className="w-5 h-5" />
              <span>{error}</span>
            </div>
          </div>
        ) : (
          <div className="h-full">
            {/* Line Numbers */}
            <div className="flex h-full">
              <div className="bg-gray-800/30 border-r border-white/5 px-3 py-4 select-none">
                <div className="font-mono text-xs text-white/40 leading-6">
                  {content.split('\n').map((_, index) => (
                    <div key={index} className="text-right">
                      {index + 1}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Code Content */}
              <div className="flex-1 overflow-auto">
                <pre className="font-mono text-sm text-white/90 p-4 leading-6 whitespace-pre-wrap">
                  <code>{content || '// File is empty'}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-blue-600/20 border-t border-blue-500/30 px-4 py-1 text-xs text-blue-300">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span>Lines: {content.split('\n').length}</span>
            <span>Characters: {content.length}</span>
            <span>Language: {getLanguageFromFileName(activeFile.name)}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>UTF-8</span>
            <span>LF</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
