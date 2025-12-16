import React from 'react';
import { Play, Terminal, Shield, Cpu, HardDrive, Trash2, Wifi, Loader2, Square, Check, AlertTriangle, Cloud, Package, FileText, Monitor } from 'lucide-react';
import { Script, ScriptStatus } from '../types';

const getIcon = (name: string, iconName?: string) => {
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

  // Determine Icon Visual State
  let iconContainerClass = "text-knx-purple border-knx-purple/30 bg-knx-purple/5 knx-glow-idle";
  if (isRunning) {
    iconContainerClass = "text-knx-cyan border-knx-cyan/50 bg-knx-cyan/10 knx-running";
  } else if (isSuccess) {
    iconContainerClass = "text-knx-success border-knx-success/50 bg-knx-success/10 knx-glow-success";
  } else if (isError) {
    iconContainerClass = "text-knx-error border-knx-error/50 bg-knx-error/10 knx-glow-error knx-error-anim";
  }

  return (
    <div 
      onClick={handleClick}
      className={`
        group relative flex flex-col h-[160px] cursor-pointer select-none overflow-hidden rounded-xl
        border transition-all duration-300
        knx-glass-card
        ${isRunning ? 'border-knx-cyan/60 shadow-neon' : 
          isSuccess ? 'border-knx-success/40' : 
          isError ? 'border-knx-error/40' : 
          'border-white/5 hover:border-knx-purple/50 hover:shadow-glow hover:-translate-y-1'}
      `}
    >
      {/* Background Gradient Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-knx-bg/50 pointer-events-none" />
      
      {/* Status Overlay for Queue */}
      {isQueued && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center">
          <div className="bg-knx-surface px-3 py-1 rounded-full border border-yellow-500/30 text-xs text-yellow-400 font-mono flex items-center gap-2 shadow-lg">
            <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
            Queued...
          </div>
        </div>
      )}

      {/* Admin Badge */}
      {script.admin && (
        <div className="absolute top-3 left-3 z-10 opacity-70 group-hover:opacity-100 transition-opacity" title="تشغيل كمسؤول">
           <div className="bg-knx-error/10 p-1 rounded border border-knx-error/30 text-knx-error">
             <Shield size={10} strokeWidth={3} />
           </div>
        </div>
      )}

      {/* Main Content */}
      <div className="p-5 flex flex-col items-center text-center h-full relative z-10">
        
        {/* Animated Icon Container */}
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center mb-4 border
          transition-all duration-300
          ${iconContainerClass}
        `}>
          {isRunning ? <Loader2 size={24} className="animate-spin" /> : 
           isSuccess ? <Check size={24} strokeWidth={3} /> : 
           isError ? <AlertTriangle size={24} /> :
           getIcon(script.name, script.icon)}
        </div>
        
        {/* Text Info */}
        <div className="flex flex-col gap-1 w-full">
            <h3 className="font-bold text-gray-200 text-sm leading-tight group-hover:text-white transition-colors line-clamp-1 tracking-wide">
              {script.name}
            </h3>
            
            <p className="text-[11px] text-knx-muted leading-snug line-clamp-2 h-8 px-1 font-light">
              {script.description || script.script}
            </p>
        </div>

        {/* Hover Action Hint */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className={`
              text-[10px] font-mono px-3 py-0.5 rounded-full border backdrop-blur-md
              ${isRunning 
                ? 'text-knx-cyan border-knx-cyan/30 bg-knx-cyan/10' 
                : 'text-knx-purple border-knx-purple/30 bg-knx-purple/10'}
            `}>
                {isRunning ? 'إيقاف' : 'EXECUTE'}
            </span>
        </div>
      </div>
    </div>
  );
};