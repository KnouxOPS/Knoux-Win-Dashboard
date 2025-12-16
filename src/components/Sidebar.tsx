import React from 'react';
import { Section } from '../types';
import { Layers, Shield, Activity, Zap, Box, Settings } from 'lucide-react';

interface SidebarProps {
  sections: Section[];
  activeSectionId: string;
  onSelectSection: (id: string) => void;
  onOpenSettings: () => void;
}

const getSectionIcon = (id: string) => {
  switch (id) {
    case 'deep_cleaning': return <Layers size={20} />;
    case 'repair_restore': return <Activity size={20} />;
    case 'system_check': return <Shield size={20} />;
    case 'optimization': return <Zap size={20} />;
    case 'advanced_control': return <Settings size={20} />;
    default: return <Box size={20} />;
  }
};

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeSectionId, onSelectSection, onOpenSettings }) => {
  return (
    <div className="w-64 bg-knx-surface flex flex-col h-full shrink-0 border-r border-white/5 z-20 shadow-2xl">
      {/* Branding Area */}
      <div className="h-20 flex flex-col justify-center px-6 border-b border-white/5 bg-knx-bg/30 backdrop-blur-sm">
        <div className="text-knx-cyan text-[10px] uppercase tracking-[0.3em] font-bold mb-1 opacity-90 drop-shadow-[0_0_5px_rgba(0,209,255,0.5)]">Knoux Sec</div>
        <div className="text-2xl font-light tracking-tight text-white flex items-center gap-1">
          Win<span className="font-bold text-knx-purple drop-shadow-[0_0_8px_rgba(124,58,237,0.6)]">Hub</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-2">
        {sections.map((section) => {
          const isActive = section.id === activeSectionId;
          return (
            <button
              key={section.id}
              onClick={() => onSelectSection(section.id)}
              className={`relative group flex items-center gap-4 px-6 py-4 w-full transition-all duration-300 text-sm font-semibold
                ${isActive 
                  ? 'text-white' 
                  : 'text-knx-muted hover:text-gray-200 hover:bg-white/[0.03]'
                }`}
            >
              {/* Active Indicator & Glow */}
              {isActive && (
                <>
                  <div 
                    className="absolute right-0 top-0 bottom-0 w-1 shadow-[0_0_15px_currentColor]" 
                    style={{ backgroundColor: section.color, color: section.color }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-white/[0.02] to-transparent pointer-events-none" />
                </>
              )}
              
              <span 
                className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_currentColor]' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'}`}
                style={{ color: isActive ? section.color : section.color }}
              >
                {getSectionIcon(section.id)}
              </span>
              
              <span className="tracking-wide">{section.name}</span>
            </button>
          );
        })}

        {/* Spacer */}
        <div className="mt-8 px-6 text-[10px] text-gray-600 font-bold uppercase tracking-widest mb-2 opacity-60">
          System Tools
        </div>
        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-4 px-6 py-3 text-sm text-knx-muted hover:text-white hover:bg-white/[0.03] transition-colors group"
        >
          <Settings size={18} className="opacity-70 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500" />
          <span>Configuration</span>
        </button>
      </div>
      
      {/* Bottom info area */}
      <div className="p-6 text-xs text-gray-600 border-t border-white/5 font-mono">
        v2.0.0 <span className="text-knx-success">● Protected</span>
      </div>
    </div>
  );
};