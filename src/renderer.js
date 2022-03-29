import CM from './scripts/carouselManager.js';

let running = false;

biblioApi.onInitCamera((e, msg) => {
  biblioApi.notification('oh no!', msg, 'danger');
});

const live = document.getElementById('live');
const canvas = document.querySelector('#canvas');
const liveViewBtn = document.getElementById('liveview-btn');
const carouselElem = document.querySelector('#carousel-demo');
const btnOpenFile = document.getElementById('open');

liveViewBtn.addEventListener('click', async (e) => {
  running = running ? false : true;
  while (running) {
    const data = await biblioApi.showLiveView();
    const el = document.createElement('img');
    el.className = 'canvas';
    el.src = 'file://' + data;
    live.innerHTML = '';
    live.prepend(el);
  }

  //window.biblioApi.notification('error', e, 'danger');
});

btnOpenFile.addEventListener('click', (e) => {
  e.preventDefault();
  biblioApi
    .getImage()
    .then((obj) => {
      canvas.src = obj.selectedSrc;

      document.getElementById('path').innerText = obj.selectedName;
      const cm = new CM(obj.allSrcInFolder);
      cm.populateImages(carouselElem);

      const imgs = document.querySelectorAll('img');
      imgs.forEach((thumbnail) =>
        thumbnail.addEventListener('click', (e) => (canvas.src = e.target.src))
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
