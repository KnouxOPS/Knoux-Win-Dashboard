import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from './constants';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ScriptGrid } from './components/ScriptGrid';
import { LogPanel } from './components/LogPanel';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { StatusBar } from './components/StatusBar';
import { SettingsModal } from './components/SettingsModal';
import { NightModeProvider, useTheme } from './components/NightModeProvider';
import { Script, ScriptStatus } from './types';
import { simulateScriptExecution } from './services/mockScriptService';
import { Info, CheckCircle2, LayoutGrid, HardDrive, ShieldAlert } from 'lucide-react';
import './styles/cyberpunk.css';

const AppContent: React.FC = () => {
  // Use Settings from Context
  const { settings, updateSettings } = useTheme();
  
  // Navigation & Config
  const [activeSectionId, setActiveSectionId] = useState<string>(CONFIG.sections[0].id);
  const [filterText, setFilterText] = useState<string>('');
  
  // UI State
  const [showSettings, setShowSettings] = useState(false);

  // Execution State
  const [scriptStatuses, setScriptStatuses] = useState<Record<string, ScriptStatus>>({});
  const [queue, setQueue] = useState<Script[]>([]);
  const [activeExecutions, setActiveExecutions] = useState<Script[]>([]);
  const [logs, setLogs] = useState<string>('System initialized...\nWaiting for commands...\n');
  const [lastAction, setLastAction] = useState<string>('Ready');
  
  // UX State
  const [adminModalScript, setAdminModalScript] = useState<Script | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  
  const logEndRef = useRef<HTMLDivElement>(null);
  const activeSection = CONFIG.sections.find(s => s.id === activeSectionId) || CONFIG.sections[0];

  // --- Electron Integration ---
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (window.electronAPI) {
      cleanup = window.electronAPI.onScriptOutput((data: string) => {
        setLogs(prev => prev + data);
      });
    }

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // --- Filtering ---
  const getDisplayScripts = (): Script[] => {
    const term = filterText.trim().toLowerCase();
    if (!term) return activeSection.scripts;
    const allScripts = CONFIG.sections.flatMap(s => s.scripts);
    return allScripts.filter(s => 
      s.name.toLowerCase().includes(term) || 
      s.script.toLowerCase().includes(term)
    );
  };

  const displayScripts = getDisplayScripts();

  // --- Toast Helpers ---
  const addToast = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
  };
  const removeToast = (id: string) => setToasts(prev => prev.filter(t => t.id !== id));

  // --- Execution Logic ---
  const appendLog = (msg: string) => setLogs(prev => prev + msg);

  // Queue Processing Effect
  useEffect(() => {
    const limit = settings.parallelExecution ? settings.maxConcurrent : 1;
    if (queue.length === 0 || activeExecutions.length >= limit) return;

    // Take next script
    const nextScript = queue[0];
    const newQueue = queue.slice(1);
    const newActive = [...activeExecutions, nextScript];

    setQueue(newQueue);
    setActiveExecutions(newActive);
    
    // Start Execution
    runSingleScript(nextScript).then(() => {
        setActiveExecutions(prev => prev.filter(s => s.script !== nextScript.script));
    });

  }, [queue, activeExecutions, settings.parallelExecution, settings.maxConcurrent]);

  const runSingleScript = async (script: Script) => {
    setScriptStatuses(prev => ({ ...prev, [script.script]: 'running' }));
    setLastAction(`Running: ${script.name}`);
    
    const timestamp = new Date().toLocaleTimeString();
    appendLog(`\n--- [${timestamp}] START: ${script.name} ---\n`);

    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.runScript(script.script);
        
        if (result === 'success') {
          setScriptStatuses(prev => ({ ...prev, [script.script]: 'success' }));
          addToast('success', 'Execution Finished', `${script.name} completed successfully.`);
          setLastAction(`Completed: ${script.name}`);
        } else {
          setScriptStatuses(prev => ({ ...prev, [script.script]: 'error' }));
          addToast('error', 'Execution Warning', `${script.name} finished with warnings.`);
          setLastAction(`Warning: ${script.name}`);
        }
      } else {
        const stream = simulateScriptExecution(script, 300);
        for await (const chunk of stream) {
          appendLog(chunk);
        }
        setScriptStatuses(prev => ({ ...prev, [script.script]: 'success' }));
        addToast('success', 'Mock Finished', `${script.name} completed.`);
        setLastAction(`Completed: ${script.name}`);
      }
    } catch (e) {
      setScriptStatuses(prev => ({ ...prev, [script.script]: 'error' }));
      appendLog(`!! [ERR] ${script.name} failed: ${e}\n`);
      addToast('error', 'Execution Failed', `${script.name} encountered an error.`);
      setLastAction(`Failed: ${script.name}`);
    }
  };

  // --- User Actions ---
  const requestRunScript = (script: Script) => {
    if (scriptStatuses[script.script] === 'running' || scriptStatuses[script.script] === 'queued') return;
    
    if (script.admin && settings.confirmSensitive) {
      setAdminModalScript(script);
    } else {
      addToQueue(script);
    }
  };

  const confirmAdminRun = () => {
    if (adminModalScript) {
        addToQueue(adminModalScript);
        setAdminModalScript(null);
    }
  };

  const addToQueue = (script: Script) => {
    setScriptStatuses(prev => ({ ...prev, [script.script]: 'queued' }));
    setQueue(prev => [...prev, script]);
    setLastAction(`Queued: ${script.name}`);
  };

  const handleRunAll = () => {
    const scriptsToRun = displayScripts.filter(s => 
        scriptStatuses[s.script] !== 'running' && scriptStatuses[s.script] !== 'queued'
    );
    
    if (scriptsToRun.length === 0) {
        addToast('info', 'Nothing to Run', 'All visible scripts are already running or queued.');
        return;
    }

    addToast('info', 'Batch Started', `Queued ${scriptsToRun.length} scripts.`);
    scriptsToRun.forEach(s => {
        setScriptStatuses(prev => ({ ...prev, [s.script]: 'queued' }));
    });
    setQueue(prev => [...prev, ...scriptsToRun]);
  };

  const handleClearLogs = () => setLogs('');

  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // --- Statistics ---
  const StatCard = ({ icon: Icon, value, label, color }: any) => (
    <div className="bg-knx-surface rounded-xl p-4 flex flex-col items-center justify-center border border-white/5 shadow-soft min-h-[100px] relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className={`mb-3 ${color} drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]`}>
        <Icon size={32} />
      </div>
      <div className="flex gap-2 items-baseline relative z-10">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className="text-xs text-knx-muted leading-tight max-w-[80px] text-center font-mono">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-knx-bg text-text-main font-sans flex-col">
       <div className="flex flex-1 overflow-hidden">
        <Sidebar 
            sections={CONFIG.sections} 
            activeSectionId={activeSectionId} 
            onSelectSection={setActiveSectionId} 
            onOpenSettings={() => setShowSettings(true)}
        />
        
        <div className="flex-1 flex flex-col min-w-0 relative">
            <Header 
            isBatchRunning={activeExecutions.length > 0 || queue.length > 0} 
            onRunAll={handleRunAll}
            filterText={filterText}
            setFilterText={setFilterText}
            totalScripts={CONFIG.sections.reduce((acc, s) => acc + s.scripts.length, 0)}
            completedCount={0} 
            queueLength={queue.length}
            onOpenSettings={() => setShowSettings(true)}
            />
            
            <main className="flex flex-1 gap-6 p-6 overflow-hidden relative z-0 bg-knx-bg">
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2">
                
                {/* Status Banner */}
                <div 
                  className="mb-6 flex items-center bg-gradient-to-r from-knx-surface to-transparent p-6 rounded-xl border-l-4 shadow-lg border-opacity-50"
                  style={{ borderColor: activeSection.color }}
                >
                <div className="w-16 h-12 flex items-center justify-center border-2 rounded-lg mr-6 backdrop-blur-md bg-white/5" style={{ borderColor: activeSection.color, color: activeSection.color }}>
                    <Info size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-light text-white tracking-wide">Knoux Engine: <span className="font-bold drop-shadow-[0_0_5px_currentColor]" style={{ color: activeSection.color }}>ONLINE</span></h2>
                    <p className="text-knx-muted text-sm mt-1 font-mono">
                    {queue.length > 0 ? `${queue.length} tasks in queue, ${activeExecutions.length} executing...` : "System ready awaiting directives."}
                    </p>
                </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                  <StatCard icon={LayoutGrid} value={displayScripts.length} label="MODULES" color="text-knx-cyan" />
                  <StatCard icon={CheckCircle2} value={activeExecutions.length} label="THREADS" color="text-knx-purple" />
                  <StatCard icon={ShieldAlert} value={CONFIG.sections.flatMap(s=>s.scripts).filter(s=>s.admin).length} label="PRIVILEGED" color="text-knx-error" />
                  <StatCard icon={HardDrive} value="C:" label="SYSTEM" color="text-gray-400" />
                  <StatCard icon={Info} value="-" label="STATUS" color="text-knx-success" />
                </div>

                <ScriptGrid 
                scripts={displayScripts} 
                onRun={requestRunScript} 
                statuses={scriptStatuses}
                settings={settings}
                />
            </div>

            <LogPanel 
                logs={logs} 
                logEndRef={logEndRef} 
                onClear={handleClearLogs}
            />
            </main>

            {/* Overlays */}
            <ConfirmationModal 
                isOpen={!!adminModalScript} 
                script={adminModalScript} 
                onConfirm={confirmAdminRun} 
                onCancel={() => setAdminModalScript(null)} 
            />
            
            <SettingsModal 
              isOpen={showSettings}
              onClose={() => setShowSettings(false)}
              settings={settings}
              onSettingsChange={updateSettings}
            />
            
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </div>
      </div>
      
      {/* Bottom Status Bar */}
      <StatusBar 
        totalScripts={CONFIG.sections.reduce((a,b)=>a+b.scripts.length,0)}
        runningCount={activeExecutions.length}
        queuedCount={queue.length}
        lastAction={lastAction}
      />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <NightModeProvider>
      <AppContent />
    </NightModeProvider>
  );
};

export default App;