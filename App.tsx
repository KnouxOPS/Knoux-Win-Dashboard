import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CONFIG } from './constants';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { ScriptGrid } from './components/ScriptGrid';
import { LogPanel } from './components/LogPanel';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import { StatusBar } from './components/StatusBar';
import { Script, ScriptStatus } from './types';
import { simulateScriptExecution } from './services/mockScriptService';
import { Info, CheckCircle2, LayoutGrid, HardDrive, ShieldAlert } from 'lucide-react';

const CONCURRENCY_LIMIT = 3;

const App: React.FC = () => {
  // Navigation & Config
  const [activeSectionId, setActiveSectionId] = useState<string>(CONFIG.sections[0].id);
  const [filterText, setFilterText] = useState<string>('');
  
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
    if (queue.length === 0 || activeExecutions.length >= CONCURRENCY_LIMIT) return;

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

  }, [queue, activeExecutions]);

  const runSingleScript = async (script: Script) => {
    setScriptStatuses(prev => ({ ...prev, [script.script]: 'running' }));
    setLastAction(`Running: ${script.name}`);
    appendLog(`\n>> [START] ${script.name} (PID: ${Math.floor(Math.random()*9000)+1000})\n`);

    try {
      const stream = simulateScriptExecution(script, 500); // Simulate speed
      for await (const chunk of stream) {
        appendLog(chunk);
      }
      setScriptStatuses(prev => ({ ...prev, [script.script]: 'success' }));
      appendLog(`<< [DONE] ${script.name} completed.\n`);
      addToast('success', 'Execution Finished', `${script.name} completed successfully.`);
      setLastAction(`Completed: ${script.name}`);
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
    
    // Check Admin
    if (script.admin) {
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

  // Auto-scroll logs
  useEffect(() => {
    if (logEndRef.current) logEndRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // --- Statistics ---
  const StatCard = ({ icon: Icon, value, label, color }: any) => (
    <div className="bg-bg-card rounded-lg p-4 flex flex-col items-center justify-center border border-white/[0.02] shadow-soft min-h-[100px]">
      <div className={`mb-3 ${color}`}>
        <Icon size={32} />
      </div>
      <div className="flex gap-2 items-baseline">
        <span className="text-2xl font-bold text-accent-blue">{value}</span>
        <span className="text-xs text-text-sub leading-tight max-w-[80px] text-center">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-bg-main text-text-main font-sans flex-col">
       <div className="flex flex-1 overflow-hidden">
        <Sidebar 
            sections={CONFIG.sections} 
            activeSectionId={activeSectionId} 
            onSelectSection={setActiveSectionId} 
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
            />
            
            <main className="flex flex-1 gap-6 p-6 overflow-hidden relative z-0">
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto pr-2">
                
                {/* Status Banner */}
                <div 
                  className="mb-6 flex items-center bg-gradient-to-r from-bg-card to-[#1a202e] p-6 rounded-lg border-l-4 shadow-lg"
                  style={{ borderColor: activeSection.color }}
                >
                <div className="w-16 h-12 flex items-center justify-center border-2 rounded-lg mr-6" style={{ borderColor: activeSection.color, color: activeSection.color }}>
                    <Info size={24} />
                </div>
                <div>
                    <h2 className="text-xl font-light text-white">Knoux Engine: <span className="font-normal" style={{ color: activeSection.color }}>Online</span></h2>
                    <p className="text-text-sub text-sm mt-1">
                    {queue.length > 0 ? `${queue.length} scripts in queue, ${activeExecutions.length} running...` : "System ready for commands."}
                    </p>
                </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                <StatCard icon={LayoutGrid} value={displayScripts.length} label="visible scripts" color="text-accent-blue" />
                <StatCard icon={CheckCircle2} value={activeExecutions.length} label="active threads" color="text-orange-400" />
                <StatCard icon={ShieldAlert} value={CONFIG.sections.flatMap(s=>s.scripts).filter(s=>s.admin).length} label="admin tools" color="text-purple-400" />
                <StatCard icon={HardDrive} value="C:" label="system drive" color="text-blue-400" />
                <StatCard icon={Info} value="-" label="last status" color="text-cyan-400" />
                </div>

                <ScriptGrid 
                scripts={displayScripts} 
                onRun={requestRunScript} 
                statuses={scriptStatuses}
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

export default App;