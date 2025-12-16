const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  runScript: (scriptPath) => ipcRenderer.invoke('run-script', scriptPath),
  loadConfig: () => ipcRenderer.invoke('load-config'),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  onScriptOutput: (callback) => {
    const subscription = (_, data) => callback(data);
    ipcRenderer.on('script-output', subscription);
    // Return cleanup function to remove listener
    return () => ipcRenderer.removeListener('script-output', subscription);
  }
});