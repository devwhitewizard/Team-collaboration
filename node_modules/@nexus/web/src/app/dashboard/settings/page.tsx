'use client';

import React, { useState } from 'react';
import { Settings, Building2, Key, Bell, Shield, Save } from 'lucide-react';

export default function SettingsPage() {
  const [orgName, setOrgName] = useState('Nexus Tech');
  const [slug, setSlug] = useState('nexus-tech');
  const [description, setDescription] = useState('Enterprise AI & core SaaS platform R&D team');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Settings className="w-6 h-6 text-indigo-400" />
            Workspace & Organization Settings
          </h1>
          <p className="text-xs text-slate-400">Manage multi-tenant workspace configurations, API tokens, and access roles.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-800 space-y-6">
        {saved && (
          <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold">
            Settings updated successfully!
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-extrabold text-white text-sm tracking-wide uppercase border-b border-slate-800 pb-2 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-indigo-400" />
            Organization Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="font-semibold text-slate-300 block mb-1">Organization Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-300 block mb-1">Workspace Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="font-semibold text-slate-300 block mb-1">Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-extrabold text-white text-sm tracking-wide uppercase flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            Supabase Infrastructure Keys
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">API Base URL</label>
              <input
                type="text"
                readOnly
                value="http://localhost:3001/api"
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 text-slate-400 font-mono"
              />
            </div>
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Supabase URL Placeholder</label>
              <input
                type="text"
                readOnly
                value="https://your-supabase-project.supabase.co"
                className="w-full bg-slate-950 border border-slate-800/80 rounded-xl p-2.5 text-slate-400 font-mono"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow flex items-center gap-2 transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
