'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FolderKanban,
  CheckSquare,
  Flag,
  FileText,
  Users,
  Trophy,
  Code2,
  FolderDown,
  MessageSquare,
  FileCheck2,
  TrendingUp,
  Settings,
  LogOut,
  Zap,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';
import { useSidebar } from '@/context/SidebarContext';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban, badge: '8' },
  { label: 'Tasks', href: '/dashboard/tasks', icon: CheckSquare },
  { label: 'Milestones', href: '/dashboard/milestones', icon: Flag },
  { label: 'Weekly Updates', href: '/dashboard/updates', icon: FileText, badge: 'New' },
  { label: 'Team', href: '/dashboard/team', icon: Users },
  { label: 'Rankings', href: '/dashboard/rankings', icon: Trophy },
  { label: 'Coding Challenges', href: '/dashboard/challenges', icon: Code2 },
  { label: 'Documents', href: '/dashboard/documents', icon: FolderDown },
  { label: 'Communication', href: '/dashboard/communication', icon: MessageSquare, badge: '3' },
  { label: 'Contracts', href: '/dashboard/contracts', icon: FileCheck2 },
  { label: 'Performance', href: '/dashboard/performance', icon: TrendingUp },
  { label: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isMobileOpen, closeMobile, isCollapsed, toggleCollapsed } = useSidebar();

  const renderNavLinks = (isCompact = false) => (
    <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto custom-scrollbar">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMobile}
            title={isCompact ? item.label : undefined}
            className={`flex items-center ${
              isCompact ? 'justify-center px-2' : 'justify-between px-3'
            } py-2.5 rounded-xl text-sm font-medium transition-all group relative ${
              isActive
                ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-glow'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-100'}`} />
              {!isCompact && <span className="truncate">{item.label}</span>}
            </div>

            {!isCompact && item.badge && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold flex-shrink-0 ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-indigo-400 border border-slate-700'
                }`}
              >
                {item.badge}
              </span>
            )}

            {/* Compact Tooltip on Hover */}
            {isCompact && (
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-slate-900 text-slate-100 text-xs font-semibold rounded-lg shadow-xl border border-slate-800 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap flex items-center gap-2">
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    {item.badge}
                  </span>
                )}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Panel */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 max-w-[80vw] glass-panel bg-slate-950/95 border-r border-slate-800 flex flex-col h-full transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Mobile Header */}
        <div className="p-5 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-glow text-white font-extrabold text-base">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h1 className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5">
                NEXUS <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">HUB</span>
              </h1>
              <p className="text-xs text-slate-400">Team Platform</p>
            </div>
          </div>
          <button
            onClick={closeMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Navigation */}
        {renderNavLinks(false)}

        {/* Mobile User Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Alex Rivera"
                  className="w-9 h-9 rounded-full object-cover border border-indigo-500/40"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-slate-900" />
              </div>
              <div className="truncate">
                <p className="text-xs font-bold text-white truncate">Alex Rivera</p>
                <p className="text-[11px] text-slate-400 truncate">Core Team</p>
              </div>
            </div>
            <Link
              href="/login"
              onClick={closeMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Log Out"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Desktop Sticky Sidebar */}
      <aside
        className={`glass-panel border-r border-slate-800/80 hidden md:flex flex-col h-screen sticky top-0 z-40 shrink-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-glow text-white font-extrabold text-lg flex-shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <h1 className="font-extrabold text-white text-base tracking-wide flex items-center gap-1.5 truncate">
                  NEXUS <span className="text-xs px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">HUB</span>
                </h1>
                <p className="text-xs text-slate-400 truncate">Team Platform</p>
              </div>
            )}
          </div>

          {/* Desktop Collapse Toggle Button */}
          <button
            onClick={toggleCollapsed}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors hidden md:flex items-center justify-center"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        {renderNavLinks(isCollapsed)}

        {/* User Footer Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/40">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative flex-shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Alex Rivera"
                  className="w-9 h-9 rounded-full object-cover border border-indigo-500/40"
                />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute bottom-0 right-0 ring-2 ring-slate-900" />
              </div>
              {!isCollapsed && (
                <div className="truncate">
                  <p className="text-xs font-bold text-white truncate">Alex Rivera</p>
                  <p className="text-[11px] text-slate-400 truncate">Core Team</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <Link
                href="/login"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors flex-shrink-0"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
