'use client';

import React, { useState, useEffect } from 'react';
import { WeeklyUpdateCard } from '@/components/WeeklyUpdateCard';
import { WeeklyUpdate } from '@nexus/types';
import { fetchWeeklyUpdates } from '@/lib/api';
import { FileText, Plus, Send, X } from 'lucide-react';

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<WeeklyUpdate[]>([]);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [completedText, setCompletedText] = useState('');
  const [inProgressText, setInProgressText] = useState('');
  const [blockersText, setBlockersText] = useState('');
  const [nextPlansText, setNextPlansText] = useState('');

  useEffect(() => {
    fetchWeeklyUpdates().then(setUpdates);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUpdate: WeeklyUpdate = {
      id: `up-${Date.now()}`,
      organizationId: 'org-1',
      author: {
        id: 'u-1',
        fullName: 'Alex Rivera',
        email: 'alex@nexustech.io',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
        createdAt: '2026-01-01',
      },
      submittedAt: new Date().toISOString(),
      completedTasks: completedText.split('\n').filter(Boolean),
      inProgressTasks: inProgressText.split('\n').filter(Boolean),
      blockers: blockersText.split('\n').filter(Boolean),
      nextPlans: nextPlansText.split('\n').filter(Boolean),
    };

    setUpdates([newUpdate, ...updates]);
    setCompletedText('');
    setInProgressText('');
    setBlockersText('');
    setNextPlansText('');
    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            Weekly Progress Updates Feed
          </h1>
          <p className="text-xs text-slate-400">Share completed deliverables, active work, blockers, and upcoming goals.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center gap-2 self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Weekly Update</span>
        </button>
      </div>

      {/* Feed Timeline */}
      <div className="space-y-6">
        {updates.map((u) => (
          <WeeklyUpdateCard key={u.id} update={u} />
        ))}
      </div>

      {/* Submission Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl max-w-xl w-full border border-slate-800 shadow-2xl space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">Submit Weekly Update</h3>
              <button onClick={() => setShowModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-emerald-400 block mb-1">What I Completed (1 per line)</label>
                <textarea
                  rows={2}
                  value={completedText}
                  onChange={(e) => setCompletedText(e.target.value)}
                  placeholder="• Fixed bug in auth controller&#10;• Deployed staging server"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-cyan-400 block mb-1">What I am Currently Working On</label>
                <textarea
                  rows={2}
                  value={inProgressText}
                  onChange={(e) => setInProgressText(e.target.value)}
                  placeholder="• Integrating Supabase real-time notifications"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-amber-400 block mb-1">What Blocked Me (optional)</label>
                <textarea
                  rows={2}
                  value={blockersText}
                  onChange={(e) => setBlockersText(e.target.value)}
                  placeholder="• Waiting for API key approvals"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-purple-400 block mb-1">What I Plan to Do Next</label>
                <textarea
                  rows={2}
                  value={nextPlansText}
                  onChange={(e) => setNextPlansText(e.target.value)}
                  placeholder="• Write unit tests for projects module"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-glow flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Update</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
