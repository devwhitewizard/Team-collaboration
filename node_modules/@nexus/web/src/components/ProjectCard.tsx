'use client';

import React from 'react';
import { Project } from '@nexus/types';
import { StatusBadge } from './StatusBadge';
import { ProgressBar } from './ProgressBar';
import { Calendar, CheckCircle2, Flag } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className="glass-card p-5 rounded-2xl cursor-pointer hover:scale-[1.01] transition-all flex flex-col justify-between"
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-bold text-white text-base line-clamp-1">{project.name}</h3>
          <StatusBadge status={project.status} />
        </div>
        <p className="text-xs text-slate-400 line-clamp-2 mb-4">{project.description}</p>
      </div>

      <div className="space-y-4">
        <ProgressBar progress={project.progress} size="sm" />

        <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{project.completedTasksCount}/{project.totalTasksCount} tasks</span>
            </div>
            <div className="flex items-center gap-1">
              <Flag className="w-3.5 h-3.5 text-cyan-400" />
              <span>{project.milestonesCount} milestones</span>
            </div>
          </div>

          <div className="flex -space-x-2">
            {project.members.slice(0, 3).map((m: any) => (
              <img
                key={m.id}
                src={m.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={m.fullName}
                className="w-6 h-6 rounded-full border border-slate-900 object-cover"
                title={m.fullName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
