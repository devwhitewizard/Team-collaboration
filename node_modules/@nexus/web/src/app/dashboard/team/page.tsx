'use client';

import React, { useState, useEffect } from 'react';
import { MemberCard } from '@/components/MemberCard';
import { StatusBadge } from '@/components/StatusBadge';
import { RankBadge } from '@/components/RankBadge';
import { OrganizationMember } from '@nexus/types';
import { fetchMembers } from '@/lib/api';
import { Users, UserPlus, Search } from 'lucide-react';

export default function TeamPage() {
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMembers().then(setMembers);
  }, []);

  const filteredMembers = members.filter(
    (m) =>
      m.user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      m.orgRole.toLowerCase().includes(search.toLowerCase()) ||
      m.stage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            Team Directory & Stage Progression
          </h1>
          <p className="text-xs text-slate-400">Manage organization members, contract stages, ranks, and performance scores.</p>
        </div>

        <button className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-glow transition-all flex items-center gap-2 self-start">
          <UserPlus className="w-4 h-4" />
          <span>Invite Member</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md w-full">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter team by name, role, or stage..."
          className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Grid of Member Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((mem) => (
          <MemberCard key={mem.id} member={mem} />
        ))}
      </div>
    </div>
  );
}
