const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs').promises;
const fsSync = require('fs');

let mainWindow;
let fileToOpen = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    icon: path.join(__dirname, 'assets/MarkVue_256.png')
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
  
  // Create menu
  createMenu();
  
  // Add F12 shortcut to toggle DevTools
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      if (mainWindow.webContents.isDevToolsOpened()) {
        mainWindow.webContents.closeDevTools();
      } else {
        mainWindow.webContents.openDevTools();
      }
    }
  });
  
  // Open file if one was queued before window was ready
  mainWindow.webContents.once('did-finish-load', () => {
    if (fileToOpen) {
      openFile(fileToOpen);
      fileToOpen = null;
    }
  });
}

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ['openFile'],
              filters: [{ name: 'Markdown', extensions: ['md', 'markdown'] }]
            });
            if (!result.canceled) {
              openFile(result.filePaths[0]);
            }
          }
        },
        { type: 'separator' },
        { role: 'quit' }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Zoom In',
          accelerator: 'CmdOrCtrl+Plus',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('zoom-in');
            }
          }
        },
        {
          label: 'Zoom Out',
          accelerator: 'CmdOrCtrl+-',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('zoom-out');
            }
          }
        },
        {
          label: 'Reset Zoom',
          accelerator: 'CmdOrCtrl+0',
          click: () => {
            if (mainWindow) {
              mainWindow.webContents.send('zoom-reset');
            }
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About the Author',
          click: () => {
            mainWindow.webContents.send('show-about');
          }
        }
      ]
    }
  ];
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

async function openFile(filePath) {
  try {
    // Ensure window is ready before sending file
    if (!mainWindow || !mainWindow.webContents) {
      fileToOpen = filePath;
      return;
    }
    
    const content = await fs.readFile(filePath, 'utf-8');
    
    // Wait for window to be fully loaded before sending
    if (mainWindow.webContents.isLoading()) {
      mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.send('file-opened', {
          content,
          path: filePath,
          name: path.basename(filePath)
        });
      });
    } else {
      mainWindow.webContents.send('file-opened', {
        content,
        path: filePath,
        name: path.basename(filePath)
      });
    }
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

// Handle file opened from Windows Explorer (macOS)
app.on('open-file', (event, filePath) => {
  event.preventDefault();
  if (mainWindow) {
    openFile(filePath);
  } else {
    fileToOpen = filePath;
  }
});

// Handle file opened from Windows Explorer (Windows - command line arguments)
// This must be called before app.whenReady()
app.on('second-instance', (event, commandLine, workingDirectory) => {
  // Another instance tried to open a file
  if (mainWindow) {
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
    
    // Check for file path in command line arguments
    const filePath = commandLine.find(arg => 
      (arg.endsWith('.md') || arg.endsWith('.markdown')) && 
      fsSync.existsSync(arg)
    );
    if (filePath) {
      openFile(filePath);
    }
  }
});

// Prevent multiple instances on Windows
const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  app.quit();
} else {
  app.whenReady().then(() => {
    createWindow();
    
    // Check for file path in command line arguments (Windows)
    // Skip first two args (electron.exe and script path)
    const filePath = process.argv.find(arg => 
      (arg.endsWith('.md') || arg.endsWith('.markdown')) && 
      fsSync.existsSync(arg)
    );
    
    if (filePath) {
      fileToOpen = filePath;
    }
  });
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// IPC Handlers
ipcMain.handle('read-file', async (event, filePath) => {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    throw error;
  }
});


