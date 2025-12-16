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
    <div className="w-64 bg-bg-panel flex flex-col h-full shrink-0 border-r border-white/[0.05] z-20 shadow-xl">
      <div className="h-20 flex flex-col justify-center px-6 border-b border-white/[0.05] bg-bg-panel/50 backdrop-blur-sm">
        <div className="text-accent-blue text-[10px] uppercase tracking-[0.2em] font-bold mb-1 opacity-80">Knoux System</div>
        <div className="text-2xl font-light tracking-tight text-white flex items-center gap-1">
          Win<span className="font-bold text-accent-blue">Dashboard</span>
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
                  ? 'bg-gradient-to-l from-white/[0.03] to-transparent text-white' 
                  : 'text-text-sub hover:text-white hover:bg-white/[0.02]'
                }`}
            >
              {isActive && (
                <div 
                  className="absolute right-0 top-0 bottom-0 w-1 shadow-[0_0_15px_currentColor]" 
                  style={{ backgroundColor: section.color, color: section.color }} 
                />
              )}
              
              <span 
                className={`transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-md' : 'opacity-70 group-hover:opacity-100 group-hover:scale-105'}`}
                style={{ color: isActive ? section.color : section.color }}
              >
                {getSectionIcon(section.id)}
              </span>
              
              <span className="tracking-wide">{section.name}</span>
            </button>
          );
        })}

        <div className="mt-8 px-6 text-xs text-text-muted font-bold uppercase tracking-wider mb-2 opacity-50">
          General Tools
        </div>
        <button 
          onClick={onOpenSettings}
          className="flex items-center gap-4 px-6 py-3 text-sm text-text-sub hover:text-white hover:bg-white/[0.02] transition-colors"
        >
          <Settings size={18} className="opacity-70" />
          <span>Global Settings</span>
        </button>
      </div>
      
      <div className="p-6 text-xs text-text-muted border-t border-white/[0.05]">
        v1.0.5 Stable
      </div>
    </div>
  );
};