const gphoto2 = require('gphoto2');
const fs = require('fs');
const { settings } = require('cluster');
const path = require('path');
let self;
class Camera {
  /*
   * Detect and configure camera
   */
  initialize(callback) {
    if (gphoto2 === null) {
      callback(true);
      return;
    }

    this.GPhoto = new gphoto2.GPhoto2();

    // Negative value or undefined will disable logging, levels 0-4 enable it.
    this.GPhoto.setLogLevel(-1);

    self = this;
    this.GPhoto.list(function (list) {
      if (list.length === 0) {
        callback(false, 'No camera found', null);
        return;
      }
      self.camera = list[0];

      console.log('gphoto2: Found', self.camera.model);
      //console.log(self.camera);

      self.camera.setConfigValue('capturetarget', 1, function (err) {
        if (err) {
          callback(false, 'setting config failed', err);
          self.camera = undefined;
        } else {
          callback(true);
        }
      });
    });
  }

  isInitialized() {
    return self.camera !== undefined || gphoto2 === null;
  }

  takePicture(path) {
    console.log(path);
    if (gphoto2 !== null) {
      this._takePictureWithCamera(path);
    } else {
      this._createSamplePicture(callback);
    }
  }

  _takePictureWithCamera(path) {
    var self = this;

    self.camera.takePicture(
      { download: true, keep: keep },
      function (err, data) {
        console.log(path, data);
        fs.writeFileSync(path, data);
      }
    );
  }

  _createSamplePicture(callback) {
    console.log('sample picture');
  }

  _resizeAndSave(data, callback) {
    //to do: projects path on config.json
    const filePath = './content/carpetaProyecto/foterli' + '.jpg';
    console.log(data);
    fs.writeFileSync(filePath, data);
  }

  getSettings() {
    if (self.camera === undefined) {
      callback(-1, 'camera not initialized', null);
      return;
    }

    let level = {};
    let _settings = {};
    self.camera.getConfig(function (err, settings) {
      level = {
        label: settings.main.children.status.children.batterylevel.label,
        value: settings.main.children.status.children.batterylevel.value,
      };
      _settings = settings;
    });
    return new Promise((resolve) => {
      //resolve(level);
      setTimeout(() => {
        //console.log(_settings);
        resolve(_settings);
      }, 20);
    });
  }
}

/*
 * Module exports for connection
 */
let camera = new Camera();
module.exports = camera;
