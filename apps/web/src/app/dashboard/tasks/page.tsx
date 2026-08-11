'use client';

import React, { useState, useEffect } from 'react';
import { TaskCard } from '@/components/TaskCard';
import { Task, TaskStatus } from '@nexus/types';
import { fetchTasks } from '@/lib/api';
import { CheckSquare, Plus, LayoutGrid, List } from 'lucide-react';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, []);

  const columns: TaskStatus[] = ['To Do', 'In Progress', 'In Review', 'Done'];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-400" />
            Task Management Board
          </h1>
          <p className="text-xs text-slate-400">Track and re-assign tasks across active sprint projects.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                viewMode === 'kanban' ? 'bg-indigo-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs font-semibold ${
                viewMode === 'list' ? 'bg-indigo-600 text-white shadow-glow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col);
            return (
              <div key={col} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-3 flex flex-col h-full min-h-[450px]">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">{col}</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-indigo-400 font-mono font-bold">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3 flex-1 overflow-y-auto">
                  {colTasks.map((t) => (
                    <TaskCard key={t.id} task={t} />
                  ))}
                  {colTasks.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-800/80 rounded-xl flex items-center justify-center text-xs text-slate-600">
                      No tasks in {col}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 font-semibold uppercase">
              <tr>
                <th className="p-4">Task Title</th>
                <th className="p-4">Project</th>
                <th className="p-4">Status</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Assignee</th>
                <th className="p-4">Due Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-200">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/40">
                  <td className="p-4 font-semibold text-white">{t.title}</td>
                  <td className="p-4 text-slate-400">{t.projectName}</td>
                  <td className="p-4">{t.status}</td>
                  <td className="p-4 font-bold text-amber-400">{t.priority}</td>
                  <td className="p-4">{t.assignee?.fullName || 'Unassigned'}</td>
                  <td className="p-4 font-mono">{t.dueDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
