import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen } from 'lucide-react';
import { FileNode, useProject } from '../contexts/ProjectContext';

interface FileTreeNodeProps {
  node: FileNode;
  depth: number;
  onFileSelect: (file: FileNode) => void;
  activeFile: FileNode | null;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, depth, onFileSelect, activeFile }) => {
  const [isExpanded, setIsExpanded] = useState(depth < 2); // Auto-expand first 2 levels

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect(node);
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    
    // Return appropriate icon based on file extension
    switch (ext) {
      case 'js':
      case 'jsx':
        return '🟨';
      case 'ts':
      case 'tsx':
        return '🔷';
      case 'html':
        return '🟧';
      case 'css':
      case 'scss':
      case 'sass':
        return '🎨';
      case 'json':
        return '📄';
      case 'md':
        return '📝';
      case 'py':
        return '🐍';
      case 'java':
        return '☕';
      case 'cpp':
      case 'c':
        return '⚙️';
      case 'go':
        return '🔵';
      case 'rs':
        return '🦀';
      case 'php':
        return '🐘';
      case 'rb':
        return '💎';
      default:
        return '📄';
    }
  };

  const isActive = activeFile?.path === node.path;

  return (
    <div>
      <div
        className={`flex items-center gap-1 px-2 py-1 text-sm cursor-pointer hover:bg-white/10 transition-colors ${
          isActive ? 'bg-blue-500/20 text-blue-300' : 'text-white/80'
        }`}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'folder' && (
          <div className="w-4 h-4 flex items-center justify-center">
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </div>
        )}
        
        <div className="w-4 h-4 flex items-center justify-center">
          {node.type === 'folder' ? (
            isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-blue-400" />
            )
          ) : (
            <span className="text-xs">{getFileIcon(node.name)}</span>
          )}
        </div>
        
        <span className="truncate">{node.name}</span>
      </div>
      
      {node.type === 'folder' && isExpanded && node.children && (
        <div>
          {node.children
            .sort((a, b) => {
              // Folders first, then files
              if (a.type === 'folder' && b.type === 'file') return -1;
              if (a.type === 'file' && b.type === 'folder') return 1;
              return a.name.localeCompare(b.name);
            })
            .map((child) => (
              <FileTreeNode
                key={child.path}
                node={child}
                depth={depth + 1}
                onFileSelect={onFileSelect}
                activeFile={activeFile}
              />
            ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC = () => {
  const { currentProject, activeFile, setActiveFile } = useProject();

  if (!currentProject) {
    return (
      <div className="w-64 bg-gray-900/50 border-r border-white/10 flex items-center justify-center p-4">
        <div className="text-center">
          <Folder className="w-12 h-12 text-white/30 mx-auto mb-2" />
          <p className="text-white/60 text-sm">No project loaded</p>
        </div>
      </div>
    );
  }

  const handleFileSelect = (file: FileNode) => {
    setActiveFile(file);
  };

  return (
    <div className="w-64 bg-gray-900/50 border-r border-white/10 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-white/10">
        <h3 className="text-white/90 font-medium text-sm uppercase tracking-wide">
          Explorer
        </h3>
      </div>
      
      {/* Project Name */}
      <div className="px-3 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-blue-400" />
          <span className="text-white/90 font-medium text-sm">{currentProject.name}</span>
        </div>
        <div className="text-xs text-white/50 mt-1">
          {currentProject.owner}/{currentProject.repo}
        </div>
      </div>
      
      {/* File Tree */}
      <div className="flex-1 overflow-y-auto">
        {currentProject.files.length === 0 ? (
          <div className="p-4 text-center">
            <p className="text-white/60 text-sm">No files found</p>
          </div>
        ) : (
          <div className="py-1">
            {currentProject.files
              .sort((a, b) => {
                // Folders first, then files
                if (a.type === 'folder' && b.type === 'file') return -1;
                if (a.type === 'file' && b.type === 'folder') return 1;
                return a.name.localeCompare(b.name);
              })
              .map((node) => (
                <FileTreeNode
                  key={node.path}
                  node={node}
                  depth={0}
                  onFileSelect={handleFileSelect}
                  activeFile={activeFile}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;
