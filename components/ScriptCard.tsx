import React from 'react';
import { Play, Terminal, Shield, Cpu, HardDrive, Trash2, Wifi, Loader2, Square, Check, AlertTriangle, Cloud, Package, FileText, Monitor } from 'lucide-react';
import { Script, ScriptStatus } from '../types';

const getIcon = (name: string, iconName?: string) => {
  // Use iconName from config if available for better mapping
  const target = (iconName || name).toLowerCase();
  
  if (target.includes('clean') || target.includes('trash') || target.includes('temp')) return <Trash2 size={24} />;
  if (target.includes('cpu') || target.includes('ram') || target.includes('memory')) return <Cpu size={24} />;
  if (target.includes('disk') || target.includes('ssd') || target.includes('drive')) return <HardDrive size={24} />;
  if (target.includes('net') || target.includes('wifi') || target.includes('dns') || target.includes('ip')) return <Wifi size={24} />;
  if (target.includes('repair') || target.includes('fix') || target.includes('sfc') || target.includes('dism') || target.includes('shield')) return <Shield size={24} />;
  if (target.includes('cloud') || target.includes('onedrive')) return <Cloud size={24} />;
  if (target.includes('package') || target.includes('install')) return <Package size={24} />;
  if (target.includes('file') || target.includes('log')) return <FileText size={24} />;
  if (target.includes('monitor') || target.includes('display')) return <Monitor size={24} />;
  
  return <Terminal size={24} />;
};

interface ScriptCardProps {
  script: Script;
  status: ScriptStatus;
  onRun: (s: Script) => void;
  onStop?: (s: Script) => void;
  disabled: boolean;
}

export const ScriptCard: React.FC<ScriptCardProps> = ({ script, status, onRun, onStop, disabled }) => {
  const isRunning = status === 'running';
  const isQueued = status === 'queued';
  const isSuccess = status === 'success';
  const isError = status === 'error';

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
        onRun(script);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className={`group flex flex-col bg-bg-card rounded-xl border shadow-soft overflow-hidden transition-all duration-300 relative cursor-pointer select-none h-[160px]
        ${isRunning ? 'border-accent-blue/50 ring-1 ring-accent-blue/20' : 
          isSuccess ? 'border-green-500/30' : 
          isError ? 'border-red-500/30' : 
          'border-white/[0.04] hover:bg-bg-lighter hover:-translate-y-1 hover:border-white/[0.08] hover:shadow-glow'}
      `}
    >
      {/* Status Overlay for Queue */}
      {isQueued && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px] z-20 flex items-center justify-center">
          <div className="bg-bg-panel px-3 py-1 rounded-full border border-yellow-500/30 text-xs text-yellow-400 font-mono flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            في الانتظار...
          </div>
        </div>
      )}

      {/* Admin Badge */}
      {script.admin && (
        <div className="absolute top-3 left-3 z-10" title="تشغيل كمسؤول">
           <div className="bg-red-500/10 p-1 rounded-md border border-red-500/20 text-red-400">
             <Shield size={12} strokeWidth={3} />
           </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-4 flex flex-col items-center text-center h-full relative z-0">
        
        {/* Animated Icon Container */}
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 shadow-lg
           ${isRunning ? 'bg-accent-blue/20 text-accent-blue scale-110' : 
             isSuccess ? 'bg-green-500/20 text-green-400' :
             isError ? 'bg-red-500/20 text-red-400' :
             'bg-gradient-to-br from-white/[0.05] to-white/[0.01] text-text-muted group-hover:scale-110 group-hover:bg-accent-blue/10 group-hover:text-accent-blue'}
        `}>
          {isRunning ? <Loader2 size={24} className="animate-spin" /> : 
           isSuccess ? <Check size={24} strokeWidth={3} /> : 
           isError ? <AlertTriangle size={24} /> :
           getIcon(script.name, script.icon)}
        </div>
        
        {/* Text Info */}
        <div className="flex flex-col gap-1 w-full">
            <h3 className="font-bold text-text-main text-sm leading-tight group-hover:text-white transition-colors line-clamp-1">
              {script.name}
            </h3>
            
            <p className="text-[11px] text-text-sub opacity-70 leading-snug line-clamp-2 h-8 px-1">
              {script.description || script.script}
            </p>
        </div>

        {/* Hover Action Hint (Desktop) */}
        <div className="mt-auto pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="text-[10px] font-mono text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded border border-accent-blue/20">
                {isRunning ? 'إيقاف' : 'تشغيل الآن'}
            </span>
        </div>
      </div>
    </div>
  );
};