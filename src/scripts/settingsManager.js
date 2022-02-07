class SettingsManager {
  STATUS_PROPS_WANTED = [
    'manufacturer',
    'cameramodel',
    //'acpower',
    'batterylevel',
    //'aflocked',
    //'orientation', not in Canon
  ];
  CAPTURE_PROPS_WANTED = [
    'expprogram',
    'f-number', //aperture canon
    'focallength',
    'focusmode',
    'imagequality',
    'shutterspeed',
    'shutterspeed2',
  ];
  IMAGE_PROPS_WANTED = [
    //'imagesize',
    'imageformat',
    'iso',
    'whitebalance',
  ];
  constructor(settings) {
    Object.assign(this, settings);
  }
  populateSettings() {
    /*     
    const statusProps = pickProperties(
      this.status.children,
      this.STATUS_PROPS_WANTED
    ); */
    const statusProps = this.status.children;
    let menuElem = document.getElementById('settings-panel');

    for (const key in statusProps) {
      const propName = `${key}-chkbox`;
      const input = createElement('input', {
        class: 'is-checkradio is-white',
        id: propName,
        type: 'checkbox',
      });
      const label = createElement('label', {
        for: propName,
      });

      const o = statusProps[key];
      label.innerText = o.label + ': ' + o.value;
      if (this.STATUS_PROPS_WANTED.includes(key)) {
        input.setAttribute('checked', '');
      }
      const newPropEl = createElement('li', null, [input, label]);
      menuElem.prepend(newPropEl);
    }
  }
}

function pickProperties(o, [...props]) {
  return Object.assign({}, ...props.map((prop) => ({ [prop]: o[prop] })));
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

module.exports = SettingsManager;
