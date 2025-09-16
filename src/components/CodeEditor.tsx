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

  // Very lightweight syntax highlighter (no external libs)
  // Covers common tokens for JS/TS/JSON/HTML/CSS/YAML/Markdown as a best-effort
  const renderHighlightedCode = (source: string, language: string) => {
    const lines = source.split('\n');

    const highlightJsTs = (text: string) => {
      const patterns: Array<{ regex: RegExp; className: string }> = [
        { regex: /\/\*[\s\S]*?\*\//g, className: 'text-gray-400' }, // block comments
        { regex: /\/\/.*$/gm, className: 'text-gray-400' }, // line comments
        { regex: /`(?:\\`|[^`])*`/g, className: 'text-yellow-300' }, // template strings
        { regex: /'(?:\\'|[^'])*'|"(?:\\"|[^"])*"/g, className: 'text-green-300' }, // strings
        { regex: /\b(?:true|false|null|undefined|NaN|Infinity)\b/g, className: 'text-purple-300' },
        { regex: /\b(?:const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|class|extends|super|this|import|from|export|default|as|async|await|interface|type|implements|public|private|protected|readonly)\b/g, className: 'text-blue-300' },
        { regex: /\b(?:number|string|boolean|any|void|unknown|never|object|Record|Array|Promise|Map|Set)\b/g, className: 'text-sky-300' },
        { regex: /\b\d+(?:\.\d+)?\b/g, className: 'text-orange-300' },
      ];
      return applyPatterns(text, patterns);
    };

    const highlightJson = (text: string) => {
      const patterns: Array<{ regex: RegExp; className: string }> = [
        { regex: /"([^"\\]|\\.)*"(?=\s*:)/g, className: 'text-blue-300' }, // keys
        { regex: /"([^"\\]|\\.)*"/g, className: 'text-green-300' }, // strings
        { regex: /\b\d+(?:\.\d+)?\b/g, className: 'text-orange-300' },
        { regex: /\b(?:true|false|null)\b/g, className: 'text-purple-300' },
      ];
      return applyPatterns(text, patterns);
    };

    const highlightHtml = (text: string) => {
      const patterns: Array<{ regex: RegExp; className: string }> = [
        { regex: /<\/?[a-zA-Z0-9\-]+/g, className: 'text-blue-300' }, // tag name
        { regex: /\s+[a-zA-Z_:][a-zA-Z0-9_:\-]*(?==)/g, className: 'text-purple-300' }, // attr name
        { regex: /=\s*"[^"]*"|=\s*'[^']*'/g, className: 'text-green-300' }, // attr value
        { regex: />/g, className: 'text-blue-300' },
        { regex: /<!--([\s\S]*?)-->/g, className: 'text-gray-400' },
      ];
      return applyPatterns(text, patterns);
    };

    const highlightCss = (text: string) => {
      const patterns: Array<{ regex: RegExp; className: string }> = [
        { regex: /\/\*[\s\S]*?\*\//g, className: 'text-gray-400' },
        { regex: /#[0-9a-fA-F]{3,8}\b/g, className: 'text-orange-300' }, // hex colors
        { regex: /\b\d+(?:\.\d+)?(?:px|em|rem|%|vh|vw)\b/g, className: 'text-orange-300' },
        { regex: /:[\s]*[a-zA-Z\-]+(?=\s*;)/g, className: 'text-green-300' }, // property values
        { regex: /\b[a-zA-Z\-]+(?=\s*:)/g, className: 'text-blue-300' }, // property names
        { regex: /\.[a-zA-Z_][\w\-]*/g, className: 'text-purple-300' }, // class selectors
        { regex: /#[a-zA-Z_][\w\-]*/g, className: 'text-purple-300' }, // id selectors
      ];
      return applyPatterns(text, patterns);
    };

    const highlightPython = (text: string) => {
      const patterns: Array<{ regex: RegExp; className: string }> = [
        { regex: /#.*/g, className: 'text-gray-400' }, // comments
        { regex: /"""[\s\S]*?"""|'''[\s\S]*?'''/g, className: 'text-yellow-300' }, // triple-quoted strings
        { regex: /'(?:\\'|[^'])*'|"(?:\\"|[^"])*"/g, className: 'text-green-300' }, // strings
        { regex: /\b(?:def|class|return|if|elif|else|for|while|try|except|finally|with|as|import|from|pass|break|continue|lambda|yield|global|nonlocal|assert|del|raise|in|is|not|and|or)\b/g, className: 'text-blue-300' }, // keywords
        { regex: /\b(?:True|False|None)\b/g, className: 'text-purple-300' },
        { regex: /\b(?:int|float|str|list|dict|set|tuple|Any|List|Dict|Optional|Union)\b/g, className: 'text-sky-300' },
        { regex: /\b(?:print|len|range|open|input|type|isinstance|enumerate|zip|map|filter|sum|min|max|abs|sorted)\b/g, className: 'text-sky-300' },
        { regex: /\b\d+(?:\.\d+)?\b/g, className: 'text-orange-300' }, // numbers
        { regex: /@[a-zA-Z_][\w]*/g, className: 'text-pink-300' }, // decorators
        { regex: /\b(?:from|import)\b\s+[a-zA-Z_][\w\.]*/g, className: 'text-emerald-300' }, // imports
      ];
      return applyPatterns(text, patterns);
    };

    const highlightYaml = (text: string) => {
      const patterns: Array<{ regex: RegExp; className: string }> = [
        { regex: /#.*/g, className: 'text-gray-400' },
        { regex: /\b(?:true|false|null)\b/g, className: 'text-purple-300' },
        { regex: /\b\d+(?:\.\d+)?\b/g, className: 'text-orange-300' },
        { regex: /\b[a-zA-Z_][\w\-]*\s*:/g, className: 'text-blue-300' },
        { regex: /"([^"\\]|\\.)*"|'([^'\\]|\\.)*'/g, className: 'text-green-300' },
      ];
      return applyPatterns(text, patterns);
    };

    const highlightMarkdown = (text: string) => {
      const patterns: Array<{ regex: RegExp; className: string }> = [
        { regex: /^\s*#+\s.*$/gm, className: 'text-blue-300' }, // headings
        { regex: /\*\*([^*]+)\*\*|__([^_]+)__/g, className: 'text-yellow-300' }, // bold
        { regex: /\*([^*]+)\*|_([^_]+)_/g, className: 'text-purple-300' }, // italic
        { regex: /`[^`]+`/g, className: 'text-green-300' }, // inline code
        { regex: /\[[^\]]+\]\([^\)]+\)/g, className: 'text-sky-300' }, // links
      ];
      return applyPatterns(text, patterns);
    };

    const applyPatterns = (raw: string, patterns: Array<{ regex: RegExp; className: string }>) => {
      // Split into tokens by progressively replacing matches with placeholders
      type Segment = { text: string; className?: string };
      let segments: Segment[] = [{ text: raw }];
      patterns.forEach(({ regex, className }) => {
        const next: Segment[] = [];
        segments.forEach(seg => {
          if (seg.className) {
            next.push(seg);
            return;
          }
          let lastIndex = 0;
          const text = seg.text;
          let match: RegExpExecArray | null;
          const r = new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g');
          while ((match = r.exec(text)) !== null) {
            if (match.index > lastIndex) {
              next.push({ text: text.slice(lastIndex, match.index) });
            }
            next.push({ text: match[0], className });
            lastIndex = match.index + match[0].length;
          }
          if (lastIndex < text.length) {
            next.push({ text: text.slice(lastIndex) });
          }
        });
        segments = next;
      });
      return segments;
    };

    const highlighterFor = (lang: string) => {
      switch (lang) {
        case 'javascript':
        case 'typescript':
          return highlightJsTs;
        case 'json':
          return highlightJson;
        case 'html':
          return highlightHtml;
        case 'css':
          return highlightCss;
        case 'python':
          return highlightPython;
        case 'yaml':
          return highlightYaml;
        case 'markdown':
          return highlightMarkdown;
        default:
          return (t: string) => [{ text: t }];
      }
    };

    const highlight = highlighterFor(language);

    return lines.map((line, idx) => {
      const parts = highlight(line);
      return (
        <div key={idx}>
          {parts.map((part, i) => (
            <span key={i} className={part.className}>{part.text}</span>
          ))}
        </div>
      );
    });
  };

  if (!activeFile) {
    return (
      <div className="flex-1 bg-gray-900/30 flex items-center justify-center overflow-hidden">
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
      <div className="flex-1 bg-gray-900/30 flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <FileText className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <h3 className="text-white/60 text-lg mb-2">Folder selected</h3>
          <p className="text-white/40 text-sm">Select a file to view its contents</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gray-900/30 flex flex-col overflow-hidden">
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
      <div className="flex-1 relative overflow-hidden">
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
            <div className="flex h-full overflow-auto">
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
              <div className="flex-1">
                <pre className="font-mono text-sm text-white/90 p-4 leading-6 whitespace-pre-wrap">
                  {renderHighlightedCode(content || '// File is empty', getLanguageFromFileName(activeFile.name))}
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
