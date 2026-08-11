'use client';

import React from 'react';
import { Bell, X, Info, CheckCircle2, AlertTriangle } from 'lucide-react';
import { MOCK_NOTIFICATIONS } from '@/lib/mock-data';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-80 glass-panel border-l border-slate-800 z-50 p-4 shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white text-sm">Notifications</h3>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 py-3 space-y-2 overflow-y-auto">
        {MOCK_NOTIFICATIONS.map((n) => (
          <div
            key={n.id}
            className={`p-3 rounded-xl border transition-all ${
              n.read ? 'bg-slate-900/40 border-slate-800/80 text-slate-400' : 'bg-indigo-950/20 border-indigo-500/30 text-white'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {n.type === 'info' && <Info className="w-4 h-4 text-cyan-400 mt-0.5" />}
              {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />}
              {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5" />}
              <div className="flex-1">
                <p className="text-xs font-bold">{n.title}</p>
                <p className="text-xs text-slate-300 mt-0.5">{n.message}</p>
                <span className="text-[10px] text-slate-500 mt-1 block">{n.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
