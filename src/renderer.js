import CM from './scripts/carouselManager.js';

window.biblioApi.onInitCamera((e, msg) => {
  window.biblioApi.notification('oh no!', msg, 'danger');
});

const liveView = document.getElementById('liveview');
const carouselElem = document.querySelector('#carousel-demo');
const btnOpenFile = document.getElementById('open');

liveView.addEventListener('click', (e) => {
  window.biblioApi.notification('error', e, 'danger');
});

document.addEventListener('keyup', (event) => {
  console.log(event);
  if (event.code === 'Space') {
    //biblioApi.capture();
    console.log('space');
    event.preventDefault();
    //biblioApi.kill();
  }
});

btnOpenFile.addEventListener('click', (evt) => {
  evt.preventDefault();
  biblioApi
    .getImage()
    .then((obj) => {
      //console.log(obj);
      const src = obj.selectedSrc;
      const img = document.getElementById('img');
      img.src = src;

      document.getElementById('path').innerText = obj.selectedName;
      const cm = new CM(obj.allSrcInFolder);
      cm.populateImages(carouselElem);
    })
    .then(biblioApi.killCarousel())
    .then(() => biblioApi.attachCarousel(carouselElem));
});
