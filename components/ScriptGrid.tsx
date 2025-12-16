import React from 'react';
import { Script, ScriptStatus } from '../types';
import { ScriptCard } from './ScriptCard';

interface ScriptGridProps {
  scripts: Script[];
  onRun: (s: Script) => void;
  statuses: Record<string, ScriptStatus>;
}

export const ScriptGrid: React.FC<ScriptGridProps> = ({ scripts, onRun, statuses }) => {
  return (
    <div>
      <h3 className="text-sm font-medium text-text-sub mb-4">Available Tasks</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 pb-8">
        {scripts.map((script) => (
          <ScriptCard 
            key={script.script} 
            script={script} 
            status={statuses?.[script.script] || 'idle'}
            onRun={onRun} 
            disabled={false} // Managed by status
          />
        ))}
      </div>
    </div>
  );
};