'use client';

import React from 'react';
import { Rank } from '@nexus/types';

interface RankBadgeProps {
  rank: Rank;
}

export function RankBadge({ rank }: RankBadgeProps) {
  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/90 border border-slate-800 text-xs font-semibold text-slate-200">
      <span className="text-sm">{rank.badge}</span>
      <span>{rank.title}</span>
      <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
        L{rank.level}
      </span>
    </div>
  );
}
