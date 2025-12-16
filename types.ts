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