'use client';

import React from 'react';
import { MilestoneCard } from '@/components/TaskCard';
import { MOCK_MILESTONES } from '@/lib/mock-data';
import { Flag, Plus } from 'lucide-react';

export default function MilestonesPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Flag className="w-6 h-6 text-indigo-400" />
            Project Milestones Timeline
          </h1>
          <p className="text-xs text-slate-400">Track key engineering release gates and phase deliverables.</p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow flex items-center gap-2 self-start">
          <Plus className="w-4 h-4" />
          <span>Add Milestone</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MILESTONES.map((ms) => (
          <MilestoneCard key={ms.id} milestone={ms} />
        ))}
      </div>
    </div>
  );
}
