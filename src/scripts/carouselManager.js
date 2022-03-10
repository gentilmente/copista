class CarouselManager {
  constructor(sources) {
    this.sources = sources;
  }

  populateImages(carouselElem) {
    console.log(carouselElem);
    for (let i = 0; i < this.sources.length; i++) {
      const src = this.sources[i];
      const itemEl = createElement('div', {
        class: `item-${i + 1}`,
      });
      const figureEl = createElement('figure', {
        class: 'image is-128x128',
      });
      const imgEl = createElement('img', {
        src: src,
      });
      figureEl.append(imgEl);
      itemEl.append(figureEl);
      carouselElem.append(itemEl);
    }
  }
}

function createElement(element, attribute, inner) {
  if (typeof element === 'undefined') {
    return false;
  }
  if (typeof inner === 'undefined') {
    inner = '';
  }
  const el = document.createElement(element);
  if (typeof attribute === 'object') {
    for (let key in attribute) {
      el.setAttribute(key, attribute[key]);
    }
  }
  if (!Array.isArray(inner)) {
    inner = [inner];
  }
  for (let k = 0; k < inner.length; k++) {
    if (inner[k].tagName) {
      el.append(inner[k]);
    } else {
      el.append(document.createTextNode(inner[k]));
    }
  }
  return el;
}

export default CarouselManager;
