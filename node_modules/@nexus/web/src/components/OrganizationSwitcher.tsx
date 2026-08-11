'use client';

import React, { useState } from 'react';
import { Building2, ChevronDown, Plus, Check } from 'lucide-react';
import { Organization } from '@nexus/types';
import { MOCK_ORGANIZATIONS } from '@/lib/mock-data';

interface OrganizationSwitcherProps {
  currentOrgId?: string;
  onSelectOrg?: (org: Organization) => void;
}

export function OrganizationSwitcher({
  currentOrgId = 'org-1',
  onSelectOrg,
}: OrganizationSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [organizations] = useState<Organization[]>(MOCK_ORGANIZATIONS);
  const [selectedOrg, setSelectedOrg] = useState<Organization>(
    organizations.find((o) => o.id === currentOrgId) || organizations[0]
  );
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');

  const handleSelect = (org: Organization) => {
    setSelectedOrg(org);
    if (onSelectOrg) onSelectOrg(org);
    setIsOpen(false);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrgName.trim()) return;
    const newOrg: Organization = {
      id: `org-${Date.now()}`,
      name: newOrgName,
      slug: newOrgName.toLowerCase().replace(/\s+/g, '-'),
      description: 'Newly initialized organization workspace',
      memberCount: 1,
      activeProjectsCount: 0,
      createdAt: new Date().toISOString(),
    };
    setSelectedOrg(newOrg);
    if (onSelectOrg) onSelectOrg(newOrg);
    setNewOrgName('');
    setShowCreateModal(false);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all text-left w-full md:w-60 shadow-sm"
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-glow">
          {selectedOrg.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Organization</p>
          <p className="text-sm font-bold text-slate-100 truncate">{selectedOrg.name}</p>
        </div>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-72 rounded-2xl glass-panel p-2 z-50 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase border-b border-slate-800">
            Switch Workspace
          </div>
          <div className="py-1 space-y-1 max-h-60 overflow-y-auto">
            {organizations.map((org) => {
              const isSelected = org.id === selectedOrg.id;
              return (
                <button
                  key={org.id}
                  onClick={() => handleSelect(org)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-sm transition-all ${
                    isSelected
                      ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <div className="truncate">
                      <p className="font-semibold truncate">{org.name}</p>
                      <p className="text-xs text-slate-400">{org.memberCount} members</p>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-indigo-400 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-indigo-400 hover:bg-indigo-500/10 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Create Organization
            </button>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-2xl max-w-md w-full border border-slate-800 shadow-2xl animate-in zoom-in-95 duration-150">
            <h3 className="text-lg font-bold text-white mb-2">Create Organization</h3>
            <p className="text-sm text-slate-400 mb-4">Set up a new isolated workspace for your team.</p>
            <form onSubmit={handleCreate}>
              <input
                type="text"
                value={newOrgName}
                onChange={(e) => setNewOrgName(e.target.value)}
                placeholder="e.g. Acme Corp Devs"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 mb-4 text-sm"
                autoFocus
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-glow transition-colors"
                >
                  Create Workspace
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
