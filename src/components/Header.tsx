import React from 'react';
import { Search, Play, Monitor, Minus, Maximize2, X, Loader2, Settings } from 'lucide-react';

interface HeaderProps {
  isBatchRunning: boolean;
  onRunAll: () => void;
  filterText: string;
  setFilterText: (t: string) => void;
  totalScripts: number;
  completedCount: number;
  queueLength: number;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isBatchRunning, 
  onRunAll, 
  filterText, 
  setFilterText,
  totalScripts,
  completedCount,
  queueLength,
  onOpenSettings
}) => {
  const progress = isBatchRunning && totalScripts > 0 
    ? Math.round((completedCount / (completedCount + queueLength + 1)) * 100) 
    : 0;
  
  return (
    <div className="h-16 flex items-center justify-between px-6 shrink-0 relative overflow-hidden bg-knx-surface/50 border-b border-white/5 backdrop-blur-md">
      {/* Progress Bar Overlay */}
      {isBatchRunning && (
        <div className="absolute bottom-0 left-0 h-[2px] bg-knx-purple/20 w-full">
           <div 
             className="h-full bg-gradient-to-r from-knx-purple to-knx-cyan transition-all duration-300 shadow-[0_0_15px_#00d1ff]" 
             style={{ width: `${Math.max(5, progress)}%` }} 
           />
        </div>
      )}

      <div className="flex items-center gap-4 text-knx-muted text-sm font-mono">
         {isBatchRunning && (
            <span className="flex items-center gap-2 text-knx-cyan animate-pulse">
                <Loader2 size={14} className="animate-spin" />
                QUEUE: {queueLength} PENDING
            </span>
         )}
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative group">
          <input 
            placeholder="Search modules..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="pl-10 pr-4 py-1.5 w-64 rounded-lg bg-knx-bg border border-white/10 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-knx-purple/50 focus:ring-1 focus:ring-knx-purple/50 transition-all font-mono"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-knx-purple transition-colors" />
        </div>
        
        <button 
          onClick={onRunAll}
          disabled={isBatchRunning}
          className={`flex items-center gap-2 px-5 py-1.5 rounded-lg text-sm font-bold tracking-wide transition-all shadow-lg border border-transparent ${
            isBatchRunning 
              ? 'bg-knx-bg text-gray-600 cursor-not-allowed border-white/5' 
              : 'bg-gradient-to-r from-knx-purple to-violet-700 text-white hover:shadow-[0_0_15px_rgba(124,58,237,0.4)] hover:border-white/10'
          }`}
        >
          {isBatchRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
          <span>{isBatchRunning ? 'EXECUTING...' : 'RUN ALL'}</span>
        </button>

        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg text-knx-muted hover:text-white hover:bg-white/5 transition-colors"
          title="Settings"
        >
          <Settings size={20} />
        </button>

        <div className="flex items-center gap-3 ml-2 text-gray-500 border-l border-white/10 pl-4">
            <div className="flex gap-3">
                <Minus size={16} className="hover:text-white cursor-pointer transition-colors" />
                <Maximize2 size={14} className="hover:text-white cursor-pointer transition-colors" />
                <X size={16} className="hover:text-knx-error hover:drop-shadow-[0_0_5px_rgba(255,56,96,0.8)] cursor-pointer transition-all" />
            </div>
        </div>
      </div>
    </div>
  );
};