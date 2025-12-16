import React, { RefObject } from 'react';
import { Terminal, Trash2, List, Save, Download, XCircle } from 'lucide-react';

interface LogPanelProps {
  logs: string;
  logEndRef: RefObject<HTMLDivElement>;
  onClear: () => void;
}

export const LogPanel: React.FC<LogPanelProps> = ({ logs, logEndRef, onClear }) => {
  const handleSave = () => {
    const blob = new Blob([logs], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `knoux_log_${new Date().toISOString().slice(0,10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Simple heuristic for progress: if logs are changing, we are active.
  // In a real app, this would be passed as a prop.
  const hasLogs = logs.length > 50; 

  return (
    <div className="w-[360px] bg-bg-panel border-r border-white/[0.05] flex flex-col shrink-0 overflow-hidden shadow-2xl z-10 rounded-l-xl my-6 ml-0 mr-4">
      
      {/* Header */}
      <div className="h-14 px-4 flex items-center justify-between border-b border-white/[0.05] bg-[#15171c]">
        <div className="flex items-center gap-3 text-text-main">
          <div className="bg-accent-blue/10 p-1.5 rounded-lg text-accent-blue">
             <Terminal size={16} />
          </div>
          <span className="font-semibold text-sm">Console Output</span>
        </div>
        <div className="flex gap-1">
            <button 
            onClick={handleSave} 
            className="p-1.5 hover:bg-white/5 rounded-md text-text-sub hover:text-white transition-colors"
            title="حفظ السجل"
            >
            <Save size={16} />
            </button>
            <button 
            onClick={onClear} 
            className="p-1.5 hover:bg-white/5 rounded-md text-text-sub hover:text-red-400 transition-colors"
            title="مسح"
            >
            <Trash2 size={16} />
            </button>
        </div>
      </div>
      
      {/* Console Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-[11px] custom-scrollbar bg-[#0f1115] relative group">
        <div className="text-text-sub/90 whitespace-pre-wrap break-all leading-relaxed dir-ltr">
          {logs || <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-30 gap-2 select-none">
             <Terminal size={32} />
             <span>انتظار الأوامر...</span>
          </div>}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* Footer / Mock Progress */}
      <div className="p-4 border-t border-white/[0.05] bg-bg-panel">
         {/* Mock Progress Bar that animates when there is content */}
         <div className="flex justify-between text-[10px] text-text-muted mb-2">
            <span>Status</span>
            <span>{hasLogs ? 'Processing' : 'Idle'}</span>
         </div>
         <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden">
             {hasLogs && <div className="h-full bg-accent-blue w-2/3 animate-pulse rounded-full shadow-[0_0_10px_rgba(0,168,255,0.5)]"></div>}
         </div>
         
         <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-1.5 rounded text-xs font-medium transition-colors">
                إيقاف إجباري
            </button>
         </div>
      </div>
    </div>
  );
};