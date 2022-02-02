console.log('renderer...');
const bat = document.getElementById('bat');
const model = document.getElementById('model');

window.biblioApi.onInitCamera((e, msg) => {
  console.log(
    '🚀 ~ file: renderer.js ~ line 5 ~ window.biblioApi.onInitCamera ~ msg',
    msg
  );
  model.innerHTML = msg;
  window.biblioApi.notification('oh no!', msg, 'danger');
});

window.biblioApi.onInitCam((e, level) => {
  console.log(
    '🚀 ~ file: renderer.js ~ line 14 ~ window.biblioApi.onInitCam ~ msg',
    level
  );

  bat.innerHTML = level.value;
  window.biblioApi.notification('yes!', level.value, 'success');
});
