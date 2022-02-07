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
