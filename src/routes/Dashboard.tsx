import React from 'react';
import { Upload, Github, Shield, Bug, Zap } from 'lucide-react';
import Header from '../components/Header';
import Orb from '../components/Orb';
import { useAuth } from '../contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Bugs Fixed', value: '127', icon: Bug },
    { label: 'Security Issues Resolved', value: '43', icon: Shield },
    { label: 'Performance Improvements', value: '89', icon: Zap },
  ];

  const recentProjects = [
    { name: 'E-commerce App', status: 'Analyzing', lastScan: '2 hours ago', issues: 12 },
    { name: 'React Dashboard', status: 'Fixed', lastScan: '1 day ago', issues: 0 },
    { name: 'Node.js API', status: 'In Progress', lastScan: '3 hours ago', issues: 7 },
  ];

  return (
    <section className="relative min-h-screen bg-black">
      <Header />
      <div className="absolute inset-0">
        <Orb 
          hoverIntensity={0.3}
          rotateOnHover={false}
          hue={0}
          forceHoverState={false}
        />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black"></div>
      
      <div className="relative z-10 pt-24 pb-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
              Welcome back, {user?.name}
            </h1>
            <p className="text-white/70 text-lg">
              Monitor and manage your code health from one central dashboard.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 rounded-2xl p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/60 text-sm">{stat.label}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Actions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Import Project */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 rounded-2xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                  <Github className="w-8 h-8 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Import from GitHub</h3>
                  <p className="text-white/70">Connect your repository for automated analysis</p>
                </div>
              </div>
              <button className="w-full py-4 px-6 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 hover:border-blue-500/60 transition-colors duration-200 flex items-center justify-center gap-2">
                <Github className="w-5 h-5" />
                Connect Repository
              </button>
            </div>

            {/* Upload Project */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:border-white/30 transition-colors duration-200 rounded-2xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                  <Upload className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Upload Project</h3>
                  <p className="text-white/70">Upload a ZIP file of your project for analysis</p>
                </div>
              </div>
              <button className="w-full py-4 px-6 rounded-xl bg-green-600/20 border border-green-500/40 text-green-300 hover:bg-green-600/30 hover:border-green-500/60 transition-colors duration-200 flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" />
                Upload Files
              </button>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            <h3 className="text-2xl font-semibold text-white mb-6">Recent Projects</h3>
            <div className="space-y-4">
              {recentProjects.map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                      <div className="w-6 h-6 bg-purple-400 rounded"></div>
                    </div>
                    <div>
                      <div className="text-white font-medium">{project.name}</div>
                      <div className="text-white/60 text-sm">Last scan: {project.lastScan}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-white/80 text-sm">
                        {project.issues > 0 ? `${project.issues} issues` : 'All clear'}
                      </div>
                      <div className={`text-sm px-2 py-1 rounded-full ${
                        project.status === 'Fixed' 
                          ? 'bg-green-500/20 text-green-300' 
                          : project.status === 'Analyzing'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
