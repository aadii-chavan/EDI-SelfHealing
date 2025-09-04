import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface FileNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

export interface Project {
  id: string;
  name: string;
  url: string;
  owner: string;
  repo: string;
  files: FileNode[];
  createdAt: Date;
}

interface ProjectContextType {
  projects: Project[];
  currentProject: Project | null;
  activeFile: FileNode | null;
  isLoading: boolean;
  importProject: (repoUrl: string) => Promise<void>;
  setCurrentProject: (project: Project) => void;
  setActiveFile: (file: FileNode) => void;
  getFileContent: (path: string) => Promise<string>;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [activeFile, setActiveFile] = useState<FileNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Parse GitHub URL to extract owner and repo
  const parseGitHubUrl = (url: string): { owner: string; repo: string } | null => {
    try {
      // Clean up the URL first
      let cleanUrl = url.trim();
      
      // Handle various GitHub URL formats
      const patterns = [
        // https://github.com/owner/repo.git
        /github\.com\/([^\/\s]+)\/([^\/\s]+)\.git/,
        // https://github.com/owner/repo
        /github\.com\/([^\/\s]+)\/([^\/\s]+)(?:\/|$)/,
        // git@github.com:owner/repo.git (SSH format)
        /git@github\.com:([^\/\s]+)\/([^\/\s]+)\.git/,
        // Just owner/repo format
        /^([^\/\s]+)\/([^\/\s]+)$/,
      ];
      
      for (const pattern of patterns) {
        const match = cleanUrl.match(pattern);
        if (match) {
          let owner = match[1];
          let repo = match[2];
          
          // Remove .git extension if present
          if (repo.endsWith('.git')) {
            repo = repo.slice(0, -4);
          }
          
          // Validate that owner and repo don't contain invalid characters
          if (owner && repo && !/[\s<>]/.test(owner) && !/[\s<>]/.test(repo)) {
            return { owner, repo };
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error parsing GitHub URL:', error);
      return null;
    }
  };

  // Fetch repository structure from GitHub API
  const fetchRepositoryStructure = async (owner: string, repo: string): Promise<FileNode[]> => {
    try {
      // First, check if the repository exists
      const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
      
      if (!repoResponse.ok) {
        if (repoResponse.status === 404) {
          throw new Error(`Repository '${owner}/${repo}' not found. Please check the repository name and ensure it's public.`);
        } else if (repoResponse.status === 403) {
          throw new Error('API rate limit exceeded. Please try again later.');
        } else {
          throw new Error(`Failed to access repository: ${repoResponse.statusText}`);
        }
      }
      
      const repoData = await repoResponse.json();
      const defaultBranch = repoData.default_branch || 'main';
      
      // Try to fetch the file tree using the default branch
      let response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`);
      
      if (!response.ok) {
        // If default branch fails, try common branch names
        const branches = ['main', 'master', 'dev', 'develop'];
        let success = false;
        
        for (const branch of branches) {
          if (branch === defaultBranch) continue; // Skip the one we already tried
          
          response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`);
          if (response.ok) {
            success = true;
            break;
          }
        }
        
        if (!success) {
          throw new Error(`Could not fetch repository structure. The repository may be empty or have no accessible branches.`);
        }
      }
      
      const data = await response.json();
      
      if (!data.tree || data.tree.length === 0) {
        throw new Error('Repository appears to be empty.');
      }
      
      return buildFileTree(data.tree);
    } catch (error) {
      console.error('Error fetching repository structure:', error);
      throw error;
    }
  };

  // Build file tree from GitHub API response
  const buildFileTree = (items: any[]): FileNode[] => {
    const root: FileNode[] = [];
    const pathMap = new Map<string, FileNode>();

    // First pass: create all nodes
    items.forEach(item => {
      const node: FileNode = {
        name: item.path.split('/').pop() || '',
        path: item.path,
        type: item.type === 'tree' ? 'folder' : 'file',
        children: item.type === 'tree' ? [] : undefined,
      };
      pathMap.set(item.path, node);
    });

    // Second pass: build tree structure
    items.forEach(item => {
      const node = pathMap.get(item.path)!;
      const parentPath = item.path.substring(0, item.path.lastIndexOf('/'));
      
      if (parentPath && pathMap.has(parentPath)) {
        const parent = pathMap.get(parentPath)!;
        if (parent.children) {
          parent.children.push(node);
        }
      } else {
        root.push(node);
      }
    });

    return root;
  };

  // Get file content from GitHub
  const getFileContent = async (path: string): Promise<string> => {
    if (!currentProject) {
      throw new Error('No current project');
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${currentProject.owner}/${currentProject.repo}/contents/${path}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch file content');
      }
      
      const data = await response.json();
      
      if (data.content) {
        return atob(data.content.replace(/\s/g, ''));
      }
      
      return '';
    } catch (error) {
      console.error('Error fetching file content:', error);
      return '// Error loading file content';
    }
  };

  // Import project from GitHub
  const importProject = async (repoUrl: string): Promise<void> => {
    setIsLoading(true);
    
    try {
      const parsed = parseGitHubUrl(repoUrl);
      if (!parsed) {
        throw new Error('Invalid GitHub URL');
      }

      const { owner, repo } = parsed;
      
      // Check if project already exists
      const existingProject = projects.find(p => p.owner === owner && p.repo === repo);
      if (existingProject) {
        setCurrentProject(existingProject);
        return;
      }

      const files = await fetchRepositoryStructure(owner, repo);
      
      const project: Project = {
        id: `${owner}/${repo}`,
        name: repo,
        url: repoUrl,
        owner,
        repo,
        files,
        createdAt: new Date(),
      };

      setProjects(prev => [...prev, project]);
      setCurrentProject(project);
    } catch (error) {
      console.error('Error importing project:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    projects,
    currentProject,
    activeFile,
    isLoading,
    importProject,
    setCurrentProject,
    setActiveFile,
    getFileContent,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
