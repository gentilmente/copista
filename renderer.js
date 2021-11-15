const camera = require("./scripts/camera")
const livePreview = require("./scripts/live-preview")

let livePrev;

camera.initialize(function (res, msg, err) {

  if (!res) {
    console.error("camera:", msg, err);
    document.getElementById("info").innerHTML=msg;
    return
  }

  livePrev = new livePreview(
    camera.camera,
    document.getElementById("live"),
    10
  );
  livePrev.start();

});

/*
 * Trigger photo when clicking / touching anywhere at the screen
 */
document.getElementById("capture").addEventListener("click", () => trigger())


function trigger(callback) {
  if (callback === undefined) {
    callback = function () { };
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
    }, (countdownLength) * 1000);
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
