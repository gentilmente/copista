// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

const camera = require('./src/scripts/camera');

let mainWindow;
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  app.allowRendererProcessReuse = false;
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 830,
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

  const settings = await camera.getSettings();
  //console.log(settings);
  mainWindow.webContents.send('settings', settings);
};

ipcMain.handle('liveview', async (e) => {
  //console.log('main ', e.sender.closeDevTools());
  const path = await takePreview();
  return path;
});

takePreview = () => {
  return new Promise((res, rej) =>
    camera.camera.takePicture(
      { keep: false, preview: true, targetPath: '/tmp/liveimg.XXXXXX' },
      function (error, data) {
        if (error) rej(error);
        else res(data);
      }
    )
  );
};

ipcMain.handle('capture', async () => {
  console.log('asdkjlhf');
  console.log(camera.camera);
  //await camera.camera.takePicture('./content/carpetaProyecto/foterli.jpg');
  return '../content/carpetaProyectorss/DSC_0309.JPG';
});

ipcMain.handle('pickFile', async () => {
  const obj = { selectedSrc: '', selectedName: '', allSrcInFolder: [] };
  return dialog
    .showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Images', extensions: ['png', 'jpg', 'jpeg'] }],
    })
    .then((result) => {
      if (result.canceled) return;
      obj.selectedSrc = result.filePaths[0];
      /* obj.selectedSrc = fs.readFileSync(result.filePaths[0], {
        encoding: 'base64',
      }); */
      obj.selectedName = path.basename(result.filePaths[0]);
      return path.dirname(result.filePaths[0]);
    })
    .then(async (dir) => {
      obj.allSrcInFolder = await fs.promises
        .readdir(dir, { withFileTypes: true })
        .then(
          (dirents) =>
            dirents
              .filter(
                (dirent) => dirent.isFile() && !dirent.name.startsWith('.')
              )
              .map(({ name }) => path.resolve(dir, name))
          //.map((file) => fs.readFileSync(file, { encoding: 'base64' }))
        )
        .catch((err) => console.log(err));
      //console.log(obj);
      return obj;
    })
    .catch((err) => console.log(err));
});
