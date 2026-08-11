'use client';

import React from 'react';
import { WeeklyUpdate } from '@nexus/types';
import { CheckCircle2, Clock, AlertCircle, ArrowRight, User as UserIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function WeeklyUpdateCard({ update }: { update: WeeklyUpdate }) {
  return (
    <div className="glass-card p-6 rounded-2xl space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <img
            src={update.author.avatarUrl}
            alt={update.author.fullName}
            className="w-10 h-10 rounded-full object-cover border border-indigo-500/40"
          />
          <div>
            <h4 className="font-bold text-white text-sm">{update.author.fullName}</h4>
            <p className="text-xs text-slate-400">Weekly Progress Update</p>
          </div>
        </div>
        <span className="text-xs text-slate-500 font-mono">{formatDate(update.submittedAt)}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Completed */}
        <div className="bg-emerald-950/20 border border-emerald-500/20 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>What I Completed</span>
          </div>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {update.completedTasks.map((t: string, idx: number) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>
        </div>

        {/* Working On */}
        <div className="bg-cyan-950/20 border border-cyan-500/20 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Clock className="w-4 h-4" />
            <span>Currently Working On</span>
          </div>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {update.inProgressTasks.map((t: string, idx: number) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>
        </div>

        {/* Blockers */}
        <div className="bg-amber-950/20 border border-amber-500/20 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <AlertCircle className="w-4 h-4" />
            <span>Blockers</span>
          </div>
          {update.blockers.length > 0 ? (
            <ul className="list-disc list-inside text-slate-300 space-y-1">
              {update.blockers.map((t: string, idx: number) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          ) : (
            <p className="text-slate-500 italic">No blockers reported.</p>
          )}
        </div>

        {/* Next Plans */}
        <div className="bg-purple-950/20 border border-purple-500/20 p-3.5 rounded-xl space-y-2">
          <div className="flex items-center gap-1.5 text-purple-400 font-bold">
            <ArrowRight className="w-4 h-4" />
            <span>Next Plans</span>
          </div>
          <ul className="list-disc list-inside text-slate-300 space-y-1">
            {update.nextPlans.map((t: string, idx: number) => (
              <li key={idx}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export function ActivityFeed() {
  const activities = [
    { title: 'Sarah Chen created new project', desc: 'Supabase Realtime Infrastructure', time: '2 hours ago', icon: '🚀' },
    { title: 'Alex Rivera closed 3 tasks', desc: 'NestJS REST controllers & DTO modules', time: '4 hours ago', icon: '✅' },
    { title: 'David Kim completed coding challenge', desc: 'Traditional: Zero-Dependency JSON Parser', time: '1 day ago', icon: '🏆' },
  ];

  return (
    <div className="space-y-3">
      {activities.map((act, idx) => (
        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-base">{act.icon}</span>
            <div>
              <p className="font-semibold text-slate-200">{act.title}</p>
              <p className="text-slate-400">{act.desc}</p>
            </div>
          </div>
          <span className="text-slate-500 font-mono text-[10px]">{act.time}</span>
        </div>
      ))}
    </div>
  );
}
