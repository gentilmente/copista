const { contextBridge, ipcRenderer } = require('electron');
const livePreview = require('./src/scripts/live-preview');

const bulmaQuickview = require('bulma-quickview');
const bulmaCarousel = require('bulma-carousel');

const BulmaNotification = require('./src/scripts/bulma-notifications');

const SM = require('./src/scripts/settingsManager');
let carru = {};
contextBridge.exposeInMainWorld('biblioApi', {
  notification: (title, msg, type) =>
    new BulmaNotification().show(title, msg, type),
  onInitCamera: (cb) => ipcRenderer.on('notif:error', cb),
  showLiveView: () => ipcRenderer.invoke('liveview'),
  capture: () => ipcRenderer.invoke('capture'),
  getImage: () => ipcRenderer.invoke('pickFile'),
  attachCarousel: (elem) => {
    carru.instance = bulmaCarousel.attach(elem, {
      slidesToScroll: 1,
      slidesToShow: 5,
    });
  },
  killCarousel: function (elem) {
    if (Array.isArray(carru.instance)) {
      elem.replaceChildren();
      delete carru.instance;
      //carru.instance[0] = undefined;
    }
  },
  next: () => carru.instance[0].next(),
  prev: () => carru.instance[0].previous(),
});

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  bulmaQuickview.attach();

  ipcRenderer.on('settings', (e, settings) => {
    const sm = new SM(settings.main.children);
    let menuElem = document.getElementById('all-settings-panel');
    //params: el menu y el array de settings y los elem
    sm.populateSettings(menuElem);

    //console.log(sm.getWantedProps());
    menuElem = document.getElementById('settings-panel');
    sm.populateSettings(menuElem);
  });
});
