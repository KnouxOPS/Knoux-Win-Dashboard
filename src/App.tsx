import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

// Imports
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import ScriptsGrid from './components/ScriptGrid';
import TerminalPanel from './components/LogPanel';
import { CONFIG } from './constants'; // Fallback config

// 1. Cyberpunk Global Styles
const GlobalStyle = createGlobalStyle`
  :root {
    /* Base Colors */
    --knx-bg: #0b0f14;
    --knx-surface: #0f1720;
    --knx-border: #1e293b;
    
    /* Neon Accents */
    --knx-purple: #7c3aed;
    --knx-purple-dim: rgba(124, 58, 237, 0.14);
    --knx-cyan: #00d1ff;
    --knx-cyan-dim: rgba(0, 209, 255, 0.14);
    
    /* States */
    --knx-success: #22c55e;
    --knx-error: #ff3860;
    --knx-muted: #9aa4b2;
    --knx-text-main: #f8fafc;
    
    /* Performance Glows */
    --knx-glow-idle: drop-shadow(0 0 8px var(--knx-purple-dim));
    --knx-glow-running: drop-shadow(0 0 15px rgba(0, 209, 255, 0.4));
    --knx-glow-success: drop-shadow(0 0 10px rgba(34, 197, 94, 0.4));
    --knx-glow-error: drop-shadow(0 0 10px rgba(255, 56, 96, 0.4));
  }

  @keyframes knx-pulse {
    0% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(0, 209, 255, 0.2)); }
    50% { transform: scale(1.05); filter: drop-shadow(0 0 20px rgba(0, 209, 255, 0.6)); }
    100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(0, 209, 255, 0.2)); }
  }

  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Inter', 'Segoe UI', sans-serif;
    background-color: var(--knx-bg);
    color: var(--knx-text-main);
    overflow: hidden;
  }
  
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--knx-bg); }
  ::-webkit-scrollbar-thumb { 
    background: #334155; 
    border-radius: 3px;
    border: 1px solid var(--knx-bg);
  }
  ::-webkit-scrollbar-thumb:hover { background: var(--knx-purple); }
`;

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: var(--knx-bg);
  background-image: 
    radial-gradient(circle at 10% 10%, rgba(124, 58, 237, 0.05) 0%, transparent 40%),
    radial-gradient(circle at 90% 90%, rgba(0, 209, 255, 0.05) 0%, transparent 40%);
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
`;

const ContentScrollArea = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  padding-bottom: 240px; /* Space for the bottom log panel */
`;

interface LogMessage {
  time: string;
  text: string;
  type?: 'info' | 'error' | 'success';
}

export default function App() {
  const [config, setConfig] = useState<any>(CONFIG); 
  const [activeSectionId, setActiveSectionId] = useState('deep_cleaning'); 
  const [systemInfo, setSystemInfo] = useState<any>(null);
  const [logs, setLogs] = useState<LogMessage[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [runningScriptPath, setRunningScriptPath] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
        if (window.electronAPI) {
            try {
                const loadedConfig = await window.electronAPI.loadConfig();
                setConfig(loadedConfig);
                const info = await window.electronAPI.getSystemInfo();
                setSystemInfo(info);
            } catch (e) { console.error(e); }
        } else {
            // Mock System Info for browser preview
            setSystemInfo({ freeMem: '32 GB', totalMem: '64 GB', platform: 'Web Simulation' });
        }
    };
    initializeApp();

    let cleanup = () => {};
    if (window.electronAPI) {
        cleanup = window.electronAPI.onScriptOutput((msg: string) => {
            setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: msg, type: 'info' }]);
            
            // Basic detection of script end
            if (msg.includes('Process Completed') || msg.includes('Exit Code')) {
                setIsRunning(false);
                setRunningScriptPath(null);
            }
        });
    }

    return () => cleanup();
  }, []);

  const handleRunScript = async (scriptPath: string, scriptName: string) => {
    if (isRunning) return;
    
    setIsRunning(true);
    setRunningScriptPath(scriptPath);
    setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: `>> Executing: ${scriptName}...`, type: 'success' }]);

    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.runScript(scriptPath);
        if (result !== 'success') {
             // Handle synchronous errors (if API returns immediately)
             // Usually logs handle the output stream
        }
      } else {
        // Mock execution for browser
        setTimeout(() => {
           setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: `[MOCK] ${scriptName} finished successfully.`, type: 'success' }]);
           setIsRunning(false);
           setRunningScriptPath(null);
        }, 2000);
      }
    } catch (error: any) {
      setLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text: `[ERROR] ${error.message || error}`, type: 'error' }]);
      setIsRunning(false);
      setRunningScriptPath(null);
    }
  };
  
  const handleClearLogs = () => setLogs([]);
  const activeSectionData = config?.sections?.find((s: any) => s.id === activeSectionId) || config?.sections?.[0];

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Sidebar 
          sections={config?.sections || []} 
          activeId={activeSectionId} 
          onSelect={setActiveSectionId} 
        />
        <MainContent>
          <ContentScrollArea>
            <HeroSection systemInfo={systemInfo} />
            {activeSectionData && (
              <ScriptsGrid 
                section={activeSectionData} 
                onRun={handleRunScript}
                isRunning={isRunning}
                currentRunningScript={runningScriptPath} 
              />
            )}
          </ContentScrollArea>
          <TerminalPanel logs={logs} isRunning={isRunning} onClear={handleClearLogs} />
        </MainContent>
      </AppContainer>
    </>
  );
}