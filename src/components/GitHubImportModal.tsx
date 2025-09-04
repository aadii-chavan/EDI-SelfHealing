import React, { useState } from 'react';
import { X, Github, AlertCircle, Loader2 } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';

interface GitHubImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GitHubImportModal: React.FC<GitHubImportModalProps> = ({ isOpen, onClose }) => {
  const [repoUrl, setRepoUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { importProject, isLoading } = useProject();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!repoUrl.trim()) {
      setError('Please enter a GitHub repository URL');
      return;
    }

    try {
      await importProject(repoUrl.trim());
      onClose();
      setRepoUrl('');
      // Navigate to workspace
      navigate('/workspace');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import repository');
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setRepoUrl('');
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Github className="w-5 h-5 text-blue-400" />
            </div>
            <h2 className="text-xl font-semibold text-white">Import from GitHub</h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-white/60 hover:text-white transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-white/80 mb-2">Repository URL</label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 disabled:opacity-50"
              placeholder="owner/repository or https://github.com/owner/repository.git"
            />
            <p className="text-xs text-white/60 mt-1">
              Enter a public GitHub repository URL
            </p>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-lg text-white/80 border border-white/20 hover:bg-white/5 hover:border-white/30 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || !repoUrl.trim()}
              className="flex-1 px-4 py-3 rounded-lg bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 hover:border-blue-500/60 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Github className="w-4 h-4" />
                  Import
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-white/10">
          <h4 className="text-sm font-medium text-white/80 mb-2">Supported URL formats:</h4>
          <div className="space-y-1 text-xs text-white/60">
            <div>• https://github.com/owner/repository</div>
            <div>• https://github.com/owner/repository.git</div>
            <div>• git@github.com:owner/repository.git</div>
            <div>• owner/repository</div>
          </div>
          <div className="mt-3">
            <h4 className="text-sm font-medium text-white/80 mb-1">Examples:</h4>
            <div className="space-y-1 text-xs text-white/60">
              <div>facebook/react</div>
              <div>microsoft/vscode</div>
              <div>vercel/next.js</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubImportModal;
