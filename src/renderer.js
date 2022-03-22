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
      imgs.forEach((img) =>
        img.addEventListener('click', (e) =>
          console.log('clicked', e.target.src)
        )
      );
    })
    .then(biblioApi.killCarousel(carouselElem))
    .then(() => biblioApi.attachCarousel(carouselElem));
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
