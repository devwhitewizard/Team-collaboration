'use client';

import React from 'react';
import { TrendingUp, Award, Zap, CheckCircle2, Target } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';

export default function PerformancePage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
            Performance & Productivity Telemetry
          </h1>
          <p className="text-xs text-slate-400">Analytics overview for organization output, throughput, and code quality score.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs">
            <Zap className="w-4 h-4" />
            <span>Sprint Velocity</span>
          </div>
          <h3 className="text-3xl font-black text-white">48 pts/wk</h3>
          <p className="text-xs text-slate-400">+12% increase compared to previous quarter baseline</p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
            <CheckCircle2 className="w-4 h-4" />
            <span>Task Completion Rate</span>
          </div>
          <h3 className="text-3xl font-black text-white">92.4%</h3>
          <p className="text-xs text-slate-400">142 of 154 assigned tasks delivered on schedule</p>
        </div>

        <div className="glass-card p-6 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
            <Target className="w-4 h-4" />
            <span>Challenge Score Average</span>
          </div>
          <h3 className="text-3xl font-black text-white">88/100</h3>
          <p className="text-xs text-slate-400">Vibe & Traditional coding submission quality average</p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-6">
        <h3 className="font-extrabold text-white text-base">Key Performance Metrics</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Monorepo TypeScript Code Coverage</span>
              <span className="text-indigo-400">84%</span>
            </div>
            <ProgressBar progress={84} showLabel={false} />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">NestJS API Endpoint SLA Response Time (&lt;100ms)</span>
              <span className="text-emerald-400">98%</span>
            </div>
            <ProgressBar progress={98} showLabel={false} colorClass="bg-emerald-500" />
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span className="text-slate-300">Weekly Update Submission Compliance</span>
              <span className="text-cyan-400">91%</span>
            </div>
            <ProgressBar progress={91} showLabel={false} colorClass="bg-cyan-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
