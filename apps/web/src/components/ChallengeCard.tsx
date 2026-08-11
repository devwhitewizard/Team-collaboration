'use client';

import React from 'react';
import { Challenge, Document } from '@nexus/types';
import { StatusBadge } from './StatusBadge';
import { Code2, Cpu, Users, Calendar, Sparkles, FileText, Download } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export function ChallengeCard({ challenge }: { challenge: Challenge }) {
  return (
    <div className="glass-card p-5 rounded-2xl space-y-4 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
            <Code2 className="w-3.5 h-3.5" />
            {challenge.type}
          </span>
          <StatusBadge status={challenge.difficulty} />
        </div>

        <h4 className="font-bold text-white text-base mb-1">{challenge.title}</h4>
        <p className="text-xs text-slate-400 line-clamp-3">{challenge.description}</p>
      </div>

      <div className="space-y-3 border-t border-slate-800/80 pt-3">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            {challenge.aiAllowed ? (
              <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                <Sparkles className="w-3 h-3" /> AI Allowed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20 font-semibold">
                <Cpu className="w-3 h-3" /> No AI Prohibited
              </span>
            )}
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            {challenge.participantsCount} competitors
          </span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-500">Deadline: {formatDate(challenge.deadline)}</span>
          <button className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow transition-colors">
            {challenge.userSubmissionStatus || 'View Challenge'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function DocumentCard({ doc }: { doc: Document }) {
  return (
    <div className="glass-card p-4 rounded-xl flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-indigo-400">
          <FileText className="w-5 h-5" />
        </div>
        <div className="truncate">
          <h4 className="font-semibold text-white text-sm truncate">{doc.title}</h4>
          <p className="text-xs text-slate-400">{doc.category} • {doc.fileSize} • Updated {formatDate(doc.updatedAt)}</p>
        </div>
      </div>
      <button className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-indigo-400 hover:border-indigo-500/50 transition-colors">
        <Download className="w-4 h-4" />
      </button>
    </div>
  );
}
