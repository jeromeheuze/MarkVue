const { app, BrowserWindow, ipcMain, dialog, Menu } = require('electron');
const path = require('path');
const fs = require('fs').promises;

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
    icon: path.join(__dirname, 'assets/icon.png')
  });

  mainWindow.loadFile(path.join(__dirname, 'renderer/index.html'));
  
  // Create menu
  createMenu();
  
  // Open file if one was queued before window was ready
  if (fileToOpen) {
    openFile(fileToOpen);
    fileToOpen = null;
  }
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
        { role: 'reload' },
        { role: 'toggleDevTools' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' }
      ]
    }
  ];
  
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

async function openFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    mainWindow.webContents.send('file-opened', {
      content,
      path: filePath,
      name: path.basename(filePath)
    });
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

// Handle file opened from Windows Explorer
app.on('open-file', (event, filePath) => {
  event.preventDefault();
  if (mainWindow) {
    openFile(filePath);
  } else {
    fileToOpen = filePath;
  }
});

app.whenReady().then(createWindow);

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

