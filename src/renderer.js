import CM from './scripts/carouselManager.js';

biblioApi.onInitCamera((e, msg) => {
  biblioApi.notification('oh no!', msg, 'danger');
});

const live = document.getElementById('live');
const canvas = document.querySelector('#canvas');
const btnLiveView = document.getElementById('liveview-btn');
const carouselElem = document.querySelector('#carousel-demo');
const btnOpenFile = document.getElementById('open');

let running = false;
let id = 0;

document.addEventListener('keyup', async (e) => {
  e.preventDefault();
  if (e.code === 'Space') {
    toggleLiveview();
    await biblioApi.capture().then((srcPath) => {
      putPhotoInGUI(srcPath);
      console.log(srcPath);
    });
  }
});

btnLiveView.addEventListener('click', (e) => {
  e.preventDefault();
  toggleLiveview();
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

live.addEventListener('click', (e) => {
  e.preventDefault();
  // si running false not toggleLiveview();
  console.log('click: ', running, id);

  biblioApi.capture().then((srcPath) => {
    console.log('srcFromMain', srcPath);
    putPhotoInGUI(srcPath);
  });
});

function toggleLiveview() {
  running = running ? false : true;
  console.log('toggle: ' + running);
  if (running) {
    liveview();
  } else {
    console.log('stop:', id);
    clearInterval(id);
  }
}

function liveview() {
  id = setInterval(async () => {
    const srcPath = await biblioApi.showLiveView();
    //console.log(srcPath);
    putPhotoInGUI(srcPath);
  }, 60);
  console.log('lv: ', running, id);
}

function putPhotoInGUI(srcPath) {
  const el = document.createElement('img');
  el.id = 'canvas';
  el.className = 'canvas';
  //el.src = 'file://' + data;
  el.src = srcPath;
  live.innerHTML = '';
  live.prepend(el);
}
