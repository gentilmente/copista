const gphoto2 = require('gphoto2');
const fs = require('fs');
const { settings } = require('cluster');
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

  takePicture(callback) {
    if (gphoto2 !== null) {
      this._takePictureWithCamera(callback);
    } else {
      this._createSamplePicture(callback);
    }
  }

  _takePictureWithCamera(callback) {
    var self = this;

    if (self.camera === undefined) {
      callback(-1, 'camera not initialized', null);
      return;
    }

    const keep = true;

    self.camera.takePicture(
      { download: true, keep: keep },
      function (err, data) {
        if (err) {
          self.camera = undefined; // needs to be reinitialized
          callback(-2, 'connection to camera failed', err);
          return;
        }

        self._resizeAndSave(data, callback);
      }
    );
  }

  _createSamplePicture(callback) {
    console.log('sample picture');
  }

  _resizeAndSave(data, callback) {
    //to do: projects path on config.json
    const filePath = './content/carpetaProyecto/foterli' + '.jpg';
    fs.writeFile(filePath, data, function (err) {
      if (err) {
        console.log(err);
        callback(-3, 'saving hq image failed', err);
      } else {
        callback(true);
      }
    });
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
