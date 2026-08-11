'use client';

import React, { useState } from 'react';
import { Search, Bell, Menu, Shield, X } from 'lucide-react';
import { OrganizationSwitcher } from './OrganizationSwitcher';
import { NotificationPanel } from './NotificationPanel';
import { useSidebar } from '@/context/SidebarContext';

export function Topbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { isMobileOpen, toggleMobile } = useSidebar();

  return (
    <>
      <header className="h-16 glass-panel border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
        {/* Left: Organization Switcher & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={toggleMobile}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none transition-colors"
            aria-label="Toggle navigation sidebar"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <OrganizationSwitcher />

          <div className="relative max-w-md w-full hidden lg:block">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects, tasks, members, or documents (Ctrl + K)..."
              className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
            <Shield className="w-3.5 h-3.5" />
            <span>Multi-Tenant Active</span>
          </div>

          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-indigo-500/50 relative transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-indigo-500 absolute top-1.5 right-1.5 ring-2 ring-slate-900" />
          </button>
        </div>
      </header>

      <NotificationPanel isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
    </>
  );
}
