'use client';

import React from 'react';
import { Task, Milestone } from '@nexus/types';
import { StatusBadge } from './StatusBadge';
import { Calendar, User as UserIcon, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { ProgressBar } from './ProgressBar';

export function TaskCard({ task }: { task: Task }) {
  return (
    <div className="glass-card p-4 rounded-xl space-y-3">
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-sm text-slate-100 line-clamp-1">{task.title}</h4>
        <StatusBadge status={task.priority} />
      </div>

      <p className="text-xs text-slate-400 line-clamp-2">{task.description}</p>

      <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/80">
        <StatusBadge status={task.status} />

        <div className="flex items-center gap-2">
          {task.assignee ? (
            <img
              src={task.assignee.avatarUrl}
              alt={task.assignee.fullName}
              className="w-5 h-5 rounded-full object-cover border border-slate-700"
              title={task.assignee.fullName}
            />
          ) : (
            <UserIcon className="w-4 h-4 text-slate-500" />
          )}
          <span className="flex items-center gap-1 text-[11px]">
            <Calendar className="w-3 h-3 text-slate-500" />
            {formatDate(task.dueDate)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function MilestoneCard({ milestone }: { milestone: Milestone }) {
  return (
    <div className="glass-card p-5 rounded-2xl space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400">{milestone.projectName}</span>
          <h4 className="font-bold text-white text-base mt-0.5">{milestone.title}</h4>
        </div>
        {milestone.isCompleted ? (
          <span className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Completed
          </span>
        ) : (
          <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-bold">
            In Progress
          </span>
        )}
      </div>

      <p className="text-xs text-slate-400">{milestone.description}</p>

      <div className="space-y-2">
        <ProgressBar progress={milestone.progress} size="sm" />
        <p className="text-xs text-slate-500 text-right">Target Due: {formatDate(milestone.dueDate)}</p>
      </div>
    </div>
  );
}
