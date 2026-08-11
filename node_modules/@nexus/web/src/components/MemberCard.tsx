'use client';

import React from 'react';
import { OrganizationMember } from '@nexus/types';
import { StatusBadge } from './StatusBadge';
import { RankBadge } from './RankBadge';
import { Trophy, CheckSquare, Activity } from 'lucide-react';

export function MemberCard({ member }: { member: OrganizationMember }) {
  return (
    <div className="glass-card p-5 rounded-2xl space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img
              src={member.user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80'}
              alt={member.user.fullName}
              className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow-sm"
            />
            <div>
              <h4 className="font-bold text-white text-base">{member.user.fullName}</h4>
              <p className="text-xs text-slate-400">{member.orgRole}</p>
            </div>
          </div>
          <StatusBadge status={member.status} />
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <RankBadge rank={member.rank} />
          <StatusBadge status={member.stage} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 border-t border-slate-800/80 pt-3 text-xs">
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Score</span>
          </div>
          <p className="text-sm font-bold text-white mt-1">{member.contributionScore} pts</p>
        </div>
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
          <div className="flex items-center gap-1.5 text-slate-400">
            <CheckSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Completed</span>
          </div>
          <p className="text-sm font-bold text-white mt-1">{member.tasksCompleted} tasks</p>
        </div>
      </div>
    </div>
  );
}
