'use client';

import React, { useState, useEffect } from 'react';
import { ChallengeCard } from '@/components/ChallengeCard';
import { Challenge, ChallengeType } from '@nexus/types';
import { fetchChallenges } from '@/lib/api';
import { Code2, Sparkles, Cpu, Users } from 'lucide-react';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedType, setSelectedType] = useState<string>('ALL');

  useEffect(() => {
    fetchChallenges().then(setChallenges);
  }, []);

  const filtered = selectedType === 'ALL'
    ? challenges
    : challenges.filter((c) => c.type === selectedType);

  const types: (ChallengeType | 'ALL')[] = ['ALL', 'Vibe Coding', 'Traditional Coding', 'Team Challenge'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Code2 className="w-6 h-6 text-indigo-400" />
            Engineering & Coding Challenges
          </h1>
          <p className="text-xs text-slate-400">Participate in Vibe Coding, Traditional algorithms, and Team hackathons.</p>
        </div>
      </div>

      {/* Track Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setSelectedType(t)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 flex-shrink-0 ${
              selectedType === t
                ? 'bg-indigo-600 text-white shadow-glow'
                : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t === 'Vibe Coding' && <Sparkles className="w-3.5 h-3.5 text-cyan-300" />}
            {t === 'Traditional Coding' && <Cpu className="w-3.5 h-3.5 text-amber-300" />}
            {t === 'Team Challenge' && <Users className="w-3.5 h-3.5 text-emerald-300" />}
            <span>{t === 'ALL' ? 'All Challenges' : t}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <ChallengeCard key={c.id} challenge={c} />
        ))}
      </div>
    </div>
  );
}
