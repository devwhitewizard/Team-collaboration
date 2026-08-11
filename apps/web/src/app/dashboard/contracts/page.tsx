'use client';

import React, { useState, useEffect } from 'react';
import { Contract, MemberStage } from '@nexus/types';
import { fetchContracts } from '@/lib/api';
import { StatusBadge } from '@/components/StatusBadge';
import { FileCheck2, CheckCircle2, Award, TrendingUp, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ContractsPage() {
  const [contracts, setContracts] = useState<Contract[]>([]);

  useEffect(() => {
    fetchContracts().then(setContracts);
  }, []);

  const stages: MemberStage[] = [
    'Applicant',
    'Trial',
    'Contractor',
    'Active Contributor',
    'Senior Contributor',
    'Paid Contractor',
    'Core Team',
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-indigo-400" />
            Contracts & Contributor Progression
          </h1>
          <p className="text-xs text-slate-400">Track stage progression, performance evaluation scores, and promotion eligibility.</p>
        </div>
      </div>

      {/* Visual Progression Timeline */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-extrabold text-white text-sm tracking-wide uppercase">Contributor Progression Pathway</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {stages.map((stg, idx) => (
            <div
              key={stg}
              className={`p-3 rounded-2xl border text-center flex flex-col justify-between h-28 relative ${
                stg === 'Core Team'
                  ? 'bg-gradient-to-b from-amber-500/20 to-slate-900 border-amber-500/40 text-amber-300 font-bold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[10px] font-mono text-slate-500">Stage 0{idx + 1}</span>
              <p className="text-xs font-bold my-1">{stg}</p>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-1 rounded-full"
                  style={{ width: `${((idx + 1) / stages.length) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Member Contracts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((cnt) => (
          <div key={cnt.id} className="glass-card p-6 rounded-3xl space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-3">
                  <img src={cnt.user.avatarUrl} alt={cnt.user.fullName} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-white text-sm">{cnt.user.fullName}</h4>
                    <p className="text-xs text-slate-400">{cnt.contractType}</p>
                  </div>
                </div>
                <StatusBadge status={cnt.currentStage} />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">Performance Score</span>
                  <span className="text-lg font-extrabold text-emerald-400 mt-0.5 block">{cnt.performanceScore}/100</span>
                </div>

                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <span className="text-slate-400 block">Promotion Status</span>
                  <span className={`text-xs font-bold mt-1.5 block ${cnt.promotionEligible ? 'text-emerald-400' : 'text-slate-500'}`}>
                    {cnt.promotionEligible ? 'Eligible 🌟' : 'In Review'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 border-t border-slate-800/80 pt-3 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Start Date:</span>
                <span className="text-slate-200 font-mono">{formatDate(cnt.startDate)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Earnings Status:</span>
                <span className="font-semibold text-cyan-400">{cnt.earningsStatus}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
