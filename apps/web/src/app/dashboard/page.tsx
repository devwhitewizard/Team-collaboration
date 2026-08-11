'use client';

import React, { useEffect, useState } from 'react';
import {
  FolderKanban,
  CheckSquare,
  Users,
  Flag,
  TrendingUp,
  AlertTriangle,
  Calendar,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { DashboardCard } from '@/components/DashboardCard';
import { ProjectCard } from '@/components/ProjectCard';
import { ActivityFeed, WeeklyUpdateCard } from '@/components/WeeklyUpdateCard';
import { ProgressBar } from '@/components/ProgressBar';
import { StatusBadge } from '@/components/StatusBadge';
import { Project, Task, WeeklyUpdate, OrganizationMember } from '@nexus/types';
import { fetchProjects, fetchTasks, fetchWeeklyUpdates, fetchMembers } from '@/lib/api';
import Link from 'next/link';

export default function DashboardOverviewPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [updates, setUpdates] = useState<WeeklyUpdate[]>([]);
  const [members, setMembers] = useState<OrganizationMember[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
    fetchTasks().then(setTasks);
    fetchWeeklyUpdates().then(setUpdates);
    fetchMembers().then(setMembers);
  }, []);

  const activeProjects = projects.filter((p) => p.status === 'Active');
  const pendingTasks = tasks.filter((t) => t.status !== 'Done');
  const membersRequiringAttention = members.filter((m) => m.status === 'Warning' || m.status === 'Probation');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="glass-card p-6 md:p-8 rounded-3xl bg-gradient-to-r from-indigo-900/40 via-purple-900/20 to-slate-900 border border-indigo-500/20 shadow-glow flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nexus Team Hub • Nexus Tech Workspace</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Organization Dashboard Overview
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Real-time telemetry across active projects, milestone deadlines, and contributor progression.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            href="/dashboard/updates"
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center gap-2"
          >
            <span>Submit Weekly Update</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* KPI Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <DashboardCard title="Total Projects" value={projects.length} icon={FolderKanban} change="+2 this month" />
        <DashboardCard title="Active Projects" value={activeProjects.length} icon={TrendingUp} change="88% on track" />
        <DashboardCard title="Pending Tasks" value={pendingTasks.length} icon={CheckSquare} change="14 due soon" isPositive={false} />
        <DashboardCard title="Milestones" value="12" icon={Flag} change="4 completed" />
        <DashboardCard title="Active Members" value={members.length} icon={Users} change="5 active online" />
        <DashboardCard title="Overall Progress" value="74%" icon={TrendingUp} change="+6% vs last week" />
      </div>

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Projects & Weekly Updates */}
        <div className="lg:col-span-2 space-y-8">
          {/* Active Projects Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-white tracking-tight flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-indigo-400" />
                Active Projects Overview
              </h2>
              <Link href="/dashboard/projects" className="text-xs text-indigo-400 font-semibold hover:underline">
                View all ({projects.length}) →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeProjects.slice(0, 2).map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>

          {/* Recent Weekly Updates Preview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-extrabold text-white tracking-tight">Recent Weekly Updates</h2>
              <Link href="/dashboard/updates" className="text-xs text-indigo-400 font-semibold hover:underline">
                See all feed →
              </Link>
            </div>

            {updates.slice(0, 1).map((u) => (
              <WeeklyUpdateCard key={u.id} update={u} />
            ))}
          </div>
        </div>

        {/* Right 1 Col: Members Requiring Attention, Deadlines & Activity */}
        <div className="space-y-6">
          {/* Members Requiring Attention */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Members Requiring Attention
              </h3>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-mono font-bold">
                {membersRequiringAttention.length}
              </span>
            </div>

            <div className="space-y-3">
              {membersRequiringAttention.map((m) => (
                <div key={m.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img src={m.user.avatarUrl} alt={m.user.fullName} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="font-bold text-white">{m.user.fullName}</p>
                      <p className="text-[10px] text-slate-400">{m.stage}</p>
                    </div>
                  </div>
                  <StatusBadge status={m.status} />
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              Upcoming Deadlines
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Phase 1 Monorepo REST API</p>
                  <p className="text-[10px] text-slate-400">Nexus SaaS Engine v2</p>
                </div>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded-lg">Aug 15</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-200">Vibe Coding Challenge Submission</p>
                  <p className="text-[10px] text-slate-400">AI Microservice Generator</p>
                </div>
                <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-1 rounded-lg">Aug 18</span>
              </div>
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="font-bold text-white text-sm">Recent Activity</h3>
            <ActivityFeed />
          </div>
        </div>
      </div>
    </div>
  );
}
