'use client';

import React, { useState, useEffect } from 'react';
import { ProjectCard } from '@/components/ProjectCard';
import { ProjectProgress } from '@/components/ProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
import { Project, ProjectStatus } from '@nexus/types';
import { fetchProjects } from '@/lib/api';
import { FolderKanban, Plus, Filter, X, CheckCircle2, Flag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  const filteredProjects = selectedStatus === 'ALL'
    ? projects
    : projects.filter((p) => p.status === selectedStatus);

  const statuses: (ProjectStatus | 'ALL')[] = ['ALL', 'Planning', 'Active', 'Paused', 'Completed', 'Archived'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Action Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-indigo-400" />
            Projects Directory
          </h1>
          <p className="text-xs text-slate-400">Manage and track multi-tenant projects across your organization.</p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        <Filter className="w-4 h-4 text-slate-500 mr-2 flex-shrink-0" />
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex-shrink-0 ${
              selectedStatus === st
                ? 'bg-indigo-600 text-white shadow-glow'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {st === 'ALL' ? 'All Projects' : st}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((proj) => (
          <ProjectCard key={proj.id} project={proj} onClick={() => setSelectedProject(proj)} />
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-2xl w-full border border-slate-800 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-start justify-between">
              <div>
                <StatusBadge status={selectedProject.status} />
                <h3 className="text-xl font-extrabold text-white mt-2">{selectedProject.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{selectedProject.description}</p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Start Date: {formatDate(selectedProject.startDate)}</span>
                <span>Target Completion: {formatDate(selectedProject.targetEndDate)}</span>
              </div>
              <ProjectProgress progress={selectedProject.progress} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Total Tasks</span>
                <span className="text-base font-bold text-white mt-1 block">
                  {selectedProject.completedTasksCount}/{selectedProject.totalTasksCount}
                </span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Milestones</span>
                <span className="text-base font-bold text-white mt-1 block">{selectedProject.milestonesCount}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block">Assigned Team</span>
                <span className="text-base font-bold text-white mt-1 block">{selectedProject.members.length} Members</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
