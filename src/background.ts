'use strict';

declare const __static: string;

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import {
  createProtocol,
  installVueDevtools,
} from 'vue-cli-plugin-electron-builder/lib';
const isDevelopment = process.env.NODE_ENV !== 'production';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(['app'], { secure: true });
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({ width: 800, height: 600 });

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) { win.webContents.openDevTools(); }
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadFile('index.html');
  }

  win.on('closed', () => {
    win = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  process.on('message', (data) => {
    if (data === 'graceful-exit') {
      app.quit();
    }
  });
}

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

import * as fs from 'fs';
import * as path from 'path';
import { Database } from 'sql.js';

console.log('--------------------------------------------');
console.log('---------------diagnostics------------------');
console.log('--------------------------------------------');
console.log('cwd: ' + process.cwd());
console.log('__static: ' + __static);
console.log('--------------------------------------------');
console.log('--------------------------------------------');
console.log('--------------------------------------------');

let db!: Database;

ipcMain.on('mainWindowLoaded', () => {
  db = new Database(fs.readFileSync(path.join(__static, 'hello.sqlite')));

  const result = db.exec('SELECT * FROM hello');
  win!.webContents.send('resultAvailable', result);
});

ipcMain.on('requestResult', () => {
  const result = db.exec('SELECT * FROM hello');
  win!.webContents.send('resultAvailable', result);
});
