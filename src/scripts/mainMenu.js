const { app, dialog, Menu, shell } = require('electron');

const path = require('path');
const i18next = require('i18next');

const createMenu = (win) => {
  const isWin32 = process.platform === 'win32';
  const isDarwin = process.platform === 'darwin';
  const dotfiles = isDarwin ? '.' : '._';

  const fileSub = {
    label: i18next.t('File'),
    submenu: [
      {
        label: i18next.t('Open...'),
        accelerator: 'CmdOrCtrl+O',
        click: async () => {
          await dialog
            .showOpenDialog(win, {
              properties: ['openFile'],
              title: i18next.t('Select an image'),
              filters: [
                {
                  name: i18next.t('Image files'),
                  extensions: [
                    'bmp',
                    'gif',
                    'ico',
                    'jpg',
                    'jpeg',
                    'png',
                    'svg',
                    'webp',
                  ],
                },
              ],
            })
            .then((result) => {
              if (result.canceled) return;

              if (path.basename(result.filePaths[0]).startsWith(dotfiles)) {
                return;
              }

              win.webContents.send('menu-open', result.filePaths[0]);
            })
            .catch((err) => console.log(err));
        },
      },
      { type: 'separator' },
      {
        label: i18next.t('Move to Trash'),
        accelerator: 'Delete',
        click: () => win.webContents.send('menu-remove'),
      },
      { type: 'separator' },
      {
        label: isDarwin ? i18next.t('Close') : i18next.t('Quit'),
        accelerator: isDarwin ? 'Cmd+W' : isWin32 ? 'Alt+F4' : 'Ctrl+Q',
        role: isDarwin ? 'close' : 'quit',
      },
    ],
  };

  const viewSub = [
    {
      label: i18next.t('Next Image'),
      accelerator: 'J',
      click: () => win.webContents.send('menu-next'),
    },
    {
      label: 'Next Image (invisible)',
      accelerator: 'CmdOrCtrl+N',
      click: () => win.webContents.send('menu-next'),
      visible: false,
    },
    {
      label: 'Next Image (invisible)',
      accelerator: 'CmdOrCtrl+Right',
      click: () => win.webContents.send('menu-next'),
      visible: false,
    },
    {
      label: i18next.t('Prev Image'),
      accelerator: 'K',
      click: () => win.webContents.send('menu-prev'),
    },
    {
      label: 'Prev Image (invisible)',
      accelerator: 'CmdOrCtrl+P',
      click: () => win.webContents.send('menu-prev'),
      visible: false,
    },
    {
      label: 'Prev Image (invisible)',
      accelerator: 'CmdOrCtrl+Left',
      click: () => win.webContents.send('menu-prev'),
      visible: false,
    },
    { type: 'separator' },
  ];

  if (!isDarwin) {
    viewSub.push({
      label: i18next.t('Toggle Fullscreen'),
      role: 'togglefullscreen',
      accelerator: 'F11',
    });
  }

  const helpSub = [
    {
      label: i18next.t('Support URL...'),
      click: async () => shell.openExternal('https://bibliohack.org'),
    },
  ];

  const aboutItem = {
    label: i18next.t(isDarwin ? 'About Bibliohack' : 'About'),
    accelerator: 'CmdOrCtrl+I',
    click: () => app.showAboutPanel(),
  };

  if (!isDarwin) {
    helpSub.push(aboutItem);
  }

  const template = [
    fileSub,
    {
      label: i18next.t('View'),
      submenu: viewSub,
    },
    {
      label: i18next.t('Window'),
      submenu: [
        {
          label: i18next.t('Minimize'),
          role: 'minimize',
          accelerator: 'CmdOrCtrl+M',
        },
        {
          label: i18next.t('Maximize'),
          accelerator: 'CmdOrCtrl+L',
          click: () => {
            win.isMaximized() ? win.unmaximize() : win.maximize();
          },
        },
        { type: 'separator' },
        {
          label: i18next.t('Toggle Developer Tools'),
          click: () => {
            if (win.webContents.isDevToolsOpened()) {
              win.webContents.closeDevTools();
            } else {
              win.webContents.openDevTools({ mode: 'detach' });
            }
          },
          accelerator: isDarwin ? 'Cmd+Option+I' : 'Ctrl+Shift+I',
        },
        { type: 'separator' },
        isDarwin
          ? {
              label: i18next.t('Bring All to Front'),
              role: 'front',
            }
          : {
              label: i18next.t('Close'),
              role: 'close',
              accelerator: 'Ctrl+W',
            },
      ],
    },
    {
      label: i18next.t('Help'),
      role: 'help',
      submenu: helpSub,
    },
  ];

  if (isDarwin) {
    template.unshift({
      label: 'Bibliohack',
      submenu: [
        aboutItem,
        { type: 'separator' },
        {
          label: i18next.t('Hide Bibliohack'),
          role: 'hide',
        },
        {
          label: i18next.t('Hide Others'),
          role: 'hideOthers',
        },
        {
          label: i18next.t('Show All'),
          role: 'unhide',
        },
        { type: 'separator' },
        {
          label: i18next.t('Quit Bibliohack'),
          role: 'quit',
        },
      ],
    });
  }

  return Menu.buildFromTemplate(template);
};

exports.createMenu = createMenu;
