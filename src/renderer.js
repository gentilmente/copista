import CM from './scripts/carouselManager.js';

window.biblioApi.onInitCamera((e, msg) => {
  window.biblioApi.notification('oh no!', msg, 'danger');
});

const liveView = document.getElementById('liveview');
liveView.addEventListener('click', (e) => {
  window.biblioApi.notification('error', e, 'danger');
});

document.addEventListener('keyup', (event) => {
  if (event.code === 'Space') {
    biblioApi.capture();
    console.log('space');
    biblioApi.kill(event);
  }
});

const btnOpenFile = document.getElementById('open');

btnOpenFile.addEventListener('click', async () => {
  await biblioApi.getImage().then((obj) => {
    //console.log(obj);
    const src = obj.selectedSrc;
    const img = document.getElementById('img');
    img.src = src;

    document.getElementById('path').innerText = obj.selectedName;
    const carouselElem = document.querySelector('#carousel-demo');
    const cm = new CM(obj.allSrcInFolder);
    cm.populateImages(carouselElem);
  });
  biblioApi.attachCarousel();
});
