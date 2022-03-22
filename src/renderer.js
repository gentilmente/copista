import CM from './scripts/carouselManager.js';

biblioApi.onInitCamera((e, msg) => {
  biblioApi.notification('oh no!', msg, 'danger');
});

const liveView = document.getElementById('liveview');
const carouselElem = document.querySelector('#carousel-demo');
const btnOpenFile = document.getElementById('open');

liveView.addEventListener('click', (e) => {
  window.biblioApi.notification('error', e, 'danger');
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
      const imgs = document.querySelectorAll('img');
      imgs.forEach((thumbnail) =>
        thumbnail.addEventListener('click', (e) => (img.src = e.target.src))
      );
    })
    .then(biblioApi.killCarousel(carouselElem))
    .then(() => biblioApi.attachCarousel(carouselElem))
    .then(() => {
      document.addEventListener('keyup', (e) => {
        if (e.key === 'ArrowRight') {
          biblioApi.next();
        } else if (e.key === 'ArrowLeft') {
          biblioApi.prev();
        }
      });
    });
});

/* document.addEventListener('keyup', (event) => {
  console.log(event);
  if (event.code === 'Space') {
    //biblioApi.capture();
    console.log('space');
    event.preventDefault();
    //biblioApi.kill();
  }
}); */
