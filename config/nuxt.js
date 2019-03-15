const pkg = require('../package')
const resolve = require('path').resolve

module.exports = {
    mode: 'spa',

    srcDir: resolve(__dirname, '..', 'resources'),

    /*
  ** Headers of the page
  */
    head: {
        title: pkg.name,
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: pkg.description
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },

    /*
  ** Customize the progress-bar color
  */
    loading: { color: '#fff' },

    /*
  ** Global CSS
  */
    css: [
        { src: '~/assets/styles/main.scss', lang: 'scss' },
        '@/assets/icons/nucleo-icons.css',
        'leaflet/dist/leaflet.css'
    ],

    /*
  ** Plugins to load before mounting the App
  */
    plugins: [
        '~/plugins/blackDashboard',
        { src: '~/plugins/leaflet', ssr: false },
        '~/plugins/i18n',
        '~/plugins/map',
        { src: '~plugins/vee-validate.js', ssr: true },
        '~/plugins/vue-notifications'
    ],
    /*
  ** Nuxt.js modules
  */
    modules: [
        // Doc: https://github.com/nuxt-community/axios-module#usage
        '@nuxtjs/axios'
    ],

    router: {
        middleware: ['i18n']
    },
    /*
  ** Axios module configuration
  */
    axios: {
        // See https://github.com/nuxt-community/axios-module#options
        baseURL: 'http://192.168.1.109:3000'
        // proxyHeaders: false,
        // credentials: false
    },

    /*
  ** Build configuration
  */
    build: {
        /*
    ** You can extend webpack config here
    */
        transpile: [/^vue2-google-maps($|\/)/],
        extend(config, ctx) {
            // Run ESLint on save
            if (ctx.isDev && ctx.isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    }
}
