'use client';

import React, { useState, useEffect } from 'react';
import { LeaderboardItem } from '@nexus/types';
import { fetchLeaderboard } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { Trophy, Medal, Flame, Zap } from 'lucide-react';

export default function RankingsPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardItem[]>([]);

  useEffect(() => {
    fetchLeaderboard().then(setLeaderboard);
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="font-mono text-sm font-bold text-slate-400">#{rank}</span>;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Trophy className="w-6 h-6 text-amber-400" />
            Contributor Rankings & Leaderboard
          </h1>
          <p className="text-xs text-slate-400">Gamified telemetry tracking contribution scores, completed tasks, and challenges.</p>
        </div>
      </div>

      {/* Top 3 Podium Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {leaderboard.slice(0, 3).map((item, idx) => (
          <div
            key={item.member.id}
            className={`glass-card p-6 rounded-3xl border flex flex-col items-center text-center relative ${
              idx === 0
                ? 'bg-gradient-to-b from-amber-500/20 to-slate-900 border-amber-500/40 shadow-glow scale-105 z-10'
                : 'border-slate-800'
            }`}
          >
            <div className="absolute top-4 right-4">{getRankBadge(item.rank)}</div>
            <img
              src={item.member.avatarUrl}
              alt={item.member.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-amber-400/60 shadow-lg mb-3"
            />
            <h3 className="font-extrabold text-white text-lg">{item.member.fullName}</h3>
            <div className="mt-1">
              <StatusBadge status={item.stage} />
            </div>

            <div className="grid grid-cols-2 gap-3 w-full mt-4 border-t border-slate-800/80 pt-4 text-xs">
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Contribution</span>
                <span className="font-extrabold text-amber-400 text-sm mt-0.5 block">{item.contributionScore} pts</span>
              </div>
              <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-slate-400 block">Tasks Done</span>
                <span className="font-extrabold text-white text-sm mt-0.5 block">{item.tasksCompleted}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-semibold uppercase">
            <tr>
              <th className="p-4">Rank</th>
              <th className="p-4">Member</th>
              <th className="p-4">Stage</th>
              <th className="p-4">Contribution Score</th>
              <th className="p-4">Tasks Completed</th>
              <th className="p-4">Challenges Completed</th>
              <th className="p-4">Weekly Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/80 text-slate-200">
            {leaderboard.map((item) => (
              <tr key={item.member.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="p-4">{getRankBadge(item.rank)}</td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img src={item.member.avatarUrl} alt={item.member.fullName} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-white">{item.member.fullName}</p>
                      <p className="text-[10px] text-slate-400">{item.member.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <StatusBadge status={item.stage} />
                </td>
                <td className="p-4 font-extrabold text-amber-400 font-mono text-sm">{item.contributionScore} pts</td>
                <td className="p-4 font-semibold text-white">{item.tasksCompleted}</td>
                <td className="p-4 font-semibold text-cyan-400">{item.challengesCompleted}</td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.weeklyActivityScore}%` }} />
                    </div>
                    <span className="font-mono text-[11px] text-slate-400">{item.weeklyActivityScore}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
