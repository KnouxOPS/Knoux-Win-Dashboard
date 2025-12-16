import React from 'react';
import { ShieldAlert, Check, X } from 'lucide-react';
import { Script } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  script: Script | null;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, script, onConfirm, onCancel }) => {
  if (!isOpen || !script) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-bg-panel border border-white/10 rounded-xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-gradient-to-r from-bg-panel to-bg-card p-6 border-b border-white/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500 shrink-0">
              <ShieldAlert size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Privilege Elevation Required</h3>
              <p className="text-sm text-text-sub">Windows User Account Control (UAC)</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-text-main mb-4">
            The script <span className="font-mono text-accent-blue bg-accent-blue/10 px-1 rounded">{script.name}</span> requires Administrative privileges to execute effectively.
          </p>
          <p className="text-sm text-text-muted mb-6">
            A Windows security prompt will appear. Please click "Yes" to allow Knoux Win to make changes to your system.
          </p>

          <div className="flex gap-3 justify-end">
            <button 
              onClick={onCancel}
              className="px-4 py-2 rounded-lg border border-white/10 text-text-sub hover:bg-white/5 hover:text-white transition-colors text-sm font-medium flex items-center gap-2"
            >
              <X size={16} /> Cancel
            </button>
            <button 
              onClick={onConfirm}
              className="px-4 py-2 rounded-lg bg-accent-blue hover:bg-accent-dark text-white shadow-glow transition-all text-sm font-bold flex items-center gap-2"
            >
              <Check size={16} /> Confirm & Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};