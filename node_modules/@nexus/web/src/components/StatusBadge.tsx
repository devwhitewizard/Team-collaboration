'use client';

import React from 'react';
import { ProjectStatus, MemberStatus, TaskStatus, MemberStage, TaskPriority } from '@nexus/types';

interface StatusBadgeProps {
  status: ProjectStatus | MemberStatus | TaskStatus | MemberStage | TaskPriority | string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getBadgeStyle = (val: string) => {
    switch (val) {
      // Project Statuses
      case 'Active':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Planning':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Paused':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Completed':
      case 'Done':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Archived':
      case 'Inactive':
        return 'bg-slate-800 text-slate-400 border-slate-700';

      // Task Statuses & Priorities
      case 'Urgent':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30 font-bold';
      case 'High':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Medium':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Low':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'In Progress':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'In Review':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';

      // Member Statuses
      case 'Warning':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Probation':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'Removed':
        return 'bg-rose-950 text-rose-400 border-rose-800';

      // Stage Progression
      case 'Applicant':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      case 'Trial':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Contractor':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Active Contributor':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Senior Contributor':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'Paid Contractor':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Core Team':
        return 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 text-amber-300 border-amber-500/40 font-bold';

      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getBadgeStyle(
        status
      )}`}
    >
      {status}
    </span>
  );
}
