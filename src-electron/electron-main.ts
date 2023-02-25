import { app, BrowserWindow, ipcMain, nativeTheme } from 'electron';
import path from 'path';
import os from 'os';
import { screen } from 'electron';
import { InkscapeH } from './handlers/inkscape_h';
import { ConfigH } from './handlers/config_h';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) { }

let mainWindow: BrowserWindow | undefined;

function createWindow() {

  /**
   * Initial window options
   */
  const width = screen.getPrimaryDisplay().workAreaSize.width
  const height = 150
  mainWindow = new BrowserWindow({

    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    x: 0,
    y: screen.getPrimaryDisplay().workAreaSize.height,

    width: width,
    height: height,
    // alwaysOnTop: true,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,

    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },

  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });

  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(() => {
  createWindow()
  ipcMain.handle('setInkscapePath', ({ }) => InkscapeH.setInkscapePath())
  ipcMain.handle('setProjectsPath', ({ }) => ConfigH.setProjectsPath())

  ipcMain.handle('minimizeWindow', ({ }) => mainWindow?.minimize())
  ipcMain.handle('maximizeWindow', ({ }) => mainWindow?.isMaximized() ? mainWindow?.unmaximize() : mainWindow?.maximize())
  ipcMain.handle('closeWindow', ({ }) => mainWindow?.close())

  ipcMain.handle('createNewProject', ({ }) => InkscapeH.createNewProject())


});

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});
