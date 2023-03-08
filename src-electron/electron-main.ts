import { app, BrowserWindow, ipcMain, MessageChannelMain, nativeTheme, utilityProcess } from 'electron';
import path from 'path';
import os from 'os';
import { screen } from 'electron';
import { InkscapeH } from './handlers/inkscape_h';
import { ConfigH } from './handlers/config_h';
import { ProjectH } from './handlers/project_h';
import { ChildProcess, ChildProcessWithoutNullStreams, exec, execSync, fork, spawn } from 'child_process';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) { }

export let mainWindow: BrowserWindow | undefined;

function createWindow() {

  /**
   * Initial window options
   */
  const width = screen.getPrimaryDisplay().workAreaSize.width
  const height = 200
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


    try {
      // exec(`${ConfigH.inkscapePath} ${ConfigH.projectPathSvg}`)

      // let ls: ChildProcessWithoutNullStreams
      // ls = spawn(`${ConfigH.inkscapePath}`, ['-q', '--shell'])
      // setTimeout(() => {

      // }, 5000);

      // setInterval(() => {
      //   if (!InkscapeH.inkscapeProcess) return
      //   InkscapeH.inkscapeProcess.stdin.write(`select-clear
      //   `)


      //   InkscapeH.inkscapeProcess.stdout.on('data', (data) => {
      //     console.log(`stdout: ${data}`);
      //   });

      //   InkscapeH.inkscapeProcess.stderr.on('error', (err) => console.log('stderr: ', err))

      //   InkscapeH.inkscapeProcess.on('close', (code) => {
      //     console.log(`child process close all stdio with code ${code}`);
      //   });

      //   InkscapeH.inkscapeProcess.on('exit', (code) => {
      //     console.log(`child process exited with code ${code}`);
      //   });

      //   InkscapeH.inkscapeProcess.on('error', (err) => console.log('err: ', err))

      //   InkscapeH.inkscapeProcess.on('message', (msg) => console.log('msg: ', msg))
      // }, 8000);

    } catch (e) {
      console.log('error: ', e)
    }

  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });

    // ProjectH.init()


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

  ipcMain.handle('getConfig', ({ }) => ConfigH.get())
  // ipcMain.handle('getAnimState', ({ }) => AnimH.get())

  ipcMain.handle('openInkscape', ({ }) => InkscapeH.openInkscape(ConfigH.projectPathSvg))

  ipcMain.handle('updateInkscape', ({ }, p) => InkscapeH.updateInkscape(p))

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