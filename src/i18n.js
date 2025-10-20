/* Config file for i18n plugin */

import Vue from 'vue';
import VueI18n from 'vue-i18n';

import helper from './helpers';

import esLocales from './locales/es.json';
import enLocales from './locales/en.json';
import TranslationsRepository from './repositories/TranslationsRepository';

Vue.use(VueI18n);

// Get page language from cookie, change to your needs
const USED_LANGUAGES = ['en', 'es'];
const initialLang = helper.getCookie('MIFEL_LOCALE');
if (!initialLang || !USED_LANGUAGES.some(lang => lang === initialLang) ) {
  helper.setCookie('MIFEL_LOCALE', 'es', 8);
}
const LANG = helper.getCookie('MIFEL_LOCALE');

export const i18n = new VueI18n({
  locale: LANG,
  fallbackLocale: 'es',
  // eslint-disable-next-line no-use-before-define
  messages: loadLocaleMessages(),
  asyncLoading: false,
});

function loadLocaleMessages() {
  const messages = {};
  messages.es = {
    ...esLocales,
  };
  messages.en = {
    ...enLocales,
  };
  return messages;
}

export const loadLanguageAsync = async () => {
  try {
    for(let lang of USED_LANGUAGES){
      const promises = [TranslationsRepository.getTranslations(lang), TranslationsRepository.getErrorsTranslation(lang)];
      const [translations, translationsErrors] = await Promise.all(promises);
      const messages = {
        [lang]: {
          ...i18n.messages[lang],
          ...translations[lang],
          errors: { ...i18n.messages[lang].errors, ...translationsErrors[lang] },
          },
        };
        i18n.setLocaleMessage(lang, messages[lang]);
    }
  } finally {
    i18n.asyncLoading = true;
  }
};