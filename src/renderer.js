console.log('renderer...');

window.biblioApi.onInitCamera((e, msg) => {
  window.biblioApi.notification('oh no!', msg, 'danger');
});

/* window.biblioApi.onInitCam((e, settings) => {
  console.log(
    '🚀 ~ file: renderer.js ~ line 14 ~ window.biblioApi.onInitCam ~ msg',
    settings
  );
  const value = settings.main.children.status.children.batterylevel.value;
  bat.innerHTML = value;
  window.biblioApi.notification('yes!', value, 'success');
}); */

const liveView = document.getElementById('liveview');
liveView.addEventListener('click', (e) => {
  window.biblioApi.notification('error', e, 'danger');
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    biblioApi.capture();
  }
});

const setButton = document.getElementById('open');
//const titleInput = document.getElementById('title')

setButton.addEventListener('click', () => {
  //const title = titleInput.value
  //API.setTitle(title)
  biblioApi.getImage();
});
