// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
const camera = require('./src/scripts/camera');
const livePreview = require('./src/scripts/live-preview');

let livePrev;
let mainWindow;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  app.allowRendererProcessReuse = false;
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  mainWindow.loadFile('src/index.html');

  //this is for Sync send to renderer
  mainWindow.webContents.once('dom-ready', () => {
    camera.initialize(startCamera);
  });

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools({ mode: 'detach' });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

const startCamera = async (res, msg, err) => {
  if (!res) {
    console.error('camera:', msg, err);
    mainWindow.webContents.send('notif:error', msg);
    return;
  }

  /*  livePrev = new livePreview(
    camera.camera,
    document.getElementById('live'),
    10
  );
  livePrev.start(); */

  const level = await camera.getBattery();
  console.log(level);
  /*  setTimeout(() => {
    console.log(camera);
    console.log(level);
  }, 2000); */
  mainWindow.webContents.send('settings', level);
};
