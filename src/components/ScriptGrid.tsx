import React from 'react';
import { Script, ScriptStatus, AppSettings } from '../types';
import { ScriptCard } from './ScriptCard';
import { CyberCard } from './CyberCard';

interface ScriptGridProps {
  scripts: Script[];
  onRun: (s: Script) => void;
  statuses: Record<string, ScriptStatus>;
  settings: AppSettings;
}

export const ScriptGrid: React.FC<ScriptGridProps> = ({ scripts, onRun, statuses, settings }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-text-sub mb-4">Available Tasks</h3>
      <div 
        className="grid gap-4 pb-8"
        style={{ gridTemplateColumns: `repeat(${settings.gridColumns}, minmax(0, 1fr))` }}
      >
        {scripts.map((script) => {
           const status = statuses?.[script.script] || 'idle';
           if (settings.cardStyle === 'cyberpunk' || settings.cardStyle === 'neon') {
             return (
               <CyberCard 
                  key={script.script}
                  script={script}
                  status={status}
                  onExecute={onRun}
                  settings={settings}
               />
             );
           }
           return (
            <ScriptCard 
              key={script.script} 
              script={script} 
              status={status}
              onRun={onRun} 
              disabled={false} 
            />
          );
        })}
      </div>
    </div>
  );
};