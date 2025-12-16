import React from 'react';
import { CheckCircle2, AlertCircle, Activity, LayoutList } from 'lucide-react';

interface StatusBarProps {
  totalScripts: number;
  runningCount: number;
  queuedCount: number;
  lastAction: string;
}

export const StatusBar: React.FC<StatusBarProps> = ({ totalScripts, runningCount, queuedCount, lastAction }) => {
  return (
    <div className="h-8 bg-bg-panel border-t border-white/[0.05] flex items-center justify-between px-4 text-[10px] text-text-sub font-mono select-none z-30 shrink-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2" title="Total Available Scripts">
          <LayoutList size={12} className="text-accent-blue" />
          <span>SCRIPTS: {totalScripts}</span>
        </div>
        
        <div className="flex items-center gap-2">
           <Activity size={12} className={runningCount > 0 ? "text-green-400 animate-pulse" : "text-text-muted"} />
           <span className={runningCount > 0 ? "text-green-400" : ""}>
             ACTIVE: {runningCount} {queuedCount > 0 && `(+${queuedCount} QUEUED)`}
           </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {lastAction && (
          <div className="flex items-center gap-2 opacity-80">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-blue"></span>
            <span className="max-w-[300px] truncate">{lastAction}</span>
          </div>
        )}
        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span>SYSTEM: ONLINE</span>
        </div>
        <div className="text-text-muted">v1.0.5</div>
      </div>
    </div>
  );
};