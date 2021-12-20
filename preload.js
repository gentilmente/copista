const BulmaNotification = require("./src/scripts/bulma-notifications");

let notif;
let notif1;

window.onload = () => {
  notif = new BulmaNotification();
  document
    .querySelector("#toggle-modal")
    .addEventListener("click", showNotification);
};

// Display a notification
function showNotification() {
  notif.show("Notification Title", "Notification message", "primary", 2000);
}

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
