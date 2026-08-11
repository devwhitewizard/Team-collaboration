'use client';

import React from 'react';

interface ProgressBarProps {
  progress: number; // 0 - 100
  showLabel?: boolean;
  colorClass?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressBar({
  progress,
  showLabel = true,
  colorClass = 'bg-gradient-to-r from-indigo-500 to-cyan-400',
  size = 'md',
}: ProgressBarProps) {
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-3' : 'h-2';

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-400 mb-1">
          <span>Progress</span>
          <span className="text-slate-200">{progress}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-800/80 rounded-full overflow-hidden ${heightClass}`}>
        <div
          className={`${heightClass} ${colorClass} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
}

export function ProjectProgress({ progress }: { progress: number }) {
  return <ProgressBar progress={progress} showLabel={true} />;
}
