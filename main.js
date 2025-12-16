const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const fs = require('fs');

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: '#1a1a1a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'src/assets/logo.ico')
  });

  mainWindow.loadFile('public/index.html');
  
  // Open dev tools in development
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// Handle script execution
ipcMain.handle('run-script', async (event, scriptPath) => {
  return new Promise((resolve) => {
    const proc = spawn('powershell.exe', ['-ExecutionPolicy', 'Bypass', '-File', scriptPath], {
      cwd: __dirname
    });

    let output = '';

    proc.stdout.on('data', (data) => {
      output += data.toString();
      event.sender.send('script-output', data.toString());
    });

    proc.stderr.on('data', (data) => {
      output += `[ERROR] ${data.toString()}`;
      event.sender.send('script-error', data.toString());
    });

    proc.on('close', (code) => {
      resolve({ code, output });
    });
  });
});

// Load configuration
ipcMain.handle('load-config', async () => {
  const configPath = path.join(__dirname, 'config', 'ui_config.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  } else {
    return { sections: [] };
  }
});

// Get system info
ipcMain.handle('get-system-info', async () => {
  return {
    platform: process.platform,
    arch: process.arch,
    freeMemory: Math.round(require('os').freemem() / 1024 / 1024 / 1024) + ' GB'
  };
});