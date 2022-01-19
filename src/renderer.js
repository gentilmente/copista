import BulmaNotification from './scripts/bulma-notifications.js';
import camera from './scripts/camera.js';

const livePreview = require('./scripts/live-preview');

let livePrev;

camera.initialize(function (res, msg, err) {
  let notif = new BulmaNotification();
  //notif.show('Notification Title', 'Notification message', 'primary', 2000);
  if (!res) {
    console.error('camera:', msg, err);
    notif.show('OH no!', msg, 'danger');
    return;
  }

  livePrev = new livePreview(
    camera.camera,
    document.getElementById('live'),
    10
  );
  livePrev.start();

  let level = camera.getBattery();
  setTimeout(() => {
    console.log(camera);
    console.log(level);
  }, 2000);
  document.getElementById('bat').innerHTML = level.label + ': ' + level.value;
});

/*
 * Trigger photo when clicking capture button
document.getElementById('capture').addEventListener('click', () => trigger());
 */

let executing = false;

function trigger(callback) {
  if (callback === undefined) {
    callback = function () {};
  }

  if (executing) {
    callback(true);
    return;
  }

  executing = true;

  if (camera.isInitialized()) {
    // take picture after countdown
    setTimeout(function () {
      if (livePrev) livePrev.stop();

      camera.takePicture(function (res, msg1, msg2) {
        const message1 = msg1;
        const message2 = msg2;
      });
    }, 1 * 1000);
  } else {
    // TODO: Handle uninitialized camera

    camera.initialize(function (res, msg, err) {
      if (res) {
        executing = false;
        trigger(callback);
      } else {
        callback(false);
      }
    });
  }
}

/*
 * Module exports
 */

module.exports.triggerPhoto = trigger;
