import { createI18n } from 'vue-i18n'

function loadLocaleMessages () {
  const messages = {};
  if (typeof require.context !== 'undefined') {
    const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
    locales.keys().forEach(key => {
      const matched = key.match(/([A-Za-z0-9-_]+)\./i);
      if (matched && matched.length > 1) {
        const locale = matched[1];
        messages[locale] = locales(key);
      }
    });
  }
  return messages;
}

export default createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'es',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'es',
  messages: loadLocaleMessages()
})