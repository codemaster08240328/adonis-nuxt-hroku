import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

function loadLocaleMessages () {
	const locales = require.context('../locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
	const messages = {}
	locales.keys().forEach(key => {
		const matched = key.match(/([a-z0-9]+)\./i)
		if (matched && matched.length > 1) {
			const locale = matched[1]
			messages[locale] = locales(key)
		}
	})
	return messages
}

export default ({ app, store }) => {
	// inject our i18n instance into the app root to be used in middleware
	// we assume a store/index.js file has been defined and the variable 'locale' defined on store, we'll go into this in detail in the next code snippet
	app.i18n = new VueI18n({ //construction a new VueI18n
		locale: store.state.locale,
		fallbackLocale: 'en',//always displays Chinese if English translation is not available
		messages: loadLocaleMessages()
	})
}