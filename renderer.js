const camera = require("./scripts/camera");
const livePreview = require("./scripts/live-preview");

const toggleModal = () => {
  const btnLiveview = document.getElementById("toggle-modal");
  const modal = document.querySelector(".modal");
  const close = document.querySelector(".modal-close");

  btnLiveview.onclick = () => modal.classList.toggle("is-active");
  close.onclick = () => {
    modal.classList.toggle("is-active");
    livePrev.stop();
  };
};

document.addEventListener("DOMContentLoaded", () => {
  (document.querySelectorAll(".notification .delete") || []).forEach(
    ($delete) => {
      const $notification = $delete.parentNode;

      $delete.addEventListener("click", () => {
        $notification.parentNode.removeChild($notification);
      });
    }
  );
});

let livePrev;

camera.initialize(function (res, msg, err) {
  if (!res) {
    console.error("camera:", msg, err);
    document.getElementById("info").innerHTML = msg;
    return;
  }
  toggleModal();

  livePrev = new livePreview(
    camera.camera,
    document.getElementById("live"),
    10
  );
  livePrev.start();
});

/*
 * Trigger photo when clicking capture button
 */
document.getElementById("capture").addEventListener("click", () => trigger());

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
