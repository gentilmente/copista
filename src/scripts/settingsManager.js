const statusPropWanted = [
  'manufacturer',
  'cameramodel',
  //'acpower',
  'batterylevel',
  //'aflocked',
  //'orientation', not in Canon
];
const capturePropsWanted = [
  'expprogram',
  'f-number', //aperture canon
  'focallength',
  'focusmode',
  'imagequality',
  'shutterspeed',
  'shutterspeed2',
];
const imagePropsWanted = [
  //'imagesize',
  'imageformat',
  'iso',
  'whitebalance',
];
class SettingsManager {
  getWantedProps() {
    return { statusPropWanted, capturePropsWanted, imagePropsWanted };
  }

  constructor(settings) {
    Object.assign(this, settings);
  }

  populateSettings(menuElem) {
    console.log(this);
    if (menuElem.id === 'all-settings-panel') {
      for (const key in this) {
        if (Object.hasOwn(this, key)) {
          const element = this[key];
          const props = element.children;
          const title = createElement('p', {
            class: 'subtitle has-text-light',
          });
          title.innerText = element.label;
          this.insertProps(props, menuElem);
          menuElem.prepend(title);
        }
      }
    } else {
      const props = pickProperties(this.status.children, statusPropWanted);
      this.insertProps(props, menuElem);
    }
  }

  insertProps(props, menuElem) {
    for (const key in props) {
      const propName = `${key}-chkbox`;
      const input = createElement('input', {
        class: 'is-checkradio is-white',
        id: propName,
        type: 'checkbox',
      });
      const label = createElement('label', {
        for: propName,
      });

      const o = props[key];
      label.innerText = o.label + ': ' + o.value;
      if (statusPropWanted.includes(key)) {
        input.setAttribute('checked', '');
      }
      const newPropEl = createElement('div', { class: 'list-item' }, [
        input,
        label,
      ]);
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
