const i18next = require('i18next');

/* import en from './locales/en.json';
import ja from './locales/ja.json';
import zh_TW from './locales/zh_tw.json';
import cs from './locales/cs.json';
import de from './locales/de.json';
import pl from './locales/pl.json';
import ru from './locales/ru.json';
import pt from './locales/pt.json';
import zh_CN from './locales/zh_cn.json';
import ar from './locales/ar.json';
 */
const es = require('./locales/es.json');

const setLocales = (locale) => {
  i18next.init({
    lng: locale,
    fallbackLng: 'en',
    resources: {
      /* en: { translation: en },
      ja: { translation: ja },
      cs: { translation: cs },
      de: { translation: de },
      'de-AT': { translation: de },
      'de-CH': { translation: de },
      'de-DE': { translation: de }, */
      es: { translation: es },
      /*  'es-419': { translation: es },
      pl: { translation: pl },
      ru: { translation: ru },
      pt: { translation: pt },
      'pt-PT': { translation: pt },
      'pt-BR': { translation: pt },
      zh: { translation: zh_CN },
      'zh-CN': { translation: zh_CN },
      'zh-TW': { translation: zh_TW },
      ar: { translation: ar }, */
    },
  });
};

exports.setLocales = setLocales;
