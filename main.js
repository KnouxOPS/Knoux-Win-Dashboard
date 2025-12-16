const { app, BrowserWindow, ipcMain, shell, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const os = require('os');
const winston = require('winston');

// --- 1. إعداد نظام التسجيل (Logging Setup) ---
// يتم حفظ السجلات في %AppData%/Knoux Win/logs/
const logDir = path.join(app.getPath('userData'), 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, 'combined.log') })
  ]
});

// إذا كنا في وضع التطوير، نظهر السجلات في التيرمينال أيضاً
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

let mainWindow;

// --- 2. تحديد مسار السكريبتات وملفات الإعدادات ---
const getAssetPath = () => {
  // في وضع الإنتاج، الملفات تكون داخل resources
  // في وضع التطوير، هي في المجلد الجذري
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'scripts');
  }
  return path.join(__dirname, 'scripts');
};

const getConfigPath = () => {
  if (app.isPackaged) {
    // يمكن نسخ ملف التكوين للخارج إذا أردنا السماح بتعديله، هنا سنقرأه من الموارد
    return path.join(__dirname, 'config', 'ui_config.json');
  }
  return path.join(__dirname, 'config', 'ui_config.json');
};

// --- 3. إنشاء النافذة الرئيسية ---
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 1024,
    minHeight: 600,
    title: "Knoux Win Manager",
    backgroundColor: '#1a1a1a',
    show: false, // لا تظهر حتى يكتمل التحميل
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false 
    },
    icon: path.join(__dirname, 'assets', 'icon.ico') // تأكد من وجود الأيقونة
  });

  mainWindow.loadFile(path.join(__dirname, 'public', 'index.html'));

  // إزالة شريط القوائم القياسي لتعزيز المظهر الاحترافي
  mainWindow.setMenuBarVisibility(false);

  // إظهار النافذة بسلاسة
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    if (process.env.NODE_ENV === 'development') {
      mainWindow.webContents.openDevTools();
    }
  });

  // فتح الروابط الخارجية في المتصفح الافتراضي وليس داخل التطبيق
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// --- 4. معالجات العمليات (IPC Handlers) ---

// جلب معلومات النظام العامة
ipcMain.handle('get-system-info', async () => {
  try {
    const totalMem = Math.round(os.totalmem() / (1024 ** 3));
    const freeMem = Math.round(os.freemem() / (1024 ** 3));
    const cpu = os.cpus()[0].model;
    const hostname = os.hostname();
    const version = os.release();

    return { 
      totalMem: `${totalMem} GB`, 
      freeMem: `${freeMem} GB`,
      cpu,
      hostname,
      platform: `${os.type()} ${os.arch()} - Ver: ${version}`
    };
  } catch (error) {
    logger.error('System Info Error', error);
    return { error: "Failed to fetch system info" };
  }
});

// تحميل ملف الإعدادات JSON
ipcMain.handle('load-config', async () => {
  try {
    const configPath = getConfigPath();
    if (!fs.existsSync(configPath)) {
      logger.error(`Config file missing at: ${configPath}`);
      return { error: 'Configuration file not found.' };
    }
    const data = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    logger.error('Load Config Error', error);
    return { error: 'Error parsing configuration file.' };
  }
});

// محرك تنفيذ السكريبتات (Multi-Shell Execution Engine)
ipcMain.handle('run-script', (event, scriptRelPath) => {
  return new Promise((resolve, reject) => {
    
    // تصحيح المسار النسبي القادم من الواجهة ليناسب موقع المجلد الفعلي
    // الواجهة ترسل: scripts/clean/test.ps1 -> نحتاج تحويلها لمسار مطلق صحيح
    
    // إزالة البادئة "scripts/" لأننا سنضيف مسار الجذر بأنفسنا
    const cleanRelPath = scriptRelPath.replace(/^scripts[\\\/]/, ''); 
    const scriptBasePath = getAssetPath(); // يحدد المجلد الأساسي بناءً على البيئة
    const scriptFullPath = path.join(scriptBasePath, cleanRelPath);

    logger.info(`Request to run script: ${scriptFullPath}`);

    if (!fs.existsSync(scriptFullPath)) {
      const msg = `[Error] Script file not found: ${scriptFullPath}`;
      event.sender.send('script-output', msg);
      logger.error(msg);
      return resolve('Script Missing');
    }

    // تحديد المشغل بناءً على نوع الملف (Extension Detection)
    const fileExt = path.extname(scriptFullPath).toLowerCase();
    let proc;

    if (fileExt === '.bat' || fileExt === '.cmd') {
      // تشغيل ملفات Batch باستخدام cmd.exe
      logger.info('Executing as Batch script (cmd.exe)');
      proc = spawn('cmd.exe', ['/c', scriptFullPath]);
    } else {
      // الافتراضي: تشغيل Powershell كعملية فرعية
      logger.info('Executing as PowerShell script');
      proc = spawn('powershell.exe', [
        '-NoProfile',
        '-ExecutionPolicy', 'Bypass',
        '-File', scriptFullPath
      ]);
    }

    // معالجة البيانات النصية القادمة من السكريبت (STDOUT)
    proc.stdout.on('data', (data) => {
      // إرسال البيانات للواجهة لحظياً
      // نحول الـ Buffer إلى نص، ونحلل الترميز إذا لزم الأمر
      const output = data.toString();
      event.sender.send('script-output', output);
    });

    // معالجة الأخطاء القادمة من السكريبت (STDERR)
    proc.stderr.on('data', (data) => {
      const errorOutput = `[STDERR] ${data.toString()}`;
      event.sender.send('script-output', errorOutput); // نرسلها للمستخدم
      logger.warn(`Script STDERR: ${data.toString()}`);
    });

    // عند انتهاء السكريبت
    proc.on('close', (code) => {
      logger.info(`Script finished with code ${code}`);
      event.sender.send('script-output', `\n[--- Process Completed (Exit Code: ${code}) ---]`);
      resolve(code === 0 ? 'success' : 'warning');
    });

    proc.on('error', (err) => {
      logger.error('Spawn Error', err);
      event.sender.send('script-output', `[FATAL ERROR] Failed to start process: ${err.message}`);
      resolve('error');
    });
  });
});

// --- 5. دورة حياة التطبيق ---

// منع فتح أكثر من نسخة للتطبيق (Single Instance Lock)
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', () => {
    // إذا حاول شخص تشغيل نسخة ثانية، ركّز على النسخة المفتوحة
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  app.whenReady().then(createWindow);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});