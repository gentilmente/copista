const { contextBridge, ipcRenderer } = require('electron');
const bulmaQuickview = require('bulma-quickview');
const bulmaCarousel = require('bulma-carousel');

const BulmaNotification = require('./src/scripts/bulma-notifications');

const SM = require('./src/scripts/settingsManager');

contextBridge.exposeInMainWorld('biblioApi', {
  notification: (title, msg, type) => {
    new BulmaNotification().show(title, msg, type);
  },
  onInitCamera: (cb) => ipcRenderer.on('notif:error', cb),
  //onInitCam: (cb) => ipcRenderer.on('settings', cb),
  //Bulma: ipcRenderer.invoke(new BulmaNotification()),
});

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  bulmaQuickview.attach();
  bulmaCarousel.attach('#carousel-demo', {
    slidesToScroll: 1,
    slidesToShow: 5,
  });

  ipcRenderer.on('settings', (e, settings) => {
    console.log(
      '🚀 ~ file: preload.js ~ line 61 ~ ipcRenderer.on ~ settings',
      settings.main.children
    );

    const sm = new SM(settings.main.children);
    sm.populateSettings();
  });
});
