import React from 'react';
import { Search, Play, Monitor, Minus, Maximize2, X, Loader2 } from 'lucide-react';

interface HeaderProps {
  isBatchRunning: boolean;
  onRunAll: () => void;
  filterText: string;
  setFilterText: (t: string) => void;
  totalScripts: number;
  completedCount: number;
  queueLength: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  isBatchRunning, 
  onRunAll, 
  filterText, 
  setFilterText,
  totalScripts,
  completedCount,
  queueLength
}) => {
  const progress = isBatchRunning && totalScripts > 0 
    ? Math.round((completedCount / (completedCount + queueLength + 1)) * 100) // Rough estimate or pass total batch size
    : 0;
    
  // If we assume onRunAll runs ALL scripts in view, max is totalScripts.
  // Ideally, pass `totalBatchSize` prop. For now, visual estimation.
  
  return (
    <div className="h-16 flex items-center justify-between px-6 shrink-0 relative overflow-hidden">
      {/* Progress Bar Overlay */}
      {isBatchRunning && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-accent-blue/30 w-full">
           <div 
             className="h-full bg-accent-blue transition-all duration-300 shadow-[0_0_10px_#00A8FF]" 
             style={{ width: `${Math.max(5, progress)}%` }} 
           />
        </div>
      )}

      <div className="flex items-center gap-4 text-text-muted text-sm">
         {isBatchRunning && (
            <span className="flex items-center gap-2 text-accent-blue animate-pulse">
                <Loader2 size={14} className="animate-spin" />
                Processing Queue: {queueLength} remaining
            </span>
         )}
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative group">
          <input 
            placeholder="Search scripts..." 
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="pl-10 pr-4 py-1.5 w-64 rounded bg-bg-card border border-white/5 text-sm text-text-main placeholder-text-muted focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all"
          />
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-sub" />
        </div>
        
        <button 
          onClick={onRunAll}
          disabled={isBatchRunning}
          className={`flex items-center gap-2 px-5 py-1.5 rounded text-sm font-medium transition-all shadow-lg ${
            isBatchRunning 
              ? 'bg-bg-card text-text-muted cursor-not-allowed' 
              : 'bg-accent-blue text-white hover:bg-accent-dark shadow-glow'
          }`}
        >
          {isBatchRunning ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
          <span>{isBatchRunning ? 'Running Batch...' : 'Execute All'}</span>
        </button>

        <div className="flex items-center gap-3 ml-4 text-text-sub border-l border-white/10 pl-4">
            <Monitor size={16} className="hover:text-white cursor-pointer" />
            <div className="flex gap-2">
                <Minus size={16} className="hover:text-white cursor-pointer" />
                <Maximize2 size={14} className="hover:text-white cursor-pointer" />
                <X size={16} className="hover:text-red-500 cursor-pointer" />
            </div>
        </div>
      </div>
    </div>
  );
};