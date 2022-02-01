console.log('renderer...');

const model = document.getElementById('model');
window.biblioApi.onInitCamera((e, msg) => {
  console.log(
    '🚀 ~ file: renderer.js ~ line 5 ~ window.biblioApi.onInitCamera ~ msg',
    msg
  );
  model.innerHTML = msg;
  window.biblioApi.notification('oh no!', msg, 'danger');
});
