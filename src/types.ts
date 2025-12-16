export interface Script {
  name: string;
  script: string;
  admin: boolean;
  description?: string;
  icon?: string;
}

export type ScriptStatus = 'idle' | 'queued' | 'running' | 'success' | 'error';

export interface Section {
  id: string;
  name: string;
  color: string;
  scripts: Script[];
}

export interface Config {
  app: {
    name: string;
    theme: string;
    scriptsPath: string;
  };
  sections: Section[];
}

export interface AppSettings {
  theme: 'dark' | 'light' | 'cyberpunk';
  visualEffects: boolean;
  cyberGlow: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast';
  parallelExecution: boolean;
  maxConcurrent: number;
  cacheEnabled: boolean;
  confirmSensitive: boolean;
  activityLogging: boolean;
  killTimeout: number;
  gridColumns: number;
  cardStyle: 'cyberpunk' | 'neon' | 'glass' | 'minimal';
  accentColor: string;
}

export interface ElectronAPI {
  runScript: (scriptPath: string) => Promise<string>; // returns 'success', 'warning' or 'error'
  loadConfig: () => Promise<Config>;
  getSystemInfo: () => Promise<any>;
  onScriptOutput: (callback: (data: string) => void) => () => void; // Returns cleanup function
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}